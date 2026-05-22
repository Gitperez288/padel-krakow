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

      const { success, reset } = await loginRatelimit.limit(ip);

      if (!success) {
        const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
        return new NextResponse(
          JSON.stringify({
            error: "Too many login attempts. Please try again later.",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(retryAfterSeconds),
            },
          }
        );
      }
    }
  }

  // ── Protect admin routes — require authenticated admin role ───────────────
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
