import { type Locale, localizePath } from "@/lib/i18n";
import { getServerTranslator as getTranslator } from "@/lib/translations-server";
import type { Metadata } from "next";
import Link from "next/link";


export default function TermsPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href={localizePath("/", locale)}
          className="text-orange-700 hover:text-stone-900 font-semibold text-sm"
        >{t("← Back to Home")}</Link>

        <h1 className="text-4xl font-bold text-stone-900 mt-6 mb-2">{t("Terms of Service")}</h1>
        <p className="text-sm text-gray-500 mb-10">{t("Last updated: June 2026")}</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("1. Acceptance of terms")}</h2>
            <p>{t("By accessing or using the Padel Kraków Community website, you agree to these terms. If you disagree with any part, please do not use our platform.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("2. About this platform")}</h2>
            <p>{t("Padel Kraków Community is a non-commercial platform for padel players in Kraków and Małopolska, Poland, independently managed by Carlos Viso and Francisco Pérez. It is a community resource, not a commercial service. Access is free and open to all padel players.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("3. User conduct")}</h2>
            <p className="mb-3">{t("You agree not to use this platform to:")}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{t("Post unlawful, offensive, or misleading content.")}</li>
              <li>{t("Spam or harass other community members.")}</li>
              <li>{t("Attempt to gain unauthorised access to any part of the platform.")}</li>
              <li>{t("Impersonate another person or misrepresent your affiliation with any organisation.")}</li>
            </ul>
            <p className="mt-3">{t("For conduct within our WhatsApp community groups, please also refer to our")}{" "}
              <Link
                href={localizePath("/guidelines", locale)}
                className="text-stone-900 underline hover:text-orange-800"
              >{t("Community Guidelines")}</Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("4. External links")}</h2>
            <p>{t("This platform contains links to external sites, including court booking apps, WhatsApp groups, Google Maps, and Instagram. We are not responsible for the content, accuracy, or practices of those external sites.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("5. Disclaimer")}</h2>
            <p>{t("Court information, skill levels, and coach details are provided in good faith but may change. Always verify details directly with the court or coach before making bookings. We are not liable for any loss arising from reliance on inaccurate or outdated information.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("6. Intellectual property")}</h2>
            <p>{t("Content published on this platform, including blog posts and community materials, is the property of Padel Kraków Community or the respective authors. You may not reproduce or redistribute it without prior written permission.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("7. Changes to these terms")}</h2>
            <p>{t("We may update these terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of the platform after changes constitutes acceptance of the updated terms.")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t("8. Contact")}</h2>
            <p>{t("Questions about these terms? Contact us at")}{" "}
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
          <Link href={localizePath("/privacy", locale)} className="hover:text-gray-600 underline">{t("Privacy Policy")}</Link>
          <span>·</span>
          <Link href={localizePath("/guidelines", locale)} className="hover:text-gray-600 underline">{t("Community Guidelines")}</Link>
        </div>
      </div>
    </div>
  );
}
