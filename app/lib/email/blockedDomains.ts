/**
 * Personal-email domains rejected on lead-capture forms. Paid traffic
 * skews toward personal-inbox submissions that sales can't act on, and
 * work-email-only keeps the lead list qualified.
 */
export const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com",
  "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
  "mail.com", "gmx.com", "gmx.net", "yandex.com", "zoho.com",
  "rocketmail.com", "ymail.com", "earthlink.net", "comcast.net",
  "att.net", "verizon.net", "sbcglobal.net", "cox.net", "bellsouth.net",
];

export function isBlockedEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return BLOCKED_DOMAINS.includes(domain);
}
