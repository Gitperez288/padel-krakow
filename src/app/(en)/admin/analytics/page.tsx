import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { UsageDaily } from "@prisma/client";
export const dynamic = "force-dynamic";
export const metadata = { title: "Community analytics", robots: { index: false, follow: false } };
export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth/login");
  const user = await db.user.findUnique({ where: { email: session.user.email }, select: { role: true } });
  if (user?.role !== "admin") redirect("/admin/blog");
  let rows: UsageDaily[] = []; let unavailable = false;
  try { rows = await db.usageDaily.findMany({ where: { day: { gte: new Date(Date.now() - 30 * 86400000) } }, orderBy: [{ day: "desc" }, { event: "asc" }] }); } catch { unavailable = true; }
  const total = (event: string, page?: string) => rows.filter(row => row.event === event && (!page || row.page === page)).reduce((sum,row) => sum + row.count,0);
  return <div className="mx-auto max-w-6xl px-4 py-10"><Link href="/admin/blog" className="underline">← Blog admin</Link><h1 className="page-heading mt-5">Community analytics</h1><p className="mt-4 text-stone-600">Last 30 days, UTC. Anonymous action totals, not unique visitors or confirmed WhatsApp joins. Repeat visits, blockers and bots can affect counts.</p>
    {process.env.COMMUNITY_ANALYTICS_ENABLED !== "true" && <p className="mt-5 rounded-lg bg-amber-100 p-4">Tracking is disabled in this environment.</p>}
    {unavailable ? <p className="mt-6">Analytics storage is unavailable. Check the migration and database connection.</p> : <>
    <div className="my-8 grid gap-4 sm:grid-cols-3">{[["Community page views",total("page_view","community")],["Invitation reveals",total("invite_reveal")],["WhatsApp invitation clicks",total("whatsapp_click")]].map(([label,value]) => <div className="surface p-5" key={label}><p className="text-sm text-stone-600">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</div>
    <p className="mb-4 text-sm text-stone-600">Use Search Console separately for Google impressions, clicks, queries and landing pages. These counters do not identify search visitors or record acquisition sources.</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Daily event counts by page and language</caption><thead><tr>{["Date (UTC)","Event","Page","Language","Count"].map(h => <th key={h} className="border-b p-3">{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={[row.day.toISOString(),row.event,row.page,row.locale].join("/")}><td className="p-3">{row.day.toISOString().slice(0,10)}</td><td className="p-3">{row.event}</td><td className="p-3">{row.page}</td><td className="p-3">{row.locale}</td><td className="p-3">{row.count}</td></tr>)}</tbody></table></div>{!rows.length && <p className="mt-4">No recorded activity yet.</p>}</>}
  </div>;
}
