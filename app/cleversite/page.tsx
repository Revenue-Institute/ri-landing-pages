import type { Metadata } from "next";
import AssessmentPageChrome from "@/app/assessments/AssessmentPageChrome";
import CleversiteClient from "@/app/cleversite/CleversiteClient";

export const metadata: Metadata = {
  title: "Website Optimization Assessment | Revenue Institute",
  description:
    "An 8-question diagnostic that scores your site's analytics, ownership, shipping velocity, and testing maturity.",
};

export default function CleverSitePage() {
  return (
    <AssessmentPageChrome>
      <CleversiteClient />
    </AssessmentPageChrome>
  );
}
