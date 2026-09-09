import { adGroups, defaultAdGroup, compareRows } from "./data";
import {
  VerticalProvider,
  VerticalButtons,
  WorkflowComparison,
  IndustryPanel,
} from "./Verticals";
import ContactForm from "./ContactForm";
import Image from "next/image";
import FAQSection from "./FAQSection";
import { TrackLink } from "./TrackLink";

const MONO: string = "var(--font-mono), monospace";
const GROTESK: string = "var(--font-grotesk), 'Helvetica Neue', Helvetica, sans-serif";

const PHONE = "+17342594800";
const PHONE_DISPLAY = "734.259.4800";

/**
 * Google Ads lead-form policy expects an accessible privacy disclosure.
 * Point this at the live policy on the main site.
 */
const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

/* Fluid type scale. Inline styles cannot hold media queries, so every
   heading is expressed as a clamp between its mobile and desktop size. */
const T = {
  h1: "clamp(2.25rem, 6.4vw, 4.125rem)",
  h2: "clamp(1.875rem, 4.6vw, 3.25rem)",
  h2sm: "clamp(1.75rem, 4vw, 2.75rem)",
  statement: "clamp(1.625rem, 3.6vw, 2.5rem)",
  h3: "clamp(1.25rem, 2.2vw, 1.5625rem)",
  h3lg: "clamp(1.25rem, 2.4vw, 1.625rem)",
  quote: "clamp(1.25rem, 2.6vw, 1.75rem)",
  statBig: "clamp(2.25rem, 4.6vw, 3.25rem)",
  statMid: "clamp(1.875rem, 3.4vw, 2.625rem)",
  subhead: "clamp(1.0625rem, 1.8vw, 1.25rem)",
  lead: "clamp(1rem, 1.5vw, 1.125rem)",
} as const;

interface PageProps {
  searchParams: Promise<{ ad?: string; banner?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const adKey = sp.ad && adGroups[sp.ad] ? sp.ad : defaultAdGroup;
  const ad = adGroups[adKey];
  const showBanner = sp.banner !== "false";

  return (
    /*
     * No overflow-x here. It made overflow-y compute to `auto`, turning this
     * div into a scroll container, which silently broke `position: sticky`
     * on the header for the entire page.
     */
    <div style={{ fontFamily: GROTESK }}>
      {showBanner && (
        <div
          style={{
            background: "var(--bg-green)",
            borderBottom: "1px solid #1A2C24",
            padding: "10px var(--pad-x)",
            textAlign: "center",
            fontSize: 13.5,
            lineHeight: 1.5,
            color: "var(--text-muted)",
          }}
        >
          <span style={{ color: "var(--text)" }}>Talk to us about one process</span>
          <span className="banner-detail"> · 30 minutes, no pitch deck</span> ·{" "}
          <TrackLink
            event="LP - CTA Click"
            params={{ cta: "book_a_call", location: "banner" }}
            href="#hero-form"
            style={{ display: "inline-block", padding: "6px 0" }}
          >
            book a call →
          </TrackLink>
        </div>
      )}

      <Header />

      <main id="main">
        <Hero ad={ad} />
        <StepsSection />
        <VerticalProvider>
          <AnswerSection />
          <LadderSection />
          <ProofSection />
          <ObjectionsSection />
          <IndustriesSection />
        </VerticalProvider>
        <CompareSection />
        <StartSection ad={ad} />
        <FAQSection />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}

/* Always-reachable conversion path on small screens. Without it the page
   had stretches of seven screens with no call to action in reach. */
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
        Tell us the one process →
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
        // Opaque enough to stay legible over the light comparison section
        background: "rgba(8,9,10,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="hdr-inner">
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <div className="hdr-logo" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logos/revenue-institute.png"
            alt="Revenue Institute"
            width={120}
            height={37}
            priority
            style={{ display: "block" }}
          />
        </div>
        <TrackLink
          event="LP - CTA Click"
          params={{ cta: "phone_header", location: "header" }}
          href={`tel:${PHONE}`}
          className="hdr-phone tap hover-light"
          aria-label={`Call Revenue Institute at ${PHONE_DISPLAY}`}
        >
          {PHONE_DISPLAY}
        </TrackLink>
        <TrackLink
          event="LP - CTA Click"
          params={{ cta: "talk_to_us", location: "header" }}
          href="#hero-form"
          className="hdr-cta tap hover-white"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--bg)",
            background: "var(--accent)",
            padding: "0 20px",
            borderRadius: 100,
          }}
        >
          Talk to us
        </TrackLink>
      </div>
    </header>
  );
}

