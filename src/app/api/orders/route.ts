import { NextRequest, NextResponse } from "next/server";
import { isBusyConfigured, createSalesOrder, getBusySalesOrders } from "@/lib/busy";

export async function POST(req: NextRequest) {
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

    return NextResponse.json({
      success: true,
      source: isBusyConfigured() ? "busy" : "placeholder",
      busyVoucherNo,
    });
  } catch (error) {
    console.error("[API /api/orders] BUSY order sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to sync order to BUSY" },
      { status: 500 }
    );
  }
}

export async function GET() {
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
