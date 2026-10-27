import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

async function runTest() {
  console.log("=== Testing Zevar Baksa Busy ERP Integration ===");
  console.log("BUSY_API_URL:", process.env.BUSY_API_URL);
  console.log("BUSY_COMPANY_CODE:", process.env.BUSY_COMPANY_CODE);
  console.log("BUSY_USER:", process.env.BUSY_USER);

  const { isBusyConfigured, getBusyItems, mapBusyToProduct, getBusyStockLevels } = await import("../src/lib/busy");

  console.log("isBusyConfigured():", isBusyConfigured());

  console.log("\n1. Fetching Stock Levels...");
  const stock = await getBusyStockLevels();
  console.log(`Fetched ${stock.length} stock records:`);
  stock.slice(0, 5).forEach((s) => {
    console.log(` - [${s.itemCode}] ${s.name}: Stock = ${s.qtyInStock}`);
  });

  console.log("\n2. Fetching & Mapping Items...");
  const items = await getBusyItems();
  console.log(`Fetched ${items.length} items from Busy ERP.`);

  const mappedProducts = items.map(mapBusyToProduct);
  console.log(`\nSuccessfully mapped ${mappedProducts.length} products to store catalog:`);

  mappedProducts.slice(0, 5).forEach((p) => {
    console.log(`\n✨ Product: "${p.name}" (${p.id})`);
    console.log(`   Subtitle: ${p.subtitle}`);
    console.log(`   Price: ₹${p.price.toLocaleString("en-IN")}`);
    console.log(`   Status: ${p.status}`);
    console.log(`   Image: ${p.image}`);
    console.log(`   Weight: ${p.specs.weight ?? "N/A"}`);
    console.log(`   Category: ${p.category} | Collection: ${p.collection}`);
  });

  console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
