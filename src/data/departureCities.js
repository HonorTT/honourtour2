import { packages } from "./packages.js";

/* =========================================================
   DEPARTURE CITY PAGES ("Tour Packages From {City}")

   One reusable dynamic route (src/app/tour-packages-from-[city]/page.jsx)
   renders every city below through the SAME TourCategoryPage
   component already used by /india/[destination] and
   /world/[destination] — no per-city page files, no duplicated
   package data. Each city only stores a slug list; the actual
   package objects are resolved from the single source of truth
   in src/data/packages.js.
========================================================= */

export const rawCities = [
  {
    slug: "mumbai",
    name: "Mumbai",
    departures: 1184,
    startingPrice: 30000,
    packageCount: 27,
    reviewsLabel: "9,240 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Mumbai covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Mumbai with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "jaipur-mandawa-tour-package",
      "delhi-agra-tour-package",
      "womens-special-kashmir",
      "best-of-shimla",
      "best-of-kashmir-tour-package",
      "highlights-of-rajasthan-tour-package",
    ],
    linkCloudTargets: [
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "Ladakh", href: "/india/leh-ladakh-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    departures: 77,
    startingPrice: 31000,
    packageCount: 12,
    reviewsLabel: "1,860 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Pune covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Pune with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "highlights-of-rajasthan-tour-package",
      "best-of-kashmir-tour-package",
      "highlights-of-kerala-tour-package",
      "best-of-andaman-tour-package",
      "best-of-shimla",
    ],
    linkCloudTargets: [
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "Ladakh", href: "/india/leh-ladakh-tour-packages" },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    departures: 318,
    startingPrice: 79000,
    packageCount: 18,
    reviewsLabel: "3,120 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Ahmedabad covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Ahmedabad with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "highlights-of-rajasthan-tour-package",
      "highlights-of-kerala-tour-package",
      "best-of-kashmir-tour-package",
    ],
    linkCloudTargets: [
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    departures: 327,
    startingPrice: 79000,
    packageCount: 19,
    reviewsLabel: "3,340 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Hyderabad covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Hyderabad with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "highlights-of-kerala-tour-package",
      "best-of-andaman-tour-package",
      "best-of-kashmir-tour-package",
      "jaipur-mandawa-tour-package",
    ],
    linkCloudTargets: [
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
    ],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    departures: 78,
    startingPrice: 85000,
    packageCount: 14,
    reviewsLabel: "1,980 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Bangalore covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Bangalore with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "highlights-of-kerala-tour-package",
      "best-of-andaman-tour-package",
      "all-of-ladakh-tour-package",
      "best-of-kashmir-tour-package",
    ],
    linkCloudTargets: [
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "Ladakh", href: "/india/leh-ladakh-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    departures: 322,
    startingPrice: 79000,
    packageCount: 16,
    reviewsLabel: "2,760 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Kolkata covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Kolkata with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "best-of-andaman-tour-package",
      "highlights-of-kerala-tour-package",
      "kashmir-highlights",
    ],
    linkCloudTargets: [
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "North East", href: "/india/north-east-tour-packages" },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    departures: 337,
    startingPrice: 77000,
    packageCount: 22,
    reviewsLabel: "3,580 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Delhi covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Delhi with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "best-of-kashmir-tour-package",
      "all-of-ladakh-tour-package",
      "jaipur-mandawa-tour-package",
      "best-of-shimla",
      "best-of-andaman-tour-package",
    ],
    linkCloudTargets: [
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "Ladakh", href: "/india/leh-ladakh-tour-packages" },
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
      { name: "Shimla", href: "/india/shimla-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
    ],
  },
  {
    slug: "indore",
    name: "Indore",
    departures: 296,
    startingPrice: 85000,
    packageCount: 15,
    reviewsLabel: "2,410 Reviews",
    intro:
      "Explore thoughtfully planned tour packages from Indore covering popular destinations across India. Discover convenient departures, guided sightseeing, comfortable stays and memorable Honor Tour & Travels experiences.",
    introExtra:
      "Whether you are planning a family holiday, honeymoon, group tour or seniors' tour, explore Honor Tour & Travels tour packages from Indore with convenient departure options and dedicated tour managers throughout your journey.",
    packageSlugs: [
      "highlights-of-rajasthan-tour-package",
      "best-of-kashmir-tour-package",
      "highlights-of-kerala-tour-package",
      "delhi-agra-tour-package",
      "best-of-andaman-tour-package",
    ],
    linkCloudTargets: [
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Delhi Agra", href: "/india/delhi-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
    ],
  },
];

/* =========================================================
   BUILD TourCategoryPage-COMPATIBLE CONFIG
========================================================= */

