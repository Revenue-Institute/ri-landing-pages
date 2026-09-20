import { adGroups, defaultAdGroup, compareRows } from "./data";
import {
  VerticalProvider,
  VerticalButtons,
  WorkflowComparison,
  IndustryPanel,
} from "./Verticals";
import ContactForm from "./ContactForm";
import Image from "next/image";
import AnswersSection from "./AnswersSection";
import { TrackLink } from "./TrackLink";

const PHONE = "+17342594800";
const PHONE_DISPLAY = "734.259.4800";

/**
 * Google Ads lead-form policy expects an accessible privacy disclosure.
 * Point this at the live policy on the main site.
 */
const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

/* Type scale per docs/brand.md section 3 - clamp() gives the mobile drop
   (H1 to 48px, everything else proportional) without a separate mobile
   stylesheet, same technique the page already used. */
const T = {
  /* brand.md specs 96px, which assumes a short 4-8 word headline. The
     current ad-group headlines are two-sentence, ~11 words - at literal
     96px they wrap to 6 lines instead of the intended 2-3. Scaled down to
     fit the actual copy while keeping the 900 weight and highlight block,
     which are the load-bearing parts of the brand signature. Flagged to
     the user; shortening the headlines themselves would be a copy change
     to live ad creative, not just a rebrand. */
  h1: "clamp(2.25rem, 4.8vw, 4.25rem)",
  h2: "clamp(1.75rem, 4.2vw, 3rem)",
  h3: "clamp(1.25rem, 2.2vw, 1.625rem)",
  lead: "clamp(1.0625rem, 1.7vw, 1.3125rem)",
  stat: "clamp(2.25rem, 4.6vw, 3.25rem)",
} as const;

interface PageProps {
  searchParams: Promise<{ ad?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const adKey = sp.ad && adGroups[sp.ad] ? sp.ad : defaultAdGroup;
  const ad = adGroups[adKey];

  return (
    <div>
      <Header />

      <main id="main">
        <Hero ad={ad} />
        <ProofBand />
        <VerticalProvider>
          <ProblemSection />
          <HowItWorksSection />
          <IndustriesSection />
        </VerticalProvider>
        <CompareSection />
        <CaseStudySection />
        <AnswersSection />
        <StartSection ad={ad} />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}

/* Always-reachable conversion path on small screens. */
function MobileActionBar() {
  return (
    <div className="mobile-cta">
      <TrackLink
        event="LP - CTA Click"
        params={{ cta: "phone", location: "mobile_bar" }}
        href={`tel:${PHONE}`}
        className="mobile-cta-call"
      >
        Call
      </TrackLink>
      <TrackLink
        event="LP - CTA Click"
        params={{ cta: "talk_to_us", location: "mobile_bar" }}
        href="#start-form"
        className="mobile-cta-main"
      >
        {"Tell us the one process ->"}
      </TrackLink>
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "2px solid var(--ri-ink)",
      }}
    >
      <div className="hdr-inner">
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <a href="/" aria-label="Revenue Institute home" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/dark-logo.png" alt="Revenue Institute" width={120} height={37} priority style={{ display: "block", height: "auto" }} />
        </a>
        <TrackLink
          event="LP - CTA Click"
          params={{ cta: "phone_header", location: "header" }}
          href={`tel:${PHONE}`}
          className="hdr-phone tap"
          aria-label={`Call Revenue Institute at ${PHONE_DISPLAY}`}
        >
          {PHONE_DISPLAY}
        </TrackLink>
        <TrackLink
          event="LP - CTA Click"
          params={{ cta: "talk_to_us", location: "header" }}
          href="#start-form"
          className="hdr-cta tap ri-btn"
          style={{ fontSize: 13, padding: "0 20px", minHeight: 40 }}
        >
          Talk to us
        </TrackLink>
      </div>
    </header>
  );
}

