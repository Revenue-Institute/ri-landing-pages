import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";
import { clientIp, createRateLimiter } from "@/app/lib/email/rateLimit";
import { cleversiteConfig } from "@/app/assessments/cleversite.config";
import { computeResult } from "@/app/assessments/scoring";
import { buildIndustryContext } from "@/app/assessments/industryContext";
import { sanitizeProfile } from "@/app/lib/enrichment/companyLookup";
import { buildInternalEmail, buildProspectEmail } from "@/app/assessments/emails/cleversiteEmails";
import { sendToN8n } from "@/app/lib/n8n";
import type { AnswerMap } from "@/app/assessments/types";

const TO_EMAIL = "slowisz@revenueinstitute.com";

const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

function validateAnswers(answers: unknown): answers is AnswerMap {
  if (typeof answers !== "object" || answers === null) return false;
  const map = answers as Record<string, unknown>;
  for (const question of cleversiteConfig.questions) {
    const value = map[question.id];
    if (typeof value !== "number" || !Number.isInteger(value)) return false;
    if (value < 0 || value >= question.options.length) return false;
  }
  return true;
}

export async function POST(request: Request) {
  let name: string;
  let email: string;
  let answers: unknown;
  let honeypot: string;
  let url: string;
  let companyProfile: ReturnType<typeof sanitizeProfile>;

  try {
    const body = await request.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim();
    answers = body.answers;
    honeypot = String(body.company || "").trim();
    url = String(body.url || "").trim().slice(0, 2000);
    companyProfile = sanitizeProfile(body.companyProfile);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // A filled honeypot means a bot. Return 200 so it does not learn otherwise.
  if (honeypot) return NextResponse.json({ ok: true });

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 320) {
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

  if (!validateAnswers(answers)) {
    return NextResponse.json({ error: "Invalid or incomplete answers" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[cleversite-assessment] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const result = computeResult(cleversiteConfig, answers);
  const industry = buildIndustryContext(cleversiteConfig, result, companyProfile);

  const prospectEmail = buildProspectEmail(result, name, industry);
  const internalEmail = buildInternalEmail(result, name, email, answers, cleversiteConfig, industry);

  const [prospectOutcome, internalOutcome] = await Promise.allSettled([
    resend.emails.send({
      from: "Revenue Institute <forms@go.revenueinstitute.com>",
      to: email,
      replyTo: "sales@revenueinstitute.com",
      subject: prospectEmail.subject,
      text: prospectEmail.text,
      html: prospectEmail.html,
    }),
    resend.emails.send({
      from: "Revenue Institute <forms@go.revenueinstitute.com>",
      to: TO_EMAIL,
      replyTo: email,
      subject: internalEmail.subject,
      text: internalEmail.text,
      html: internalEmail.html,
    }),
  ]);

  if (prospectOutcome.status === "rejected") {
    console.error("[cleversite-assessment] Prospect email failed:", prospectOutcome.reason);
  } else if (prospectOutcome.value.error) {
    console.error("[cleversite-assessment] Prospect email Resend error:", prospectOutcome.value.error);
  }

  if (internalOutcome.status === "rejected") {
    console.error("[cleversite-assessment] Internal email failed:", internalOutcome.reason);
  } else if (internalOutcome.value.error) {
    console.error("[cleversite-assessment] Internal email Resend error:", internalOutcome.value.error);
  }

  sendToN8n({
    source: "cleversite-assessment",
    form: "CleverSite Assessment",
    name,
    email,
    url,
    answers,
    companyProfile,
    result,
  });
  return NextResponse.json({ ok: true });
}
