/**
 * Next.js Middleware — Route Protection
 *
 * Protects /account and /account/* routes.
 * Unauthenticated users are redirected to the homepage (where the login modal lives).
 *
 * NextAuth session is read from the JWT cookie automatically.
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If authenticated, allow through
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/", // Redirect here when not authenticated
    },
  }
);

export const config = {
  // Only protect these routes
  matcher: ["/account", "/account/:path*"],
};
