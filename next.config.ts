import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Clerk's Frontend API host is base64-encoded inside the publishable key
 * (pk_test_<b64>$ -> "xxx.clerk.accounts.dev", pk_live_<b64>$ -> "clerk.<your-domain>").
 * Allow exactly that host, plus Clerk's dev-instance wildcard.
 */
function clerkFrontendHost(): string | null {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const encoded = key.split("_")[2];
  if (!encoded) return null;
  try {
    const host = Buffer.from(encoded, "base64").toString("utf8").replace(/\$$/, "");
    return /^[a-z0-9.-]+$/i.test(host) ? `https://${host}` : null;
  } catch {
    return null;
  }
}

const clerk = ["https://*.clerk.accounts.dev", clerkFrontendHost()].filter(Boolean).join(" ");

function getSupabaseConfig() {
  const urlStr = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!urlStr || urlStr.includes("YOUR_COOLIFY") || urlStr.includes("PLACEHOLDER")) {
    return { host: null, protocol: null, port: undefined, origin: null, wsOrigin: null };
  }
  try {
    const u = new URL(urlStr);
    return {
      host: u.hostname,
      port: u.port || undefined,
      protocol: (u.protocol.replace(":", "") as "http" | "https") || "https",
      origin: u.origin,
      wsOrigin: u.protocol === "https:" ? `wss://${u.host}` : `ws://${u.host}`,
    };
  } catch {
    return { host: null, protocol: null, port: undefined, origin: null, wsOrigin: null };
  }
}

const supabaseCfg = getSupabaseConfig();

/**
 * Content-Security-Policy, based on every external host the app talks to:
 *  - Clerk (auth UI + Cloudflare Turnstile captcha), Razorpay checkout (script + iframe + API),
 *    Google Analytics / GTM, Supabase (storage images, REST), self-hosted next/font.
 *
 * script-src keeps 'unsafe-inline' because Next's bootstrap scripts and the site's JSON-LD
 * <Script> tags are inline and we are not using per-request nonces (that would force every
 * page to be dynamically rendered). 'unsafe-eval' is only allowed in dev (React refresh).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${clerk} https://challenges.cloudflare.com https://checkout.razorpay.com https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  // Allow remote product images from Supabase, ERP, avatars, etc.
  "img-src 'self' data: blob: https: http:",
  `media-src 'self' blob: https://*.supabase.co ${supabaseCfg.origin || ""}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${clerk} https://clerk-telemetry.com https://*.spline.design https://*.splinecode.com https://*.supabase.co wss://*.supabase.co ${supabaseCfg.origin || ""} ${supabaseCfg.wsOrigin || ""} https://api.razorpay.com https://lumberjack.razorpay.com https://lumberjack-cx.razorpay.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net${isDev ? " ws: wss:" : ""}`,
  `frame-src 'self' ${clerk} https://challenges.cloudflare.com https://api.razorpay.com https://checkout.razorpay.com`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com" "https://api.razorpay.com")',
  },
];

const nextConfig: NextConfig = {
  // Optimizer serves resized AVIF/WebP of our own files only (no remote hosts, so it can't be
  // used as a proxy). Each localPattern is an exact path + query allowlist.
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/images/**", search: "?v=portrait_v3" },
      { pathname: "/about/**", search: "" },
      { pathname: "/landing-grid/**", search: "" },
      { pathname: "/*.jpg", search: "" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [80],
    // A week. Replacing a photo under the same name? Bump its ?v= tag so the new one shows at once.
    minimumCacheTTL: 604800,
  },
  async rewrites() {
    return [
      {
        source: "/storage/v1/object/public/media/:path*",
        destination: "/:path*",
      },
    ];
  },
  async headers() {
    // Product photos and hero videos change rarely and are versioned with ?v=, so let browsers and
    // the CDN keep them for a week instead of re-checking on every page view (default max-age=0).
    const mediaCache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [mediaCache] },
      { source: "/:file(hero-video.mp4|hero-video-mobile.mp4|hero-poster.jpg)", headers: [mediaCache] },
    ];
  },
};

export default nextConfig;
