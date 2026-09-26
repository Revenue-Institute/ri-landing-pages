import { escapeHtml } from "@/app/lib/email/html";

const C = {
  ink: "#0e0d12",
  body: "#3a3944",
  muted: "#6b6975",
  hairline: "#e4e3e8",
  mist: "#f4f4f6",
  white: "#ffffff",
};
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

/**
 * Confirmation sent to the person who joined the waitlist. Short on
 * purpose - there's no result to report yet, just a confirmation and a
 * plain-English reminder of what they signed up for.
 */
export function buildWaitlistConfirmationEmail(
  productName: string,
  oneLiner: string,
  callUrl?: string,
): EmailPayload {
  const subject = `You're on the ${productName} waitlist`;

  const cta = callUrl
    ? `
            <p style="margin: 24px 0 0; padding-top: 20px; border-top: 1px solid ${C.hairline}; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.body};">
              Want in sooner? <a href="${callUrl}" style="color: ${C.ink}; font-weight: 700; text-decoration: underline;">Skip to the front of the line</a> - grab 15 minutes with me and tell me what you need ${escapeHtml(productName)} to do. Early testers get first access and help shape the roadmap.
            </p>`
    : "";

  const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${C.mist};">
  <tr>
    <td align="center" style="padding: 32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">
        <tr><td style="height: 6px; background: #12d68e;">&nbsp;</td></tr>
        <tr>
          <td style="background: ${C.white}; padding: 32px 32px 36px;">
            <h1 style="margin: 20px 0 12px; font-family: ${SANS}; font-size: 22px; font-weight: 800; color: ${C.ink};">
              You&rsquo;re on the list.
            </h1>
            <p style="margin: 0 0 16px; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.body};">
              ${escapeHtml(oneLiner)}
            </p>
            <p style="margin: 0; font-family: ${SERIF}; font-size: 16px; line-height: 1.6; color: ${C.body};">
              We&rsquo;ll email you the moment ${escapeHtml(productName)} is ready - no spam, no sales sequence in the meantime.
            </p>${cta}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  const text = [
    `You're on the ${productName} waitlist.`,
    "",
    oneLiner,
    "",
    `We'll email you the moment ${productName} is ready - no spam, no sales sequence in the meantime.`,
    ...(callUrl
      ? [
          "",
          `Want in sooner? Skip to the front of the line - grab 15 minutes with me and tell me what you need ${productName} to do: ${callUrl}`,
        ]
      : []),
    "",
    "- Revenue Institute",
  ].join("\n");

  return { subject, html, text };
}

/** Internal notification - deliberately plain, this is a working list, not a designed doc. */
export function buildWaitlistInternalEmail(productName: string, email: string): EmailPayload {
  const subject = `New ${productName} waitlist signup - ${email}`;
  const html = `<p style="font-family: -apple-system, sans-serif; font-size: 15px; color: #111;">New <strong>${escapeHtml(productName)}</strong> waitlist signup: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`;
  const text = `New ${productName} waitlist signup: ${email}`;
  return { subject, html, text };
}
