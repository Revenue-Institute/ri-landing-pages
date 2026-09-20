"use client";

import { pieConfig } from "@/app/assessments/pie.config";
import AssessmentEngine from "@/app/assessments/engine/AssessmentEngine";

export default function PieStepClient({ step }: { step: string }) {
  return <AssessmentEngine config={pieConfig} step={step} />;
}
