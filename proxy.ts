import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  let payload = null;
  if (token) {
    payload = await verifyToken(token);
  }

  // Cek login
  if (pathname.startsWith("/login")) {
    if (payload) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    const response = NextResponse.next();
    if (token && !payload) {
      response.cookies.delete("auth_token");
    }
    return response;
  }

  if (pathname.startsWith("/admin")) {
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      if (token) {
        response.cookies.delete("auth_token");
      }
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
