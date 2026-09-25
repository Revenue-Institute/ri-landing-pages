import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteWaitlistConfig } from "@/app/waitlist/cleversite.config";

export const metadata: Metadata = {
  title: "CleverSite | Turn Websites Into Self-Learning Conversion Machines",
  description: "Join the CleverSite early-access list. AI and growth specialists improve your existing site's SEO/AEO, engagement, and conversion paths - with your approval.",
  openGraph: {
    title: "CleverSite | Self-Learning Websites",
    description: "CleverSite turns your current website into a self-optimizing genius. It improves its own SEO/AEO, engagement, and conversion paths - with your approval.",
  },
};

export default function CleverSiteWaitlistPage() {
  return <WaitlistPage config={cleversiteWaitlistConfig} />;
}
