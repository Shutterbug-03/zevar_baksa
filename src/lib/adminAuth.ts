import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * Shared guard for ADMIN-ONLY routes. The secret lives in env ADMIN_API_SECRET and
 * is sent as the `x-admin-secret` header. Fails closed: 503 if the secret isn't
 * configured, 401 if it doesn't match. Returns a response to send, or null if allowed.
 */
export function checkAdmin(req: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Admin API not configured" }, { status: 503 });
  }
  const given = Buffer.from(req.headers.get("x-admin-secret") ?? "");
  const expected = Buffer.from(secret);
  // timingSafeEqual throws on length mismatch, so reject that case first.
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
