"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: replaces the root layout, so it carries its own <html>/<body>
 * and inline styles (the app's CSS and fonts are not guaranteed to be loaded here).
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaee",
          color: "#420002",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 440 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c82127", fontWeight: 600, fontFamily: "system-ui, sans-serif" }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 400, margin: "16px 0 20px" }}>
            A small flaw in the setting
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.75, fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            We hit an unexpected problem. Please try again, or visit our shop or contact page and we will help you personally.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", fontFamily: "system-ui, sans-serif" }}>
            <button
              onClick={() => unstable_retry()}
              style={{ border: 0, cursor: "pointer", borderRadius: 999, background: "#420002", color: "#fffaee", padding: "12px 28px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600 }}
            >
              Try Again
            </button>
            {/* Plain anchors on purpose: next/link needs a working router, which may be what failed */}
            <a href="/shop" style={{ borderRadius: 999, border: "1px solid rgba(66,0,2,0.3)", color: "#420002", padding: "12px 28px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
              Back to Shop
            </a>
            <a href="/contact" style={{ color: "#420002", padding: "12px 12px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", opacity: 0.7 }}>
              Contact Us
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
