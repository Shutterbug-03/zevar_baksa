import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

/**
 * POST /api/webhooks/busy
 *
 * Receives real-time inventory/stock events from BUSY Accounting Software.
 * Verifies the shared secret using constant-time comparison (timing-safe).
 * Revalidates product pages so the updated stock levels are served fresh.
 */

/** Constant-time string comparison — prevents timing attacks on secret comparison */
function timingSafeCompare(a: string, b: string): boolean {
  // Both must be the same length for timingSafeEqual
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const expectedSecret = process.env.BUSY_WEBHOOK_SECRET;

    // Only enforce secret validation if one is configured
    if (expectedSecret && !expectedSecret.includes("PLACEHOLDER")) {
      const incomingSecret =
        req.headers.get("x-busy-webhook-secret") ??
        req.headers.get("authorization")?.replace("Bearer ", "") ??
        "";

      if (!timingSafeCompare(incomingSecret, expectedSecret)) {
        console.warn("[Webhook BUSY] Rejected: invalid secret from", req.headers.get("x-forwarded-for"));
        return NextResponse.json(
          { error: "Unauthorized webhook caller" },
          { status: 401 }
        );
      }
    } else {
      console.log("[Webhook BUSY] Secret not configured — accepting in placeholder mode");
    }

    const body = await req.json();

    // Determine what kind of event this is for targeted revalidation
    const eventType: string = body?.event ?? body?.type ?? "unknown";
    console.log(`[Webhook BUSY] Received event: "${eventType}"`, {
      itemCode: body?.itemCode,
      stockQty: body?.stockQty,
      timestamp: new Date().toISOString(),
    });

    // Revalidate cached product pages so updated stock/prices are served immediately
    const revalidated: string[] = [];

    revalidatePath("/shop");
    revalidated.push("/shop");

    revalidatePath("/product/[id]", "page");
    revalidated.push("/product/[id]");

    // If a specific item code is provided, revalidate just that product's page
    if (body?.itemCode) {
      revalidatePath(`/product/${body.itemCode}`);
      revalidated.push(`/product/${body.itemCode}`);
    }

    return NextResponse.json({
      received: true,
      provider: "BUSY Software (busy.in)",
      event: eventType,
      revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Webhook BUSY] Webhook processing failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook handler failed" },
      { status: 500 }
    );
  }
}
