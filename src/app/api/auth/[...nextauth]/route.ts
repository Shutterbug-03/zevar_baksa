/**
 * NextAuth route handler.
 * This single file handles all auth requests:
 *   GET/POST /api/auth/signin
 *   GET/POST /api/auth/callback/email
 *   GET /api/auth/session
 *   POST /api/auth/signout
 *   etc.
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
