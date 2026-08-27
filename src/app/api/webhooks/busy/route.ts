import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const authHeader =
      req.headers.get("x-busy-webhook-secret") ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    const expectedSecret = process.env.BUSY_WEBHOOK_SECRET;

    if (expectedSecret && authHeader !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized webhook caller" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("[Webhook BUSY] Received inventory/order event payload:", body);

    // Revalidate product listing and shop page caches for updated stock/pricing
    revalidatePath("/shop");
    revalidatePath("/product/[id]", "page");

    return NextResponse.json({
      received: true,
      provider: "BUSY Software (busy.in)",
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
