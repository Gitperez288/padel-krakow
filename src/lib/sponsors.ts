export type Sponsor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  website: string | null;
  instagram: string | null;
  discountCode: string | null;
  discountDescription: string | null;
  category: string;
};

/**
 * Community sponsors for Padel Kraków.
 * Add or update sponsors here — changes will reflect automatically on the
 * /sponsors page and the home-page preview section.
 */
export const sponsors: Sponsor[] = [
  // ── Add real sponsors below ──────────────────────────────────────────────
  // {
  //   id: "example-brand",
  //   name: "Example Brand",
  //   tagline: "The best gear for padel players",
  //   description:
  //     "Example Brand provides high-quality padel equipment and apparel for players of all levels.",
  //   logo: "/media/sponsors/example-brand.png",
  //   website: "https://www.example.com",
  //   instagram: "https://www.instagram.com/examplebrand",
  //   discountCode: "PADEL10",
  //   discountDescription: "10% off your entire purchase — valid online & in-store.",
  //   category: "Equipment",
  // },
];
