import NextImage from "next/image";

/* =========================================================
   SITE IMAGE
   next/image with one exception: pictures uploaded from the
   admin panel (/api/media/...) skip the image optimizer.

   They are already resized and re-encoded to WebP when they
   are stored (src/lib/media.js), so the optimizer adds
   nothing — and on the hosting plan it is metered: once the
   monthly quota runs out, every new picture comes back as
   "402 Payment required" and shows as a broken image.
   Everything else still goes through the optimizer as before.
========================================================= */

const isUploaded = (src) => typeof src === "string" && src.startsWith("/api/media/");

export default function SiteImage({ src, unoptimized, ...props }) {
  return <NextImage src={src} unoptimized={unoptimized ?? isUploaded(src)} {...props} />;
}
