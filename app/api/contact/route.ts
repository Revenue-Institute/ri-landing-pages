import { NextResponse } from "next/server";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";
import { clientIp, createRateLimiter } from "@/app/lib/email/rateLimit";
import { sendToN8n } from "@/app/lib/n8n";

const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  let name: string;
  let email: string;
  let processDesc: string;
  let honeypot: string;
  let url: string;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim();
    processDesc = String(body.process || "").trim();
    honeypot = String(body.company || "").trim();
    url = String(body.url || "").trim().slice(0, 2000);
  } else {
    const form = await request.formData();
    name = String(form.get("name") || "").trim();
    email = String(form.get("email") || "").trim();
    processDesc = String(form.get("process") || "").trim();
    honeypot = String(form.get("company") || "").trim();
    url = String(form.get("url") || "").trim().slice(0, 2000);
  }

  // A filled honeypot means a bot. Return 200 so it does not learn otherwise.
  if (honeypot) return NextResponse.json({ ok: true });

  const ip = clientIp(request);
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

  if (isBlockedEmailDomain(email)) {
    return NextResponse.json(
      { error: "Please use your work email address." },
      { status: 400 }
    );
  }

  sendToN8n({ source: "contact", form: "Homepage Contact Form", name, email, url, process: processDesc });
  return NextResponse.json({ ok: true });
}
