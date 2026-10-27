import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/catalog";
import type { Product } from "@/data/products";
import ProductClient from "./ProductClient";

/**
 * Server shell for the product page: resolves the product from the same catalog the
 * checkout prices against (BUSY when configured, else static) so each product gets its
 * own title/description/OG tags. The interactive UI lives in ProductClient.
 *
 * Returns undefined when the catalog is unreachable (BUSY down, no cache) — we then
 * neither 404 nor invent metadata; the client store has its own static fallback.
 */
async function findProduct(id: string): Promise<{ product?: Product; known: boolean }> {
  try {
    const product = (await getCatalog()).get(id);
    return { product, known: true };
  } catch {
    return { known: false };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { product } = await findProduct(id);
  if (!product) return {};

  const description = product.description.length > 160
    ? `${product.description.slice(0, 157).trimEnd()}...`
    : product.description;
  const url = `/product/${product.id}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | Zevar Baksa`,
      description,
      url,
      siteName: "Zevar Baksa",
      locale: "en_IN",
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Zevar Baksa`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, known } = await findProduct(id);
  if (known && !product) notFound();

  return <ProductClient id={id} initialProduct={product} />;
}
