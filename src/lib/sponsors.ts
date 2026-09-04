export type SponsorService = {
  title: string;
  description: string;
  benefit: string;
  normalPrice?: string;
  link?: string | null;
};

export type Sponsor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  website: string | null;
  instagram: string | null;
  facebook?: string | null;
  discountCode: string | null;
  discountNote: string | null;
  services: SponsorService[];
  category: string;
};

/**
 * Community sponsors for Padel Kraków.
 * Add or update sponsors here: changes will reflect automatically on the
 * /sponsors page and the home-page preview section.
 */
export const sponsors: Sponsor[] = [
  {
    id: "jan-glazek",
    name: "Jan Głazek",
    tagline: "Certified Personal Trainer - Padel Performance Training",
    description:
      "Jan is a certified personal trainer who offers performance training for padel players. Whether you prefer training online through an app or in person with a dedicated 1:1 session, Jan builds programmes tailored to your level and goals.",
    logo: "/media/janglazek.webp",
    website: null,
    instagram: "https://www.instagram.com/glazek.method",
    discountCode: "Padel League",
    discountNote: "Register in the app via the link below and Jan will reach out personally to activate your free week. For 1:1 sessions, contact Jan directly on Instagram.",
    category: "Personal Training",
    services: [
      {
        title: "Online Training Programmes (in app)",
        description:
          "Personalized training plans delivered through an app, allowing players to train anytime, anywhere. Includes structured programmes focused on strength, mobility, conditioning, and injury prevention to improve padel performance and keep you consistent off the court.",
        benefit: "1 week free",
        normalPrice: "100 zł / month",
        link: "https://app.rezult.app/janglazek",
      },
      {
        title: "1:1 Personal Training Session (60 min) – Padel Performance",
        description:
          "Personalized training designed specifically for padel players to improve strength, mobility, speed, and injury prevention. Sessions focus on movement efficiency, power, core stability, and durability to help you perform better on court and recover faster.",
        benefit: "15% off all packages",
      },
    ],
  },
  {
    id: "vicenti",
    name: "Pizzeria Vicenti",
    tagline: "Roman-style pizza al taglio & Italian specialities in Kraków",
    description:
      "Vicenti brings authentic Roman-style pizza al taglio and Italian specialities to Kraków. Freshly made, sold by the slice, and packed with flavour, the perfect fuel before or after your padel session.",
    logo: "/media/vicenti.jpg",
    website: "https://www.vicenti.pl/",
    facebook: "https://www.facebook.com/pizzeriavicenti/",
    instagram: "https://www.instagram.com/pizzeria_vicenti/",
    discountCode: "Padel League",
    discountNote: "Say \"Padel League\" at the till in any of their Kraków locations to get 15% off your purchase. Valid at: ul. Szewska 27 (Planty), ul. Urzędnicza 59, ul. Karmelicka 17, ul. Karmelicka 55.",
    category: "Food & Drink",
    services: [
      {
        title: "15% off at all Kraków locations",
        description:
          "Enjoy delicious Roman-style pizza al taglio and Italian specialities at 4 locations across Kraków: ul. Szewska 27 (Planty), ul. Urzędnicza 59, ul. Karmelicka 17, ul. Karmelicka 55.",
        benefit: "15% off",
      },
    ],
  },
];
