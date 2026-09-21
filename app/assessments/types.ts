/**
 * Shared shape for any question-based assessment (CleverSite, PIE, future
 * ones). One engine + one scorer runs every assessment; only the config
 * differs. See scoring.ts for how these are turned into a result.
 */

import type { IndustryKey } from "@/app/data";

export type QuestionKind = "context" | "scored" | "priority";

export interface AssessmentOption {
  label: string;
  /**
   * Lowercase phrase used to slot this option into templated narrative
   * copy (e.g. "the lack of in-house expertise"). Required on options
   * that get referenced by a later question's prompt or by result copy.
   */
  personalizationLabel?: string;
  /** 1-4 maturity/readiness value. Present on "scored" and "priority" options. */
  value?: number;
}

export type AnswerMap = Record<string, number>; // questionId -> selected option index

export interface AssessmentQuestion {
  id: string;
  kind: QuestionKind;
  /** Static prompt, or templated against prior answers for personalized questions. */
  prompt: string | ((answers: AnswerMap) => string);
  options: AssessmentOption[];
  /**
   * Maturity dimension this question feeds. Only "scored" questions that
   * belong in the public composite score set this; a readiness/urgency
   * signal (e.g. buy-in) is scored but intentionally left out of the
   * public composite - see maturityDimensionKeys in AssessmentConfig.
   */
  dimension?: string;
}

export interface DimensionScore {
  key: string;
  label: string;
  /** 0-100, normalized from the option's 1-4 value. */
  score: number;
  rawValue: number; // 1-4
  /** One-line diagnostic for this specific dimension at this specific score - every dimension gets one, not just the weakest. */
  insight: string;
}

export interface AssessmentTier {
  key: string;
  label: string;
  minScore: number; // inclusive lower bound, 0-100
  headline: string;
  summary: string;
}

export interface AssessmentIntroContent {
  eyebrow: string;
  headline: string;
  lead: string;
  ctaLabel: string;
  reassurance: string;
}

export interface AssessmentConfig {
  id: string;
  title: string;
  /** The landing pitch shown before the first question - the "reason to start". */
  intro: AssessmentIntroContent;
  /** Eyebrow label on the result screen, e.g. "Website Optimization Score". */
  resultLabel: string;
  questions: AssessmentQuestion[];
  /** Dimension keys (from scored questions) that make up the public composite score. */
  maturityDimensionKeys: string[];
  tiers: AssessmentTier[]; // sorted ascending by minScore
  /** One sentence naming the constraint when this dimension is the weakest. */
  weakestDimensionCopy: Record<string, (goalLabel: string, obstacleLabel: string) => string>;
  /** IDs of the two personalization questions whose answers feed weakestDimensionCopy. */
  goalQuestionId: string;
  obstacleQuestionId: string;
  /** One-line diagnostic per dimension, banded by that dimension's own 0-100 score. Shown for every dimension, not just the weakest. */
  dimensionInsights: Record<string, (score: number) => string>;
  /** One concrete, actionable line per dimension - surfaced for the weakest two in the result's "where to start" list. */
  dimensionRecommendations: Record<string, string>;
  /** CTA line keyed by the urgency question's option index (0-based). */
  ctaByUrgency: string[];
  /** Question id carrying the urgency/priority-flag option (not scored into composite). */
  urgencyQuestionId: string;
  /** Question id carrying the buy-in/readiness signal (scored, excluded from composite). */
  buyInQuestionId: string;
  /**
   * Which of a vertical's 4 workflow before/after rows (app/data.ts) best
   * matches each maturity dimension - used to quote a real peer example for
   * whichever dimension turns out weakest. See industryContext.ts.
   */
  dimensionWorkflowRowIndex: Record<string, number>;
  /**
   * One line per dimension naming the specific mechanism this product uses
   * to close that exact gap - same (goalLabel, obstacleLabel) signature as
   * weakestDimensionCopy, so this continues the same diagnosis the
   * weakest-line callout opened, instead of starting a new, disconnected
   * industry-only narrative.
   */
  dimensionAiTieIn: Record<string, (goalLabel: string, obstacleLabel: string) => string>;
  /** Display name of the product referenced in dimensionAiTieIn, e.g. "CleverSite". */
  productName: string;
}

/**
 * The "what others in your industry are doing" section - built from real
 * per-vertical proof already vetted for the main site (app/data.ts), never
 * fabricated. Only present when a company profile resolved (see
 * companyLookup.ts); the result and its score never depend on this.
 */
export interface IndustryContext {
  industryKey: IndustryKey;
  industryLabel: string;
  /** True only when this came from a resolved company lookup, not the generic fallback vertical. */
  isConfirmedIndustry: boolean;
  companyName: string | null;
  location: string | null;
  employeeRange: string | null;
  /** Real stat/statLabel from the matching vertical, framed as a peer proof point. */
  peerStatLine: string;
  /** Real before/after workflow row matching the weakest dimension. */
  peerWorkflowLine: string;
  /** Names the tools this vertical typically already runs, so the pitch is "plugs in," not "rip and replace." */
  toolsLine: string;
  /** The specific product mechanism that closes the weakest dimension's gap. */
  aiTieIn: string;
}

export interface AssessmentResult {
  compositeScore: number; // 0-100, average of maturityDimensionKeys
  tier: AssessmentTier;
  dimensionScores: DimensionScore[]; // maturity dimensions only, sorted weakest first
  weakestDimension: DimensionScore;
  weakestLine: string; // the personalized one-sentence constraint, on its own
  narrative: string; // tier summary + weakest-dimension line, ready to render as one paragraph (used by email)
  /** The two personalization values baked into weakestLine, exposed so later sections (industryContext.ts) can continue the same diagnosis instead of starting a new one. */
  goalLabel: string;
  obstacleLabel: string;
  /** Concrete next actions for the two weakest dimensions, weakest first. */
  recommendations: string[];
  ctaLine: string;
  leadPriority: "hot" | "warm" | "nurture";
  buyInValue: number; // 1-4, internal only
  urgencyValue: number; // 1-4, internal only
}
