import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { remark } from "remark";
import remarkHtml from "remark-html";
import sanitizeHtml from "sanitize-html";
import { SITE_URL } from "@/lib/constants";
import { localizePath, type Locale } from "@/lib/i18n";
import { hasPolishPost } from "@/lib/blog-locales";
import { blogTranslations } from "@/lib/blog-translations";
import { localizedPost, plainText, publicAuthor, jsonLd } from "@/lib/blog-content";
import CommunityCTA from "../CommunityCTA";
const getPost = cache(async (slug: string, locale: Locale) => {
  if (locale === "pl" && !hasPolishPost(slug)) notFound();
  const post = await db.post.findUnique({ where: { slug }, include: { author: { select: { name: true } } } });
  if (!post?.published) notFound();
  return localizedPost(post, locale);
});
export async function blogMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = await getPost(slug, locale);
  const title = plainText(locale === "pl" ? post.title : post.metaTitle || post.title, 120).replace(/(?:\s*[|–-]\s*Padel Krak[oó]w(?: Community)?)+$/i, "");
  const description = plainText(locale === "pl" ? post.excerpt : post.metaDescription || post.excerpt || post.content);
  const url = SITE_URL + localizePath(`/blog/${slug}`, locale);
  const languages = hasPolishPost(slug) ? { en: SITE_URL + `/blog/${slug}`, pl: SITE_URL + `/pl/blog/${slug}`, "x-default": SITE_URL + `/blog/${slug}` } : undefined;
  const image = post.ogImage || post.coverImage || "/og-image.jpg";
  return { title: { absolute: title }, description, alternates: { canonical: url, languages },
    openGraph: { title, description, url, type: "article", locale: locale === "pl" ? "pl_PL" : "en_GB", images: [image], authors: [publicAuthor(slug, post.author.name)], publishedTime: post.publishedAt?.toISOString(), modifiedTime: post.updatedAt.toISOString() },
    twitter: { card: "summary_large_image", title, description, images: [image] } };
}
export default async function BlogPost({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await getPost(slug, locale);
  const sourceHtml = post.content.trimStart().startsWith("<") ? post.content : String(await remark().use(remarkHtml).process(post.content));
  const contentHtml = sanitizeHtml(sourceHtml, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption"],
    allowedAttributes: { a: ["href", "rel", "target"], img: ["src", "alt", "width", "height", "loading"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] },
    transformTags: {
      h1: "h2",
      a: (_tag, attrs) => {
        let href = attrs.href || "";
        if (href.startsWith(SITE_URL + "/")) href = href.slice(SITE_URL.length);
        const internal = href.startsWith("/") && !href.startsWith("//");
        return { tagName: "a", attribs: { href: internal ? localizePath(href, locale) : href, ...(internal ? {} : { rel: "noopener noreferrer", target: "_blank" }) } };
      },
    },
  });
  const author = publicAuthor(slug, post.author.name);
  const historical = slug.startsWith("polish-padel-at-a-crossroads");
  return <div className="mx-auto max-w-3xl px-4 py-12">
    <header className="mb-8"><Link className="font-semibold text-orange-700" href={localizePath("/blog", locale)}>{locale === "pl" ? "← Wszystkie artykuły" : "← Back to Blog"}</Link><h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1><p className="mt-5 text-stone-600">{locale === "pl" ? "Autor:" : "By"} <Link href={localizePath("/who-we-are", locale)} className="underline">{author}</Link>{post.publishedAt && <> · <time dateTime={post.publishedAt.toISOString()}>{post.publishedAt.toLocaleDateString(locale === "pl" ? "pl-PL" : "en-GB", { year: "numeric", month: "long", day: "numeric" })}</time></>}</p>
    {historical && <p className="mt-4 rounded-lg bg-stone-100 p-4 text-sm text-stone-600">{locale === "pl" ? "Artykuł archiwalny z kwietnia 2026. Przed zapisami na turniej sprawdź aktualne zasady u organizatora lub właściwej federacji." : "Archive article from April 2026. Check current entry requirements with the tournament organiser or relevant federation before registering."}</p>}
    {locale === "pl" && <p className="mt-3 text-sm text-stone-500">Tłumaczenie: Padel Kraków Community · <time dateTime={blogTranslations[slug].translatedAt}>5 września 2026</time></p>}</header>
    {post.coverImage && <img src={post.coverImage} alt={post.title} className="mb-8 w-full rounded-xl" />}
    <article className="surface p-5 sm:p-8"><div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} /></article>
    <CommunityCTA locale={locale} />
    <div className="flex flex-wrap gap-4 text-orange-700 underline"><Link href={localizePath("/levels", locale)}>{locale === "pl" ? "Sprawdź swój poziom" : "Find your level"}</Link><Link href={localizePath("/courts", locale)}>{locale === "pl" ? "Korty w Krakowie" : "Courts in Kraków"}</Link></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: plainText(post.excerpt), inLanguage: locale, author: { "@type": "Person", name: author, url: SITE_URL + localizePath("/who-we-are", locale) }, publisher: { "@id": SITE_URL + "/#organization" }, image: new URL(post.ogImage || post.coverImage || "/og-image.jpg", SITE_URL).href, datePublished: post.publishedAt?.toISOString(), dateModified: post.updatedAt.toISOString(), mainEntityOfPage: SITE_URL + localizePath(`/blog/${slug}`, locale) }) }} />
  </div>;
}
