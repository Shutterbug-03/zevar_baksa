import type { Metadata } from "next";

// A visitor's own saved pieces: nothing for search engines to index.
export const metadata: Metadata = {
  title: "Your Wishlist",
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
