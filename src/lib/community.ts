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

export const numericLevelAdvice = {
  en: "Numbers are approximate equivalents in our community guide, not direct conversions from apps or clubs. They are reference points, not strict decimal cutoffs. If your number falls between them, compare your usual game with the skill descriptions and use the existing advice for neighbouring groups.",
  pl: "Liczby to orientacyjne odpowiedniki w przewodniku naszej społeczności, a nie bezpośredni przelicznik skal aplikacji i klubów. Są punktami odniesienia, a nie ścisłymi granicami dziesiętnymi. Jeśli Twój poziom wypada pomiędzy nimi, porównaj swoją zwykłą grę z opisami umiejętności i skorzystaj z istniejących wskazówek dotyczących sąsiednich grup.",
} as const;

export const numericPostingAdvice = {
  en: "You can also use numbers from our guide. Showing both letters and numbers, for example B2 (≈4.5), helps everyone understand the requested level.",
  pl: "Możesz też używać liczb z naszego przewodnika. Podanie liter i liczb, np. B2 (≈4.5), pomaga wszystkim zrozumieć wymagany poziom.",
} as const;

export const languagePolicy = {
  en: "English and Polish are both welcome. Post in whichever you prefer. Translations are optional, and admins will not police your language choice.",
  pl: "Polski i angielski są mile widziane. Pisz w języku, który wolisz. Tłumaczenia są opcjonalne, a administratorzy nie będą kontrolować wyboru języka.",
} as const;

export const levelAdvice = {
  en: "Assess your usual performance across recent matches, including consistency, decisions and teamwork. These are approximate community levels, not official ratings or direct conversions from apps or clubs. If unsure, start with the lower level. You may join two neighbouring groups, but respond only to matches whose requested level fits your usual game.",
  pl: "Oceń swoją typową grę na podstawie ostatnich meczów, uwzględniając regularność, decyzje i współpracę w parze. To orientacyjne poziomy naszej społeczności, a nie oficjalny ranking ani bezpośredni przelicznik skal aplikacji i klubów. Jeśli nie masz pewności, zacznij od niższego poziomu. Możesz dołączyć do dwóch sąsiednich grup, ale zgłaszaj się tylko do meczów, których wymagany poziom odpowiada Twojej zwykłej grze.",
} as const;

export const matchmakingGroups = [
  {
    id: "beginner",
    name: "🎾 Padel Matchmaking · Beginner & Developing (D–C2)",
    range: "D–C2",
    numericRange: "0–2.5",
    levels: ["D", "C4", "C3", "C2"],
    label: { en: "Beginner & Developing", pl: "Początkujący i rozwijający umiejętności" },
    summary: {
      en: "New players and developing players: learn the basics, build controlled rallies and begin using the glass, lobs and coordinated positioning.",
      pl: "Dla początkujących i osób rozwijających umiejętności: nauka podstaw, kontrolowanych wymian oraz gry po szybie, lobów i wspólnego ustawienia.",
    },
  },
  {
    id: "intermediate",
    name: "🎾 Padel Matchmaking · Intermediate (C1–B2)",
    range: "C1–B2",
    numericRange: "3.0–4.5",
    levels: ["C1", "B4", "B3", "B2"],
    label: { en: "Intermediate", pl: "Średniozaawansowani" },
    summary: {
      en: "Regular players building consistency, directional control and teamwork, through to strong intermediate play at higher pace and under pressure.",
      pl: "Dla regularnie grających osób rozwijających powtarzalność, kontrolę kierunku i współpracę, aż po mocną grę średniozaawansowaną przy wyższym tempie i pod presją.",
    },
  },
  {
    id: "advanced",
    name: "🎾 Padel Matchmaking · Advanced (B1+)",
    range: "B1+",
    numericRange: "5.0+",
    levels: ["B1", "A4", "A3", "A2", "A1"],
    label: { en: "Advanced", pl: "Zaawansowani" },
    summary: {
      en: "Advanced and competitive players with reliable glass defence, net play, overheads and coordinated tactics in demanding rallies. B1+ means B1 and all A levels.",
      pl: "Dla zaawansowanych graczy: pewna obrona po szybie, gra przy siatce, uderzenia znad głowy i wspólna taktyka w wymagających wymianach. B1+ oznacza B1 oraz wszystkie poziomy A.",
    },
  },
] as const;

export function matchmakingGroupName(group: { name: string; numericRange: string }) {
  return group.name + " · ≈" + group.numericRange;
}

export const otherCommunityGroups = [
  { name: "Padel Chat", description: { en: "Questions, equipment, training and general padel conversation.", pl: "Pytania, sprzęt, treningi i rozmowy o padlu." } },
  { name: "Club Announcements", description: { en: "Local club events, leagues, tournaments and updates. Keep discussion in Padel Chat.", pl: "Wydarzenia, ligi, turnieje i aktualności klubów. Dyskusje prowadź w Padel Chat." } },
  { name: "Girls Padel Kraków", description: { en: "A dedicated space for women to meet players and organise games. Use the same match template and requested letter levels.", pl: "Przestrzeń dla kobiet do poznawania partnerek i umawiania gier. Używaj tego samego szablonu meczu i podawaj wymagany poziom literowy." } },
  { name: "Padel Market", description: { en: "Buy and sell secondhand padel equipment locally.", pl: "Kupuj i sprzedawaj używany sprzęt do padla w okolicy." } },
] as const;

