import Script from "next/script";

/** localStorage key shared with CookieConsent ("granted" | "denied"). */
export const CONSENT_KEY = "zevar-analytics-consent";

/**
 * Returns the GA4 measurement ID, or null when unset / still a placeholder.
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is preferred; NEXT_PUBLIC_GA_ID is a legacy fallback.
 */
export function getGaId(): string | null {
  const id = (
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID
  )?.trim();
  if (!id) return null;
  if (id.includes("PLACEHOLDER") || id.includes("XXXXXXXXXX")) return null;
  return /^G-[A-Z0-9]+$/.test(id) ? id : null;
}

export function GoogleAnalytics() {
  const gaId = getGaId();
  if (!gaId) return null;

  // Consent Mode v2: everything is denied by default, and a stored "granted"
  // choice is applied before config so returning visitors are measured. The
  // CookieConsent banner calls gtag('consent', 'update', ...) on a fresh accept.
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
