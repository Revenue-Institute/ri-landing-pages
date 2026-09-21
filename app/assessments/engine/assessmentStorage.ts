import type { AnswerMap } from "@/app/assessments/types";

/**
 * sessionStorage persistence shared by AssessmentIntroScreen (writes
 * `website` before question 1) and AssessmentEngine (writes answers/name/
 * email as the flow progresses, reads everything back on each step's
 * remount). One key per assessment id, one shape for the whole flow.
 */
export interface StoredState {
  answers: AnswerMap;
  name: string;
  email: string;
  website: string;
}

const EMPTY: StoredState = { answers: {}, name: "", email: "", website: "" };

export function storageKeyFor(assessmentId: string): string {
  return `${assessmentId}-assessment-state`;
}

export function loadStored(storageKey: string): StoredState {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    if (typeof parsed?.answers !== "object" || parsed.answers === null) return { ...EMPTY };
    return {
      answers: parsed.answers,
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      website: typeof parsed.website === "string" ? parsed.website : "",
    };
  } catch {
    return { ...EMPTY };
  }
}

export function persistStored(storageKey: string, state: StoredState) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Private browsing / blocked storage - progress just won't resume.
  }
}
