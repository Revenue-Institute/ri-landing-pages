"use client";

import { pieConfig } from "@/app/assessments/pie.config";
import AssessmentIntroScreen from "@/app/assessments/engine/AssessmentIntroScreen";

/**
 * Same reasoning as app/cleversite/CleversiteClient.tsx: the config carries
 * function values that can't cross the server->client prop boundary from a
 * Server Component page.
 */
export default function PieClient() {
  return <AssessmentIntroScreen config={pieConfig} />;
}
