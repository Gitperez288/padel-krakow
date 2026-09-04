import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CoachesClient, { type Coach } from "@/app/(en)/coaches/CoachesClient";

export const metadata: Metadata = {
  title: "Padel Coaches in Kraków",
  description:
    "Meet the featured padel coaches of the Kraków and Małopolska community. Find a coach, improve your game, and take your padel to the next level.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/coaches",
  },
  openGraph: {
    title: "Padel Coaches – Padel Kraków Community",
    description:
      "Featured padel coaches in Kraków and Małopolska. Find a coach and improve your game.",
    url: "https://padel-krakow.vercel.app/coaches",
  },
};

// Draft coaches: not yet shown publicly
const _draftCoaches: Coach[] = [
  {
    name: "Mariano",
    description:
      "Dedicated coach focused on technique and match strategy. With a background in competitive padel, Mariano helps players of all levels unlock their potential and build consistency on the court.",
    languages: ["Spanish", "English"],
    location: "Kraków",
    instagram: null,
    photo: null,
  },
  {
    name: "Maciek",
    description:
      "Local padel enthusiast turned certified coach. Maciek brings high energy and a player-first mindset to every session. Focused on building a solid foundation and accelerating the progression of new players.",
    languages: ["Polish", "English"],
    location: "Kraków",
    instagram: null,
    photo: null,
  },
  {
    name: "Mateusz",
    description:
      "Focused on tactical development and consistent improvement. Mateusz offers personalised training sessions adapted to each player's schedule, goals, and current level. Great with intermediate players looking to level up.",
    languages: ["Polish", "English"],
    location: "Kraków",
    instagram: null,
    photo: null,
  },
];

const coaches: Coach[] = [
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
    name: "Carlos",
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
    name: "Angelika",
    description:
      "Certified padel coach and active player competing in national tournaments, as well as a passionate enthusiast of the sport 🎾\n\nShe has gained her experience under the guidance of top coaches in Poland and Spain 🇵🇱🇪🇸\n\nShe works with beginners, intermediate players, and children. She helps players understand the game on court - from the very first shot to tactical play.\n\nShe conducts training sessions with great dedication and an individual approach to every player.\n\nJoin her for an individual or group training session 👥",
    languages: ["Polish", "English"],
    location: "Kraków",
    instagram: "https://www.instagram.com/_angelika.b",
    photo: "/media/angelika.webp",
  },
];

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Hero */}
      <section className="bg-amber-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎓 Coaches</h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
            Whether you are picking up a racket for the first time or trying to take your game to the next level, 
            our directory helps you find passionate coaches in our community. The coaches listed here operate independently 
            or in partnership with local clubs, so please reach out to them directly to inquire about training sessions, 
            availability, and pricing.
          </p>
        </div>
      </section>

      {/* Interactive coach list (client component) */}
      <CoachesClient coaches={coaches} />

      {/* Self-submission CTA */}
      <section className="py-14 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a padel coach?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            This directory of coaches is freely available to everyone in our community. Please let us know if you want to be featured on this page 
            and reach hundreds of players in Małopolska. Get in touch with us and we will add you to
            the list without any cost.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition transform hover:scale-105"
          >
            Contact us via Community Groups <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
