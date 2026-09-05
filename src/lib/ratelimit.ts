import { createHmac } from "node:crypto";
import { db } from "@/lib/db";

// Five attempts per 15-minute window, starting with the first attempt.
// Atomic upsert shares the limit across all Vercel instances. Denied attempts
// do not extend the window. The sixth count is retained until expiry.
export async function checkLoginRateLimit(ip: string) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("Login protection is unavailable");
  const key = createHmac("sha256", secret).update("login-rate-limit:").update(ip).digest("hex");
  return db.$transaction(async tx => {
    await tx.$executeRaw`SET LOCAL statement_timeout = '3000ms'`;
    // Lazy cleanup also works after long inactivity, without a scheduled job.
    await tx.$executeRaw`DELETE FROM "LoginRateLimit" WHERE "expiresAt" < CURRENT_TIMESTAMP - INTERVAL '1 day'`;
    const rows = await tx.$queryRaw<Array<{ count: number; retryAfter: number }>>`
      INSERT INTO "LoginRateLimit" ("key", "count", "expiresAt")
      VALUES (${key}, 1, CURRENT_TIMESTAMP + INTERVAL '15 minutes')
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE WHEN "LoginRateLimit"."expiresAt" <= CURRENT_TIMESTAMP
          THEN 1 ELSE LEAST("LoginRateLimit"."count" + 1, 6) END,
        "expiresAt" = CASE WHEN "LoginRateLimit"."expiresAt" <= CURRENT_TIMESTAMP
          THEN CURRENT_TIMESTAMP + INTERVAL '15 minutes' ELSE "LoginRateLimit"."expiresAt" END
      RETURNING "count", GREATEST(1, CEIL(EXTRACT(EPOCH FROM ("expiresAt" - CURRENT_TIMESTAMP))))::integer AS "retryAfter"
    `;
    if (!rows[0]) throw new Error("Login protection is unavailable");
    return { allowed: rows[0].count <= 5, retryAfter: rows[0].retryAfter };
  }, { maxWait: 3000, timeout: 8000 });
}
