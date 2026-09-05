import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
const groups = [
  ["Padel Matchmaking", "Find partners and organise matches. Post your level, date, time, venue and how many players you need.", "Szukaj osób do gry i umawiaj mecze. Podaj poziom, datę, godzinę, klub i liczbę brakujących osób."],
  ["Padel Chat", "Ask questions and chat about padel, equipment and training.", "Zadawaj pytania i rozmawiaj o padlu, sprzęcie oraz treningach."],
  ["Club Announcements", "Follow local clubs' announcements and padel updates.", "Śledź ogłoszenia lokalnych klubów i aktualności padlowe."],
  ["Girls Padel Kraków", "A space for women to meet other players and organise games.", "Miejsce dla kobiet, które chcą poznać partnerki i umawiać gry."],
  ["Padel Market", "Buy and sell secondhand padel equipment locally.", "Kupuj i sprzedawaj używany sprzęt do padla w okolicy."],
];
export default function CommunitySteps({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return <section className="mx-auto max-w-6xl py-8 text-left" aria-labelledby="first-game">
    <h2 id="first-game" className="text-2xl font-bold">{pl ? "Od dołączenia do pierwszej gry" : "From joining to your first game"}</h2>
    <ol className="my-6 grid list-inside list-decimal gap-4 sm:grid-cols-3">
      <li className="surface p-5">{pl ? "Otwórz zaproszenie i dołącz do społeczności WhatsApp. Dołączenie jest bezpłatne." : "Open the invitation and join our WhatsApp community. Membership is free."}</li>
      <li className="surface p-5">{pl ? "Otwórz listę grup w społeczności. Ręcznie dołącz do Padel Matchmaking oraz pozostałych grup, które Cię interesują." : "Open the community's group list. Manually join Padel Matchmaking and any other groups that interest you."}</li>
      <li className="surface p-5">{pl ? "Przedstaw się i napisz, kiedy chcesz zagrać. Polski i angielski są mile widziane." : "Introduce yourself and say when you want to play. Polish and English are both welcome."}</li>
    </ol>
    <p className="mb-6 font-semibold text-orange-800">{pl ? "Samo dołączenie do społeczności nie zapisuje Cię automatycznie do wszystkich grup." : "Joining the community does not automatically add you to all five groups."}</p>
    <div className="grid gap-4 sm:grid-cols-2">{groups.map(([name,en,polish]) => <div key={name} className="surface p-5"><h3 className="font-bold">{name}</h3><p className="mt-2 text-sm text-stone-600">{pl ? polish : en}</p></div>)}</div>
    <div className="surface mt-6 p-6"><h3 className="font-bold">{pl ? "Przykładowa wiadomość do Padel Matchmaking" : "Example message for Padel Matchmaking"}</h3><blockquote className="mt-3 border-l-2 border-orange-700 pl-4 text-stone-600">{pl ? "Cześć! Szukam [liczba] osób na padla [data, godzina] w [klub]. Mój poziom: [poziom]. Kort [zarezerwowany / do rezerwacji]. Kto chce zagrać?" : "Hi! Looking for [number] players for padel on [date, time] at [club]. My level is [level]. Court [booked / still to book]. Who's in?"}</blockquote><p className="mt-4 text-sm"><Link className="underline" href={localizePath("/levels", locale)}>{pl ? "Sprawdź swój poziom" : "Find your level"}</Link> · <Link className="underline" href={localizePath("/guidelines", locale)}>{pl ? "Przeczytaj zasady grup" : "Read the group guidelines"}</Link></p></div>
    <h2 className="mt-10 mb-5 text-2xl font-bold">{pl ? "Pytania przed dołączeniem" : "Before you join"}</h2>
    {[
      ["Can beginners join?", "Yes. All levels are welcome. Include your level when looking for a game, and ask for help if you are unsure.", "Czy początkujący mogą dołączyć?", "Tak. Zapraszamy osoby na każdym poziomie. Podaj swój poziom, gdy szukasz gry. Jeśli nie masz pewności, poproś o pomoc."],
      ["Do I need to speak English?", "No. You can post in Polish or English. An English translation is not a requirement.", "Czy muszę mówić po angielsku?", "Nie. Możesz pisać po polsku lub angielsku. Tłumaczenie na angielski nie jest wymagane."],
      ["Can I join while visiting Kraków?", "Yes. Visitors are welcome. Share the dates you will be here and your preferred area.", "Czy mogę dołączyć podczas wizyty w Krakowie?", "Tak. Goście są mile widziani. Podaj daty pobytu i preferowaną okolicę."],
      ["Is joining free?", "Yes. Community membership is free. Court bookings, lessons and any paid activities are arranged separately with their providers.", "Czy dołączenie jest bezpłatne?", "Tak. Członkostwo jest bezpłatne. Rezerwacje kortów, treningi i ewentualne płatne aktywności ustalasz osobno z ich organizatorami."],
    ].map(([q,a,pq,pa]) => <details key={q} className="border-b border-stone-200 py-4"><summary className="cursor-pointer font-semibold">{pl ? pq : q}</summary><p className="mt-3 text-stone-600">{pl ? pa : a}</p></details>)}
  </section>;
}
