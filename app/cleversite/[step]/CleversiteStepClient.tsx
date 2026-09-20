"use client";

import { cleversiteConfig } from "@/app/assessments/cleversite.config";
import AssessmentEngine from "@/app/assessments/engine/AssessmentEngine";

export default function CleversiteStepClient({ step }: { step: string }) {
  return <AssessmentEngine config={cleversiteConfig} step={step} />;
}
