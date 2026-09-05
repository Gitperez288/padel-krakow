import { localizedRoutes } from "@/lib/i18n";
import { hasPolishPost } from "@/lib/blog-locales";
import { blogTranslations } from "@/lib/blog-translations";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = Object.values(localizedRoutes).flatMap(pair =>
    (["en", "pl"] as const).map(locale => ({ url: SITE_URL + (pair[locale] === "/" ? "" : pair[locale]),
      alternates: { languages: { en: SITE_URL + pair.en, pl: SITE_URL + pair.pl, "x-default": SITE_URL + pair.en } } })));
  const posts = await db.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  const articles: MetadataRoute.Sitemap = posts.flatMap(post => {
    const en = SITE_URL + `/blog/${post.slug}`;
    const pl = SITE_URL + `/pl/blog/${post.slug}`;
    if (!hasPolishPost(post.slug)) return [{ url: en, lastModified: post.updatedAt }];
    const alternates = { languages: { en, pl, "x-default": en } };
    return [{ url: en, lastModified: post.updatedAt, alternates }, { url: pl, lastModified: new Date(Math.max(post.updatedAt.getTime(), new Date(blogTranslations[post.slug].translatedAt).getTime())), alternates }];
  });
  return [...staticRoutes, ...articles];
}
