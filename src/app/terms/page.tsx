import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Padel Kraków Community",
  description:
    "Terms of service for the Padel Kraków Community platform.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-amber-600 hover:text-amber-700 font-semibold text-sm"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-amber-700 mt-6 mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 2026</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of terms</h2>
            <p>
              By accessing or using the Padel Kraków Community website, you agree to
              these terms. If you disagree with any part, please do not use our
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Community purpose</h2>
            <p>
              This platform exists to connect padel players in Kraków and Małopolska.
              It is a community resource, not a commercial service. Access is free and
              open to all padel players.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User conduct</h2>
            <p className="mb-3">You agree not to use this platform to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Post unlawful, offensive, or misleading content.</li>
              <li>Spam or harass other community members.</li>
              <li>
                Attempt to gain unauthorized access to any part of the platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. External links</h2>
            <p>
              This platform contains links to external sites (court booking apps,
              WhatsApp groups, Google Maps, Instagram, etc.). We are not responsible
              for the content or practices of those external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Disclaimer</h2>
            <p>
              Court information, skill levels, and coach details are provided in good
              faith but may change. Always verify details directly with the court or
              coach before making bookings. We are not liable for any loss arising
              from inaccurate information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              platform after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-amber-700 underline hover:text-amber-900"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
