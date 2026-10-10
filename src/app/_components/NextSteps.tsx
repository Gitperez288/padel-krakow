import Link from "next/link";
import { localizedRoutes, type Locale } from "@/lib/i18n";

const content = {
  home: {
    en: { title: "Your next game starts here", text: "Choose a court, check your letter level and join the matching matchmaking group to find players.", links: [["courts", "Compare courts in Kraków and Małopolska"], ["community", "Find players and arrange a match"]] },
    pl: { title: "Zaplanuj swoją następną grę", text: "Wybierz kort, sprawdź poziom literowy i dołącz do odpowiedniej grupy Matchmaking, aby znaleźć osoby do gry.", links: [["courts", "Porównaj korty w Krakowie i Małopolsce"], ["community", "Znajdź osoby do gry"]] },
  },
  courts: {
    en: { title: "Choose a court and plan your game", text: "Check the location, then confirm prices, availability and racket rental with the club before booking.", links: [["community", "Found a court? Find players at your level"], ["levels", "Check your playing level"]] },
    pl: { title: "Wybierz kort i zaplanuj grę", text: "Sprawdź lokalizację, a przed rezerwacją potwierdź w klubie ceny, dostępność i możliwość wypożyczenia rakiety.", links: [["community", "Masz już kort? Znajdź osoby do gry"], ["levels", "Sprawdź swój poziom gry"]] },
  },
  community: {
    en: { title: "How to find a game", text: "Choose a court, then use the template above to arrange a match.", links: [["levels", "Not sure of your level? Read our guide"], ["courts", "Choose a court for your match"]] },
    pl: { title: "Jak znaleźć osoby do gry?", text: "Wybierz kort i umów mecz, korzystając z szablonu powyżej.", links: [["levels", "Nie znasz swojego poziomu? Sprawdź przewodnik"], ["courts", "Wybierz kort na wspólny mecz"]] },
  },
  levels: {
    en: { title: "Ready to play?", text: "Join your matchmaking group and find a court.", links: [["community", "Find players at a similar level"], ["courts", "Find a court for your next game"]] },
    pl: { title: "Gotowi do gry?", text: "Dołącz do swojej grupy i znajdź kort.", links: [["community", "Znajdź graczy na podobnym poziomie"], ["courts", "Znajdź kort na następny mecz"]] },
  },
} as const;

export default function NextSteps({ locale, page }: { locale: Locale; page: keyof typeof content }) {
  const section = content[page][locale];
  return <section className="max-w-6xl mx-auto my-8 rounded-2xl border border-stone-200 bg-white p-6 text-left">
    <h2 className="text-xl font-bold text-stone-900 mb-3">{section.title}</h2>
    <p className="text-gray-700 leading-relaxed">{section.text}</p>
    <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
      {section.links.map(([key, label]) => <li key={key}><Link className="font-semibold text-stone-900 underline underline-offset-4" href={localizedRoutes[key][locale]}>{label}</Link></li>)}
    </ul>
  </section>;
}
