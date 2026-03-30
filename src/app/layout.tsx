// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Padel Kraków Community",
    template: "%s | Padel Kraków",
  },
  description:
    "Join over 900 padel players in Kraków and Małopolska. A people-first community on a mission to grow the sport. Discover court locations, skill levels, community groups, and the latest padel news.",
  keywords:[
    "Padel",
    "Padel Kraków",
    "Padel Krakow",
    "Padel Małopolska",
    "padel community Poland",
    "padel courts Kraków",
    "padel players Kraków",
    "padel sport Poland",
    "Community",
    "Courts",
    "Players",
    "Tennis",
  ],
  authors: [{ name: "Padel Kraków Community" }],
  creator: "Padel Kraków Community",
  publisher: "Padel Kraków Community",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://padel-krakow.vercel.app",
    siteName: "Padel Kraków Community",
    title: "Padel Kraków Community",
    description:
      "Join over 900 padel players in a people-first community growing padel in Kraków and Małopolska. Find courts, levels, and local groups.",
    images: [
      {
        url: "https://padel-krakow.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Padel Kraków Community",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b45309" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/dragon-logo.png" />
        <link rel="apple-touch-icon" href="/dragon-logo.png" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 text-gray-900 flex flex-col">
        <Providers>
          {/* Header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
              <Link href="/" className="text-3xl font-extrabold text-orange-600 hover:opacity-90 transition">
                Padel Kraków
              </Link>
              <div className="hidden md:flex space-x-8 items-center">
                <Link
                  href="/levels"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Levels
                </Link>
                <Link
                  href="/courts"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Courts
                </Link>
                <Link
                  href="/community"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Community
                </Link>
                <Link
                  href="/coaches"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Coaches
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Blog
                </Link>
                <Link
                  href="/who-we-are"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Who We Are
                </Link>
              </div>
            <div className="md:hidden">
              {/* Mobile menu button placeholder */}
              <button className="text-orange-600 hover:text-orange-700">☰</button>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto bg-gray-900 text-white/80 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Padel Kraków
                </h3>
                <p className="text-sm text-white/60">
                  Connecting padel players across Kraków and Małopolska.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Navigation
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/levels"
                      className="text-white/60 hover:text-white transition"
                    >
                      Levels
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courts"
                      className="text-white/60 hover:text-white transition"
                    >
                      Courts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="text-white/60 hover:text-white transition"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-white/60 hover:text-white transition"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/coaches"
                      className="text-white/60 hover:text-white transition"
                    >
                      Coaches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/who-we-are"
                      className="text-white/60 hover:text-white transition"
                    >
                      Who We Are
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Legal
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-white/60 hover:text-white transition"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-white/60 hover:text-white transition"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Contact
                </h4>
                <p className="text-sm text-white/60">
                  Join our WhatsApp groups to connect with players!
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
              © {new Date().getFullYear()} Padel Kraków Community. All rights
              reserved.
            </div>
          </div>
        </footer>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Padel Kraków Community",
              url: "https://padel-krakow.vercel.app",
              description:
                "Padel community platform for Kraków and Małopolska",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                addressCountry: "PL",
                addressRegion: "Kraków",
              },
            }),
          }}
        />
        </Providers>
      </body>
    </html>
  );
}
