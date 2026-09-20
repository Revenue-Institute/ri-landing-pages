"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { track } from "@/app/gtm";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";

// .ri-input, brand.md section 5
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

interface ContactGateProps {
  onSubmit: (name: string, email: string) => void;
  onBack?: () => void;
  assessmentId: string;
}

export default function ContactGate({ onSubmit, onBack, assessmentId }: ContactGateProps) {
  const [emailError, setEmailError] = useState("");
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const errorId = `${uid}-email-error`;

  useEffect(() => {
    track("Assessment Contact Gate Viewed", { assessment: assessmentId });
    // Fire once per mount - assessmentId is constant for a mounted gate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const honeypot = String(data.get("company") || "").trim();

    // A filled honeypot means a bot - drop the submission silently.
    if (honeypot) return;

    if (isBlockedEmailDomain(email)) {
      setEmailError("Please use your work email address.");
      document.getElementById(emailId)?.focus();
      return;
    }

    setEmailError("");
    track("Assessment Contact Gate Submit Attempt", { assessment: assessmentId });
    onSubmit(name, email);
  }

  return (
    <div className="assessment-card">
      <div className="assessment-eyebrow">Almost done</div>
      <h2 className="assessment-gate-title">Where should we send your results?</h2>
      <p className="assessment-gate-copy">
        We&rsquo;ll email a copy of your score and the breakdown behind it.
      </p>
      <form style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
        <div>
          <label htmlFor={nameId} style={labelStyle}>
            Your name
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            placeholder="Jordan Reed"
            required
            autoComplete="name"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor={emailId} style={labelStyle}>
            Work email
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            placeholder="jordan@yourfirm.com"
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? errorId : undefined}
            style={{
              ...inputStyle,
              borderColor: emailError ? "var(--ri-alert)" : "var(--ri-ink)",
            }}
          />
          {emailError && (
            <div
              id={errorId}
              style={{
                fontFamily: "var(--ri-font-display)",
                fontSize: 13,
                color: "var(--ri-alert)",
                marginTop: 7,
              }}
            >
              {emailError}
            </div>
          )}
        </div>

        {/* Honeypot: invisible to people, irresistible to form bots */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
          <label htmlFor={`${uid}-company`}>Company</label>
          <input id={`${uid}-company`} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="assessment-submit-btn">
          See my results →
        </button>
      </form>
      {onBack && (
        <button type="button" className="qc-back" onClick={onBack}>
          ← Back
        </button>
      )}
    </div>
  );
}
