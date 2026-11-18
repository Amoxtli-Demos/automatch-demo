import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE } from "@/lib/lang-cookie";

/**
 * Language routing:
 *  - "/"   → Dutch (rewritten to /nl). First-time visitors and crawlers always get Dutch.
 *            Returning visitors who picked English or Spanish are sent to /en or /es.
 *  - "/nl" → 308 to "/" so Dutch has a single canonical URL.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/nl" || pathname === "/nl/") {
    return NextResponse.redirect(new URL("/", req.url), 308);
  }
  if (pathname === "/") {
    const pref = req.cookies.get(LANG_COOKIE)?.value;
    if (pref === "en" || pref === "es") {
      const res = NextResponse.redirect(new URL(`/${pref}`, req.url), 307);
      res.headers.set("Cache-Control", "private, no-store");
      return res;
    }
    return NextResponse.rewrite(new URL("/nl", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/nl", "/nl/"],
};
