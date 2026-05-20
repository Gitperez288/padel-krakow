export type SponsorService = {
  title: string;
  description: string;
  benefit: string;
  normalPrice?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  website: string | null;
  instagram: string | null;
  discountCode: string | null;
  discountNote: string | null;
  services: SponsorService[];
  category: string;
};

/**
 * Community sponsors for Padel Kraków.
 * Add or update sponsors here — changes will reflect automatically on the
 * /sponsors page and the home-page preview section.
 */
export const sponsors: Sponsor[] = [
  {
    id: "jan-glazek",
    name: "Jan Głazek",
    tagline: "Certified Personal Trainer — Padel Performance Specialist",
    description:
      "Jan is a certified personal trainer who offers performance training for padel players. Whether you prefer training online through an app or in person with a dedicated 1:1 session, Jan builds programmes tailored to your level and goals.",
    logo: "/media/janglazek.webp",
    website: null,
    instagram: "https://www.instagram.com/glazek.method",
    discountCode: "PadelLeague",
    discountNote: "Contact Jan directly via Instagram to get started with the app or book a consultation.",
    category: "Personal Training",
    services: [
      {
        title: "Online Training Programmes (in app)",
        description:
          "Personalized training plans delivered through an app, allowing players to train anytime, anywhere. Includes structured programmes focused on strength, mobility, conditioning, and injury prevention to improve padel performance and keep you consistent off the court.",
        benefit: "1 week free",
        normalPrice: "100 zł / month",
      },
      {
        title: "1:1 Personal Training Session (60 min) – Padel Performance",
        description:
          "Personalized training designed specifically for padel players to improve strength, mobility, speed, and injury prevention. Sessions focus on movement efficiency, power, core stability, and durability to help you perform better on court and recover faster.",
        benefit: "15% off all packages",
      },
    ],
  },
];
