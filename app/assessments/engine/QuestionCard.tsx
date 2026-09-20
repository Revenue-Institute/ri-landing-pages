"use client";

import { useEffect, useId, useRef } from "react";
import type { AnswerMap, AssessmentQuestion } from "@/app/assessments/types";
import { resolvePrompt } from "@/app/assessments/scoring";

const ADVANCE_DELAY_MS = 350;

interface QuestionCardProps {
  question: AssessmentQuestion;
  answers: AnswerMap;
  onAnswer: (optionIndex: number) => void;
  onAdvance: () => void;
  onBack?: () => void;
}

export default function QuestionCard({
  question,
  answers,
  onAnswer,
  onAdvance,
  onBack,
}: QuestionCardProps) {
  const uid = useId();
  const groupName = `${uid}-${question.id}`;
  const legendId = `${uid}-legend`;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedIndex = answers[question.id];
  const prompt = resolvePrompt(question, answers);

  // Each question is a fresh mounted instance (the engine keys on step), so
  // unmount is the only cleanup path - it also cancels a pending auto-advance
  // if the user clicks Back before the delay fires.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function restartAdvanceTimer() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onAdvance, ADVANCE_DELAY_MS);
  }

  // Clicking a radio that's already checked fires no native "change" event
  // (its checked state never changes), so re-confirming an answer after
  // Back - without picking a different option - needs its own path to
  // restart the advance timer. This must not also call onAnswer, or a
  // genuinely new selection would double-fire (onClick + onChange both
  // land for a value-changing click) and double-count the analytics event.
  function handleOptionClick(index: number) {
    if (index === selectedIndex) restartAdvanceTimer();
  }

  function handleOptionChange(index: number) {
    onAnswer(index);
    restartAdvanceTimer();
  }

  return (
    <div className="assessment-card">
      <fieldset className="qc-fieldset">
        <legend id={legendId} className="qc-legend">
          {prompt}
        </legend>
        <div className="qc-options">
          {question.options.map((option, index) => {
            const optionId = `${groupName}-${index}`;
            const checked = selectedIndex === index;
            return (
              <label
                key={optionId}
                htmlFor={optionId}
                className={`qc-option${checked ? " qc-option-selected" : ""}`}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={index}
                  checked={checked}
                  onChange={() => handleOptionChange(index)}
                  onClick={() => handleOptionClick(index)}
                  className="sr-only"
                />
                <span className="qc-option-label">{option.label}</span>
                <span className="qc-option-dot" aria-hidden="true">
                  {checked && <span className="qc-option-dot-fill" />}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {onBack && (
        <button type="button" className="qc-back" onClick={onBack}>
          ← Back
        </button>
      )}
    </div>
  );
}
