/**
 * Rate limiter for the credentials login endpoint.
 *
 * Uses Upstash Redis (Edge-compatible) so limits are shared across
 * all serverless instances on Vercel.
 *
 * Required environment variables (set in Vercel dashboard + .env.local):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * If either variable is absent the limiter is disabled and all requests
 * pass through — this prevents the app from breaking during local dev
 * before Redis is configured.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function buildRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Ratelimit({
    redis: new Redis({ url, token }),
    // 5 login attempts per IP per 15-minute sliding window
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "ratelimit:login",
  });
}

export const loginRatelimit = buildRatelimit();
