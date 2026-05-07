import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isAdminRoleFromToken(token) {
  const role = token?.user?.role ?? token?.user?.roleId ?? token?.user?.role_id ?? token?.role ?? token?.roleId ?? token?.role_id;
  if (role === 1 || role === "1") return true;
  if (role && typeof role === "object") {
    return role?.id === 1 || role?.value === 1 || role?.key === 1;
  }
  return false;
}

export async function proxy(request) {
  const token = await getToken({
    req: request,
    ...(process.env.NEXTAUTH_SECRET
      ? { secret: process.env.NEXTAUTH_SECRET }
      : {}),
  });

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  const pathname = request.nextUrl.pathname || "";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdminRoute && !isAdminRoleFromToken(token)) {
    const url = request.nextUrl.clone();
    url.pathname = "/404";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/product/:path*", "/cart/:path*", "/checkout/:path*", "/admin/:path*"],
};
