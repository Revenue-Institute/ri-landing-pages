"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "./gtm";

const MONO = "var(--font-mono), monospace";

const inputStyle: React.CSSProperties = {
  fontSize: 16, // below 16px iOS zooms the page on focus
  padding: "14px 16px",
  border: "1px solid #26292C",
  borderRadius: 12,
  background: "var(--bg-input)",
  color: "var(--text)",
  width: "100%",
  minHeight: 52,
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "var(--text-muted)",
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
}: {
  id?: string;
  title: string;
  hint: string;
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

  return (
    <div
      id={id}
      style={{
        minWidth: 0,
        border: "1px solid var(--accent-line)",
        borderRadius: 20,
        background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
        padding: "clamp(22px, 3.2vw, 34px)",
        boxShadow: "0 50px 90px -60px rgba(0,0,0,0.95)",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(20px, 2.4vw, 22px)",
          letterSpacing: "-0.026em",
          fontWeight: 500,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 22px" }}>
        One business day. You get whether it&rsquo;s worth automating, a rough range, and what
        we&rsquo;d need to see. No deck, no discovery series.
      </p>

      {/* Announced to assistive tech the moment it replaces the form */}
      <div aria-live="polite" role="status">
        {status === "success" && (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: "var(--accent)", marginBottom: 12 }}>
              Got it, thank you.
            </div>
            <div style={{ fontSize: 15, color: "var(--text-muted)" }}>
              A person will read it and reply within one business day.
            </div>
          </div>
        )}
      </div>

      {status !== "success" && (
        <form style={{ display: "grid", gap: 14 }} onSubmit={onSubmit} noValidate={false}>
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
              style={{ ...inputStyle, borderColor: emailError ? "var(--danger)" : "#26292C" }}
            />
            {emailError && (
              <div
                id={errorId}
                style={{ fontSize: 13, color: "var(--danger)", fontFamily: MONO, marginTop: 7 }}
              >
                {emailError}
              </div>
            )}
          </div>

          <div>
            <label htmlFor={processId} style={labelStyle}>
              {hint}
            </label>
            <input
              id={processId}
              type="text"
              name="process"
              placeholder="Manual time entry across 40 attorneys"
              required
              autoComplete="off"
              style={inputStyle}
            />
          </div>

          {/* Honeypot: invisible to people, irresistible to form bots */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
            <label htmlFor={`${uid}-company`}>Company</label>
            <input id={`${uid}-company`} type="text" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div aria-live="assertive">
            {status === "error" && (
              <div style={{ fontSize: 14, color: "var(--danger)", fontFamily: MONO }}>
                Something went wrong. Try again, or email{" "}
                <a href="mailto:sales@revenueinstitute.com">sales@revenueinstitute.com</a>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            style={{
              width: "100%",
              fontSize: 16,
              fontWeight: 500,
              color: "var(--bg)",
              background: status === "submitting" ? "var(--accent-deep)" : "var(--accent)",
              border: 0,
              minHeight: 52,
              padding: 16,
              borderRadius: 100,
              cursor: status === "submitting" ? "wait" : "pointer",
              marginTop: 2,
            }}
            className="hover-white"
          >
            {status === "submitting" ? "Sending…" : "Get my straight answer →"}
          </button>
        </form>
      )}

      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--text-faint)",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        One business day · a person reads it · no sequence
      </div>
    </div>
  );
}
