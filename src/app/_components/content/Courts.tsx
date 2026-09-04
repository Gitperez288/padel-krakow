"use client";
import { getTranslator } from "@/lib/translations";
import { localizePath, type Locale } from "@/lib/i18n";
import Image from "next/image";


import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { ChevronRight, MapPin, Building2, Instagram, Globe } from "lucide-react";
import type { Court } from "@/app/_components/CourtMapNew";

const CourtMap = dynamic(() => import("@/app/_components/CourtMapNew"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-2xl shadow bg-gray-100 flex items-center justify-center">
      <span aria-hidden="true">🌍</span>
    </div>
  )
});

import { baseCourts, type CourtExtended } from "@/lib/courts";

// ---------- Helpers ----------
const getInstagramHandle = (url: string): string | null => {
  if (url.includes("/p/")) return null;
  const match = url.match(/instagram\.com\/([^/?#]+)/);
  return match ? `@${match[1]}` : null;
};

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

export default function CourtsPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [courts, setCourts] = useState<CourtExtended[]>(baseCourts);
  const [search, setSearch] = useState("");
  const [filterIndoor, setFilterIndoor] = useState("all");
  const [filterBooking, setFilterBooking] = useState("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const filled: CourtExtended[] = [];
      for (const c of baseCourts) {
        let { lat, lng } = c;
        if (lat == null || lng == null) {
          const geo = await geocodeAddress(c.address);
          if (geo) ({ lat, lng } = geo);
        }
        filled.push({ ...c, lat, lng });
      }
      if (!cancelled) setCourts(filled);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const getFacilityType = (indoor: boolean | "mixed") =>
    indoor === true ? t("Indoor") : indoor === false ? t("Outdoor") : t("Indoor / Outdoor");

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

  const mappedCourts = useMemo(() => filteredCourts.filter(
    (court): court is CourtExtended & Court => Number.isFinite(court.lat) && Number.isFinite(court.lng)
  ), [filteredCourts]);

  const clearFilters = () => {
    setSearch("");
    setFilterIndoor("all");
    setFilterBooking("all");
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-6xl">
      <section id="courts-header" data-testid="courts-header-section">
        <h1 className="text-3xl font-extrabold text-amber-700 mb-4 text-center">{t("📁 Court Locations in Małopolska")}</h1>
        <p className="max-w-2xl text-gray-700 mb-10 leading-relaxed text-center mx-auto">{t("Discover every active padel location in and around Kraków. Use the search and filters below to quickly find courts that suit your needs.")}</p>
      </section>

      {/* ---- FILTER BAR ---- */}
      <section id="courts-filters" data-testid="courts-filters-section" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 shadow-sm">
        <input
          type="text"
          aria-label={t("🔍 Search by name or address...")}
          placeholder={t("🔍 Search by name or address...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
        />

        <div className="flex flex-wrap gap-3 items-center">
          <select
            aria-label={t("All Types")}
            value={filterIndoor}
            onChange={(e) => setFilterIndoor(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
          >
            <option value="all">{t("All Types")}</option>
            <option value="indoor">{t("Indoor")}</option>
            <option value="outdoor">{t("Outdoor")}</option>
            <option value="mixed">{t("Indoor / Outdoor")}</option>
          </select>

          <select
            aria-label={t("All Booking Methods")}
            value={filterBooking}
            onChange={(e) => setFilterBooking(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-amber-400 outline-none"
          >
            <option value="all">{t("All Booking Methods")}</option>
            <option value="tenis4u">Tenis4U</option>
            <option value="twojtenis">TwojTenis</option>
            <option value="padel mates">Padel Mates</option>
            <option value="phone">{t("Phone Call")}</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >{t("Clear")}</button>
        </div>
      </section>

      <div className="space-y-10">
        <section id="courts-catalogue" aria-label={locale === "pl" ? "Kluby padla" : "Padel clubs"} data-testid="courts-sidebar-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.length > 0 ? (
            filteredCourts.map((c, index) => (
              <article
                key={c.id}
                className={`group overflow-hidden rounded-2xl shadow-md transition-shadow border flex flex-col min-w-0
                ${focusId === c.id ? "ring-2 ring-amber-500 bg-amber-50" : "bg-white hover:shadow-lg border-gray-100"}`}
              >
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Image src={c.photo} alt={c.name} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={index < 3} />
                </div>
                <div className="flex flex-col flex-1 gap-2 p-5 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-lg font-bold text-amber-700">{c.name}</h2>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 underline text-sm ml-2 shrink-0 hover:text-amber-600"
                      onClick={(e) => e.stopPropagation()}
                    >{t("Maps →")}</a>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{c.address}</p>
                  <div className="text-sm text-gray-700 mb-2">
                    🎾 {c.doubles}{" "}{t("Doubles")}{c.singles ? ` • ${c.singles} ${locale === "pl" ? "singlowe" : "Singles"}` : ""}
                    <br />🏠 {getFacilityType(c.indoor)}
                  </div>
                  <div className="mt-1 pt-2 border-t border-gray-100 text-sm">
                    <span className="font-semibold text-gray-800">{t("How to Book:")}</span>{" "}
                    <span className="text-gray-700">
                      {getBookingIcon(c.booking)}{" "}
                      {c.bookingUrl ? (
                        <a
                          href={c.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-amber-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t(c.booking)}
                        </a>
                      ) : t(c.booking)}
                    </span>
                  </div>
                  {(c.instagram || c.website) && (
                    <div className="mt-1 text-sm flex items-center gap-1.5">
                      {c.instagram ? (
                        <>
                          <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                          <a
                            href={c.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {getInstagramHandle(c.instagram) ?? t("View on Instagram")}
                          </a>
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                          <a
                            href={c.website ?? ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            squashpadel.pl
                          </a>
                        </>
                      )}
                    </div>
                  )}
                  {typeof c.lat === "number" && typeof c.lng === "number" && (
                    <button type="button" onClick={() => {
                      setFocusId(c.id);
                      document.getElementById("courts-map")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }} className="mt-auto pt-3 text-sm font-semibold text-amber-700 hover:underline text-left focus-visible:outline-amber-600">
                      {locale === "pl" ? "Pokaż na mapie" : "Show on map"}
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full p-6 bg-white rounded-2xl border text-center text-gray-500 shadow-sm">{t("No results found. Try adjusting filters.")}</div>
          )}

        </section>

        {/* ---- MAP ---- */}
        <section id="courts-map" data-testid="courts-map-section" aria-label={locale === "pl" ? "Mapa kortów" : "Court map"} className="overflow-hidden rounded-2xl shadow-md border border-gray-100 scroll-mt-24">
          <CourtMap courts={mappedCourts} focusId={focusId} locale={locale} />
        </section>
      </div>

      {/* ---- CTA: Submit a Court / Club ---- */}
      <section id="courts-cta" data-testid="courts-cta-section" className="mt-16 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="grid md:grid-cols-2">
          {/* Missing a court */}
          <div className="flex flex-col justify-between p-10 border-b md:border-b-0 md:border-r border-white/20">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("Missing a court?")}</h3>
              <p className="text-amber-100 leading-relaxed">{t("Know a padel court in Kraków or Małopolska that isn&apos;t on our map yet? Let us know and we&apos;ll add it right away.")}</p>
            </div>
            <Link
              href={localizePath("/community", locale)}
              className="inline-flex items-center gap-2 self-start bg-white text-amber-700 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition transform hover:scale-105"
            >{t("Tell us about it")}<ChevronRight size={18} />
            </Link>
          </div>

          {/* Club submission */}
          <div className="flex flex-col justify-between p-10">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("Are you a padel club?")}</h3>
              <p className="text-amber-100 leading-relaxed">{t("Want your club featured on this page and reach hundreds of active players in Kraków and Małopolska? Get in touch, we&apos;d love to feature you.")}</p>
            </div>
            <Link
              href={localizePath("/community", locale)}
              className="inline-flex items-center gap-2 self-start bg-white text-amber-700 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition transform hover:scale-105"
            >{t("Get your club listed")}<ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
