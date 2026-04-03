import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Padel Kraków Community",
  description:
    "Privacy policy for the Padel Kraków Community platform — how we collect and use your data.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 2026</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
            <p>
              Padel Kraków Community is a non-commercial community platform for padel
              players in Kraków and Małopolska, Poland. You can reach us at{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-amber-700 underline hover:text-amber-900"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. What data we collect</h2>
            <p className="mb-3">
              We collect only the minimum data necessary to operate this platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong className="text-gray-800">Admin accounts:</strong> Email
                address and hashed password for administrators who manage blog content.
              </li>
              <li>
                <strong className="text-gray-800">Blog posts:</strong> Content
                created and published by administrators on this platform.
              </li>
              <li>
                <strong className="text-gray-800">Usage data:</strong> Standard web
                server logs (IP addresses, browser type, pages visited) retained briefly
                for security and performance purposes.
              </li>
            </ul>
            <p className="mt-3">
              We do not collect personal data from regular visitors beyond standard web
              server logs. We do not use third-party tracking cookies or advertising
              networks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How we use your data</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>To allow administrators to log in and manage community content.</li>
              <li>To operate and improve this platform.</li>
              <li>To respond if you contact us directly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data sharing</h2>
            <p>
              We do not sell or share your personal data with third parties, except
              where required by law. This platform is hosted on Vercel — see{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline hover:text-amber-900"
              >
                Vercel&apos;s Privacy Policy
              </a>{" "}
              for their data practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data retention</h2>
            <p>
              Administrator account data is retained as long as the account is active.
              You may request deletion at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Your rights (GDPR)
            </h2>
            <p>
              If you are located in the EU, you have the right to access, correct, or
              delete any personal data we hold about you. To exercise these rights,
              contact us at{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-amber-700 underline hover:text-amber-900"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>
              For any privacy-related questions, email us at{" "}
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
