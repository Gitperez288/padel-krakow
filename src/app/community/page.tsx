"use client";

import { useEffect, useRef, useState } from "react";

import { revealWhatsAppCommunityLink } from "./actions";

type ClubCommunity = {
  name: string;
  instagramUrl: string;
};

type MainCommunity = {
  name: string;
  desc: string;
};

const mainCommunity: MainCommunity = {
  name: "Padel Kraków & Małopolska Community",
  desc: "Our main regional community; connect with players across Małopolska, find matches, share news, and join events.",
};

const REVEAL_DELAY_MS = 1200;

const clubCommunities: ClubCommunity[] = [
  {
    name: "Ahoj Padel",
    instagramUrl: "https://www.instagram.com/ahoj_padel/",
  },
  {
    name: "SAO Sports Hub",
    instagramUrl: "https://www.instagram.com/saosportshub/",
  },
  {
    name: "Bajada Sports Club",
    instagramUrl: "https://www.instagram.com/bajada_padel_club/",
  },
  {
    name: "Padel House",
    instagramUrl: "https://www.instagram.com/padelhouse_krakow/",
  },
  {
    name: "Garden Padel",
    instagramUrl: "https://www.instagram.com/gardenpadel_krakow/",
  },
];

export default function CommunityPage() {
  const [revealStatus, setRevealStatus] = useState<
    "idle" | "pending" | "revealed" | "error"
  >("idle");
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const revealInProgressRef = useRef(false);
  const revealTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  const reveal = () => {
    if (revealInProgressRef.current) return;

    revealInProgressRef.current = true;
    setRevealStatus("pending");

    revealTimerRef.current = window.setTimeout(async () => {
      try {
        const link = await revealWhatsAppCommunityLink();
        const url = new URL(link);

        if (url.protocol !== "https:" || url.hostname !== "chat.whatsapp.com") {
          throw new Error("Unexpected community link.");
        }

        if (!mountedRef.current) return;

        setWhatsAppUrl(url.toString());
        setRevealStatus("revealed");
      } catch {
        if (!mountedRef.current) return;

        revealInProgressRef.current = false;
        setRevealStatus("error");
      } finally {
        revealTimerRef.current = null;
      }
    }, REVEAL_DELAY_MS);
  };

  return (
    <div className="px-4 py-10 text-center">
      {/* --- Header --- */}
      <section id="community-header" data-testid="community-header-section">
        <h2 className="text-3xl font-extrabold text-amber-700 mb-6">
          💬 Community
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
          Welcome to the hub of the{" "}
          <span className="font-semibold">Padel Kraków & Małopolska</span>{" "}
          community! Join our WhatsApp group to find partners, coordinate
          matches, and stay updated with events in your area. Each club also
          runs its own group; reach out to them directly via Instagram to get
          added.
        </p>
      </section>

      {/* --- Main Community Hero --- */}
      <section
        id="community-main"
        data-testid="community-main-section"
        className="relative max-w-2xl mx-auto mb-16"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
        <div className="relative p-10 bg-gradient-to-br from-amber-50 to-white rounded-3xl border border-amber-200 shadow-xl hover:shadow-2xl transition text-left">
          <h3 className="text-2xl font-bold text-amber-700 mb-2 flex items-center gap-2">
            <span>🌟</span> {mainCommunity.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">WhatsApp Community</p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {mainCommunity.desc}
          </p>
          {revealStatus === "revealed" && whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-block bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-amber-700 transition"
            >
              🔗 Join WhatsApp Community
            </a>
          ) : (
            <button
              type="button"
              onClick={reveal}
              disabled={revealStatus === "pending"}
              aria-busy={revealStatus === "pending"}
              className="inline-block bg-white text-amber-700 font-semibold px-6 py-3 rounded-full border border-amber-400 hover:bg-amber-50 transition disabled:cursor-wait disabled:opacity-70"
            >
              {revealStatus === "pending"
                ? "⏳ Revealing…"
                : revealStatus === "error"
                  ? "⚠️ Try Again"
                  : "👀 Reveal Link"}
            </button>
          )}
          <p className="sr-only" aria-live="polite">
            {revealStatus === "pending" && "Preparing the WhatsApp link."}
            {revealStatus === "revealed" && "WhatsApp link revealed."}
            {revealStatus === "error" &&
              "The link could not be revealed. Please try again."}
          </p>
        </div>
      </section>

      {/* --- Club Communities Grid --- */}
      <section
        id="community-clubs"
        data-testid="community-clubs-section"
        className="max-w-6xl mx-auto mb-16"
      >
        <h3 className="text-2xl font-bold text-amber-700 mb-2">
          🏟️ Club WhatsApp Groups
        </h3>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
          These clubs manage their own WhatsApp communities. To avoid spam, we
          don't publish their links directly; follow each club on Instagram and
          send them a DM to be added to their group.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubCommunities.map(({ name, instagramUrl }) => (
            <div
              key={name}
              className="p-6 rounded-2xl border border-gray-100 bg-white shadow hover:shadow-lg transition text-left flex flex-col"
            >
              <h4 className="text-xl font-bold text-amber-700 mb-1">{name}</h4>
              <p className="text-sm text-gray-500 mb-3">WhatsApp Group via Instagram</p>
              <p className="text-gray-700 mb-5 text-sm leading-relaxed flex-1">
                This club has its own WhatsApp community for players. Follow them on Instagram and send a DM, they&apos;ll be happy to add you!
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- Add Your Club CTA --- */}
      <section
        id="community-add-club"
        data-testid="community-add-club-section"
        className="max-w-2xl mx-auto mb-16 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 shadow"
      >
        <h3 className="text-xl font-bold text-amber-700 mb-3">
          🎾 Is your club missing?
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          If your club runs a WhatsApp community and you'd like to be featured
          here, get in touch with us! We'll add your club to the list so more
          players can find and join your group.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.instagram.com/padelkrkcommunity"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-full shadow hover:opacity-90 transition text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            DM us on Instagram
          </a>
          <a
            href="mailto:padelkrkcommunity@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-semibold px-5 py-2.5 rounded-full border border-amber-400 hover:bg-amber-50 transition text-sm"
          >
            ✉️ Email us
          </a>
        </div>
      </section>

      {/* --- Closing Message --- */}
      <section
        id="community-footer"
        data-testid="community-footer-section"
        className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg"
      >
        <p>
          Thanks to our{" "}
          <span className="font-semibold text-amber-700">
            Padel Kraków & Małopolska Community
          </span>
          , players can connect and organise matches anywhere, from Kraków to
          Niepołomice, Skawina, and beyond. Use these communities to meet new
          partners, schedule games, and grow the sport together. 💪
        </p>
      </section>
    </div>
  );
}
