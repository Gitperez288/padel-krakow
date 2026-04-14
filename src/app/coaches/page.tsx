import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CoachesClient, { type Coach } from "./CoachesClient";

export const metadata: Metadata = {
  title: "Coaches | Padel Kraków Community",
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

const coaches: Coach[] = [
  {
    name: "Carlos",
    description:
      "Experienced padel coach with a passion for developing players of all levels. Trained in Argentina and brings a joyful, energetic style to every session. Available for individual and group training in Kraków.",
    languages: ["Spanish", "English"],
    location: "Kraków",
    instagram: null,
    photo: null,
  },
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
    name: "Victor",
    description:
      "Dynamic coach specialising in footwork, court coverage, and offensive play. Victor loves working with beginners and intermediates, making each training session engaging, practical, and results-driven.",
    languages: ["Spanish", "English"],
    location: "Kraków",
    instagram: null,
    photo: null,
  },
  {
    name: "Maciek",
    description:
      "Local padel enthusiast turned certified coach. Maciek brings high energy and a player-first mindset to every session. Focused on building a solid foundation and accelerating the progression of new players.",
    languages: ["Polish"],
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

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Hero */}
      <section className="bg-amber-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎓 Coaches</h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
            Meet the coaches of the Padel Kraków community. Whether you&apos;re
            just starting out or looking to sharpen your game, our coaches are
            here to help.
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
            Want to be featured on this page and reach hundreds of players in
            Kraków and Małopolska? Get in touch with us and we will add you to
            the list.
          </p>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition transform hover:scale-105"
          >
            Contact us via Community Groups <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
