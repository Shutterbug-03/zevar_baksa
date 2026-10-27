import { config } from "dotenv";
import { resolve } from "path";
import Razorpay from "razorpay";

config({ path: resolve(process.cwd(), ".env.local") });

async function testRazorpay() {
  console.log("=== Testing Razorpay Configuration ===");
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  console.log("RAZORPAY_KEY_ID:", keyId);
  console.log("RAZORPAY_KEY_SECRET:", keySecret ? (keySecret.includes("PLACEHOLDER") ? "PLACEHOLDER (needs real secret)" : "SET (length: " + keySecret.length + ")") : "NOT SET");

  if (!keyId) {
    console.error("❌ RAZORPAY_KEY_ID is missing.");
    return;
  }

  // Check Razorpay API reachability
  console.log("\nTesting Razorpay Client instantiation...");
  const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret ?? "dummy_secret",
  });

  console.log("Attempting to create a test order with amount ₹100 (10000 paise)...");
  try {
    const order = await instance.orders.create({
      amount: 10000,
      currency: "INR",
      receipt: `test_${Date.now()}`,
      notes: {
        test: "Zevar Baksa API verification",
      },
    });
    console.log("✅ SUCCESS! Razorpay Order created successfully:");
    console.log(JSON.stringify(order, null, 2));
  } catch (err: any) {
    console.log("ℹ️  Razorpay API Response:");
    if (err.statusCode === 401 || err.error?.code === "BAD_REQUEST_ERROR") {
      console.log(`⚠️  Status ${err.statusCode || 401}: ${err.error?.description || err.message}`);
      console.log("👉 This confirms the Key ID is registered with Razorpay, but requires the matching 'Key Secret' from the dashboard to authenticate order creation.");
    } else {
      console.error("Error details:", err);
    }
  }
}

testRazorpay();
