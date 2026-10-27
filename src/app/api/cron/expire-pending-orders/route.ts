/**
 * GET /api/cron/expire-pending-orders
 *
 * Daily Vercel Cron (see vercel.json). Every opened checkout leaves a status='pending'
 * row; those whose Razorpay modal was dismissed never complete. This marks pending
 * orders older than 24h as 'failed' so they stop looking like live orders.
 *
 * Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` when the CRON_SECRET
 * env var is set. Fails closed (503) if it is not configured, 401 on mismatch.
 * The update is conditional on status still being 'pending', so an order paid in the
 * meantime (webhook/verify-payment) is never overwritten.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

const EXPIRE_AFTER_MS = 24 * 60 * 60_000;

/** Constant-time compare; hashing first makes both buffers the same length. */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("[cron/expire-pending-orders] CRON_SECRET is not set — refusing to run");
    return NextResponse.json({ error: "Cron not configured" }, { status: 503 });
  }
  if (!safeEqual(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - EXPIRE_AFTER_MS).toISOString();
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status: "failed" })
    .eq("status", "pending")
    .lt("created_at", cutoff)
    .select("id");

  if (error) {
    console.error("[cron/expire-pending-orders] Supabase error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ expired: data?.length ?? 0 });
}
