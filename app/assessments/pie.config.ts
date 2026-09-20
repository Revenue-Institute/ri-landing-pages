import type { AssessmentConfig, AssessmentOption, AssessmentQuestion } from "./types";
import { scoreBandIndex } from "./scoring";

/**
 * PIE - Operations. Source: docs/pie.md.
 *
 * Same shape as cleversite.config.ts: a public "Process Health Score" is
 * the average of four operational-maturity dimensions (documentation, time
 * efficiency, ownership, fix history). Buy-in and urgency are excluded from
 * that score and drive leadPriority instead (internal-only, see scoring.ts).
 *
 * Unlike CleverSite, the personalization variable ({process}) is threaded
 * through three separate questions (frictionReason, documentation,
 * ownership), not just one - each has its own templated prompt below,
 * all pulling from the same processOptions labels.
 */

const processOptions: AssessmentOption[] = [
  { label: "Client Intake/Onboarding", personalizationLabel: "intake and onboarding process" },
  { label: "Approval Processes", personalizationLabel: "approvals process" },
  { label: "Client Updates", personalizationLabel: "client updates process" },
  { label: "Reporting", personalizationLabel: "reporting process" },
];

const frictionReasonOptions: AssessmentOption[] = [
  { label: "Data Entry", personalizationLabel: "manual data entry" },
  { label: "Required Approvals", personalizationLabel: "the approval steps required" },
  { label: "Gathering Info", personalizationLabel: "how much info has to be gathered upfront" },
  { label: "Multiple Systems Used", personalizationLabel: "juggling multiple systems" },
];

function processLabel(answers: Record<string, number>): string {
  return processOptions[answers.process]?.personalizationLabel ?? "that process";
}

const questions: AssessmentQuestion[] = [
  {
    id: "process",
    kind: "context",
    prompt: "Which process is the primary source of friction right now?",
    options: processOptions,
  },
  {
    id: "frictionReason",
    kind: "context",
    prompt: (answers) => `What's the main reason for the friction in your ${processLabel(answers)}?`,
    options: frictionReasonOptions,
  },
  {
    id: "documentation",
    kind: "scored",
    dimension: "documentation",
    prompt: (answers) => `How is your ${processLabel(answers)} documented today?`,
    options: [
      { label: "Lives in someone's head", value: 1 },
      { label: "Loosely documented, rarely followed", value: 2 },
      { label: "Documented, followed most of the time", value: 3 },
      { label: "Fully documented and consistently followed", value: 4 },
    ],
  },
  {
    id: "hoursCost",
    kind: "scored",
    dimension: "hoursCost",
    prompt: "Roughly how many hours a week does this cost your team?",
    options: [
      { label: "30+", value: 1 },
      { label: "15-30", value: 2 },
      { label: "5-15", value: 3 },
      { label: "Under 5", value: 4 },
    ],
  },
  {
    id: "ownership",
    kind: "scored",
    dimension: "ownership",
    prompt: (answers) => `When your ${processLabel(answers)} breaks, who ends up owning the fallout?`,
    options: [
      { label: "Falls on me personally", value: 1 },
      { label: "Ad hoc team scramble", value: 2 },
      { label: "Informal go-to person, not official", value: 3 },
      { label: "Clear, defined owner for exceptions", value: 4 },
    ],
  },
  {
    id: "priorAttempts",
    kind: "scored",
    dimension: "priorAttempts",
    prompt: "Has a fix for this been attempted before?",
    options: [
      { label: "Never formally attempted", value: 1 },
      { label: "Tried software, abandoned", value: 2 },
      { label: "Tried a process change, didn't stick", value: 3 },
      { label: "Currently mid-attempt", value: 4 },
    ],
  },
  {
    id: "buyIn",
    kind: "scored",
    dimension: "buyIn",
    prompt: "If a working fix were ready tomorrow, what's actually true?",
    options: [
      { label: "No one owns making it happen", value: 1 },
      { label: "We'd need exec buy-in first", value: 2 },
      { label: "We could implement it ourselves quickly", value: 3 },
      { label: "We're actively looking for this now", value: 4 },
    ],
  },
  {
    id: "urgency",
    kind: "priority",
    prompt: "How urgent is solving this?",
    options: [
      { label: "Not urgent", value: 1 },
      { label: "On the radar, no timeline", value: 2 },
      { label: "Want it solved in 6 months", value: 3 },
      { label: "Need it solved now", value: 4 },
    ],
  },
];

