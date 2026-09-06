import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BarChart3, Eye, Users, Tag, MousePointer2 } from "lucide-react";
import { getAnalyticsReport, type AnalyticsReport } from "@/lib/analytics-report";
import { eventLabels, formatTimestamp } from "@/lib/analytics";
import ExportButton from "./ExportButton";
export const dynamic = "force-dynamic";
export const metadata = { title: "Community analytics", robots: { index: false, follow: false } };
const number = (n: number) => n.toLocaleString("en-GB");
const cell = "px-3 py-1.5 whitespace-nowrap";
export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth/login");
  const user = await db.user.findUnique({ where: { email: session.user.email }, select: { role: true } });
  if (user?.role !== "admin") redirect("/admin/blog");
  let report: AnalyticsReport | undefined;
  try { report = await getAnalyticsReport(); } catch { /* Show an explicit unavailable state, not zero counts. */ }
  const icons = [Eye, Users, Tag, MousePointer2];
  const peak = Math.max(1, ...report?.daily.map(d => d.views) ?? []);
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <Link href="/admin/blog" className="text-sm text-stone-600 underline">← Blog admin</Link>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-5"><div>
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-700"><BarChart3 size={18} aria-hidden="true" />Community insights</p>
      <h1 className="page-heading">Community analytics</h1>
      <p className="mt-3 text-sm text-stone-600">Last 30 calendar days, including today. All dates and times are UTC.</p>
    </div>{report && <ExportButton />}</div>
    {process.env.COMMUNITY_ANALYTICS_ENABLED !== "true" && <p className="mt-5 rounded-lg bg-amber-100 p-4">Tracking is disabled in this environment.</p>}
    {!report ? <p role="alert" className="mt-6">Analytics storage is unavailable. Check the migration and database connection.</p> : <>
      <div className="my-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{report.metrics.slice(0,4).map((m,i) => { const Icon = icons[i]; return <div className={`rounded-2xl border p-5 ${i === 0 ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white"}`} key={m.label}>
        <Icon size={20} className={i === 0 ? "text-orange-300" : "text-orange-700"} aria-hidden="true" />
        <p className="mt-4 text-sm">{m.label}</p><p className="mt-1 text-3xl font-bold tabular-nums">{number(m.value)}</p>
      </div>; })}</div>
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-2xl border border-stone-200 bg-white p-5 lg:col-span-2"><h2 className="text-lg font-semibold">Daily page views</h2>
          <p className="mt-1 text-sm text-stone-500">{report.start.toISOString().slice(0,10)} to {report.end.toISOString().slice(0,10)} · Peak {number(peak === 1 && !report.metrics[0].value ? 0 : peak)}</p>
          <div className="mt-5 flex h-32 items-end gap-1" role="img" aria-label={`Page views over 30 days. ${number(report.metrics[0].value)} total. Daily values are in the table below and Excel export.`}>{report.daily.map(d => <div key={d.date} title={`${d.date}: ${d.views} page views`} className="min-w-0 flex-1 rounded-t bg-orange-600" style={{ height: `${Math.max(2, d.views / peak * 100)}%`, opacity: d.views ? 1 : 0.15 }} />)}</div>
          <div className="mt-2 flex justify-between text-xs text-stone-500"><span>{report.daily[0].date}</span><span>{report.daily[29].date}</span></div>
          <details className="mt-4 text-sm"><summary className="cursor-pointer font-medium">Daily values</summary><div className="mt-2 max-h-60 overflow-auto"><table className="w-full text-left"><thead><tr><th>Date (UTC)</th><th>Views</th><th>Actions</th></tr></thead><tbody>{report.daily.map(d => <tr key={d.date}><td className="py-1">{d.date}</td><td>{number(d.views)}</td><td>{number(d.actions)}</td></tr>)}</tbody></table></div></details>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white p-5"><h2 className="text-lg font-semibold">Audience interests</h2><p className="mt-1 text-sm text-stone-500">Page views by section</p>
          <ul className="mt-4 space-y-2">{report.pages.slice(0,6).map(p => <li className="flex justify-between gap-3 text-sm" key={p.page}><span className="capitalize">{p.page}</span><span className="font-semibold tabular-nums">{number(p.views)}</span></li>)}</ul>
          {!report.pages.length && <p className="mt-3 text-sm text-stone-500">No page views yet.</p>}
          <div className="mt-5 border-t pt-3"><p className="text-sm font-medium">Page views by language</p><p className="mt-2 text-sm text-stone-600">{report.languages.map(l => `${l.locale.toUpperCase()}: ${number(l.views)}`).join(" · ")}</p></div>
        </section>
      </div>
      <section className="mt-7"><h2 className="text-xl font-semibold">Partner and player engagement</h2><p className="mt-2 text-sm text-stone-600">Useful signals for sponsorship and activity planning. Clicks and reveals are not confirmed sales, bookings, event demand or WhatsApp joins.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{report.metrics.slice(4).map(m => <div key={m.label} className="rounded-xl border border-stone-200 bg-white p-4"><p className="text-sm text-stone-600">{m.label}</p><p className="mt-2 text-2xl font-semibold tabular-nums">{number(m.value)}</p></div>)}</div>
      </section>
      <section className="mt-7 rounded-2xl border border-stone-200 bg-white p-5"><h2 className="text-lg font-semibold">Sponsor performance</h2><p className="mt-1 text-sm text-stone-500">Code reveals and outbound clicks by partner</p><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-stone-500"><tr><th className={cell}>Sponsor</th><th className={cell}>Code reveals</th><th className={cell}>Link clicks</th></tr></thead><tbody>{report.partners.map(p => <tr className="border-b last:border-0" key={p.id}><td className={cell}>{p.name}</td><td className={cell}>{number(p.reveals)}</td><td className={cell}>{number(p.clicks)}</td></tr>)}</tbody></table></div></section>
      <section className="mt-7"><h2 className="text-xl font-semibold">Recent events</h2><p className="mt-2 text-sm text-stone-600">Latest {report.events.length} of {number(report.eventCount)} timestamped actions. Each row is one action. The Excel export includes all recorded actions in this period.</p>
        <p className="mt-1 text-sm text-stone-500">Timestamps and sponsor breakdowns start when this update is enabled. Earlier activity remains in the daily totals below.</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200"><table className="w-full text-left text-sm"><caption className="sr-only">Recent anonymous events with UTC timestamps</caption><thead className="bg-stone-100 text-stone-600"><tr>{["Date and time (UTC)","Event","Page","Language","Sponsor"].map(h => <th key={h} className={cell}>{h}</th>)}</tr></thead><tbody className="divide-y divide-stone-100 bg-white">{report.events.map(row => <tr key={row.id} className="hover:bg-orange-50"><td className={`${cell} tabular-nums`}><time dateTime={row.occurredAt.toISOString()}>{formatTimestamp(row.occurredAt)}</time></td><td className={cell}>{eventLabels[row.event] ?? row.event}</td><td className={cell}>{row.page}</td><td className={cell}>{row.locale.toUpperCase()}</td><td className={cell}>{report.partners.find(p => p.id === row.sponsor)?.name ?? row.sponsor ?? ""}</td></tr>)}</tbody></table></div>
        {!report.events.length && <p className="mt-4 text-sm text-stone-500">No timestamped activity yet.</p>}
      </section>
      <details className="mt-7"><summary className="cursor-pointer text-lg font-semibold">Daily event counts</summary><p className="mt-2 text-sm text-stone-500">Daily aggregates, including activity recorded before timestamps were introduced.</p><div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b"><tr>{["Date (UTC)","Event","Page","Language","Count"].map(h => <th key={h} className={cell}>{h}</th>)}</tr></thead><tbody>{report.rows.map(row => <tr className="border-b border-stone-100" key={[row.day.toISOString(),row.event,row.page,row.locale].join("/")}><td className={cell}>{row.day.toISOString().slice(0,10)}</td><td className={cell}>{eventLabels[row.event] ?? row.event}</td><td className={cell}>{row.page}</td><td className={cell}>{row.locale.toUpperCase()}</td><td className={cell}>{number(row.count)}</td></tr>)}</tbody></table></div></details>
      <p className="mt-7 text-sm leading-relaxed text-stone-500">Anonymous action totals, not unique visitors. Repeat visits, blockers and bots can affect counts. No visitor identifiers or acquisition sources are stored. Use Search Console separately for Google impressions and search queries. Export values are refreshed when downloaded.</p>
    </>}
  </div>;
}
