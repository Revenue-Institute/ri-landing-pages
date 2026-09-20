import { escapeHtml } from "@/app/lib/email/html";
import { buildResultEmailHtml, buildResultEmailText } from "./resultEmailLayout";
import type { AnswerMap, AssessmentConfig, AssessmentResult } from "@/app/assessments/types";

/**
 * Pure string-building for the two CleverSite assessment emails. No Resend
 * calls here so each can be reviewed/tested independently of delivery. The
 * prospect email is built from the shared resultEmailLayout template - see
 * that file for the design (real brand colors/bars, secondary-styled soft
 * CTA, no hard sell); this file only supplies CleverSite's own subject
 * line and the internal (sales-facing) email, which stays plain/dense on
 * purpose since it's a working doc, not something meant to look polished.
 */

interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

function optionLabel(config: AssessmentConfig, questionId: string, answers: AnswerMap): string {
  const question = config.questions.find((q) => q.id === questionId);
  const option = question?.options[answers[questionId]];
  return option?.label ?? "N/A";
}

function questionPrompt(config: AssessmentConfig, questionId: string, answers: AnswerMap): string {
  const question = config.questions.find((q) => q.id === questionId);
  if (!question) return questionId;
  return typeof question.prompt === "function" ? question.prompt(answers) : question.prompt;
}

export function buildProspectEmail(result: AssessmentResult, name: string): EmailPayload {
  const subject = `Your Website Optimization Score: ${result.compositeScore}/100`;
  const args = { name, scoreLabel: "Website Optimization Score", assessmentName: "CleverSite", result };
  return {
    subject,
    html: buildResultEmailHtml(args),
    text: buildResultEmailText(args),
  };
}

export function buildInternalEmail(
  result: AssessmentResult,
  name: string,
  email: string,
  answers: AnswerMap,
  config: AssessmentConfig
): EmailPayload {
  const company = email.split("@")[1] ?? "unknown";
  const priorityTag = result.leadPriority.toUpperCase();
  const subject = `[${priorityTag}] CleverSite Assessment - ${name} (${company})`;

  const dimensionRowsHtml = result.dimensionScores
    .map(
      (d) => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${escapeHtml(d.label)}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111; text-align: right; font-weight: 600;">${Math.round(d.score)}/100</td>
        </tr>`
    )
    .join("");

  const dimensionRowsText = result.dimensionScores
    .map((d) => `  - ${d.label}: ${Math.round(d.score)}/100`)
    .join("\n");

  const buyInLabel = optionLabel(config, config.buyInQuestionId, answers);
  const urgencyLabel = optionLabel(config, config.urgencyQuestionId, answers);

  const contextQuestionIds = config.questions
    .filter((q) => q.kind === "context")
    .map((q) => q.id);

  const contextRowsHtml = contextQuestionIds
    .map((id) => {
      const prompt = questionPrompt(config, id, answers);
      const label = optionLabel(config, id, answers);
      return `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${escapeHtml(prompt)}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111; text-align: right; font-weight: 600;">${escapeHtml(label)}</td>
        </tr>`;
    })
    .join("");

  const contextRowsText = contextQuestionIds
    .map((id) => `  - ${questionPrompt(config, id, answers)}: ${optionLabel(config, id, answers)}`)
    .join("\n");

  const html = [
    `<div style="font-family: -apple-system, sans-serif; font-size: 15px; line-height: 1.6; color: #111; max-width: 560px;">`,
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    `<p><strong>Lead priority:</strong> ${escapeHtml(priorityTag)}</p>`,
    `<p><strong>Composite score:</strong> ${result.compositeScore}/100 (${escapeHtml(result.tier.label)})</p>`,
    `<h3 style="margin: 20px 0 4px; font-size: 16px;">Dimension breakdown</h3>`,
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">`,
    dimensionRowsHtml,
    `</table>`,
    `<h3 style="margin: 20px 0 4px; font-size: 16px;">Buy-in and urgency</h3>`,
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">`,
    `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">Buy-in (${result.buyInValue}/4)</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111; text-align: right; font-weight: 600;">${escapeHtml(buyInLabel)}</td></tr>`,
    `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">Urgency (${result.urgencyValue}/4)</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111; text-align: right; font-weight: 600;">${escapeHtml(urgencyLabel)}</td></tr>`,
    `</table>`,
    `<h3 style="margin: 20px 0 4px; font-size: 16px;">Context answers</h3>`,
    `<table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">`,
    contextRowsHtml,
    `</table>`,
    `<hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">`,
    `<p style="color: #999; font-size: 13px;">Sent from the Revenue Institute CleverSite assessment</p>`,
    `</div>`,
  ].join("\n");

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Lead priority: ${priorityTag}`,
    `Composite score: ${result.compositeScore}/100 (${result.tier.label})`,
    "",
    "Dimension breakdown:",
    dimensionRowsText,
    "",
    "Buy-in and urgency:",
    `  - Buy-in (${result.buyInValue}/4): ${buyInLabel}`,
    `  - Urgency (${result.urgencyValue}/4): ${urgencyLabel}`,
    "",
    "Context answers:",
    contextRowsText,
    "",
    "- Sent from the Revenue Institute CleverSite assessment",
  ].join("\n");

  return { subject, html, text };
}
