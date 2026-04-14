import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Instagram, Tag, Globe, Handshake } from "lucide-react";
import { sponsors } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Community Sponsors | Padel Kraków Community",
  description:
    "Meet the sponsors supporting the Padel Kraków Community. Access exclusive discount codes, links to their sites, and learn how they help keep padel in Kraków fair for all.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/sponsors",
  },
  openGraph: {
    title: "Community Sponsors – Padel Kraków Community",
    description:
      "Our sponsors make community events possible and offer exclusive perks to Padel Kraków members.",
    url: "https://padel-krakow.vercel.app/sponsors",
  },
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-amber-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Handshake className="w-14 h-14 text-amber-200" strokeWidth={1.4} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Community Sponsors
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            Padel Kraków Community is a <strong className="text-white">non-profit, people-first</strong> community.
            We believe in using our collective voice to improve the experience of all the
            players who make this community great.
          </p>
        </div>
      </section>

      {/* ── Mission statement ───────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            We carefully select partners who genuinely align with our values and the
            padel lifestyle. In return for their support, we give our community
            members access to <strong>exclusive discounts, perks, and direct links</strong> to
            their products and services.
          </p>
          <p>
            Sponsorships also play a key role in keeping our{" "}
            <strong>community events running</strong>. They help our friend and{" "}
            <strong>Community Event Coordinator,&nbsp;Gabriele</strong>, organise the exciting matches
            and tournaments you enjoy through the{" "}
            <a
              href="https://www.instagram.com/padelkrakowleague"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 font-semibold underline hover:text-amber-900 inline-flex items-center gap-1"
            >
              <Instagram size={16} />
              @padelkrakowleague
            </a>{" "}
            initiative.
          </p>
          <p>
            Our mission is simple: keep padel in Kraków{" "}
            <strong>fair, accessible, and fun for everyone</strong> — regardless of your level or background.
            These partnerships are one of the tools that make that possible.
          </p>
          <p className="text-base text-gray-500 italic">
            Interested in becoming a sponsor?{" "}
            <a
              href="https://www.instagram.com/padelkrkcommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline hover:text-amber-900"
            >
              Reach out to us on Instagram
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Sponsors grid ───────────────────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {sponsors.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-amber-700 mb-8 text-center">
                Our Current Sponsors
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden"
                  >
                    {/* Logo */}
                    <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
                      {sponsor.logo ? (
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          width={200}
                          height={100}
                          className="max-h-28 w-auto object-contain"
                        />
                      ) : (
                        <Handshake
                          className="w-16 h-16 text-amber-300"
                          strokeWidth={1.2}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                        {sponsor.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {sponsor.name}
                      </h3>
                      <p className="text-sm text-amber-700 font-medium mb-3">
                        {sponsor.tagline}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                        {sponsor.description}
                      </p>

                      {/* Discount code */}
                      {sponsor.discountCode && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Tag size={14} className="text-amber-600" />
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                              Member discount
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {sponsor.discountDescription}
                          </p>
                          <span className="inline-block bg-amber-700 text-white text-sm font-bold px-3 py-1 rounded-lg tracking-widest">
                            {sponsor.discountCode}
                          </span>
                        </div>
                      )}

                      {/* Links */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-amber-100 hover:text-amber-700 px-3 py-1.5 rounded-lg transition"
                          >
                            <Globe size={14} />
                            Website
                          </a>
                        )}
                        {sponsor.instagram && (
                          <a
                            href={sponsor.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-pink-100 hover:text-pink-600 px-3 py-1.5 rounded-lg transition"
                          >
                            <Instagram size={14} />
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ── Coming soon placeholder ── */
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto">
              <Handshake
                className="w-16 h-16 text-amber-300 mx-auto mb-5"
                strokeWidth={1.2}
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Sponsors Coming Soon
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
                We are currently building our sponsor network. Check back soon
                to find exclusive perks and offers from our community partners.
              </p>
              <a
                href="https://www.instagram.com/padelkrkcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-800 transition"
              >
                <Instagram size={16} />
                Follow us for updates
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Back to home ────────────────────────────────────────────────── */}
      <div className="pb-10 flex justify-center">
        <Link
          href="/"
          className="text-amber-700 font-semibold hover:underline hover:text-amber-900 transition text-sm"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
