import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssessmentPageChrome from "@/app/assessments/AssessmentPageChrome";
import { pieConfig } from "@/app/assessments/pie.config";
import PieStepClient from "@/app/pie/[step]/PieStepClient";

export const metadata: Metadata = {
  title: "Process Improvement Assessment | Revenue Institute",
  robots: { index: false, follow: false },
};

function isValidStep(step: string): boolean {
  if (step === "contact" || step === "results") return true;
  const n = Number(step);
  return Number.isInteger(n) && n >= 1 && n <= pieConfig.questions.length;
}

export default async function PieStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  if (!isValidStep(step)) notFound();

  return (
    <AssessmentPageChrome minimal>
      <PieStepClient step={step} />
    </AssessmentPageChrome>
  );
}
