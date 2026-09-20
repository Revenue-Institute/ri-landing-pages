"use client";

import { createContext, useContext, useId, useState, useCallback } from "react";
import { verticals, type Vertical } from "./data";

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
        {verticals.map((v, i) => {
          const selected = i === index;
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={selected}
              style={{
                fontFamily: "var(--ri-font-display)",
                fontSize: 14,
                fontWeight: 700,
                minHeight: 44,
                padding: "0 18px",
                borderRadius: 0,
                cursor: "pointer",
                border: `2px solid var(--ri-ink)`,
                background: selected ? "var(--ri-ink)" : "transparent",
                color: selected ? "var(--ri-white)" : "var(--ri-ink)",
                transition: "background 150ms ease, color 150ms ease",
              }}
            >
              {v.name}
            </button>
          );
        })}
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
          fontFamily: "var(--ri-font-display)",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
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
              <div style={{ fontSize: 16, color: "var(--ri-body)", marginBottom: 10 }}>
                {row.step}
              </div>
              <div aria-hidden="true" style={{ height: 6, background: opts.track }}>
                <div style={{ height: 6, background: opts.fill, width: row.w }} />
              </div>
            </div>
            <span
              style={{
                fontSize: 15,
                color: opts.valueColor,
                whiteSpace: "nowrap",
                fontFamily: "var(--ri-font-display)",
                fontWeight: 700,
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
    <div className="ri-band-ink" style={{ border: "1px solid var(--ri-dark-edge)", overflow: "hidden" }}>
      <div
        style={{
          padding: "clamp(22px, 2.6vw, 30px) clamp(20px, 3vw, 40px)",
          borderBottom: "1px solid var(--ri-dark-edge)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", fontWeight: 800, letterSpacing: "-0.01em" }}>
          One workflow, before and after
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 14.5,
            color: "var(--ri-dark-muted)",
          }}
        >
          <span>{wf.subject}</span>
          <span style={{ fontFamily: "var(--ri-font-display)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            bars = relative time spent
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: "var(--ri-dark-edge)" }}>
        {column("Before", wf.before, {
          bg: "var(--ri-dark-panel)",
          headColor: "var(--ri-dark-muted)",
          track: "var(--ri-dark-edge)",
          fill: "#565467",
          valueColor: "var(--ri-dark-muted)",
          line: "var(--ri-dark-edge)",
        })}
        {column("After", wf.after, {
          bg: "#0f2a20",
          headColor: "var(--ri-green)",
          track: "#173a2c",
          fill: "var(--ri-green)",
          valueColor: "var(--ri-green)",
          line: "#1d4535",
        })}
      </div>
    </div>
  );
}

export function IndustryPanel() {
  const { active } = useVertical();
  return (
    <div
      className="ri-band-ink"
      style={{ border: "1px solid var(--ri-dark-edge)", display: "flex", flexWrap: "wrap", overflow: "hidden" }}
    >
      <div
        style={{
          flex: "1 1 460px",
          minWidth: 0,
          padding: "clamp(28px, 3.6vw, 44px) clamp(22px, 3.4vw, 46px)",
          borderRight: "1px solid var(--ri-dark-edge)",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(1.375rem, 2.8vw, 1.875rem)",
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            fontWeight: 800,
            margin: "0 0 8px",
          }}
        >
          {active.headline}
        </h3>
        <div
          style={{
            fontFamily: "var(--ri-font-display)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "var(--ri-green)",
            marginBottom: 26,
          }}
        >
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
                borderBottom: "1px solid var(--ri-dark-edge)",
              }}
            >
              <span aria-hidden="true" style={{ color: "var(--ri-green)", fontWeight: 700, lineHeight: 1.7 }}>
                +
              </span>
              <span style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ri-dark-text)" }}>{b}</span>
            </li>
          ))}
        </ul>
        <a href="#start-form" className="ri-link" style={{ marginTop: 24, display: "inline-block" }}>
          {active.cta} -&gt;
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
        <div className="ri-stat">
          <div
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.625rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 900,
              color: "var(--ri-dark-text)",
            }}
          >
            {active.stat}
          </div>
          <div style={{ fontSize: 15, color: "var(--ri-dark-muted)", marginTop: 12, lineHeight: 1.5 }}>
            {active.statLabel}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--ri-dark-edge)", paddingTop: 24 }}>
          <h4
            style={{
              fontFamily: "var(--ri-font-display)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ri-dark-muted)",
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
                  fontFamily: "var(--ri-font-display)",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "1px solid var(--ri-dark-edge)",
                  padding: "6px 10px",
                  color: "var(--ri-dark-muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--ri-dark-edge)", paddingTop: 24, marginTop: "auto" }}>
          <span className="ri-chip-green" style={{ marginBottom: 12, display: "inline-block" }}>
            {active.complianceTag}
          </span>
          <div style={{ fontSize: 13, color: "var(--ri-dark-muted)", lineHeight: 1.8 }}>
            {active.compliance}
          </div>
        </div>
      </div>
    </div>
  );
}
