import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Meenakari Silver Jewellery",
  description:
    "Shop handcrafted 925 sterling silver pendants, earrings and necklaces with meenakari enamel and 22K kundan accents, made in Jaipur by Zevar Baksa.",
  alternates: { canonical: "/shop" },
  openGraph: { title: "Shop Meenakari Silver Jewellery | Zevar Baksa", url: "/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
