"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { localizePath, localizedRoutes, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/translations";

const primaryLinks = [
  { href: "/levels", label: "Levels" },
  { href: "/courts", label: "Courts" },
  { href: "/coaches", label: "Coaches" },
  { href: "/community", label: "Groups" },
];
const secondaryLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/guidelines", label: "Guidelines" },
];

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const aboutRef = useRef<HTMLDetailsElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    if (aboutRef.current) aboutRef.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) { setOpen(false); menuRef.current?.focus(); }
      if (aboutRef.current?.open) {
        aboutRef.current.open = false;
        aboutRef.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) aboutRef.current.open = false;
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const navLink = (link: {href: string; label: string}, mobile = false) => (
    <Link key={link.href} href={localizePath(link.href, locale)}
      aria-current={pathname === localizePath(link.href, locale) ? "page" : undefined}
      onClick={() => setOpen(false)}
      className={`${mobile ? "block rounded-lg px-4 py-3" : "py-3"} text-sm font-semibold transition-colors ${pathname === localizePath(link.href, locale) ? "text-orange-700" : "text-stone-600 hover:text-stone-900"}`}>
      {t(link.label)}
    </Link>
  );
  const translated = Object.values(localizedRoutes).some(pair => pair.en === pathname || pair.pl === pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white">
      <nav aria-label={locale === "pl" ? "Nawigacja główna" : "Main navigation"} className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href={localizePath("/", locale)} className="flex items-center gap-2.5" aria-label="Padel Kraków">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-700 text-sm font-black text-white">PK</span>
          <span className="text-lg font-extrabold tracking-tight text-stone-900 sm:text-xl">Padel Kraków<span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:block">Community</span></span>
        </Link>
        <div className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {primaryLinks.map(link => navLink(link))}
          <details ref={aboutRef} className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 py-3 text-sm font-semibold text-stone-600 [&::-webkit-details-marker]:hidden">{locale === "pl" ? "O nas" : "About"}<ChevronDown size={14} className="group-open:rotate-180" /></summary>
            <div className="surface absolute right-0 top-full w-56 p-2">{secondaryLinks.map(link => navLink(link, true))}</div>
          </details>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div aria-label={locale === "pl" ? "Język strony" : "Page language"} className="flex gap-2 text-xs font-semibold">
            {(["pl", "en"] as const).map(language => (!translated && language !== locale) ? null : (
              <a key={language} href={localizePath(pathname, language)} hrefLang={language} lang={language} aria-current={locale === language ? "page" : undefined} className={locale === language ? "text-orange-700 underline underline-offset-4" : "text-stone-500 hover:text-stone-900"}>{language.toUpperCase()}</a>
            ))}
          </div>
          <Link href={localizePath("/community", locale)} className="button-primary hidden lg:inline-flex">{t("Join the Community")}</Link>
          <button ref={menuRef} className="p-2 text-stone-900 lg:hidden" onClick={() => setOpen(prev => !prev)} aria-label={open ? t("Close menu") : t("Open menu")} aria-expanded={open} aria-controls="mobile-menu">{open ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>
      </nav>
      {open && <div id="mobile-menu" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-stone-200 bg-white p-4 lg:hidden">
        {primaryLinks.map(link => navLink(link, true))}
        <div className="my-2 border-t border-stone-100 pt-2">{secondaryLinks.map(link => navLink(link, true))}</div>
        <Link href={localizePath("/community", locale)} onClick={() => setOpen(false)} className="button-primary w-full">{t("Join the Community")}</Link>
      </div>}
    </header>
  );
}
