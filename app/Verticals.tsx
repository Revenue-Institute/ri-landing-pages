"use client";

import { createContext, useContext, useId, useState, useCallback } from "react";
import { verticals, type Vertical } from "./data";

const MONO = "var(--font-mono), monospace";

interface VerticalCtx {
  index: number;
  setIndex: (i: number) => void;
  active: Vertical;
}

const Ctx = createContext<VerticalCtx | null>(null);

export function VerticalProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndexState] = useState(0);
  const active = verticals[index];
  const setIndex = useCallback((i: number) => {
    setIndexState(i);
  }, []);
  return <Ctx.Provider value={{ index, setIndex, active }}>{children}</Ctx.Provider>;
}

function useVertical() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVertical must be used within VerticalProvider");
  return ctx;
}

/**
 * Rendered twice on the page against one shared selection, so the firm type a
 * visitor picks carries down the page. Each instance is given its own group
 * label so the second one reads as the same choice rather than a new,
 * unexplained one, and `aria-pressed` exposes which option is active.
 */
export function VerticalButtons({ groupLabel }: { groupLabel: string }) {
  const { index, setIndex } = useVertical();
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId}>
      <span id={labelId} className="sr-only">
        {groupLabel}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {verticals.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            style={{
              fontSize: 14,
              minHeight: 44,
              padding: "0 18px",
              borderRadius: 100,
              cursor: "pointer",
              border: `1px solid ${i === index ? "var(--accent)" : "#2A2E31"}`,
              background: i === index ? "var(--accent)" : "transparent",
              color: i === index ? "var(--bg)" : "var(--text-body)",
              transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
            }}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function WorkflowComparison() {
  const { active } = useVertical();
  const wf = active.workflow;

  const column = (
    heading: string,
    rows: typeof wf.before,
    opts: { bg: string; headColor: string; track: string; fill: string; valueColor: string; line: string }
  ) => (
    <div style={{ flex: "1 1 340px", minWidth: 0, background: opts.bg, padding: "clamp(24px, 3vw, 34px) clamp(20px, 3vw, 40px)" }}>
      <h4
        style={{
          fontSize: 14.5,
          fontWeight: 400,
          color: opts.headColor,
          marginBottom: 22,
        }}
      >
        {heading}
      </h4>
      <div style={{ display: "grid", gap: 0 }}>
        {rows.map((row, k) => (
          <div
            key={k}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 18,
              alignItems: "center",
              padding: "15px 0",
              borderBottom: `1px solid ${opts.line}`,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 16, color: "var(--text-body)", marginBottom: 10 }}>
                {row.step}
              </div>
              <div aria-hidden="true" style={{ height: 8, borderRadius: 100, background: opts.track }}>
                <div style={{ height: 8, borderRadius: 100, background: opts.fill, width: row.w }} />
              </div>
            </div>
            <span
              style={{
                fontSize: 15,
                color: opts.valueColor,
                whiteSpace: "nowrap",
                fontFamily: MONO,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid var(--line-3)",
        borderRadius: 20,
        background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "clamp(22px, 2.6vw, 30px) clamp(20px, 3vw, 40px)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", fontWeight: 500, letterSpacing: "-0.022em" }}>
          One workflow, before and after
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 14.5,
            color: "var(--text-dim)",
          }}
        >
          <span>{wf.subject}</span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--text-faint)" }}>
            bars = relative time spent
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: "var(--line)" }}>
        {column("Before", wf.before, {
          bg: "var(--bg-card)",
          headColor: "var(--text-dim)",
          track: "var(--line)",
          fill: "#4A515A",
          valueColor: "var(--text-dim)",
          line: "var(--line)",
        })}
        {column("After", wf.after, {
          bg: "var(--bg-green)",
          headColor: "var(--accent)",
          track: "#14201B",
          fill: "var(--accent)",
          valueColor: "var(--accent)",
          line: "var(--line-green)",
        })}
      </div>
    </div>
  );
}

export function IndustryPanel() {
  const { active } = useVertical();
  return (
    <div
      style={{
        border: "1px solid var(--line-3)",
        borderRadius: 20,
        background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "1 1 460px",
          minWidth: 0,
          padding: "clamp(28px, 3.6vw, 44px) clamp(22px, 3.4vw, 46px)",
          borderRight: "1px solid var(--line)",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)",
            lineHeight: 1.16,
            letterSpacing: "-0.032em",
            fontWeight: 500,
            margin: "0 0 8px",
          }}
        >
          {active.headline}
        </h3>
        <div style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--accent)", marginBottom: 26 }}>
          {active.buyer}
        </div>
        <ul style={{ display: "grid", gap: 0, listStyle: "none" }}>
          {active.bullets.map((b, k) => (
            <li
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                gap: 14,
                alignItems: "start",
                padding: "15px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span
                aria-hidden="true"
                style={{ color: "var(--accent)", fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}
              >
                →
              </span>
              <span style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-body)" }}>{b}</span>
            </li>
          ))}
        </ul>
        <a
          href="#start-form"
          className="tap hover-light"
          style={{
            marginTop: 24,
            fontSize: 15,
            color: "var(--text)",
            borderBottom: "1px solid var(--accent)",
          }}
        >
          {active.cta} →
        </a>
      </div>
      <div
        style={{
          flex: "1 1 300px",
          minWidth: 0,
          padding: "clamp(28px, 3.6vw, 44px) clamp(22px, 3vw, 40px)",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.625rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              color: "var(--accent)",
            }}
          >
            {active.stat}
          </div>
          <div style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.5 }}>
            {active.statLabel}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 24 }}>
          <h4
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: 14,
            }}
          >
            Systems we connect
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {active.tools.map((t, k) => (
              <span
                key={k}
                style={{
                  fontFamily: MONO,
                  fontSize: 11.5,
                  border: "1px solid #26292C",
                  padding: "6px 10px",
                  borderRadius: 100,
                  color: "var(--text-muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 24, marginTop: "auto" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              border: "1px solid var(--accent-line)",
              background: "rgba(91,224,165,0.07)",
              padding: "6px 11px",
              borderRadius: 100,
              marginBottom: 12,
            }}
          >
            {active.complianceTag}
          </span>
          <div style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--text-dim)", lineHeight: 1.8 }}>
            {active.compliance}
          </div>
        </div>
      </div>
    </div>
  );
}
