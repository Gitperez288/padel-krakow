import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padel Courts in Kraków & Małopolska",
  description:
    "Find padel courts across Kraków and Małopolska with locations, indoor and outdoor court details, booking information, and club links.",
  alternates: {
    canonical: "/courts",
  },
  openGraph: {
    title: "Padel Courts in Kraków & Małopolska",
    description:
      "Explore padel clubs and courts across Kraków and Małopolska, including booking and venue details.",
    url: "/courts",
  },
};

export default function CourtsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
