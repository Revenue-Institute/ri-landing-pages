import type { AssessmentResult } from "@/app/assessments/types";
import { TrackLink } from "@/app/TrackLink";

export default function ResultReport({
  result,
  email,
  resultLabel,
  assessmentId,
}: {
  result: AssessmentResult;
  email: string;
  resultLabel: string;
  assessmentId: string;
}) {
  return (
    <div className="assessment-card">
      <div className="assessment-eyebrow">{resultLabel}</div>
      <div className="assessment-result-score">{result.compositeScore}</div>
      <h2 className="assessment-result-headline">{result.tier.headline}</h2>

      <p className="assessment-result-narrative">{result.tier.summary}</p>
      <p className="assessment-result-callout">{result.weakestLine}</p>

      <h3 className="assessment-section-label">Where you stand, worst to best</h3>
      <div className="assessment-result-bars">
        {result.dimensionScores.map((dimension) => {
          const isWeakest = dimension.key === result.weakestDimension.key;
          return (
            <div key={dimension.key}>
              <div className="assessment-result-bar-label">
                <span>{dimension.label}</span>
                <span className="assessment-result-bar-value">{Math.round(dimension.score)}</span>
              </div>
              <div className="assessment-result-bar-track" aria-hidden="true">
                <div
                  className={`assessment-result-bar-fill${isWeakest ? " assessment-result-bar-fill-signal" : ""}`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>
              <p className="assessment-result-dimension-insight">{dimension.insight}</p>
            </div>
          );
        })}
      </div>

      <h3 className="assessment-section-label">Where to start</h3>
      <ul className="assessment-recommendations">
        {result.recommendations.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <p className="assessment-result-cta-line">{result.ctaLine}</p>

      <TrackLink
        event="LP - CTA Click"
        params={{ cta: `${assessmentId}_result_cta`, location: `${assessmentId}_result` }}
        href="/#start-form"
        className="assessment-result-cta-btn"
      >
        {"Talk to us about this ->"}
      </TrackLink>

      <p className="assessment-result-confirm">
        We&rsquo;ve emailed a copy of this to {email}.
      </p>
    </div>
  );
}
