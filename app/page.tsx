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

interface PageProps {
  searchParams: Promise<{ ad?: string; banner?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const adKey = sp.ad && adGroups[sp.ad] ? sp.ad : defaultAdGroup;
  const ad = adGroups[adKey];
  const showBanner = sp.banner !== "false";

  return (
    <div style={{ fontFamily: GROTESK, overflowX: "hidden" }}>
      {showBanner && (
        <div
          style={{
            background: "#0D1512",
            borderBottom: "1px solid #1A2C24",
            padding: "11px 40px",
            textAlign: "center",
            fontSize: 13.5,
            color: "#8D9490",
          }}
        >
          <span style={{ color: "#F3F4F1" }}>Talk to us about one process</span> · 30 minutes, no
          pitch deck ·{" "}
          <a href="#hero-form">book a call →</a>
        </div>
      )}

      <Header />
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
      <Footer />
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
        background: "rgba(8,9,10,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #14171A",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          gap: 44,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
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
          href="tel:+17342594800"
          style={{ fontSize: 14, color: "#8D9490", marginLeft: "auto" }}
          className="hover-light"
        >
          734.259.4800
        </TrackLink>
        <TrackLink
          event="LP - CTA Click"
          params={{ cta: "talk_to_us", location: "header" }}
          href="#hero-form"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#08090A",
            background: "#5BE0A5",
            padding: "11px 18px",
            borderRadius: 100,
          }}
          className="hover-white"
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
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#0D1012 1px, transparent 1px), linear-gradient(90deg, #0D1012 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
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
      <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "64px 48px 48px" }}>
        <div
          style={{
            display: "flex",
            gap: 56,
            flexWrap: "wrap",
            alignItems: "flex-start",
            marginBottom: 72,
          }}
        >
          <div style={{ flex: "1 1 500px", minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8D9490",
                border: "1px solid #1E2124",
                borderRadius: 100,
                padding: "8px 16px",
                marginBottom: 30,
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgb(91, 224, 165)",
                }}
              />
              <span>{ad.eyebrow}</span>
            </div>
            <h1
              style={{
                fontSize: 66,
                lineHeight: 1.0,
                letterSpacing: "-0.045em",
                fontWeight: 500,
                margin: "0 0 24px",
                maxWidth: "20ch",
                textWrap: "pretty" as const,
              }}
            >
              {ad.headline}
            </h1>
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                color: "#A9AFAB",
                margin: "0 0 32px",
                maxWidth: "48ch",
              }}
            >
              {ad.subhead}
            </p>
            <div style={{ display: "grid", gap: 0, borderTop: "1px solid #1E2124", maxWidth: "52ch" }}>
              {ad.points.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 1fr",
                    gap: 14,
                    alignItems: "start",
                    padding: "14px 0",
                    borderBottom: "1px solid #17191B",
                  }}
                >
                  <span style={{ color: "#5BE0A5", fontFamily: MONO, fontSize: 12, lineHeight: 1.6 }}>
                    →
                  </span>
                  <span style={{ fontSize: 16.5, lineHeight: 1.55, color: "#A9AFAB" }}>{p}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 28,
                fontSize: 15,
                color: "#8D9490",
              }}
            >
              Prefer the phone?{" "}
              <a href="tel:+17342594800" style={{ fontSize: 17 }}>
                734.259.4800
              </a>
            </div>
          </div>

          <ContactForm id="hero-form" title={ad.formTitle} hint={ad.fieldHint} />
        </div>

        <LogoBar />
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "64px 48px" }}>
        <div
          style={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "stretch",
            border: "1px solid #1A1E21",
            borderRadius: 20,
            background: "#14171A",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
        {[
          { num: "01", title: "Evaluate", desc: "We rank the work a system can take over — by ROI, not by ease." },
          { num: "02", title: "Build", desc: "A working system on your data and rules. Not a demo." },
          { num: "03", title: "Operate", desc: "We run it after go-live and answer for what it produces." },
        ].map((step, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 260px",
              minWidth: 0,
              padding: "38px 34px",
              background: "#0C0F10",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
              <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "#5BE0A5" }}>
                {step.num}
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(90deg, #5BE0A5, #1A2C24)",
                }}
              />
            </div>
            <div style={{ fontSize: 21, fontWeight: 500, letterSpacing: "-0.022em", marginBottom: 10 }}>
              {step.title}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#8D9490", margin: 0 }}>{step.desc}</p>
          </div>
        ))}
        <div
          style={{
            flex: "1 1 240px",
            minWidth: 0,
            padding: "38px 34px",
            background: "#0D1512",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 44,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              fontWeight: 500,
              color: "#5BE0A5",
            }}
          >
            45
          </div>
          <div style={{ fontSize: 15, color: "#A9AFAB", marginTop: 10, lineHeight: 1.5 }}>
            days to a live system
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "#5F6764",
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1px solid #17251F",
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
    { src: "/logos/berry-law.png", alt: "Berry Law", w: 170, h: 41, opacity: 0.58 },
    { src: "/logos/manely-firm.png", alt: "The Manely Firm", w: 41, h: 41, opacity: 0.75, radius: 8 },
    { src: "/logos/inline-logo.svg", alt: "", w: 116, h: 41, opacity: 0.58 },
    { src: "/logos/lawtrades.svg", alt: "Lawtrades", w: 73, h: 26, opacity: 0.58 },
    { src: "/logos/qualigence.png", alt: "Qualigence", w: 41, h: 41, opacity: 0.75, radius: 8 },
    { src: "/logos/production-theory.png", alt: "Production Theory", w: 120, h: 30, opacity: 0.58 },
    { src: "/logos/edward-jones.png", alt: "Edward Jones", w: 41, h: 41, opacity: 0.75, radius: 8 },
    { src: "/logos/cbre.png", alt: "CBRE", w: 41, h: 41, opacity: 0.75, radius: 8 },
  ];
  return (
    <div style={{ marginTop: 48 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#5F6764",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Trusted by industry leaders
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 46,
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
            style={{ opacity: logo.opacity, borderRadius: logo.radius || undefined }}
            className="hover-opacity"
          />
        ))}
      </div>
    </div>
  );
}

