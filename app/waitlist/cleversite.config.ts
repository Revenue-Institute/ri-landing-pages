import type { WaitlistConfig } from "./types";

/**
 * StoryBrand (SB7) messaging - see the build notes: character is the
 * marketing director, villain is the dev queue/redesign project, guide is
 * Revenue Institute (empathy + the one real proof point already
 * established elsewhere on the site - Berry Law's +326%, not a new claim).
 */
export const cleversiteWaitlistConfig: WaitlistConfig = {
  id: "cleversite",
  productName: "CleverSite",
  eyebrow: "The first self-optimizing website - coming soon",
  headline: "The first website that gets better on its own.",
  headlineHighlight: "gets better on its own",
  subhead:
    "CleverSite learns from how people actually use your site and rewrites the weak parts itself - no redesign, no dev ticket, no waiting on a sprint.",
  problem: {
    headline: "The dev queue is not a strategy.",
    external:
      "Every fix needs a ticket, a sprint, a review. By the time it ships, the traffic pattern that prompted it has already moved on.",
    internal:
      "You can see exactly what's wrong with the site. You just can't fix it fast enough - and that's the frustrating part.",
  },
  plan: [
    { step: "Connect your site", desc: "Minutes, not a project. No code, no dev ticket." },
    { step: "CleverSite learns your site", desc: "It studies real visitor behavior and finds what's actually costing you traffic and conversions." },
    { step: "It rewrites the fix itself", desc: "Small changes go live automatically, and it keeps learning from what happens next. You stay in control of anything major." },
  ],
  guideLine:
    "We've watched good marketing teams lose months to a queue they don't control. Revenue Institute built the self-learning system behind Berry Law's +326% lead growth - CleverSite brings that same discipline to your website, every day.",
  successLine: "Imagine a website that gets smarter every day, whether or not anyone on your team has time to touch it.",
  failureLine: "The alternative is the one you're living now: a website that stays exactly the same until someone finds the time to change it.",
  reassurance: "One email when we launch. No spam, no sales sequence.",
};
