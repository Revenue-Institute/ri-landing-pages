"use client";

import { faqItems } from "./data";
import { track } from "./gtm";

export default function FAQSection() {
  return (
    <section id="faq" style={{ borderTop: "1px solid var(--line)" }}>
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
          <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 22 }}>Answers</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            Asked by operators
          </h2>
        </div>
        <div style={{ flex: "1 1 560px", minWidth: 0, borderTop: "1px solid var(--line-4)" }}>
          {faqItems.map((item, i) => (
            <details
              key={i}
              style={{ borderBottom: "1px solid var(--line-4)" }}
              onToggle={(e) => {
                if (e.currentTarget.open) track("LP - FAQ Open", { question: item.q });
              }}
            >
              <summary
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  letterSpacing: "-0.024em",
                  fontWeight: 500,
                  padding: "22px 0",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 20,
                  minHeight: 44,
                }}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 15,
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                  margin: "0 0 24px",
                  maxWidth: "66ch",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
