import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Auth_psiq")?.value;

  if (token && request.nextUrl.pathname === "/Login" ) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/Home", request.url));
    } catch {
      return NextResponse.next();
    }
  }

   if (token && request.nextUrl.pathname === "/" ) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/Home", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (!token && request.nextUrl.pathname === "/Home") {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Login", "/Home", "/"],
};