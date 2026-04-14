/**
 * POST /api/upload
 *
 * Accepts a multipart/form-data request with a single "file" field.
 * Validates the MIME type, resizes to max 800 px on the longest side,
 * converts to WebP, then uploads to Vercel Blob Storage.
 *
 * Requires the BLOB_READ_WRITE_TOKEN environment variable (set in .env
 * locally and in the Vercel project's Environment Variables for production).
 */

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";

// ── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

/** Hard limit on raw upload size to guard against DoS (20 MB) */
const MAX_INPUT_BYTES = 20 * 1024 * 1024;

/** Target maximum output file size (150 KB) */
const MAX_OUTPUT_BYTES = 150 * 1024;

/** Resize so neither dimension exceeds this value */
const MAX_DIMENSION = 800;

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart request" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      {
        error:
          "Unsupported file type. Please upload a JPG, PNG, WebP, AVIF, or GIF image.",
      },
      { status: 400 }
    );
  }

  // Validate input size
  if (file.size > MAX_INPUT_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum accepted size is 20 MB." },
      { status: 400 }
    );
  }

  // Read into buffer
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  // ── Image processing ────────────────────────────────────────────────────────
  // Resize (without enlarging), then compress to WebP.
  // Quality is lowered progressively until the output fits within MAX_OUTPUT_BYTES.

  let outputBuffer: Buffer | undefined;
  let quality = 82;

  while (quality >= 30) {
    const candidate = await sharp(inputBuffer)
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();

    outputBuffer = candidate;

    if (candidate.length <= MAX_OUTPUT_BYTES) break;

    quality -= 5;
  }

  if (!outputBuffer) {
    return NextResponse.json(
      { error: "Failed to process image." },
      { status: 500 }
    );
  }

  // ── Build a safe, deterministic pathname ──────────────────────────────────
  const timestamp = Date.now();
  const baseName = file.name
    .replace(/\.[^.]+$/, "")          // strip original extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")      // replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, "")          // trim leading/trailing dashes
    .substring(0, 60);                 // cap length

  const pathname = `blog/${timestamp}-${baseName || "image"}.webp`;

  // ── Upload to Vercel Blob ─────────────────────────────────────────────────
  let blob;
  try {
    blob = await put(pathname, outputBuffer, {
      access: "public",
      contentType: "image/webp",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (err) {
    console.error("[POST /api/upload] blob upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload image to storage." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    url: blob.url,
    sizeKb: Math.round(outputBuffer.length / 1024),
  });
}
