import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zevarbaksa.com"),
  title: {
    default: "Zevar Baksa — Handcrafted Heirloom Jewellery",
    template: "%s | Zevar Baksa",
  },
  description: "Zevar Baksa is a house of handcrafted heirloom jewellery — kundan, polki, and jadau pieces, made to order in India.",
  openGraph: {
    title: "Zevar Baksa — Handcrafted Heirloom Jewellery",
    description: "Zevar Baksa is a house of handcrafted heirloom jewellery — kundan, polki, and jadau pieces, made to order in India.",
    url: "/",
    siteName: "Zevar Baksa",
    images: [
      {
        url: "/og-image.jpg", // Note: Ensure you add an og-image.jpg in the public folder
        width: 1200,
        height: 630,
        alt: "Zevar Baksa - Handcrafted Heirloom Jewellery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zevar Baksa — Handcrafted Heirloom Jewellery",
    description: "Zevar Baksa is a house of handcrafted heirloom jewellery — kundan, polki, and jadau pieces, made to order in India.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <Script id="structured-data-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Zevar Baksa",
          "url": "https://zevarbaksa.com",
          "logo": "https://zevarbaksa.com/og-image.jpg",
          "sameAs": [
            "https://instagram.com/zevarbaksa"
          ]
        }) }} />
        <Script id="structured-data-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Zevar Baksa",
          "url": "https://zevarbaksa.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://zevarbaksa.com/shop?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }) }} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
