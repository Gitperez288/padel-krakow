import CommunityCTA from "@/app/_components/CommunityCTA";
import { type Locale } from "@/lib/i18n";
import { getServerTranslator as getTranslator } from "@/lib/translations-server";
import { Instagram } from "lucide-react";
import CoachesClient, { type Coach } from "@/app/(en)/coaches/CoachesClient";


const coaches: Coach[] = [
{
  "name": "Bartosz Puzio",
  "description": "I'm playing racket sports all my life, but padel is where I truly feel at home.\nCertified coach by Polish Padel Federation, I constantly search for new ways to increase my understanding of this beautiful and intricate game, practicing with the best coaches in Poland and abroad.\n\nI offer individual and group training sessions and matchplays, for beginners as well as advanced players. I have special interest in padel tactics and movement around the court - come and see how big of a difference it makes!\n\nLet's hit the court to make padel easier and even more fun!",
  "languages": [
    "Polish",
    "English"
  ],
  "location": "Kraków",
  "instagram": "https://www.instagram.com/bartosz.padel/",
  "photo": "/media/bartosz.webp"
},
{
  "name": "Julia Piątek",
  "description": "Hi, I'm Julka!\n\n🎾 I've been involved in tennis since the age of 5. I am a multiple Polish Championships medallist in singles, doubles and mixed doubles 🏆, and my highest position in the PZT women's rankings was No. 10.\n\n👩‍🏫 I've been working as a tennis coach for 7 years, teaching children and adults at different skill levels. I also studied in the USA 🇺🇸 at Eastern Michigan University, where I represented the university in NCAA competition.\n\n💜 I've been playing padel for 3 years. I've competed in many tournaments and earned podium finishes 🏆, and I've completed a padel instructor course. I offer individual, two-person and group training sessions.\n\nDuring my sessions at @_spotkrk_, I focus on 🎯 technique, movement, tactics and confidence, tailoring each session to every player's level and goals.\n\n😄 What matters most? Effective training, progress and plenty of fun on court!\n\n📥 Want to book a session? Send me a DM / @tenis4u.pl\n\nSee you on court! 🎾",
  "languages": [
    "Polish",
    "English"
  ],
  "location": "Modlniczka",
  "instagram": "https://www.instagram.com/julkaapiaa/",
  "photo": "/media/julia.webp"
},
  {
    name: "Wika Michalczyk",
    description:
      "I am a PZT-licensed tennis coach and padel coach. I have been playing tennis for 18 years, and I bring my competitive experience and tennis background to the dynamic world of padel.\n\nAt Padel Spot KRK / Modlniczka, I coach beginner and intermediate players.\n\nMy coaching combines technique, movement awareness and an individual approach to every player. I focus on development, quality and smart, conscious play, regardless of skill level. My goal is for every session to be effective while also building confidence and making the game enjoyable.",
    languages: ["Polish", "English"],
    location: "Modlniczka",
    instagram: "https://www.instagram.com/padel.wika/",
    photo: "/media/wika-michalczyk.jpg",
  },
  {
    name: "Victor Guedes",
    description:
      "My name is Victor Guedes, I'm 25 years old and originally from Brazil. I've had a racket in my hands almost my entire life; I started playing tennis at the age of 6 and discovered padel when I was 12 while living in Portugal.\n\nDuring my time there, I developed my game under the guidance of coach João Barros, as well as other top coaches from Spain and Argentina.\n\nWhether you're just getting started with padel or looking to take your game to the next level, I'd be happy to help. Feel free to join me for private lessons, match play sessions, or group games. See you on court! 🎾",
    languages: ["Polish", "English", "Portuguese", "Spanish", "French"],
    location: "Kraków",
    instagram: "https://www.instagram.com/padelhouse_krakow/",
    photo: "/media/victor-guedes.webp",
  },
  {
    name: "Carlos G. Viso",
    description:
      "Hi! I'm a certified coach accredited by the Spanish & Polish Padel Federations, with a background in Physical Activity and Sport Sciences.\n\nWhether you're trying padel for the first time or looking to improve your game, I offer individual & small group training sessions for beginners and intermediate players of all ages 📈\n\nMy coaching focuses on developing solid technique, improving tactical understanding, and building confidence on court in a positive and supportive environment while learning and enjoying.\n\nReady to level up your game? Join Padel with Carlos! 🎾💪🏼",
    languages: ["Spanish", "English"],
    location: "Kraków",
    instagram: "https://www.instagram.com/padel_with_carlos",
    photo: "/media/carlos.webp",
  },
  {
    name: "Alex Cabezas",
    description:
      "From Madrid, bringing 15+ years of passion and dual Spain/Poland Padel Federations coach certifications, I offer dynamic, high-energy sessions designed to level up your game while having serious fun. Whether you're refining technique or starting fresh, let's hit the court and improve together.",
    languages: ["Spanish", "English"],
    location: "Kraków",
    instagram: "https://www.instagram.com/alejandropadelkrakow",
    photo: "/media/alex.webp",
  },
  {
    name: "Miłosz Czech",
    description:
      "Padel is my absolute passion, and I want to help you reach your potential. Whether you're a complete beginner or looking to eliminate mistakes and level up, I've got you covered. Let's step on the court, refine your skills, and make real progress!",
    languages: ["Polish", "English"],
    location: "Kraków",
    instagram: "https://www.instagram.com/mcz.padel",
    photo: "/media/milosz.webp",
  },
  {
    name: "Angelika Bryła",
    description:
      "Certified padel coach and active player competing in national tournaments, as well as a passionate enthusiast of the sport 🎾\n\nShe has gained her experience under the guidance of top coaches in Poland and Spain 🇵🇱🇪🇸\n\nShe works with beginners, intermediate players, and children. She helps players understand the game on court - from the very first shot to tactical play.\n\nShe conducts training sessions with great dedication and an individual approach to every player.\n\nJoin her for an individual or group training session 👥",
    languages: ["Polish", "English"],
    location: "Kraków",
    instagram: "https://www.instagram.com/_angelika.b",
    photo: "/media/angelika.webp",
  },
];

export default function CoachesPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="eyebrow mb-3">{t("Learn. Play. Improve.")}</p>
        <h1 className="page-heading mb-4">{locale === "pl" ? "Trenerzy padla w Krakowie" : "Padel coaches in Kraków"}</h1>
        <p className="max-w-2xl text-stone-600 leading-relaxed">{t("Meet local padel coaches for every level. Contact them directly for lessons, availability and prices.")}</p>
      </section>
      <div className="mx-auto max-w-6xl px-4">
        <CommunityCTA locale={locale} />
      </div>
      <CoachesClient coaches={coaches.map(coach => ({ ...coach, description: t(coach.description) }))} locale={locale} />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="surface flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div><h2 className="text-xl font-bold text-stone-900">{t("Are you a padel coach?")}</h2><p className="mt-2 text-sm text-stone-600">{t("Join our directory for free. DM @padelkrkcommunity on Instagram with your name, photo, a short bio, coaching languages and contact details.")}</p></div>
          <a href="https://ig.me/m/padelkrkcommunity" target="_blank" rel="noopener noreferrer" className="button-primary shrink-0"><Instagram size={18} aria-hidden="true" />{t("DM us on Instagram")}</a>
        </div>
      </section>
    </div>
  );
}
