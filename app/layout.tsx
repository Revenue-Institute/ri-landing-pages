import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import { jsonLd } from "./data";
import "./globals.css";

const GTM_ID = "GTM-N9DKBL2";

/* Display (headings, UI, all numbers) and Body (paragraphs, leads, quotes)
   per docs/brand.md section 3 - loaded site-wide since the full rebrand,
   not just the assessment pages. */
const grotesk = Schibsted_Grotesk({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const serif = Source_Serif_4({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revenue Institute | AI Process Automation for Professional Services",
  description:
    "We evaluate, build, and operate the systems a professional services firm runs on. Live in 45 days, priced against the hire you'd otherwise make.",
  openGraph: {
    title: "Revenue Institute | AI Process Automation for Professional Services",
    description:
      "We evaluate, build, and operate the systems a professional services firm runs on. Live in 45 days.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * No manual <head> element here. Declaring one takes over from the App
     * Router's metadata injection, which pushed <title>, the meta description
     * and every og: tag into <body> where crawlers ignore them.
     */
    <html lang="en" className={`${grotesk.variable} ${serif.variable}`}>
      <body>
        {/* Site-wide identity mark, docs/brand.md section 6 item 1 - on
            every page, not re-rendered per route. */}
        <div className="ri-topbar" aria-hidden="true" />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      </body>
    </html>
  );
}
