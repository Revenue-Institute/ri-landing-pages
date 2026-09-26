import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScheduleEmbed from "./ScheduleEmbed";

const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

export const metadata: Metadata = {
  title: "Book Your CleverSite Call | Revenue Institute",
  description: "Grab 15 minutes to shape the CleverSite roadmap and get early access.",
  robots: { index: false, follow: false },
};

export default function CleverSiteSchedulePage() {
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
          <div className="wrap" style={{ paddingTop: "clamp(40px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
            <div style={{ maxWidth: 640, margin: "0 auto 40px", textAlign: "center" }}>
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
                Skip to the front of the line
              </h1>
              <p style={{ fontSize: "clamp(1.0625rem, 1.7vw, 1.25rem)", lineHeight: 1.5, color: "var(--ri-body)", margin: 0 }}>
                Grab 15 minutes with me and tell me what you need CleverSite to do. Early testers get first access and help shape the roadmap.
              </p>
            </div>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <ScheduleEmbed />
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
    </div>
  );
}
