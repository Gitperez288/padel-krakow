"use client";
import { getTranslator } from "@/lib/translations";
import { localizePath, type Locale } from "@/lib/i18n";
import NextSteps from "@/app/_components/NextSteps";


import { useRef, useState } from "react";

export default function LevelsPage({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const levels = [
    {
      level: "1.0 – 2.0",
      title: t("Beginner"),
      letter: "C4 – C3",
      desc: t("Learning the rules, scoring, and basic positioning. Still adapting to the walls \n      and developing control when returning the ball. Rallies are short and consistency \n      is the main challenge."),
      skills: [
        t("Basic knowledge of scoring and rules"),
        t("Learning to hit forehand and backhand with control"),
        t("Positioning and teamwork developing"),
        t("Serves and returns inconsistent"),
      ],
    },
    {
      level: "2.5 – 3.0",
      title: t("Improver"),
      letter: "C2 – C1",
      desc: t("Can rally with control and understands positioning. Starts using walls intentionally \n      and can maintain longer points, but still makes unforced errors under pressure."),
      skills: [
        t("Consistent forehand and improving backhand"),
        t("Can serve reliably with control"),
        t("Starting to defend and use lob effectively"),
        t("Understands net positioning and teamwork"),
      ],
    },
    {
      level: "3.5 – 4.0",
      title: t("Intermediate"),
      letter: "B4 – B3",
      desc: t("Plays regularly, can build points tactically, and has control over pace and direction. \n      Reliable teamwork and positioning, smooth transitions between defense and attack."),
      skills: [
        t("Solid rally consistency and control on most shots"),
        t("Can vary shot height and speed strategically"),
        t("Good understanding of transitions (lob → attack)"),
        t("Knows when to play safe vs aggressive shots"),
      ],
    },
    {
      level: "4.5 – 5.0",
      title: t("Advanced"),
      letter: "B2 – B1",
      desc: t("Strong consistency, tactical understanding, and pressure control. Can exploit \n      opponents’ weaknesses, anticipate shots, and maintain high intensity."),
      skills: [
        t("Excellent control and shot placement under pressure"),
        t("Natural team coordination and communication"),
        t("Reliable bandeja, vibora, and counter-lob execution"),
        t("Effective transition from defense to attack"),
      ],
    },
    {
      level: "5.5 – 6.0+",
      title: t("Competitive / Elite"),
      letter: "A4 – A1",
      desc: t("Plays at tournament or semi-professional level. Demonstrates mastery of court positioning, \n      shot selection, and match strategy. Mentally strong and technically precise."),
      skills: [
        t("Predicts and adapts to opponents’ tactics instantly"),
        t("Technically sound on all shots, including x3/x4 smashes"),
        t("Controls match tempo and rhythm effectively"),
        t("Competes in advanced leagues or tournaments"),
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="px-4 py-10 text-center">
      <section id="levels-header" data-testid="levels-header-section">
        <h1 className="text-3xl font-extrabold text-stone-900 mb-6">
          <span aria-hidden="true">🎾</span>{t("Padel Level Scale")}</h1>
        <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">{t("The community uses this scale to keep matches balanced and fair. Find your level, see the equivalency to the letter system, and understand what each stage of progress looks like.")}</p>
      </section>

      <NextSteps locale={locale} page="levels" />

      {/* --- Responsive Interactive Level Ladder --- */}
      <section id="levels-ladder" data-testid="levels-ladder-section" className="relative max-w-5xl mx-auto mb-12 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
        <div className="flex justify-between items-center w-[650px] sm:w-full px-2 sm:px-0">
          {levels.map((l, i) => (
            <div
              key={l.title}
              className="flex flex-col items-center text-center flex-1 cursor-pointer select-none min-w-[100px]"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => handleActivate(i)}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-orange-700 border-amber-600 scale-110 shadow-lg"
                    : "bg-amber-400 border-amber-500 hover:bg-stone-500"
                }`}
              />
              <p
                className={`text-xs mt-2 font-semibold whitespace-nowrap ${
                  activeIndex === i ? "text-stone-900" : "text-gray-600"
                }`}
              >
                {l.title}
              </p>
            </div>
          ))}
        </div>
        {/* Connecting line */}
        <div className="absolute top-[12px] left-0 right-0 h-[2px] bg-amber-300 -z-10"></div>
      </section>

      {/* --- Level Cards --- */}
      <section id="levels-cards" data-testid="levels-cards-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {levels.map(({ level, title, letter, desc, skills }, i) => (
          <div
            key={level}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`p-6 bg-white rounded-2xl shadow transition-all duration-300 text-left cursor-pointer ${
              activeIndex === i
                ? "ring-2 ring-amber-500 scale-[1.02] shadow-xl"
                : "hover:shadow-lg"
            }`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => handleActivate(i)}
          >
            <h3 className="text-xl font-bold text-stone-900">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {level} • {letter}
            </p>
            <p className="text-gray-700 mb-3">{desc}</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* --- Calculator Button --- */}
      <div className="mt-12">
        <a
          href="https://padel-skill-calculator.rip21.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-700 transition"
        >{t("🧮 Try the Padel Skill Calculator (by Andrey Los)")}</a>
      </div>
    </div>
  );
}
