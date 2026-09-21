import Image from "next/image";
import Link from "next/link";
import type { WaitlistConfig } from "./types";
import WaitlistForm from "./WaitlistForm";
import CleverSiteMockup from "./CleverSiteMockup";
import PieMockup from "./PieMockup";
import CleverSiteEditingMockup from "./CleverSiteEditingMockup";
import PieShareMockup from "./PieShareMockup";

const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

/**
 * The short, StoryBrand-structured "coming soon" page - deliberately far
 * shorter than the full interactive assessment at /<id>, since the two
 * are being A/B tested against each other. Config carries no functions,
 * so this can stay a plain Server Component (only WaitlistForm needs to
 * be a Client Component) - much less client JS than the assessment flow.
 */
export default function WaitlistPage({ config }: { config: WaitlistConfig }) {
  const idx = config.headline.lastIndexOf(config.headlineHighlight);
  const before = idx >= 0 ? config.headline.slice(0, idx) : config.headline;
  const highlight = idx >= 0 ? config.headline.slice(idx, idx + config.headlineHighlight.length) : "";
  const after = idx >= 0 ? config.headline.slice(idx + config.headlineHighlight.length) : "";

  return (
    <div>
      <header style={{ borderBottom: "2px solid var(--ri-ink)" }}>
        <div className="wrap" style={{ padding: "14px var(--pad-x)" }}>
          <Link href="/" aria-label="Revenue Institute home" style={{ display: "inline-flex" }}>
            <Image src="/dark-logo.png" alt="Revenue Institute" width={120} height={37} priority style={{ display: "block", height: "auto" }} />
          </Link>
        </div>
      </header>

      <main id="main">
        {/* Hero - character's desire as the headline, guide's product as the answer */}
        <section>
          <div className="wrap" style={{ paddingTop: "clamp(40px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
            <div className="hero-grid">
              <div style={{ minWidth: 0 }}>
                <div className="ri-chip-ink" style={{ marginBottom: 24 }}>
                  {config.eyebrow}
                </div>
                <h1
                  style={{
                    fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    fontWeight: 900,
                    margin: "0 0 24px",
                    maxWidth: "18ch",
                    textWrap: "pretty" as const,
                  }}
                >
                  {before}
                  {highlight && <span className="ri-hl">{highlight}</span>}
                  {after}
                </h1>
                <p style={{ fontSize: "clamp(1.0625rem, 1.7vw, 1.3125rem)", lineHeight: 1.5, color: "var(--ri-body)", margin: "0 0 32px", maxWidth: "48ch" }}>
                  {config.subhead}
                </p>
                <WaitlistForm productId={config.id} productName={config.productName} />
                <p style={{ fontSize: 13, color: "var(--ri-muted)", marginTop: 14 }}>{config.reassurance}</p>
              </div>

              <div style={{ minWidth: 0 }}>
                {config.id === "cleversite" ? <CleverSiteMockup /> : <PieMockup />}
              </div>
            </div>
          </div>
        </section>

        {/* Problem - external + internal, brief */}
        <section style={{ borderTop: "1px solid var(--ri-hairline)" }}>
          <div className="wrap sec-y-sm">
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 800,
                margin: "0 0 24px",
                maxWidth: "20ch",
              }}
            >
              {config.problem.headline}
            </h2>
            <div style={{ display: "grid", gap: 20, maxWidth: "68ch" }}>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ri-body)", margin: 0 }}>{config.problem.external}</p>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ri-ink)", margin: 0, fontWeight: 600 }}>{config.problem.internal}</p>
            </div>
          </div>
        </section>

        {/* Plan - 3 steps, StoryBrand's process plan - paired with a second
            mockup showing the other half of the mechanism (the hero mockup
            covers input/results; this one covers the ongoing work itself). */}
        <section style={{ borderTop: "1px solid var(--ri-hairline)" }}>
          <div className="wrap sec-y-sm">
            <p style={{ fontSize: 13, fontFamily: "var(--ri-font-display)", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ri-muted)", marginBottom: 22 }}>
              How it will work
            </p>
            <div className="split-grid">
              <div style={{ display: "grid", gap: 16, minWidth: 0 }}>
                {config.plan.map((p, i) => (
                  <div key={p.step} className="ri-card">
                    <div style={{ fontFamily: "var(--ri-font-display)", fontSize: 28, fontWeight: 900, color: "var(--ri-ink)", marginBottom: 12 }}>
                      0{i + 1}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{p.step}</div>
                    <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ri-muted)", margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ minWidth: 0, alignSelf: "center" }}>
                {config.id === "cleversite" ? <CleverSiteEditingMockup /> : <PieShareMockup />}
              </div>
            </div>
          </div>
        </section>

        {/* Guide (empathy + authority) + success/failure stakes + closing CTA.
            Two columns (brand.md's split-grid, same pattern as the homepage's
            closing section) so the card doesn't strand a full-bleed ink band
            in a narrow left column with dead space beside it. */}
        <section className="ri-band-ink" style={{ borderTop: "1px solid var(--ri-dark-edge)" }}>
          <div className="wrap sec-y">
            <div className="split-grid">
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ri-dark-text)", margin: "0 0 32px", maxWidth: "54ch" }}>
                  {config.guideLine}
                </p>
                <div style={{ display: "grid", gap: 20, maxWidth: "54ch" }}>
                  <p style={{ fontSize: "clamp(1.375rem, 2.6vw, 1.75rem)", lineHeight: 1.35, letterSpacing: "-0.01em", fontWeight: 700, margin: 0 }}>
                    {config.successLine}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ri-dark-muted)", margin: 0 }}>{config.failureLine}</p>
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="ri-card">
                  <h3 style={{ fontFamily: "var(--ri-font-display)", fontSize: 18, fontWeight: 800, marginBottom: 14 }}>
                    Get on the {config.productName} waitlist
                  </h3>
                  <WaitlistForm productId={config.id} productName={config.productName} />
                  <p style={{ fontSize: 13, color: "var(--ri-dark-muted)", marginTop: 14 }}>{config.reassurance}</p>
                </div>
              </div>
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
