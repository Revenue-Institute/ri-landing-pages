import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteWaitlistConfig } from "@/app/waitlist/cleversite.config";

export const metadata: Metadata = {
  title: "CleverSite | Turn Website Into a Self-Learning Conversion Machine",
  description: "Join the CleverSite early-access list. AI and growth specialists improve your existing site's SEO/AEO, engagement, and conversion paths - with your approval.",
  openGraph: {
    title: "CleverSite | Self-Learning Website",
    description: "CleverSite turns your current website into a self-optimizing genius. It improves it's own SEO/AEO, engagement, and conversion paths - with your approval.",
  },
};

export default function CleverSiteWaitlistPage() {
  return <WaitlistPage config={cleversiteWaitlistConfig} />;
}
