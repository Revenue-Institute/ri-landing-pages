import type { AssessmentConfig } from "@/app/assessments/types";

/**
 * The landing pitch shown before question 1 - without it, a visitor lands
 * cold on "What's the biggest factor..." with no context for why they'd
 * answer 8 questions. This is the screen that gives them a reason to start.
 */
export default function AssessmentIntro({
  config,
  onStart,
}: {
  config: AssessmentConfig;
  onStart: () => void;
}) {
  const { intro } = config;
  return (
    <div className="assessment-card assessment-intro">
      <div className="assessment-chip">{intro.eyebrow}</div>
      <h1 className="assessment-intro-headline">{intro.headline}</h1>
      <p className="assessment-intro-lead">{intro.lead}</p>
      <button type="button" className="assessment-submit-btn" onClick={onStart}>
        {intro.ctaLabel}
      </button>
      <p className="assessment-result-confirm">{intro.reassurance}</p>
    </div>
  );
}
