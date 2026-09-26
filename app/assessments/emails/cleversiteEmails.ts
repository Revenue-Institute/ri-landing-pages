import { buildResultEmailHtml, buildResultEmailText } from "./resultEmailLayout";
import type { AssessmentResult, IndustryContext } from "@/app/assessments/types";

/**
 * Pure string-building for the CleverSite assessment prospect email. No
 * Resend calls here so it can be reviewed/tested independently of
 * delivery. Built from the shared resultEmailLayout template - see that
 * file for the design (real brand colors/bars, secondary-styled soft
 * CTA, no hard sell); this file only supplies CleverSite's own subject
 * line.
 */

interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

export function buildProspectEmail(result: AssessmentResult, name: string, industry: IndustryContext): EmailPayload {
  const subject = `Your Website Optimization Score: ${result.compositeScore}/100`;
  const args = { name, scoreLabel: "Website Optimization Score", assessmentName: "CleverSite", result, industry };
  return {
    subject,
    html: buildResultEmailHtml(args),
    text: buildResultEmailText(args),
  };
}
