/* =========================================================
   PACKAGE DEFAULTS
   Several sections of a package page fall back to standard
   content when the admin has not written their own — the
   exclusions list, the cancellation slabs, the payment terms,
   the upgrades, "need to know", "tour details" and the FAQs.

   Those fallbacks used to live inside the page, which meant
   the admin saw an empty box for text the visitor could
   plainly read. They live here now so the page and the edit
   form agree on exactly what the page is serving, and the
   form can prefill the boxes with it.
========================================================= */

export const DEFAULT_EXCLUSIONS = [
  "Personal expenses and shopping",
  "Optional sightseeing and activities",
  "Meals not specifically mentioned",
  "Travel insurance unless mentioned",
  "Additional services requested during the tour",
];

export const DEFAULT_CANCELLATION_POLICY = [
  { period: "45 days or more before departure", charge: "Registration amount" },
  { period: "30 - 44 days before departure", charge: "25% of tour cost" },
  { period: "15 - 29 days before departure", charge: "50% of tour cost" },
  { period: "8 - 14 days before departure", charge: "75% of tour cost" },
  { period: "0 - 7 days before departure", charge: "100% of tour cost" },
];

export const DEFAULT_PAYMENT_TERMS = [
  "A registration amount is payable at the time of booking to confirm your seat on the tour.",
  "The balance payment is due before the departure date as communicated by your tour manager.",
  "Bookings made close to the departure date require full payment at the time of booking.",
  "Cancellation charges apply as per the cancellation policy from the date of written cancellation.",
];

export const DEFAULT_UPGRADES = [
  { title: "Flight Upgrade", description: "Enhance your travel experience with optional upgrades." },
  { title: "Premium Hotel", description: "Enhance your travel experience with optional upgrades." },
  { title: "Private Experience", description: "Enhance your travel experience with optional upgrades." },
];

const price = (value) => new Intl.NumberFormat("en-IN").format(value ?? 0);

const firstCityOf = (tour) => String(tour.location ?? "").split("•")[0]?.trim() || tour.location || "";

/** "Srinagar , Gulmarg" or "Ayodhya • Lucknow" -> ["Srinagar", "Gulmarg"]. */
export function stayCitiesOf(location) {
  const parts = String(location ?? "")
    .split(/[•,|/]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const unique = parts.filter((city, index) => parts.indexOf(city) === index);
  return unique.length ? unique : [String(location ?? "").trim()].filter(Boolean);
}

export function defaultAccommodation(tour) {
  return stayCitiesOf(tour.location).map((city) => ({
    city,
    hotel: "Comfortable selected hotel",
    stay: "As per itinerary",
  }));
}

export function defaultTourDetails(tour) {
  const firstCity = firstCityOf(tour);

  return {
    flight: `Domestic flights or train connections to ${firstCity} can be arranged separately, or join the group directly at the first destination of the tour.`,
    accommodation:
      "Comfortable, well-located hotels are used throughout the tour on a twin-sharing basis, as detailed in the itinerary.",
    reporting: `Please report at the designated meeting point in ${firstCity} at the time communicated by your tour manager, usually a few hours before the first scheduled activity.`,
  };
}

export function defaultNeedToKnow() {
  return {
    weather: "Weather conditions may vary depending on destination and travel dates.",
    transport: "Comfortable transportation will be provided as mentioned in the itinerary.",
    documents: ["Carry valid government-issued identification and all necessary travel documents."],
    tourManager: "Tour manager services are provided according to the selected package.",
  };
}

/** The questions every enquiry asks, answered from this package's own data. */
export function defaultFaqs(tour) {
  const firstCity = firstCityOf(tour);

  return [
    {
      question: `What is included in the ${tour.title} package?`,
      answer:
        (tour.inclusions?.length
          ? tour.inclusions.join(", ")
          : "Accommodation, daily breakfast, all transfers and sightseeing as per the itinerary") + ".",
    },
    {
      question: "How long is this tour and how many cities does it cover?",
      answer: `The tour runs for ${tour.days} days and ${tour.nights} nights and covers ${tour.cities} ${
        tour.cities === 1 ? "city" : "cities"
      }, starting from ${firstCity}.`,
    },
    {
      question: "What does the package cost and are EMIs available?",
      answer: `The package starts at ₹${price(tour.price)} per person${
        tour.emi ? `, or around ₹${price(tour.emi)} per month on EMI` : ""
      }. Final pricing depends on your travel dates and group size.`,
    },
    {
      question: "How do I book this tour?",
      answer:
        "Send an enquiry from this page or call us. Our team confirms availability for your dates, shares the final quote, and holds your seats once the booking amount is paid.",
    },
    {
      question: "Can this itinerary be customised?",
      answer:
        "Yes. Hotels, duration, sightseeing and departure city can all be adjusted. Tell us what you have in mind and we will rework the itinerary and the price.",
    },
  ];
}

/**
 * Everything the package page falls back to, keyed by the field that holds
 * it. The page spreads this under the stored record; the admin form uses it
 * to prefill whichever boxes are still empty.
 */
export function packageDefaults(tour) {
  return {
    exclusions: DEFAULT_EXCLUSIONS,
    cancellationPolicy: DEFAULT_CANCELLATION_POLICY,
    paymentTerms: DEFAULT_PAYMENT_TERMS,
    upgrades: DEFAULT_UPGRADES,
    tourDetails: defaultTourDetails(tour),
    needToKnow: defaultNeedToKnow(),
    accommodation: defaultAccommodation(tour),
    faqs: defaultFaqs(tour),
  };
}

/** True when a stored value is absent, blank or an empty list/object. */
export function isBlank(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

/**
 * Stored values win; anything blank takes the default.
 *
 * Grouped fields ("need to know", "tour details") merge key by key rather than
 * all-or-nothing. A package saved before a new key existed still has the rest
 * of the group filled in, so adding one — tourManager, say — does not leave an
 * empty box on every package already in the database.
 */
export function fillBlanks(record, defaults) {
  const filled = { ...record };

  for (const [key, value] of Object.entries(defaults)) {
    if (isPlainObject(value) && isPlainObject(filled[key])) {
      filled[key] = fillBlanks(filled[key], value);
    } else if (isBlank(filled[key])) {
      filled[key] = value;
    }
  }

  return filled;
}

/** The record as the public page reads it: stored values, blanks filled in. */
export function withPackageDefaults(tour) {
  if (!tour) return tour;
  return fillBlanks(tour, packageDefaults(tour));
}