function buildCityConfig(raw) {
  const resolvedPackages = raw.packageSlugs
    .map((slug) => packages.find((item) => item.slug === slug))
    .filter(Boolean);

  return {
    slug: raw.slug,
    breadcrumbTrail: ["India", `Tour Packages From ${raw.name}`],
    heading: `Tour Packages From ${raw.name}`,
    intro: raw.intro,
    introExtra: raw.introExtra,
    reviewsLabel: raw.reviewsLabel,
    tabs: [`All Packages (${raw.packageCount})`, "India", "World", "Family", "Honeymoon"],
    listing: {
      countLine1: `${raw.packageCount} Holiday`,
      countLine2: `Packages From ${raw.name}`,
      showingLabel: `Showing 1-${resolvedPackages.length} packages from ${raw.packageCount} packages`,
      liveBadgeLabel: `Tours Ongoing from ${raw.name} right now!`,
    },
    filters: {
      departureCities: [raw.name],
      countries: ["India"],
      cities: ["Rajasthan", "Kerala", "Kashmir", "Ladakh", "Shimla", "Andaman"],
      durations: ["Less than 5 Days", "6 to 8 Days", "9 to 14 Days", "More than 14 Days"],
      packageTypes: ["Group Tour", "Customized Holidays"],
      specialityTours: ["Family", "Women's Special", "Seniors' Special", "Honeymoon Special", "Short Trips"],
    },
    packages: resolvedPackages,
    joiningLeaving: {
      heading: `Departing from ${raw.name}`,
      cities: ["Mumbai", "Delhi", "Ahmedabad", "Bangalore", "Hyderabad"].filter((c) => c !== raw.name),
    },
    related: {
      title: "Explore Packages",
      items: raw.linkCloudTargets.slice(0, 6).map((item) => ({
        name: `${item.name} Tour Packages From ${raw.name}`,
        href: item.href,
      })),
    },
    linkCloud: {
      title: `Popular Destinations From ${raw.name}`,
      items: raw.linkCloudTargets.map((item) => ({
        name: `${item.name} Tour Packages From ${raw.name}`,
        href: item.href,
      })),
    },
    regions: {
      title: `Tour Packages From ${raw.name} By Destination`,
      items: resolvedPackages.slice(0, 6).map((pkg) => ({
        name: pkg.title,
        count: `${pkg.reviews || 0} reviews`,
        href: `/package/${pkg.slug}`,
      })),
    },
    interests: {
      title: `Tour Packages From ${raw.name} By Interest`,
      items: ["Family", "Honeymoon", "Group Tour", "Customized Holidays"],
    },
    seasons: {
      title: `Tour Packages From ${raw.name} By Season`,
      items: ["Summer", "Monsoon", "Winter", "Spring"],
    },
    durations: {
      title: `Explore Packages From ${raw.name} By Duration`,
      items: ["Less than 5 days", "6 to 8 days", "9 to 14 days", "More than 14 days"],
      packages: resolvedPackages.slice(0, 4),
    },
    blogs: [
      `Best tour packages from ${raw.name}`,
      `Weekend getaways from ${raw.name}`,
      `Family tour ideas from ${raw.name}`,
      `Travel tips before booking from ${raw.name}`,
    ],
    reviews: [
      {
        name: "Priya",
        tour: `Tour from ${raw.name}`,
        category: "Group Tour",
        review: `A wonderful and well-managed holiday booked from ${raw.name}. Everything from pickup to sightseeing was planned perfectly.`,
      },
      {
        name: "Rohan",
        tour: `Tour from ${raw.name}`,
        category: "Family",
        review: `Our tour manager took great care of the group throughout the trip booked from ${raw.name}. Highly recommended.`,
      },
      {
        name: "Anjali",
        tour: `Tour from ${raw.name}`,
        category: "Group Tour",
        review: `Excellent experience with great hotels, sightseeing and transportation, all departing conveniently from ${raw.name}.`,
      },
    ],
    faqHeading: `From ${raw.name} Frequently Asked Questions`,
    faqSubheading: "We help you prepare for your trip and answer commonly asked questions.",
    faqs: [
      {
        question: `What types of tour packages can I find departing from ${raw.name}?`,
        answer: `Honor Tour & Travels offers a wide range of tour packages from ${raw.name}, including family holidays, group tours, honeymoon packages, women's special tours, seniors' tours and customized India itineraries.`,
      },
      {
        question: `How soon should I book a tour package from ${raw.name}?`,
        answer: `We recommend booking 6 to 8 weeks in advance for tours from ${raw.name} to get the best availability and pricing.`,
      },
      {
        question: `What are popular domestic destinations to explore from ${raw.name}?`,
        answer: `Popular domestic destinations booked from ${raw.name} include Rajasthan, Kashmir, Kerala, Ladakh, Shimla and Andaman, among many others.`,
      },
      {
        question: `Can I book a honeymoon package from ${raw.name}?`,
        answer: `Yes, Honor Tour & Travels offers curated honeymoon packages departing from ${raw.name} across India.`,
      },
    ],
    seo: {
      heading: `Get to know more about Travel packages from ${raw.name}`,
      paragraphs: [
        `${raw.name} is well connected to some of the most loved holiday destinations in India, making it a convenient departure point for your next trip.`,
        `Our tour packages from ${raw.name} are designed for families, couples and groups, combining comfortable stays, guided sightseeing and experienced tour managers across a range of durations and travel styles.`,
      ],
      extraParagraphs: [
        `Whether you are looking for a short weekend getaway, or a longer circuit across India, choosing the right season and itinerary will help you plan a memorable trip from ${raw.name}.`,
      ],
    },
  };
}

export function getDepartureCities() {
  return rawCities;
}

export function getDepartureCity(slug, records) {
  // `records` comes from the departureCity collection; this file is the fallback.
  const source = records?.length ? records : rawCities;
  const raw = source.find((item) => item.slug === slug);
  if (!raw) return null;
  return { raw, config: buildCityConfig(raw) };
}

export function getDepartureCityParams() {
  return rawCities.map((item) => ({ city: item.slug }));
}
