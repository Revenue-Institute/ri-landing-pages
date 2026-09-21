import type { Metadata } from "next";
import WaitlistPage from "@/app/waitlist/WaitlistPage";
import { pieWaitlistConfig } from "@/app/waitlist/pie.config";

export const metadata: Metadata = {
  title: "PIE | Coming Soon | Revenue Institute",
  description: "Stop being the only person who knows how this works. Join the waitlist for early access to PIE.",
};

export default function PieWaitlistPage() {
  return <WaitlistPage config={pieWaitlistConfig} />;
}
