import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padel Skill Levels in Kraków",
  description:
    "Use the Padel Kraków level scale to rate your game, find evenly matched players, and join suitable matches across Kraków and Małopolska.",
  alternates: {
    canonical: "/levels",
  },
  openGraph: {
    title: "Padel Skill Levels in Kraków",
    description:
      "Find your padel level and connect with evenly matched players in Kraków and Małopolska.",
    url: "/levels",
  },
};

export default function LevelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
