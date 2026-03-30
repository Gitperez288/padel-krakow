import type { Metadata } from "next";
import { UserCircle2, Users2, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Who We Are | Padel Kraków Community",
  description:
    "Meet the founders and collaborators behind the Padel Kraków Community — the people-first initiative growing padel across Kraków and Małopolska.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/who-we-are",
  },
  openGraph: {
    title: "Who We Are – Padel Kraków Community",
    description:
      "Meet the team behind Padel Kraków Community — growing padel across Kraków and Małopolska.",
    url: "https://padel-krakow.vercel.app/who-we-are",
  },
};

const founders = [
  {
    name: "Fran",
    role: "Co-founder",
    bio: "More about Fran coming soon. Stay tuned!",
    photo: null,
  },
  {
    name: "Carlos",
    role: "Co-founder",
    bio: "More about Carlos coming soon. Stay tuned!",
    photo: null,
  },
];

const collaborators = [
  { name: "Collaborator 1", role: "Blog & Community", photo: null },
  { name: "Collaborator 2", role: "Events & Outreach", photo: null },
  { name: "Collaborator 3", role: "Courts & Logistics", photo: null },
];

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Hero */}
      <section className="bg-amber-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">👋 Who We Are</h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
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
            <h2 className="text-3xl font-bold text-amber-700 mb-2">The Founders</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Padel Kraków Community was started by two friends who fell in love
              with the sport and wanted to share it with the whole region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
            {founders.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center hover:shadow-xl transition"
              >
                {/* Photo */}
                <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle2
                      className="w-32 h-32 text-amber-400"
                      strokeWidth={1.2}
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{person.name}</h3>
                  <span className="inline-block mt-1 mb-4 text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
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
          <Star className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe padel is more than a sport — it&apos;s about people,
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
            <Users2 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-amber-700 mb-2">Our Collaborators</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We have a growing team of amazing people contributing to the blog,
              community events, and everything in between.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {collaborators.map((collab) => (
              <div
                key={collab.name}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center mb-4">
                  {collab.photo ? (
                    <img
                      src={collab.photo}
                      alt={collab.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <UserCircle2 className="w-12 h-12 text-amber-400" strokeWidth={1.2} />
                  )}
                </div>
                <p className="font-semibold text-gray-400 text-sm">{collab.role}</p>
              </div>
            ))}
          </div>

          {/* Coming soon */}
          <div className="mt-12 text-center bg-white rounded-2xl shadow-sm px-8 py-10 border-2 border-dashed border-amber-200">
            <p className="text-xl font-bold text-amber-700 mb-2">More coming soon!</p>
            <p className="text-gray-500 max-w-md mx-auto">
              We&apos;re building a team of passionate people who love padel and
              community. Full collaborator profiles will be published shortly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
