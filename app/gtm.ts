declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * The assessment flow moves between real URLs via next/navigation's router,
 * which uses the History API under the hood - GTM's own History Change
 * trigger already sees these. This is a belt-and-suspenders explicit event
 * for whichever GA4/GTM setup is in place: wire a Custom Event trigger on
 * "virtualPageview" in the GTM container to fire a page_view tag from it.
 */
export function trackPageview(path: string) {
  track("virtualPageview", {
    page_path: path,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}
