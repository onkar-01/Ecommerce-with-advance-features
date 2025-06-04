import { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as JWT;
    if (token?.role !== "Admin" && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/no-authorization', req.url));
    }
    if(token?.role === "Admin" && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      }
    }
  }
);

export const config = {
  matcher: ['/admin/:path*','/login','/register']
};
