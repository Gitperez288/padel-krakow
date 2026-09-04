import { getTranslator } from "@/lib/translations";
import { localizePath, type Locale } from "@/lib/i18n";

import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import {
  MapPin,
  Users,
  Newspaper,
  Target,
  ArrowRight,
  Calendar,
  Instagram,
  Handshake,
} from "lucide-react";
import { sponsors } from "@/lib/sponsors";
import { formatDistanceToNow } from "date-fns";
import { pl, enGB } from "date-fns/locale";



export const revalidate = 60; // Revalidate at most every 60 seconds so new blog posts appear without a redeploy

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}


export default async function HomePage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const latestPosts = await db.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const features = [
    { icon: MapPin, title: t("Find Padel Courts"), description: t("Compare clubs, find your court and book a game."), href: "/courts" },
    { icon: Users, title: t("Community Groups"), description: t("Meet local players and arrange your next match."), href: "/community" },
    { icon: Target, title: t("Find Your Level"), description: t("Skill levels from beginner to professional."), href: "/levels" },
    { icon: Handshake, title: t("Find a coach"), description: t("Build confidence with a local padel coach."), href: "/coaches" },
  ];

  return (
    <>
      <section id="hero" data-testid="hero-section" className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow mb-5">Kraków & Małopolska</p>
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tighter text-stone-900 sm:text-6xl lg:text-7xl">{t("Your people.")}<br/>{t("Your next game.")}</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600">{t("Join over 900 padel players in Kraków and Małopolska. Find a court, meet your partners and get playing.")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizePath("/community", locale)} className="button-primary">{t("Join the Community")}<ArrowRight size={17}/></Link>
              <Link href={localizePath("/courts", locale)} className="button-secondary">{t("Find Padel Courts")}</Link>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-stone-200 pt-6 text-sm text-stone-600">
              <span className="text-2xl font-bold text-stone-900">900+</span><span>{t("Active players")}</span><span aria-hidden="true" className="h-5 border-l border-stone-300"/><span>{t("All levels welcome")}</span>
            </div>
          </div>
          <figure className="relative overflow-hidden rounded-2xl bg-stone-200">
            <div className="relative aspect-[4/3] sm:aspect-[5/4]">
              <Image src="/media/alex.webp" alt={t("Alex Cabezas playing padel")} fill sizes="(min-width: 1024px) 550px, 100vw" className="object-cover object-top" priority/>
            </div>
            <figcaption className="flex items-center justify-between gap-3 bg-stone-900 px-5 py-4 text-xs text-white">
              <span>{t("On court with Alex Cabezas")}</span><Link href="/coaches" className="inline-flex items-center gap-2 font-semibold hover:underline">{t("Meet our coaches")}<ArrowRight size={14}/></Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="features" data-testid="features-section" className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">{t("Make it a game")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({icon: Icon, title, description, href}) => (
              <Link key={href} href={localizePath(href, locale)} className="surface group flex flex-col p-6 transition-colors hover:border-stone-400">
                <Icon size={24} className="mb-6 text-orange-700" aria-hidden="true"/>
                <h3 className="text-base font-bold text-stone-900">{title}</h3>
                <p className="mb-5 mt-2 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
                <ArrowRight size={18} className="text-stone-500 group-hover:text-orange-700" aria-hidden="true"/>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section id="blog-highlights" data-testid="blog-highlights-section" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">{t("Latest from the Blog")}</h2>
              <p className="text-gray-600">{t("News, stories and updates from our community")}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-orange-700 transition shrink-0"
            >{t("View all posts")}<ArrowRight size={16} />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="surface group overflow-hidden flex flex-col transition-colors hover:border-stone-400"
                >
                  {post.coverImage ? (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-stone-100 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-stone-500" />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-stone-900 transition">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {stripHtml(post.excerpt)}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-auto pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {post.author.name}
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true, locale: locale === "pl" ? pl : enGB })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Newspaper className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t("No posts yet, check back soon!")}</p>
              <Link href="/blog" className="mt-4 inline-block text-stone-900 font-semibold hover:underline">{t("Go to Blog")}</Link>
            </div>
          )}
        </div>
      </section>

      {/* Community Sponsors Section */}
      <section id="community-sponsors" data-testid="community-sponsors-section" className="bg-stone-100 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">{t("Community Sponsors")}</h2>
              <p className="text-gray-600 max-w-xl">{t("Local partners who support our community events and keep padel in Kraków accessible for everyone.")}</p>
            </div>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-orange-700 transition shrink-0"
            >{t("View all sponsors")}<ArrowRight size={16} />
            </Link>
          </div>

          {sponsors.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {sponsors.map((sponsor) => (
                <Link
                  key={sponsor.id}
                  href="/sponsors"
                  className="surface group flex flex-col items-center justify-center gap-3 p-6 text-center"
                >
                  {sponsor.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 w-auto object-contain"
                    />
                  ) : (
                    <Handshake className="w-10 h-10 text-stone-500" strokeWidth={1.4} />
                  )}
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-stone-900 transition line-clamp-1">
                    {sponsor.name}
                  </span>
                  <span className="text-xs text-orange-700 font-medium group-hover:underline inline-flex items-center gap-1">{t("View exclusive offers")}<ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder shown until first real sponsor is added */
            <div className="rounded-2xl border-2 border-dashed border-stone-300 bg-white flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
              <Handshake className="w-12 h-12 text-stone-500" strokeWidth={1.2} />
              <p className="text-lg font-semibold text-stone-900">{t("Sponsors joining soon!")}</p>
              <p className="text-gray-500 max-w-sm text-sm">{t("We are building our partner network. Visit the sponsors page for updates or")}{" "}
                <a
                  href="https://www.instagram.com/padelkrkcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-900 underline hover:text-orange-700"
                >{t("follow us on Instagram")}</a>
                .
              </p>
              <Link
                href="/sponsors"
                className="mt-2 inline-flex items-center gap-2 bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-800 transition text-sm"
              >
                <Handshake size={15} />{t("Learn about sponsorships")}</Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center">
        <Image src="/dragon-logo.png" alt={t("Padel Kraków community dragon mascot")} width={88} height={88} className="rounded-xl"/>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-stone-900">{t("Local people. Shared passion.")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{t("Follow the people and moments behind Padel Kraków.")}</p>
        </div>
        <a href="https://www.instagram.com/padelkrkcommunity" target="_blank" rel="noopener noreferrer" className="button-secondary"><Instagram size={17}/>@padelkrkcommunity</a>
      </section>

      {/* CTA Section */}
      <section id="cta" data-testid="cta-section" className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t("Ready to Play?")}</h2>
          <p className="text-lg text-stone-300 mb-8">{t("Start by finding your skill level, then join one of our community groups to find matches near you.")}</p>
          <Link
            href={localizePath("/community", locale)}
            className="inline-block bg-white text-orange-700 px-8 py-3 rounded-lg font-bold hover:bg-stone-100 transition transform hover:scale-105"
          >{t("Join the Community")}</Link>
        </div>
      </section>
    </>
  );
}
