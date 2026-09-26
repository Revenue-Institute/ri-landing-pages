"use client";

import { useEffect, useRef } from "react";
import { track } from "@/app/gtm";

const FORM_ID = "cleversite-waitlist-schedule";

/**
 * Fires once per page load, not once per mount - the ref (not an empty dep
 * array alone) is the guard against React StrictMode's double-invoke
 * double-counting this conversion event in dev.
 */
export default function BookingConfirmedTracker({
  link,
  email,
  displayName,
  startAt,
  timeZone,
}: {
  link?: string;
  email?: string;
  displayName?: string;
  startAt?: string;
  timeZone?: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track("LP - Call Booked", {
      form_id: FORM_ID,
      link,
      email,
      display_name: displayName,
      start_at: startAt,
      time_zone: timeZone,
    });
  }, [link, email, displayName, startAt, timeZone]);

  return null;
}
