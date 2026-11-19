import { db } from "./db.js";
import { placeWords } from "@/data/draftFilter";

/* =========================================================
   DRAFT DESTINATIONS — the list
   Destinations set to "Draft" in the admin (Destinations ->
   Status). Their pages answer 404, they leave the sitemap,
   and every menu and listing drops them. Setting the record
   back to "Published" brings all of it back; nothing is
   deleted.

   A database failure returns an empty list: the site keeps
   its full menu rather than breaking the page.
========================================================= */

const EMPTY = { slugs: [], names: [] };

export async function getDraftDestinations() {
  try {
    const rows = await db.destination.findMany({
      where: { status: "Draft" },
      select: { slug: true, name: true },
    });
    return {
      slugs: rows.map((row) => row.slug),
      names: rows.map((row) => placeWords(row.name)).filter((words) => words.trim() !== ""),
    };
  } catch (error) {
    console.error("[destinations] draft list failed:", error.message);
    return EMPTY;
  }
}

export const isDraftRecord = (record) => record?.status === "Draft";
