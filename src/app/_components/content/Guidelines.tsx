import { type Locale, localizePath } from "@/lib/i18n";
import { getServerTranslator as getTranslator } from "@/lib/translations-server";
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

export default function GuidelinesPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href={localizePath("/", locale)}
          className="text-orange-700 hover:text-stone-900 font-semibold text-sm"
        >{t("← Back to Home")}</Link>

        <h1 className="text-4xl font-bold text-stone-900 mt-6 mb-2">{t("Community Guidelines")}</h1>
        <p className="text-sm text-gray-500 mb-10">{t("Last updated: September 2026")}</p>

        <div className="surface p-6 mb-6 space-y-4">
          <p>{t("Welcome to our free community for padel players in Kraków and Małopolska. All levels, local residents and visitors are welcome. Join topic groups to find games, chat and follow club announcements.")}</p>
          <p>{t("The community is independently managed by Carlos G. Viso and Francisco Pérez (Fran). Share your suggestions and help us make it welcoming for everyone.")}</p>
          <Link href={localizePath("/community", locale)} className="font-semibold underline">{t("Join the community and choose your subgroups.")}</Link>
        </div>

        {/* Language policy */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-6 flex gap-4">
          <Globe className="w-6 h-6 text-orange-700 flex-shrink-0 mt-0.5" />
          <div className="text-gray-700 leading-relaxed">
            <p className="font-semibold text-gray-900 mb-1">{t("Language policy")}</p>
            <p>{t("Polish and English are both welcome. You can post in either language. A translation is helpful when needed, but it is not required.")}</p>
          </div>
        </div>

        {/* General rules */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-6 h-6 text-orange-700 flex-shrink-0" />
            <h2 className="text-xl font-bold text-gray-900">{t("Rules that apply to all groups")}</h2>
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
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-stone-900 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{t(rule)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Group-specific rules */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("Rules by group")}</h2>

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
                      <p className="font-semibold text-gray-900 mb-1">{t(rule.heading)}</p>
                      <p className="text-sm">{t(rule.body)}</p>
                      {rule.link && (
                        <Link
                          href={localizePath(rule.link.href, locale)}
                          className="inline-block mt-1 text-sm text-stone-900 font-semibold hover:text-orange-800 underline underline-offset-2"
                        >
                          {t(rule.link.label)} →
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
          <p>{t("These guidelines are subject to change. We will notify the community of any significant updates.")}</p>
          <p>{t("Questions or suggestions?")}{" "}
            <a
              href="mailto:padelkrkcommunity@gmail.com"
              className="text-stone-900 underline hover:text-orange-800"
            >
              padelkrkcommunity@gmail.com
            </a>
          </p>
          <p className="pt-2">
            <Link href={localizePath("/privacy", locale)} className="text-gray-400 hover:text-gray-600 underline">{t("Privacy Policy")}</Link>
            {" · "}
            <Link href={localizePath("/terms", locale)} className="text-gray-400 hover:text-gray-600 underline">{t("Terms of Service")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
