"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AnswerMap, AssessmentConfig } from "@/app/assessments/types";
import { computeResult } from "@/app/assessments/scoring";
import { track, trackPageview } from "@/app/gtm";
import ProgressBar from "@/app/assessments/engine/ProgressBar";
import QuestionCard from "@/app/assessments/engine/QuestionCard";
import ContactGate from "@/app/assessments/engine/ContactGate";
import ResultReport from "@/app/assessments/engine/ResultReport";

interface StoredState {
  answers: AnswerMap;
  name: string;
  email: string;
}

function loadStored(storageKey: string): StoredState | null {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.answers !== "object" || parsed.answers === null) return null;
    return {
      answers: parsed.answers,
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
    };
  } catch {
    return null;
  }
}

function persistStored(storageKey: string, state: StoredState) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Private browsing / blocked storage - progress just won't resume.
  }
}

/**
 * Renders one step of the flow - a question, the contact gate, or the
 * result - identified by `step`, the URL segment from the app/<id>/[step]
 * route ("1".."N", "contact", "results"). Each step is therefore a real,
 * distinct URL reached via router.push (not just internal state), so
 * standard URL-based analytics (GA4 page_view on History Change, ad
 * pixels, GTM's History Change trigger) can see per-question drop-off -
 * trackPageview() also fires an explicit virtual-pageview event for
 * whatever GTM setup is in place.
 *
 * The route change remounts this component on every step (the App Router
 * re-renders the page tree per navigation), so answers/name/email are
 * rehydrated from sessionStorage on mount rather than held only in memory -
 * that also makes a mid-flow refresh, or a direct link to a step already
 * reached, resume correctly instead of going blank.
 */
export default function AssessmentEngine({ config, step }: { config: AssessmentConfig; step: string }) {
  const router = useRouter();
  const totalQuestions = config.questions.length;
  const storageKey = `${config.id}-assessment-state`;

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const questionNumber = /^[0-9]+$/.test(step) ? parseInt(step, 10) : null;
  const questionIndex = questionNumber !== null ? questionNumber - 1 : -1;
  const isValidQuestion = questionIndex >= 0 && questionIndex < totalQuestions;

  useEffect(() => {
    const stored = loadStored(storageKey);
    if (stored) {
      setAnswers(stored.answers);
      setName(stored.name);
      setEmail(stored.email);
    }
    setHydrated(true);
    // Only ever run on mount for this instance - storageKey doesn't change post-mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A direct/stray hit on /results with no completed answers (a stale
  // bookmark, a shared link) has nothing to show - send it back to the
  // pitch instead of rendering blank or throwing inside computeResult.
  useEffect(() => {
    if (!hydrated) return;
    if (step === "results" && Object.keys(answers).length < totalQuestions) {
      router.replace(`/${config.id}`);
    }
  }, [hydrated, step, answers, totalQuestions, router, config.id]);

  useEffect(() => {
    if (!hydrated) return;
    track("Assessment Step Viewed", { assessment: config.id, step });
    trackPageview(`/${config.id}/${step}`);
    // Fire once per step change, not on every answers/name/email update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, step, config.id]);

  const handleAnswer = useCallback(
    (questionId: string, optionIndex: number) => {
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: optionIndex };
        persistStored(storageKey, { answers: next, name, email });
        return next;
      });
      track("Assessment Question Answered", {
        assessment: config.id,
        question_id: questionId,
        option_index: optionIndex,
      });
    },
    [config.id, storageKey, name, email]
  );

  const goNext = useCallback(() => {
    if (questionNumber !== null && questionNumber < totalQuestions) {
      router.push(`/${config.id}/${questionNumber + 1}`);
    } else {
      router.push(`/${config.id}/contact`);
    }
  }, [questionNumber, totalQuestions, router, config.id]);

  const goBack = useCallback(() => {
    if (step === "contact") {
      router.push(`/${config.id}/${totalQuestions}`);
      return;
    }
    if (questionNumber === null) return;
    if (questionNumber <= 1) {
      router.push(`/${config.id}`);
    } else {
      router.push(`/${config.id}/${questionNumber - 1}`);
    }
  }, [step, questionNumber, totalQuestions, router, config.id]);

  const handleGateSubmit = useCallback(
    (submittedName: string, submittedEmail: string) => {
      setName(submittedName);
      setEmail(submittedEmail);
      persistStored(storageKey, { answers, name: submittedName, email: submittedEmail });

      const computed = computeResult(config, answers);
      track("Assessment Completed", {
        assessment: config.id,
        tier: computed.tier.key,
        composite_score: computed.compositeScore,
      });

      fetch(`/api/${config.id}-assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: submittedName, email: submittedEmail, answers, company: "" }),
      }).catch((err) => {
        console.error(`[${config.id}-assessment] submission failed`, err);
      });

      router.push(`/${config.id}/results`);
    },
    [answers, config, storageKey, router]
  );

  if (!hydrated) return null;

  if (isValidQuestion) {
    const question = config.questions[questionIndex];
    return (
      <div className="assessment-shell">
        <ProgressBar current={questionIndex} total={totalQuestions} />
        <div key={step} className="assessment-step">
          <QuestionCard
            question={question}
            answers={answers}
            onAnswer={(index) => handleAnswer(question.id, index)}
            onAdvance={goNext}
            onBack={questionIndex > 0 ? goBack : undefined}
          />
        </div>
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="assessment-shell">
        <div key="contact" className="assessment-step">
          <ContactGate onSubmit={handleGateSubmit} onBack={goBack} assessmentId={config.id} />
        </div>
      </div>
    );
  }

  if (step === "results") {
    if (Object.keys(answers).length < totalQuestions) return null; // redirect effect above handles it
    const result = computeResult(config, answers);
    return (
      <div className="assessment-shell">
        <div key="results" className="assessment-step">
          <ResultReport
            result={result}
            email={email}
            resultLabel={config.resultLabel}
            assessmentId={config.id}
          />
        </div>
      </div>
    );
  }

  return null;
}
