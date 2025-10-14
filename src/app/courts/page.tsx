"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Court } from "../_components/CourtMap";

const CourtMap = dynamic(() => import("../_components/CourtMap"), { ssr: false });

export default function CourtsPage() {
  const [focusId, setFocusId] = useState<string | null>(null);

  const courts: (Court & {
    doubles: number;
    singles?: number;
    indoor: boolean | "mixed";
  })[] = [
    {
      id: "bajada",
      name: "Bajada Sports Club",
      address: "Tyniecka 215, 30-381 Kraków",
      lat: 50.0276,
      lng: 19.8922,
      link: "https://maps.google.com/?q=Bajada+Sports+Club+Kraków",
      doubles: 2,
      singles: 1,
      indoor: true,
    },
    {
      id: "fame",
      name: "Fame Sports Club",
      address: "Jana Dekerta 21, 30-703 Kraków",
      lat: 50.0413,
      lng: 19.9626,
      link: "https://maps.google.com/?q=Fame+Sports+Club+Kraków",
      doubles: 2,
      singles: 0,
      indoor: "mixed", // 1 indoor, 1 outdoor
    },
    {
      id: "morelowa",
      name: "Morelowa34",
      address: "Morelowa 34, 30-222 Kraków",
      lat: 50.0727,
      lng: 19.8829,
      link: "https://maps.google.com/?q=Morelowa34+Kraków",
      doubles: 2,
      singles: 0,
      indoor: "mixed",
    },
    {
      id: "padelhouse",
      name: "Padel House",
      address: "Rzemieślnicza 20A, 30-363 Kraków",
      lat: 50.0318,
      lng: 19.9206,
      link: "https://maps.google.com/?q=Padel+House+Kraków",
      doubles: 4,
      singles: 0,
      indoor: true,
    },
    {
      id: "gardenpadel",
      name: "Garden Padel",
      address: "Walerego Eljasza-Radzikowskiego 109, 31-342 Kraków",
      lat: 50.0835,
      lng: 19.8958,
      link: "https://maps.google.com/?q=Garden+Padel+Kraków",
      doubles: 4,
      singles: 0,
      indoor: false,
    },
    {
      id: "sao",
      name: "SAO Sports Hub",
      address: "Piastowska 26, 30-065 Kraków",
      lat: 50.0648,
      lng: 19.9054,
      link: "https://maps.google.com/?q=SAO+Sports+Hub+Kraków",
      doubles: 2,
      singles: 0,
      indoor: false,
    },
    {
      id: "ahoj",
      name: "Ahoj Padel",
      address: "Staniątki 703B, 32-005 Niepołomice",
      lat: 50.0116,
      lng: 20.2278,
      link: "https://maps.google.com/?q=Ahoj+Padel+Niepołomice",
      doubles: 6,
      singles: 0,
      indoor: false,
    },
    {
      id: "skawina",
      name: "Squash & Padel Skawina",
      address: "Józefa Piłsudskiego 7, 32-050 Skawina",
      lat: 49.9752,
      lng: 19.8271,
      link: "https://maps.google.com/?q=Squash+and+Padel+Skawina",
      doubles: 1,
      singles: 0,
      indoor: false,
    },
  ];

  const getFacilityType = (indoor: boolean | "mixed") =>
    indoor === true ? "Indoor" : indoor === false ? "Outdoor" : "Indoor / Outdoor";

  return (
    <div className="px-4 py-10 mx-auto max-w-6xl">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6 text-center">
        📍 Court Locations
      </h2>
      <p className="max-w-2xl text-gray-700 mb-8 leading-relaxed text-center mx-auto">
        Explore padel courts in and around Kraków and Małopolska.  
        Click a club to focus it on the map or open its Google Maps link.
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
                  🎾 {c.doubles} Doubles
                  {c.singles ? ` • ${c.singles} Singles` : ""} <br />
                  🏠 {getFacilityType(c.indoor)}
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm">
            Missing a court?{" "}
            <a
              href="/about"
              className="underline text-amber-700"
            >
              Let us know and we’ll add it!
            </a>
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
