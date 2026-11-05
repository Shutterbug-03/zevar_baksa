import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Zevar Baksa in Jaipur: B-21, Bhan Nagar, Queens Road, Vaishali Nagar, Jaipur 302021. Call or WhatsApp +91 92160 48928 for orders, sizing and care.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us | Zevar Baksa", url: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
