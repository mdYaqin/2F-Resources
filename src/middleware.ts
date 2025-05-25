import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Public routes that don't require authentication
  const publicRoutes = ["/admin/login", "/api/auth"];

  // If trying to access login page while already authenticated
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect all admin routes except public ones
  if (
    pathname.startsWith("/admin") &&
    !publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/admin/login?callbackUrl=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
