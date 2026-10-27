import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug } from "@/data/collections";
import CollectionClient from "./CollectionClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  const title = `${collection.name} Collection`;
  const url = `/collection/${collection.slug}`;

  return {
    title,
    description: collection.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Zevar Baksa`,
      description: collection.subtitle,
      url,
      siteName: "Zevar Baksa",
      locale: "en_IN",
      type: "website",
      images: [{ url: collection.heroImage, alt: collection.heroTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Zevar Baksa`,
      description: collection.subtitle,
      images: [collection.heroImage],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getCollectionBySlug(slug)) notFound();

  return <CollectionClient slug={slug} />;
}
