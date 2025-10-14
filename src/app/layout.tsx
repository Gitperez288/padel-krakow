// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Padel Kraków Community",
  description: "Padel community of Kraków and Małopolska – courts, levels, groups, and blog.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 text-gray-900 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
          <Link href="/" className="text-xl font-extrabold text-amber-700">
            Kraków Padel Community
          </Link>
          <nav className="space-x-6">
            <Link href="/levels" className="hover:text-amber-600 font-medium">Levels</Link>
            <Link href="/courts" className="hover:text-amber-600 font-medium">Courts</Link>
            <Link href="/groups" className="hover:text-amber-600 font-medium">Groups</Link>
            <Link href="/blog" className="hover:text-amber-600 font-medium">Blog</Link>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto py-6 text-center text-sm text-gray-500 bg-white/70 backdrop-blur">
          © {new Date().getFullYear()} Kraków Padel Community. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
