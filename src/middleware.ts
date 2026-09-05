import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { loginRatelimit } from "@/lib/ratelimit";

export async function middleware(request: NextRequest) {
  // ── Rate-limit credentials login attempts ─────────────────────────────────
  // NextAuth posts credentials to /api/auth/callback/credentials.
  // Allow at most 5 attempts per IP per 15-minute window.
  if (
    request.nextUrl.pathname === "/api/auth/callback/credentials" &&
    request.method === "POST"
  ) {
    if (loginRatelimit) {
      // x-forwarded-for may contain a comma-separated list; take the first entry
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        "anonymous";

      const reject = (error: string, status: number, retryAfter: number) =>
        NextResponse.json(
          { url: new URL(`/auth/login?error=${error}`, request.url).toString() },
          { status, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } }
        );
      try {
        const result = await loginRatelimit.limit(ip);
        // Consume optional analytics failures without logging request data.
        void result.pending.catch(() => console.error("LOGIN_RATE_LIMIT_ANALYTICS_UNAVAILABLE"));
        // Upstash's default timeout returns success=true. Do not bypass the limit.
        if (result.reason === "timeout") {
          console.error("LOGIN_RATE_LIMIT_UNAVAILABLE");
          return reject("ServiceUnavailable", 503, 60);
        }
        if (!result.success) {
          return reject("RateLimit", 429, Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)));
        }
      } catch {
        console.error("LOGIN_RATE_LIMIT_UNAVAILABLE");
        return reject("ServiceUnavailable", 503, 60);
      }
    }
  }

  // ── Protect admin routes: require authenticated admin role ───────────────
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/callback/credentials"],
};
