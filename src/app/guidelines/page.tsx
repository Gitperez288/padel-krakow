import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  Megaphone,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community Guidelines | Padel Kraków Community",
  description:
    "Ground rules for the Padel Kraków WhatsApp community. How we keep our groups welcoming, fair, and safe for everyone.",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/guidelines",
  },
};

const groups = [
  {
    icon: Users,
    color: "from-blue-500 to-blue-600",
    title: "Padel Matchmaking",
    rules: [
      {
        heading: "Rate yourself honestly",
        body: "Use our skill level guide to find your level and include it every time you post a match or look for players. Honest self-rating keeps games balanced and fun for everyone.",
        link: { label: "Find your level", href: "/levels" },
      },
      {
        heading: "Be specific when organising a match",
        body: "Include: date and time, venue, number of players needed, and the level you are looking for. The more detail you share, the faster you find players.",
      },
      {
        heading: "Cancelled? Let the group know",
        body: "If you cancel a reservation, post it in the group immediately so someone else can book the court and keep the game going.",
      },
      {
        heading: "Keep it on topic",
        body: "This group is for organising matches only. For general chat, use Padel Chat. For club announcements, use Club Announcements.",
      },
      {
        heading: "Be kind",
        body: "A friendly message goes a long way. Respect other players regardless of their level or background.",
      },
    ],
  },
  {
    icon: ShoppingBag,
    color: "from-green-500 to-green-600",
    title: "Padel Market",
    rules: [
      {
        heading: "Padel items only",
        body: "Rackets, bags, balls, shoes, apparel, and accessories. Off-topic listings will be removed.",
      },
      {
        heading: "One post per item",
        body: "Include clear photos, a short description, the condition (new or used), and your asking price.",
      },
      {
        heading: "Individuals only",
        body: "This group is for personal resale, not commercial sellers or business accounts.",
      },
      {
        heading: "Mark sold items",
        body: "Update your post with SOLD once the item is gone to avoid unnecessary messages.",
      },
      {
        heading: "One bump per week",
        body: "You may repost an unsold listing once every 7 days. No repeated bumping.",
      },
      {
        heading: "Buyer and seller responsibility",
        body: "All transactions are strictly between buyer and seller. The community takes no responsibility for disputes, lost items, or payments.",
      },
    ],
  },
  {
    icon: Megaphone,
    color: "from-amber-500 to-amber-600",
    title: "Club Announcements",
    rules: [
      {
        heading: "Clubs only",
        body: "This channel is reserved for local clubs to share official announcements, events, and padel-relevant updates with the community.",
      },
      {
        heading: "Relevant content only",
        body: "Keep posts directly related to your club's padel activity. Avoid unrelated content.",
      },
      {
        heading: "Coaches and independent organisers",
        body: "If you are not a club, please use the Padel Chat group to announce events or coaching availability.",
      },
    ],
  },
  {
    icon: MessageCircle,
    color: "from-purple-500 to-purple-600",
    title: "Padel Chat",
    rules: [
      {
        heading: "Open discussion",
        body: "Talk about tournaments, rackets, balls and accessories, pro players, YouTube videos, and everything in between. This is the main social space of the community.",
      },
      {
        heading: "Independent events and coaches welcome",
        body: "Share independently organised events or announce yourself as a coach here. If you are affiliated with a club, use Club Announcements instead.",
      },
      {
        heading: "Keep it constructive",
        body: "Healthy debate is welcome. Personal attacks, trolling, and persistent negativity are not.",
      },
    ],
  },
  {
    icon: HeartHandshake,
    color: "from-pink-500 to-rose-500",
    title: "Girls Padel Kraków",
    rules: [
      {
        heading: "A space for female players",
        body: "This group was started by ladies in our community as a dedicated space to find and organise matches between female padel players.",
      },
      {
        heading: "Same rules as Matchmaking",
        body: "All Padel Matchmaking rules apply here: rate yourself honestly, be specific when organising a match, inform the group of cancellations, and be kind.",
        link: { label: "See Matchmaking rules above", href: "#padel-matchmaking" },
      },
    ],
  },
];

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-amber-600 hover:text-amber-700 font-semibold text-sm"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-amber-700 mt-6 mb-2">
          Community Guidelines
        </h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: June 2026</p>

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-gray-700 leading-relaxed space-y-4">
          <p>
            Welcome! This is the English-speaking community for all padel lovers in{" "}
            <strong>Kraków and Małopolska</strong>. Participate in topic-based groups,
            discuss padel, and receive important announcements about clubs, tournaments,
            leagues, and other events.
          </p>
          <p>
            This community is open to all, with no financial ties to any brand or
            business. It is independently managed by{" "}
            <strong>Carlos Viso</strong> and{" "}
            <strong>Francisco Pérez</strong>. You are welcome to share suggestions and
            spark conversations!
          </p>
          <p>
            To join our WhatsApp community and explore individual group topics, visit
            our{" "}
            <Link
              href="/community"
              className="text-amber-700 underline hover:text-amber-900 font-semibold"
            >
              Community page
            </Link>
            .
          </p>
        </div>

        {/* Language policy */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 flex gap-4">
          <Globe className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-gray-700 leading-relaxed">
            <p className="font-semibold text-gray-900 mb-1">Language policy</p>
            <p>
              Our groups are English-speaking by default. You are welcome to post in
              Polish, provided an English translation is included in the same message.
              Polish-only messages will not be removed, but we encourage everyone to
              take an inclusive approach so that all members can follow the conversation.
            </p>
          </div>
        </div>

        {/* General rules */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-gray-900">Rules that apply to all groups</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Be respectful. Disagreements are fine; personal attacks, harassment, or discrimination based on nationality, gender, age, or skill level are not.",
              "No hate speech or offensive content of any kind.",
              "Do not share other members' personal information without their explicit consent.",
              "No spamming, unsolicited advertising, or off-topic promotions.",
              "Admins reserve the right to remove content or members who repeatedly break these guidelines.",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Group-specific rules */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rules by group</h2>

        <div className="space-y-6">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                id={group.title.toLowerCase().replace(/\s+/g, "-")}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Group header */}
                <div className={`bg-gradient-to-r ${group.color} px-6 py-4 flex items-center gap-3`}>
                  <Icon className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">{group.title}</h3>
                </div>

                {/* Rules */}
                <ul className="divide-y divide-gray-100">
                  {group.rules.map((rule, i) => (
                    <li key={i} className="px-6 py-4 text-gray-700 leading-relaxed">
                      <p className="font-semibold text-gray-900 mb-1">{rule.heading}</p>
                      <p className="text-sm">{rule.body}</p>
                      {rule.link && (
                        <Link
                          href={rule.link.href}
                          className="inline-block mt-1 text-sm text-amber-700 font-semibold hover:text-amber-900 underline underline-offset-2"
                        >
                          {rule.link.label} →
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-sm text-gray-500 space-y-2">
          <p>
            These guidelines are subject to change. We will notify the community of any
            significant updates.
          </p>
          <p>
            Questions or suggestions?{" "}
            <a
              href="mailto:padelkrkcommunity@gmail.com"
              className="text-amber-700 underline hover:text-amber-900"
            >
              padelkrkcommunity@gmail.com
            </a>
          </p>
          <p className="pt-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="text-gray-400 hover:text-gray-600 underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
