import { MetadataRoute } from "next";
import { products as staticProducts } from "@/data/products";
import { collections } from "@/data/collections";
import { getCatalog } from "@/lib/catalog";

// Regenerate hourly so new/removed BUSY products show up without a redeploy
export const revalidate = 3600;

// Bump when static page content changes; avoids claiming every URL changed "now"
const SITE_LAST_MODIFIED = "2026-10-01";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zevarbaksa.com";

  // Static routes
  const routes = ["", "/shop", "/about", "/contact", "/wishlist"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Policy pages
  const policyRoutes = ["/shipping-policy", "/exchange-policy", "/privacy-policy", "/terms-conditions"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

  // Product routes — same catalog as the storefront/checkout (BUSY when configured, else static)
  let catalogProducts = staticProducts;
  try {
    catalogProducts = [...(await getCatalog()).values()];
  } catch {
    // BUSY unreachable: fall back to the static catalog rather than failing the sitemap
  }
  const productRoutes = catalogProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  // Collection routes — /collection/[slug] resolves against collections.ts slugs
  const collectionRoutes = collections.map((collection) => ({
    url: `${baseUrl}/collection/${collection.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...policyRoutes, ...productRoutes, ...collectionRoutes];
}
