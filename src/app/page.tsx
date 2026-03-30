import Link from "next/link";
import { 
  Trophy, 
  MapPin, 
  Users, 
  Newspaper, 
  Zap, 
  Target,
  Share2
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: "Find Your Level",
      description: "Explore our comprehensive skill level scale from beginner to professional.",
      href: "/levels",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Court Locations",
      description: "Discover all padel courts around Kraków and Małopolska with interactive map.",
      href: "/courts",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Connect with local players through WhatsApp and Facebook groups.",
      href: "/groups",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Read blog posts about Padel growth and community stories.",
      href: "/blog",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-600 to-amber-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
            {/* Logo Section */}
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
              <img
                src="/dragon-logo.png"
                alt="Dragon Logo"
                className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                🎾 Padel Kraków Community
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
                Connect with passionate padel players across Kraków and Małopolska. Find courts, match your skill level, and grow the sport together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/courts"
                  className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition transform hover:scale-105"
                >
                  <MapPin size={20} />
                  Find Courts
                </Link>
                <Link
                  href="/groups"
                  className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition transform hover:scale-105"
                >
                  <Share2 size={20} />
                  Join Groups
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
              fill="rgb(250, 245, 240)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-700 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get connected with the local padel community with tools designed for players
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition`} />
                  <div className="relative p-8 h-full flex flex-col">
                    <div className={`inline-flex w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} text-white items-center justify-center mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-amber-600 font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Trophy className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">8+</div>
              <p className="text-gray-600 mt-2">Padel Courts</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <p className="text-gray-600 mt-2">Community Members</p>
            </div>
            <div>
              <Target className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">7+</div>
              <p className="text-gray-600 mt-2">Skill Levels</p>
            </div>
            <div>
              <Zap className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">Active</div>
              <p className="text-gray-600 mt-2">Daily Matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-lg text-amber-100 mb-8">
            Start by finding your skill level, then join one of our community groups to find matches near you.
          </p>
          <Link
            href="/groups"
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition transform hover:scale-105"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </>
  );
}
