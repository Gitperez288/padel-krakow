// Route for individual post operations (GET, PUT, DELETE)
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[GET /api/blog/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await db.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user is the author or admin
    if (post.authorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, content, excerpt, coverImage, published, metaTitle, metaDescription, metaKeywords, ogImage } = body;

    const updatedPost = await db.post.update({
      where: { id },
      data: {
        title: title || post.title,
        content: content || post.content,
        excerpt: excerpt !== undefined ? excerpt : post.excerpt,
        coverImage: coverImage !== undefined ? coverImage : post.coverImage,
        published: published !== undefined ? published : post.published,
        metaTitle: metaTitle || post.metaTitle,
        metaDescription: metaDescription || post.metaDescription,
        metaKeywords: metaKeywords !== undefined ? metaKeywords : post.metaKeywords,
        ogImage: ogImage !== undefined ? ogImage : post.ogImage,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("[PUT /api/blog/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await db.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user is the author or admin
    if (post.authorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/blog/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
