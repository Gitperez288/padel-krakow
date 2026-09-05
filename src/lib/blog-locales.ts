// Only published posts with a reviewed translation get a Polish URL.
export const translatedBlogSlugs = [
  "a-new-beginning-for-padel-in-cracow-power-to-the-people",
  "how-to-start-playing-padel-in-krakow-and-find-your-level",
  "polish-padel-at-a-crossroads-dual-federations-dual-rankings-and-a-new-international-path",
] as const;
export function hasPolishPost(slug: string) { return translatedBlogSlugs.some(value => value === slug); }
