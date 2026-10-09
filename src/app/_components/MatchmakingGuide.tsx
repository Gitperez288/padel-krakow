import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { levelAdvice, matchmakingGroups, matchmakingGroupName, numericLevelAdvice } from "@/lib/community";

export default function MatchmakingGuide({ locale, showJoinLink = true }: { locale: Locale; showJoinLink?: boolean }) {
  const pl = locale === "pl";
  return <section className="my-8 text-left" aria-labelledby="matchmaking-groups">
    <h2 id="matchmaking-groups" className="mb-3 text-2xl font-bold">{pl ? "Wybierz grupę do umawiania meczów" : "Choose your matchmaking group"}</h2>
    <p className="mb-5 text-stone-600">{pl ? "Nazwy grup są takie same po polsku i angielsku. Znajdziesz je na liście grup w społeczności WhatsApp." : "Group names are identical in both languages. Find them in the WhatsApp community's group list."}</p>
    <div className="grid gap-4 lg:grid-cols-3">
      {matchmakingGroups.map(group => <article key={group.id} className="surface min-w-0 p-5">
        <p className="mb-3 text-2xl font-bold text-orange-800">{group.range} <span className="text-base font-semibold text-stone-600">· ≈{group.numericRange}</span></p>
        <h3 className="font-bold leading-relaxed">{matchmakingGroupName(group)}</h3>
        {pl && <p className="mt-1 text-sm font-semibold">{group.label.pl}</p>}
        <p className="mt-3 text-sm text-stone-600">{group.summary[locale]}</p>
        <p className="mt-3 text-sm font-semibold">{group.levels.join(" · ")}</p>
      </article>)}
    </div>
    <p className="mt-5 text-sm leading-relaxed text-stone-600">{levelAdvice[locale]}</p>
    <p className="mt-3 text-sm leading-relaxed text-stone-600">{numericLevelAdvice[locale]}</p>
    {showJoinLink && <Link href={localizePath("/community", locale)} className="button-primary mt-5">{pl ? "Dołącz do społeczności" : "Join the community"}</Link>}
  </section>;
}
