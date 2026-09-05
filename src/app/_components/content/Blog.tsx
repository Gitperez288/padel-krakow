import Link from "next/link";
import { db } from "@/lib/db";
import { localizePath, type Locale } from "@/lib/i18n";
import { hasPolishPost } from "@/lib/blog-locales";
import { localizedPost, publicAuthor } from "@/lib/blog-content";
import CommunityCTA from "../CommunityCTA";
export default async function Blog({ locale }: { locale: Locale }) {
  const all = await db.post.findMany({ where: { published: true }, include: { author: { select: { name: true } } }, orderBy: { publishedAt: "desc" } });
  const posts = all.filter(post => locale === "en" || hasPolishPost(post.slug)).map(post => localizedPost(post, locale));
  return <div className="mx-auto max-w-4xl px-4 py-12">
    <section id="blog-header" data-testid="blog-header-section" className="mb-8"><p className="eyebrow mb-3">Padel Kraków</p><h1 className="page-heading">{locale === "pl" ? "Poradniki i historie społeczności" : "Local guides and community stories"}</h1><p className="mt-4 text-stone-600">{locale === "pl" ? "Praktyczne wskazówki, które pomagają zacząć grać i poznać osoby do padla w Krakowie." : "Practical advice to help you start playing and find padel partners in Kraków."}</p></section>
    <section id="blog-posts" data-testid="blog-posts-section" className="grid gap-6">{posts.map(post => <Link key={post.id} href={localizePath(`/blog/${post.slug}`, locale)} className="surface p-6 hover:border-stone-400">
      {post.coverImage && <img src={post.coverImage} alt={post.title} loading="lazy" className="mb-4 h-48 w-full rounded-lg object-cover" />}
      <h2 className="text-2xl font-bold">{post.title}</h2><p className="mt-3 text-stone-600">{post.excerpt}</p><p className="mt-4 text-sm text-stone-500">{locale === "pl" ? "Autor:" : "By"} {publicAuthor(post.slug, post.author.name)}{post.publishedAt && <> · <time dateTime={post.publishedAt.toISOString()}>{post.publishedAt.toLocaleDateString(locale === "pl" ? "pl-PL" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></>}</p>
    </Link>)}</section>
    {!posts.length && <p>{locale === "pl" ? "Wkrótce pojawią się nowe artykuły." : "New articles will appear here soon."}</p>}
    <CommunityCTA locale={locale} />
  </div>;
}
