import { INDUSTRY_KEYS, type IndustryKey } from "@/app/data";

/**
 * Looks up firmographic context (industry, size, location) for a prospect's
 * website via Exa's Answer API (https://docs.exa.ai/reference/answer), so
 * assessment results can cite real peer data instead of generic advice.
 *
 * Deliberately fails soft everywhere: no API key, a bad domain, a timeout,
 * or a malformed response all resolve to `null` rather than throwing - this
 * is a value-add enhancement, never a blocker on the assessment flow.
 */

export interface CompanyProfile {
  industryKey: IndustryKey;
  companyName: string | null;
  location: string | null;
  employeeRange: string | null;
}

const EXA_ANSWER_URL = "https://api.exa.ai/answer";
const TIMEOUT_MS = 8000;

function normalizeWebsite(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    if (!host.includes(".")) return null;
    return host;
  } catch {
    return null;
  }
}

interface ExaAnswerObject {
  industryKey?: unknown;
  companyName?: unknown;
  city?: unknown;
  state?: unknown;
  employeeRange?: unknown;
}

function isIndustryKey(value: unknown): value is IndustryKey {
  return typeof value === "string" && (INDUSTRY_KEYS as string[]).includes(value);
}

function cleanString(value: unknown, maxLength = 120): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || /^(unknown|n\/a|null)$/i.test(trimmed)) return null;
  return trimmed.slice(0, maxLength);
}

/**
 * Validates a client-submitted CompanyProfile before it's trusted server
 * side (the final assessment-submit POST carries whatever the browser
 * resolved from /api/company-lookup earlier - an attacker can send
 * anything in that field). Only ever used to pick which of our own known
 * vertical content blocks to show and to display a few short strings, but
 * still worth clamping so a malformed/hostile payload can't produce a bad
 * lookup key or an absurd string in an outbound email.
 */
export function sanitizeProfile(raw: unknown): CompanyProfile | null {
  if (typeof raw !== "object" || raw === null) return null;
  const value = raw as Record<string, unknown>;
  return {
    industryKey: isIndustryKey(value.industryKey) ? value.industryKey : "professional-services",
    companyName: cleanString(value.companyName, 120),
    location: cleanString(value.location, 120),
    employeeRange: cleanString(value.employeeRange, 20),
  };
}

export async function lookupCompany(website: string): Promise<CompanyProfile | null> {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) return null;

  const domain = normalizeWebsite(website);
  if (!domain) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(EXA_ANSWER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        query: `Look up the company that owns the website ${domain}. Classify what it does, estimate its employee headcount, and find its headquarters city and state.`,
        model: "exa",
        outputSchema: {
          type: "object",
          properties: {
            industryKey: {
              type: "string",
              enum: INDUSTRY_KEYS,
              description:
                "Best-fit category for the company: law-firms (law firms/legal practices), consulting-firms (management/strategy/advisory consultancies), financial-services (wealth management, RIAs, broker-dealers, banks), private-equity (PE firms, portfolio company operators), or professional-services (any other services firm - accounting, staffing, agencies, etc.)",
            },
            companyName: { type: "string", description: "The company's proper name." },
            city: { type: "string", description: "Headquarters city, if known." },
            state: { type: "string", description: "Headquarters state or region, if known." },
            employeeRange: {
              type: "string",
              description: "Rough employee headcount band, e.g. '10-50', '50-200', '200-500', '500+'.",
            },
          },
          required: ["industryKey"],
          additionalProperties: false,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { answer?: ExaAnswerObject | string };
    const answer = data.answer;
    if (!answer || typeof answer === "string") return null;

    const industryKey = isIndustryKey(answer.industryKey) ? answer.industryKey : "professional-services";
    const city = cleanString(answer.city, 60);
    const state = cleanString(answer.state, 60);
    const location = city && state ? `${city}, ${state}` : city ?? state;

    return {
      industryKey,
      companyName: cleanString(answer.companyName, 120),
      location,
      employeeRange: cleanString(answer.employeeRange, 20),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
