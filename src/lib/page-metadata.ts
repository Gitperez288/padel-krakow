import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { localizedRoutes, type Locale, type PageKey } from "./i18n";

const copy = {
  coaches: {"en": ["Padel Coaches in Kraków", "Find a local padel coach. Compare coaching languages and contact coaches directly for lessons in Kraków."], "pl": ["Trenerzy padla w Krakowie", "Znajdź trenera padla w Krakowie. Porównaj języki treningów i skontaktuj się bezpośrednio w sprawie lekcji."]},
  blog: {"en": ["Padel Kraków: Local Guides and Community News", "Practical guides and stories for padel players in Kraków and Małopolska. Find your level, courts and people to play with."], "pl": ["Padel Kraków: poradniki i aktualności społeczności", "Praktyczne poradniki i historie dla graczy padla w Krakowie i Małopolsce. Poznaj swój poziom, korty i osoby do gry."]},
  about: {"en": ["About the Padel Kraków Community", "Meet Fran, Carlos and Gabriele, the people behind our local padel community in Kraków and Małopolska."], "pl": ["O społeczności Padel Kraków", "Poznaj Frana, Carlosa i Gabriele, osoby tworzące lokalną społeczność padla w Krakowie i Małopolsce."]},
  sponsors: {"en": ["Padel Kraków Community Sponsors", "Meet our community partners and explore offers for Padel Kraków members."], "pl": ["Sponsorzy społeczności Padel Kraków", "Poznaj partnerów naszej społeczności i oferty dla członków Padel Kraków."]},
  guidelines: {"en": ["Padel Kraków Community Guidelines", "Our WhatsApp subgroup rules. Polish and English are welcome. Help keep local padel friendly and inclusive."], "pl": ["Zasady społeczności Padel Kraków", "Zasady naszych grup na WhatsAppie. Polski i angielski są mile widziane. Twórz z nami przyjazną społeczność padla."]},
  privacy: {"en": ["Privacy Policy | Padel Kraków", "How the Padel Kraków Community website handles data and aggregate usage measurement."], "pl": ["Polityka prywatności | Padel Kraków", "Informacje o danych i zbiorczych pomiarach korzystania ze strony społeczności Padel Kraków."]},
  terms: {"en": ["Terms of Service | Padel Kraków", "Terms for using the free Padel Kraków Community website."], "pl": ["Regulamin | Padel Kraków", "Warunki korzystania z bezpłatnej strony społeczności Padel Kraków."]},

  home: {
    en: ["Padel Kraków Community: Courts & Players", "Find padel courts and players in Kraków and Małopolska. Join free WhatsApp matchmaking by level. English and Polish are both welcome."],
    pl: ["Padel Kraków: korty i społeczność graczy", "Znajdź korty i osoby do padla w Krakowie i Małopolsce. Dołącz bezpłatnie do grup WhatsApp według poziomu. Polski i angielski mile widziane."],
  },
  courts: {
    en: ["Padel Courts in Kraków & Małopolska", "Compare padel courts in Kraków and Małopolska. Check addresses, indoor and outdoor facilities, court counts and booking options."],
    pl: ["Korty do padla w Krakowie i Małopolsce", "Gdzie grać w padla w Krakowie? Porównaj korty, adresy, hale i obiekty na zewnątrz. Sprawdź sposoby rezerwacji w Krakowie i Małopolsce."],
  },
  community: {
    en: ["Padel Kraków WhatsApp Community | Find Players", "Find padel players in Kraków. Join our free WhatsApp community and choose matchmaking by level: D–C2, C1–B2 or B1+. English and Polish welcome."],
    pl: ["Padel Kraków: grupa WhatsApp i osoby do gry", "Znajdź osoby do padla w Krakowie. Dołącz bezpłatnie na WhatsAppie i wybierz grupę: D–C2, C1–B2 lub B1+. Polski i angielski mile widziane."],
  },
  levels: {
    en: ["Padel Playing Levels: Find Your Level", "Find your community letter level and choose Beginner & Developing (D–C2), Intermediate (C1–B2) or Advanced (B1+) matchmaking in Kraków."],
    pl: ["Poziomy gry w padla: sprawdź swój poziom", "Sprawdź swój poziom literowy i wybierz grupę do gry w Krakowie: początkujący (D–C2), średniozaawansowani (C1–B2) lub zaawansowani (B1+)."],
  },
} as const;

export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const [title, description] = copy[page][locale];
  const routes = localizedRoutes[page];
  const url = SITE_URL + (routes[locale] === "/" ? "" : routes[locale]);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: { en: SITE_URL + routes.en, pl: SITE_URL + routes.pl, "x-default": SITE_URL + routes.en } },
    openGraph: { title, description, url, type: "website", siteName: "Padel Kraków Community", locale: locale === "pl" ? "pl_PL" : "en_GB", alternateLocale: locale === "pl" ? "en_GB" : "pl_PL", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Padel Kraków Community" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}
