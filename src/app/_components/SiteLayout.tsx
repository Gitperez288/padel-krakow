import UsageTracker from "./UsageTracker";
import { getTranslator } from "@/lib/translations";
import { localizePath, type Locale } from "@/lib/i18n";
// app/layout.tsx
import "@/app/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import SiteHeader from "./SiteHeader";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Padel Kraków Community",
    template: "%s | Padel Kraków",
  },
  description:
    "Join a community with 975+ members in Kraków and Małopolska. A people-first community on a mission to grow the sport. Discover court locations, skill levels, community groups, and the latest padel news.",
  keywords: [
    "padel Kraków",
    "padel Krakow",
    "padel Małopolska",
    "padel community Poland",
    "padel courts Kraków",
    "padel players Kraków",
    "padel sport Poland",
    "padel Polska",
    "gdzie grać w padla Kraków",
    "padel club Kraków",
  ],
  authors: [{ name: "Padel Kraków Community" }],
  creator: "Padel Kraków Community",
  publisher: "Padel Kraków Community",
  verification: {
    google: "hmHsDPtI7_-8fWPH2BQJew1_vTqt6vHxZMs7AnjThw8",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Padel Kraków Community",
    title: "Padel Kraków Community",
    description:
      "Join a community with 975+ members in a people-first community growing padel in Kraków and Małopolska. Find courts, levels, and local groups.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Padel Kraków Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padel Kraków Community – 975+ Members",
    description:
      "People-first padel community in Kraków and Małopolska. 975+ members, multiple courts, all levels welcome.",
    images: ["/og-image.jpg"],
  },
};

export default function SiteLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#c2410c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/dragon-logo.png" />
        <link rel="apple-touch-icon" href="/dragon-logo.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-stone-50 text-stone-900 flex flex-col`}>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] button-secondary">{locale === "pl" ? "Przejdź do treści" : "Skip to content"}</a>
          <SiteHeader locale={locale} />
          {process.env.COMMUNITY_ANALYTICS_ENABLED === "true" && <UsageTracker />}

        <main id="main-content" className="flex-1">{children}</main>

        <footer className="mt-auto bg-stone-900 text-white/80 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 break-words">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Padel Kraków
                </h3>
                <p className="text-sm text-white/75">{t("Connecting padel players across Kraków and Małopolska.")}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">{t("Navigation")}</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href={localizePath("/levels", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Levels")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/courts", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Courts")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/community", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Community")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/blog", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Blog")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/coaches", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Coaches")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/who-we-are", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Who We Are")}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">{t("Legal")}</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href={localizePath("/privacy", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Privacy Policy")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/terms", locale)}
                      className="text-white/75 hover:text-white transition"
                    >{t("Terms of Service")}</Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath("/guidelines", locale)}
                      className="text-white/75 hover:text-white transition"
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
                      className="text-white/75 hover:text-white transition"
                    >
                      padelkrkcommunity@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/padelkrkcommunity"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/75 hover:text-white transition"
                    >
                      @padelkrkcommunity
                    </a>
                  </li>
                  <li className="text-white/75">{t("Join our WhatsApp communities to find matches!")}</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/75">
              © {new Date().getFullYear()}{" "}{t("Padel Kraków Community. All rights reserved.")}</div>
          </div>
        </footer>

        {/* JSON-LD – site-wide organisation identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "@id": SITE_URL + "/#organization",
              name: "Padel Kraków Community",
              url: SITE_URL,
              description:
                "Local padel community in Kraków and Małopolska with 975+ members.",
              sport: "Padel",
              logo: SITE_URL + "/dragon-logo.png",
              areaServed: [{ "@type": "City", name: "Kraków" }, { "@type": "AdministrativeArea", name: "Małopolska" }],
              email: "padelkrkcommunity@gmail.com",
              sameAs: ["https://www.instagram.com/padelkrkcommunity"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "PL",
                addressRegion: "Małopolska",
                addressLocality: "Kraków",
              },
            }),
          }}
        />
        </Providers>
      </body>
    </html>
  );
}
