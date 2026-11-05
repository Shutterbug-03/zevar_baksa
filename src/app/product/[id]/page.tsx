import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/catalog";
import type { Product } from "@/data/products";
import ProductClient from "./ProductClient";
import { JsonLd, absoluteUrl } from "@/lib/seo";

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
    const catalog = await getCatalog();
    const cleanId = decodeURIComponent(id).trim();
    const product = catalog.get(cleanId) || catalog.get(cleanId.toLowerCase());
    return { product, known: true };
  } catch {
    return { known: false };
  }
}

export async function generateStaticParams() {
  const { products } = await import("@/data/products");
  const params: { id: string }[] = [];
  for (const p of products) {
    params.push({ id: p.id });
    const slug = p.name.toLowerCase().replace(/\s+/g, "-");
    if (slug !== p.id) {
      params.push({ id: slug });
    }
  }
  return params;
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

  return (
    <>
      {product && <JsonLd data={productLd(product)} />}
      <ProductClient id={id} initialProduct={product} />
    </>
  );
}

/** Product + Offer + breadcrumbs, rendered on the server so crawlers read price and stock. */
function productLd(product: Product) {
  const url = absoluteUrl(`/product/${product.id}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.description,
        image: (product.gallery?.length ? product.gallery : [product.image]).map(absoluteUrl),
        sku: product.specs?.code?.split(" ")[0] || product.id,
        category: product.category,
        material: product.specs?.metal,
        brand: { "@type": "Brand", name: "Zevar Baksa" },
        manufacturer: { "@id": `${absoluteUrl("/")}#organization` },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "INR",
          price: product.price,
          availability:
            product.status === "Out of Stock"
              ? "https://schema.org/OutOfStock"
              : product.status === "Made to Order"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${absoluteUrl("/")}#organization` },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "INR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
          { "@type": "ListItem", position: 3, name: product.name, item: url },
        ],
      },
    ],
  };
}
