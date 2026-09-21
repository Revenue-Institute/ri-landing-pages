/**
 * Content for a "coming soon" waitlist page - the short, StoryBrand-
 * structured variant being A/B tested against the full interactive
 * assessment at /<id>. No functions/personalization here (unlike
 * AssessmentConfig) - everything is plain data, so it's safe to pass
 * straight from a Server Component page into the Client Component
 * WaitlistPage without the RSC serialization issue the assessments hit.
 */
export interface WaitlistConfig {
  id: "cleversite" | "pie";
  productName: string;
  eyebrow: string;
  headline: string;
  /** Exact substring of `headline` wrapped in the brand's green highlight block. */
  headlineHighlight: string;
  subhead: string;
  problem: {
    headline: string;
    external: string;
    internal: string;
  };
  plan: { step: string; desc: string }[];
  guideLine: string; // empathy + authority, tied to a real proof point
  successLine: string;
  failureLine: string;
  reassurance: string;
}
