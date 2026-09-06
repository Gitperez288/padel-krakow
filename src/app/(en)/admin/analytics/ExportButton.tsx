"use client";
import { useState } from "react";
import { Download } from "lucide-react";
export default function ExportButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return <div><button type="button" disabled={busy} className="button-primary inline-flex items-center gap-2 disabled:opacity-60" onClick={async () => {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/analytics/export", { cache: "no-store" });
      if (!response.ok) throw new Error("Export unavailable");
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = "community-analytics-30-days.xlsx";
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setError("Could not export the report. Please try again."); }
    finally { setBusy(false); }
  }}><Download size={17} aria-hidden="true" />{busy ? "Preparing Excel…" : "Export 30 days to Excel"}</button>
    {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
}
