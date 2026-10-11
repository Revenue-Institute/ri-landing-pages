import type { WaitlistConfig } from "./types";

/**
 * Same product and lead pipeline as cleversite.config.ts - the pitch moves
 * from "plugs into your existing site" (a product) to a new, self-learning
 * site (a productized service, kept subtle: the page sells the outcome,
 * not our process). Keeps id "cleversite" so the form, mockups, and
 * /api/cleversite-waitlist route are reused; the page URL sent with each
 * lead is what tells the two pages apart. Built for cold Meta traffic, so
 * it carries benefits, proof, and FAQ sections the plug-in page doesn't.
 */
export const cleversiteBuildWaitlistConfig: WaitlistConfig = {
  id: "cleversite",
  formName: "CleverSite Build",
  productName: "CleverSite",
  eyebrow: "Self-learning AI Websites",
  headline: "Your Website Should Optimize Itself.",
  headlineHighlight: "Optimize Itself",
  subhead:
    "A CleverSite site maps your search visibility, visitor behavior, and conversion paths from day one - then finds, tests, and ships improvements in real time, with your approval.",
  videoUrl:
    "https://mwnumpcaereujcuwczjr.supabase.co/storage/v1/object/public/marketing/service_video.mp4",
  problem: {
    headline: "In the age of AI, a website should learn and improve itself.",
    headlineHighlight: "learn and improve itself",
    external:
      "Your site's ability to attract leads and conver is the lifeblood of your business. Optimizing for SEO and conversions shouldn't take weeks-long sprints, guessing, or analyzing mountains of data.",
    internal:
      "Your next website should get better every week - more traffic, more engagement, more leads - all based on data and science, not guesswork.",
  },
  plan: [
    { step: "Launch a site built to learn", desc: "Structured for SEO, AEO, and conversion from day one, and already wired to measure what matters." },
    { step: "It learns immediately", desc: "AI maps your content, search visibility, visitor behavior, and conversion paths; it plans A/B tests for your approval." },
    { step: "Your site evolves week over week", desc: "AI implements approved changes, measures the impact, and uses what it learns for the next round." },
  ],
  benefits: [
    { title: "SEO & AEO visibility", desc: "Structured for search and answer engines, and tuned as both change." },
    { title: "Engagement that compounds", desc: "Headlines, offers, and layout tested against how visitors actually behave." },
    { title: "Conversions in real time", desc: "Forms, CTAs, and paths improved weekly - not at the next redesign." },
    { title: "No dev queue", desc: "Approved changes ship to the live site automatically, measured as they land." },
  ],
  proof: {
    stat: "+326%",
    statLabel: "Lead growth in 4 months, with paid spend down.",
    source: "Berry Law · 2025",
    quote: "Revenue Institute was able to slash time spent by sales, marketing, and IT. They moved us to a privacy-compliant AI system that grew our leads by 326% in 4 months.",
    quoteName: "Joe DeMike",
    quoteRole: "Chief Marketing Officer at Berry Law",
    quoteLogo: { src: "/logos/berry-law.png", w: 109, h: 26 },
  },
  faq: [
    { q: "Is this a template?", a: "No. Each site is designed and built for your business - then it keeps adjusting itself as it learns what works." },
    { q: "How is this different than a site builder?", a: "Site builders like WordPress and Webflow let you build sites by hand. CleverSite uses AI to optimize your site automatically." },
    { q: "What does it cost?", a: "Pricing depends on scope. You'll get the details with your launch email, before any commitment." },
    { q: "Does it replace my team?", a: "No. Your team approves the meaningful changes; the site handles the rest." },
    { q: "How is this different from a typical agency build?", a: "A typical site is finished the day it launches. A CleverSite site starts improving the day it launches - and doesn't stop." },
  ],
  guideLine:
    "Built by the team creating self-learning sites for industry-leaders. Now, that team is building them for you.",
  failureLine: "Without a site that learns, the opportunities stay in the analytics report and your new website starts underperforming the day it launches.",
  failureLineHighlight: "opportunities stay in the analytics report",
  reassurance: "For teams planning a new website or a full rebuild. One launch email - no spam or sales sequence.",
  ctaLabel: "Request a build slot",
};
