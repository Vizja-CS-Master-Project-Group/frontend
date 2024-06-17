import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const routes: { [role: string]: string[] } = {
  guest: ["/login", "/signup", "/forgot-password"],
  librarian: [
    "/",
    "/books",
    "/books/[id]",
    "/books/[id]/edit",
    "/users",
    "/users/[id]",
    "/users/[id]/edit",
    "/loans",
    "/loans/[id]",
    "/loans/[id]/return",
    "/settings",
  ],
  user: ["/", "/books", "/books/[id]", "/loans", "/loans/[id]"],
};

export function isAccessible(role: string, path: string) {
  const accessibleRoutes = routes[role] || [];
  return accessibleRoutes.some((route) => {
    const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  });
}

function redirectToNext(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function redirectToLogin(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return redirectToNext(request);
  }

  return NextResponse.redirect(new URL("/login", request.url));
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
      return redirectToNext(request);
    }

    return redirectToLogin(request);
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
      return redirectToNext(request);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return redirectToLogin(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
