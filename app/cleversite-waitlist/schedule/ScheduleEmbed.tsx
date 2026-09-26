"use client";

import { useEffect, useRef } from "react";
import { track } from "@/app/gtm";

declare global {
  interface Window {
    SavvyCal?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

const SAVVYCAL_SCRIPT_ID = "savvycal-embed-script";
const SAVVYCAL_LINK = "revenueinstitute/cleversite";
const FORM_ID = "cleversite-waitlist-schedule";

interface SavvyCalScheduledDetail {
  link?: string;
  email?: string;
  displayName?: string;
  startAt?: string;
  timeZone?: string;
}

/**
 * SavvyCal's queue-then-drain pattern: calls made before embed.js finishes
 * loading get pushed onto window.SavvyCal.q, which embed.js reads and
 * replays once it takes over window.SavvyCal. The `initialized` ref guards
 * against React re-running the effect (StrictMode, fast refresh) from
 * queuing a second "inline" call and rendering a duplicate embed.
 *
 * The booking event fires the redirect to /thank-you instead of pushing
 * "LP - Call Booked" to the dataLayer directly here - firing a conversion
 * event and then immediately navigating away in the same tick risks GTM's
 * tags (Ads/Meta pixels included) getting cut off mid-fire. The thank-you
 * page's own load is a stable place to fire it instead.
 */
export default function ScheduleEmbed() {
  const initialized = useRef(false);

  useEffect(() => {
    track("LP - Schedule Page View", { form_id: FORM_ID });

    function handleScheduled(ev: Event) {
      const detail = (ev as CustomEvent<SavvyCalScheduledDetail>).detail;
      const params = new URLSearchParams();
      if (detail?.link) params.set("link", detail.link);
      if (detail?.email) params.set("email", detail.email);
      if (detail?.displayName) params.set("display_name", detail.displayName);
      if (detail?.startAt) params.set("start_at", detail.startAt);
      if (detail?.timeZone) params.set("tz", detail.timeZone);
      window.location.href = `/cleversite-waitlist/schedule/thank-you?${params.toString()}`;
    }
    window.addEventListener("savvycal.scheduled", handleScheduled);

    if (initialized.current) {
      return () => window.removeEventListener("savvycal.scheduled", handleScheduled);
    }
    initialized.current = true;

    if (!window.SavvyCal) {
      window.SavvyCal = function (...args: unknown[]) {
        (window.SavvyCal!.q = window.SavvyCal!.q || []).push(args);
      };
    }

    if (!document.getElementById(SAVVYCAL_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SAVVYCAL_SCRIPT_ID;
      script.src = "https://embed.savvycal.com/v1/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.SavvyCal("init");
    window.SavvyCal("inline", { link: SAVVYCAL_LINK, selector: "#booking-page" });

    return () => window.removeEventListener("savvycal.scheduled", handleScheduled);
  }, []);

  return <div id="booking-page" style={{ minHeight: 680 }} />;
}
