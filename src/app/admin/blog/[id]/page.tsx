"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef, ChangeEvent, FormEvent, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Wand2, Bold, Italic, List, ListOrdered, Quote, Code, Minus, Undo, Redo, Upload, ImageIcon, X as XIcon } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

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

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const btn = (
    action: () => void,
    active: boolean,
    title: string,
    label: React.ReactNode
  ) => (
    <button
      type="button"
      onClick={action}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition ${
        active ? "bg-amber-100 text-amber-700" : "text-gray-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50">
      {btn(() => editor.chain().focus().undo().run(), false, "Undo", <Undo size={15} />)}
      {btn(() => editor.chain().focus().redo().run(), false, "Redo", <Redo size={15} />)}
      <span className="w-px h-5 bg-gray-300 mx-1" />
      {btn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive("heading", { level: 1 }), "Heading 1", <span className="font-bold text-xs px-0.5">H1</span>)}
      {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }), "Heading 2", <span className="font-bold text-xs px-0.5">H2</span>)}
      {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }), "Heading 3", <span className="font-bold text-xs px-0.5">H3</span>)}
      <span className="w-px h-5 bg-gray-300 mx-1" />
      {btn(() => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), "Bold", <Bold size={15} />)}
      {btn(() => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), "Italic", <Italic size={15} />)}
      {btn(() => editor.chain().focus().toggleCode().run(), editor.isActive("code"), "Inline Code", <Code size={15} />)}
      <span className="w-px h-5 bg-gray-300 mx-1" />
      {btn(() => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"), "Bullet List", <List size={15} />)}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"), "Ordered List", <ListOrdered size={15} />)}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"), "Blockquote", <Quote size={15} />)}
      {btn(() => editor.chain().focus().toggleCodeBlock().run(), editor.isActive("codeBlock"), "Code Block", <span className="font-mono text-xs px-0.5">{"</>"}</span>)}
      <span className="w-px h-5 bg-gray-300 mx-1" />
      {btn(() => editor.chain().focus().setHorizontalRule().run(), false, "Horizontal Rule", <Minus size={15} />)}
    </div>
  );
}

