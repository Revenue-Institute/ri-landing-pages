/**
 * Fire-and-forget forward to the n8n webhook.
 * Failures are logged but never block the response — email delivery is the
 * primary path; n8n is a secondary integration.
 */
export function sendToN8n(payload: Record<string, unknown>): void {
  const url = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) return;

  const body = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString(),
  });

  void fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": secret,
    },
    body,
  }).catch((e) => console.error("[n8n] webhook failed:", e));
}
