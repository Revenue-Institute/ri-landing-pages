import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "slowisz@revenueinstitute.com";

export async function POST(request: Request) {
  let name: string;
  let email: string;
  let processDesc: string;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim();
    processDesc = String(body.process || "").trim();
  } else {
    const form = await request.formData();
    name = String(form.get("name") || "").trim();
    email = String(form.get("email") || "").trim();
    processDesc = String(form.get("process") || "").trim();
  }

  if (!name || !email || !processDesc) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const BLOCKED_DOMAINS = [
    "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
    "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com",
    "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
    "mail.com", "gmx.com", "gmx.net", "yandex.com", "zoho.com",
    "rocketmail.com", "ymail.com", "earthlink.net", "comcast.net",
    "att.net", "verizon.net", "sbcglobal.net", "cox.net", "bellsouth.net",
  ];
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
      subject: `New process inquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Process: ${processDesc}`,
        "",
        `— Sent from the Revenue Institute landing page`,
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
    .replace(/'/g, "&#039;")
}
