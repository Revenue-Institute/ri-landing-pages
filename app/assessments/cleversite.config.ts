import type { AssessmentConfig, AssessmentOption, AssessmentQuestion } from "./types";
import { scoreBandIndex } from "./scoring";

/**
 * CleverSite - Marketing. Source: docs/cleversite.md.
 *
 * Scoring model: the public "Website Optimization Score" is the average of
 * four operational-maturity dimensions (analytics, ownership, velocity,
 * testing). Buy-in and urgency are deliberately excluded from that score -
 * they measure purchase readiness, not maturity, and feed leadPriority
 * instead (internal-only, see scoring.ts).
 */

const goalOptions: AssessmentOption[] = [
  { label: "More Traffic", personalizationLabel: "traffic" },
  { label: "Higher Conversions", personalizationLabel: "conversions" },
  { label: "SEO/AEO Visibility", personalizationLabel: "visibility" },
  { label: "Technical Maintenance", personalizationLabel: "technical maintenance" },
];

const obstacleOptions: AssessmentOption[] = [
  { label: "No internal expertise", personalizationLabel: "the lack of in-house expertise" },
  { label: "No time to prioritize it", personalizationLabel: "it never being the priority" },
  { label: "Tried before, didn't work", personalizationLabel: "a past attempt fizzling out" },
  { label: "Budget not approved", personalizationLabel: "budget never getting approved" },
];

