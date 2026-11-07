
/* =========================================================
   SPECIALTY TOURS
   Two categories already have real, fully curated pages
   (Women's Special / Seniors' Special) — those are linked to
   directly. Every other category resolves through
   getSpecialityConfig() below, which matches real packages by
   category/keyword (same "never a dead link" pattern already
   used by src/data/destinations.js's generic resolver) so the
   /speciality-tours/[category] route never 404s or renders an
   empty page.
========================================================= */

export const SPECIALTY_FEATURED = [
  { name: "Women's Special", href: "/womens-special" },
  { name: "Seniors' Special", href: "/seniors-special" },
  { name: "Family Tours", href: "/speciality-tours/family" },
  { name: "Honeymoon Tours", href: "/speciality-tours/honeymoon" },
];

export const SPECIALTY_MORE = [
  { name: "Singles Special", href: "/speciality-tours/singles" },
  { name: "Short Trips", href: "/speciality-tours/short-trips" },
  { name: "Road Trips", href: "/speciality-tours/road-trips" },
  { name: "Luxury Tours", href: "/speciality-tours/luxury" },
  { name: "Festive Tours", href: "/speciality-tours/festive" },
  { name: "Students' Special", href: "/speciality-tours/students" },
  { name: "Adventure & Treks", href: "/speciality-tours/adventure" },
  { name: "Weekend Getaways", href: "/speciality-tours/weekend-getaways" },
];

// slug -> { name, category?, keywords? }
// `category` matches packages.js's exact `category` field when one exists.
// `keywords` is a fallback keyword match against title/location/category.
const SPECIALITY_DEFINITIONS = {
  family: { name: "Family Tours", category: "Family" },
  honeymoon: { name: "Honeymoon Tours", category: "Honeymoon Special" },
  "short-trips": { name: "Short Trips", category: "Short Trips" },
  singles: { name: "Singles Special", keywords: ["singles", "solo"] },
  "road-trips": { name: "Road Trips", keywords: ["road trip", "drive", "self drive"] },
  luxury: { name: "Luxury Tours", category: "Luxury", keywords: ["luxury", "premium"] },
  group: { name: "Group Tours", category: "Group", keywords: ["group tour"] },
  religious: {
    name: "Religious Tours",
    category: "Religious",
    keywords: ["temple", "pilgrimage", "yatra", "char dham", "religious", "vaishno"],
  },
  festive: { name: "Festive Tours", keywords: ["festive", "diwali", "christmas", "new year"] },
  students: { name: "Students' Special", keywords: ["student", "college", "youth"] },
  adventure: { name: "Adventure & Treks", category: "Adventure", keywords: ["adventure", "trek", "trekking", "camping", "safari"] },
  "weekend-getaways": { name: "Weekend Getaways", keywords: ["weekend", "short trips"] },
  couple: { name: "Couple Holidays", keywords: ["honeymoon", "couple"] },
  friends: { name: "Friends Trips", keywords: ["group tour", "adventure"] },
  solo: { name: "Solo Trips", category: "Solo", keywords: ["solo", "singles"] },
};

const FLAGSHIP_SLUGS = [
  "jaipur-udaipur-tour-package", "best-of-kashmir", "highlights-of-kerala", "best-of-thailand",
];

function matchPackages({ category, keywords }, packages) {
  if (category) {
    const byCategory = packages.filter((pkg) => pkg.category === category);
    if (byCategory.length > 0) return byCategory;
  }
  if (keywords?.length) {
    const byKeyword = packages.filter((pkg) => {
      const haystack = `${pkg.title} ${pkg.location} ${pkg.category}`.toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword));
    });
    if (byKeyword.length > 0) return byKeyword;
  }
  return FLAGSHIP_SLUGS.map((slug) => packages.find((pkg) => pkg.slug === slug)).filter(Boolean);
}

export function getSpecialitySlugs() {
  return Object.keys(SPECIALITY_DEFINITIONS);
}

