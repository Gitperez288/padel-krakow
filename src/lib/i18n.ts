export type Locale = "en" | "pl";

export const localizedRoutes = {
  home: { en: "/", pl: "/pl" },
  courts: { en: "/courts", pl: "/pl/korty" },
  community: { en: "/community", pl: "/pl/spolecznosc" },
  levels: { en: "/levels", pl: "/pl/poziomy" },
} as const;
export type PageKey = keyof typeof localizedRoutes;

export function localizePath(path: string, locale: Locale): string {
  const pair = Object.values(localizedRoutes).find(pair => pair.en === path || pair.pl === path);
  return pair ? pair[locale] : path;
}
