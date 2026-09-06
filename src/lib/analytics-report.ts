import { db } from "@/lib/db";
import { sponsors } from "@/lib/sponsors";
import { analyticsWindow, summarizeAnalytics } from "./analytics";

export async function getAnalyticsReport(now = new Date()) {
  const { start, end } = analyticsWindow(now);
  // One consistent snapshot for totals, sponsor breakdowns and the on-screen log.
  return db.$transaction(async tx => {
    const rows = await tx.usageDaily.findMany({ where: { day: { gte: start, lte: end } }, orderBy: [{ day: "desc" }, { event: "asc" }, { page: "asc" }, { locale: "asc" }] });
    const where = { occurredAt: { gte: start, lte: end } };
    const events = await tx.usageEvent.findMany({ where, orderBy: [{ occurredAt: "desc" }, { id: "desc" }], take: 100 });
    const eventCount = await tx.usageEvent.count({ where });
    const grouped = await tx.usageEvent.groupBy({ by: ["sponsor", "event"], where: { ...where, sponsor: { not: null } }, _count: { _all: true } });
    const partners = sponsors.map(s => ({ name: s.name, id: s.id,
      reveals: grouped.find(g => g.sponsor === s.id && g.event === "sponsor_code_reveal")?._count._all ?? 0,
      clicks: grouped.find(g => g.sponsor === s.id && g.event === "sponsor_click")?._count._all ?? 0 }));
    return { start, end, rows, events, eventCount, partners, ...summarizeAnalytics(rows, start) };
  }, { isolationLevel: "RepeatableRead" });
}
export type AnalyticsReport = Awaited<ReturnType<typeof getAnalyticsReport>>;
