// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("next-auth.session-token")?.value || "";
//   const url = new URL("/api/auth/signin", request.url);
//   url.searchParams.set("callbackUrl", request.url);
//   if (!token) return NextResponse.redirect(url);
// }

import NextAuth from "next-auth";
import authConfig from "@/lib/auth/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

// export { auth as default } from "@/lib/auth/auth";

export const config = {
  matcher: ["/history", "/favorites", "/signout", "/admin/:path*"],
};