const questions: AssessmentQuestion[] = [
  {
    id: "goal",
    kind: "context",
    prompt: "What's the biggest factor you want to improve on your site?",
    options: goalOptions,
  },
  {
    id: "analytics",
    kind: "scored",
    dimension: "analytics",
    prompt: "How comprehensive are your site's analytics?",
    options: [
      { label: "Doesn't exist", value: 1 },
      { label: "Basic analytics", value: 2 },
      { label: "Advanced events & conversions", value: 3 },
      { label: "Comprehensive data & attribution", value: 4 },
    ],
  },
  {
    id: "obstacle",
    kind: "context",
    prompt: (answers) =>
      `What's the main obstacle to improving ${goalOptions[answers.goal]?.personalizationLabel ?? "that"}?`,
    options: obstacleOptions,
  },
  {
    id: "ownership",
    kind: "scored",
    dimension: "ownership",
    prompt: "Who currently manages the site's performance?",
    options: [
      { label: "No one specifically", value: 1 },
      { label: "Agency/freelancer we don't direct", value: 2 },
      { label: "Someone internal, part-time", value: 3 },
      { label: "Dedicated internal owner or team", value: 4 },
    ],
  },
  {
    id: "velocity",
    kind: "scored",
    dimension: "velocity",
    prompt: "How often is new work actually shipped to the site?",
    options: [
      { label: "Rarely or never", value: 1 },
      { label: "A few times a year", value: 2 },
      { label: "Monthly", value: 3 },
      { label: "Continuously", value: 4 },
    ],
  },
  {
    id: "testing",
    kind: "scored",
    dimension: "testing",
    prompt:
      "Have you ever run a structured before/after test on the site - not just a change, but a measured comparison?",
    options: [
      { label: "No, we just change things and hope", value: 1 },
      { label: "Tried, couldn't tell if it worked", value: 2 },
      { label: "Run a few tests with real data", value: 3 },
      { label: "Testing is standard, ongoing", value: 4 },
    ],
  },
  {
    id: "buyIn",
    kind: "scored",
    dimension: "buyIn",
    prompt: "If a system existed that fixed this automatically, what's actually true?",
    options: [
      { label: "No one owns that decision", value: 1 },
      { label: "We'd need buy-in first", value: 2 },
      { label: "We could greenlight it ourselves quickly", value: 3 },
      { label: "We're actively evaluating solutions now", value: 4 },
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

export const cleversiteConfig: AssessmentConfig = {
  id: "cleversite",
  title: "Website Optimization Assessment",
  intro: {
    eyebrow: "Website Optimization Assessment - 2 minutes",
    headline: "What's actually stopping your website from optimizing itself?",
    lead: "Answer 8 quick questions about how your site is run today. You'll get a real diagnostic score across four dimensions, plus exactly what's holding it back - not a generic quiz.",
    ctaLabel: "Start the assessment ->",
    reassurance: "Takes about 2 minutes. Results are instant, and we'll email you a copy.",
  },
  resultLabel: "Your website optimization score",
  questions,
  maturityDimensionKeys: ["analytics", "ownership", "velocity", "testing"],
  goalQuestionId: "goal",
  obstacleQuestionId: "obstacle",
  buyInQuestionId: "buyIn",
  urgencyQuestionId: "urgency",
  tiers: [
    {
      key: "foundational",
      label: "Foundational",
      minScore: 0,
      headline: "Foundational - the site runs on manual effort and guesswork",
      summary:
        "Right now, most of what happens on your site is invisible or undocumented, so progress depends on whoever happens to notice something is wrong.",
    },
    {
      key: "reactive",
      label: "Reactive",
      minScore: 25,
      headline: "Reactive - you fix things after they break, not before",
      summary:
        "You have some structure in place, but work mostly happens when something forces it, which keeps you a step behind instead of ahead.",
    },
    {
      key: "structured",
      label: "Structured",
      minScore: 50,
      headline: "Structured - the fundamentals are in place, but a person still drives every change",
      summary:
        "You have ownership and a shipping cadence, which most sites never reach. What's missing is a feedback loop that turns data into action without waiting on someone's bandwidth.",
    },
    {
      key: "optimized",
      label: "Optimized",
      minScore: 75,
      headline: "Optimized - most sites don't get this far",
      summary:
        "Your process is more disciplined than the vast majority of sites we see. The remaining gap isn't process, it's speed - a human-run test cycle can only run so many experiments a month.",
    },
  ],
  weakestDimensionCopy: {
    analytics: (goal, obstacle) =>
      `You're trying to improve ${goal} without the attribution data to prove what's actually moving it - every change is a guess dressed up as a decision, which is part of why ${obstacle} keeps winning.`,
    ownership: (goal, obstacle) =>
      `No one owns the site day to day, and that's exactly why ${obstacle} keeps winning on ${goal} - there's no one accountable for pushing past it.`,
    velocity: (goal, obstacle) =>
      `The site ships rarely enough that even a good idea for ${goal} sits in a backlog until it's no longer relevant, which leaves plenty of room for ${obstacle} to stall it further.`,
    testing: (goal, obstacle) =>
      `Changes ship on instinct, not evidence, so you can't tell whether anything you've tried for ${goal} actually worked - and without that proof, ${obstacle} is an easy excuse to stop trying.`,
  },
  ctaByUrgency: [
    "No rush - here's a short breakdown of what CleverSite automates first, worth a read whenever this comes back around.",
    "Since this is on your radar, we'll send over a short case study relevant to where you are today.",
    "With a target on the calendar, the fastest next step is a 20-minute walkthrough of what CleverSite would touch first on your site.",
    "Given the timeline, let's skip the deck - grab 20 minutes this week and we'll map exactly what CleverSite would fix first.",
  ],
  dimensionInsights: {
    analytics: (score) =>
      [
        "There's no meaningful data trail - you're flying blind on what's actually working.",
        "Basic tracking exists, but it can't tell you why something worked, only that it happened.",
        "You can see event-level behavior, which most sites can't - the gap is tying it to revenue.",
        "Full attribution is in place - the ceiling here isn't data, it's how fast you act on it.",
      ][scoreBandIndex(score)],
    ownership: (score) =>
      [
        "No one is accountable for this day to day, so nothing changes until someone happens to notice.",
        "An outside agency touches the site, but no one in-house is actually steering it.",
        "Someone owns this part-time, which beats most sites - but it's competing with everything else on their plate.",
        "A dedicated owner exists - the constraint now is their bandwidth, not their mandate.",
      ][scoreBandIndex(score)],
    velocity: (score) =>
      [
        "The site barely changes, so even a good decision takes months to reach a visitor.",
        "A few updates land each year - most opportunities go stale before anyone gets to them.",
        "Monthly shipping is a real cadence - fast enough to compound, if the ideas keep coming.",
        "Continuous shipping is rare and valuable - the limiter now is deciding what's worth shipping.",
      ][scoreBandIndex(score)],
    testing: (score) =>
      [
        "Every change is a guess - there's no way to tell what actually moved the number.",
        "Tests have been tried, but without a way to read the results, they didn't change anything.",
        "Real tests with real data are running - most of the upside left is in running more of them.",
        "Testing is standard practice - the next gain is speed, not rigor.",
      ][scoreBandIndex(score)],
  },
  dimensionRecommendations: {
    analytics: "Wire up conversion and event tracking before anything else - you can't optimize what you can't see.",
    ownership: "Name one person, internal or not, who's accountable for this site's performance, not just its uptime.",
    velocity: "Set a fixed release cadence, even monthly, so improvements don't wait for a spare afternoon.",
    testing: "Run one structured before/after test on your highest-traffic page before changing anything else.",
  },
};
