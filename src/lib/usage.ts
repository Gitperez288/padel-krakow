import { localizedRoutes } from "./i18n";
export const usageEvents = ["page_view", "community_cta", "invite_reveal", "whatsapp_click", "booking_click", "coach_contact"] as const;
export type UsageEvent = typeof usageEvents[number];
export const usagePages = [...Object.keys(localizedRoutes), "article"];
export function usagePage(pathname: string): string | undefined {
  const path = pathname === "/index" ? "/" : pathname.replace(/\/$/, "") || "/";
  const entry = Object.entries(localizedRoutes).find(([,pair]) => pair.en === path || pair.pl === path);
  if (entry) return entry[0];
  if (/^\/(?:pl\/)?blog\/[^/]+$/.test(path)) return "article";
}
export function trackUsage(event: UsageEvent) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  const page = usagePage(window.location.pathname);
  if (!page) return;
  const payload = JSON.stringify({ event, page, locale: document.documentElement.lang === "pl" ? "pl" : "en" });
  // Never send hrefs, query strings, referrers, names or WhatsApp invitation tokens.
  void fetch("/api/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, credentials: "omit", keepalive: true }).catch(() => {});
}
