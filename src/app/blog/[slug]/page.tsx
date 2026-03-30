import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { formatDistanceToNow } from "date-fns";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      url: `https://padel-krakow.vercel.app/blog/${post.slug}`,
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage!] : [],
      authors: post.author.name ? [post.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage!] : [],
    },
    alternates: {
      canonical: `https://padel-krakow.vercel.app/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(remarkHtml)
    .process(post.content);

  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <Link href="/blog" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-amber-700 mt-4 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <span>By {post.author.name}</span>
            {post.publishedAt && (
              <>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="bg-white rounded-lg shadow-lg p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage || post.ogImage,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://padel-krakow.vercel.app/blog/${post.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
