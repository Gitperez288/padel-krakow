import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getAnalyticsReport } from "@/lib/analytics-report";
import { createAnalyticsWorkbook } from "@/lib/analytics-workbook";
import { eventLabels } from "@/lib/analytics";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in required" }, { status: 401, headers });
  const user = await db.user.findUnique({ where: { email: session.user.email }, select: { role: true } });
  if (user?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403, headers });
  try {
    const report = await getAnalyticsReport();
    const workbook = createAnalyticsWorkbook(report);
    let sheetNumber = 0;
    function eventSheet() {
      const ws = workbook.addWorksheet(++sheetNumber === 1 ? "Events" : `Events ${sheetNumber}`, { views: [{ state: "frozen", ySplit: 1 }] });
      ws.addRow(["Date and time (UTC)", "Event", "Page", "Language", "Sponsor"]);
      ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF9A3412" } };
      ws.columns.forEach(c => { c.width = 28; });
      ws.getColumn(1).numFmt = "yyyy-mm-dd hh:mm:ss";
      ws.autoFilter = "A1:E1";
      return ws;
    }
    let ws = eventSheet();
    let cursor: { occurredAt: Date; id: string } | undefined;
    // Bounded database reads; never silently truncate to the dashboard's 100 rows.
    while (true) {
      const events = await db.usageEvent.findMany({
        where: { occurredAt: { gte: report.start, lte: report.end }, ...(cursor ? { OR: [
          { occurredAt: { gt: cursor.occurredAt } }, { occurredAt: cursor.occurredAt, id: { gt: cursor.id } },
        ] } : {}) },
        orderBy: [{ occurredAt: "asc" }, { id: "asc" }], take: 2000,
      });
      for (const event of events) {
        if (ws.rowCount >= 1048576) ws = eventSheet();
        ws.addRow([event.occurredAt, eventLabels[event.event] ?? event.event, event.page, event.locale,
          report.partners.find(p => p.id === event.sponsor)?.name ?? event.sponsor ?? ""]);
      }
      if (events.length < 2000) break;
      const last = events[events.length - 1]; cursor = { occurredAt: last.occurredAt, id: last.id };
    }
    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(new Uint8Array(buffer), { headers: { ...headers,
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="community-analytics-${report.end.toISOString().slice(0,10)}.xlsx"`,
    } });
  } catch {
    return NextResponse.json({ error: "Export unavailable. Please try again." }, { status: 503, headers });
  }
}
