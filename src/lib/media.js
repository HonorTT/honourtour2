import crypto from "node:crypto";
import sharp from "sharp";

import { getCollection } from "./mongodb.js";

/* =========================================================
   UPLOADED MEDIA
   Images uploaded from the admin panel live in MongoDB, not
   in public/. Vercel's filesystem is read-only at runtime, so
   anything written to public/ after the build disappears on
   the next deploy — the upload would appear to work and the
   picture would vanish.

   Each file is resized and re-encoded to WebP before storing,
   which turns a 6 MB phone photo into roughly 200 KB, and is
   addressed by the hash of its bytes, so uploading the same
   picture twice stores it once and the URL can be cached
   forever.
========================================================= */

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_WIDTH = 1600;

// Nothing is stored above this, whatever walks in. These files reach visitors
// as they are, so every kilobyte here is paid for on each view.
const TARGET_BYTES = 200 * 1024;

// Tried in order until one lands under the target. Quality first, because
// dropping it is invisible on a photo; width only once quality has run out.
const ATTEMPTS = [
  { width: MAX_WIDTH, quality: 68 },
  { width: MAX_WIDTH, quality: 58 },
  { width: 1440, quality: 55 },
  { width: 1280, quality: 52 },
  { width: 1080, quality: 48 },
  { width: 960, quality: 42 },
];

export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/** The URL a stored image is served at. */
export const mediaUrl = (id) => `/api/media/${id}`;

export async function storeImage(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("No file was received.");
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG, WebP, AVIF or GIF image.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("That image is larger than 25 MB. Please choose a smaller one.");
  }

  const original = Buffer.from(await file.arrayBuffer());

  // withoutEnlargement keeps an already-small logo from being blown up.
  // resolveWithObject hands back the finished dimensions, so the result does
  // not have to be decoded a second time just to measure it.
  const encode = ({ width, quality }) =>
    sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer({ resolveWithObject: true });

  let encoded = await encode(ATTEMPTS[0]);
  for (let step = 1; step < ATTEMPTS.length && encoded.data.length > TARGET_BYTES; step += 1) {
    encoded = await encode(ATTEMPTS[step]);
  }

  const { data, info } = encoded;
  const { width, height } = info;
  const id = crypto.createHash("sha256").update(data).digest("hex").slice(0, 32);

  const media = await getCollection("media");
  await media.updateOne(
    { _id: id },
    {
      $set: { contentType: "image/webp", width, height, bytes: data.length, data },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );

  return { id, url: mediaUrl(id), width, height, bytes: data.length };
}

export async function readImage(id) {
  if (!/^[a-f0-9]{32}$/.test(id)) return null;

  const media = await getCollection("media");
  const doc = await media.findOne({ _id: id });
  if (!doc) return null;

  return {
    contentType: doc.contentType || "image/webp",
    // The driver hands back BSON Binary; .buffer is the raw bytes.
    data: Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data.buffer ?? doc.data),
  };
}
