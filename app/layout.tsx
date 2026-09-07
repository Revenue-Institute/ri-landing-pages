import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { jsonLd } from "./data";
import "./globals.css";

const GTM_ID = "GTM-N9DKBL2";

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext", "cyrillic", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

const grotesk = Schibsted_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revenue Institute — AI Process Automation for Professional Services",
  description:
    "We evaluate, build, and operate the systems a professional services firm runs on. Live in 45 days, priced against the hire you'd otherwise make.",
  openGraph: {
    title: "Revenue Institute — AI Process Automation for Professional Services",
    description:
      "We evaluate, build, and operate the systems a professional services firm runs on. Live in 45 days.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${grotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
