import { after } from "next/server";

/**
 * Fire-and-forget forward to the n8n webhook.
 * Failures are logged but never block the response — email delivery is the
 * primary path; n8n is a secondary integration.
 *
 * Scheduled via `after()` rather than a bare unawaited fetch: on Vercel's
 * serverless runtime the function can be torn down as soon as the response
 * is sent, which silently kills an in-flight fetch that isn't registered
 * with the platform's waitUntil mechanism.
 */
export function sendToN8n(payload: Record<string, unknown>): void {
  const url = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) return;

  const body = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString(),
  });

  after(() =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": secret,
      },
      body,
    }).catch((e) => console.error("[n8n] webhook failed:", e)),
  );
}
