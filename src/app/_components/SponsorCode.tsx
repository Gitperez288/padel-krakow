"use client";

import { useRef, useState } from "react";
import { Tag } from "lucide-react";
import { trackUsage } from "@/lib/usage";

export default function SponsorCode({ sponsorId, code, note, label, revealLabel }: {
  sponsorId: string; code: string; note: string | null; label: string; revealLabel: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const counted = useRef(false);
  return <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-900"><Tag size={16} aria-hidden="true" />{label}</p>
    {revealed ? <div role="status">
      <span className="inline-block rounded-lg bg-orange-700 px-3 py-2 text-base font-bold tracking-wide text-white">{code}</span>
      {note && <p className="mt-3 text-sm leading-relaxed text-stone-700">{note}</p>}
    </div> : <button type="button" className="button-primary text-sm" onClick={() => {
      setRevealed(true);
      if (!counted.current) { counted.current = true; trackUsage("sponsor_code_reveal", sponsorId); }
    }}>{revealLabel}</button>}
  </div>;
}
