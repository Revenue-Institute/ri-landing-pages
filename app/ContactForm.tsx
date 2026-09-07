"use client";

import { useState, type FormEvent } from "react";
import { track } from "./gtm";

const MONO = "var(--font-mono), monospace";
const GROTESK = "var(--font-grotesk), 'Helvetica Neue', Helvetica, sans-serif";

const inputStyle: React.CSSProperties = {
  fontSize: 15,
  padding: "15px 18px",
  border: "1px solid #26292C",
  borderRadius: 12,
  background: "#0A0C0D",
  color: "#F3F4F1",
  outline: "none",
};

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

  const BLOCKED = [
    "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
    "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com",
    "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
    "mail.com", "gmx.com", "gmx.net", "yandex.com", "zoho.com",
    "rocketmail.com", "ymail.com", "earthlink.net", "comcast.net",
    "att.net", "verizon.net", "sbcglobal.net", "cox.net", "bellsouth.net",
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailVal = String(data.get("email") || "").trim();
    const domain = emailVal.split("@")[1]?.toLowerCase() ?? "";
    if (BLOCKED.includes(domain)) {
      setEmailError("Please use your work email address.");
      return;
    }
    setEmailError("");
    setStatus("submitting");
    const formData = {
      name: String(data.get("name") || ""),
      email: emailVal,
      process: String(data.get("process") || ""),
    };
    track("LP - Form Attempt", { form_id: id || "contact", ...formData });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      track("LP - Form Submit", { form_id: id || "contact", ...formData });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id={id}
      style={{
        flex: "1 1 400px",
        minWidth: 0,
        border: "1px solid #1E3A2D",
        borderRadius: 20,
        background: "linear-gradient(180deg, #0E1113, #0A0C0D)",
        padding: "32px 34px",
        boxShadow: "0 50px 90px -60px rgba(0,0,0,0.95)",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: "-0.026em", fontWeight: 500, color: "#F3F4F1", marginBottom: 8 }}>
        {title}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "#8D9490", margin: "0 0 24px" }}>
        One business day. You get whether it's worth automating, a rough range, and what we'd need to see. No deck, no
        discovery series.
      </p>

      {status === "success" ? (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: "#5BE0A5", marginBottom: 12 }}>Got it — thank you.</div>
          <div style={{ fontSize: 15, color: "#8D9490" }}>
            A person will read it and reply within one business day.
          </div>
        </div>
      ) : (
        <form style={{ display: "grid", gap: 12 }} onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Name" required style={inputStyle} className="focus-green" />
          <input type="email" name="email" placeholder="Work email" required style={{ ...inputStyle, borderColor: emailError ? "#ff6b6b" : "#26292C" }} className="focus-green" />
          {emailError && (
            <div style={{ fontSize: 13, color: "#ff6b6b", fontFamily: MONO }}>{emailError}</div>
          )}
          <input type="text" name="process" placeholder={hint} required style={inputStyle} className="focus-green" />
          {status === "error" && (
            <div style={{ fontSize: 14, color: "#ff6b6b", fontFamily: MONO }}>
              Something went wrong. Try again or email sales@revenueinstitute.com
            </div>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            style={{
              width: "100%",
              fontFamily: GROTESK,
              fontSize: 16,
              fontWeight: 500,
              color: "#08090A",
              background: status === "submitting" ? "#3A8C68" : "#5BE0A5",
              border: 0,
              padding: 17,
              borderRadius: 100,
              cursor: status === "submitting" ? "wait" : "pointer",
              marginTop: 4,
            }}
            className="hover-white"
          >
            {status === "submitting" ? "Sending…" : "Get my straight answer →"}
          </button>
        </form>
      )}
      <div style={{ fontFamily: MONO, fontSize: 11, color: "#5F6764", marginTop: 16, textAlign: "center" }}>
        One business day · a person reads it · no sequence
      </div>
    </div>
  );
}
