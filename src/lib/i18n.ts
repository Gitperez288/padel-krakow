import { hasPolishPost } from "./blog-locales";
export type Locale = "en" | "pl";

export const localizedRoutes = {
  home: { en: "/", pl: "/pl" },
  courts: { en: "/courts", pl: "/pl/korty" },
  community: { en: "/community", pl: "/pl/spolecznosc" },
  coaches: { en: "/coaches", pl: "/pl/trenerzy" },
  blog: { en: "/blog", pl: "/pl/blog" },
  about: { en: "/who-we-are", pl: "/pl/o-nas" },
  sponsors: { en: "/sponsors", pl: "/pl/sponsorzy" },
  guidelines: { en: "/guidelines", pl: "/pl/zasady" },
  privacy: { en: "/privacy", pl: "/pl/prywatnosc" },
  terms: { en: "/terms", pl: "/pl/regulamin" },
  levels: { en: "/levels", pl: "/pl/poziomy" },
} as const;
export type PageKey = keyof typeof localizedRoutes;

export function localizePath(path: string, locale: Locale): string {
  path = path === "/index" ? "/" : path;
  const blogSlug = path.match(/^\/(?:pl\/)?blog\/([^/]+)$/)?.[1];
  if (blogSlug && hasPolishPost(blogSlug)) return `${locale === "pl" ? "/pl" : ""}/blog/${blogSlug}`;
  const pair = Object.values(localizedRoutes).find(pair => pair.en === path || pair.pl === path);
  return pair ? pair[locale] : path;
}