function AnswerSection() {
  return (
    <section id="answer">
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div style={{ fontSize: 15, color: "#5BE0A5", marginBottom: 30 }}>What does Revenue Institute do?</div>
        <p
          style={{
            fontSize: 40,
            lineHeight: 1.24,
            letterSpacing: "-0.032em",
            margin: "0 0 56px",
            maxWidth: "26ch",
            textWrap: "pretty" as const,
          }}
        >
          We build the systems a firm runs on — then we <span style={{ color: "rgb(91, 224, 165)" }}>run them</span>.
        </p>

        {/* Comparison table */}
        <div
          style={{
            border: "1px solid #1A1E21",
            borderRadius: 20,
            background: "#0B0D0E",
            padding: "34px 40px 30px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 190px) repeat(3, minmax(0, 1fr))",
              gap: 14,
              alignItems: "end",
              paddingBottom: 16,
              borderBottom: "1px solid #17191B",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5F6764" }}>
              Who owns what
            </div>
            {["Evaluate", "Build", "Operate"].map((label) => (
              <div
                key={label}
                style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6C736F" }}
              >
                {label}
              </div>
            ))}
          </div>
          {[
            { label: "Consultants", cells: ["#2B4F3F", "#16191A", "#16191A"] },
            { label: "MSPs", cells: ["#16191A", "#16191A", "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)"] },
            { label: "AI vendors", cells: ["#16191A", "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)", "#16191A"] },
            { label: "Revenue Institute", highlight: true, cells: ["#5BE0A5", "#5BE0A5", "#5BE0A5"] },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 190px) repeat(3, minmax(0, 1fr))",
                gap: 14,
                alignItems: "center",
                padding: "20px 0",
                borderBottom: i < 3 ? "1px solid #14171A" : "1px solid #14171A",
              }}
            >
              <div style={{ fontSize: 17, color: row.highlight ? "#F3F4F1" : "#8D9490", fontWeight: row.highlight ? 500 : undefined }}>
                {row.label}
              </div>
              {row.cells.map((bg, j) => (
                <div
                  key={j}
                  style={{
                    height: 10,
                    borderRadius: 100,
                    background: bg,
                  }}
                />
              ))}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px solid #17191B",
              fontFamily: MONO,
              fontSize: 11,
              color: "#5F6764",
            }}
          >
            {[
              { bg: "#5BE0A5", label: "owns it" },
              { bg: "repeating-linear-gradient(115deg, #2B4F3F 0 5px, #16191A 5px 10px)", label: "partial" },
              { bg: "#2B4F3F", label: "advises only" },
              { bg: "#16191A", label: "not their job" },
            ].map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 18, height: 7, borderRadius: 100, background: item.bg }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Vertical selector + workflow */}
        <div style={{ marginTop: 88 }}>
          <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 18 }}>See it in your kind of firm</div>
          <div style={{ marginBottom: 20 }}>
            <VerticalButtons />
          </div>
          <WorkflowComparison />
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            alignItems: "flex-end",
            marginBottom: 44,
          }}
        >
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>Built for your firm type</div>
            <h2
              style={{
                fontSize: 52,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Your systems know what a matter is. Or they don't.
            </h2>
          </div>
          <p style={{ flex: "1 1 320px", minWidth: 0, fontSize: 18, lineHeight: 1.6, color: "#8D9490", margin: 0, maxWidth: "40ch" }}>
            Generic automation stops at the record. Ours is built around the unit of work you bill against.
          </p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <VerticalButtons />
        </div>
        <IndustryPanel />
      </div>
    </section>
  );
}

