import type { Metadata } from "next";
import AssessmentPageChrome from "@/app/assessments/AssessmentPageChrome";
import PieClient from "@/app/pie/PieClient";

export const metadata: Metadata = {
  title: "Process Improvement Assessment | Revenue Institute",
  description:
    "An 8-question diagnostic that scores your team's process documentation, time cost, ownership, and fix history.",
};

export default function PiePage() {
  return (
    <AssessmentPageChrome>
      <PieClient />
    </AssessmentPageChrome>
  );
}
