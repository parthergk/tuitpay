import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {        
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/home")) {
            return true;
        }
        if (pathname.startsWith("/login") || pathname.startsWith("register")) {
            return true;
        }
        return !!token;

      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
