import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt"; // Import fungsi verifikasi

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Panggil fungsi library kamu. Jika mengembalikan null, berarti token rusak/expired.
  const payload = await verifyToken(token);

  if (!payload) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token"); // Hapus cookie yang rusak
    return response;
  }

  // Lolos pemeriksaan, izinkan akses!
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
