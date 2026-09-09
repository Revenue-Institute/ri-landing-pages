import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  /*
   * This route reads searchParams, so it renders dynamically and Next streams
   * its metadata, which lands <title> and the meta/og tags in <body> instead
   * of <head>. Next only makes metadata blocking for user agents matching
   * this pattern, and the default misses plain "Googlebot". This page's
   * metadata is a static object with no async work, so making it blocking for
   * every request costs nothing measurable and guarantees the tags are in
   * <head> in the raw HTML for every crawler, preview bot, and auditor.
   */
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /*
           * A GTM tag loads http://js.hs-scripts.com/44425771.js over plain
           * HTTP. On an HTTPS origin the browser blocks that as mixed content
           * and HubSpot tracking silently dies. This rewrites such subresource
           * requests to HTTPS instead of dropping them. The tag itself should
           * still be corrected inside the GTM container.
           */
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
