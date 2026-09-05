import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { usageEvents, usagePages, type UsageEvent } from "@/lib/usage";
export const runtime = "nodejs";
// Best-effort per-instance abuse protection. These ephemeral hashes expire each
// minute and are never written to the database or logs. Counts are not unique users.
const salt = randomBytes(32);
let windowStart = 0;
let requests = 0;
const clients = new Map<string, number>();
let lastPrune = 0;
function allow(ip: string): boolean {
  const minute = Math.floor(Date.now() / 60000);
  if (minute !== windowStart) { windowStart = minute; requests = 0; clients.clear(); }
  if (++requests > 600) return false;
  const key = createHash("sha256").update(salt).update(ip).digest("hex");
  const n = (clients.get(key) || 0) + 1;
  clients.set(key, n);
  return n <= 40;
}
export async function POST(request: NextRequest) {
  const empty = () => new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  // Explicit enablement keeps preview traffic out of production reports.
  if (process.env.COMMUNITY_ANALYTICS_ENABLED !== "true") return empty();
  const origin = request.headers.get("origin");
  if (origin !== request.nextUrl.origin || request.headers.get("sec-fetch-site") === "cross-site") return new NextResponse(null, { status: 403 });
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1" || /bot|crawler|spider|headless/i.test(request.headers.get("user-agent") || "")) return empty();
  if (!allow(request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown")) return new NextResponse(null, { status: 429 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new NextResponse(null, { status: 415 });
  // Read at most 512 bytes even for chunked bodies without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return new NextResponse(null, { status: 400 });
  let raw = ""; let bytes = 0;
  try {
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read(); if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 512) { await reader.cancel(); return new NextResponse(null, { status: 413 }); }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
    let data;
    try { data = JSON.parse(raw); } catch { return new NextResponse(null, { status: 400 }); }
    if (!data || Object.keys(data).sort().join(",") !== "event,locale,page" || !usageEvents.includes(data.event as UsageEvent) || !usagePages.includes(data.page) || !["en", "pl"].includes(data.locale)) return new NextResponse(null, { status: 400 });
    const day = new Date(new Date().toISOString().slice(0,10));
    await db.usageDaily.upsert({ where: { day_event_page_locale: { day, event: data.event, page: data.page, locale: data.locale } }, create: { day, event: data.event, page: data.page, locale: data.locale, count: 1 }, update: { count: { increment: 1 } } });
    if (Date.now() - lastPrune > 86400000) {
      await db.usageDaily.deleteMany({ where: { day: { lt: new Date(Date.now() - 400 * 86400000) } } });
      lastPrune = Date.now();
    }
    return empty();
  } catch {
    // Missing migration or unavailable DB must never block a community invitation.
    return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
