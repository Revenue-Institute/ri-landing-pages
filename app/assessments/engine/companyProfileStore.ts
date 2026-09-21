import type { CompanyProfile } from "@/app/lib/enrichment/companyLookup";

/**
 * Kicks off company enrichment the moment a visitor starts an assessment
 * (see AssessmentIntroScreen) and makes the in-flight/resolved result
 * available to whichever step later needs it (ResultReport, the final
 * submit), without blocking navigation on it.
 *
 * Two layers on purpose:
 *  - an in-memory promise per assessment id, which survives client-side
 *    route changes within the same page load (module state isn't torn
 *    down between steps, only React components remount) - this is what
 *    lets the results step "await" a lookup that's still in flight.
 *  - sessionStorage, which is what survives a hard refresh or a direct
 *    link to a later step, matching the pattern in assessmentStorage.ts.
 */

const inFlight = new Map<string, Promise<CompanyProfile | null>>();

function storageKeyFor(assessmentId: string): string {
  return `${assessmentId}-company-profile`;
}

function persist(assessmentId: string, profile: CompanyProfile | null) {
  try {
    sessionStorage.setItem(storageKeyFor(assessmentId), JSON.stringify(profile));
  } catch {
    // Best-effort only - the in-memory cache still covers the common case.
  }
}

export function startLookup(assessmentId: string, website: string): void {
  if (inFlight.has(assessmentId)) return;
  const promise = fetch("/api/company-lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ website }),
  })
    .then((res) => (res.ok ? res.json() : { profile: null }))
    .then((data) => (data?.profile ?? null) as CompanyProfile | null)
    .catch(() => null);

  inFlight.set(assessmentId, promise);
  promise.then((profile) => persist(assessmentId, profile));
}

/** Synchronous read for rehydrating a fresh mount (refresh, direct link). */
export function getCachedProfile(assessmentId: string): CompanyProfile | null {
  try {
    const raw = sessionStorage.getItem(storageKeyFor(assessmentId));
    if (!raw) return null;
    return JSON.parse(raw) as CompanyProfile | null;
  } catch {
    return null;
  }
}

/** The in-flight/resolved promise for this session, if a lookup was started. */
export function awaitProfile(assessmentId: string): Promise<CompanyProfile | null> | null {
  return inFlight.get(assessmentId) ?? null;
}
