import type { Locale } from "@/lib/i18n";
import { matchExample, matchTemplate } from "@/lib/community";

export default function MatchPostTemplate({ locale }: { locale: Locale }) {
  return <div className="surface p-5 text-left">
    <h3 className="font-bold">{locale === "pl" ? "Szablon ogłoszenia meczu" : "Match post template"}</h3>
    <p className="mt-3 break-words text-sm text-stone-600">{matchTemplate[locale]}</p>
    <blockquote className="mt-4 border-l-2 border-orange-700 pl-4 font-medium">{matchExample[locale]}</blockquote>
    <p className="mt-4 text-sm">{locale === "pl" ? "To przykład. Podaj wymagany poziom, nawet w grupie przypisanej do poziomów. Po zebraniu kompletu odpowiedz na swoje ogłoszenie: FULL / KOMPLET ✅." : "This is an example. Specify the requested level even within a level group. When filled, reply to your original post: FULL / KOMPLET ✅."}</p>
  </div>;
}
