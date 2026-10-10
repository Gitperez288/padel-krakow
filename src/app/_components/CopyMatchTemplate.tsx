"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export default function CopyMatchTemplate({ template, locale }: { template: string; locale: Locale }) {
  const pl = locale === "pl";
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const field = useRef<HTMLTextAreaElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef(false);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copy() {
    if (pending.current) return;
    pending.current = true;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(template);
      setStatus("copied");
      resetTimer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      field.current?.focus();
      field.current?.select();
    } finally {
      pending.current = false;
    }
  }

  return <div className="mt-3">
    <textarea ref={field} readOnly value={template} rows={6}
      aria-label={pl ? "Szablon ogłoszenia meczu" : "Match post template"}
      className="block w-full resize-none rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm leading-7 text-stone-700" />
    <button type="button" onClick={copy} disabled={status === "copying"} className="button-secondary mt-3">
      {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {status === "copied" ? (pl ? "Skopiowano!" : "Copied!") : (pl ? "Kopiuj szablon" : "Copy template")}
    </button>
    <p role="status" aria-live="polite" className={status === "error" ? "mt-2 text-sm text-stone-600" : "sr-only"}>
      {status === "copied" && (pl ? "Szablon skopiowany do schowka." : "Template copied to clipboard.")}
      {status === "error" && (pl ? "Zaznaczony szablon możesz skopiować ręcznie." : "Copy the selected template manually.")}
    </p>
  </div>;
}
