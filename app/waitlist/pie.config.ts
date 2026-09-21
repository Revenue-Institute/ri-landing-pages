import type { WaitlistConfig } from "./types";

/**
 * StoryBrand (SB7) messaging - character is the operations leader/COO,
 * villain is a process that lives in one person's head, guide is Revenue
 * Institute (empathy + the real Karbon proof point already established
 * elsewhere on the site).
 */
export const pieWaitlistConfig: WaitlistConfig = {
  id: "pie",
  productName: "PIE",
  eyebrow: "PIE - coming soon",
  headline: "Stop being the only person who knows how this works.",
  headlineHighlight: "how this works",
  subhead:
    "Talk through a process out loud and PIE maps it in real time as you speak - asking questions, flagging the bottleneck, and turning it into documentation the whole team can use.",
  problem: {
    headline: "One person's memory is not a system.",
    external:
      "The process breaks the moment the one person who knows it best is out. Nobody else has the full picture.",
    internal:
      "You can't take a real day off, because you're the fallback for everything that goes sideways.",
  },
  plan: [
    { step: "Say the process out loud", desc: "No whiteboard, no template - just describe it. PIE draws the map as you talk." },
    { step: "PIE asks what's missing", desc: "It flags the gaps in real time and pinpoints exactly where the bottleneck is." },
    { step: "Documentation goes out instantly", desc: "Add anything you've already got on file, then send the finished map to anyone on the team - faster than writing it up yourself." },
  ],
  guideLine:
    "We've seen firms hit a ceiling because one person was the whole system. Revenue Institute's work already returned 136 hours a week to the team at Karbon - PIE brings that same discipline to the process that's costing you the most.",
  successLine: "Imagine a process that runs exactly the same on the day you're out as the day you're not.",
  failureLine: "Without it, the next time your key person is out is the next fire drill.",
  reassurance: "One email when we launch. No spam, no sales sequence.",
};
