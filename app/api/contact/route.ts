import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "slowisz@revenueinstitute.com";

const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com",
  "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
  "mail.com", "gmx.com", "gmx.net", "yandex.com", "zoho.com",
  "rocketmail.com", "ymail.com", "earthlink.net", "comcast.net",
  "att.net", "verizon.net", "sbcglobal.net", "cox.net", "bellsouth.net",
];

/**
 * Paid traffic attracts form bots. A short in-memory window is enough to blunt
 * naive floods; it resets on deploy and is per-instance, which is the right
 * trade for a single landing page. Move to a shared store if this scales out.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  let name: string;
  let email: string;
  let processDesc: string;
  let honeypot: string;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim();
    processDesc = String(body.process || "").trim();
    honeypot = String(body.company || "").trim();
  } else {
    const form = await request.formData();
    name = String(form.get("name") || "").trim();
    email = String(form.get("email") || "").trim();
    processDesc = String(form.get("process") || "").trim();
    honeypot = String(form.get("company") || "").trim();
  }

  // A filled honeypot means a bot. Return 200 so it does not learn otherwise.
  if (honeypot) return NextResponse.json({ ok: true });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!name || !email || !processDesc) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 320 || processDesc.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (BLOCKED_DOMAINS.includes(domain)) {
    return NextResponse.json(
      { error: "Please use your work email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Revenue Institute <forms@go.revenueinstitute.com>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New process inquiry - ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Process: ${processDesc}`,
        "",
        `- Sent from the Revenue Institute landing page`,
      ].join("\n"),
      html: [
        `<div style="font-family: -apple-system, sans-serif; font-size: 15px; line-height: 1.6; color: #111;">`,
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
        `<p><strong>Process:</strong> ${escapeHtml(processDesc)}</p>`,
        `<hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">`,
        `<p style="color: #999; font-size: 13px;">Sent from the Revenue Institute landing page</p>`,
        `</div>`,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
