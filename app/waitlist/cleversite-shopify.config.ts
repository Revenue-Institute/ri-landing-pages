import type { WaitlistConfig } from "./types";

/**
 * Shopify-specific variant of the CleverSite waitlist. Same StoryBrand
 * structure and intent as cleversite.config.ts - only the copy is narrowed
 * to Shopify merchants. Keeps `id: "cleversite"` so the form, API route,
 * emails, and scheduling flow are shared; the submitted page URL identifies
 * which variant a lead came from.
 */
export const cleversiteShopifyWaitlistConfig: WaitlistConfig = {
  id: "cleversite",
  variant: "shopify",
  productName: "CleverSite",
  eyebrow: "Early-Access Waitlist for Shopify",
  headline: "Make your Shopify store self-aware.",
  headlineHighlight: "self-aware",
  subhead:
    "CleverSite is dedicated to optimizing Shopify sites. It plugs into your existing store, analyzes performance, then creates tests and improvements with your approval.",
  videoUrl:
    "https://mwnumpcaereujcuwczjr.supabase.co/storage/v1/object/public/marketing/Runway_timeline_export_1945fc99-1292-421d-aff4-b6e3f72afd2b.mp4",
  problem: {
    headline: "In the age of AI, your Shopify store should optimize itself.",
    headlineHighlight: "optimize itself",
    external:
      "You already have store data across Shopify, Google, and your marketing tools. You see opportunities to lift traffic, add-to-cart rate, and checkout completion, but only after spending hours sifting through data and planning changes.",
    internal:
      "Your ecommerce team deserves a faster path to better SEO, more engagement, and higher conversion in real-time, not weeks later. No more waiting on the next dev sprint or wrangling 12 team members",
  },
  plan: [
    { step: "Connect your store", desc: "CleverSite maps your products, collections, search visibility, shopper behavior, and checkout paths." },
    { step: "Find the highest-value opportunities", desc: "AI surfaces what is costing you traffic, engagement, and sales; experienced people pressure-test the recommendation." },
    { step: "A/B, measure, and repeat", desc: "AI implements approved tests, measures the impact, and uses what it learns for the next round." },
  ],
  guideLine:
    "Built by the team creating self-learning sites for industry-leaders. Now, that team is using CleverSite to bring that same capability to every Shopify merchant.",
  failureLine: "Without a better system, the opportunities stay in the analytics report and your store keeps underperforming until the next redesign project.",
  failureLineHighlight: "opportunities stay in the analytics report",
  reassurance: "For teams responsible for an existing Shopify store. One launch email - no spam or sales sequence.",
};
