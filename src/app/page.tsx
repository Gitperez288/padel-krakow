// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="px-4 py-10">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            <Image
              src="/dragon-logo.png" // save this image in /public
              alt="Kraków Padel Community Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-700 mb-3">
            Padel Kraków & Małopolska Community
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome! This is the home of the Padel community in Kraków and all around
            Małopolska. Here you’ll find our level scale, court locations, links to our
            WhatsApp and Facebook groups, and a growing blog about Padel’s local development.
            More features are coming soon — jump in and play with us!
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-6xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/levels" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-amber-700 mb-2">🎯 Level Scale & Definitions</h3>
          <p className="text-gray-600">Find your level to match with players of similar skill.</p>
        </Link>

        <Link href="/courts" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-amber-700 mb-2">📍 Court Locations</h3>
          <p className="text-gray-600">Explore all courts around Kraków and Małopolska.</p>
        </Link>

        <Link href="/groups" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-amber-700 mb-2">💬 Community Groups</h3>
          <p className="text-gray-600">Join our WhatsApp & Facebook groups to find matches.</p>
        </Link>

        <Link href="/blog" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-amber-700 mb-2">📰 Blog</h3>
          <p className="text-gray-600">Read about Padel’s growth and local stories.</p>
        </Link>

        <Link href="/about" className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-amber-700 mb-2">✨ What’s Next</h3>
          <p className="text-gray-600">Rankings, tournaments, and more — coming soon.</p>
        </Link>
      </section>
    </div>
  );
}
