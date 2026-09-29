import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteWaitlistConfig } from "@/app/waitlist/cleversite.config";

export const metadata: Metadata = {
  metadataBase: new URL("https://start.revenueinstitute.com"),
  title: "CleverSite | Make Your Website Self-Aware",
  description:
    "Join the CleverSite early-access list. It plugs into your existing site, finds SEO/AEO, engagement, and conversion opportunities, and runs the tests with your approval.",
  openGraph: {
    title: "CleverSite | Make Your Website Self-Aware",
    description:
      "Your website should optimize itself. CleverSite finds the highest-value SEO/AEO, engagement, and conversion improvements and tests them - with your approval.",
    siteName: "CleverSite",
    type: "website",
    url: "/cleversite-waitlist",
  },
  twitter: {
    card: "summary_large_image",
    title: "CleverSite | Make Your Website Self-Aware",
    description:
      "Your website should optimize itself. Join the early-access list.",
  },
};

export default function CleverSiteWaitlistPage() {
  return <WaitlistPage config={cleversiteWaitlistConfig} />;
}
