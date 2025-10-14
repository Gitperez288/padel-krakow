"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import type { Court } from "../_components/CourtMap";

const CourtMap = dynamic(() => import("../_components/CourtMap"), { ssr: false });

type CourtExtended = Court & {
  doubles: number;
  singles?: number;
  indoor: boolean | "mixed";
  booking: string;
};

// ---------- COURT DATA ----------
const baseCourts: (Omit<CourtExtended, "lat" | "lng"> & Partial<Court>)[] = [
  { id: "bajada", name: "Bajada Sports Club", address: "Tyniecka 215, 30-381 Kraków",
    link: "https://maps.google.com/?q=Bajada+Sports+Club+Kraków",
    doubles: 2, singles: 1, indoor: true, lat: 50.0251188, lng: 19.8333971,
    booking: "Reservise App" },
  { id: "fame", name: "Fame Sports Club", address: "Jana Dekerta 21, 30-703 Kraków",
    link: "https://maps.google.com/?q=Fame+Sports+Club+Kraków",
    doubles: 2, indoor: "mixed", lat: 50.0467165, lng: 19.9649943,
    booking: "Tenis4U App" },
  { id: "morelowa", name: "Morelowa34", address: "Morelowa 34, 30-222 Kraków",
    link: "https://maps.google.com/?q=Morelowa34+Kraków",
    doubles: 2, indoor: "mixed", lat: 50.0703146, lng: 19.8656325,
    booking: "Tenis4U App" },
  { id: "padelhouse", name: "Padel House", address: "Rzemieślnicza 20A, 30-363 Kraków",
    link: "https://maps.google.com/?q=Padel+House+Kraków",
    doubles: 4, indoor: true, lat: 50.0323975, lng: 19.9331454,
    booking: "Tenis4U App" },
  { id: "gardenpadel", name: "Garden Padel", address: "Walerego Eljasza-Radzikowskiego 109, 31-342 Kraków",
    link: "https://maps.google.com/?q=Garden+Padel+Kraków",
    doubles: 4, indoor: false, lat: 50.0858436, lng: 19.8843225,
    booking: "Tenis4U App" },
  { id: "sao", name: "SAO Sports Hub", address: "Piastowska 26, 30-065 Kraków",
    link: "https://maps.google.com/?q=SAO+Sports+Hub+Kraków",
    doubles: 2, indoor: false, lat: 50.0660441, lng: 19.8998069,
    booking: "Tenis4U App" },
  { id: "ahoj", name: "Ahoj Padel", address: "Staniątki 703B, 32-005 Niepołomice",
    link: "https://maps.google.com/?q=Ahoj+Padel+Niepołomice",
    doubles: 6, indoor: false, lat: 50.0100646, lng: 20.1751186,
    booking: "Padel Mates App" },
  { id: "skawina", name: "Squash & Padel Skawina", address: "Józefa Piłsudskiego 7, 32-050 Skawina",
    link: "https://maps.google.com/?q=Squash+%26+Padel+Skawina",
    doubles: 1, indoor: false, lat: 49.9720952, lng: 19.8056069,
    booking: "Phone Call" },
];

