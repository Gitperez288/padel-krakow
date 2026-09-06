import ExcelJS from "exceljs";
import type { AnalyticsReport } from "./analytics-report";
import { eventLabels } from "./analytics";

export function createAnalyticsWorkbook(report: AnalyticsReport) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Padel Kraków Community";
  workbook.created = report.end;
  function sheet(name: string, headers: string[], rows: (string | number | Date | null)[][]) {
    const ws = workbook.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
    ws.addRow(headers); ws.addRows(rows);
    ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF9A3412" } };
    ws.getRow(1).height = 24;
    ws.columns.forEach((column, i) => { column.width = i === 0 ? 32 : 26; });
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: Math.max(1, ws.rowCount), column: headers.length } };
    ws.eachRow((row, index) => { if (index > 1) row.height = 20; row.eachCell(cell => { if (cell.value instanceof Date) cell.numFmt = "yyyy-mm-dd hh:mm:ss"; }); });
    return ws;
  }
  sheet("Summary", ["Metric", "Count"], report.metrics.map(m => [m.label, m.value]));
  sheet("Daily trend", ["Date (UTC)", "Page views", "Actions"], report.daily.map(d => [d.date, d.views, d.actions]));
  sheet("Sponsors", ["Sponsor", "Code reveals", "Link clicks"], report.partners.map(p => [p.name, p.reveals, p.clicks]));
  sheet("Pages", ["Page", "Page views"], report.pages.map(p => [p.page, p.views]));
  sheet("Languages", ["Language", "Page views"], report.languages.map(l => [l.locale.toUpperCase(), l.views]));
  sheet("Daily counts", ["Date (UTC)", "Event", "Page", "Language", "Count"], report.rows.map(r => [r.day.toISOString().slice(0,10), eventLabels[r.event] ?? r.event, r.page, r.locale, r.count]));
  const notes = sheet("Read me", ["Item", "Details"], [
    ["Period starts (UTC)", report.start], ["Export generated (UTC)", report.end],
    ["Period", "Today and the preceding 29 UTC calendar dates. Today is incomplete."],
    ["Interpretation", "Anonymous action counts, not unique visitors, sales, confirmed bookings or WhatsApp joins. Repeat visits, blockers and bots can affect counts."],
    ["Historical activity", "Daily totals include earlier activity. Event timestamps and sponsor breakdowns begin when the new tracking is enabled; earlier timestamps cannot be reconstructed."],
    ["Event log", "All timestamped actions in this period, including those beyond the latest 100 shown on the dashboard. If large, the log spans multiple sheets."],
    ["Privacy", "No visitor identifiers, IP addresses, referrers or invitation URLs. Timestamped actions retained for up to 30 calendar days; daily totals up to 400 days."],
    ["Freshness", "Metrics are refreshed at download time and may differ from a previously opened dashboard."],
  ]);
  notes.getColumn(2).width = 100;
  notes.eachRow((row, i) => { if (i > 3) { row.height = 44; row.getCell(2).alignment = { wrapText: true, vertical: "top" }; } });
  return workbook;
}
