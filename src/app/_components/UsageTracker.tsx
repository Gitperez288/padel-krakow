"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackUsage, usageEvents, type UsageEvent } from "@/lib/usage";
export default function UsageTracker() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);
  useEffect(() => {
    if (lastPage.current === pathname) return;
    lastPage.current = pathname;
    trackUsage("page_view");
  }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const namedEvent = link.dataset.analyticsEvent;
      if (usageEvents.includes(namedEvent as UsageEvent)) { trackUsage(namedEvent as UsageEvent); return; }
      const url = new URL(link.href, location.origin);
      if (url.origin === location.origin && ["/community", "/pl/spolecznosc"].includes(url.pathname)) trackUsage("community_cta");
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
