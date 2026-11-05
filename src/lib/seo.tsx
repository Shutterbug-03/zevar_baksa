/**
 * One source for the site's public address and description, plus JSON-LD output.
 *
 * www.zevarbaksa.com is the primary host (the apex redirects to it), so every canonical,
 * sitemap and structured-data URL uses it directly instead of pointing at a redirect.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.zevarbaksa.com").replace(/\/+$/, "");

export const SITE_DESCRIPTION =
  "Zevar Baksa is a Jaipur jewellery house making handcrafted 925 sterling silver pendants, earrings and necklaces with kiln-fired meenakari enamel and 22K gold kundan accents.";

export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

/**
 * Structured data as a plain <script> so it is in the server-rendered HTML that AI crawlers
 * and search engines read (next/script injects it client-side, after hydration).
 * `<` is escaped so text inside the data can never close the script tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
