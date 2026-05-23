import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "nonep_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/admin/login");

  if (!isAdminPage) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!adminPassword || sessionCookie !== adminPassword) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};