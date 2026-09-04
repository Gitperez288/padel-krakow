"use client";
import { getTranslator } from "@/lib/translations";
import { localizePath, type Locale } from "@/lib/i18n";
import Image from "next/image";
import NextSteps from "@/app/_components/NextSteps";


import { useEffect, useRef, useState } from "react";

import { revealWhatsAppCommunityLink } from "@/app/(en)/community/actions";

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

export default function CommunityPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
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
      <section id="community-header" data-testid="community-header-section" className="mx-auto mb-8 max-w-6xl text-left">
        <p className="eyebrow mb-3">Padel Kraków & Małopolska</p>
        <h1 className="page-heading mb-4">{t("Find your people")}</h1>
        <p className="text-stone-600">{t("Find partners, arrange matches and join local padel events.")}</p>
      </section>

      {/* --- Main Community Hero --- */}
      <section
        id="community-main"
        data-testid="community-main-section"
        className="relative max-w-6xl mx-auto mb-8"
      >
        <div className="surface relative p-6 sm:p-10 text-left">
          <div className="mb-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <Image src="/dragon-logo.png" alt={t("Padel Kraków community dragon mascot")} width={160} height={160} sizes="160px" className="h-32 w-32 shrink-0 rounded-2xl object-contain sm:h-40 sm:w-40" priority/>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2 sm:text-3xl">{mainCommunity.name}</h2>
              <p className="text-sm text-gray-600">{t("WhatsApp Community")}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {t(mainCommunity.desc)}
          </p>
          {revealStatus === "revealed" && whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="button-primary"
            >{t("🔗 Join WhatsApp Community")}</a>
          ) : (
            <button
              type="button"
              onClick={reveal}
              disabled={revealStatus === "pending"}
              aria-busy={revealStatus === "pending"}
              className="button-primary"
            >
              {revealStatus === "pending"
                ? t("⏳ Revealing…")
                : revealStatus === "error"
                  ? t("⚠️ Try Again")
                  : t("👀 Reveal Link")}
            </button>
          )}
          <p className="sr-only" aria-live="polite">
            {revealStatus === "pending" && t("Preparing the WhatsApp link.")}
            {revealStatus === "revealed" && t("WhatsApp link revealed.")}
            {revealStatus === "error" &&
              t("The link could not be revealed. Please try again.")}
          </p>
        </div>
      </section>

      <NextSteps locale={locale} page="community" />

      {/* --- Club Communities Grid --- */}
      <section
        id="community-clubs"
        data-testid="community-clubs-section"
        className="max-w-6xl mx-auto mb-12 text-left"
      >
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{t("Club WhatsApp groups")}</h2>
        <p className="text-stone-600 mb-6 text-sm leading-relaxed">{t("Message a club on Instagram to join its player group.")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clubCommunities.map(({ name, instagramUrl }) => (
            <div
              key={name}
              className="surface p-6 text-left flex flex-col items-start"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-1">{name}</h3>
              <p className="text-sm text-gray-500 mb-3">{t("WhatsApp Group via Instagram")}</p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>{t("Follow on Instagram")}</a>
            </div>
          ))}
        </div>
      </section>

      {/* --- Add Your Club CTA --- */}
      <section
        id="community-add-club"
        data-testid="community-add-club-section"
        className="surface max-w-6xl mx-auto p-6 sm:p-8 text-left"
      >
        <h3 className="text-xl font-bold text-stone-900 mb-3">{t("Is your club missing?")}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">{t("If your club runs a WhatsApp community and you'd like to be featured here, get in touch with us! We'll add your club to the list so more players can find and join your group.")}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://www.instagram.com/padelkrkcommunity"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>{t("DM us on Instagram")}</a>
          <a
            href="mailto:padelkrkcommunity@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 font-semibold px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 transition text-sm"
          >{t("✉️ Email us")}</a>
        </div>
      </section>

    </div>
  );
}
