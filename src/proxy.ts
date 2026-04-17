import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/auth/login", "/auth/register", "/auth/verify-email"];
const protectedRoutes = ["/dashboard"];

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);

  if (isProtectedRoute && !token) return NextResponse.redirect(new URL("/auth/login", req.url));
  if (isAuthRoute && token) return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
