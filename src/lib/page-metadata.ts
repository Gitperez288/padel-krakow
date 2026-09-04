import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { localizedRoutes, type Locale, type PageKey } from "./i18n";

const copy = {
  home: {
    en: ["Padel Kraków Community: Courts & Players", "Find padel courts in Kraków and Małopolska, assess your playing level and meet local players in our WhatsApp community."],
    pl: ["Padel Kraków: korty i społeczność graczy", "Znajdź korty do padla w Krakowie i Małopolsce, sprawdź swój poziom i poznaj osoby do gry. Dołącz do społeczności na WhatsAppie."],
  },
  courts: {
    en: ["Padel Courts in Kraków & Małopolska", "Compare padel courts in Kraków and Małopolska. Check addresses, indoor and outdoor facilities, court counts and booking options."],
    pl: ["Korty do padla w Krakowie i Małopolsce", "Gdzie grać w padla w Krakowie? Porównaj korty, adresy, hale i obiekty na zewnątrz. Sprawdź sposoby rezerwacji w Krakowie i Małopolsce."],
  },
  community: {
    en: ["Find Padel Players in Kraków: Community", "Find partners for padel in Kraków and Małopolska. Join our WhatsApp community, arrange matches and connect with local club groups."],
    pl: ["Znajdź osoby do padla w Krakowie: społeczność", "Szukasz osób do gry w padla w Krakowie? Dołącz do społeczności na WhatsAppie, umawiaj mecze i poznaj lokalne grupy klubowe."],
  },
  levels: {
    en: ["Padel Playing Levels: Find Your Level", "Assess your padel level with practical descriptions of skills, positioning and teamwork. Find compatible players in Kraków."],
    pl: ["Poziomy gry w padla: sprawdź swój poziom", "Jak określić swój poziom w padlu? Porównaj umiejętności, ustawienie i współpracę w parze, aby łatwiej znaleźć osoby do wspólnej gry."],
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
