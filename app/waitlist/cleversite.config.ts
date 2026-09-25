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
  eyebrow: "Early-Access Waitlist",
  headline: "Make your website self-aware.",
  headlineHighlight: "self-aware",
  subhead:
    "CleverSite plugs into your existing site, analyzes performance, then creates tests and improvements with your approval.",
  problem: {
    headline: "In the age of AI, your website should optimize itself.",
    headlineHighlight: "optimize itself",
    external:
      "You already have the website data across your Google and marketing tools. You see opportunities for improvement, but only after spending hours sifting through data and planning changes.",
    internal:
      "Your marketing team deserves a faster path to better SEO, more engagement, and increased conversions in real-time, not weeks later. No more waiting on the next dev sprint or wrangling 12 team members",
  },
  plan: [
    { step: "Connect your site", desc: "CleverSite maps your content, search visibility, visitor behavior, and conversion paths." },
    { step: "Find the highest-value opportunities", desc: "AI surfaces what is costing you traffic, engagement, and leads; experienced people pressure-test the recommendation." },
    { step: "A/B, measure, and repeat", desc: "AI implements approved tests, measures the impact, and uses what it learns for the next round." },
  ],
  guideLine:
    "Built by the team creating self-learning sites for industry-leaders. Now, that team is using CleverSite to bring that same capability to every marketer.",
  failureLine: "Without a better system, the opportunities stay in the analytics report and the site keeps underperforming until the next redesign project.",
  failureLineHighlight: "opportunities stay in the analytics report",
  reassurance: "For teams responsible for an existing website. One launch email - no spam or sales sequence.",
};
