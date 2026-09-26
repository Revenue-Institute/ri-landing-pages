"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/app/gtm";
import { isBlockedEmailDomain } from "@/app/lib/email/blockedDomains";
import { ATTRIBUTION_KEYS } from "@/app/lib/attribution";

/**
 * Deliberately just an email field - a waitlist is the lowest-friction ask
 * on the site. Keeps the same work-email-only rule as every other form
 * here so the A/B test against the full assessment compares like-quality
 * leads, not just raw signup volume.
 */
export default function WaitlistForm({
  productId,
  productName,
  onInk = false,
}: {
  productId: string;
  productName: string;
  /** True when rendered on a full-bleed ink band (the closing section). */
  onInk?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const uid = useId();
  const emailId = `${uid}-email`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const honeypot = String(data.get("company") || "").trim();
    if (honeypot) return; // bot - drop silently, no error shown

    if (isBlockedEmailDomain(email)) {
      setError("Please use your work email address.");
      document.getElementById(emailId)?.focus();
      return;
    }

    setError("");
    setStatus("submitting");
    track("LP - Form Attempt", { form_id: `${productId}-waitlist` });
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(
        ATTRIBUTION_KEYS.flatMap((key) => {
          const value = params.get(key);
          return value ? [[key, value]] : [];
        }),
      );
      const res = await fetch(`/api/${productId}-waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot, attribution, url: window.location.href }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setStatus("error");
        if (body?.error) setError(body.error);
        return;
      }
      setStatus("success");
      track("LP - Form Submit", { form_id: `${productId}-waitlist` });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const headingColor = onInk ? "var(--ri-dark-text)" : "var(--ri-ink)";
    const mutedColor = onInk ? "var(--ri-dark-muted)" : "var(--ri-muted)";
    const dividerColor = onInk ? "var(--ri-dark-edge)" : "var(--ri-hairline)";

    return (
      <div role="status" aria-live="polite" style={{ padding: "14px 0" }}>
        <div style={{ fontFamily: "var(--ri-font-display)", fontSize: 18, fontWeight: 800, color: headingColor }}>
          You&rsquo;re on the list.
        </div>
        <div style={{ fontSize: 15, color: mutedColor, marginTop: 6 }}>
          We&rsquo;ll email you the moment {productName} is ready.
        </div>
        {productId === "cleversite" && (
          <div style={{ fontSize: 14, color: mutedColor, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${dividerColor}` }}>
            Want in sooner?{" "}
            <Link
              href="/cleversite-waitlist/schedule"
              onClick={() => track("LP - Schedule CTA Click", { form_id: `${productId}-waitlist`, placement: "form_success" })}
              style={{ color: headingColor, fontWeight: 700, textDecoration: "underline" }}
            >
              Skip to the front of the line
            </Link>{" "}
            - grab 15 minutes with me about what you need {productName} to do.
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "100%", maxWidth: 560 }} noValidate={false}>
      <div style={{ flex: "1 1 220px", minWidth: 0 }}>
        <label htmlFor={emailId} className="sr-only">
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
          aria-invalid={error ? true : undefined}
          style={{
            fontFamily: "var(--ri-font-display)",
            fontSize: 16,
            padding: "13px 14px",
            border: `2px solid ${error ? "var(--ri-alert)" : "var(--ri-ink)"}`,
            borderRadius: 0,
            background: "var(--ri-white)",
            color: "var(--ri-ink)",
            width: "100%",
            minHeight: 52,
          }}
        />
      </div>

      {/* Honeypot: invisible to people, irresistible to form bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "submitting"} className="ri-btn" style={{ flex: "0 0 auto" }}>
        {status === "submitting" ? "Joining..." : productId === "cleversite" ? "Request early access" : "Join the waitlist"}
      </button>

      <div style={{ flexBasis: "100%", minHeight: 20 }}>
        {error && (
          <div style={{ fontSize: 13, color: "var(--ri-alert)", fontFamily: "var(--ri-font-display)", marginTop: 4 }}>
            {error}
          </div>
        )}
        {status === "error" && !error && (
          <div style={{ fontSize: 13, color: "var(--ri-alert)", fontFamily: "var(--ri-font-display)", marginTop: 4 }}>
            We couldn't add you right now. Try again, or email{" "}
            <a href="mailto:sales@revenueinstitute.com" style={{ color: "inherit", textDecoration: "underline" }}>
              sales@revenueinstitute.com
            </a>
            .
          </div>
        )}
      </div>
    </form>
  );
}
