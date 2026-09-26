import { buildResultEmailHtml, buildResultEmailText } from "./resultEmailLayout";
import type { AssessmentResult, IndustryContext } from "@/app/assessments/types";

/**
 * Pure string-building for the PIE assessment prospect email. Mirrors
 * cleversiteEmails.ts - see that file and resultEmailLayout.ts for the
 * reasoning. No Resend calls here, no em dashes.
 */

interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

export function buildProspectEmail(result: AssessmentResult, name: string, industry: IndustryContext): EmailPayload {
  const subject = `Your Process Health Score: ${result.compositeScore}/100`;
  const args = { name, scoreLabel: "Process Health Score", assessmentName: "PIE", result, industry };
  return {
    subject,
    html: buildResultEmailHtml(args),
    text: buildResultEmailText(args),
  };
}
