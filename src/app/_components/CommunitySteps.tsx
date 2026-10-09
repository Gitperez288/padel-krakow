import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { languagePolicy, otherCommunityGroups } from "@/lib/community";
import MatchmakingGuide from "./MatchmakingGuide";
import MatchPostTemplate from "./MatchPostTemplate";

export default function CommunitySteps({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <section className="mx-auto max-w-6xl py-8 text-left" aria-labelledby="first-game">
    <h2 id="first-game" className="text-2xl font-bold">{pl ? "Od dołączenia do pierwszej gry" : "From joining to your first game"}</h2>
    <ol className="my-6 grid list-inside list-decimal gap-4 sm:grid-cols-3">
      <li className="surface p-5">{pl ? "Otwórz zaproszenie i dołącz bezpłatnie do społeczności WhatsApp." : "Open the invitation and join our WhatsApp community for free."}</li>
      <li className="surface p-5">{pl ? "Sprawdź swój poziom i otwórz listę grup w społeczności. Ręcznie dołącz do odpowiedniej grupy Matchmaking oraz innych grup, które Cię interesują." : "Check your level and open the community's group list. Manually join the matching level group and any other groups that interest you."}</li>
      <li className="surface p-5">{pl ? "Odpowiedz na ogłoszenie pasujące do Twojego poziomu lub opublikuj własne, korzystając z szablonu poniżej." : "Respond to a match that fits your level or post your own using the template below."}</li>
    </ol>
    <p className="mb-5 font-semibold text-orange-800">{pl ? "Dołączenie do społeczności nie zapisuje Cię automatycznie do grup tematycznych." : "Joining the community does not automatically add you to the topic groups."}</p>
    <p className="surface mb-6 p-5">{languagePolicy[locale]}</p>
    <MatchmakingGuide locale={locale} showJoinLink={false} />
    <h2 className="mb-4 text-2xl font-bold">{pl ? "Pozostałe grupy" : "Other groups"}</h2>
    <div className="grid gap-4 sm:grid-cols-2">{otherCommunityGroups.map(group => <article key={group.name} className="surface p-5"><h3 className="font-bold">{group.name}</h3><p className="mt-2 text-sm text-stone-600">{group.description[locale]}</p></article>)}</div>
    <p className="my-5 text-sm text-stone-600">{pl ? "W ogłoszeniach całej społeczności administratorzy publikują ważne aktualności i informacje organizacyjne." : "Community-wide Announcements carries important admin updates and community information."}</p>
    <MatchPostTemplate locale={locale} />
    <p className="mt-4 text-sm"><Link className="underline" href={localizePath("/levels", locale)}>{pl ? "Sprawdź swój poziom" : "Find your level"}</Link> · <Link className="underline" href={localizePath("/guidelines", locale)}>{pl ? "Przeczytaj zasady grup" : "Read the group guidelines"}</Link></p>
    <h2 className="mt-10 mb-5 text-2xl font-bold">{pl ? "Pytania przed dołączeniem" : "Before you join"}</h2>
    {[
      ["Can beginners join?", "Yes. Start with Beginner & Developing (D–C2) · ≈0–2.5. D is for people new to padel; ask for help if unsure of your level.", "Czy początkujący mogą dołączyć?", "Tak. Zacznij od Beginner & Developing (D–C2) · ≈0–2.5. D oznacza pierwsze kroki w padlu. Jeśli nie znasz swojego poziomu, poproś o pomoc."],
      ["Do I need to speak English?", languagePolicy.en, "Czy muszę mówić po angielsku?", languagePolicy.pl],
      ["Can I join two level groups?", "Yes, if you are near a boundary. Respond only to matches whose requested letter level or range fits your usual game.", "Czy mogę dołączyć do dwóch grup poziomów?", "Tak, jeśli jesteś blisko granicy poziomów. Zgłaszaj się tylko do meczów, których wymagany poziom lub zakres literowy odpowiada Twojej zwykłej grze."],
      ["Can I join while visiting Kraków?", "Yes. Visitors are welcome. Share the dates you will be here and your preferred area.", "Czy mogę dołączyć podczas wizyty w Krakowie?", "Tak. Goście są mile widziani. Podaj daty pobytu i preferowaną okolicę."],
      ["Is joining free?", "Yes. Community membership is free. Court bookings, lessons and paid activities are arranged separately with their providers.", "Czy dołączenie jest bezpłatne?", "Tak. Członkostwo jest bezpłatne. Rezerwacje kortów, treningi i płatne aktywności ustalasz osobno z ich organizatorami."],
    ].map(([q,a,pq,pa]) => <details key={q} className="border-b border-stone-200 py-4"><summary className="cursor-pointer font-semibold">{pl ? pq : q}</summary><p className="mt-3 text-stone-600">{pl ? pa : a}</p></details>)}
  </section>;
}
