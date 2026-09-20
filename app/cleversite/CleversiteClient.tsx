"use client";

import { cleversiteConfig } from "@/app/assessments/cleversite.config";
import AssessmentIntroScreen from "@/app/assessments/engine/AssessmentIntroScreen";

/**
 * Config objects carry function values (personalized prompts, narrative
 * copy templates), which can't cross the server->client serialization
 * boundary as a prop from a Server Component. Importing the config here,
 * inside a Client Component, keeps it in the client bundle instead.
 */
export default function CleversiteClient() {
  return <AssessmentIntroScreen config={cleversiteConfig} />;
}
