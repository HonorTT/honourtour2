import { db } from "./db.js";
import { withoutDraftedPlaces } from "@/data/draftFilter";
import { getDraftDestinations } from "./destinationStatus.js";

/* =========================================================
   DEPARTURE CITIES
   Backs the panel's "Departure Cities" module, which drives
   the /tour-packages-from-{city} pages.
========================================================= */

export async function getDepartureCityRecords() {
  const [rows, drafts] = await Promise.all([
    db.departureCity.findMany({ orderBy: { order: "asc" } }),
    getDraftDestinations(),
  ]);
  // Drafted destinations drop out of each city's "explore" links.
  return rows.map((row) => ({ ...row, linkCloudTargets: withoutDraftedPlaces(row.linkCloudTargets ?? [], drafts) }));
}

export async function getDepartureCityParamsFromDb() {
  const rows = await db.departureCity.findMany({
    select: { slug: true },
    orderBy: { order: "asc" },
  });
  return rows.map(({ slug }) => ({ city: slug }));
}
