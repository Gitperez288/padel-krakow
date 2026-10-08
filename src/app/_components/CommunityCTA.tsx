import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { COMMUNITY_MEMBER_COUNT, languagePolicy } from "@/lib/community";

export default function CommunityCTA({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <section className="surface my-8 p-6 sm:p-8 text-left">
    <h2 className="text-xl font-bold">{pl ? "Masz już kort? Znajdź osoby do gry" : "Found a court? Find people to play with"}</h2>
    <p className="my-3 text-stone-600">{pl ? "Dołącz bezpłatnie do naszej lokalnej społeczności liczącej ponad 1000 członków. Wybierz grupę Matchmaking pasującą do Twojego poziomu." : `Join our free local community of ${COMMUNITY_MEMBER_COUNT} members. Choose the matchmaking group that fits your level.`}</p>
    <p className="mb-4 text-sm text-stone-600">{languagePolicy[locale]}</p>
    <Link className="button-primary" href={localizePath("/community",locale)}>{pl ? "Znajdź graczy na WhatsAppie" : "Find players on WhatsApp"}</Link>
  </section>;
}