export const matchTemplate = {
  en: "[DD/MM] | [time] | [club] | [letter level/range] ([≈numeric level/range]) | Need [number] players | [duration] min | Court [booked / to book]",
  pl: "[DD/MM] | [godzina] | [klub] | [poziom/zakres literowy] ([≈poziom/zakres liczbowy]) | Brakuje [liczba] osób | [czas] min | Kort [zarezerwowany / do rezerwacji]",
} as const;

export const matchExample = {
  en: `16/10 | 19:00 | Błonia Sport | B4–B3 (≈${numericLevelRanges["B4–B3"].en}) | Need 2 players | 90 min | Court booked ✅`,
  pl: `16/10 | 19:00 | Błonia Sport | B4–B3 (≈${numericLevelRanges["B4–B3"].pl}) | Brakuje 2 osób | 90 min | Kort zarezerwowany ✅`,
} as const;

export const matchmakingRules: Record<Locale, readonly string[]> = {
  en: [
    "Include date, time, club, requested letter level or range, players needed, duration and booking status in every match post.",
    "Reply to your original post with FULL / KOMPLET ✅ when the match is filled.",
    "Confirm participation, costs and cancellations clearly. If a reservation is cancelled, let the group know promptly.",
    "Cross-post only to a neighbouring group when the requested level genuinely spans both groups. Update both posts when filled.",
    "Keep general conversation in Padel Chat. Be respectful of every player's level and background.",
  ],
  pl: [
    "W każdym ogłoszeniu podaj datę, godzinę, klub, wymagany poziom lub zakres literowy, liczbę brakujących osób, czas gry i status rezerwacji.",
    "Gdy zbierzesz komplet, odpowiedz na swoje ogłoszenie: FULL / KOMPLET ✅.",
    "Jasno ustal uczestnictwo, koszty i odwołania. O odwołanej rezerwacji poinformuj grupę jak najszybciej.",
    "Publikuj w sąsiedniej grupie tylko wtedy, gdy wymagany zakres poziomów obejmuje obie grupy. Po zebraniu kompletu zaktualizuj oba ogłoszenia.",
    "Ogólne rozmowy prowadź w Padel Chat. Szanuj innych graczy niezależnie od poziomu i pochodzenia.",
  ],
};

export const skillStages = [
  { id: "new", letter: "D", group: "beginner", title: { en: "New to padel", pl: "Pierwsze kroki" }, description: { en: "Learning rules, scoring, serving and basic positioning. Focus on making contact, starting points and understanding where to stand.", pl: "Poznajesz zasady, punktację, serwis i podstawowe ustawienie. Uczysz się trafiać w piłkę, rozpoczynać wymiany i zajmować odpowiednie miejsce na korcie." } },
  { id: "beginner", letter: "C4–C3", group: "beginner", title: { en: "Beginner", pl: "Początkujący" }, description: { en: "Developing controlled serves and returns and keeping short rallies going. Learning how the glass affects the ball and how to move with a partner.", pl: "Rozwijasz kontrolę serwisu i returnu oraz utrzymujesz krótkie wymiany. Uczysz się zachowania piłki po odbiciu od szyby i poruszania w parze." } },
  { id: "developing", letter: "C2", group: "beginner", title: { en: "Developing", pl: "Rozwijający umiejętności" }, description: { en: "Keeping moderate-paced rallies going and beginning to use lobs, glass and coordinated positioning. Consistency still drops under pressure.", pl: "Utrzymujesz wymiany w umiarkowanym tempie i zaczynasz korzystać z lobów, szyb oraz wspólnego ustawienia. Pod presją regularność nadal spada." } },
  { id: "intermediate", letter: "C1–B3", group: "intermediate", title: { en: "Intermediate", pl: "Średniozaawansowany" }, description: { en: "Increasing consistency, directional control and teamwork. Building points, improving glass defence and choosing when to approach the net with a partner.", pl: "Zwiększasz regularność, kontrolę kierunku i współpracę. Budujesz akcje, poprawiasz obronę po szybie i dobierasz moment podejścia do siatki razem z partnerem." } },
  { id: "strong-intermediate", letter: "B2", group: "intermediate", title: { en: "Strong intermediate", pl: "Mocny średniozaawansowany" }, description: { en: "Maintaining control at higher pace and using tactics and transitions more reliably under pressure. Adapting shot selection and positioning to opponents.", pl: "Utrzymujesz kontrolę przy wyższym tempie i pewniej stosujesz taktykę oraz przejścia między obroną a atakiem pod presją. Dobierasz uderzenia i ustawienie do rywali." } },
  { id: "advanced", letter: "B1", group: "advanced", title: { en: "Advanced", pl: "Zaawansowany" }, description: { en: "Sustaining demanding rallies with reliable glass defence, net play, overheads and coordinated tactics. Combining consistency, anticipation and good decisions against strong opponents.", pl: "Utrzymujesz wymagające wymiany dzięki pewnej obronie po szybie, grze przy siatce, uderzeniom znad głowy i wspólnej taktyce. Łączysz regularność, przewidywanie i trafne decyzje przeciwko mocnym rywalom." } },
  { id: "competitive", letter: "A4–A1", group: "advanced", title: { en: "Competitive", pl: "Wysoki poziom rywalizacji" }, description: { en: "Increasingly strong execution, anticipation and tactical adaptability against strong opponents, progressing from A4 to A1. Tournament participation or a particular smash alone does not establish your level.", pl: "Coraz skuteczniejsze wykonanie uderzeń, przewidywanie i dostosowywanie taktyki przeciwko mocnym rywalom, od A4 do A1. Sam udział w turniejach lub wykonanie konkretnego smecza nie określa poziomu." } },
] as const;
