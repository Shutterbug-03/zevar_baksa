import { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zevarbaksa.com";

  // Static routes
  const routes = ["", "/shop", "/about", "/contact", "/wishlist"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  // Collection routes
  const collections = Array.from(new Set(products.map((p) => p.collection).filter(Boolean)));
  const collectionRoutes = collections.map((collection) => ({
    url: `${baseUrl}/collection/${encodeURIComponent(collection!)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...collectionRoutes];
}
