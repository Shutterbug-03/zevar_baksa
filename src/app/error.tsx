"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/Layout";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-6 pt-44 pb-24">
        <div className="max-w-md text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans font-semibold mb-4">
            Something went wrong
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#420002] mb-5">
            A small flaw in the setting
          </h1>
          <p className="text-sm sm:text-base text-[#420002]/70 font-sans font-light leading-relaxed mb-10">
            We hit an unexpected problem loading this page. It is usually temporary; please try again,
            or reach out and we will help you personally.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => unstable_retry()}
              className="inline-flex items-center gap-2 rounded-full bg-[#420002] px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#fffaee] hover:bg-[#c82127] transition-all"
            >
              Try Again
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-[#420002]/30 px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#420002] hover:border-[#420002] transition-all"
            >
              Back to Shop
            </Link>
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#420002]/70 hover:text-[#c82127] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
