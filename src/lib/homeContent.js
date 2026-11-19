import { db } from "./db.js";
import { withHomeDefaults } from "@/data/homeDefaults";

/* =========================================================
   HOME PAGE CONTENT
   Reads every home-page collection the admin panel manages
   and hands it to src/app/page.jsx in one object.

   Anything a collection does not cover — section headings,
   intro copy — still comes from src/data/homeData.js, and
   each component falls back to that file when its collection
   is empty, so an emptied table degrades to the old content
   rather than to a blank section.
========================================================= */

const byOrder = { orderBy: { order: "asc" } };

export async function getHomeContent() {
  const [
    heroCards,
    destinations,
    liveTourCards,
    promoSlides,
    chinaPromoPackages,
    mostLovedPromoDestinations,
    mostLovedDestinations,
    trustStats,
    trustReviews,
    featuredTours,
    continueTravelTours,
    tourInclusionFeatures,
    faqItems,
    departureCities,
    settingsRows,
  ] = await Promise.all([
    db.heroCard.findMany(byOrder),
    db.homeDestination.findMany(byOrder),
    db.liveTourCard.findMany(byOrder),
    db.promoSlide.findMany(byOrder),
    db.chinaPromoPackage.findMany(byOrder),
    db.mostLovedPromoDestination.findMany(byOrder),
    db.mostLovedDestination.findMany(byOrder),
    db.trustStat.findMany(byOrder),
    db.trustReview.findMany(byOrder),
    db.featuredTourSlide.findMany(byOrder),
    db.continueTravelTour.findMany(byOrder),
    db.tourInclusionFeature.findMany(byOrder),
    db.faqItem.findMany(byOrder),
    db.departureCity.findMany(byOrder),
    db.homeSettings.findMany({ take: 1 }),
  ]);

  return {
    // Headings, copy and fixed photos (admin: Home Page -> Text & Photos).
    settings: withHomeDefaults(settingsRows[0]),
    heroCards,
    destinations,
    liveTourCards,
    promoSlides,
    chinaPromoPackages,
    mostLovedPromoDestinations,
    mostLovedDestinations,
    trustStats,
    trustReviews,
    featuredTours,
    continueTravelTours,
    tourInclusionFeatures,

    // the FAQ component wants questions and categories as parallel lists
    faq: faqItems.length
      ? {
          questions: faqItems.map(({ question, answer }) => ({ question, answer })),
          categories: faqItems.map((item) => item.category ?? null),
        }
      : null,

    // the strip shows these as prose; the collection stores them as numbers
    departureCities: departureCities.map((city) => ({
      name: city.name,
      slug: city.slug,
      image: city.image || null,
      departures: `${city.departures} Departures`,
      startingPrice: `₹${city.startingPrice.toLocaleString("en-IN")}`,
    })),
  };
}
