import sanitizeHtml from "sanitize-html";
import { blogTranslations } from "./blog-translations";
import type { Locale } from "./i18n";

export function plainText(value: string | null | undefined, limit = 160): string {
  const text = sanitizeHtml(value || "", { allowedTags: [], allowedAttributes: {}, parser: { decodeEntities: true } })
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  return text.slice(0, limit - 1).replace(/\s+\S*$/, "") + "…";
}
// Scope the legacy byline correction to Fran's known launch article.
export function publicAuthor(slug: string, name: string | null) {
  return slug === "a-new-beginning-for-padel-in-cracow-power-to-the-people" && name === "Admin" ? "Fran" : name || "Padel Kraków Community";
}
export function localizedPost<T extends { slug: string; title: string; excerpt: string | null; content: string }>(post: T, locale: Locale): T {
  const translation = locale === "pl" ? blogTranslations[post.slug] : undefined;
  return translation ? { ...post, title: translation.title, excerpt: translation.excerpt, content: translation.content } : { ...post, excerpt: plainText(post.excerpt || post.content) };
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
