"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  ogImage?: string;
}

export default function BlogEditorPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const isNew = params?.id === undefined || params?.id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    content: "",
    excerpt: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && !isNew) {
      fetchPost();
    } else if (isNew) {
      setLoading(false);
    }
  }, [status, isNew, router]);

  const fetchPost = async () => {
    try {
      const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      const data = await res.json();
      setPost(data);
    } catch (err: any) {
      setError(err.message || "Error loading post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.currentTarget;
    
    if (type === "checkbox") {
      setPost({
        ...post,
        [name]: (e.currentTarget as HTMLInputElement).checked,
      });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/blog" : `/api/blog/${post.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      const savedPost = await res.json();
      router.push("/admin/blog");
    } catch (err: any) {
      setError(err.message || "Error saving post");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-amber-700">
                {isNew ? "Create New Post" : "Edit Post"}
              </h1>
            </div>
          </div>
          <button
            form="post-form"
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form id="post-form" onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Cover Image */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={post.coverImage || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {post.coverImage && (
                  <div className="mt-4">
                    <img
                      src={post.coverImage}
                      alt="Cover"
                      className="h-40 w-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content (Markdown) *
                </label>
                <textarea
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your post content here... (Markdown supported)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm"
                  rows={12}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supports Markdown formatting: **bold**, *italic*, # Headings, etc.
                </p>
              </div>

              {/* Excerpt */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt (Optional)
                </label>
                <textarea
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of your post..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-2">
                  If empty, first 160 characters of content will be used.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Status */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="published"
                      checked={post.published}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {post.published ? "🟢 Published" : "🟡 Draft"}
                    </span>
                  </label>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">SEO</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={post.metaTitle}
                      onChange={handleChange}
                      placeholder="SEO title"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={post.metaDescription}
                      onChange={handleChange}
                      placeholder="SEO description"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="metaKeywords"
                      value={post.metaKeywords || ""}
                      onChange={handleChange}
                      placeholder="Comma-separated"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      OG Image URL
                    </label>
                    <input
                      type="url"
                      name="ogImage"
                      value={post.ogImage || ""}
                      onChange={handleChange}
                      placeholder="For social sharing"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
