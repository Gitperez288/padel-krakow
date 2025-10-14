"use client";

import { useRef, useState } from "react";

export default function LevelsPage() {
  const levels = [
    {
      level: "1.0 – 2.0",
      title: "Beginner",
      letter: "C4 – C3",
      desc: `Learning the rules, scoring, and basic positioning. Still adapting to the walls 
      and developing control when returning the ball. Rallies are short and consistency 
      is the main challenge.`,
      skills: [
        "Basic knowledge of scoring and rules",
        "Learning to hit forehand and backhand with control",
        "Positioning and teamwork developing",
        "Serves and returns inconsistent",
      ],
    },
    {
      level: "2.5 – 3.0",
      title: "Improver",
      letter: "C2 – C1",
      desc: `Can rally with control and understands positioning. Starts using walls intentionally 
      and can maintain longer points, but still makes unforced errors under pressure.`,
      skills: [
        "Consistent forehand and improving backhand",
        "Can serve reliably with control",
        "Starting to defend and use lob effectively",
        "Understands net positioning and teamwork",
      ],
    },
    {
      level: "3.5 – 4.0",
      title: "Intermediate",
      letter: "B4 – B3",
      desc: `Plays regularly, can build points tactically, and has control over pace and direction. 
      Reliable teamwork and positioning, smooth transitions between defense and attack.`,
      skills: [
        "Solid rally consistency and control on most shots",
        "Can vary shot height and speed strategically",
        "Good understanding of transitions (lob → attack)",
        "Knows when to play safe vs aggressive shots",
      ],
    },
    {
      level: "4.5 – 5.0",
      title: "Advanced",
      letter: "B2 – B1",
      desc: `Strong consistency, tactical understanding, and pressure control. Can exploit 
      opponents’ weaknesses, anticipate shots, and maintain high intensity.`,
      skills: [
        "Excellent control and shot placement under pressure",
        "Natural team coordination and communication",
        "Reliable bandeja, vibora, and counter-lob execution",
        "Effective transition from defense to attack",
      ],
    },
    {
      level: "5.5 – 6.0+",
      title: "Competitive / Elite",
      letter: "A4 – A1",
      desc: `Plays at tournament or semi-professional level. Demonstrates mastery of court positioning, 
      shot selection, and match strategy. Mentally strong and technically precise.`,
      skills: [
        "Predicts and adapts to opponents’ tactics instantly",
        "Technically sound on all shots, including x3/x4 smashes",
        "Controls match tempo and rhythm effectively",
        "Competes in advanced leagues or tournaments",
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
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">
        🎯 Padel Level Scale
      </h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
        The community uses this scale to keep matches balanced and fair.  
        Find your level, see the equivalency to the letter system, and
        understand what each stage of progress looks like.
      </p>

      {/* --- Interactive Level Ladder --- */}
      <div className="relative max-w-5xl mx-auto mb-12">
        <div className="flex justify-between items-center w-full">
          {levels.map((l, i) => (
            <div
              key={l.title}
              className="flex flex-col items-center text-center flex-1 cursor-pointer select-none"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => handleActivate(i)}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-amber-600 border-amber-600 scale-110 shadow-lg"
                    : "bg-amber-400 border-amber-500 hover:bg-amber-500"
                }`}
              />
              <p
                className={`text-xs mt-2 font-semibold ${
                  activeIndex === i ? "text-amber-700" : "text-gray-600"
                }`}
              >
                {l.title}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute top-[12px] left-0 right-0 h-[2px] bg-amber-300 -z-10"></div>
      </div>

      {/* --- Level Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
            <h3 className="text-xl font-bold text-amber-700">{title}</h3>
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
      </div>

      {/* --- Calculator Button --- */}
      <div className="mt-12">
        <a
          href="https://padel-skill-calculator.rip21.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-amber-700 transition"
        >
          🧮 Try the Padel Skill Calculator (by Andrey Los)
        </a>
      </div>
    </div>
  );
}
