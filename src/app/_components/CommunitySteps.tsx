import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { otherCommunityGroups, matchmakingGroups } from "@/lib/community";
import MatchmakingGuide from "./MatchmakingGuide";
import MatchPostTemplate from "./MatchPostTemplate";

export default function CommunitySteps({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <section className="mx-auto max-w-6xl py-8 text-left" aria-labelledby="first-game">
    <h2 id="first-game" className="text-2xl font-bold">{pl ? "Od dołączenia do pierwszej gry" : "From joining to your first game"}</h2>
    <ol className="my-6 grid list-inside list-decimal gap-4 sm:grid-cols-3">
      <li className="surface p-5">{pl ? "Otwórz zaproszenie i dołącz bezpłatnie do społeczności WhatsApp." : "Open the invitation and join our WhatsApp community for free."}</li>
      <li className="surface p-5">{pl ? "Otwórz listę grup i dołącz do grupy pasującej do Twojego poziomu." : "Open the group list and join the group for your level."}</li>
      <li className="surface p-5">{pl ? "Odpowiedz na ogłoszenie pasujące do Twojego poziomu lub opublikuj własne, korzystając z szablonu poniżej." : "Respond to a match that fits your level or post your own using the template below."}</li>
    </ol>
    <MatchmakingGuide locale={locale} showJoinLink={false} />
    <h2 className="mb-4 text-2xl font-bold">{pl ? "Pozostałe grupy" : "Other groups"}</h2>
    <div className="grid gap-4 sm:grid-cols-2">{otherCommunityGroups.map(group => <article key={group.name} className="surface p-5"><h3 className="font-bold">{group.name}</h3><p className="mt-2 text-sm text-stone-600">{group.description[locale]}</p></article>)}</div>
    <p className="my-5 text-sm text-stone-600">{pl ? "W ogłoszeniach całej społeczności administratorzy publikują ważne aktualności i informacje organizacyjne." : "Community-wide Announcements carries important admin updates and community information."}</p>
    <MatchPostTemplate locale={locale} />
    <p className="mt-4 text-sm"><Link className="underline" href={localizePath("/levels", locale)}>{pl ? "Sprawdź swój poziom" : "Find your level"}</Link> · <Link className="underline" href={localizePath("/guidelines", locale)}>{pl ? "Przeczytaj zasady grup" : "Read the group guidelines"}</Link></p>
    <h2 className="mt-10 mb-5 text-2xl font-bold">{pl ? "Pytania przed dołączeniem" : "Before you join"}</h2>
    {[
      ["Can beginners join?", "Yes. Join Beginner & Developing (D–C2)" + " · ≈" + matchmakingGroups[0].numericRange + ".", "Czy początkujący mogą dołączyć?", "Tak. Dołącz do Beginner & Developing (D–C2)" + " · ≈" + matchmakingGroups[0].numericRange + "."],
      ["Can I join two level groups?", "Yes. Choose matches at your usual level.", "Czy mogę dołączyć do dwóch grup poziomów?", "Tak. Wybieraj mecze na swoim zwykłym poziomie."],
      ["Can I join while visiting Kraków?", "Yes. Visitors are welcome. Share the dates you will be here and your preferred area.", "Czy mogę dołączyć podczas wizyty w Krakowie?", "Tak. Goście są mile widziani. Podaj daty pobytu i preferowaną okolicę."],
      ["Is joining free?", "Yes. Community membership is free. Court bookings, lessons and paid activities are arranged separately with their providers.", "Czy dołączenie jest bezpłatne?", "Tak. Członkostwo jest bezpłatne. Rezerwacje kortów, treningi i płatne aktywności ustalasz osobno z ich organizatorami."],
    ].map(([q,a,pq,pa]) => <details key={q} className="border-b border-stone-200 py-4"><summary className="cursor-pointer font-semibold">{pl ? pq : q}</summary><p className="mt-3 text-stone-600">{pl ? pa : a}</p></details>)}
  </section>;
}
