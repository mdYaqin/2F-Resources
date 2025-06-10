import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Public routes that don't require authentication
  const publicRoutes = [
    "/admin/login",
    "/api/auth",
    "/admin/reset-password",
    "/api/admin/users/reset-password",
    "/api/admin/users/forgot-password",
  ];

  // If trying to access login page while already authenticated
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect all /admin and /api/admin routes except public ones
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) &&
    !publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    if (!token) {
      // For API routes, respond with 401 instead of redirect
      if (pathname.startsWith("/api/")) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // For page routes, redirect to login
      return NextResponse.redirect(
        new URL(`/admin/login?callbackUrl=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
