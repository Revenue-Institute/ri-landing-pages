import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";
import { clientIp, createRateLimiter } from "@/app/lib/email/rateLimit";
import { buildWaitlistConfirmationEmail } from "@/app/waitlist/emails/waitlistEmails";
import { sendToN8n } from "@/app/lib/n8n";
import { ATTRIBUTION_KEYS } from "@/app/lib/attribution";

const PRODUCT_NAME = "PIE";
const ONE_LINER = "PIE documents your process as it actually runs, catches exceptions automatically, and keeps working even when you're not the one watching it.";

const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  let email: string;
  let honeypot: string;
  let url: string;
  let referrer: string;
  let attribution: Record<string, string> = {};

  try {
    const body = await request.json();
    email = String(body.email || "").trim();
    honeypot = String(body.company || "").trim();
    url = String(body.url || "").trim().slice(0, 2000);
    referrer = String(body.referrer || "").trim().slice(0, 2000);
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
    console.error("[pie-waitlist] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const confirmation = buildWaitlistConfirmationEmail(PRODUCT_NAME, ONE_LINER);

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
      console.error("[pie-waitlist] Confirmation email Resend error:", confirmSent.error);
    }
  } catch (err) {
    console.error("[pie-waitlist] Confirmation email failed:", err);
  }

  sendToN8n({ source: "pie-waitlist", form: `${PRODUCT_NAME} Waitlist`, email, product: PRODUCT_NAME, url, referrer, attribution });
  return NextResponse.json({ ok: true });
}
