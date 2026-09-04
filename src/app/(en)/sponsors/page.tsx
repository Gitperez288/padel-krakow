import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Instagram, Tag, Globe, Handshake } from "lucide-react";
import { sponsors } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Community Sponsors",
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
            We believe in using …11365 tokens truncated…locale)}
                      className="text-white/60 hover:text-white transition"
                    >{t("Courts")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/community", locale)}
                      className="text-white/60 hover:text-white transition"
                    >{t("Community")}</Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-white/60 hover:text-white transition"
                    >{t("Blog")}</Link>
                  </li>
                  <li>
                    <Link
                      href="/coaches"
                      className="text-white/60 hover:text-white transition"
                    >{t("Coaches")}</Link>
                  </li>
                  <li>
                    <Link
                      href="/who-we-are"
                      className="text-white/60 hover:text-white transition"
                    >{t("Who We Are")}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">{t("Legal")}</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-white/60 hover:text-white transition"
                    >{t("Privacy Policy")}</Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-white/60 hover:text-white transition"
                    >{t("Terms of Service")}</Link>
                  </li>
                  <li>
                    <Link
                      href="/guidelines"
                      className="text-white/60 hover:text-white transition"
                    >{t("Community Guidelines")}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">{t("Contact")}</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:padelkrkcommunity@gmail.com"
                      className="text-white/60 hover:text-white transition"
                    >
                      padelkrkcommunity@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/padelkrkcommunity"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition"
                    >
                      @padelkrkcommunity
                    </a>
                  </li>
                  <li className="text-white/60">{t("Join our WhatsApp communities to find matches!")}</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
              © {new Date().getFullYear()}{t("Padel Kraków Community. All rights reserved.")}</div>
          </div>
        </footer>

        {/* JSON-LD – site-wide organisation identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "Padel Kraków Community",
              url: SITE_URL,
              description:
                "People-first padel community in Kraków and Małopolska with over 900 players.",
              sport: "Padel",
              email: "padelkrkcommunity@gmail.com",
              sameAs: ["https://www.instagram.com/padelkrkcommunity"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "PL",
                addressRegion: "Małopolska",
              },
            }),
          }}
        />
        </Providers>
      </body>
    </html>
  );
}
