import Link from "next/link";
import AssessmentPageChrome from "@/app/assessments/AssessmentPageChrome";

export default function NotFound() {
  return (
    <AssessmentPageChrome>
      <div className="assessment-shell">
        <div className="assessment-card">
          <div className="assessment-eyebrow">Not found</div>
          <h1 className="assessment-intro-headline">That step doesn&rsquo;t exist</h1>
          <p className="assessment-intro-lead">
            The assessment link you followed isn&rsquo;t a real step.
          </p>
          <Link href="/pie" className="assessment-submit-btn" style={{ display: "block", textAlign: "center" }}>
            {"Start the assessment ->"}
          </Link>
        </div>
      </div>
    </AssessmentPageChrome>
  );
}
