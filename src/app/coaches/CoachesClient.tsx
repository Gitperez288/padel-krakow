"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
      <section className="bg-white border-b border-amber-100 py-6 px-4 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto space-y-4">
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
                placeholder="Search coaches…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
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
              <MapPin size={16} className="text-amber-600 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-2 pl-3 pr-8 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
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
            <Languages size={16} className="text-amber-600 shrink-0" />
            {ALL_LANGUAGES.map((lang) => {
              const active = selectedLanguages.includes(lang);
              return (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    active
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-amber-400"
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
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-xl font-semibold mb-2">No coaches found</p>
              <p className="text-sm">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((coach) => (
                <div
                  key={coach.name}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  {/* Photo */}
                  <div className="h-52 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center overflow-hidden">
                    {coach.photo ? (
                      <img
                        src={coach.photo}
                        alt={`${coach.name} – Padel Coach`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2
                        className="w-24 h-24 text-amber-400"
                        strokeWidth={1.2}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-grow p-6 gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {coach.name}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                      {coach.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} className="text-amber-500 shrink-0" />
                      <span>{coach.location}</span>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1.5">
                      {coach.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Instagram */}
                    {coach.instagram ? (
                      <Link
                        href={`https://instagram.com/${coach.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-800 transition text-sm"
                      >
                        <Instagram size={16} />@{coach.instagram}
                      </Link>
                    ) : (
                      <span className="mt-1 inline-flex items-center gap-2 text-gray-400 text-sm">
                        <Instagram size={16} /> Details coming soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* More details coming soon */}
          <div className="mt-14 text-center bg-white rounded-2xl shadow-sm px-8 py-10">
            <p className="text-2xl font-bold text-amber-700 mb-2">
              More details coming soon!
            </p>
            <p className="text-gray-500 max-w-lg mx-auto">
              We&apos;re gathering full profiles, availability, pricing, and
              more for each coach. Check back soon for the full picture.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
