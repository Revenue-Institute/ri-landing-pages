import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteWaitlistConfig } from "@/app/waitlist/cleversite.config";

export const metadata: Metadata = {
  title: "CleverSite | Coming Soon | Revenue Institute",
  description: "Plugs into the website you already have and gets it better every day, on its own. Join the waitlist for early access to CleverSite.",
};

export default function CleverSiteWaitlistPage() {
  return <WaitlistPage config={cleversiteWaitlistConfig} />;
}
