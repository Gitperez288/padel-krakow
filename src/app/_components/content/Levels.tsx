import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { LEVEL_ORDER, matchmakingGroups, skillStages, numericLevelRanges, numericProgression, numericLevelAdvice } from "@/lib/community";
import MatchmakingGuide from "../MatchmakingGuide";
import NextSteps from "../NextSteps";

export default function LevelsPage({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <section id="levels-header" data-testid="levels-header-section">
      <h1 className="page-heading mb-5">{pl ? "Poziomy gry w padla" : "Padel Level Scale"}</h1>
      <p className="max-w-3xl text-stone-600">{pl ? "Sprawdź swój poziom i wybierz grupę do umawiania meczów." : "Find your level and choose a matchmaking group."}</p>
    </section>

    <MatchmakingGuide locale={locale} />

    <section className="surface my-8 p-5" aria-labelledby="letter-order">
      <h2 id="letter-order" className="font-bold">{pl ? "Kolejność poziomów, od najniższego do najwyższego" : "Level progression, from lowest to highest"}</h2>
      <p className="mt-3 text-sm text-stone-600">{pl ? "Litery" : "Letters"}</p>
      <p className="mt-1 font-semibold leading-loose">{LEVEL_ORDER.join(" → ")}</p>
      <p className="mt-3 text-sm text-stone-600">{pl ? "Liczby" : "Numbers"}</p>
      <p className="mt-1 font-semibold leading-loose">{numericProgression.join(" → ")}</p>
      <p className="mt-2 text-sm text-stone-600">{pl ? "W ramach każdej litery: 4 najniżej, 1 najwyżej. B1+ obejmuje wszystkie poziomy A." : "Within each letter: 4 is lowest, 1 is highest. B1+ includes all A levels."} {numericLevelAdvice[locale]}</p>
    </section>

    <h2 className="mb-4 text-2xl font-bold">{pl ? "Przewodnik po umiejętnościach" : "Skill guide"}</h2>
    <nav id="levels-ladder" data-testid="levels-ladder-section" aria-label={pl ? "Przejdź do opisu poziomu" : "Jump to a skill stage"} className="mb-6 flex flex-wrap gap-2">
      {skillStages.map(stage => <a key={stage.id} href={"#skill-" + stage.id} className="button-secondary flex-wrap"><span>{stage.letter}</span><span>· {stage.letter === "D" ? "<1.0" : "≈" + numericLevelRanges[stage.letter][locale]}</span></a>)}
    </nav>
    <section id="levels-cards" data-testid="levels-cards-section" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillStages.map(stage => {
        const group = matchmakingGroups.find(group => group.id === stage.group)!;
        return <article id={"skill-" + stage.id} key={stage.id} className="surface scroll-mt-24 p-6">
          <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold text-orange-800"><span>{stage.letter}</span><span>· {stage.letter === "D" ? "<1.0" : "≈" + numericLevelRanges[stage.letter][locale]}</span></p>
          <h3 className="text-xl font-bold">{stage.title[locale]}</h3>
          <ul className="my-3 list-disc space-y-2 pl-5 text-stone-600">{stage.bullets[locale].map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
          <p className="text-sm font-semibold">{pl ? "Grupa" : "Group"}: {group.label[locale]} ({group.range} · ≈{group.numericRange})</p>
        </article>;
      })}
    </section>

    <NextSteps locale={locale} page="levels" />
    <section className="surface mt-8 p-6">
      <h2 className="text-xl font-bold">{pl ? "Dodatkowa pomoc w samoocenie" : "Optional self-assessment aid"}</h2>
      <p className="my-3 text-sm text-stone-600">{pl ? "Kalkulator może być dodatkowym punktem odniesienia obok tego przewodnika." : "Use the calculator as another reference alongside this guide."}</p>
      <a href="https://padel-skill-calculator.rip21.me/" target="_blank" rel="noopener noreferrer" className="button-secondary">{pl ? "Wypróbuj kalkulator poziomu (autor: Andrey Los)" : "Try the Padel Skill Calculator (by Andrey Los)"}</a>
      <Link href={localizePath("/guidelines", locale)} className="ml-4 inline-block mt-3 underline">{pl ? "Zasady umawiania meczów" : "Matchmaking guidelines"}</Link>
    </section>
  </div>;
}
