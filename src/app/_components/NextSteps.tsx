import Link from "next/link";
import { localizedRoutes, type Locale, type PageKey } from "@/lib/i18n";

const content = {
  home: {
    en: { title: "Your next game starts here", text: "Choose a court, check your level and meet people to play with. You do not need to arrive with a ready-made group.", links: [["courts", "Compare courts in Kraków and Małopolska"], ["community", "Find players and arrange a match"]] },
    pl: { title: "Zaplanuj swoją następną grę", text: "Wybierz kort, sprawdź swój poziom i poznaj osoby do wspólnej gry. Nie musisz mieć własnej grupy graczy.", links: [["courts", "Porównaj korty w Krakowie i Małopolsce"], ["community", "Znajdź osoby do gry"]] },
  },
  courts: {
    en: { title: "Choose a court and plan your game", text: "Check the address: this guide includes Kraków, nearby towns and venues elsewhere in Małopolska. Court counts refer to doubles or singles courts, not players. Before booking, confirm the current price, racket rental and availability directly with the club. Use the directions link to plan your journey. Practical notes include their source and check date.", links: [["community", "Found a court? Find players at your level"], ["levels", "Check your playing level"]] },
    pl: { title: "Wybierz kort i zaplanuj grę", text: "Sprawdź adres: zestawienie obejmuje Kraków, pobliskie miejscowości i pozostałą część Małopolski. Liczby oznaczają korty deblowe lub singlowe, nie graczy. Przed rezerwacją potwierdź w klubie aktualną cenę, możliwość wypożyczenia rakiety i dostępność. Trasę zaplanujesz przez link dojazdu. Praktyczne informacje zawierają źródło i datę sprawdzenia.", links: [["community", "Masz już kort? Znajdź osoby do gry"], ["levels", "Sprawdź swój poziom gry"]] },
  },
  community: {
    en: { title: "How to find a game", text: "Open the invitation above, read the group rules and introduce yourself with your level, preferred courts and available times. Join a game or propose your own, then confirm the booking and share the costs.", links: [["levels", "Not sure of your level? Read our guide"], ["courts", "Choose a court for your match"]] },
    pl: { title: "Jak znaleźć osoby do gry?", text: "Otwórz zaproszenie powyżej, przeczytaj zasady grupy i przedstaw się: podaj swój poziom, preferowane korty i dostępne terminy. Dołącz do meczu lub zaproponuj własny, a następnie ustalcie rezerwację i podział kosztów.", links: [["levels", "Nie znasz swojego poziomu? Sprawdź przewodnik"], ["courts", "Wybierz kort na wspólny mecz"]] },
  },
  levels: {
    en: { title: "Assess your typical game, not your best shot", text: "Think about several recent matches: can you maintain a rally, defend after the glass and move forward with your partner? If you are between levels, start with the lower group and adjust after playing. This is an approximate community guide, not an official rating or a universal conversion between club and app scales.", links: [["community", "Find players at a similar level"], ["courts", "Find a court for your next game"]] },
    pl: { title: "Oceń swoją zwykłą grę, nie najlepsze uderzenie", text: "Przypomnij sobie kilka ostatnich meczów: czy utrzymujesz wymianę, bronisz po odbiciu od szyby i podchodzisz do siatki razem z partnerem? Jeśli wahasz się między poziomami, zacznij od niższej grupy i zweryfikuj ocenę po grze. To orientacyjny przewodnik społeczności, a nie oficjalny ranking ani uniwersalny przelicznik skal klubowych i aplikacji.", links: [["community", "Znajdź graczy na podobnym poziomie"], ["courts", "Znajdź kort na następny mecz"]] },
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
