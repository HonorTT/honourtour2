import { findAirportBySlugToken, slugifyCity } from "./airports.js";

/* =========================================================
   DEMO / STATIC FLIGHT DATA GENERATOR

   Deterministic sample data for the marketing route pages.
   There is no live fare or schedule API here.

   NOT BOOKABLE. Every flight it produces carries isDemo:true,
   and the booking flow requires a supplier fareKey that this
   file cannot produce. Live results come from
   POST /api/flights/search via the configured provider.
========================================================= */

const AIRLINES = [
  { name: "Air India", code: "AI" },
  { name: "IndiGo", code: "6E" },
  { name: "SpiceJet", code: "SG" },
  { name: "Akasa Air", code: "QP" },
  { name: "Air India Express", code: "IX" },
];

function seededRandom(seedString) {
  let seed = 0;
  for (let i = 0; i < seedString.length; i += 1) {
    seed = (seed * 31 + seedString.charCodeAt(i)) >>> 0;
  }
  return function next() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function formatTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${String(mins).padStart(2, "0")}m`;
}

function generateFlights({ slug, fromCode, toCode, baseDuration, minPrice, maxPrice, count, allowStops }) {
  const rand = seededRandom(slug);
  const flights = [];

  for (let i = 0; i < count; i += 1) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    const flightNumber = `${airline.code}-${100 + Math.floor(rand() * 899)}`;

    const departureMinutes = Math.floor(rand() * 1440);

    let stops = 0;
    if (allowStops) {
      const stopRoll = rand();
      if (stopRoll > 0.82) stops = 2;
      else if (stopRoll > 0.55) stops = 1;
    }

    const duration = baseDuration + stops * (45 + Math.floor(rand() * 45)) + Math.floor(rand() * 20);
    const arrivalMinutes = departureMinutes + duration;

    const price = Math.round(minPrice + rand() * (maxPrice - minPrice));
    const status = rand() > 0.78 ? "Few Seats Left" : "Available";

    flights.push({
      // Sample data for the marketing pages — never bookable. See src/lib/travel/demoGuard.js
      isDemo: true,
      id: `${slug}-${i}`,
      airline: airline.name,
      flightNumber,
      fromCode,
      toCode,
      departureTime: formatTime(departureMinutes),
      arrivalTime: formatTime(arrivalMinutes),
      durationMinutes: duration,
      duration: formatDuration(duration),
      stops,
      stopsLabel: stops === 0 ? "Non-stop" : stops === 1 ? "1 Stop" : `${stops} Stops`,
      price,
      status,
    });
  }

  return flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

/* =========================================================
   CURATED ROUTES
========================================================= */

const rawRoutes = [
  {
    slug: "mumbai-to-delhi",
    from: "Mumbai", fromCode: "BOM",
    to: "Delhi", toCode: "DEL",
    international: false,
    baseDuration: 130, minPrice: 3800, maxPrice: 9200, count: 18, allowStops: true,
    description:
      "One of India's busiest domestic sectors, the Mumbai to Delhi route connects the country's financial capital with the national capital, with frequent flights operating through the day.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }, { label: "Rajasthan Tour Packages", href: "/india/rajasthan-tour-packages" }],
    otherRoutes: ["delhi-to-mumbai", "mumbai-to-bangalore", "pune-to-delhi"],
  },
  {
    slug: "mumbai-to-srinagar",
    from: "Mumbai", fromCode: "BOM",
    to: "Srinagar", toCode: "SXR",
    international: false,
    baseDuration: 155, minPrice: 7200, maxPrice: 13900, count: 18, allowStops: true,
    description:
      "Flying from Mumbai to Srinagar is the fastest way to reach the Kashmir valley, with both non-stop and connecting options operated by major domestic carriers.",
    relatedTours: [
      { label: "Kashmir Tour Packages", href: "/india/kashmir-tour-packages" },
      { label: "India Tour Packages", href: "/india" },
    ],
    otherRoutes: ["delhi-to-srinagar", "mumbai-to-delhi", "pune-to-leh"],
  },
  {
    slug: "mumbai-to-bangalore",
    from: "Mumbai", fromCode: "BOM",
    to: "Bangalore", toCode: "BLR",
    international: false,
    baseDuration: 100, minPrice: 3200, maxPrice: 7600, count: 18, allowStops: true,
    description:
      "Mumbai to Bangalore is a short and frequently travelled sector for business and leisure passengers, with multiple daily departures across airlines.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["delhi-to-bangalore", "mumbai-to-delhi", "mumbai-to-hyderabad"],
  },
  {
    slug: "mumbai-to-hyderabad",
    from: "Mumbai", fromCode: "BOM",
    to: "Hyderabad", toCode: "HYD",
    international: false,
    baseDuration: 95, minPrice: 3000, maxPrice: 7200, count: 16, allowStops: true,
    description:
      "The Mumbai to Hyderabad route is well served by domestic carriers, making it convenient to plan short getaways or business trips between the two cities.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["mumbai-to-bangalore", "mumbai-to-delhi", "mumbai-to-kolkata"],
  },
  {
    slug: "mumbai-to-kolkata",
    from: "Mumbai", fromCode: "BOM",
    to: "Kolkata", toCode: "CCU",
    international: false,
    baseDuration: 160, minPrice: 4200, maxPrice: 9800, count: 16, allowStops: true,
    description:
      "Mumbai to Kolkata connects the west and east coasts of India, with a good mix of non-stop and one-stop flights available throughout the week.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["mumbai-to-delhi", "mumbai-to-hyderabad", "mumbai-to-bangalore"],
  },
  {
    slug: "mumbai-to-goa",
    from: "Mumbai", fromCode: "BOM",
    to: "Goa", toCode: "GOI",
    international: false,
    baseDuration: 75, minPrice: 2600, maxPrice: 6400, count: 16, allowStops: false,
    description:
      "One of India's most popular short-haul leisure routes, Mumbai to Goa is almost entirely non-stop with a high frequency of daily flights.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["mumbai-to-bangalore", "mumbai-to-delhi", "mumbai-to-hyderabad"],
  },
  {
    slug: "delhi-to-mumbai",
    from: "Delhi", fromCode: "DEL",
    to: "Mumbai", toCode: "BOM",
    international: false,
    baseDuration: 130, minPrice: 3800, maxPrice: 9200, count: 18, allowStops: true,
    description:
      "Delhi to Mumbai is India's busiest air corridor, offering travellers a wide choice of departure times and airlines throughout the day.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }, { label: "Rajasthan Tour Packages", href: "/india/rajasthan-tour-packages" }],
    otherRoutes: ["mumbai-to-delhi", "delhi-to-bangalore", "delhi-to-srinagar"],
  },
  {
    slug: "delhi-to-srinagar",
    from: "Delhi", fromCode: "DEL",
    to: "Srinagar", toCode: "SXR",
    international: false,
    baseDuration: 95, minPrice: 4800, maxPrice: 11200, count: 16, allowStops: true,
    description:
      "Delhi to Srinagar is the quickest gateway to the Kashmir valley, with multiple non-stop flights operating daily during the tourist season.",
    relatedTours: [
      { label: "Kashmir Tour Packages", href: "/india/kashmir-tour-packages" },
      { label: "India Tour Packages", href: "/india" },
    ],
    otherRoutes: ["mumbai-to-srinagar", "delhi-to-mumbai", "delhi-to-bangalore"],
  },
  {
    slug: "delhi-to-bangalore",
    from: "Delhi", fromCode: "DEL",
    to: "Bangalore", toCode: "BLR",
    international: false,
    baseDuration: 165, minPrice: 4200, maxPrice: 9600, count: 16, allowStops: true,
    description:
      "Connecting the national capital with India's technology hub, Delhi to Bangalore is a well-travelled sector for both business and leisure passengers.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["mumbai-to-bangalore", "delhi-to-mumbai", "delhi-to-srinagar"],
  },
  {
    slug: "pune-to-delhi",
    from: "Pune", fromCode: "PNQ",
    to: "Delhi", toCode: "DEL",
    international: false,
    baseDuration: 140, minPrice: 3900, maxPrice: 9000, count: 16, allowStops: true,
    description:
      "Pune to Delhi is a convenient sector for travellers heading north from Maharashtra, with several non-stop and connecting flight options available.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["mumbai-to-delhi", "pune-to-leh", "delhi-to-mumbai"],
  },
  {
    slug: "pune-to-leh",
    from: "Pune", fromCode: "PNQ",
    to: "Leh", toCode: "IXL",
    international: false,
    baseDuration: 180, minPrice: 8600, maxPrice: 16800, count: 14, allowStops: true,
    description:
      "Flying from Pune to Leh usually involves a connection through Delhi, offering scenic Himalayan views as the flight approaches the Leh valley.",
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: ["pune-to-delhi", "mumbai-to-srinagar", "delhi-to-srinagar"],
  },
];

/** Turns a stored or static route row into the shape the pages render. */
export function buildRoute(route) {
  return {
    ...route,
    title: `${route.from} to ${route.to} Flights`,
    flights: generateFlights({
      slug: route.slug,
      fromCode: route.fromCode,
      toCode: route.toCode,
      baseDuration: route.baseDuration,
      minPrice: route.minPrice,
      maxPrice: route.maxPrice,
      count: route.count,
      allowStops: route.allowStops,
    }),
  };
}

export const flightRoutes = rawRoutes.map(buildRoute);

/* =========================================================
   ACCESSORS
========================================================= */

export function getAllRouteSlugs() {
  return flightRoutes.map((route) => ({ route: route.slug }));
}

export function getPopularRoutes() {
  return flightRoutes;
}

function synthesizeRoute(slug) {
  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;

  const fromAirport = findAirportBySlugToken(parts[0]);
  const toAirport = findAirportBySlugToken(parts[1]);
  if (!fromAirport || !toAirport || fromAirport.code === toAirport.code) return null;

  return {
    slug,
    from: fromAirport.city,
    fromCode: fromAirport.code,
    to: toAirport.city,
    toCode: toAirport.code,
    international: false,
    title: `${fromAirport.city} to ${toAirport.city} Flights`,
    description: `${fromAirport.city} to ${toAirport.city} flights are available with a mix of domestic and connecting carriers, giving travellers flexible departure options.`,
    relatedTours: [{ label: "India Tour Packages", href: "/india" }],
    otherRoutes: flightRoutes.slice(0, 3).map((r) => r.slug),
    flights: generateFlights({
      slug,
      fromCode: fromAirport.code,
      toCode: toAirport.code,
      baseDuration: 130,
      minPrice: 3500,
      maxPrice: 9500,
      count: 14,
      allowStops: true,
    }),
  };
}

export function getRoute(slug) {
  const curated = flightRoutes.find((route) => route.slug === slug);
  if (curated) return curated;
  return synthesizeRoute(slug);
}

export function getRouteBySlugOrNull(slug) {
  return getRoute(slug) || null;
}

export function getRouteFaqs(route) {
  return [
    {
      question: `How long is the flight from ${route.from} to ${route.to}?`,
      answer: `The flight duration from ${route.from} to ${route.to} typically ranges between ${formatDuration(Math.min(...route.flights.map((f) => f.durationMinutes)))} and ${formatDuration(Math.max(...route.flights.map((f) => f.durationMinutes)))}, depending on the airline and number of stops.`,
    },
    {
      question: `Are there direct flights from ${route.from} to ${route.to}?`,
      answer: `Yes, several airlines operate non-stop flights on the ${route.from} to ${route.to} route, along with connecting options that may offer lower fares.`,
    },
    {
      question: `What is the cheapest month to fly ${route.from} to ${route.to}?`,
      answer: `Fares on the ${route.from} to ${route.to} route tend to be lower during weekdays and outside of peak holiday periods, though prices vary through the year.`,
    },
    {
      question: `Which airline is best for ${route.from} to ${route.to}?`,
      answer: `Air India, IndiGo, SpiceJet, Akasa Air and Air India Express all operate on this sector, so the best choice usually depends on your preferred timing and budget.`,
    },
    {
      question: `Are flights included in Honor Tour & Travels ${route.to} group tours?`,
      answer: `Select group tours include return airfare as part of the package, while others offer flexible joining and leaving options so you can book your own ${route.from} to ${route.to} flight.`,
    },
    {
      question: `Which airlines operate ${route.from} to ${route.to} flights?`,
      answer: `${route.from} to ${route.to} flights are operated by major Indian carriers including Air India, IndiGo, SpiceJet, Akasa Air and Air India Express.`,
    },
  ];
}
