import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, UserCircle2, ChevronRight } from "lucide-react";

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

const coaches = [
  {
    name: "Carlos",
    description:
      "Experienced padel coach with a passion for developing players of all levels. Available for individual and group sessions in Kraków.",
    instagram: null,
    photo: null,
  },
  {
    name: "Mariano",
    description:
      "Dedicated coach focused on technique and match strategy. Helping players unlock their potential on the court.",
    instagram: null,
    photo: null,
  },
  {
    name: "Victor",
    description:
      "Dynamic coach specialising in footwork and offensive play. Loves working with beginners and intermediates.",
    instagram: null,
    photo: null,
  },
  {
    name: "Maciek",
    description:
      "Local padel enthusiast turned coach. Brings energy and a player-first mindset to every session.",
    instagram: null,
    photo: null,
  },
  {
    name: "Mateusz",
    description:
      "Focused on tactical development and consistent improvement. Offers training sessions adapted to your schedule.",
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

      {/* Coach Cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="h-52 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  {coach.photo ? (
                    <img
                      src={coach.photo}
                      alt={`${coach.name} – Padel Coach`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle2 className="w-24 h-24 text-amber-400" strokeWidth={1.2} />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow">{coach.description}</p>

                  {/* Instagram */}
                  {coach.instagram ? (
                    <Link
                      href={`https://instagram.com/${coach.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-800 transition text-sm"
                    >
                      <Instagram size={16} />@{coach.instagram}
                    </Link>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-2 text-gray-400 text-sm">
                      <Instagram size={16} /> Details coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* More details coming soon */}
          <div className="mt-14 text-center bg-white rounded-2xl shadow-sm px-8 py-10">
            <p className="text-2xl font-bold text-amber-700 mb-2">More details coming soon!</p>
            <p className="text-gray-500 max-w-lg mx-auto">
              We&apos;re gathering full profiles, availability, pricing, and more for each coach.
              Check back soon for the full picture.
            </p>
          </div>
        </div>
      </section>

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
