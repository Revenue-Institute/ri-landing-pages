import { escapeHtml } from "@/app/lib/email/html";
import type { AssessmentResult } from "@/app/assessments/types";

/**
 * Shared HTML/text template for the prospect's result email (CleverSite,
 * PIE, ...). Built for the goal in the brief: intrigue, not a hard sell -
 * so the tone stays consultative (full diagnostic depth, free advice) and
 * the closing ask is a secondary-styled reply/link, never a loud filled
 * button. Uses table-based layout and inline styles throughout because
 * email clients don't support flexbox/grid/CSS variables - this is the
 * email-safe equivalent of the on-screen ResultReport, using the same
 * Revenue Institute brand tokens (docs/brand.md) as literal hex values.
 *
 * The header is a text wordmark, not the logo image, on purpose: most
 * email clients (Gmail, Outlook) block remote images by default until the
 * recipient clicks "show images," so putting the brand identity in an
 * <img> means half of opens see a broken box instead. Text always renders.
 *
 * SITE_URL assumes production at revenueinstitute.com, matching the
 * "forms@go.revenueinstitute.com" sender and PRIVACY_URL already
 * hardcoded elsewhere in this codebase.
 */

const SITE_URL = "https://revenueinstitute.com";

const C = {
  ink: "#0e0d12",
  body: "#3a3944",
  muted: "#6b6975",
  hairline: "#e4e3e8",
  mist: "#f4f4f6",
  white: "#ffffff",
  alert: "#d93a16",
};

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name.trim();
}

export interface ResultEmailArgs {
  name: string;
  scoreLabel: string; // e.g. "Website Optimization Score"
  assessmentName: string; // e.g. "CleverSite" - used only in the footer line
  result: AssessmentResult;
}

