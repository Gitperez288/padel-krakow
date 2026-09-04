import { localizedRoutes } from "@/lib/i18n";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    {
      url: SITE_URL,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/levels`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/courts`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/community`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/coaches`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sponsors`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/who-we-are`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guidelines`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic blog post routes
  const blogPosts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const translatedRoutes: MetadataRoute.Sitemap = Object.values(localizedRoutes).flatMap(pair =>
    (["en", "pl"] as const).map(locale => ({
      url: SITE_URL + (pair[locale] === "/" ? "" : pair[locale]),
      changeFrequency: "weekly" as const,
      priority: pair.en === "/" ? 1 : 0.8,
      alternates: { languages: { en: SITE_URL + pair.en, pl: SITE_URL + pair.pl, "x-default": SITE_URL + pair.en } },
    }))
  );
  const coreUrls = new Set(translatedRoutes.map(route => route.url));
  return [...translatedRoutes, ...staticRoutes.filter(route => !coreUrls.has(route.url)), ...blogRoutes];
}
