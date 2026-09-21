"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentConfig } from "@/app/assessments/types";
import { track, trackPageview } from "@/app/gtm";
import AssessmentIntro from "@/app/assessments/engine/AssessmentIntro";
import { loadStored, persistStored, storageKeyFor } from "@/app/assessments/engine/assessmentStorage";
import { startLookup } from "@/app/assessments/engine/companyProfileStore";

/**
 * The landing screen at /<id> - the only step that keeps the full page
 * chrome (header/logo). Starting the assessment navigates to a real URL
 * (/<id>/1) rather than flipping internal state, so every later step has
 * its own distinct, analytics-visible URL too.
 */
export default function AssessmentIntroScreen({ config }: { config: AssessmentConfig }) {
  const router = useRouter();
  const path = `/${config.id}`;

  useEffect(() => {
    track("Assessment Intro Viewed", { assessment: config.id });
    trackPageview(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStart(website: string) {
    track("Assessment Started", { assessment: config.id, has_website: Boolean(website) });
    if (website) {
      const storageKey = storageKeyFor(config.id);
      persistStored(storageKey, { ...loadStored(storageKey), website });
      startLookup(config.id, website);
    }
    router.push(`/${config.id}/1`);
  }

  return (
    <div className="assessment-shell">
      <div className="assessment-step">
        <AssessmentIntro config={config} onStart={handleStart} />
      </div>
    </div>
  );
}