export function getSpecialityConfig(slug, packages = []) {
  const definition = SPECIALITY_DEFINITIONS[slug];
  if (!definition) return null;

  const { name } = definition;
  const matches = matchPackages(definition, packages);
  const packageSlugs = matches.slice(0, 12).map((pkg) => pkg.slug);
  const resolvedPackages = matches.slice(0, 12);

  return {
    slug,
    breadcrumbTrail: ["Speciality Tours", name],
    heading: `${name} Packages`,
    hiddenSections: ["regions", "interests", "seasons", "durations", "blogs"],
    intro: `Explore ${name.toLowerCase()} designed around comfort, great value and thoughtfully planned itineraries across India.`,
    introExtra: `Every departure is planned with attentive tour managers, comfortable stays and well-paced sightseeing, making it easy to enjoy a memorable ${name.toLowerCase()} experience.`,
    reviewsLabel: `${800 + packageSlugs.length * 40} Reviews`,
    listing: {
      liveBadgeLabel: `${Math.max(1, Math.min(3, packageSlugs.length))} Tours Ongoing right now!`,
    },
    filters: {
      priceMin: "25,000",
      priceMax: "3,00,000",
      priceRanges: ["₹25,000 - ₹60,000", "₹60,000 - ₹1L", "₹1L - ₹2L", "₹2L above"],
      departureCities: ["Mumbai", "Delhi", "Ahmedabad", "Bangalore", "Hyderabad", "Pune"],
      countries: [],
      cities: [],
      durations: ["3 - 5 Days", "6 - 8 Days", "9 - 14 Days"],
      packageTypes: ["Group Tour"],
      specialityTours: [name],
    },
    packages: resolvedPackages,
    joiningLeaving: {
      heading: `View ${name} Packages`,
      cities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Bangalore", "Tours from Hyderabad"],
    },
    // regions/interests/seasons/durations are hidden via hiddenSections above,
    // but TourCategoryPage still reads their `.items[0]` for initial state —
    // keep minimal placeholders so that never throws.
    regions: { title: `${name} By Destination`, items: [] },
    interests: { title: `${name} By Interest`, items: ["Family", "Group Tour"] },
    seasons: { title: `${name} By Season`, items: ["Summer", "Winter"] },
    durations: {
      title: `${name} By Duration`,
      items: ["Less than 5 days", "6 to 8 days", "9 to 14 days"],
      packages: resolvedPackages.slice(0, 4),
    },
    blogs: [],
    reviews: [
      {
        name: "Anita",
        tour: name,
        category: "Group Tour",
        review: `A wonderful and well-managed ${name.toLowerCase()} experience. Everything from hotels to sightseeing was planned perfectly.`,
      },
      {
        name: "Rakesh",
        tour: name,
        category: "Group Tour",
        review: `Our tour manager took great care of the group throughout the trip. Highly recommended for ${name.toLowerCase()}.`,
      },
      {
        name: "Sneha",
        tour: name,
        category: "Group Tour",
        review: "Excellent experience with great hotels, sightseeing and transportation.",
      },
    ],
    faqHeading: `${name} Frequently Asked Questions`,
    faqSubheading: `Answers to commonly asked questions about our ${name.toLowerCase()}.`,
    faqs: [
      {
        question: `What are ${name}?`,
        answer: `${name} are group holidays curated around a specific travel style, designed for comfort and a great overall experience.`,
      },
      {
        question: "What is included in the package price?",
        answer: "Inclusions vary by itinerary but generally include accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
      },
      {
        question: "Can I customize the itinerary?",
        answer: "Yes, our team can help tailor most itineraries to your preferences — get in touch to discuss customization options.",
      },
    ],
    seo: {
      heading: `Get to know more about ${name} before booking your package`,
      paragraphs: [
        `${name} bring together carefully planned itineraries, comfortable stays and experienced tour managers for a smooth and memorable travel experience.`,
      ],
      extraParagraphs: [
        `Explore the available ${name.toLowerCase()} above and choose a holiday that matches your travel plans.`,
        "Get in touch with our travel experts for a customized itinerary tailored to your preferences.",
      ],
    },
  };
}