export const pieConfig: AssessmentConfig = {
  id: "pie",
  title: "Process Improvement Assessment",
  intro: {
    eyebrow: "Process Improvement Assessment - 2 minutes",
    headline: "What's actually stopping your team from fixing this process?",
    lead: "Answer 8 quick questions about how this process runs today. You'll get a real diagnostic score across four dimensions, plus exactly what's holding it back - not a generic quiz.",
    ctaLabel: "Start the assessment ->",
    reassurance: "Takes about 2 minutes. Results are instant, and we'll email you a copy.",
  },
  resultLabel: "Your process health score",
  questions,
  maturityDimensionKeys: ["documentation", "hoursCost", "ownership", "priorAttempts"],
  goalQuestionId: "process",
  obstacleQuestionId: "frictionReason",
  buyInQuestionId: "buyIn",
  urgencyQuestionId: "urgency",
  tiers: [
    {
      key: "foundational",
      label: "Foundational",
      minScore: 0,
      headline: "Foundational - the process runs on memory and heroics",
      summary:
        "Right now, this process depends on specific people remembering specific exceptions, so consistency only happens when the right person is paying attention.",
    },
    {
      key: "reactive",
      label: "Reactive",
      minScore: 25,
      headline: "Reactive - problems get fixed after they cost you, not before",
      summary:
        "You have some structure, but most fixes happen after something breaks rather than before, which keeps the same failure showing up in a new form.",
    },
    {
      key: "structured",
      label: "Structured",
      minScore: 50,
      headline: "Structured - the fundamentals are in place, but a person still carries every exception",
      summary:
        "You have documentation and a named owner, which most teams never reach. What's missing is a system that catches exceptions automatically, instead of routing them to a person's judgment every time.",
    },
    {
      key: "optimized",
      label: "Optimized",
      minScore: 75,
      headline: "Optimized - most teams don't get this far",
      summary:
        "Your process is more disciplined than the vast majority of teams we see. The remaining gap isn't discipline, it's throughput - a person-run process can only handle so many exceptions a day.",
    },
  ],
  weakestDimensionCopy: {
    documentation: (process, frictionReason) =>
      `Nothing about your ${process} is written down in a way people actually follow, so every handoff runs on memory - which is exactly the kind of gap ${frictionReason} keeps opening back up.`,
    hoursCost: (process, frictionReason) =>
      `Your team is burning real hours on ${process} every single week, and as long as ${frictionReason} is in the mix, that number won't come down on its own.`,
    ownership: (process, frictionReason) =>
      `When your ${process} breaks, there's no clear owner for the fallout - it lands on whoever's closest, which leaves ${frictionReason} unresolved because no one is actually responsible for fixing it.`,
    priorAttempts: (process, frictionReason) =>
      `No one has seriously tried to fix your ${process} yet, so ${frictionReason} has just been accepted as the cost of doing business.`,
  },
  ctaByUrgency: [
    "No rush - here's a short breakdown of what PIE automates first, worth a read whenever this comes back around.",
    "Since this is on your radar, we'll send over a short case study relevant to where you are today.",
    "With a target on the calendar, the fastest next step is a 20-minute walkthrough of what PIE would touch first in your process.",
    "Given the timeline, let's skip the deck - grab 20 minutes this week and we'll map exactly what PIE would fix first.",
  ],
  dimensionInsights: {
    documentation: (score) =>
      [
        "This process exists only in someone's head - it can't be fixed, scaled, or handed off.",
        "Something's written down, but it's not what actually happens, so it gets ignored.",
        "Documentation is followed most of the time - the gaps show up exactly when it matters most.",
        "This is genuinely well-documented - the opportunity now is removing manual steps, not writing them down better.",
      ][scoreBandIndex(score)],
    hoursCost: (score) =>
      [
        "This is costing real, meaningful time every week - money is currently just leaking out of the calendar.",
        "The hours add up to a part-time job's worth of manual work every month.",
        "The time cost is manageable but still real - it's a tax your team pays every week.",
        "This barely registers as a time cost anymore - whatever's left is close to fully wrung out.",
      ][scoreBandIndex(score)],
    ownership: (score) =>
      [
        "When this breaks, it lands on one person personally - there's no system underneath them.",
        "Fixing it is an ad hoc scramble every time, which means the fix never sticks.",
        "There's an informal go-to person - reliable, but it's not written down as anyone's job.",
        "There's a clear, defined owner for exceptions - the process can survive someone leaving.",
      ][scoreBandIndex(score)],
    priorAttempts: (score) =>
      [
        "Nothing has been seriously tried yet - which also means nothing has been ruled out.",
        "Software was tried and abandoned, which usually means the tool wasn't the actual problem.",
        "A process change was attempted and didn't stick - the fix likely needs to be system-enforced, not just agreed to.",
        "There's an active attempt in motion right now - the risk is it stalls like the ones before it.",
      ][scoreBandIndex(score)],
  },
  dimensionRecommendations: {
    documentation: "Write down the process as it's actually run today, not how it's supposed to run, then fix the gap.",
    hoursCost: "Time-box the manual parts for one week to get a real number on what this is costing you.",
    ownership: "Name a single owner for exceptions, not a team, so fixes don't wait on a scramble.",
    priorAttempts: "Before trying another tool, figure out why the last attempt didn't stick - that's usually the real blocker.",
  },
};
