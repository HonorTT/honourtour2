import { db } from "./db.js";

/* =========================================================
   PACKAGE CATALOG
   The tour catalog lives in the `package` collection, which
   the admin panel's Packages module edits. These helpers
   replace the old src/data/packages.js exports so a page
   reads the catalog instead of a checked-in file.
========================================================= */

// The pages read `image`; the collection stores it as `imageUrl`.
const withImage = (pkg) => (pkg ? { ...pkg, image: pkg.imageUrl ?? null } : pkg);

/** Hidden packages stay in the admin but never reach the public site. */
const isVisible = (pkg) => pkg.status !== "Hidden";

export async function getAllPackages() {
  const rows = await db.package.findMany({ orderBy: { order: "asc" } });
  return rows.filter(isVisible).map(withImage);
}

export async function getPackageBySlug(slug) {
  return withImage(await db.package.findUnique({ where: { slug } }));
}

export async function getPackageSlugs() {
  const rows = await db.package.findMany({ select: { slug: true, status: true }, orderBy: { order: "asc" } });
  return rows.filter(isVisible).map(({ slug }) => ({ slug }));
}
