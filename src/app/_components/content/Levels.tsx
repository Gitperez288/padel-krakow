import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { LEVEL_ORDER, matchmakingGroups, skillStages, numericLevelRanges, numericReferenceLetters } from "@/lib/community";
import MatchmakingGuide from "../MatchmakingGuide";
import NextSteps from "../NextSteps";

export default function LevelsPage({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <section id="levels-header" data-testid="levels-header-section">
      <h1 className="page-heading mb-5">{pl ? "Poziomy gry w padla" : "Padel Level Scale"}</h1>
      <p className="max-w-3xl text-stone-600">{pl ? "Korzystaj z naszej skali literowej, aby znaleźć wyrównany mecz i odpowiednią grupę. Najpierw wybierz grupę, a potem porównaj swoją grę z opisami umiejętności." : "Use our community letter scale to find balanced matches and the right group. Choose a group below, then compare your usual game with the skill descriptions."}</p>
    </section>

    <MatchmakingGuide locale={locale} />

    <section className="surface my-8 p-5" aria-labelledby="letter-order">
      <h2 id="letter-order" className="font-bold">{pl ? "Kolejność poziomów, od najniższego do najwyższego" : "Level progression, from lowest to highest"}</h2>
      <p className="mt-3 leading-loose font-semibold">{LEVEL_ORDER.join(" → ")}</p>
      <p className="mt-2 text-sm text-stone-600">{pl ? "W ramach każdej litery 4 jest najniższym, a 1 najwyższym poziomem. B1+ oznacza B1 oraz A4, A3, A2 i A1." : "Within each letter, 4 is lowest and 1 is highest. B1+ means B1 plus A4, A3, A2 and A1."}</p>
    </section>

    <section className="surface my-8 p-5" aria-labelledby="numeric-reference">
      <h2 id="numeric-reference" className="text-xl font-bold">{pl ? "Litery i liczby: szybkie porównanie" : "Letters and numbers: quick reference"}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{pl ? "Orientacyjne odpowiedniki liczbowe poziomów literowych naszej społeczności" : "Approximate numeric equivalents of our community letter levels"}</caption>
          <thead><tr className="border-b border-stone-200"><th scope="col" className="py-2 pr-4">{pl ? "Poziom literowy" : "Letter level"}</th><th scope="col" className="py-2">{pl ? "Orientacyjny poziom liczbowy" : "Approximate numeric level"}</th></tr></thead>
          <tbody>{numericReferenceLetters.map(letter => <tr key={letter} className="border-b border-stone-100"><th scope="row" className="py-2 pr-4 font-semibold">{letter}</th><td className="py-2">{numericLevelRanges[letter][locale]}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <h2 className="mb-4 text-2xl font-bold">{pl ? "Przewodnik po umiejętnościach" : "Skill guide"}</h2>
    <nav id="levels-ladder" data-testid="levels-ladder-section" aria-label={pl ? "Przejdź do opisu poziomu" : "Jump to a skill stage"} className="mb-6 flex flex-wrap gap-2">
      {skillStages.map(stage => <a key={stage.id} href={"#skill-" + stage.id} className="button-secondary">{stage.letter} <span className="text-xs font-normal">· ≈{numericLevelRanges[stage.letter][locale]}</span></a>)}
    </nav>
    <section id="levels-cards" data-testid="levels-cards-section" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillStages.map(stage => {
        const group = matchmakingGroups.find(group => group.id === stage.group)!;
        return <article id={"skill-" + stage.id} key={stage.id} className="surface scroll-mt-24 p-6">
          <p className="mb-2 text-2xl font-bold text-orange-800">{stage.letter} <span className="text-base font-semibold text-stone-600">· ≈{numericLevelRanges[stage.letter][locale]}</span></p>
          <h3 className="text-xl font-bold">{stage.title[locale]}</h3>
          <p className="my-3 text-stone-600">{stage.description[locale]}</p>
          <p className="text-sm font-semibold">{pl ? "Grupa" : "Group"}: {group.label[locale]} ({group.range}) <span className="font-normal text-stone-600">· ≈{group.numericRange}</span></p>
        </article>;
      })}
    </section>

    <NextSteps locale={locale} page="levels" />
    <section className="surface mt-8 p-6">
      <h2 className="text-xl font-bold">{pl ? "Dodatkowa pomoc w samoocenie" : "Optional self-assessment aid"}</h2>
      <p className="my-3 text-sm text-stone-600">{pl ? "Kalkulator zewnętrzny może pomóc w refleksji nad grą. Porównaj jego wynik z opisami powyżej; nie przeliczaj go bezpośrednio na nasze poziomy literowe." : "The external calculator can help you reflect on your game. Check its result against the descriptions above; do not convert it directly into our letter levels."}</p>
      <a href="https://padel-skill-calculator.rip21.me/" target="_blank" rel="noopener noreferrer" className="button-secondary">{pl ? "Wypróbuj kalkulator poziomu (autor: Andrey Los)" : "Try the Padel Skill Calculator (by Andrey Los)"}</a>
      <Link href={localizePath("/guidelines", locale)} className="ml-4 inline-block mt-3 underline">{pl ? "Zasady umawiania meczów" : "Matchmaking guidelines"}</Link>
    </section>
  </div>;
}
