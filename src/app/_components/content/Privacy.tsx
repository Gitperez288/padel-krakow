import { type Locale, localizePath } from "@/lib/i18n";
import { getServerTranslator as getTranslator } from "@/lib/translations-server";
import type { Metadata } from "next";
import Link from "next/link";


export default function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href={localizePath("/", locale)}
          className="text-orange-700 hover:text-stone-900 font-semibold text-sm"
        >{t("← Back to Home")}</Link>

        <h1 className="text-4xl font-bold text-stone-900 mt-6 mb-2">{t("Privacy Policy")}</h1>
        <p className="text-sm text-gray-500 mb-10">{t("Last updated: September 2026")}</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("1. Who we are")}</h2>
            <p>{t("Padel Kraków Community is a non-commercial community platform for padel players in Kraków and Małopolska, Poland, independently managed by Carlos Viso and Francisco Pérez. You can reach us at")}{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-stone-900 underline hover:text-orange-800"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("2. What data we collect")}</h2>
            <p className="mb-3">{t("We collect only the minimum data necessary to operate this platform:")}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong className="text-gray-800">{t("Admin accounts:")}</strong>{" "}{t("Email address and hashed password for administrators who manage blog content.")}</li>
              <li>
                <strong className="text-gray-800">{t("Blog posts:")}</strong>{" "}{t("Content created and published by administrators on this platform.")}</li>
              <li>
                <strong className="text-gray-800">{t("Usage data:")}</strong>{" "}{t("Standard web server logs (IP addresses, browser type, pages visited) retained briefly for security and performance purposes.")}</li>
            </ul>
            <p className="mt-3">{t("We measure anonymous daily totals for page views, community links, invitation reveals, WhatsApp clicks, booking links and coach contacts. We store only the date, action, page category, language and count. We do not store visitor identifiers, IP addresses, referrers, search terms or invitation URLs in these counters. No analytics cookies are used. Do Not Track and Global Privacy Control signals are respected.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("3. How we use your data")}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{t("To allow administrators to log in and manage community content.")}</li>
              <li>{t("To operate and improve this platform.")}</li>
              <li>{t("To respond if you contact us directly.")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("4. Data sharing")}</h2>
            <p>{t("We do not sell personal data. We use Vercel for hosting and Neon for database storage, and disclose data where required by law. See")}{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-900 underline hover:text-orange-800"
              >{t("Vercel's Privacy Policy")}</a>{" "}{t("for their data practices.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("5. Data retention")}</h2>
            <p>{t("Administrator account data is retained for as long as the account is active. You may request deletion at any time by contacting us.")}</p>
            <p className="mt-3">{t("Anonymous daily counts are retained for up to 400 days. Short-lived request hashes used to limit abuse are held only in server memory for up to one minute.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("6. Your rights (GDPR)")}</h2>
            <p>{t("If you are located in the EU, you have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, contact us at")}{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-stone-900 underline hover:text-orange-800"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("7. WhatsApp and external platforms")}</h2>
            <p>{t("Our community also operates via WhatsApp groups. Any personal data you share within those groups (name, phone number, messages) is subject to")}{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-900 underline hover:text-orange-800"
              >{t("WhatsApp's Privacy Policy")}</a>{" "}{t(", not ours. For conduct rules within those groups, please refer to our")}{" "}
              <Link
                href={localizePath("/guidelines", locale)}
                className="text-stone-900 underline hover:text-orange-800"
              >{t("Community Guidelines")}</Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("8. Changes to this policy")}</h2>
            <p>{t("We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the platform after changes constitutes acceptance of the updated policy.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("9. Contact")}</h2>
            <p>{t("For any privacy-related questions, email us at")}{" "}
              <a
                href="mailto:padelkrkcommunity@gmail.com"
                className="text-stone-900 underline hover:text-orange-800"
              >
                padelkrkcommunity@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400 space-x-4">
          <Link href={localizePath("/terms", locale)} className="hover:text-gray-600 underline">{t("Terms of Service")}</Link>
          <span>·</span>
          <Link href={localizePath("/guidelines", locale)} className="hover:text-gray-600 underline">{t("Community Guidelines")}</Link>
        </div>
      </div>
    </div>
  );
}
