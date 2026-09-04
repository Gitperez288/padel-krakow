import type { Metadata } from "next";
import { UserCircle2, Users2, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Meet the founders and collaborators behind the Padel Kraków Community, the people-first initiative growing padel across Kraków and Małopolska.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/who-we-are",
  },
  openGraph: {
    title: "Who We Are – Padel Kraków Community",
    description:
      "Meet the team behind Padel Kraków Community, growing padel across Kraków and Małopolska.",
    url: "https://padel-krakow.vercel.app/who-we-are",
  },
};

const founders = [
  {
    name: "Fran",
    role: "Co-founder",
    bio: "A passionate padel player originally from Spain, Fran has been living in Poland for over 9 years. He is the lead developer behind this community page and is committed to building a fair, welcoming, and inclusive space for players across Kraków and Małopolska.",
    photo: "/media/fran.webp",
  },
  {
    name: "Carlos",
    role: "Co-founder",
    bio: "Born in Spain and based in Kraków, Carlos is a certified padel coach and one of the driving forces behind the community. Everything began when he created the original Matchmaking group in 2022! He helps grow and moderate the space, making sure it stays welcoming, active, and accessible for players of all levels.",
    photo: "/media/carlos.webp",
  },
];

const collaborators = [
  {
    name: "Gabriele",
    role: "Community Events Coordinator",
    bio: "Gabriele is from Sardinia 🇮🇹 and has been living in Kraków for the past 12 years. Passionate about padel and community building, he organises events, tournaments, and leagues in Kraków, helping bring players together and grow the sport locally.\n\nAlways looking for new ideas and initiatives, Gabriele encourages more people to discover padel and actively contributes to building a strong, welcoming community for players of all levels.",
    photo: "/media/gabriele.webp",
  },
];

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-orange-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">👋 Who We Are</h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto">
            We are a small, passionate team on a mission to build the most
            welcoming padel community in Kraków and Małopolska. People first,
            always.
          </p>
        </div>
      </section>

      {/* About Us / Founders */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-2">The Founders</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Padel Kraków Community was started by two friends who fell in love
              with Padel and wanted to share it with the whole region. The group
              started when there was just one court in Cracow!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
            {founders.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center hover:shadow-xl transition"
              >
                {/* Photo */}
                <div className="w-full aspect-square bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center overflow-hidden">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle2
                      className="w-32 h-32 text-stone-500"
                      strokeWidth={1.2}
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{person.name}</h3>
                  <span className="inline-block mt-1 mb-4 text-sm font-medium text-stone-900 bg-stone-100 px-3 py-1 rounded-full">
                    {person.role}
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="w-10 h-10 text-orange-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe padel is more than a sport; it&apos;s about people,
            connections, and community. Our goal is to make padel accessible and
            enjoyable for everyone in Kraków and Małopolska, from absolute
            beginners to seasoned players. More details about our story coming
            soon.
          </p>
        </div>
      </section>

      {/* Collaborators */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Users2 className="w-10 h-10 text-orange-700 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Our Collaborators</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We have a growing team of amazing people contributing to the blog,
              community events, and everything in between.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 gap-10 max-w-sm mx-auto">
            {collaborators.map((collab) => (
              <div
                key={collab.name}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center overflow-hidden">
                  {collab.photo ? (
                    <img
                      src={collab.photo}
                      alt={collab.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle2 className="w-32 h-32 text-stone-500" strokeWidth={1.2} />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{collab.name}</h3>
                  <span className="inline-block mt-1 mb-4 text-sm font-medium text-stone-900 bg-stone-100 px-3 py-1 rounded-full">
                    {collab.role}
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{collab.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
