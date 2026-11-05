import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics, getGaId } from "@/components/GoogleAnalytics";
import { CookieConsent } from "@/components/CookieConsent";
import { CloudSync } from "@/components/CloudSync";
import { LuxuryLoadingScreen } from "@/components/LuxuryLoadingScreen";
import { Suspense } from "react";
import { JsonLd, SITE_URL, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/siteConfig";

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

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zevar Baksa — Handcrafted Heirloom Jewellery",
    template: "%s | Zevar Baksa",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Zevar Baksa — Handcrafted Heirloom Jewellery",
    description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  // No site-wide canonical: each page sets its own. A canonical here is inherited by every
  // page without one and tells crawlers that page is a copy of the homepage.
};

// Brand entity for AI systems and search engines. "Zevar Baksa" in full, with its address and
// profiles, keeps it distinct from other jewellers named "Zevar".
const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": `${SITE_URL}/#organization`,
      name: "Zevar Baksa",
      alternateName: "ZevarBaksa",
      legalName: "ZevarBaksa LLP",
      description: SITE_DESCRIPTION,
      slogan: "A little box of memories, worn close to the heart.",
      url: SITE_URL,
      logo: absoluteUrl("/icon.png"),
      image: absoluteUrl("/og-image.jpg"),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      priceRange: "From ₹9,000",
      currenciesAccepted: "INR",
      paymentAccepted: "UPI, Credit Card, Debit Card, Net Banking",
      address: {
        "@type": "PostalAddress",
        streetAddress: "B-21, Bhan Nagar, Queens Road, Vaishali Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302021",
        addressCountry: "IN",
      },
      areaServed: "IN",
      knowsAbout: ["Meenakari enamel jewellery", "925 sterling silver jewellery", "Kundan setting", "Jaipur jewellery craft"],
      sameAs: ["https://www.instagram.com/zevarbaksa"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Zevar Baksa",
      url: SITE_URL,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <JsonLd data={organizationLd} />
        <ClerkProvider>
          {children}
          <Suspense fallback={null}>
            <LuxuryLoadingScreen />
          </Suspense>
          <CloudSync />
          {getGaId() && <CookieConsent />}
        </ClerkProvider>
      </body>
    </html>
  );
}
