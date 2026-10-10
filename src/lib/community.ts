import type { Locale } from "./i18n";

export const COMMUNITY_MEMBER_COUNT = "1,000+";
export const LEVEL_ORDER = ["D", "C4", "C3", "C2", "C1", "B4", "B3", "B2", "B1", "A4", "A3", "A2", "A1"] as const;

export const numericLevelRanges = {
  D: { en: "Below 1.0", pl: "Poniżej 1.0" },
  "C4–C3": { en: "1.0–2.0", pl: "1.0–2.0" },
  C2: { en: "2.5", pl: "2.5" },
  C1: { en: "3.0", pl: "3.0" },
  "B4–B3": { en: "3.5–4.0", pl: "3.5–4.0" },
  "C1–B3": { en: "3.0–4.0", pl: "3.0–4.0" },
  B2: { en: "4.5", pl: "4.5" },
  B1: { en: "5.0", pl: "5.0" },
  "A4–A1": { en: "5.5–6.0+", pl: "5.5–6.0+" },
} as const;

export const numericReferenceLetters = ["D", "C4–C3", "C2", "C1", "B4–B3", "B2", "B1", "A4–A1"] as const;
export const numericProgression = numericReferenceLetters.map(letter => letter === "D" ? "<1.0" : numericLevelRanges[letter].en);

export const numericLevelAdvice = {
  en: "Numbers are approximate.",
  pl: "Liczby są orientacyjne.",
} as const;

export const numericPostingAdvice = {
  en: "Letters, numbers or both work. For clarity, use both: B2 · ≈4.5.",
  pl: "Możesz użyć liter, liczb lub obu skal. Dla jasności podaj obie: B2 · ≈4.5.",
} as const;

export const languagePolicy = {
  en: "Post in English or Polish, whichever you prefer. Translations are optional.",
  pl: "Pisz po polsku lub po angielsku, jak wolisz. Tłumaczenia są opcjonalne.",
} as const;

export const levelAdvice = {
  en: "Choose based on your usual game. If unsure, start lower. You can join two neighbouring groups; choose matches at your level.",
  pl: "Wybierz poziom na podstawie swojej zwykłej gry. Jeśli nie masz pewności, zacznij niżej. Możesz dołączyć do dwóch sąsiednich grup. Wybieraj mecze na swoim poziomie.",
} as const;

export const matchmakingGroups = [
  {
    id: "beginner",
    name: "🎾 Padel Matchmaking · Beginner & Developing (D–C2)",
    range: "D–C2",
    numericRange: "0–2.5",
    levels: ["D", "C4", "C3", "C2"],
    label: { en: "Beginner & Developing", pl: "Początkujący i rozwijający umiejętności" },
    summary: { en: "Learn the basics and build longer rallies.", pl: "Poznaj podstawy i utrzymuj coraz dłuższe wymiany." },
  },
  {
    id: "intermediate",
    name: "🎾 Padel Matchmaking · Intermediate (C1–B2)",
    range: "C1–B2",
    numericRange: "3.0–4.5",
    levels: ["C1", "B4", "B3", "B2"],
    label: { en: "Intermediate", pl: "Średniozaawansowani" },
    summary: { en: "Build consistency, tactics and teamwork.", pl: "Rozwijaj regularność, taktykę i współpracę." },
  },
  {
    id: "advanced",
    name: "🎾 Padel Matchmaking · Advanced (B1+)",
    range: "B1+",
    numericRange: "5.0+",
    levels: ["B1", "A4", "A3", "A2", "A1"],
    label: { en: "Advanced", pl: "Zaawansowani" },
    summary: { en: "Play demanding rallies with control and tactical awareness.", pl: "Graj wymagające wymiany z kontrolą i świadomą taktyką." },
  },
] as const;

export function matchmakingGroupName(group: { name: string; numericRange: string }) {
  return group.name + " · ≈" + group.numericRange;
}

export const otherCommunityGroups = [
  { name: "Padel Chat", description: { en: "Questions, equipment, training and general padel conversation.", pl: "Pytania, sprzęt, treningi i rozmowy o padlu." } },
  { name: "Club Announcements", description: { en: "Local club events, leagues, tournaments and updates. Keep discussion in Padel Chat.", pl: "Wydarzenia, ligi, turnieje i aktualności klubów. Dyskusje prowadź w Padel Chat." } },
  { name: "Girls Padel Kraków", description: { en: "A space for women to find players and arrange matches. Use the same match template.", pl: "Przestrzeń dla kobiet do poznawania partnerek i umawiania meczów. Korzystaj z tego samego szablonu." } },
  { name: "Padel Market", description: { en: "Buy and sell secondhand padel equipment locally.", pl: "Kupuj i sprzedawaj używany sprzęt do padla w okolicy." } },
] as const;

export const matchTemplate = {
  en: "📅 Day & time:\n📍 Location:\n🎯 Level:\n👥 Players needed:\n⏱️ Duration:\n🏟️ Court booked:",
  pl: "📅 Data i godzina:\n📍 Miejsce:\n🎯 Poziom:\n👥 Brakuje osób:\n⏱️ Czas gry:\n🏟️ Kort zarezerwowany:",
} as const;

