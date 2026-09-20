"use client";

import { answerItems } from "./data";
import { track } from "./gtm";

const T_H2 = "clamp(1.75rem, 4vw, 2.75rem)";

/**
 * Objections and FAQs merged into one accordion - brand.md explicitly
 * forbids a page carrying both a separate objections block and an FAQ
 * block. The first three items are the old stat-backed objection cards
 * (kept as direct-quote headers, since that voice is stronger than
 * rephrasing them as questions); the rest are practical FAQs.
 */
export default function AnswersSection() {
  return (
    <section id="answers" style={{ borderTop: "1px solid var(--ri-hairline)" }}>
      <div
        className="wrap sec-y"
        style={{
          display: "flex",
          gap: "clamp(28px, 4.4vw, 64px)",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          <p style={{ fontSize: 15, color: "var(--ri-muted)", marginBottom: 22, fontFamily: "var(--ri-font-display)" }}>
            Fair objections, straight answers
          </p>
          <h2
            style={{
              fontSize: T_H2,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            Ask us the hard one first
          </h2>
        </div>
        <div style={{ flex: "1 1 560px", minWidth: 0, borderTop: "1px solid var(--ri-hairline)" }}>
          {answerItems.map((item, i) => (
            <details
              key={i}
              style={{ borderBottom: "1px solid var(--ri-hairline)" }}
              onToggle={(e) => {
                if (e.currentTarget.open) track("LP - FAQ Open", { question: item.q });
              }}
            >
              <summary
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  letterSpacing: "-0.01em",
                  fontWeight: 700,
                  padding: "22px 0",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 20,
                  minHeight: 44,
                  color: "var(--ri-ink)",
                }}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--ri-font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--ri-ink)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div style={{ margin: "0 0 24px", maxWidth: "66ch" }}>
                <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--ri-body)", margin: "0 0 12px" }}>
                  {item.a}
                </p>
                {item.stat && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: "var(--ri-font-display)",
                        fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "var(--ri-ink)",
                      }}
                    >
                      {item.stat}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--ri-muted)" }}>{item.statLabel}</span>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
