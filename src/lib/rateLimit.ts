/**
 * In-memory sliding-window rate limiter.
 *
 * Usage in API routes:
 *   const result = rateLimit(req, { limit: 5, windowMs: 60_000 });
 *   if (!result.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 *
 * Notes:
 * - Keyed by IP address extracted from request headers.
 * - The Map is module-level so it persists across requests within the same
 *   serverless function instance. On Vercel this is per-instance, giving
 *   practical protection without requiring Redis.
 * - Timestamps older than `windowMs` are pruned on each check.
 */

import { NextRequest } from "next/server";

// Map<ip, timestamp[]>
const requestLog = new Map<string, number[]>();

type RateLimitOptions = {
  /** Maximum requests allowed within the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  /** How many requests remain in the current window */
  remaining: number;
  /** Unix ms timestamp when the oldest request in the window expires */
  resetAt: number;
};

/**
 * Extract the caller's IP from Next.js request headers.
 * Works on Vercel (x-forwarded-for) and local dev (localhost).
 */
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  const { limit, windowMs } = options;
  const ip = getIp(req);
  const now = Date.now();
  const windowStart = now - windowMs;

  // Get existing timestamps for this IP and prune expired ones
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (ts) => ts > windowStart
  );

  const allowed = timestamps.length < limit;

  if (allowed) {
    timestamps.push(now);
  }

  requestLog.set(ip, timestamps);

  // Oldest timestamp in window — when the first slot frees up
  const oldest = timestamps[0] ?? now;
  const resetAt = oldest + windowMs;

  return {
    allowed,
    remaining: Math.max(0, limit - timestamps.length),
    resetAt,
  };
}
