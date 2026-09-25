import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";
import { clientIp, createRateLimiter } from "@/app/lib/email/rateLimit";
import { buildWaitlistConfirmationEmail, buildWaitlistInternalEmail } from "@/app/waitlist/emails/waitlistEmails";
import { sendToN8n } from "@/app/lib/n8n";
import { ATTRIBUTION_KEYS } from "@/app/lib/attribution";

const TO_EMAIL = "slowisz@revenueinstitute.com";
const PRODUCT_NAME = "CleverSite";
const ONE_LINER = "CleverSite watches how people actually use your site and ships the fixes automatically - traffic, conversions, and visibility, improving without a redesign project.";

const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  let email: string;
  let honeypot: string;
  let attribution: Record<string, string> = {};

  try {
    const body = await request.json();
    email = String(body.email || "").trim();
    honeypot = String(body.company || "").trim();
    if (body.attribution && typeof body.attribution === "object") {
      attribution = Object.fromEntries(
        ATTRIBUTION_KEYS.flatMap((key) => {
          const value = body.attribution[key];
          return typeof value === "string" && value.length <= 500 ? [[key, value]] : [];
        }),
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (honeypot) return NextResponse.json({ ok: true });

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!email || email.length > 320) {
    return NextResponse.json({ error: "Missing or invalid email" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (isBlockedEmailDomain(email)) {
    return NextResponse.json({ error: "Please use your work email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[cleversite-waitlist] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const confirmation = buildWaitlistConfirmationEmail(PRODUCT_NAME, ONE_LINER);
  const internal = buildWaitlistInternalEmail(PRODUCT_NAME, email);

  // Confirmation email gates success: only once it's sent do we notify the
  // team internally and forward to n8n, so a client retry after a transient
  // failure here can't produce a duplicate internal lead notification.
  try {
    const confirmSent = await resend.emails.send({
      from: "Revenue Institute <forms@go.revenueinstitute.com>",
      to: email,
      replyTo: "sales@revenueinstitute.com",
      subject: confirmation.subject,
      text: confirmation.text,
      html: confirmation.html,
    });
    if (confirmSent.error) {
      console.error("[cleversite-waitlist] Confirmation email Resend error:", confirmSent.error);
      return NextResponse.json({ error: "We couldn't confirm your place right now. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("[cleversite-waitlist] Confirmation email failed:", err);
    return NextResponse.json({ error: "We couldn't confirm your place right now. Please try again." }, { status: 502 });
  }

  try {
    const internalSent = await resend.emails.send({
      from: "Revenue Institute <forms@go.revenueinstitute.com>",
      to: TO_EMAIL,
      replyTo: email,
      subject: internal.subject,
      text: internal.text,
      html: internal.html,
    });
    if (internalSent.error) {
      console.error("[cleversite-waitlist] Internal email Resend error:", internalSent.error);
    }
  } catch (err) {
    console.error("[cleversite-waitlist] Internal email failed:", err);
  }

  sendToN8n({ source: "cleversite-waitlist", email, product: PRODUCT_NAME, attribution });
  return NextResponse.json({ ok: true });
}