function Hero({ ad }: { ad: (typeof adGroups)[string] }) {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#0D1012 1px, transparent 1px), linear-gradient(90deg, #0D1012 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -300,
          left: "30%",
          width: 1000,
          height: 760,
          background:
            "radial-gradient(ellipse at center, rgba(91,224,165,0.11), rgba(8,9,10,0) 66%)",
        }}
      />
      <div
        className="wrap"
        style={{
          position: "relative",
          paddingTop: "clamp(36px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 48px)",
        }}
      >
        <div className="hero-grid">
          <div className="hero-copy">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                border: "1px solid var(--line-4)",
                borderRadius: 100,
                padding: "8px 16px",
                marginBottom: 26,
              }}
            >
              <span
                className="pulse-dot"
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  flexShrink: 0,
                }}
              />
              <span>{ad.eyebrow}</span>
            </div>
            <h1
              style={{
                fontSize: T.h1,
                lineHeight: 1.03,
                letterSpacing: "-0.045em",
                fontWeight: 500,
                margin: "0 0 20px",
                maxWidth: "21ch",
                textWrap: "pretty" as const,
              }}
            >
              {ad.headline}
            </h1>
            <p
              style={{
                fontSize: T.subhead,
                lineHeight: 1.5,
                color: "var(--text-body)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              {ad.subhead}
            </p>
          </div>

          {/* On mobile this sits directly under the headline, ahead of the
              supporting bullets, so the form is reachable in one scroll. */}
          <div className="hero-form-slot">
            <ContactForm id="hero-form" title={ad.formTitle} hint={ad.fieldHint} />
          </div>

          <div className="hero-points">
            <ul
              style={{
                display: "grid",
                gap: 0,
                borderTop: "1px solid var(--line-4)",
                maxWidth: "52ch",
                listStyle: "none",
              }}
            >
              {ad.points.map((p, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 1fr",
                    gap: 14,
                    alignItems: "start",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--line-2)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--accent)", fontFamily: MONO, fontSize: 12, lineHeight: 1.6 }}
                  >
                    →
                  </span>
                  <span style={{ fontSize: 16.5, lineHeight: 1.55, color: "var(--text-body)" }}>
                    {p}
                  </span>
                </li>
              ))}
            </ul>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 20,
                fontSize: 15,
                color: "var(--text-muted)",
                flexWrap: "wrap",
              }}
            >
              Prefer the phone?{" "}
              <TrackLink
                event="LP - CTA Click"
                params={{ cta: "phone", location: "hero" }}
                href={`tel:${PHONE}`}
                className="tap"
                style={{ fontSize: 17 }}
                aria-label={`Call Revenue Institute at ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </TrackLink>
            </div>
          </div>
        </div>

        <LogoBar />
      </div>
    </section>
  );
}

function StepsSection() {
  const steps = [
    { num: "01", title: "Evaluate", desc: "We rank the work a system can take over by ROI, not by ease." },
    { num: "02", title: "Build", desc: "A working system on your data and rules. Not a demo." },
    { num: "03", title: "Operate", desc: "We run it after go-live and answer for what it produces." },
  ];
  return (
    <section style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec-y-sm">
        <h2 className="sr-only">How an engagement works</h2>
        <div
          style={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "stretch",
            border: "1px solid var(--line-3)",
            borderRadius: 20,
            background: "var(--line)",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 260px",
                minWidth: 0,
                padding: "clamp(26px, 3vw, 38px) clamp(22px, 2.6vw, 34px)",
                background: "#0C0F10",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    color: "var(--accent)",
                  }}
                >
                  {step.num}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    height: 1,
                    background: "linear-gradient(90deg, #5BE0A5, #1A2C24)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.125rem, 1.9vw, 1.3125rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.022em",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-dim)", margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
          <div
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              padding: "clamp(26px, 3vw, 38px) clamp(22px, 2.6vw, 34px)",
              background: "var(--bg-green)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2rem, 3.6vw, 2.75rem)",
                lineHeight: 1,
                letterSpacing: "-0.045em",
                fontWeight: 500,
                color: "var(--accent)",
              }}
            >
              45
            </div>
            <div style={{ fontSize: 15, color: "var(--text-body)", marginTop: 10, lineHeight: 1.5 }}>
              days to a live system
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: "var(--text-faint)",
                marginTop: 16,
                paddingTop: 14,
                borderTop: "1px solid var(--line-green)",
              }}
            >
              ~5 hrs from your team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoBar() {
  const logos = [
    { src: "/logos/berry-law.png", alt: "Berry Law", w: 170, h: 41, opacity: 0.72 },
    { src: "/logos/manely-firm.png", alt: "The Manely Firm", w: 41, h: 41, opacity: 0.85, radius: 8 },
    // Intrinsic SVG is 442x58; the old 73x26 box squashed it out of ratio.
    { src: "/logos/inline-logo.svg", alt: "Karbon", w: 116, h: 41, opacity: 0.72 },
    { src: "/logos/lawtrades.svg", alt: "Lawtrades", w: 160, h: 21, opacity: 0.72 },
    { src: "/logos/qualigence.png", alt: "Qualigence", w: 41, h: 41, opacity: 0.85, radius: 8 },
    { src: "/logos/production-theory.png", alt: "Production Theory", w: 120, h: 30, opacity: 0.72 },
    { src: "/logos/edward-jones.png", alt: "Edward Jones", w: 41, h: 41, opacity: 0.85, radius: 8 },
    { src: "/logos/cbre.png", alt: "CBRE", w: 41, h: 41, opacity: 0.85, radius: 8 },
  ];
  return (
    <div style={{ marginTop: "clamp(36px, 4vw, 48px)" }}>
      <h2
        style={{
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Trusted by industry leaders
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(24px, 3.4vw, 46px)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {logos.map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            style={{
              opacity: logo.opacity,
              borderRadius: logo.radius || undefined,
              height: "auto",
              maxWidth: "100%",
            }}
            className="hover-opacity"
          />
        ))}
      </div>
    </div>
  );
}

function AnswerSection() {
  const legend = [
    { bg: "#5BE0A5", label: "owns it" },
    { bg: "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)", label: "partial" },
    { bg: "#2B4F3F", label: "advises only" },
    { bg: "#16191A", label: "not their job" },
  ];
  const rows = [
    { label: "Consultants", cells: ["#2B4F3F", "#16191A", "#16191A"] },
    { label: "MSPs", cells: ["#16191A", "#16191A", "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)"] },
    { label: "AI vendors", cells: ["#16191A", "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)", "#16191A"] },
    { label: "Revenue Institute", highlight: true, cells: ["#5BE0A5", "#5BE0A5", "#5BE0A5"] },
  ];
  const cols = ["Evaluate", "Build", "Operate"];

  return (
    <section id="answer">
      <div className="wrap sec-y">
        <p style={{ fontSize: 15, color: "var(--accent)", marginBottom: 26 }}>
          What does Revenue Institute do?
        </p>
        <h2
          style={{
            fontSize: T.statement,
            lineHeight: 1.24,
            letterSpacing: "-0.032em",
            fontWeight: 500,
            margin: "0 0 clamp(34px, 4vw, 56px)",
            maxWidth: "26ch",
            textWrap: "pretty" as const,
          }}
        >
          We build the systems a firm runs on, then we{" "}
          <span style={{ color: "var(--accent)" }}>run them</span>.
        </h2>

        <div
          style={{
            border: "1px solid var(--line-3)",
            borderRadius: 20,
            background: "var(--bg-card)",
            padding: "clamp(24px, 3vw, 34px) clamp(20px, 3vw, 40px) clamp(22px, 2.6vw, 30px)",
          }}
        >
          <div
            className="owns-grid"
            style={{ alignItems: "end", paddingBottom: 16, borderBottom: "1px solid var(--line-2)" }}
          >
            <div
              className="owns-label"
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
              }}
            >
              Who owns what
            </div>
            {cols.map((label) => (
              <div
                key={label}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="owns-grid"
              style={{
                padding: "18px 0",
                borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : undefined,
              }}
            >
              <div
                className="owns-label"
                style={{
                  fontSize: 17,
                  color: row.highlight ? "var(--text)" : "var(--text-muted)",
                  fontWeight: row.highlight ? 500 : undefined,
                }}
              >
                {row.label}
              </div>
              {row.cells.map((bg, j) => (
                <div
                  key={j}
                  role="img"
                  aria-label={`${row.label}, ${cols[j]}: ${
                    bg === "#5BE0A5"
                      ? "owns it"
                      : bg === "#2B4F3F"
                        ? "advises only"
                        : bg === "#16191A"
                          ? "not their job"
                          : "partial"
                  }`}
                  style={{ height: 10, borderRadius: 100, background: bg }}
                />
              ))}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              gap: "clamp(14px, 2vw, 24px)",
              flexWrap: "wrap",
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px solid var(--line-2)",
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--text-faint)",
            }}
          >
            {legend.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  aria-hidden="true"
                  style={{ width: 18, height: 7, borderRadius: 100, background: item.bg, flexShrink: 0 }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "clamp(52px, 6vw, 88px)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 400, color: "var(--text-dim)", marginBottom: 16 }}>
            See it in your kind of firm
          </h3>
          <div style={{ marginBottom: 20 }}>
            <VerticalButtons groupLabel="Choose a firm type to see its workflow" />
          </div>
          <WorkflowComparison />
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 22 }}>
              Built for your firm type
            </p>
            <h2
              style={{
                fontSize: T.h2,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "20ch",
                textWrap: "balance" as const,
              }}
            >
              Your systems know what a matter is. Or they don&rsquo;t.
            </h2>
          </div>
          <p
            style={{
              minWidth: 0,
              fontSize: T.lead,
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: 0,
              maxWidth: "40ch",
            }}
          >
            Generic automation stops at the record. Ours is built around the unit of work you bill
            against.
          </p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <VerticalButtons groupLabel="Choose a firm type to see how it is built" />
        </div>
        <IndustryPanel />
      </div>
    </section>
  );
}

function LadderSection() {
  const cards = [
    {
      num: "01 · entry",
      title: "Process automation",
      desc: "Your highest-cost manual workflow, automated end to end.",
      bars: ["46%", "38%", "38%"],
      colors: ["#5BE0A5", "#1A2C24", "#1A2C24"],
      meta1: "fixed-bid",
      meta2: "live in 10-20 days",
    },
    {
      num: "02 · proof",
      title: "Proof of concept",
      desc: "Built on your rules and stack. If the math doesn't hold, we stop.",
      bars: ["46%", "72%", "38%"],
      colors: ["#1A2C24", "#5BE0A5", "#1A2C24"],
      meta1: "your data",
      meta2: "tied to a number",
    },
    {
      num: "03 · operate",
      title: "AI Operators",
      desc: "Agents that own a role end to end, with a human on the calls that matter.",
      bars: ["46%", "72%", "100%"],
      colors: ["#1A2C24", "#1A2C24", "#5BE0A5"],
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
    <section id="ladder" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 22 }}>The ladder</p>
            <h2
              style={{
                fontSize: T.h2,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Small entry. Compounding return.
            </h2>
          </div>
          <p
            style={{
              minWidth: 0,
              fontSize: T.lead,
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: 0,
              maxWidth: "42ch",
            }}
          >
            One painful process first. We expand only once the math holds, so you never write the
            big check on faith.
          </p>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 300px",
                minWidth: 0,
                border: card.highlight ? "1px solid var(--accent-line)" : "1px solid var(--line-3)",
                borderRadius: 18,
                background: card.highlight
                  ? "linear-gradient(180deg, #0D1512, #0A0C0D)"
                  : "var(--bg-card)",
                padding: "var(--card-pad)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                aria-hidden="true"
                style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 72, marginBottom: 26 }}
              >
                {card.bars.map((h, j) => (
                  <span
                    key={j}
                    style={{ width: 22, height: h, background: card.colors[j], borderRadius: 3 }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: card.highlight ? "var(--text-dim)" : "var(--accent)",
                  marginBottom: 14,
                }}
              >
                {card.num}
              </div>
              <h3
                style={{
                  fontSize: T.h3,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                  margin: "0 0 10px",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--text-dim)", margin: "0 0 20px" }}>
                {card.desc}
              </p>
              {card.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12.5,
                        border: "1px solid var(--accent-line)",
                        padding: "5px 10px",
                        borderRadius: 100,
                        color: "var(--text-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {card.highlight && (
                <div style={{ fontSize: 14.5, color: "var(--text-dim)", lineHeight: 1.55, marginBottom: 20 }}>
                  Curious what one would do in your firm?{" "}
                  <TrackLink
                    event="LP - CTA Click"
                    params={{ cta: "tell_us_the_process", location: "ladder" }}
                    href="#start-form"
                    style={{ display: "inline-block", padding: "4px 0" }}
                  >
                    Tell us the process
                  </TrackLink>{" "}
                  and we&rsquo;ll scope it.
                </div>
              )}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 20,
                  borderTop: card.highlight ? "1px solid var(--line-green)" : "1px solid var(--line-2)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  fontFamily: MONO,
                  fontSize: 11.5,
                  color: "var(--text-dim)",
                }}
              >
                <span>{card.meta1}</span>
                <span style={{ color: "var(--text-body)" }}>{card.meta2}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "clamp(36px, 4vw, 56px)",
            border: "1px solid var(--line-3)",
            borderRadius: 18,
            background: "var(--bg-card)",
            padding: "clamp(26px, 3vw, 36px) clamp(22px, 3vw, 40px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            <h3
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
              }}
            >
              Delivery · the C.O.R.E. method
            </h3>
            <div style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--accent)" }}>
              your total lift: ~4 hours
            </div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            <div style={{ flex: 3, height: 8, background: "#5BE0A5", borderRadius: "100px 0 0 100px" }} />
            <div style={{ flex: 7, height: 8, background: "#3A8C68" }} />
            <div style={{ flex: 4, height: 8, background: "#23533F" }} />
            <div style={{ flex: 4, height: 8, background: "#17251F", borderRadius: "0 100px 100px 0" }} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {phases.map((phase, i) => (
              <div key={i} style={{ flex: "1 1 140px", minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {phase.title}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--text-dim)" }}>
                  {phase.weeks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  const stats = [
    { stat: "+326%", bar: "100%", desc: "Lead growth, with paid spend down", source: "Berry Law · 2025" },
    { stat: "136 hrs", bar: "74%", desc: "Returned to the team, every week", source: "Karbon · steady state 2025" },
    { stat: "2.5 wks", bar: "52%", desc: "CRM migration plus a custom integration", source: "Manely Firm · 2025" },
    { stat: "36.2%", bar: "36%", desc: "Sourcing time saved by one agent", source: "Qualigence · 2025" },
  ];
  const berry = [
    { stat: "+326%", desc: "Lead growth, with Google Ads spend down" },
    { stat: "3 wks", desc: "To ship what a prior team missed in six months" },
    { stat: "1 FTE", desc: "Of manual lookup work automated. Same employee, new job" },
  ];
  return (
    <section id="proof" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec-y">
        <div className="sec-head">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 22 }}>
              Proof, with sources
            </p>
            <h2
              style={{
                fontSize: T.h2,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              Four numbers, four firms.
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            gap: 16,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                minWidth: 0,
                border: "1px solid var(--line-3)",
                borderRadius: 18,
                background: "var(--bg-card)",
                padding: "var(--card-pad)",
              }}
            >
              <div
                style={{
                  fontSize: T.statBig,
                  lineHeight: 1,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                {s.stat}
              </div>
              <div
                aria-hidden="true"
                style={{ height: 3, background: "#16191A", borderRadius: 100, margin: "20px 0" }}
              >
                <div style={{ height: 3, width: s.bar, background: "var(--accent)", borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--text-body)" }}>{s.desc}</div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  color: "var(--text-faint)",
                  marginTop: 16,
                  lineHeight: 1.7,
                }}
              >
                {s.source}
              </div>
            </div>
          ))}
        </div>

        <figure
          style={{
            margin: "16px 0 0",
            border: "1px solid var(--line-3)",
            borderRadius: 18,
            background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
            padding: "clamp(26px, 3.4vw, 44px)",
            display: "flex",
            gap: "clamp(28px, 3.6vw, 44px)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <Image
                src="/logos/berry-law.png"
                alt="Berry Law"
                width={109}
                height={26}
                style={{ opacity: 0.85, height: "auto" }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  color: "var(--text-faint)",
                  letterSpacing: "0.1em",
                }}
              >
                LEGAL SERVICES · 32,000 ACTIVE CLIENTS
              </span>
            </div>
            <blockquote
              style={{
                fontSize: T.quote,
                lineHeight: 1.36,
                letterSpacing: "-0.028em",
                margin: "0 0 20px",
                textWrap: "pretty" as const,
              }}
            >
              &ldquo;Revenue Institute was able to align sales, marketing, and IT. They moved us to
              a privacy-compliant AI system that grew our leads by 326% in 4 months.&rdquo;
            </blockquote>
            <figcaption
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
              }}
            >
              Joe DeMike, Chief Marketing Officer at Berry Law
            </figcaption>
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--line-2)",
                fontSize: 15,
                color: "var(--text-muted)",
                lineHeight: 1.5,
                maxWidth: "52ch",
              }}
            >
              Led by Stephen Lowisz and a team of Operators at Revenue Institute. No PowerPoints
              included, just results.
            </div>
          </div>
          <div
            style={{
              flex: "1 1 260px",
              minWidth: 0,
              display: "grid",
              gap: 0,
              alignContent: "start",
              borderTop: "1px solid var(--line-4)",
            }}
          >
            {berry.map((item, i) => (
              <div
                key={i}
                style={{ padding: "18px 0", borderBottom: i < 2 ? "1px solid var(--line-2)" : undefined }}
              >
                <div
                  style={{
                    fontSize: T.statMid,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontWeight: 500,
                    color: "var(--accent)",
                  }}
                >
                  {item.stat}
                </div>
                <div style={{ fontSize: 14.5, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

function ObjectionsSection() {
  const items = [
    {
      quote: "“AI is hype. It won’t work in a firm like mine.”",
      answer: "Then judge it on a number, not a narrative.",
      stat: "+326%",
      statLabel: "leads, spend down",
    },
    {
      quote: "“We don’t have bandwidth for an implementation.”",
      answer: "Four hours from your team, all in week one.",
      stat: "2.5 wks",
      statLabel: "start to finish",
    },
    {
      quote: "“We hired a consultant once and got slides.”",
      answer: "We stay on the system after go-live.",
      stat: "136 hrs",
      statLabel: "back per week",
    },
  ];
  return (
    <section id="objections" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec-y">
        <h2
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "var(--text-dim)",
            marginBottom: 22,
          }}
        >
          Three fair objections
        </h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 320px",
                minWidth: 0,
                border: "1px solid var(--line-3)",
                borderRadius: 18,
                background: "var(--bg-card)",
                padding: "var(--card-pad)",
              }}
            >
              <h3
                style={{
                  fontSize: T.h3lg,
                  lineHeight: 1.18,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                  margin: "0 0 14px",
                }}
              >
                {item.quote}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 24px" }}>
                {item.answer}
              </p>
              <div
                style={{
                  borderTop: "1px solid var(--line-2)",
                  paddingTop: 20,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    fontWeight: 500,
                    color: "var(--accent)",
                  }}
                >
                  {item.stat}
                </span>
                <span style={{ fontSize: 14, color: "var(--text-dim)" }}>{item.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  const cols = ["Revenue Institute", "Big consulting", "Internal ops", "AI tool alone"];
  return (
    <section id="compare" style={{ background: "var(--l-bg)", color: "var(--l-text)" }}>
      <div className="wrap sec-y">
        <div className="sec-head has-aside">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--l-muted)", marginBottom: 22 }}>
              The honest comparison
            </p>
            <h2
              style={{
                fontSize: T.h2,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Us, consulting, your ops team, or a tool
            </h2>
          </div>
          <p
            style={{
              minWidth: 0,
              fontSize: T.lead,
              lineHeight: 1.6,
              color: "var(--l-muted)",
              margin: 0,
              maxWidth: "40ch",
            }}
          >
            Including where the other three are the right call.
          </p>
        </div>

        {/* Below 900px each row collapses into a labelled card. The fixed
            5-column grid crushed data cells to 50px and overlapped headers. */}
        <div
          style={{
            border: "1px solid var(--l-line)",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--l-surface)",
          }}
        >
          <div className="cmp-grid cmp-head" style={{ borderBottom: "1px solid #E4E6E0" }}>
            <div
              style={{
                padding: "18px 24px",
                fontFamily: MONO,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--l-muted)",
              }}
            >
              What you need
            </div>
            <div
              style={{
                padding: "18px 16px",
                fontSize: 14,
                fontWeight: 600,
                background: "var(--l-text)",
                color: "#F3F4F1",
              }}
            >
              Revenue Institute
            </div>
            {cols.slice(1).map((c) => (
              <div key={c} style={{ padding: "18px 16px", fontSize: 14, color: "var(--l-muted)" }}>
                {c}
              </div>
            ))}
          </div>

          {compareRows.map((row, i) => (
            <div
              key={i}
              className="cmp-grid cmp-row"
              style={{ borderBottom: "1px solid var(--l-line-2)" }}
            >
              <div className="cmp-label" style={{ padding: "19px 24px", fontSize: 15.5 }}>
                {row.label}
              </div>
              <div
                className="cmp-cell cmp-cell-ri"
                data-col={cols[0]}
                style={{
                  padding: "19px 16px",
                  fontSize: 14.5,
                  color: "var(--l-ri)",
                  background: "var(--l-ri-bg)",
                  fontWeight: 500,
                }}
              >
                <span>{row.ri}</span>
              </div>
              {[row.consult, row.internal, row.tool].map((v, j) => (
                <div
                  key={j}
                  className="cmp-cell"
                  data-col={cols[j + 1]}
                  style={{ padding: "19px 16px", fontSize: 14.5, color: "var(--l-faint)" }}
                >
                  <span>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: MONO,
            fontSize: 11.5,
            color: "var(--l-muted)",
            marginTop: 18,
            lineHeight: 1.8,
            maxWidth: "76ch",
          }}
        >
          Where the others win: Big Four for board-level M&amp;A diligence; your internal team once
          the system is stable and documented; a point tool when one narrow task is the entire
          problem.
        </p>
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
    <section id="start" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--line)" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 1000px 460px at 50% 118%, rgba(91,224,165,0.11), rgba(8,9,10,0) 70%)",
        }}
      />
      <div className="wrap sec-y" style={{ position: "relative" }}>
        <div className="split-grid">
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 22 }}>Start here</p>
            <h2
              style={{
                fontSize: T.h2,
                lineHeight: 1.03,
                letterSpacing: "-0.042em",
                fontWeight: 500,
                margin: "0 0 20px",
                maxWidth: "16ch",
                textWrap: "balance" as const,
              }}
            >
              Grow the firm, not the payroll.
            </h2>
            <p
              style={{
                fontSize: T.subhead,
                lineHeight: 1.55,
                color: "var(--text-body)",
                margin: "0 0 30px",
                maxWidth: "36ch",
              }}
            >
              Send us the process that&rsquo;s costing you the most hours. We&rsquo;ll tell you
              straight whether it&rsquo;s worth automating.
            </p>
            <ul style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line-4)", listStyle: "none" }}>
              {promises.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 16,
                    color: "var(--text-body)",
                    padding: "15px 0",
                    borderBottom: i < 2 ? "1px solid var(--line-2)" : undefined,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 26, fontSize: 16, color: "var(--text-muted)" }}>
              Rather talk first?{" "}
              <TrackLink
                event="LP - CTA Click"
                params={{ cta: "email", location: "start" }}
                href="mailto:sales@revenueinstitute.com"
                className="tap"
              >
                sales@revenueinstitute.com
              </TrackLink>
            </div>
            <div
              style={{
                marginTop: 22,
                border: "1px solid var(--line-3)",
                borderRadius: 16,
                background: "var(--bg-card)",
                padding: "20px 22px",
              }}
            >
              <div style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 8 }}>
                Not ready to talk?
              </div>
              <a
                href="#ladder"
                style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.4, display: "block" }}
                className="hover-light"
              >
                See how engagements are scoped and priced →
              </a>
              <div style={{ fontSize: 14.5, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
                The entry tier, the fixed-bid model, and the four-hour delivery commitment. No form.
              </div>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <ContactForm id="start-form" title={ad.formTitle} hint={ad.fieldHint} />
            <p
              style={{
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--text-dim)",
                marginTop: 14,
                textAlign: "center",
              }}
            >
              We use your details only to answer this enquiry. No list, no sequence. See our{" "}
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
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
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div
        className="wrap"
        style={{
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: 28,
          display: "flex",
          gap: "clamp(28px, 4vw, 48px)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <Image
              src="/logos/revenue-institute.png"
              alt="Revenue Institute"
              width={120}
              height={37}
              style={{ display: "block", height: "auto" }}
            />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-faint)", margin: 0, maxWidth: "28ch" }}>
            We evaluate, build, and operate. Novi, Michigan.
          </p>
        </div>
        <div
          style={{
            flex: "1 1 300px",
            minWidth: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <TrackLink
            event="LP - CTA Click"
            params={{ cta: "talk_to_us", location: "footer" }}
            href="#start-form"
            className="tap hover-white"
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "0 26px",
              borderRadius: 100,
            }}
          >
            Talk to us about one process →
          </TrackLink>
        </div>
      </div>
      <div
        className="wrap"
        style={{
          paddingTop: 22,
          paddingBottom: 48,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--text-faint)",
        }}
      >
        <span>© 2026 Revenue Institute</span>
        <span style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tap hover-light"
            style={{ color: "var(--text-faint)" }}
          >
            Privacy policy
          </a>
          <span>Updated August 2026 · reviewed by Stephen Lowisz</span>
        </span>
      </div>
    </footer>
  );
}
