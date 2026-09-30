import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteShopifyWaitlistConfig } from "@/app/waitlist/cleversite-shopify.config";

const TITLE = "CleverSite for Shopify | Make Your Store Self-Aware";

export const metadata: Metadata = {
  metadataBase: new URL("https://start.revenueinstitute.com"),
  title: TITLE,
  description:
    "Join the CleverSite early-access list for Shopify. It plugs into your existing store, finds SEO/AEO, engagement, and conversion opportunities, and runs the tests with your approval.",
  openGraph: {
    title: TITLE,
    description:
      "Your Shopify store should optimize itself. CleverSite finds the highest-value SEO/AEO, engagement, and conversion improvements and tests them - with your approval.",
    siteName: "CleverSite",
    type: "website",
    url: "/cleversite-shopify-waitlist",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Your Shopify store should optimize itself. Join the early-access list.",
  },
};

export default function CleverSiteShopifyWaitlistPage() {
  return <WaitlistPage config={cleversiteShopifyWaitlistConfig} />;
}