export function buildResultEmailHtml({ name, scoreLabel, assessmentName, result }: ResultEmailArgs): string {
  const first = escapeHtml(firstName(name));

  const dimensionRows = result.dimensionScores
    .map((d) => {
      const isWeakest = d.key === result.weakestDimension.key;
      const fillColor = isWeakest ? C.alert : C.ink;
      const fillPct = Math.max(Math.round(d.score), 3); // always show a sliver, even at 0
      return `
        <tr>
          <td style="padding: 18px 0 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family: ${SANS}; font-size: 14px; font-weight: 600; color: ${C.ink};">${escapeHtml(d.label)}</td>
                <td style="font-family: ${SANS}; font-size: 14px; font-weight: 600; color: ${C.ink}; text-align: right;">${Math.round(d.score)}</td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 6px;">
              <tr>
                <td style="background: ${C.hairline}; font-size: 0; line-height: 0;">
                  <div style="width: ${fillPct}%; background: ${fillColor}; height: 6px;">&nbsp;</div>
                </td>
              </tr>
            </table>
            <p style="margin: 8px 0 0; font-family: ${SERIF}; font-size: 14px; line-height: 1.5; color: ${C.muted};">
              ${escapeHtml(d.insight)}
            </p>
          </td>
        </tr>`;
    })
    .join("");

  const recommendationRows = result.recommendations
    .map(
      (line) => `
        <tr>
          <td style="padding: 0 0 12px; vertical-align: top; width: 16px;">
            <div style="width: 7px; height: 7px; background: ${C.ink}; margin-top: 7px;">&nbsp;</div>
          </td>
          <td style="padding: 0 0 12px; font-family: ${SERIF}; font-size: 15px; line-height: 1.55; color: ${C.body};">
            ${escapeHtml(line)}
          </td>
        </tr>`
    )
    .join("");

  return `
<div style="display:none; max-height:0; overflow:hidden; opacity:0;">
  ${result.compositeScore}/100 - ${escapeHtml(result.tier.label)}. Here's exactly what's holding it back.
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${C.mist};">
  <tr>
    <td align="center" style="padding: 32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px;">
        <tr><td style="height: 6px; background: #12d68e;">&nbsp;</td></tr>
        <tr>
          <td style="background: ${C.white}; padding: 28px 32px 8px;">
            <span style="font-family: ${SANS}; font-size: 15px; font-weight: 800; letter-spacing: 0.02em; text-transform: uppercase; color: ${C.ink};">
              Revenue Institute
            </span>
          </td>
        </tr>
        <tr>
          <td style="background: ${C.white}; padding: 8px 32px 36px; border-bottom: 1px solid ${C.hairline};">

            <p style="margin: 0 0 20px; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.body};">
              Hi ${first}, here's what we found.
            </p>

            <p style="margin: 0 0 4px; font-family: ${SANS}; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: ${C.muted};">
              ${escapeHtml(scoreLabel)}
            </p>
            <p style="margin: 0 0 6px; border-top: 3px solid ${C.ink}; padding-top: 10px; font-family: ${SANS}; font-size: 44px; font-weight: 900; letter-spacing: -0.02em; color: ${C.ink};">
              ${result.compositeScore}
            </p>
            <p style="margin: 0 0 20px; font-family: ${SANS}; font-size: 17px; font-weight: 700; color: ${C.ink};">
              ${escapeHtml(result.tier.headline)}
            </p>

            <p style="margin: 0 0 14px; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.body};">
              ${escapeHtml(result.tier.summary)}
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
              <tr>
                <td style="border-left: 3px solid ${C.alert}; padding: 2px 0 2px 14px; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.ink};">
                  ${escapeHtml(result.weakestLine)}
                </td>
              </tr>
            </table>

            <p style="margin: 28px 0 4px; font-family: ${SANS}; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.muted};">
              Where you stand, worst to best
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${dimensionRows}
            </table>

            <p style="margin: 30px 0 10px; font-family: ${SANS}; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.muted};">
              Where to start
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${recommendationRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background: ${C.white}; padding: 28px 32px 32px;">
            <p style="margin: 0 0 18px; font-family: ${SERIF}; font-size: 15px; line-height: 1.6; color: ${C.muted};">
              ${escapeHtml(result.ctaLine)}
            </p>
            <a href="${SITE_URL}/#start-form" style="display: inline-block; padding: 12px 22px; border: 2px solid ${C.ink}; font-family: ${SANS}; font-size: 13px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: ${C.ink}; text-decoration: none;">
              Talk it through, no pitch
            </a>
            <p style="margin: 18px 0 0; font-family: ${SANS}; font-size: 13px; line-height: 1.5; color: ${C.muted};">
              Or just reply to this email - a person reads these, not a bot.
            </p>
          </td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin-top: 20px;">
        <tr>
          <td style="font-family: ${SANS}; font-size: 12px; color: ${C.muted}; text-align: center;">
            Sent from the Revenue Institute ${escapeHtml(assessmentName)} assessment.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function buildResultEmailText({ name, scoreLabel, assessmentName, result }: ResultEmailArgs): string {
  const dimensionLines = result.dimensionScores
    .map((d) => `  - ${d.label}: ${Math.round(d.score)}\n    ${d.insight}`)
    .join("\n");
  const recommendationLines = result.recommendations.map((line) => `  - ${line}`).join("\n");

  return [
    `Hi ${firstName(name)}, here's what we found.`,
    "",
    `${scoreLabel}: ${result.compositeScore}/100`,
    result.tier.headline,
    "",
    result.tier.summary,
    result.weakestLine,
    "",
    "Where you stand, worst to best:",
    dimensionLines,
    "",
    "Where to start:",
    recommendationLines,
    "",
    result.ctaLine,
    "Talk it through, no pitch: https://revenueinstitute.com/#start-form",
    "Or just reply to this email - a person reads these, not a bot.",
    "",
    `- Sent from the Revenue Institute ${assessmentName} assessment`,
  ].join("\n");
}
