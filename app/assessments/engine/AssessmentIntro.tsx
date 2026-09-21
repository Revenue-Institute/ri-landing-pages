"use client";

import { useId, useState, type FormEvent } from "react";
import type { AssessmentConfig } from "@/app/assessments/types";

// .ri-input, brand.md section 5 - matches ContactGate's input styling.
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--ri-font-display)",
  fontSize: 16, // below 16px iOS zooms the page on focus
  padding: "13px 14px",
  border: "2px solid var(--ri-ink)",
  borderRadius: 0,
  background: "var(--ri-white)",
  color: "var(--ri-ink)",
  width: "100%",
  minHeight: 52,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--ri-font-display)",
  fontSize: 13,
  color: "var(--ri-muted)",
  marginBottom: 6,
  display: "block",
};

/**
 * The landing pitch shown before question 1 - without it, a visitor lands
 * cold on "What's the biggest factor..." with no context for why they'd
 * answer 8 questions. This is the screen that gives them a reason to start.
 *
 * Also captures their company website here, up front, rather than at the
 * contact gate at the end - so the company lookup that powers the "what
 * others in your industry are doing" section of the result (see
 * companyProfileStore.ts) has the full ~1-2 minutes of question-answering
 * to resolve before they ever reach the results screen.
 */
export default function AssessmentIntro({
  config,
  onStart,
}: {
  config: AssessmentConfig;
  onStart: (website: string) => void;
}) {
  const { intro } = config;
  const [website, setWebsite] = useState("");
  const uid = useId();
  const websiteId = `${uid}-website`;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onStart(website.trim());
  }

  return (
    <div className="assessment-card assessment-intro">
      <div className="assessment-chip">{intro.eyebrow}</div>
      <h1 className="assessment-intro-headline">{intro.headline}</h1>
      <p className="assessment-intro-lead">{intro.lead}</p>
      <form style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
        <div>
          <label htmlFor={websiteId} style={labelStyle}>
            Company website (optional - lets us compare you to peers in your industry)
          </label>
          <input
            id={websiteId}
            type="text"
            name="website"
            placeholder="yourfirm.com"
            autoComplete="url"
            inputMode="url"
            style={inputStyle}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button type="submit" className="assessment-submit-btn">
          {intro.ctaLabel}
        </button>
      </form>
      <p className="assessment-result-confirm">{intro.reassurance}</p>
    </div>
  );
}
