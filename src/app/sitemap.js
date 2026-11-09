import { SITE_URL } from "@/lib/seo";
import { getPackageSlugs } from "@/lib/packages";
import { getDestinationParamsFromDb } from "@/lib/destinations";
import { getDepartureCityParamsFromDb } from "@/lib/departureCities";
import { getDestinationParams } from "@/data/destinations";
import { getCityPageTarget } from "@/data/navigationData";
import { getSpecialitySlugs } from "@/data/specialityTours";
import { getDepartureCityParams } from "@/data/departureCities";
import { getFlightRouteSlugs } from "@/lib/flights";
import { db } from "@/lib/db";

/* =========================================================
   SITEMAP
   Lists every page a search engine should see, on the same
   URLs the pages declare as canonical — a sitemap that
   disagrees with the canonical tag splits a page's ranking
   between two addresses.

   Destinations and departure cities come from the database
   first (that is what the admin panel edits and what the
   pages build from) and fall back to the checked-in lists
   when a collection is empty, matching the pages exactly.

   /admin is deliberately absent; robots.txt disallows it.
========================================================= */

function url(path, { changeFrequency = "weekly", priority = 0.6, lastModified } = {}) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

/** DB slugs first, then any checked-in slug the collection does not cover. */
const merge = (fromDb, fromFile, key) => {
  const seen = new Set(fromDb.map((item) => item[key]));
  return [...fromDb, ...fromFile.filter((item) => !seen.has(item[key]))];
};

export default async function sitemap() {
  const flightRouteSlugs = await getFlightRouteSlugs();
  const [packages, transportRoutes, hotels, indiaFromDb, citiesFromDb] = await Promise.all([
    getPackageSlugs(),
    db.transportRoute.findMany({ select: { slug: true } }),
    db.hotel.findMany({ select: { slug: true, citySlug: true } }),
    getDestinationParamsFromDb("india"),
    getDepartureCityParamsFromDb(),
  ]);

  // A city page only redirects to its state now, so it is not listed.
  const indiaDestinations = merge(indiaFromDb, getDestinationParams("india"), "destination").filter(
    ({ destination }) => !getCityPageTarget(destination),
  );
  const departureCities = merge(citiesFromDb, getDepartureCityParams(), "city");

  const staticPages = [
    url("/", { changeFrequency: "daily", priority: 1 }),
    url("/india", { changeFrequency: "daily", priority: 0.9 }),
    url("/speciality-tours", { priority: 0.7 }),
    url("/customized-holidays", { priority: 0.7 }),
    url("/flights", { changeFrequency: "daily", priority: 0.8 }),
    url("/transport", { priority: 0.7 }),
    url("/gift-cards", { priority: 0.6 }),
    url("/contact", { priority: 0.6 }),
    url("/hotels", { changeFrequency: "daily", priority: 0.8 }),
    url("/womens-special", { priority: 0.6 }),
    url("/seniors-special", { priority: 0.6 }),
  ];

  return [
    ...staticPages,

    ...packages.map((pkg) => url(`/package/${pkg.slug}`, { priority: 0.7 })),

    ...indiaDestinations.map(({ destination }) => url(`/india/${destination}`, { priority: 0.7 })),

    ...getSpecialitySlugs().map((category) => url(`/speciality-tours/${category}`, { priority: 0.6 })),

    // The hyphenated form is the public URL; next.config rewrites it to the
    // dynamic route. Listing the internal path here would fight the canonical.
    ...departureCities.map(({ city }) => url(`/tour-packages-from-${city}`, { priority: 0.6 })),

    ...flightRouteSlugs.map(({ route }) => url(`/flights/${route}`, { priority: 0.6 })),
    ...transportRoutes.map((route) => url(`/transport/${route.slug}`, { priority: 0.6 })),

    ...Array.from(new Set(hotels.map((hotel) => hotel.citySlug))).map((citySlug) =>
      url(`/hotels/${citySlug}`, { priority: 0.6 })
    ),
    ...hotels.map((hotel) => url(`/hotels/${hotel.citySlug}/${hotel.slug}`, { priority: 0.6 })),
  ];
}
