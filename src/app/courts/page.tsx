"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { Court } from "../_components/CourtMap";

const CourtMap = dynamic(() => import("../_components/CourtMap"), { ssr: false });

type CourtExtended = Court & {
  doubles: number;
  singles?: number;
  indoor: boolean | "mixed";
};

// --- Paste your courts here ---
// If you know precise coords, fill lat/lng and it will use them directly.
// If you leave lat/lng as undefined, the code will geocode from `address`.
const baseCourts: (Omit<CourtExtended, "lat" | "lng"> & Partial<Court>)[] = [
  {
    id: "bajada",
    name: "Bajada Sports Club",
    address: "Tyniecka 215, 30-381 Kraków",
    link: "https://maps.google.com/?q=Bajada+Sports+Club+Kraków",
    doubles: 2, singles: 1, indoor: true,
    lat:  50.0251188, lng: 19.8333971
  },
  {
    id: "fame",
    name: "Fame Sports Club",
    address: "Jana Dekerta 21, 30-703 Kraków",
    link: "https://maps.google.com/?q=Fame+Sports+Club+Kraków",
    doubles: 2, singles: 0, indoor: "mixed",
    lat:  50.0467165, lng: 19.9649943
  },
  {
    id: "morelowa",
    name: "Morelowa34",
    address: "Morelowa 34, 30-222 Kraków",
    link: "https://maps.google.com/?q=Morelowa34+Kraków",
    doubles: 2, singles: 0, indoor: "mixed",
    lat:  50.0703146, lng: 19.8656325
  },
  {
    id: "padelhouse",
    name: "Padel House",
    address: "Rzemieślnicza 20A, 30-363 Kraków",
    link: "https://maps.google.com/?q=Padel+House+Kraków",
    doubles: 4, singles: 0, indoor: true,
    lat:  50.0323975, lng: 19.9331454
  },
  {
    id: "gardenpadel",
    name: "Garden Padel",
    address: "Walerego Eljasza-Radzikowskiego 109, 31-342 Kraków",
    link: "https://maps.google.com/?q=Garden+Padel+Kraków",
    doubles: 4, singles: 0, indoor: false,
    lat:  50.0858436, lng: 19.8843225
  },
  {
    id: "sao",
    name: "SAO Sports Hub",
    address: "Piastowska 26, 30-065 Kraków",
    link: "https://maps.google.com/?q=SAO+Sports+Hub+Kraków",
    doubles: 2, singles: 0, indoor: false,
    lat:  50.0660441, lng: 19.8998069
  },
  {
    id: "ahoj",
    name: "Ahoj Padel",
    address: "Staniątki 703B, 32-005 Niepołomice",
    link: "https://maps.google.com/?q=Ahoj+Padel+Niepołomice",
    doubles: 6, singles: 0, indoor: false,
    lat:  50.0100646, lng: 20.1751186
  },
  {
    id: "skawina",
    name: "Squash & Padel Skawina",
    address: "Józefa Piłsudskiego 7, 32-050 Skawina",
    link: "https://maps.google.com/?q=Squash+%26+Padel+Skawina",
    doubles: 1, singles: 0, indoor: false,
    lat:  49.9720952, lng: 19.8056069
  },
];

// --- simple client geocoder using Nominatim with localStorage cache ---
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const cacheKey = `geocode:${address}`;
    const cached = typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;
    if (cached) {
      return JSON.parse(cached);
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      address
    )}`;
    const res = await fetch(url, {
      headers: {
        // Nominatim usage policy: identify your app; small volumes like this are fine
        "Accept-Language": "en",
        "Referer": "https://padel-krakow.vercel.app/",
      },
    });
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (data?.length) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      if (typeof window !== "undefined") {
        localStorage.setItem(cacheKey, JSON.stringify(coords));
      }
      return coords;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CourtsPage() {
  const [focusId, setFocusId] = useState<string | null>(null);
  const [courts, setCourts] = useState<(CourtExtended)[]>([]);

  // on mount, ensure we have lat/lng for every item (use existing, or geocode)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const filled: CourtExtended[] = [];
      for (const c of baseCourts) {
        let lat = c.lat as number | undefined;
        let lng = c.lng as number | undefined;
        if (lat == null || lng == null) {
          const geo = await geocodeAddress(c.address);
          if (geo) {
            lat = geo.lat;
            lng = geo.lng;
          }
        }
        // fallback to Kraków center if still missing
        filled.push({
          ...(c as any),
          lat: lat ?? 50.06143,
          lng: lng ?? 19.93658,
        });
      }
      if (!cancelled) setCourts(filled);
    })();
    return () => { cancelled = true; };
  }, []);

  const getFacilityType = (indoor: boolean | "mixed") =>
    indoor === true ? "Indoor" : indoor === false ? "Outdoor" : "Indoor / Outdoor";

  return (
    <div className="px-4 py-10 mx-auto max-w-6xl">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6 text-center">
        📍 Court Locations
      </h2>
      <p className="max-w-2xl text-gray-700 mb-8 leading-relaxed text-center mx-auto">
        Click a club to focus the map. If a pin looks off, we’ll auto-correct it the first time via geocoding.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar list */}
        <aside className="space-y-3 lg:col-span-1">
          {courts.map((c) => (
            <div
              key={c.id}
              className={`p-5 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer ${
                focusId === c.id ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setFocusId(c.id)}
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-amber-700">{c.name}</h3>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 underline text-sm ml-2 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Maps →
                  </a>
                </div>
                <p className="text-gray-600 text-sm">{c.address}</p>
                <div className="text-sm text-gray-700 mt-1">
                  🎾 {c.doubles} Doubles{c.singles ? ` • ${c.singles} Singles` : ""}<br />
                  🏠 {getFacilityType(c.indoor)}
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm">
            Missing a court? <a href="/about" className="underline text-amber-700">Let us know!</a>
          </div>
        </aside>

        {/* Map */}
        <div className="lg:col-span-2">
          <CourtMap courts={courts} focusId={focusId} />
        </div>
      </div>
    </div>
  );
}
