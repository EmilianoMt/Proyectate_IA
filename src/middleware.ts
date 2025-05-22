import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedRoutes = [
  "/Home",
  "/Quiz",
  "/History",
  "/Chat",
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Auth_psiq")?.value;
  const { pathname } = request.nextUrl;

  if (token && (pathname === "/Login" || pathname === "/")) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/Home", request.url));
    } catch {
      return NextResponse.next();
    }
  }

 
  const isProtected = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (isProtected && token) {
    try {
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Login",
    "/Home",
    "/Quiz",
    "/History",
    "/Chat/:path*", 
    "/",
  ],
};