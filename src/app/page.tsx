import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import {
  MapPin,
  Users,
  Newspaper,
  Target,
  Share2,
  ArrowRight,
  Calendar,
  Instagram,
  Handshake,
} from "lucide-react";
import { sponsors } from "@/lib/sponsors";
import { formatDistanceToNow } from "date-fns";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate at most every 60 seconds so new blog posts appear without a redeploy

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export const metadata: Metadata = {
  title: "Padel Kraków Community – People-First Padel in Kraków & Małopolska",
  description:
    "Join over 900 padel players in Kraków and Małopolska. A people-first community on a mission to grow the sport. Find courts, discover your level, and connect with local groups.",
  keywords: [
    "padel Kraków",
    "padel Krakow",
    "padel Małopolska",
    "padel community Poland",
    "padel courts Kraków",
    "padel players Kraków",
    "padel sport Poland",
    "sport Kraków",
  ],
  openGraph: {
    title: "Padel Kraków Community – 900+ Players in Kraków & Małopolska",
    description:
      "Join over 900 padel players in a people-first community growing padel in Kraków and Małopolska. Find courts, levels, and local groups.",
    type: "website",
    url: "https://padel-krakow.vercel.app",
    locale: "pl_PL",
    siteName: "Padel Kraków Community",
    images: [
      {
        url: "https://padel-krakow.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Padel Kraków Community – People-First Padel in Kraków",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padel Kraków Community – 900+ Players",
    description:
      "People-first padel community in Kraków and Małopolska. 900+ players, multiple courts, all levels welcome.",
    images: ["https://padel-krakow.vercel.app/og-image.jpg"],
  },
  alternates: {
    canonical: "https://padel-krakow.vercel.app",
  },
};

export default async function HomePage() {
  const latestPosts = await db.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const features = [
    {
      icon: Target,
      title: "Find Your Level",
      description: "Explore our comprehensive skill level scale from beginner to professional.",
      href: "/levels",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Court Locations",
      description: "Discover all padel courts around Kraków and Małopolska with interactive map.",
      href: "/courts",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Connect with local players through WhatsApp and Facebook groups.",
      href: "/groups",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Read blog posts about Padel growth and community stories.",
      href: "/blog",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="hero" data-testid="hero-section" className="relative overflow-hidden text-gray-800" style={{ backgroundColor: '#E9E4C9' }}>
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B7355" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
            {/* Logo Section */}
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
              <Image
                src="/dragon-logo.png"
                alt="Padel Kraków community dragon mascot"
                width={384}
                height={384}
                className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
                priority
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                🎾 Padel Kraków Community
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
                We are a <strong>people-first community</strong> of over{" "}
                <strong>900 players</strong>, on a mission to grow padel
                across Kraków and Małopolska.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Find courts near you, discover your skill level, and connect
                with local groups to start playing today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/courts"
                  className="inline-flex items-center gap-2 bg-amber-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition transform hover:scale-105"
                >
                  <MapPin size={20} />
                  Find Courts
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition transform hover:scale-105"
                >
                  <Share2 size={20} />
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
              fill="rgb(250, 245, 240)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-testid="features-section" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-700 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get connected with the local padel community with tools designed for players
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition`} />
                  <div className="relative p-8 h-full flex flex-col">
                    <div className={`inline-flex w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} text-white items-center justify-center mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-amber-600 font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section id="blog-highlights" data-testid="blog-highlights-section" className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-amber-700 mb-2">Latest from the Blog</h2>
              <p className="text-gray-600">News, stories and updates from our community</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition shrink-0"
            >
              View all posts <ArrowRight size={16} />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
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
                    <div className="h-44 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-amber-400" />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {stripHtml(post.excerpt)}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {post.author.name}
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Newspaper className="w-12 h-12 text-amber-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No posts yet — check back soon!</p>
              <Link href="/blog" className="mt-4 inline-block text-amber-700 font-semibold hover:underline">
                Go to Blog
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Community Sponsors Section */}
      <section id="community-sponsors" data-testid="community-sponsors-section" className="bg-amber-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-amber-700 mb-2">Community Sponsors</h2>
              <p className="text-gray-600 max-w-xl">
                Local partners who support our community events and keep padel in Kraków accessible for everyone.
              </p>
            </div>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition shrink-0"
            >
              View all sponsors <ArrowRight size={16} />
            </Link>
          </div>

          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sponsors.map((sponsor) => (
                <Link
                  key={sponsor.id}
                  href="/sponsors"
                  className="group bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center justify-center gap-2 p-5 text-center h-32"
                >
                  {sponsor.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-14 w-auto object-contain"
                    />
                  ) : (
                    <Handshake className="w-8 h-8 text-amber-400" strokeWidth={1.4} />
                  )}
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-amber-700 transition line-clamp-1">
                    {sponsor.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder shown until first real sponsor is added */
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-white flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
              <Handshake className="w-12 h-12 text-amber-400" strokeWidth={1.2} />
              <p className="text-lg font-semibold text-amber-700">Sponsors joining soon!</p>
              <p className="text-gray-500 max-w-sm text-sm">
                We are building our partner network. Visit the sponsors page for updates or{" "}
                <a
                  href="https://www.instagram.com/padelkrkcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 underline hover:text-amber-900"
                >
                  follow us on Instagram
                </a>
                .
              </p>
              <Link
                href="/sponsors"
                className="mt-2 inline-flex items-center gap-2 bg-amber-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-amber-800 transition text-sm"
              >
                <Handshake size={15} />
                Learn about sponsorships
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Community Gallery Section */}
      <section id="community-gallery" data-testid="community-gallery-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-amber-700 mb-2">Community Gallery</h2>
              <p className="text-gray-600">Highlights from our courts and events</p>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center gap-4 py-20 px-8 text-center">
            <Instagram className="w-14 h-14 text-pink-500" />
            <p className="text-xl font-semibold text-amber-700">Follow us on Instagram!</p>
            <p className="text-gray-500 max-w-sm">
              We share event photos, court highlights, and community moments at{" "}
              <a
                href="https://www.instagram.com/padelkrkcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 font-semibold underline hover:text-amber-900"
              >
                @padelkrkcommunity
              </a>
              .
            </p>
            <a
              href="https://www.instagram.com/padelkrkcommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              <Instagram size={16} />
              Follow @padelkrkcommunity
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" data-testid="cta-section" className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-lg text-amber-100 mb-8">
            Start by finding your skill level, then join one of our community groups to find matches near you.
          </p>
          <Link
            href="/community"
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition transform hover:scale-105"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </>
  );
}