function Hero({ ad }: { ad: (typeof adGroups)[string] }) {
  const idx = ad.headline.lastIndexOf(ad.headlineHighlight);
  const before = idx >= 0 ? ad.headline.slice(0, idx) : ad.headline;
  const highlight = idx >= 0 ? ad.headline.slice(idx, idx + ad.headlineHighlight.length) : "";
  const after = idx >= 0 ? ad.headline.slice(idx + ad.headlineHighlight.length) : "";

  return (
    <section>
      <div className="wrap" style={{ paddingTop: "clamp(40px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="hero-grid">
          <div style={{ minWidth: 0 }}>
            <div className="ri-chip-ink" style={{ marginBottom: 24 }}>
              <span className="pulse-dot" aria-hidden="true" style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--ri-green)", marginRight: 8 }} />
              {ad.eyebrow}
            </div>
            <h1
              style={{
                fontSize: T.h1,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
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
            <p
              style={{
                fontSize: T.lead,
                lineHeight: 1.5,
                color: "var(--ri-body)",
                margin: "0 0 32px",
                maxWidth: "48ch",
              }}
            >
              {ad.subhead}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
              <TrackLink
                event="LP - CTA Click"
                params={{ cta: "talk_to_us", location: "hero" }}
                href="#start-form"
                className="ri-btn"
              >
                {"Talk to us ->"}
              </TrackLink>
              <TrackLink
                event="LP - CTA Click"
                params={{ cta: "phone", location: "hero" }}
                href={`tel:${PHONE}`}
                className="ri-link"
                aria-label={`Call Revenue Institute at ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </TrackLink>
            </div>
            <ul style={{ display: "grid", gap: 0, borderTop: "1px solid var(--ri-hairline)", maxWidth: "52ch", listStyle: "none" }}>
              {ad.points.map((p, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 1fr",
                    gap: 14,
                    alignItems: "start",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--ri-hairline)",
                  }}
                >
                  <span aria-hidden="true" style={{ fontWeight: 700, lineHeight: 1.6 }}>
                    +
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ri-body)" }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ minWidth: 0 }}>
            <div className="ri-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 20px" }}>
              {[
                { stat: "$10-30k", label: "typical first build" },
                { stat: "10-15/mo", label: "build capacity" },
                { stat: "45 days", label: "to a live system" },
                { stat: "~5 hrs", label: "from your team" },
              ].map((s) => (
                <div key={s.label} className="ri-stat">
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>{s.stat}</div>
                  <div style={{ fontSize: 13, color: "var(--ri-muted)", marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBand() {
  const logos = [
    { src: "/logos/berry-law.png", alt: "Berry Law", w: 170, h: 41 },
    { src: "/logos/manely-firm.png", alt: "The Manely Firm", w: 41, h: 41 },
    { src: "/logos/inline-logo.svg", alt: "Karbon", w: 116, h: 41 },
    { src: "/logos/lawtrades.svg", alt: "Lawtrades", w: 160, h: 21 },
    { src: "/logos/qualigence.png", alt: "Qualigence", w: 41, h: 41 },
    { src: "/logos/production-theory.png", alt: "Production Theory", w: 120, h: 30 },
    { src: "/logos/edward-jones.png", alt: "Edward Jones", w: 41, h: 41 },
    { src: "/logos/cbre.png", alt: "CBRE", w: 41, h: 41 },
  ];
  return (
    <section className="ri-band-ink">
      <div className="wrap sec-y-sm">
        <h2
          style={{
            fontFamily: "var(--ri-font-display)",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ri-dark-muted)",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          Trusted by industry leaders
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px, 3.4vw, 46px)", flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              style={{ opacity: 0.85, height: "auto", maxWidth: "100%" }}
              className="hover-opacity"
            />
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 15, color: "var(--ri-dark-muted)", margin: 0 }}>
          10-15 builds a month · fixed-scope entry, priced against the hire you&rsquo;d otherwise make
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  const legend = [
    { bg: "var(--ri-ink)", label: "owns it" },
    { bg: "repeating-linear-gradient(115deg, var(--ri-muted) 0 5px, var(--ri-hairline) 5px 10px)", label: "partial" },
    { bg: "var(--ri-muted)", label: "advises only" },
    { bg: "var(--ri-hairline)", label: "not their job" },
  ];
  const rows = [
    { label: "Consultants", cells: ["var(--ri-muted)", "var(--ri-hairline)", "var(--ri-hairline)"] },
    { label: "MSPs", cells: ["var(--ri-hairline)", "var(--ri-hairline)", "repeating-linear-gradient(115deg, var(--ri-muted) 0 5px, var(--ri-hairline) 5px 10px)"] },
    { label: "AI vendors", cells: ["var(--ri-hairline)", "repeating-linear-gradient(115deg, var(--ri-muted) 0 5px, var(--ri-hairline) 5px 10px)", "var(--ri-hairline)"] },
    { label: "Revenue Institute", highlight: true, cells: ["var(--ri-ink)", "var(--ri-ink)", "var(--ri-ink)"] },
  ];
  const cols = ["Evaluate", "Build", "Operate"];

  return (
    <section id="problem" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap sec-y">
        <p style={{ fontSize: 15, color: "var(--ri-green-press)", marginBottom: 26, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>
          The problem
        </p>
        <h2
          style={{
            fontSize: "clamp(1.625rem, 3.6vw, 2.5rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontWeight: 800,
            margin: "0 0 clamp(34px, 4vw, 56px)",
            maxWidth: "22ch",
          }}
        >
          Everyone advises. No one owns it.
        </h2>

        <div className="ri-card">
          <div className="owns-grid" style={{ alignItems: "end", paddingBottom: 16, borderBottom: "1px solid var(--ri-hairline)" }}>
            <div
              className="owns-label"
              style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ri-muted)" }}
            >
              Who owns what
            </div>
            {cols.map((label) => (
              <div key={label} style={{ fontFamily: "var(--ri-font-display)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ri-muted)" }}>
                {label}
              </div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} className="owns-grid" style={{ padding: "18px 0", borderBottom: i < rows.length - 1 ? "1px solid var(--ri-hairline)" : undefined }}>
              <div className="owns-label" style={{ fontSize: 17, color: row.highlight ? "var(--ri-ink)" : "var(--ri-body)", fontWeight: row.highlight ? 800 : 400 }}>
                {row.label}
              </div>
              {row.cells.map((bg, j) => (
                <div
                  key={j}
                  role="img"
                  aria-label={`${row.label}, ${cols[j]}: ${
                    bg === "var(--ri-ink)" ? "owns it" : bg === "var(--ri-muted)" ? "advises only" : bg === "var(--ri-hairline)" ? "not their job" : "partial"
                  }`}
                  style={{ height: 8, background: bg }}
                />
              ))}
            </div>
          ))}
          <div style={{ display: "flex", gap: "clamp(14px, 2vw, 24px)", flexWrap: "wrap", marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--ri-hairline)", fontFamily: "var(--ri-font-display)", fontSize: 12, color: "var(--ri-muted)" }}>
            {legend.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden="true" style={{ width: 18, height: 6, flexShrink: 0, background: item.bg }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const cards = [
    {
      num: "01 - entry",
      title: "Process automation",
      desc: "Your highest-cost manual workflow, automated end to end.",
      bars: ["46%", "38%", "38%"],
      meta1: "fixed-bid",
      meta2: "live in 10-20 days",
    },
    {
      num: "02 - proof",
      title: "Proof of concept",
      desc: "Built on your rules and stack. If the math doesn't hold, we stop.",
      bars: ["46%", "72%", "38%"],
      meta1: "your data",
      meta2: "tied to a number",
    },
    {
      num: "03 - operate",
      title: "AI Operators",
      desc: "Agents that own a role end to end, with a human on the calls that matter.",
      bars: ["46%", "72%", "100%"],
      highlight: true,
      tags: ["Intake coordinator", "Billing clerk", "Pipeline analyst"],
      meta1: "run by us",
      meta2: "supervised by you",
    },
  ];
  const phases = [
    { title: "Capture", weeks: "weeks 1-3" },
    { title: "Orchestrate", weeks: "weeks 4-10" },
    { title: "Run", weeks: "weeks 11-14" },
    { title: "Expand", weeks: "day 100+" },
  ];

  return (
    <section id="how-it-works" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--ri-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>How it works</p>
            <h2 style={{ fontSize: T.h2, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 800, margin: 0, maxWidth: "20ch" }}>
              Small entry. Compounding return.
            </h2>
          </div>
          <p style={{ minWidth: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ri-muted)", margin: 0, maxWidth: "42ch" }}>
            One painful process first. We expand only once the math holds, so you never write the big check on faith. We evaluate, build, and operate every stage ourselves.
          </p>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className={card.highlight ? "ri-card ri-band-ink" : "ri-card"}
              style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column" }}
            >
              <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60, marginBottom: 26 }}>
                {card.bars.map((h, j) => (
                  <span
                    key={j}
                    style={{ width: 22, height: h, background: card.highlight ? "var(--ri-green)" : "var(--ri-ink)", opacity: j === card.bars.length - 1 ? 1 : 0.35 + j * 0.15 }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "var(--ri-font-display)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: card.highlight ? "var(--ri-green)" : "var(--ri-muted)",
                  marginBottom: 14,
                }}
              >
                {card.num}
              </div>
              <h3 style={{ fontSize: T.h3, letterSpacing: "-0.01em", fontWeight: 700, margin: "0 0 10px" }}>{card.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: card.highlight ? "var(--ri-dark-muted)" : "var(--ri-muted)", margin: "0 0 20px" }}>
                {card.desc}
              </p>
              {card.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {card.tags.map((tag) => (
                    <span key={tag} className="ri-chip-green" style={{ fontSize: 12 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {card.highlight && (
                <div style={{ fontSize: 14.5, color: "var(--ri-dark-muted)", lineHeight: 1.55, marginBottom: 20 }}>
                  Curious what one would do in your firm?{" "}
                  <a href="#start-form" className="ri-link" style={{ borderBottomColor: "var(--ri-dark-text)", color: "var(--ri-dark-text)" }}>
                    Tell us the process
                  </a>{" "}
                  and we&rsquo;ll scope it.
                </div>
              )}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 20,
                  borderTop: `1px solid ${card.highlight ? "var(--ri-dark-edge)" : "var(--ri-hairline)"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  fontFamily: "var(--ri-font-display)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: card.highlight ? "var(--ri-dark-muted)" : "var(--ri-muted)",
                }}
              >
                <span>{card.meta1}</span>
                <span style={{ color: card.highlight ? "var(--ri-dark-text)" : "var(--ri-ink)" }}>{card.meta2}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ri-card" style={{ marginTop: "clamp(36px, 4vw, 56px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap", marginBottom: 26 }}>
            <h3 style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ri-muted)" }}>
              Delivery - the C.O.R.E. method
            </h3>
            <div style={{ fontFamily: "var(--ri-font-display)", fontSize: 12, fontWeight: 700, color: "var(--ri-ink)" }}>your total lift: ~4 hours</div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            <div style={{ flex: 3, height: 6, background: "var(--ri-ink)" }} />
            <div style={{ flex: 7, height: 6, background: "#4a4855" }} />
            <div style={{ flex: 4, height: 6, background: "#77748c" }} />
            <div style={{ flex: 4, height: 6, background: "var(--ri-hairline)" }} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {phases.map((phase, i) => (
              <div key={i} style={{ flex: "1 1 140px", minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 6 }}>{phase.title}</div>
                <div style={{ fontFamily: "var(--ri-font-display)", fontSize: 12, color: "var(--ri-muted)" }}>{phase.weeks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--ri-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>
              Built for your firm type
            </p>
            <h2 style={{ fontSize: T.h2, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 800, margin: 0, maxWidth: "20ch" }}>
              Your systems know what a matter is. Or they don&rsquo;t.
            </h2>
          </div>
          <p style={{ minWidth: 0, fontSize: T.lead, lineHeight: 1.55, color: "var(--ri-muted)", margin: 0, maxWidth: "40ch" }}>
            Generic automation stops at the record. Ours is built around the unit of work you bill against.
          </p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <VerticalButtons groupLabel="Choose a firm type to see its workflow and build" />
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <WorkflowComparison />
          <IndustryPanel />
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  const cols = ["Revenue Institute", "Big consulting", "Internal ops", "AI tool alone"];
  return (
    <section id="compare" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--ri-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>
              The honest comparison
            </p>
            <h2 style={{ fontSize: T.h2, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 800, margin: 0, maxWidth: "20ch" }}>
              Us, consulting, your ops team, or a tool
            </h2>
          </div>
          <p style={{ minWidth: 0, fontSize: T.lead, lineHeight: 1.55, color: "var(--ri-muted)", margin: 0, maxWidth: "40ch" }}>
            Including where the other three are the right call.
          </p>
        </div>

        <div style={{ border: "2px solid var(--ri-ink)", overflow: "hidden" }}>
          <div className="cmp-grid cmp-head" style={{ borderBottom: "2px solid var(--ri-ink)" }}>
            <div style={{ padding: "18px 24px", fontFamily: "var(--ri-font-display)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ri-muted)" }}>
              What you need
            </div>
            <div style={{ padding: "18px 16px", fontSize: 14, fontWeight: 800, background: "var(--ri-green-wash)", color: "var(--ri-ink)" }}>
              Revenue Institute
            </div>
            {cols.slice(1).map((c) => (
              <div key={c} style={{ padding: "18px 16px", fontSize: 14, color: "var(--ri-muted)" }}>
                {c}
              </div>
            ))}
          </div>

          {compareRows.map((row, i) => (
            <div key={i} className="cmp-grid cmp-row" style={{ borderBottom: i < compareRows.length - 1 ? "1px solid var(--ri-hairline)" : undefined }}>
              <div className="cmp-label" style={{ padding: "19px 24px", fontSize: 15.5 }}>
                {row.label}
              </div>
              <div className="cmp-cell cmp-cell-ri" data-col={cols[0]} style={{ padding: "19px 16px", fontSize: 14.5, color: "var(--ri-ink)", background: "var(--ri-green-wash)", fontWeight: 700 }}>
                <span>{row.ri}</span>
              </div>
              {[row.consult, row.internal, row.tool].map((v, j) => (
                <div key={j} className="cmp-cell" data-col={cols[j + 1]} style={{ padding: "19px 16px", fontSize: 14.5, color: "var(--ri-muted)" }}>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "var(--ri-font-display)", fontSize: 12, color: "var(--ri-muted)", marginTop: 18, lineHeight: 1.7, maxWidth: "76ch" }}>
          Where the others win: Big Four for board-level M&amp;A diligence; your internal team once the system is stable and documented; a point tool when one narrow task is the entire problem.
        </p>
      </div>
    </section>
  );
}

function CaseStudySection() {
  const stats = [
    { stat: "+326%", desc: "Lead growth, with paid spend down", source: "Berry Law · 2025" },
    { stat: "136 hrs", desc: "Returned to the team, every week", source: "Karbon · steady state 2025" },
    { stat: "2.5 wks", desc: "CRM migration plus a custom integration", source: "Manely Firm · 2025" },
    { stat: "36.2%", desc: "Sourcing time saved by one agent", source: "Qualigence · 2025" },
  ];
  const berry = [
    { stat: "+326%", desc: "Lead growth, with Google Ads spend down" },
    { stat: "3 wks", desc: "To ship what a prior team missed in six months" },
    { stat: "1 FTE", desc: "Of manual lookup work automated. Same employee, new job" },
  ];
  return (
    <section id="case-study" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap sec-y">
        <div className="sec-head">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--ri-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>
              Case study, plus more proof
            </p>
            <h2 style={{ fontSize: T.h2, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 800, margin: 0, maxWidth: "18ch" }}>
              Four numbers, four firms.
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 16, marginBottom: 16 }}>
          {stats.map((s, i) => (
            <div key={i} className="ri-card" style={{ minWidth: 0 }}>
              <div className="ri-stat" style={{ fontSize: T.stat, letterSpacing: "-0.03em", fontWeight: 900 }}>
                {s.stat}
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--ri-body)", marginTop: 16 }}>{s.desc}</div>
              <div style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, color: "var(--ri-muted)", marginTop: 16, lineHeight: 1.7 }}>{s.source}</div>
            </div>
          ))}
        </div>

        <figure className="ri-card ri-band-ink" style={{ margin: 0, display: "flex", gap: "clamp(28px, 3.6vw, 44px)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
              <Image src="/logos/berry-law.png" alt="Berry Law" width={109} height={26} style={{ opacity: 0.9, height: "auto" }} />
              <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, color: "var(--ri-dark-muted)", letterSpacing: "0.06em" }}>
                LEGAL SERVICES · 32,000 ACTIVE CLIENTS
              </span>
            </div>
            <blockquote style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)", lineHeight: 1.36, letterSpacing: "-0.01em", margin: "0 0 20px" }}>
              &ldquo;Revenue Institute was able to align sales, marketing, and IT. They moved us to a privacy-compliant AI system that grew our leads by 326% in 4 months.&rdquo;
            </blockquote>
            <figcaption style={{ fontFamily: "var(--ri-font-display)", fontSize: 12, color: "var(--ri-dark-muted)", letterSpacing: "0.02em" }}>
              Joe DeMike, Chief Marketing Officer at Berry Law
            </figcaption>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--ri-dark-edge)", fontSize: 15, color: "var(--ri-dark-muted)", lineHeight: 1.5, maxWidth: "52ch" }}>
              Led by Stephen Lowisz and a team of Operators at Revenue Institute. No decks included, just results.
            </div>
          </div>
          <div style={{ flex: "1 1 260px", minWidth: 0, display: "grid", gap: 0, alignContent: "start", borderTop: "1px solid var(--ri-dark-edge)" }}>
            {berry.map((item, i) => (
              <div key={i} style={{ padding: "18px 0", borderBottom: i < 2 ? "1px solid var(--ri-dark-edge)" : undefined }}>
                <div className="ri-stat" style={{ fontSize: "clamp(1.875rem, 3.4vw, 2.625rem)", letterSpacing: "-0.02em", fontWeight: 900, borderTopColor: "var(--ri-green)" }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 14.5, color: "var(--ri-dark-muted)", marginTop: 8, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

function StartSection({ ad }: { ad: (typeof adGroups)[string] }) {
  const promises = [
    "One business day, from a person who has built these",
    "A rough range before you spend a meeting on it",
    "If we're not the fit, we say so and point elsewhere",
  ];
  return (
    <section id="start" className="ri-band-ink" style={{ borderTop: "1px solid var(--ri-dark-edge)" }}>
      <div className="wrap sec-y">
        <div className="split-grid">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--ri-dark-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)", fontWeight: 700 }}>Start here</p>
            <h2 style={{ fontSize: T.h2, lineHeight: 1.02, letterSpacing: "-0.02em", fontWeight: 900, margin: "0 0 20px", maxWidth: "16ch" }}>
              Grow the firm, not the payroll.
            </h2>
            <p style={{ fontSize: T.lead, lineHeight: 1.5, color: "var(--ri-dark-text)", margin: "0 0 30px", maxWidth: "36ch" }}>
              Send us the process that&rsquo;s costing you the most hours. We&rsquo;ll tell you straight whether it&rsquo;s worth automating.
            </p>
            <ul style={{ display: "grid", gap: 0, borderTop: "1px solid var(--ri-dark-edge)", listStyle: "none" }}>
              {promises.map((item, i) => (
                <li key={i} style={{ fontSize: 16, color: "var(--ri-dark-text)", padding: "15px 0", borderBottom: i < 2 ? "1px solid var(--ri-dark-edge)" : undefined }}>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 26, fontSize: 16, color: "var(--ri-dark-muted)" }}>
              Rather talk first?{" "}
              <TrackLink event="LP - CTA Click" params={{ cta: "email", location: "start" }} href="mailto:sales@revenueinstitute.com" className="ri-link tap">
                sales@revenueinstitute.com
              </TrackLink>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <ContactForm id="start-form" title={ad.formTitle} hint={ad.fieldHint} onInk />
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ri-dark-muted)", marginTop: 14, textAlign: "center" }}>
              We use your details only to answer this enquiry. No list, no sequence. See our{" "}
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ri-dark-text)", textDecoration: "underline" }}>
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div className="wrap" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: 28, display: "flex", gap: "clamp(28px, 4vw, 48px)", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <Image src="/dark-logo.png" alt="Revenue Institute" width={120} height={37} style={{ display: "block", height: "auto" }} />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ri-muted)", margin: 0, maxWidth: "28ch" }}>
            We evaluate, build, and operate. Novi, Michigan.
          </p>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <TrackLink event="LP - CTA Click" params={{ cta: "talk_to_us", location: "footer" }} href="#start-form" className="tap ri-btn">
            {"Talk to us about one process ->"}
          </TrackLink>
        </div>
      </div>
      <div
        className="wrap"
        style={{
          paddingTop: 22,
          paddingBottom: 48,
          borderTop: "1px solid var(--ri-hairline)",
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
        <span style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="tap" style={{ color: "var(--ri-muted)" }}>
            Privacy policy
          </a>
          <span>Updated 2026 · reviewed by Stephen Lowisz</span>
        </span>
      </div>
    </footer>
  );
}
