import { db } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import { formatDistanceToNow } from "date-fns";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog | Padel Kraków Community",
  description: "Latest news and articles about Padel in Kraków and Małopolska",
  alternates: {
    canonical: "https://padel-krakow.vercel.app/blog",
  },
};

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <section id="blog-header" data-testid="blog-header-section" className="mb-12">
          <h1 className="text-4xl font-bold text-amber-700 mb-4">📰 Blog</h1>
          <p className="text-lg text-gray-700">
            Latest updates and stories from the Padel Kraków community
          </p>
        </section>

        {/* Posts Grid */}
        <section id="blog-posts" data-testid="blog-posts-section">
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {post.coverImage && (
                      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <h2 className="text-2xl font-bold text-amber-700 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>By {post.author.name}</span>
                        {post.publishedAt && (
                          <span>
                            {formatDistanceToNow(new Date(post.publishedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">No blog posts yet</p>
              <p className="text-sm text-gray-500">Check back soon for updates!</p>
            </div>
          )}
        </section>

        {/* Back to Home */}
        <section id="blog-footer" data-testid="blog-footer-section" className="mt-12 text-center\">
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Back to Home
          </Link>
        </section>
      </div>
    </div>
  );
}
