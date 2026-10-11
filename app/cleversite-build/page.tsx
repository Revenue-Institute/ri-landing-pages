import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { cleversiteBuildWaitlistConfig } from "@/app/waitlist/cleversite-build.config";

export const metadata: Metadata = {
  metadataBase: new URL("https://start.revenueinstitute.com"),
  title: "CleverSite | Your Self-Optimizing Website",
  description:
    "Join the CleverSite early-access list. A new site that maps your search visibility, visitor behavior, and conversion paths from day one - then finds, tests, and ships improvements in real time, with your approval.",
  openGraph: {
    title: "CleverSite | Your Self-Learning Website.",
    description:
      "Your next website should optimize itself. A new site that maps your search visibility, visitor behavior, and conversion paths from day one - then improves them in real time, with your approval.",
    siteName: "CleverSite",
    type: "website",
    url: "/cleversite-build",
  },
  twitter: {
    card: "summary_large_image",
    title: "CleverSite | Your Website, Built to Learn",
    description:
      "Your website, built to learn. Join the early-access list.",
  },
};

export default function CleverSiteBuildPage() {
  return <WaitlistPage config={cleversiteBuildWaitlistConfig} />;
}
