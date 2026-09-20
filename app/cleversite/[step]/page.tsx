import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssessmentPageChrome from "@/app/assessments/AssessmentPageChrome";
import { cleversiteConfig } from "@/app/assessments/cleversite.config";
import CleversiteStepClient from "@/app/cleversite/[step]/CleversiteStepClient";

export const metadata: Metadata = {
  title: "Website Optimization Assessment | Revenue Institute",
  robots: { index: false, follow: false },
};

function isValidStep(step: string): boolean {
  if (step === "contact" || step === "results") return true;
  const n = Number(step);
  return Number.isInteger(n) && n >= 1 && n <= cleversiteConfig.questions.length;
}

export default async function CleverSiteStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!isValidStep(step)) notFound();

  return (
    <AssessmentPageChrome minimal>
      <CleversiteStepClient step={step} />
    </AssessmentPageChrome>
  );
}
