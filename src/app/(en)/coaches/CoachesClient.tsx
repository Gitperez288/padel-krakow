"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, UserCircle2, MapPin, Languages, Search, X } from "lucide-react";

export interface Coach {
  name: string;
  description: string;
  languages: string[];
  location: string;
  instagram: string | null;
  photo: string | null;
}

const ALL_LANGUAGES = [
  "English",
  "Spanish",
  "Polish",
  "Ukrainian",
  "Italian",
  "Portuguese",
  "French",
] as const;

type Language = (typeof ALL_LANGUAGES)[number];

interface Props {
  coaches: Coach[];
}

export default function CoachesClient({ coaches }: Props) {
  const [search, setSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("All");

  // Derive unique locations from the data
  const locations = useMemo(() => {
    const cities = Array.from(new Set(coaches.map((c) => c.location))).sort();
    return ["All", ...cities];
  }, [coaches]);

  const toggleLanguage = (lang: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedLanguages([]);
    setSelectedLocation("All");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedLanguages.length > 0 ||
    selectedLocation !== "All";

  const filtered = useMemo(() => {
    return coaches.filter((coach) => {
      const matchesSearch =
        search.trim() === "" ||
        coach.name.toLowerCase().includes(search.toLowerCase()) ||
        coach.description.toLowerCase().includes(search.toLowerCase());

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.every((lang) => coach.languages.includes(lang));

      const matchesLocation =
        selectedLocation === "All" || coach.location === selectedLocation;

      return matchesSearch && matchesLanguage && matchesLocation;
    });
  }, [coaches, search, selectedLanguages, selectedLocation]);

  return (
    <>
      {/* Filter Panel */}
      <section className="px-4 pb-6">
        <div className="surface max-w-6xl mx-auto space-y-4 p-4 sm:p-5">
          {/* Search + Location row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                aria-label="Search coaches"
                placeholder="Search coaches…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-700"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-700 shrink-0" />
              <select
                aria-label="Coach location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-2 pl-3 pr-8 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-700 bg-white"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Language pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Languages size={16} className="text-orange-700 shrink-0" />
            {ALL_LANGUAGES.map((lang) => {
              const active = selectedLanguages.includes(lang);
              return (
                <button
                  key={lang}
                  aria-pressed={active}
                  onClick={() => toggleLanguage(lang)}
                  className={`min-h-11 px-3 py-2 rounded-lg text-sm font-medium border transition ${
                    active
                      ? "bg-orange-700 text-white border-orange-700"
                      : "bg-white text-gray-600 border-gray-200 hover:border-orange-700"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Coach Cards */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-xl font-semibold mb-2">No coaches found</p>
              <p className="text-sm">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid items-start sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((coach) => (
                <div
                  key={coach.name}
                  className="surface overflow-hidden flex flex-col"
                >
                  {/* Photo */}
                  <div className="relative aspect-square w-full bg-stone-100 flex items-center justify-center overflow-hidden">
                    {coach.photo ? (
                      <Image
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        src={coach.photo}
                        alt={`${coach.name} – Padel Coach`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2
                        className="w-24 h-24 text-stone-500"
                        strokeWidth={1.2}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-grow p-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {coach.name}
                    </h2>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} className="text-stone-500 shrink-0" />
                      <span>{coach.location}</span>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1.5">
                      {coach.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Instagram */}
                    <div className="mt-1">
                      <p className="text-xs text-gray-400 mb-1">Contact via:</p>
                      {coach.instagram ? (
                        <Link
                          href={coach.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-primary w-full break-all"
                        >
                          <Instagram size={16} /> Contact on Instagram
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                          <Instagram size={16} /> Details coming soon
                        </span>
                      )}
                    </div>
                    <details className="group border-t border-stone-200 pt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-stone-900">About {coach.name}</summary>
                      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600">{coach.description}</p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
