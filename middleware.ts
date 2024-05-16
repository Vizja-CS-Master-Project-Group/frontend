import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const guestRoutes = ["/login", "/signup", "/forgot-password"];

const routes: { [role: string]: string[] } = {
  guest: ["/login", "/signup", "/forgot-password"],
  librarian: ["/", "/books"],
  user: ["/", "/books"],
};

export function isAccessible(role: string, path: string) {
  return routes[role].includes(path);
}

export async function middleware(request: NextRequest) {
  const { pathname, search, origin, basePath } = request.nextUrl;

  // return NextResponse.next();
  const c = cookies();
  const allCookies = c
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  /**
   * If next-auth.session-token is not present, return 401
   * (!) IMPORTANT NOTE HERE:
   * next-auth likes to use different cookie name for prod (https) so make sure to set a consistent cookie name in your next-auth configuration file (see docs)
   */
  if (!c.get("next-auth.session-token")?.value?.trim()) {
    if (isAccessible("guest", pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const headers = {
    "Content-Type": "application/json",
    Cookie: allCookies,
  };

  const response = await fetch(process.env.NEXTAUTH_URL + "api/auth/session", {
    headers,
    cache: "no-store",
  });

  if (response.ok) {
    const session = await response.json();
    if (isAccessible(session.user.role, pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
