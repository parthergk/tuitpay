import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const GUEST_PAGES = ["/", "/login", "/register"];

const PROTECTED_PAGES = ["/dashboard", "/profile_settings"];


export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, origin } = req.nextUrl;

  // --- 1. Redirect Authenticated Users AWAY from Guest Pages (e.g., Landing Page, Login) ---
  if (token && GUEST_PAGES.includes(pathname)) {
    // Redirect to dashboard if logged in and visiting the root or login pages
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // --- 2. Protect Core Pages (Redirect Unauthenticated Users TO Login) ---
  // Check if the current path starts with any of the protected routes
  const isProtectedPath = PROTECTED_PAGES.some(route => pathname.startsWith(route));

  if (isProtectedPath && !token) {
    // If attempting to access a protected page without a token, redirect to login
    // The query 'p=' is an optional way to pass the attempted URL back to the login page.
    return NextResponse.redirect(`${origin}/login?p=${pathname}`);
  }

  // --- 3. (Optional) Incomplete Profile Check (from previous solution) ---
  // Assuming your token has the profileComplete flag
  // This ensures a user who hasn't completed their profile is sent to /profile
  if (token && token.profileComplete === false && pathname !== '/profile') {
      return NextResponse.redirect(`${origin}/profile`);
  }


  return NextResponse.next();
}

// ⚠️ Match all paths so the middleware logic can check the root path ("/")
export const config = {
  matcher: ["/dashboard/:path*", "/student/:path*", "/profile_settings/:path*", "/login", "/register", "/"],
};