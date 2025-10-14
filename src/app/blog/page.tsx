import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-3xl font-extrabold text-amber-700 mb-6">📰 Blog</h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-8">
        Blog section coming soon — we’ll share updates about the Kraków & Małopolska Padel community.
      </p>
      <Link href="/" className="text-amber-700 underline">← Back to Home</Link>
    </div>
  );
}
