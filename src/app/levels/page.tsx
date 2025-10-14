// app/levels/page.tsx
export default function LevelsPage() {
  const levels = [
    { level: "1.0 – 2.0", title: "Beginner", desc: "Learning the basics: rules, scoring, positioning." },
    { level: "2.5 – 3.0", title: "Improver", desc: "Can rally with control, understands positioning." },
    { level: "3.5 – 4.0", title: "Intermediate", desc: "Consistent play, developing tactics, reliable shots." },
    { level: "4.5 – 5.0", title: "Advanced", desc: "Strong control, teamwork, and strategic play." },
    { level: "5.5 – 6.0+", title: "Competitive", desc: "Tournament-level, strong experience." },
  ];

  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">🎯 Padel Level Scale</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
        Our level scale helps players find balanced matches and fair games. Identify your level
        below and connect with players who match your skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {levels.map(({ level, title, desc }) => (
          <div key={level} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-amber-700">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{level}</p>
            <p className="text-gray-700">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
