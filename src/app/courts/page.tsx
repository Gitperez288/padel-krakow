// app/courts/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

type Court = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  link: string;
};

const CourtMap = dynamic(() => import("@/components/CourtMap"), { ssr: false });

export default function CourtsPage() {
  const [focusId, setFocusId] = useState<string | null>(null);

  const courts: Court[] = [
    { id: "padel4u", name: "Padel4U Kraków", address: "ul. Centralna 41, Kraków", lat: 50.0686, lng: 20.0137, link: "https://maps.google.com/?q=Padel4U+Kraków" },
    { id: "kpc", name: "Kraków Padel Club", address: "ul. Półłanki 60, Kraków", lat: 50.0111, lng: 20.0392, link: "https://maps.google.com/?q=Kraków+Padel+Club" },
    { id: "modlniczka", name: "Sport Park Modlniczka", address: "Krakowska 85, Modlniczka", lat: 50.1175, lng: 19.8668, link: "https://maps.google.com/?q=Sport+Park+Modlniczka" },
    { id: "tarnow", name: "Arena Padel Tarnów", address: "ul. Przemysłowa 3, Tarnów", lat: 50.0174, lng: 20.9927, link: "https://maps.google.com/?q=Arena+Padel+Tarnów" },
  ];

  return (
    <div className="px-4 py-10 mx-auto max-w-6xl">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6 text-center">📍 Court Locations</h2>
      <p className="max-w-2xl text-gray-700 mb-8 leading-relaxed text-center mx-auto">
        Click a court on the list to focus the map or open it in Google Maps.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar list */}
        <aside className="space-y-3 lg:col-span-1">
          {courts.map((c) => (
            <div
              key={c.id}
              className={`p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer ${
                focusId === c.id ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setFocusId(c.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-amber-700">{c.name}</h3>
                  <p className="text-gray-600 text-sm">{c.address}</p>
                </div>
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-sm" onClick={(e)=>e.stopPropagation()}>
                  Maps →
                </a>
              </div>
            </div>
          ))}
        </aside>

        {/* Map */}
        <div className="lg:col-span-2">
          <CourtMap courts={courts} focusId={focusId} />
        </div>
      </div>
    </div>
  );
}
