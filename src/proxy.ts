import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Only these need a signed-in customer. Everything else is public — including
// robots.txt / sitemap.xml (crawlers must reach them) and unknown URLs (so they
// get the real 404 page instead of a sign-in redirect). API routes that need
// auth (sync-cart, sync-wishlist) check it themselves; /api/orders uses
// ADMIN_API_SECRET and /api/cron uses CRON_SECRET.
const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/api/account(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|mov|ogg)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
