import extra from "./translations-extra.json";
import { getTranslator } from "./translations";
import type { Locale } from "./i18n";
const dictionary: Record<string, string> = Object.fromEntries(Object.entries(extra).map(([key, value]) => [key.replace(/\s+/g, " ").trim(), value]));
// Long legal text and biographies stay in server components, out of client bundles.
export function getServerTranslator(locale: Locale) {
  const fallback = getTranslator(locale);
  return (text: string): string => locale === "pl" ? dictionary[text.replace(/\s+/g, " ").trim()] ?? fallback(text) : fallback(text);
}
