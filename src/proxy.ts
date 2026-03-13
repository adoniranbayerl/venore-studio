export { auth as proxy } from "@/core/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/profile/:path*",
    "/notifications/:path*",
    "/portal/:path*",
    "/admin/:path*",
  ],
};
