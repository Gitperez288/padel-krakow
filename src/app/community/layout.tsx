import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padel Groups in Kraków & Małopolska",
  description:
    "Join the Padel Kraków and Małopolska community to find players, organise matches, follow local clubs, and hear about padel events.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Padel Groups in Kraków & Małopolska",
    description:
      "Connect with local padel players, organise matches, and join the Kraków and Małopolska community.",
    url: "/community",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