// ---------- Optional fallback geocoder ----------
async function geocodeAddress(address: string) {
  try {
    const cacheKey = `geocode:${address}`;
    const cached = typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;
    if (cached) return JSON.parse(cached);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`,
      { headers: { "Accept-Language": "en", Referer: "https://padel-krakow.vercel.app/" } }
    );
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (data?.length) {
      const coords = { lat: +data[0].lat, lng: +data[0].lon };
      if (typeof window !== "undefined") localStorage.setItem(cacheKey, JSON.stringify(coords));
      return coords;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CourtsPage() {
  const [focusId, setFocusId] = useState<string | null>(null);
  const [courts, setCourts] = useState<CourtExtended[]>([]);
  const [search, setSearch] = useState("");
  const [filterIndoor, setFilterIndoor] = useState("all");
  const [filterBooking, setFilterBooking] = useState("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const filled: CourtExtended[] = [];
      for (const c of baseCourts) {
        let { lat, lng } = c as any;
        if (lat == null || lng == null) {
          const geo = await geocodeAddress(c.address);
          if (geo) ({ lat, lng } = geo);
        }
        filled.push({ ...(c as any), lat: lat ?? 50.06143, lng: lng ?? 19.93658 });
      }
      if (!cancelled) setCourts(filled);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const getFacilityType = (indoor: boolean | "mixed") =>
    indoor === true ? "Indoor" : indoor === false ? "Outdoor" : "Indoor / Outdoor";

  const getBookingIcon = (method: string) =>
    method.toLowerCase().includes("app") ? "📱" : method.toLowerCase().includes("phone") ? "☎️" : "🎾";

  // ---------- FILTERED RESULTS ----------
  const filteredCourts = useMemo(() => {
    return courts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase());
      const matchesIndoor =
        filterIndoor === "all"
          ? true
          : filterIndoor === "indoor"
          ? c.indoor === true
          : filterIndoor === "outdoor"
          ? c.indoor === false
          : c.indoor === "mixed";
      const matchesBooking =
        filterBooking === "all" ? true : c.booking.toLowerCase().includes(filterBooking.toLowerCase());
      return matchesSearch && matchesIndoor && matchesBooking;
    });
  }, [courts, search, filterIndoor, filterBooking]);

  const clearFilters = () => {
    setSearch("");
    setFilterIndoor("all");
    setFilterBooking("all");
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-6xl">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-4 text-center">
        📍 Court Locations in Małopolska
      </h2>
      <p className="max-w-2xl text-gray-700 mb-10 leading-relaxed text-center mx-auto">
        Discover every active padel location in and around Kraków.  
        Use the search and filters below to quickly find courts that suit your needs.
      </p>

      {/* ---- FILTER BAR ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 shadow-sm">
        <input
          type="text"
          placeholder="🔍 Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
        />

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={filterIndoor}
            onChange={(e) => setFilterIndoor(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
          >
            <option value="all">All Types</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="mixed">Indoor / Outdoor</option>
          </select>

          <select
            value={filterBooking}
            onChange={(e) => setFilterBooking(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
          >
            <option value="all">All Booking Methods</option>
            <option value="reservise">Reservise</option>
            <option value="tenis4u">Tenis4U</option>
            <option value="padel mates">Padel Mates</option>
            <option value="phone">Phone Call</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ---- SIDEBAR LIST ---- */}
        <aside className="space-y-4 lg:col-span-1">
          {filteredCourts.length > 0 ? (
            filteredCourts.map((c) => (
              <div
                key={c.id}
                className={`group p-5 rounded-2xl shadow-md transition-all duration-300 border cursor-pointer 
                ${focusId === c.id ? "ring-2 ring-amber-500 bg-amber-50" : "bg-white hover:shadow-lg border-gray-100"}`}
                onClick={() => setFocusId(c.id)}
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-amber-700">{c.name}</h3>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 underline text-sm ml-2 shrink-0 hover:text-amber-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Maps →
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{c.address}</p>
                  <div className="text-sm text-gray-700 mb-2">
                    🎾 {c.doubles} Doubles{c.singles ? ` • ${c.singles} Singles` : ""}  
                    <br />🏠 {getFacilityType(c.indoor)}
                  </div>
                  <div className="mt-1 pt-2 border-t border-gray-100 text-sm">
                    <span className="font-semibold text-gray-800">How to Book:</span>{" "}
                    <span className="text-gray-700">
                      {getBookingIcon(c.booking)} {c.booking}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 bg-white rounded-2xl border text-center text-gray-500 shadow-sm">
              No results found. Try adjusting filters.
            </div>
          )}

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm text-gray-700">
            Missing a court?{" "}
            <a href="/about" className="underline text-amber-700 hover:text-amber-800">
              Let us know!
            </a>
          </div>
        </aside>

        {/* ---- MAP ---- */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl shadow-md border border-gray-100">
          <CourtMap courts={filteredCourts} focusId={focusId} />
        </div>
      </div>
    </div>
  );
}
