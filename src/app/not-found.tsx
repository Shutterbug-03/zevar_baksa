import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-6 pt-44 pb-24">
        <div className="max-w-md text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans font-semibold mb-4">
            Error 404
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#420002] mb-5">
            This piece has gone back into the box
          </h1>
          <p className="text-sm sm:text-base text-[#420002]/70 font-sans font-light leading-relaxed mb-10">
            The page you are looking for is resting in our Jaipur atelier vaults, or may never have existed.
            Let us help you find your way back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#420002] px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#fffaee] hover:bg-[#c82127] transition-all"
            >
              <ArrowLeft className="h-3 w-3" /> Explore All Pieces
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#420002]/30 px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#420002] hover:border-[#420002] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
