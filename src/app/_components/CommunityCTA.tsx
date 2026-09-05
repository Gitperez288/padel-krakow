import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
export default function CommunityCTA({locale}: {locale: Locale}) {
  return <section className="surface my-8 p-6 sm:p-8 text-left">
    <h2 className="text-xl font-bold">{locale === "pl" ? "Masz już kort? Znajdź osoby do gry" : "Found a court? Find people to play with"}</h2>
    <p className="my-3 text-stone-600">{locale === "pl" ? "Dołącz bezpłatnie do 975+ członków naszej lokalnej społeczności. Każdy poziom jest mile widziany. Pisz po polsku lub angielsku." : "Join our free local community of 975+ members. All levels welcome. Polish and English are both welcome."}</p>
    <Link className="button-primary" href={localizePath("/community",locale)}>{locale === "pl" ? "Znajdź graczy na WhatsAppie" : "Find players on WhatsApp"}</Link>
  </section>;
}
