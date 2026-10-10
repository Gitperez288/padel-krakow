import type { Locale } from "@/lib/i18n";
import { matchExample, matchTemplate } from "@/lib/community";
import CopyMatchTemplate from "./CopyMatchTemplate";

export default function MatchPostTemplate({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <div className="surface p-5 text-left">
    <h3 className="font-bold">{pl ? "Szablon ogłoszenia meczu" : "Match post template"}</h3>
    <CopyMatchTemplate template={matchTemplate[locale]} locale={locale} />
    <p className="mt-5 text-sm font-semibold">{pl ? "Przykład" : "Example"}</p>
    <blockquote className="mt-2 whitespace-pre-line border-l-2 border-orange-700 pl-4 text-sm leading-7">{matchExample[locale]}</blockquote>
    <p className="mt-4 text-sm">{pl ? "Podaj wymagany poziom. Po zebraniu kompletu odpowiedz na swoje ogłoszenie: FULL / KOMPLET ✅." : "Include the requested level. When filled, reply to your post: FULL / KOMPLET ✅."}</p>
  </div>;
}
