import type {
  AnswerMap,
  AssessmentConfig,
  AssessmentResult,
  AssessmentTier,
  DimensionScore,
} from "./types";

/**
 * Maps a raw 1-4 option value onto a 0-100 scale: 1 -> 0, 4 -> 100.
 */
function normalize(value: number): number {
  return ((value - 1) / 3) * 100;
}

function optionValue(config: AssessmentConfig, questionId: string, answers: AnswerMap): number {
  const question = config.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`Unknown question: ${questionId}`);
  const optionIndex = answers[questionId];
  const option = question.options[optionIndex];
  if (option?.value === undefined) {
    throw new Error(`Question ${questionId} has no scored answer at index ${optionIndex}`);
  }
  return option.value;
}

function pickTier(tiers: AssessmentTier[], compositeScore: number): AssessmentTier {
  // tiers is sorted ascending by minScore; the last tier whose floor we clear wins.
  let picked = tiers[0];
  for (const tier of tiers) {
    if (compositeScore >= tier.minScore) picked = tier;
  }
  return picked;
}

function personalizationLabel(
  config: AssessmentConfig,
  questionId: string,
  answers: AnswerMap
): string {
  const question = config.questions.find((q) => q.id === questionId);
  const option = question?.options[answers[questionId]];
  return option?.personalizationLabel ?? option?.label ?? "";
}

/** Buckets a 0-100 dimension score into one of 4 bands, matching the tier cutoffs (0/25/50/75). */
export function scoreBandIndex(score: number): number {
  if (score >= 75) return 3;
  if (score >= 50) return 2;
  if (score >= 25) return 1;
  return 0;
}

function leadPriorityFrom(buyInValue: number, urgencyValue: number): "hot" | "warm" | "nurture" {
  const sum = buyInValue + urgencyValue; // 2-8
  if (sum >= 6) return "hot";
  if (sum >= 4) return "warm";
  return "nurture";
}

/**
 * Computes the full result from raw answers. Deliberately excludes the
 * buy-in and urgency questions from the composite maturity score - they
 * measure purchase readiness, not operational maturity, and mixing them
 * in would make a low-maturity, high-readiness lead (the best kind) score
 * identically to a high-maturity, low-readiness one (a poor fit right now).
 * Those two signals drive leadPriority instead, which is never shown to
 * the prospect - only used for internal routing.
 */
export function computeResult(config: AssessmentConfig, answers: AnswerMap): AssessmentResult {
  const unsorted: DimensionScore[] = config.maturityDimensionKeys.map((key) => {
    const question = config.questions.find((q) => q.dimension === key);
    if (!question) throw new Error(`No question maps to dimension: ${key}`);
    const rawValue = optionValue(config, question.id, answers);
    const score = normalize(rawValue);
    return {
      key,
      label: dimensionLabel(config, key),
      score,
      rawValue,
      insight: config.dimensionInsights[key](score),
    };
  });

  // Worst first - this is meant to read as a ranked report ("fix this,
  // then this"), not a flat recap in question order.
  const dimensionScores = [...unsorted].sort((a, b) => a.score - b.score);

  const compositeScore =
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length;

  const tier = pickTier(config.tiers, compositeScore);

  const weakestDimension = dimensionScores[0];

  const goalLabel = personalizationLabel(config, config.goalQuestionId, answers);
  const obstacleLabel = personalizationLabel(config, config.obstacleQuestionId, answers);
  const weakestLine = config.weakestDimensionCopy[weakestDimension.key](goalLabel, obstacleLabel);
  const narrative = `${tier.summary} ${weakestLine}`;

  const recommendations = dimensionScores
    .slice(0, 2)
    .map((d) => config.dimensionRecommendations[d.key]);

  const urgencyIndex = answers[config.urgencyQuestionId];
  const ctaLine = config.ctaByUrgency[urgencyIndex];

  const buyInValue = optionValue(config, config.buyInQuestionId, answers);
  const urgencyOption = config.questions.find((q) => q.id === config.urgencyQuestionId)?.options[
    urgencyIndex
  ];
  const urgencyValue = urgencyOption?.value ?? urgencyIndex + 1;

  return {
    compositeScore: Math.round(compositeScore),
    tier,
    dimensionScores,
    weakestDimension,
    weakestLine,
    narrative,
    recommendations,
    ctaLine,
    leadPriority: leadPriorityFrom(buyInValue, urgencyValue),
    buyInValue,
    urgencyValue,
  };
}

function dimensionLabel(config: AssessmentConfig, key: string): string {
  const question = config.questions.find((q) => q.dimension === key);
  return question ? dimensionLabelOverrides[config.id]?.[key] ?? key : key;
}

/**
 * Human-readable labels per assessment, keyed by dimension. Kept here
 * rather than on the question (which carries the *question* copy, not
 * the short label used on the result screen's dimension bars).
 */
const dimensionLabelOverrides: Record<string, Record<string, string>> = {
  cleversite: {
    analytics: "Analytics Depth",
    ownership: "Ownership Clarity",
    velocity: "Shipping Velocity",
    testing: "Testing Culture",
  },
  pie: {
    documentation: "Documentation",
    hoursCost: "Time Efficiency",
    ownership: "Ownership Clarity",
    priorAttempts: "Fix History",
  },
};

/** Resolves the templated prompt for a question given prior answers. */
export function resolvePrompt(question: AssessmentConfig["questions"][number], answers: AnswerMap) {
  return typeof question.prompt === "function" ? question.prompt(answers) : question.prompt;
}
