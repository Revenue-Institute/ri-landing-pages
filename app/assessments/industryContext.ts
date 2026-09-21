import { verticalsByKey } from "@/app/data";
import type { CompanyProfile } from "@/app/lib/enrichment/companyLookup";
import type { AssessmentConfig, AssessmentResult, IndustryContext } from "@/app/assessments/types";

/**
 * Builds the "what others in your industry are doing" section from a
 * resolved company profile. Every fact quoted here (the stat, the tools,
 * the before/after line) comes straight from app/data.ts's vertical
 * data - the same real case-study material used on the main site - so
 * this never risks inventing a number. Falls back to the generic
 * "Professional services" vertical, clearly unlabeled as confirmed, when
 * there's no profile - never guesses at an industry we don't know.
 *
 * aiTieIn is keyed by (goalLabel, obstacleLabel) - the same two values the
 * weakest-line callout above it was built from (see scoring.ts) - so this
 * section continues that diagnosis instead of opening an unrelated,
 * industry-only aside.
 */
export function buildIndustryContext(
  config: AssessmentConfig,
  result: AssessmentResult,
  profile: CompanyProfile | null
): IndustryContext {
  const vertical = verticalsByKey[profile?.industryKey ?? "professional-services"] ?? verticalsByKey["professional-services"];

  const rowIndex = config.dimensionWorkflowRowIndex[result.weakestDimension.key] ?? 0;
  const before = vertical.workflow.before[rowIndex];
  const after = vertical.workflow.after[rowIndex];

  return {
    industryKey: vertical.key,
    industryLabel: vertical.name,
    isConfirmedIndustry: Boolean(profile),
    companyName: profile?.companyName ?? null,
    location: profile?.location ?? null,
    employeeRange: profile?.employeeRange ?? null,
    peerStatLine: `${vertical.name} we work with have seen ${vertical.stat} - ${vertical.statLabel}.`,
    peerWorkflowLine: `Today, that usually looks like: "${before.step}" (${before.value}). Automated, it looks like: "${after.step}" (${after.value}).`,
    toolsLine: `It plugs into what ${vertical.name.toLowerCase()} already run - ${vertical.tools.join(", ")} - no rip-and-replace.`,
    aiTieIn: config.dimensionAiTieIn[result.weakestDimension.key]?.(result.goalLabel, result.obstacleLabel) ?? "",
  };
}
