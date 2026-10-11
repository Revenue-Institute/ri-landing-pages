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
  /** Page-identifying lead name sent to n8n (e.g. "CleverSite Shopify"); needed because variants share one API route. */
  formName?: string;
  /** Audience-specific copy variant of the same product (swaps mockup copy). */
  variant?: "shopify";
  productName: string;
  eyebrow: string;
  headline: string;
  /** Exact substring of `headline` wrapped in the brand's green highlight block. */
  headlineHighlight: string;
  subhead: string;
  /** Optional explainer video, rendered full-width directly under the hero. */
  videoUrl?: string;
  problem: {
    headline: string;
    /** Exact substring of `problem.headline` wrapped in the brand's green highlight block. */
    headlineHighlight?: string;
    external: string;
    internal: string;
  };
  plan: { step: string; desc: string }[];
  guideLine: string; // empathy + authority, tied to a real proof point
  failureLine: string;
  /** Exact substring of `failureLine` wrapped in the brand's green highlight block. */
  failureLineHighlight?: string;
  reassurance: string;
  /** Optional CTA button label; defaults by productId. */
  ctaLabel?: string;
  /** Optional outcome cards ("what a self-learning site handles") between plan and the closing CTA. */
  benefits?: { title: string; desc: string }[];
  /** Optional proof block - only stats/quotes already established elsewhere on the site. */
  proof?: {
    stat: string;
    statLabel: string;
    source: string;
    quote: string;
    quoteName: string;
    quoteRole: string;
    quoteLogo?: { src: string; w: number; h: number };
  };
  /** Optional objection-handling FAQ, rendered as native disclosure rows (no client JS). */
  faq?: { q: string; a: string }[];
}
