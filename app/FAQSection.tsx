"use client";

import { useState } from "react";
import { faqItems } from "./data";
import { track } from "./gtm";

export default function FAQSection() {
  return (
    <section id="faq" style={{ borderTop: "1px solid #14171A" }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "128px 48px",
          display: "flex",
          gap: 64,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          <div style={{ fontSize: 15, color: "#6C736F", marginBottom: 26 }}>
            Answers <span style={{ color: "#5BE0A5" }}>· schema</span>
          </div>
          <h2
            style={{
              fontSize: 44,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            Asked by operators
          </h2>
        </div>
        <div style={{ flex: "1 1 560px", minWidth: 0, borderTop: "1px solid #1E2124" }}>
          {faqItems.map((item, i) => (
            <details
              key={i}
              style={{ borderBottom: "1px solid #1E2124", padding: "26px 0" }}
              onToggle={(e) => {
                if (e.currentTarget.open) track("LP - FAQ Open", { question: item.q });
              }}
            >
              <summary style={{ fontSize: 22, letterSpacing: "-0.024em", fontWeight: 500 }}>
                {item.q}
              </summary>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  color: "#8D9490",
                  margin: "14px 0 0",
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
