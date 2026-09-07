"use client";

import { createContext, useContext, useState, useCallback } from "react";
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
  return (
    <Ctx.Provider value={{ index, setIndex, active }}>{children}</Ctx.Provider>
  );
}

function useVertical() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVertical must be used within VerticalProvider");
  return ctx;
}

export function VerticalButtons() {
  const { index, setIndex } = useVertical();
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {verticals.map((v, i) => (
        <button
          key={v.name}
          onClick={() => setIndex(i)}
          style={{
            fontFamily: "var(--font-grotesk), sans-serif",
            fontSize: 14,
            padding: "11px 18px",
            borderRadius: 100,
            cursor: "pointer",
            border: `1px solid ${i === index ? "#5BE0A5" : "#26292C"}`,
            background: i === index ? "#5BE0A5" : "transparent",
            color: i === index ? "#08090A" : "#8D9490",
            transition: "all 0.15s ease",
          }}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}

export function WorkflowComparison() {
  const { active } = useVertical();
  const wf = active.workflow;
  return (
    <div
      style={{
        border: "1px solid #1A1E21",
        borderRadius: 20,
        background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "30px 40px",
          borderBottom: "1px solid #14171A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "-0.022em",
          }}
        >
          One workflow, before and after
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 14.5,
            color: "#6C736F",
          }}
        >
          <span>{wf.subject}</span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "#5F6764",
            }}
          >
            bars = relative time spent
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: "#14171A" }}>
        <div style={{ flex: "1 1 340px", minWidth: 0, background: "#0B0D0E", padding: "34px 40px" }}>
          <div style={{ fontSize: 14.5, color: "#6C736F", marginBottom: 24 }}>Before</div>
          <div style={{ display: "grid", gap: 0 }}>
            {wf.before.map((row, k) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: 18,
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #14171A",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 16, color: "#A9AFAB", marginBottom: 10 }}>{row.step}</div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 100,
                      background: "#14171A",
                    }}
                  >
                    <div
                      style={{
                        height: 8,
                        borderRadius: 100,
                        background: "#3A4048",
                        width: row.w,
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 15,
                    color: "#6C736F",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 340px", minWidth: 0, background: "#0D1512", padding: "34px 40px" }}>
          <div style={{ fontSize: 14.5, color: "#5BE0A5", marginBottom: 24 }}>After</div>
          <div style={{ display: "grid", gap: 0 }}>
            {wf.after.map((row, k) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: 18,
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #17251F",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 16, color: "#A9AFAB", marginBottom: 10 }}>{row.step}</div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 100,
                      background: "#14201B",
                    }}
                  >
                    <div
                      style={{
                        height: 8,
                        borderRadius: 100,
                        background: "#5BE0A5",
                        width: row.w,
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 15,
                    color: "#5BE0A5",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IndustryPanel() {
  const { active } = useVertical();
  return (
    <div
      style={{
        border: "1px solid #1A1E21",
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
          padding: "44px 46px",
          borderRight: "1px solid #14171A",
        }}
      >
        <h3
          style={{
            fontSize: 30,
            lineHeight: 1.14,
            letterSpacing: "-0.032em",
            fontWeight: 500,
            margin: "0 0 8px",
          }}
        >
          {active.headline}
        </h3>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11.5,
            color: "#5BE0A5",
            marginBottom: 30,
          }}
        >
          {active.buyer}
        </div>
        <div style={{ display: "grid", gap: 0 }}>
          {active.bullets.map((b, k) => (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                gap: 14,
                alignItems: "start",
                padding: "15px 0",
                borderBottom: "1px solid #14171A",
              }}
            >
              <span
                style={{
                  color: "#5BE0A5",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                →
              </span>
              <span style={{ fontSize: 16, lineHeight: 1.6, color: "#A9AFAB" }}>{b}</span>
            </div>
          ))}
        </div>
        <a
          href="#hero-form"
          style={{
            display: "inline-block",
            marginTop: 28,
            fontSize: 15,
            color: "#F3F4F1",
            borderBottom: "1px solid #5BE0A5",
            paddingBottom: 3,
          }}
          className="hover-light"
        >
          {active.cta} →
        </a>
      </div>
      <div
        style={{
          flex: "1 1 300px",
          minWidth: 0,
          padding: "44px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 42,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              color: "#5BE0A5",
            }}
          >
            {active.stat}
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#8D9490",
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            {active.statLabel}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #17191B", paddingTop: 26 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5F6764",
              marginBottom: 14,
            }}
          >
            Systems we connect
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {active.tools.map((t, k) => (
              <span
                key={k}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11.5,
                  border: "1px solid #22262A",
                  padding: "6px 10px",
                  borderRadius: 100,
                  color: "#8D9490",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #17191B",
            paddingTop: 26,
            marginTop: "auto",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5BE0A5",
              border: "1px solid #1E3A2D",
              background: "rgba(91,224,165,0.07)",
              padding: "6px 11px",
              borderRadius: 100,
              marginBottom: 12,
            }}
          >
            {active.complianceTag}
          </span>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11.5,
              color: "#6C736F",
              lineHeight: 1.8,
            }}
          >
            {active.compliance}
          </div>
        </div>
      </div>
    </div>
  );
}
