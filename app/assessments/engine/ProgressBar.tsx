interface ProgressBarProps {
  /** 0-indexed current question step. */
  current: number;
  total: number;
}

/**
 * Segmented step indicator. Deliberately shows no numeral on screen - the
 * gate and result screens are separate "final steps" outside this count,
 * matching how high-quality assessment UX (e.g. Typeform) treats them.
 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="assessment-progress">
      <div className="assessment-progress-track" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`assessment-progress-seg${i <= current ? " assessment-progress-seg-filled" : ""}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {`Question ${current + 1} of ${total}`}
      </span>
    </div>
  );
}
