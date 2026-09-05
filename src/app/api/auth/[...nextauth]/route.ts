import { authOptions } from "@/auth";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { checkLoginRateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
const handler = NextAuth(authOptions);
type Context = { params: Promise<{ nextauth: string[] }> };
export { handler as GET };

export async function POST(request: NextRequest, context: Context) {
  const { nextauth } = await context.params;
  if (nextauth.join("/") === "callback/credentials") {
    const reject = (error: string, status: number, retryAfter: number) =>
      NextResponse.json(
        { url: new URL(`/auth/login?error=${error}`, request.url).toString() },
        { status, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } }
      );
    // Vercel overwrites x-forwarded-for with the client IP. No client form
    // field or email controls this key. Missing IPs share a conservative limit.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    try {
      const result = await checkLoginRateLimit(ip);
      if (!result.allowed) return reject("RateLimit", 429, result.retryAfter);
    } catch {
      console.error("LOGIN_RATE_LIMIT_UNAVAILABLE");
      return reject("ServiceUnavailable", 503, 60);
    }
  }
  return handler(request, context);
}
