"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "./gtm";

const inputStyle: React.CSSProperties = {
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

const BLOCKED = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com",
  "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
  "mail.com", "gmx.com", "gmx.net", "yandex.com", "zoho.com",
  "rocketmail.com", "ymail.com", "earthlink.net", "comcast.net",
  "att.net", "verizon.net", "sbcglobal.net", "cox.net", "bellsouth.net",
];

export default function ContactForm({
  id,
  title,
  hint,
  onInk = false,
}: {
  id?: string;
  title: string;
  hint: string;
  /** True when rendered on a full-bleed ink band (the closing section). */
  onInk?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const processId = `${uid}-process`;
  const errorId = `${uid}-email-error`;
  const formId = id || "contact";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailVal = String(data.get("email") || "").trim();
    const domain = emailVal.split("@")[1]?.toLowerCase() ?? "";
    if (BLOCKED.includes(domain)) {
      setEmailError("Please use your work email address.");
      document.getElementById(emailId)?.focus();
      return;
    }
    setEmailError("");
    setStatus("submitting");
    const formData = {
      name: String(data.get("name") || ""),
      email: emailVal,
      process: String(data.get("process") || ""),
    };
    track("LP - Form Attempt", { form_id: formId, ...formData });
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      track("LP - Form Submit", { form_id: formId, ...formData });
    } catch {
      setStatus("error");
    }
  }

  const cardBg = onInk ? "var(--ri-dark-panel)" : "var(--ri-white)";
  const cardBorder = onInk ? "var(--ri-dark-edge)" : "var(--ri-hairline)";
  const textColor = onInk ? "var(--ri-dark-text)" : "var(--ri-ink)";
  const mutedColor = onInk ? "var(--ri-dark-muted)" : "var(--ri-muted)";

  return (
    <div
      id={id}
      className="ri-card"
      style={{
        minWidth: 0,
        background: cardBg,
        borderColor: cardBorder,
        color: textColor,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--ri-font-display)",
          fontSize: "clamp(20px, 2.4vw, 22px)",
          letterSpacing: "-0.01em",
          fontWeight: 800,
          color: textColor,
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: mutedColor, margin: "0 0 22px" }}>
        One business day. You get whether it&rsquo;s worth automating, a rough range, and what
        we&rsquo;d need to see. No deck, no discovery series.
      </p>

      {/* Announced to assistive tech the moment it replaces the form */}
      <div aria-live="polite" role="status">
        {status === "success" && (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--ri-font-display)",
                fontSize: 26,
                fontWeight: 800,
                color: textColor,
                marginBottom: 12,
              }}
            >
              Got it, thank you.
            </div>
            <div style={{ fontSize: 15, color: mutedColor }}>
              A person will read it and reply within one business day.
            </div>
          </div>
        )}
      </div>

      {status !== "success" && (
        <form style={{ display: "grid", gap: 14 }} onSubmit={onSubmit} noValidate={false}>
          <div>
            <label htmlFor={nameId} style={{ ...labelStyle, color: mutedColor }}>
              Your name
            </label>
            <input
              id={nameId}
              type="text"
              name="name"
              placeholder="Jordan Reed"
              required
              autoComplete="name"
              style={onInk ? { ...inputStyle, border: "2px solid var(--ri-dark-edge)", background: "transparent", color: textColor } : inputStyle}
            />
          </div>

          <div>
            <label htmlFor={emailId} style={{ ...labelStyle, color: mutedColor }}>
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
                ...(onInk
                  ? { ...inputStyle, border: "2px solid var(--ri-dark-edge)", background: "transparent", color: textColor }
                  : inputStyle),
                borderColor: emailError ? "var(--ri-alert)" : undefined,
              }}
            />
            {emailError && (
              <div
                id={errorId}
                style={{ fontSize: 13, color: "var(--ri-alert)", fontFamily: "var(--ri-font-display)", marginTop: 7 }}
              >
                {emailError}
              </div>
            )}
          </div>

          <div>
            <label htmlFor={processId} style={{ ...labelStyle, color: mutedColor }}>
              {hint}
            </label>
            <input
              id={processId}
              type="text"
              name="process"
              placeholder="Manual time entry across 40 attorneys"
              required
              autoComplete="off"
              style={onInk ? { ...inputStyle, border: "2px solid var(--ri-dark-edge)", background: "transparent", color: textColor } : inputStyle}
            />
          </div>

          {/* Honeypot: invisible to people, irresistible to form bots */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
            <label htmlFor={`${uid}-company`}>Company</label>
            <input id={`${uid}-company`} type="text" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div aria-live="assertive">
            {status === "error" && (
              <div style={{ fontSize: 14, color: "var(--ri-alert)", fontFamily: "var(--ri-font-display)" }}>
                Something went wrong. Try again, or email{" "}
                <a href="mailto:sales@revenueinstitute.com" style={{ color: "inherit", textDecoration: "underline" }}>
                  sales@revenueinstitute.com
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="ri-btn"
            style={{ width: "100%", marginTop: 2 }}
          >
            {status === "submitting" ? "Sending..." : "Get my straight answer ->"}
          </button>
        </form>
      )}

      <div
        style={{
          fontFamily: "var(--ri-font-display)",
          fontSize: 11,
          color: mutedColor,
          marginTop: 16,
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        One business day - a person reads it - no sequence
      </div>
    </div>
  );
}
