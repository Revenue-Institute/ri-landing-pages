import { NextResponse } from "next/server";
import { clientIp, createRateLimiter } from "@/app/lib/email/rateLimit";
import { lookupCompany } from "@/app/lib/enrichment/companyLookup";

/**
 * Fired the moment a visitor starts an assessment (see AssessmentIntroScreen),
 * well before the contact gate - so by the time they reach results, the
 * lookup has had the full ~1-2 minutes of question-answering to resolve.
 * Higher rate-cap than the assessment-submit routes since this fires on
 * every assessment start, not just completion.
 */
const rateLimited = createRateLimiter(20, 10 * 60 * 1000);

export async function POST(request: Request) {
  let website: string;

  try {
    const body = await request.json();
    website = String(body.website || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!website || website.length > 200) {
    return NextResponse.json({ profile: null });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const profile = await lookupCompany(website);
  return NextResponse.json({ profile });
}
