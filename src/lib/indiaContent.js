import { db } from "./db.js";
import { isDraftedPlace } from "@/data/draftFilter";
import { getDraftDestinations } from "./destinationStatus.js";

/* =========================================================
   /india PAGE CONTENT
   The eight India collections in the admin panel, shaped the
   way the page's components already expect. Each component
   keeps its own inline arrays as a fallback for an empty
   collection.
========================================================= */

const byOrder = { orderBy: { order: "asc" } };

/** [{group:"city",…}] -> {city:[…]} keeping insertion order */
function groupBy(rows, key, pick) {
  const out = {};
  for (const row of rows) {
    (out[row[key]] ??= []).push(pick(row));
  }
  return out;
}

// The tiles share one collection; these two groups are the "by city / by state"
// block, everything else is a season.
const CITY_GROUPS = new Set(["city", "state"]);

export async function getIndiaContent() {
  const [drafts, zoneCardRows, tileRows, interests, durations, blogs, reviews, faqs] = await Promise.all([
    getDraftDestinations(),
    db.indiaZoneCard.findMany(byOrder),
    db.indiaExploreTile.findMany(byOrder),
    db.indiaExploreInterest.findMany(byOrder),
    db.indiaExploreDuration.findMany(byOrder),
    db.indiaBlog.findMany(byOrder),
    db.indiaReview.findMany(byOrder),
    db.indiaFaq.findMany(byOrder),
  ]);

  // Cards and tiles link by name ("/india/{name}-tour-packages"), so a drafted
  // place is matched the same way and left out.
  const zoneCards = zoneCardRows.filter((row) => !isDraftedPlace({ name: row.name }, drafts));
  const tiles = tileRows.filter((row) => !isDraftedPlace({ name: row.name }, drafts));

  // the tile components call the gradient `style`; the collection stores `visual`
  const asTile = ({ name, tours, visual, image }) => ({ name, tours, style: visual, image });

  return {
    zones: groupBy(zoneCards, "region", ({ name, tours, visual, image }) => ({
      name,
      tours,
      visual,
      image,
    })),
    cityTiles: groupBy(tiles.filter((t) => CITY_GROUPS.has(t.group)), "group", asTile),
    seasonTiles: groupBy(tiles.filter((t) => !CITY_GROUPS.has(t.group)), "group", asTile),
    interests,
    durations,
    blogs,
    reviews,
    faqs,
  };
}