export const matchExample = {
  en: "📅 Day & time: 16/10, 19:00\n📍 Location: Błonia Sport\n🎯 Level: B2 · ≈4.5\n👥 Players needed: 2\n⏱️ Duration: 90 min\n🏟️ Court booked: Yes",
  pl: "📅 Data i godzina: 16/10, 19:00\n📍 Miejsce: Błonia Sport\n🎯 Poziom: B2 · ≈4.5\n👥 Brakuje osób: 2\n⏱️ Czas gry: 90 min\n🏟️ Kort zarezerwowany: Tak",
} as const;

export const matchmakingRules: Record<Locale, readonly string[]> = {
  en: [
    "Include the date, time, location, requested level, players needed, duration and court booking status.",
    "Reply to your post with FULL / KOMPLET ✅ when filled.",
    "Confirm attendance and costs. Flag cancellations promptly.",
    "Post in both neighbouring groups only when the requested levels fit both. Update both when filled.",
    "Keep general conversation in Padel Chat. Respect other players.",
  ],
  pl: [
    "Podaj datę, godzinę, miejsce, wymagany poziom, liczbę brakujących osób, czas gry i status rezerwacji kortu.",
    "Po zebraniu kompletu odpowiedz na swoje ogłoszenie: FULL / KOMPLET ✅.",
    "Ustal udział i koszty. O odwołaniu poinformuj jak najszybciej.",
    "Publikuj w obu sąsiednich grupach tylko wtedy, gdy wymagane poziomy pasują do obu. Po zebraniu kompletu zaktualizuj oba ogłoszenia.",
    "Ogólne rozmowy prowadź w Padel Chat. Szanuj innych graczy.",
  ],
};

export const skillStages = [
  {
    id: "new", letter: "D", group: "beginner", title: { en: "New to padel", pl: "Pierwsze kroki" },
    bullets: {
      en: ["Learning rules, scoring and serving.", "Making contact and starting rallies.", "Learning basic court positioning."],
      pl: ["Poznajesz zasady, punktację i serwis.", "Uczysz się trafiać w piłkę i rozpoczynać wymiany.", "Poznajesz podstawowe ustawienie na korcie."],
    },
  },
  {
    id: "beginner", letter: "C4–C3", group: "beginner", title: { en: "Beginner", pl: "Początkujący" },
    bullets: {
      en: ["Developing controlled serves and returns.", "Keeping short rallies going.", "Learning rebounds off the glass and movement with a partner."],
      pl: ["Rozwijasz kontrolę serwisu i returnu.", "Utrzymujesz krótkie wymiany.", "Uczysz się odbić od szyby i poruszania w parze."],
    },
  },
  {
    id: "developing", letter: "C2", group: "beginner", title: { en: "Developing", pl: "Rozwijający umiejętności" },
    bullets: {
      en: ["Keeping moderate-paced rallies going.", "Beginning to use lobs, glass and coordinated positioning.", "Still losing consistency under pressure."],
      pl: ["Utrzymujesz wymiany w umiarkowanym tempie.", "Zaczynasz korzystać z lobów, szyb i wspólnego ustawienia.", "Pod presją nadal tracisz regularność."],
    },
  },
  {
    id: "intermediate", letter: "C1–B3", group: "intermediate", title: { en: "Intermediate", pl: "Średniozaawansowany" },
    bullets: {
      en: ["Controlling direction and building points.", "Improving defence off the glass.", "Moving to the net together at the right moment."],
      pl: ["Kontrolujesz kierunek i budujesz akcje.", "Poprawiasz obronę po szybie.", "Podchodzisz do siatki z partnerem w odpowiednim momencie."],
    },
  },
  {
    id: "strong-intermediate", letter: "B2", group: "intermediate", title: { en: "Strong intermediate", pl: "Mocny średniozaawansowany" },
    bullets: {
      en: ["Maintaining control at higher pace.", "Moving reliably between defence and attack.", "Adapting shots and positioning to opponents."],
      pl: ["Utrzymujesz kontrolę przy wyższym tempie.", "Pewnie przechodzisz między obroną a atakiem.", "Dobierasz uderzenia i ustawienie do rywali."],
    },
  },
  {
    id: "advanced", letter: "B1", group: "advanced", title: { en: "Advanced", pl: "Zaawansowany" },
    bullets: {
      en: ["Sustaining demanding rallies.", "Reliable glass defence, net play and overheads.", "Anticipating play and coordinating tactics under pressure."],
      pl: ["Utrzymujesz wymagające wymiany.", "Pewnie bronisz po szybie, grasz przy siatce i znad głowy.", "Przewidujesz grę i uzgadniasz taktykę z partnerem pod presją."],
    },
  },
  {
    id: "competitive", letter: "A4–A1", group: "advanced", title: { en: "Competitive", pl: "Wysoki poziom rywalizacji" },
    bullets: {
      en: ["Increasingly precise execution at high intensity.", "Strong anticipation against demanding opponents.", "Adapting tactics throughout the match."],
      pl: ["Coraz precyzyjniej wykonujesz uderzenia przy dużej intensywności.", "Dobrze przewidujesz grę wymagających rywali.", "Dostosowujesz taktykę w trakcie meczu."],
    },
  },
] as const;