function LadderSection() {
  return (
    <section id="ladder" style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 56 }}>
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>The ladder</div>
            <h2
              style={{
                fontSize: 52,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Small entry. Compounding return.
            </h2>
          </div>
          <p style={{ flex: "1 1 320px", minWidth: 0, fontSize: 18, lineHeight: 1.6, color: "#8D9490", margin: 0, maxWidth: "42ch" }}>
            One painful process first. We expand only once the math holds — you never write the big check on faith.
          </p>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
          {[
            {
              num: "01 · entry",
              title: "Process automation",
              desc: "Your highest-cost manual workflow, automated end to end.",
              bars: ["46%", "38%", "38%"],
              colors: ["#5BE0A5", "#1A2C24", "#1A2C24"],
              meta1: "fixed-bid",
              meta2: "live in 10–20 days",
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
              desc: "Agents that own a role end to end — with a human on the calls that matter.",
              bars: ["46%", "72%", "100%"],
              colors: ["#1A2C24", "#1A2C24", "#5BE0A5"],
              highlight: true,
              tags: ["Intake coordinator", "Billing clerk", "Pipeline analyst"],
              meta1: "run by us",
              meta2: "supervised by you",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 300px",
                minWidth: 0,
                border: card.highlight ? "1px solid #1E3A2D" : "1px solid #1A1E21",
                borderRadius: 18,
                background: card.highlight ? "linear-gradient(180deg, #0D1512, #0A0C0D)" : "#0B0D0E",
                padding: 32,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 72, marginBottom: 30 }}>
                {card.bars.map((h, j) => (
                  <span key={j} style={{ width: 22, height: h, background: card.colors[j], borderRadius: 3 }} />
                ))}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: card.highlight ? "#6C736F" : "#5BE0A5",
                  marginBottom: 14,
                }}
              >
                {card.num}
              </div>
              <h3 style={{ fontSize: 25, letterSpacing: "-0.03em", fontWeight: 500, margin: "0 0 10px" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#8D9490", margin: "0 0 22px" }}>{card.desc}</p>
              {card.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12.5,
                        border: "1px solid #1E3A2D",
                        padding: "5px 10px",
                        borderRadius: 100,
                        color: "#A9AFAB",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {card.highlight && (
                <div style={{ fontSize: 14.5, color: "#6C736F", lineHeight: 1.55, marginBottom: 22 }}>
                  Curious what one would do in your firm?{" "}
                  <a href="#hero-form">Tell us the process</a> and we'll scope it.
                </div>
              )}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 20,
                  borderTop: card.highlight ? "1px solid #17251F" : "1px solid #17191B",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: MONO,
                  fontSize: 11.5,
                  color: "#6C736F",
                }}
              >
                <span>{card.meta1}</span>
                <span style={{ color: "#A9AFAB" }}>{card.meta2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* C.O.R.E. method */}
        <div
          style={{
            marginTop: 56,
            border: "1px solid #1A1E21",
            borderRadius: 18,
            background: "#0B0D0E",
            padding: "36px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 30,
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5F6764" }}>
              Delivery · the C.O.R.E. method
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#5BE0A5" }}>your total lift: ~4 hours</div>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            <div style={{ flex: 3, height: 8, background: "#5BE0A5", borderRadius: "100px 0 0 100px" }} />
            <div style={{ flex: 7, height: 8, background: "#3A8C68" }} />
            <div style={{ flex: 4, height: 8, background: "#23533F" }} />
            <div style={{ flex: 4, height: 8, background: "#17251F", borderRadius: "0 100px 100px 0" }} />
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[
              { title: "Capture", weeks: "weeks 1–3" },
              { title: "Orchestrate", weeks: "weeks 4–10" },
              { title: "Run", weeks: "weeks 11–14" },
              { title: "Expand", weeks: "day 100+" },
            ].map((phase, i) => (
              <div key={i} style={{ flex: "1 1 150px", minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {phase.title}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#6C736F" }}>{phase.weeks}</div>
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
  return (
    <section id="proof" style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 56 }}>
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>Proof, with sources</div>
            <h2 style={{ fontSize: 52, lineHeight: 1.02, letterSpacing: "-0.04em", fontWeight: 500, margin: 0, maxWidth: "18ch" }}>
              Four numbers, four firms.
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ minWidth: 0, border: "1px solid #1A1E21", borderRadius: 18, background: "#0B0D0E", padding: 30 }}>
              <div style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.045em", fontWeight: 500, color: "#5BE0A5" }}>
                {s.stat}
              </div>
              <div style={{ height: 3, background: "#16191A", borderRadius: 100, margin: "22px 0" }}>
                <div style={{ height: 3, width: s.bar, background: "#5BE0A5", borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "#A9AFAB" }}>{s.desc}</div>
              <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#5F6764", marginTop: 16, lineHeight: 1.7 }}>
                {s.source}
              </div>
            </div>
          ))}
        </div>

        {/* Berry Law testimonial */}
        <div
          style={{
            marginTop: 16,
            border: "1px solid #1A1E21",
            borderRadius: 18,
            background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
            padding: 44,
            display: "flex",
            gap: 44,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
              <Image src="/logos/berry-law.png" alt="Berry Law" width={109} height={26} style={{ opacity: 0.75 }} />
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#5F6764", letterSpacing: "0.1em" }}>
                LEGAL SERVICES · 32,000 ACTIVE CLIENTS
              </span>
            </div>
            <p style={{ fontSize: 28, lineHeight: 1.36, letterSpacing: "-0.028em", margin: "0 0 22px", textWrap: "pretty" as const }}>
              &ldquo;Revenue Institute was able to align sales, marketing, and IT. They moved us to a privacy-compliant AI system that
              grew our leads by 326% in 4 months.&rdquo;
            </p>
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#6C736F", letterSpacing: "0.1em" }}>
              Joe DeMike, Chief Marketing Officer at Berry Law
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 26,
                paddingTop: 22,
                borderTop: "1px solid #17191B",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: 15, color: "#8D9490", lineHeight: 1.5, maxWidth: "52ch" }}>
                Led by Stephen Lowisz and a team of Operators at Revenue Institute. No PowerPoints included — just results.
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 260px",
              minWidth: 0,
              display: "grid",
              gap: 0,
              alignContent: "start",
              borderTop: "1px solid #1E2124",
            }}
          >
            {[
              { stat: "+326%", desc: "Lead growth, with Google Ads spend down" },
              { stat: "3 wks", desc: "To ship what a prior team missed in six months" },
              { stat: "1 FTE", desc: "Of manual lookup work automated — same employee, new job" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 0",
                  borderBottom: i < 2 ? "1px solid #17191B" : undefined,
                }}
              >
                <div style={{ fontSize: 34, lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500, color: "#5BE0A5" }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 14.5, color: "#8D9490", marginTop: 8 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ObjectionsSection() {
  const items = [
    { quote: "&ldquo;AI is hype. It won't work in a firm like mine.&rdquo;", answer: "Then judge it on a number, not a narrative.", stat: "+326%", statLabel: "leads, spend down" },
    { quote: "&ldquo;We don't have bandwidth for an implementation.&rdquo;", answer: "Four hours from your team, all in week one.", stat: "2.5 wks", statLabel: "start to finish" },
    { quote: "&ldquo;We hired a consultant once and got slides.&rdquo;", answer: "We stay on the system after go-live.", stat: "136 hrs", statLabel: "back per week" },
  ];
  return (
    <section style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>Three fair objections</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 320px",
                minWidth: 0,
                border: "1px solid #1A1E21",
                borderRadius: 18,
                background: "#0B0D0E",
                padding: 34,
              }}
            >
              <h3 style={{ fontSize: 26, lineHeight: 1.16, letterSpacing: "-0.03em", fontWeight: 500, margin: "0 0 16px" }} dangerouslySetInnerHTML={{ __html: item.quote }} />
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "#8D9490", margin: "0 0 26px" }}>{item.answer}</p>
              <div style={{ borderTop: "1px solid #17191B", paddingTop: 20, display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontSize: 30, lineHeight: 1, letterSpacing: "-0.035em", fontWeight: 500, color: "#5BE0A5" }}>
                  {item.stat}
                </span>
                <span style={{ fontSize: 14, color: "#6C736F" }}>{item.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  return (
    <section id="compare" style={{ background: "#F2F3F0", color: "#08090A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "128px 48px" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 48 }}>
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <div style={{ fontSize: 15, color: "#7C837E", marginBottom: 26 }}>The honest comparison</div>
            <h2 style={{ fontSize: 52, lineHeight: 1.02, letterSpacing: "-0.04em", fontWeight: 500, margin: 0, maxWidth: "20ch" }}>
              Us, consulting, your ops team, or a tool
            </h2>
          </div>
          <p style={{ flex: "1 1 320px", minWidth: 0, fontSize: 18, lineHeight: 1.6, color: "#55605A", margin: 0, maxWidth: "40ch" }}>
            Including where the other three are the right call.
          </p>
        </div>
        <div style={{ border: "1px solid #D9DBD5", borderRadius: 18, overflow: "hidden", background: "#FFFFFF" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
              borderBottom: "1px solid #E4E6E0",
            }}
          >
            <div style={{ padding: "18px 24px", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C837E" }}>
              What you need
            </div>
            <div style={{ padding: "18px 16px", fontSize: 14, fontWeight: 600, background: "#08090A", color: "#F3F4F1" }}>
              Revenue Institute
            </div>
            <div style={{ padding: "18px 16px", fontSize: 14, color: "#55605A" }}>Big consulting</div>
            <div style={{ padding: "18px 16px", fontSize: 14, color: "#55605A" }}>Internal ops</div>
            <div style={{ padding: "18px 16px", fontSize: 14, color: "#55605A" }}>AI tool alone</div>
          </div>
          {compareRows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                borderBottom: "1px solid #EDEEEA",
                alignItems: "center",
              }}
            >
              <div style={{ padding: "19px 24px", fontSize: 15.5 }}>{row.label}</div>
              <div style={{ padding: "19px 16px", fontSize: 14.5, color: "#1D5B42", background: "#F4FAF6", fontWeight: 500 }}>{row.ri}</div>
              <div style={{ padding: "19px 16px", fontSize: 14.5, color: "#9DA39F" }}>{row.consult}</div>
              <div style={{ padding: "19px 16px", fontSize: 14.5, color: "#9DA39F" }}>{row.internal}</div>
              <div style={{ padding: "19px 16px", fontSize: 14.5, color: "#9DA39F" }}>{row.tool}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#7C837E", marginTop: 18, lineHeight: 1.8, maxWidth: "76ch" }}>
          Where the others win: Big Four for board-level M&A diligence; your internal team once the system is stable and
          documented; a point tool when one narrow task is the entire problem.
        </div>
      </div>
    </section>
  );
}

function StartSection({ ad }: { ad: (typeof adGroups)[string] }) {
  return (
    <section id="start" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid #14171A" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 1000px 460px at 50% 118%, rgba(91,224,165,0.11), rgba(8,9,10,0) 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "128px 48px",
          display: "flex",
          gap: 56,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 400px", minWidth: 0 }}>
          <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>Start here</div>
          <h2
            style={{
              fontSize: 52,
              lineHeight: 1.0,
              letterSpacing: "-0.042em",
              fontWeight: 500,
              margin: "0 0 22px",
              maxWidth: "16ch",
              textWrap: "pretty" as const,
            }}
          >
            Grow the firm, not the payroll.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#A9AFAB", margin: "0 0 36px", maxWidth: "36ch" }}>
            Send us the process that's costing you the most hours. We'll tell you straight whether it's worth automating.
          </p>
          <div style={{ display: "grid", gap: 0, borderTop: "1px solid #1E2124" }}>
            {[
              "One business day, from a person who has built these",
              "A rough range before you spend a meeting on it",
              "If we're not the fit, we say so and point elsewhere",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 16,
                  color: "#A9AFAB",
                  padding: "15px 0",
                  borderBottom: i < 2 ? "1px solid #17191B" : undefined,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30, fontSize: 16, color: "#8D9490" }}>
            Rather talk first?{" "}
            <a href="mailto:sales@revenueinstitute.com">sales@revenueinstitute.com</a>
          </div>
          <div
            style={{
              marginTop: 26,
              border: "1px solid #1A1E21",
              borderRadius: 16,
              background: "#0B0D0E",
              padding: "22px 24px",
            }}
          >
            <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 8 }}>Not ready to talk?</div>
            <a href="/cost-to-automate" style={{ fontSize: 17, color: "#F3F4F1", lineHeight: 1.4, display: "block" }} className="hover-light">
              Read what it costs to automate a process →
            </a>
            <div style={{ fontSize: 14.5, color: "#6C736F", marginTop: 8, lineHeight: 1.5 }}>
              Our cost framework, with the ranges and the break-even test. No form.
            </div>
          </div>
        </div>

        <ContactForm title={ad.formTitle} hint={ad.fieldHint} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #14171A" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "64px 48px 28px", display: "flex", gap: 48, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <Image
              src="/logos/revenue-institute.png"
              alt="Revenue Institute"
              width={120}
              height={37}
              style={{ display: "block" }}
            />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5F6764", margin: 0, maxWidth: "28ch" }}>
            We evaluate, build, and operate. Novi, Michigan.
          </p>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", alignItems: "flex-end" }}>
          <TrackLink
            event="LP - CTA Click"
            params={{ cta: "talk_to_us", location: "footer" }}
            href="#hero-form"
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#08090A",
              background: "#5BE0A5",
              padding: "15px 26px",
              borderRadius: 100,
            }}
            className="hover-white"
          >
            Talk to us about one process →
          </TrackLink>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "22px 48px 48px",
          borderTop: "1px solid #14171A",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          fontFamily: MONO,
          fontSize: 11,
          color: "#5F6764",
        }}
      >
        <span>© 2026 Revenue Institute</span>
        <span>Updated August 2026 · reviewed by Stephen Lowisz</span>
      </div>
    </footer>
  );
}
