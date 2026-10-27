import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { isBusyConfigured, createSalesOrder, getBusySalesOrders } from "@/lib/busy";

/**
 * ADMIN-ONLY. Lists BUSY sale vouchers (customer PII) and creates vouchers, so it
 * requires the shared secret in env ADMIN_API_SECRET, sent as `x-admin-secret`.
 * Fails closed: 503 if the secret isn't configured, 401 if it doesn't match.
 * Nothing in the storefront calls this route.
 */
function checkAdmin(req: NextRequest): NextResponse | null {
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

export async function POST(req: NextRequest) {
  const denied = checkAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const {
      partnerEmail,
      partnerName,
      partnerPhone,
      lines,
      razorpayOrderId,
      razorpayPaymentId,
      address,
      paymentMethod,
    } = body;

    const busyVoucherNo = await createSalesOrder({
      partnerEmail: partnerEmail || "customer@example.com",
      partnerName: partnerName || "Valued Customer",
      partnerPhone: partnerPhone || "",
      lines: lines || [],
      razorpayOrderId: razorpayOrderId || `ORD_${Date.now()}`,
      razorpayPaymentId: razorpayPaymentId || `PAY_${Date.now()}`,
      address: address || {},
      paymentMethod: paymentMethod || "card",
    });

    // busyVoucherNo is null when BUSY couldn't take the order (no write endpoint yet).
    return NextResponse.json({
      success: busyVoucherNo !== null,
      source: isBusyConfigured() ? "busy" : "placeholder",
      busyVoucherNo,
      ...(busyVoucherNo === null && { note: "Not written to BUSY — enter the order manually" }),
    });
  } catch (error) {
    console.error("[API /api/orders] BUSY order sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to sync order to BUSY" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const denied = checkAdmin(req);
  if (denied) return denied;

  try {
    if (!isBusyConfigured()) {
      return NextResponse.json({
        source: "placeholder",
        orders: [],
      });
    }

    const orders = await getBusySalesOrders();
    return NextResponse.json({
      source: "busy",
      orders,
    });
  } catch (error) {
    console.error("[API /api/orders] Fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch BUSY orders" },
      { status: 500 }
    );
  }
}
