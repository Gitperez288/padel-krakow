import type { UsageDaily } from "@prisma/client";

export const DAY_MS = 86400000;
export const eventLabels: Record<string, string> = {
  page_view: "Page view", community_cta: "Community link click", invite_reveal: "Invitation reveal",
  whatsapp_click: "WhatsApp invitation click", booking_click: "Booking link click", coach_contact: "Coach contact",
  sponsor_code_reveal: "Sponsor code reveal", sponsor_click: "Sponsor link click", sponsorship_contact: "Sponsorship enquiry click",
};
export const formatTimestamp = (date: Date) => date.toISOString().replace("T", " ").slice(0, 19);
// Today and the preceding 29 UTC calendar dates, matching the legacy daily counters.
export function analyticsWindow(now = new Date()) {
  const start = new Date(now); start.setUTCHours(0, 0, 0, 0); start.setUTCDate(start.getUTCDate() - 29);
  return { start, end: now };
}
export function summarizeAnalytics(rows: UsageDaily[], start: Date) {
  const total = (event: string, page?: string) => rows.reduce((sum, row) => sum + (row.event === event && (!page || row.page === page) ? row.count : 0), 0);
  const metrics = [
    { label: "Total page views", value: total("page_view") },
    { label: "Community page views", value: total("page_view", "community") },
    { label: "Invitation reveals", value: total("invite_reveal") },
    { label: "WhatsApp invitation clicks", value: total("whatsapp_click") },
    { label: "Sponsor page views", value: total("page_view", "sponsors") },
    { label: "Discount code reveals", value: total("sponsor_code_reveal") },
    { label: "Sponsor link clicks", value: total("sponsor_click") },
    { label: "Sponsorship enquiry clicks", value: total("sponsorship_contact") },
    { label: "Booking link clicks", value: total("booking_click") },
    { label: "Coach contacts", value: total("coach_contact") },
    { label: "Community link clicks", value: total("community_cta") },
  ];
  const daily = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(start.getTime() + i * DAY_MS).toISOString().slice(0, 10);
    const dayRows = rows.filter(row => row.day.toISOString().slice(0, 10) === date);
    return { date, views: dayRows.filter(row => row.event === "page_view").reduce((n, r) => n + r.count, 0),
      actions: dayRows.filter(row => row.event !== "page_view").reduce((n, r) => n + r.count, 0) };
  });
  const pages = [...new Set(rows.filter(r => r.event === "page_view").map(r => r.page))]
    .map(page => ({ page, views: total("page_view", page) })).sort((a,b) => b.views - a.views);
  const languages = ["en", "pl"].map(locale => ({ locale, views: rows.filter(r => r.event === "page_view" && r.locale === locale).reduce((n,r) => n + r.count, 0) }));
  return { metrics, daily, pages, languages };
}
