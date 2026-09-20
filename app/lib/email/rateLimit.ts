/**
 * Per-IP in-memory rate limiter. Resets on deploy and is per-instance,
 * which is the right trade for a single landing page - move to a shared
 * store if this scales out. Each route calling createRateLimiter gets its
 * own independent bucket, so one endpoint being hammered doesn't burn the
 * allowance for another.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > limit;
  };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
