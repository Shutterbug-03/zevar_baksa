import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      deprecated: true,
      message: "Odoo webhook is deprecated. The ERP backend has migrated to BUSY Software. Please configure webhooks to /api/webhooks/busy.",
    },
    { status: 200 }
  );
}
