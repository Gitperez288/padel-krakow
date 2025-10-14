"use client";

import { useState } from "react";

type Group = {
  name: string;
  platform: "WhatsApp" | "Facebook";
  encodedLink?: string;
  desc: string;
  available: boolean;
};

export default function GroupsPage() {
  const groups: Group[] = [
    {
      name: "Padel Kraków & Małopolska Community",
      platform: "WhatsApp",
      encodedLink: "aHR0cHM6Ly9jaGF0LndoYXRzYXBwLmNvbS9MZWRjYTF3ZFN6UzgzbXhtbVlUUnBi", // main community
      desc: "Our main regional group — connect with players across Małopolska, find matches, share news, and join events.",
      available: true,
    },
    {
      name: "Ahoj Padel",
      platform: "WhatsApp",
      desc: "Group for Ahoj Padel players. Awaiting permission from club to publish link.",
      available: false,
    },
    {
      name: "SAO Sports Hub",
      platform: "WhatsApp",
      desc: "Community for SAO Sports Hub padel players. Link will be available soon.",
      available: false,
    },
    {
      name: "Bajada Sports Club",
      platform: "WhatsApp",
      desc: "Bajada Sports community chat — join matches and sessions once approved by club management.",
      available: false,
    },
  ];

  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const reveal = (id: string) => {
    setTimeout(() => {
      setRevealed((prev) => ({ ...prev, [id]: true }));
    }, 1200); // anti-bot delay
  };

  const decodeLink = (encoded?: string) => {
    if (!encoded) return "#";
    try {
      return atob(encoded);
    } catch {
      return "#";
    }
  };

  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">
        💬 Community Groups
      </h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
        Welcome to the hub of the <span className="font-semibold">Padel Kraków & Małopolska</span> community!  
        Join our WhatsApp groups to find partners, coordinate matches, and stay updated with events in your area.  
        To protect against spam bots, click <strong>“Reveal link”</strong> to view the invite.
      </p>

      {/* --- Main Community Hero --- */}
      <div className="relative max-w-2xl mx-auto mb-16">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
        {groups
          .filter((g) => g.name.includes("Padel Kraków"))
          .map(({ name, platform, encodedLink, desc }) => (
            <div
              key={name}
              className="relative p-10 bg-gradient-to-br from-amber-50 to-white rounded-3xl border border-amber-200 shadow-xl hover:shadow-2xl transition text-left"
            >
              <h3 className="text-2xl font-bold text-amber-700 mb-2 flex items-center gap-2">
                <span>🌟</span> {name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{platform}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{desc}</p>

              {revealed[name] ? (
                <a
                  href={decodeLink(encodedLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-amber-700 transition"
                >
                  🔗 Join {platform} Group
                </a>
              ) : (
                <button
                  onClick={() => reveal(name)}
                  className="inline-block bg-white text-amber-700 font-semibold px-6 py-3 rounded-full border border-amber-400 hover:bg-amber-50 transition"
                >
                  👀 Reveal Link
                </button>
              )}
            </div>
          ))}
      </div>

      {/* --- Club Groups Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {groups
          .filter((g) => !g.name.includes("Padel Kraków"))
          .map(({ name, platform, desc, available, encodedLink }) => (
            <div
              key={name}
              className={`p-6 rounded-2xl border shadow transition text-left ${
                available
                  ? "bg-white hover:shadow-lg border-gray-100"
                  : "bg-gray-50 border-gray-200 opacity-80"
              }`}
            >
              <h3 className="text-xl font-bold text-amber-700 mb-1">{name}</h3>
              <p className="text-sm text-gray-500 mb-3">{platform}</p>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{desc}</p>

              {available ? (
                revealed[name] ? (
                  <a
                    href={decodeLink(encodedLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-amber-700 transition text-center w-full"
                  >
                    🔗 Open {platform} Group
                  </a>
                ) : (
                  <button
                    onClick={() => reveal(name)}
                    className="inline-block bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-200 transition w-full"
                  >
                    👀 Reveal Link
                  </button>
                )
              ) : (
                <div className="inline-block bg-gray-100 text-gray-500 font-medium px-4 py-2 rounded-full border border-gray-300 cursor-not-allowed text-center w-full">
                  ⏳ Coming Soon
                </div>
              )}
            </div>
          ))}
      </div>

      {/* --- Closing Message --- */}
      <div className="mt-16 max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
        <p>
          Thanks to our <span className="font-semibold text-amber-700">Padel Kraków & Małopolska Community</span>,
          players can connect and organize matches anywhere — from Kraków to Niepołomice, Skawina, and beyond.  
          Use these groups to meet new partners, schedule games, and grow the sport together. 💪
        </p>
      </div>
    </div>
  );
}