export default function BlogEditorPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const isNew = !params?.id || params?.id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    content: "",
    excerpt: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your post content here..." }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: "min-h-[320px] focus:outline-none p-4 prose prose-sm max-w-none",
      },
    },
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

  // Set editor content once editor is ready and post is loaded
  useEffect(() => {
    if (editor && post.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post.id]);

  const fetchPost = async () => {
    try {
      const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      const data = await res.json();
      setPost(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error loading post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget;
    if (type === "checkbox") {
      setPost({ ...post, [name]: (e.currentTarget as HTMLInputElement).checked });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so the same file can be re-selected after removal
    e.target.value = "";

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed.");
        return;
      }

      setPost((prev) => ({ ...prev, coverImage: data.url }));
    } catch {
      setUploadError("Network error — could not upload the image.");
    } finally {
      setUploading(false);
    }
  };

  const generateSEO = useCallback(() => {
    if (!post.title) {
      alert("Please add a post title first.");
      return;
    }
    // Strip HTML tags to plain text
    const plainText = post.content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const metaTitle = `${post.title} | Padel Kraków`;
    const metaDescription =
      plainText.length > 0
        ? plainText.substring(0, 155) + (plainText.length > 155 ? "..." : "")
        : post.title;

    // Keyword extraction: frequency-ranked words, stopwords filtered
    const stopWords = new Set([
      "the","and","for","that","this","with","are","was","were","from","have",
      "has","will","but","not","your","about","more","can","also","into","its",
      "than","then","when","what","which","who","how","been","some","all","they",
      "their","there","just","like","make","very","over","such","both","each",
    ]);
    const wordFreq: Record<string, number> = {};
    `padel krakow ${post.title} ${plainText.substring(0, 400)}`
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3 && !stopWords.has(w))
      .forEach((w) => { wordFreq[w] = (wordFreq[w] || 0) + 1; });
    const keywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word]) => word)
      .join(", ");

    setPost((prev) => ({
      ...prev,
      metaTitle,
      metaDescription,
      metaKeywords: keywords,
      ogImage: prev.ogImage || prev.coverImage || "",
    }));
  }, [post.title, post.content, post.coverImage]);

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
      router.push("/admin/blog");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving post");
      setSaving(false);
    }
  };

  const descLength = post.metaDescription?.length || 0;

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
            <h1 className="text-2xl font-bold text-amber-700">
              {isNew ? "New Post" : "Edit Post"}
            </h1>
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">{error}</div>
        )}

        <form id="post-form" onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor Column */}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Cover Image */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">Cover Image</label>
                  {post.coverImage && (
                    <button
                      type="button"
                      onClick={() => setPost((prev) => ({ ...prev, coverImage: "" }))}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
                    >
                      <XIcon size={13} /> Remove
                    </button>
                  )}
                </div>

                {/* Preview */}
                {post.coverImage ? (
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt="Cover preview"
                      className="h-44 w-full object-cover"
                    />
                  </div>
                ) : (
                  /* Upload drop zone */
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full mb-4 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-lg py-8 text-gray-400 hover:text-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin w-7 h-7 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span className="text-sm">Processing image…</span>
                      </>
                    ) : (
                      <>
                        <Upload size={28} />
                        <span className="text-sm font-medium">Click to upload image</span>
                        <span className="text-xs">JPG, PNG, WebP, AVIF · max 800 px · ≤ 150 KB output</span>
                      </>
                    )}
                  </button>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {uploadError && (
                  <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                    <XIcon size={13} /> {uploadError}
                  </p>
                )}

                {/* URL fallback */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
                    <ImageIcon size={13} />
                    Or paste an image URL
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    value={post.coverImage || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 pt-6 pb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Content *
                  </label>
                </div>
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
                <style>{`
                  .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                  }
                  .ProseMirror h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; }
                  .ProseMirror h2 { font-size: 1.4rem; font-weight: 600; margin: 0.8rem 0 0.4rem; }
                  .ProseMirror h3 { font-size: 1.15rem; font-weight: 600; margin: 0.6rem 0 0.3rem; }
                  .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
                  .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
                  .ProseMirror li { margin: 0.2rem 0; }
                  .ProseMirror blockquote { border-left: 3px solid #d97706; padding-left: 1rem; color: #6b7280; margin: 0.5rem 0; font-style: italic; }
                  .ProseMirror code { background: #f3f4f6; padding: 0.15rem 0.35rem; border-radius: 3px; font-family: monospace; font-size: 0.875em; }
                  .ProseMirror pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin: 0.75rem 0; overflow-x: auto; }
                  .ProseMirror pre code { background: none; padding: 0; color: inherit; }
                  .ProseMirror hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.25rem 0; }
                  .ProseMirror p { margin: 0.4rem 0; line-height: 1.6; }
                `}</style>
              </div>

              {/* Excerpt */}
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary shown in the blog listing..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-1">
                  If empty, first 160 characters of content will be used.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Status */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Status</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={post.published}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-amber-600"
                  />
                  <span className="text-sm text-gray-700">
                    {post.published ? "🟢 Published" : "🟡 Draft"}
                  </span>
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  {post.published
                    ? "Visible to all visitors on /blog"
                    : "Only visible to logged-in admins"}
                </p>
              </div>

              {/* SEO */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">SEO</h3>
                  <button
                    type="button"
                    onClick={generateSEO}
                    className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 px-2 py-1.5 rounded-lg transition"
                    title="Auto-generate SEO fields from title and content"
                  >
                    <Wand2 size={12} />
                    Auto-generate
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={post.metaTitle}
                      onChange={handleChange}
                      placeholder="Title for search results"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-0.5">
                      {post.metaTitle?.length || 0}/70
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={post.metaDescription}
                      onChange={handleChange}
                      placeholder="Description for search results"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      rows={3}
                    />
                    <p
                      className={`text-xs mt-0.5 ${
                        descLength > 160
                          ? "text-red-500"
                          : descLength > 130
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    >
                      {descLength}/160{descLength > 160 && " â€” too long!"}
                    </p>
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
                      placeholder="padel, krakow, training..."
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
                      placeholder="Social sharing image URL"
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
