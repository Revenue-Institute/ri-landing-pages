import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingConfirmedTracker from "./BookingConfirmedTracker";

const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

export const metadata: Metadata = {
  title: "You're Booked | Revenue Institute",
  description: "Your CleverSite early-access call is confirmed.",
  robots: { index: false, follow: false },
};

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name.trim();
}

function formatWhen(startAt?: string, timeZone?: string): string | null {
  if (!startAt) return null;
  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return null;
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }
}

export default async function CleverSiteScheduleThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const get = (key: string) => {
    const value = params[key];
    return typeof value === "string" ? value : undefined;
  };
  const link = get("link");
  const email = get("email");
  const displayName = get("display_name");
  const startAt = get("start_at");
  const timeZone = get("tz");
  const when = formatWhen(startAt, timeZone);

  return (
    <div className="waitlist-page">
      <header style={{ borderBottom: "2px solid var(--ri-ink)" }}>
        <div className="wrap" style={{ padding: "14px var(--pad-x)" }}>
          <Link href="/" aria-label="Revenue Institute home" style={{ display: "inline-flex" }}>
            <Image src="/dark-logo.png" alt="Revenue Institute" width={120} height={37} priority style={{ display: "block", height: "auto" }} />
          </Link>
        </div>
      </header>

      <main id="main">
        <section>
          <div className="wrap" style={{ paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)" }}>
            <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              <div className="ri-chip-ink" style={{ marginBottom: 24, display: "inline-flex" }}>
                CleverSite early access
              </div>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 900,
                  margin: "0 0 16px",
                }}
              >
                {displayName ? `You're booked, ${firstName(displayName)}.` : "You're booked."}
              </h1>
              <p style={{ fontSize: "clamp(1.0625rem, 1.7vw, 1.25rem)", lineHeight: 1.5, color: "var(--ri-body)", margin: "0 0 8px" }}>
                {when
                  ? `See you ${when}. A calendar invite is on its way${email ? ` to ${email}` : ""}.`
                  : `A calendar invite is on its way${email ? ` to ${email}` : ""}.`}
              </p>
              <p style={{ fontSize: 15, color: "var(--ri-muted)", margin: "24px 0 0" }}>
                <Link href="/" style={{ color: "var(--ri-ink)", fontWeight: 700, textDecoration: "underline" }}>
                  Back to Revenue Institute
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--ri-hairline)" }}>
        <div
          className="wrap"
          style={{
            paddingTop: 22,
            paddingBottom: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: "var(--ri-font-display)",
            fontSize: 12,
            color: "var(--ri-muted)",
          }}
        >
          <span>© 2026 Revenue Institute</span>
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ri-muted)" }}>
            Privacy policy
          </a>
        </div>
      </footer>

      <BookingConfirmedTracker link={link} email={email} displayName={displayName} startAt={startAt} timeZone={timeZone} />
    </div>
  );
}
