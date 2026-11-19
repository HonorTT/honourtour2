/* =========================================================
   HOME PAGE — TEXT & PHOTOS (defaults)
   Every heading, line of copy and fixed photo on the home
   page, editable in the admin under Home Page -> Text & Photos.

   These are the values the page shows when a field is left
   blank, and the values the admin record starts with. A blank
   field always falls back here, so clearing one can never
   leave a hole in the page.
========================================================= */

export const HOME_DEFAULTS = {
  // Google
  metaTitle: "Kashmir Tour Packages | Srinagar, Gulmarg, Pahalgam — Honor Tour & Travels",
  metaDescription:
    "Kashmir tour packages from Honor Tour & Travels — Srinagar houseboats, Gulmarg gondola, Pahalgam and Sonmarg, with stays, transport and sightseeing in one price. Ladakh, Himachal and more of India too.",

  // Hero
  heroBanner: "/uploads/destinations/banner2.png",
  heroEyebrow: "Explore · Experience · Discover",
  heroTitleStart: "Your",
  heroTitleHighlight: "Kashmir",
  heroTitleEnd: "Starts Here",
  heroSubtitle:
    "Srinagar, Gulmarg, Pahalgam and Sonmarg — planned by a team that lives here. Stays, transport and sightseeing in one price.",
  badge1Title: "Best Price",
  badge1Note: "Guarantee",
  badge2Title: "24/7",
  badge2Note: "Support",
  badge3Title: "Expert",
  badge3Note: "Tour Managers",
  badge4Title: "Safe &",
  badge4Note: "Trusted Travel",
  heroScriptLine: "Collect Moments",
  heroScriptNote: "Not things",
  polaroid1Label: "Kashmir",
  polaroid1Image: "/uploads/destinations/yasser-mir-Ctd--w6W-bw-unsplash.jpg",
  polaroid1Link: "",
  polaroid2Label: "Ladakh",
  polaroid2Image: "/uploads/destinations/darshan-chudasama-uWitPuPAzPA-unsplash.jpg",
  polaroid2Link: "",

  // Destination strip
  stripHeading: "Kashmir & beyond",
  stripSubtitle: "Srinagar, Gulmarg, Pahalgam and Sonmarg — plus the other India tours we run.",
  stripOffersLabel: "Package Offers",

  // Live tours band
  liveBadge: "Live right now",
  liveHeading: "27+ tours are on the road with Honor Tour & Travels",
  liveText: "Guests everywhere are travelling with ease and care — step into your journey.",
  liveButton: "Upcoming Departures",
  liveButtonNote: "in the next 15 days",

  // Kashmir promo band
  promoBadge: "Legacy of Excellence",
  promoHeading: "Paradise on Earth. Planned to the detail.",
  promoHighlights: "Paradise, Planned",
  promoSubtitle: "All-inclusive Kashmir tours, run by our own team in the valley",
  promoImage: "/uploads/destinations/arif-khan-4hr8MStXT7s-unsplash.jpg",
  promoImageBadge: "Trusted by 50,000+ Travelers",
  promoCardTitle: "Book Your Dream Tour",
  promoCardText: "365 days, 24*7 from your city!",
  promoCardButton: "Book Online",

  // Welcome slide (first slide of the promo carousel)
  welcomeTitle: "Honor Tour & Travels is Here!",
  welcomeSubtitle: "PAISA VASOOL Tours",
  welcomeBadge: "Now welcoming you at",
  welcomeTagline: "Chalo, Bag Bharo, Nikal Pado!",
  welcomeFooter: "India • Group Tours • Customized Holidays",

  // Most loved
  mostLovedHeading: "Most Loved by Our Guests",

  // Trust band
  trustHeading: "Trusted by Honor Tour & Travels guests across India",

  // Featured tour slider
  featuredButton: "Book now",
  featuredNote: "*T&C Apply",

  // Continue travel
  continueHeading: "Hey Guest, Continue your travel plan",
  continueSubtitle: "Pick up where you left off — these tours are still open for your dates.",

  // Departure cities
  citiesHeading: "Kashmir Tours, Starting From Your City",
  citiesHighlight: "Your City",
  citiesSubtitle:
    "Flights, stays, sightseeing and meals in one price — our Kashmir departures leave from these cities, along with the rest of our India tours. Pick yours below.",
  jlTitle: "Your City Not Listed? Choose our",
  jlTitleHighlight: "Joining & Leaving Option",
  jlText: "Book your own flights, we take care of the rest.",
  jlButton: "Request a callback",
  jlLine1: "Join the group directly at first destination &",
  jlLine2: "Leave the group at the last destination",
  jlLink: "What's included in J/L option? View Inclusions →",

  // Inclusions
  inclusionsBadge: "All inclusive",
  inclusionsHeading: "Everything is included, Chalo Bag Bharo Nikal Pado!",
  inclusionsSubtitle: "One price covers the whole trip — no surprise add-ons once you have booked.",

  // SEO text block
  seoHeading: "Kashmir tour packages with Honor Tour & Travels",
  seoText: [
    "Kashmir is what we do best. Our Kashmir tour packages cover Srinagar and its houseboats on Dal Lake, the meadows of Gulmarg, the pine valleys of Pahalgam and the glacier road to Sonmarg — with shikara rides, gondola tickets and local sightseeing already built into the price. Whether you want a short five-day Kashmir trip, a seven-day family itinerary or a longer Jammu Kashmir tour that starts at Katra, every departure is run by our own team on the ground.",
    "Beyond the valley we also run Leh Ladakh tours over Nubra Valley, Pangong Lake and Kargil, plus Kashmir departures made for specific groups — women's special tours with women tour managers, and seniors' special tours at an easier pace with fewer transfers. Honeymoon couples, families with young children and large group bookings are all handled as customised Kashmir itineraries.",
    "We continue to run selected India holidays — Himachal, Kerala and Rajasthan — for travellers who book with us year after year. But Kashmir remains our home ground, and it is where our pricing, our transport and our local contacts are strongest.",
  ].join("\n\n"),

  // FAQ
  faqHeading: "Frequently Asked Questions",
  faqSubtitle: "We help you prepare for your trip and answer commonly asked travel questions.",
  faqCategoriesLabel: "Have questions about",
  faqFooter: "We've got you covered.",
  faqButton: "View all FAQs",
};

/** The admin record over the defaults, ignoring blank fields. */
export function withHomeDefaults(record = {}) {
  const out = { ...HOME_DEFAULTS };
  for (const [key, value] of Object.entries(record ?? {})) {
    if (key in HOME_DEFAULTS && typeof value === "string" && value.trim() !== "") out[key] = value;
  }
  return out;
}

/**
 * "Paradise on Earth. Planned…" + "Paradise, Planned" ->
 * [{text:"Paradise", hi:0}, {text:" on Earth. "}, {text:"Planned", hi:1}, …]
 * so a component can colour the highlighted words without the admin typing markup.
 */
export function splitHighlights(text = "", highlights = "") {
  const words = String(highlights)
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  const parts = [];
  let rest = String(text);

  while (rest) {
    let best = null;
    words.forEach((word, index) => {
      const at = rest.indexOf(word);
      if (at !== -1 && (best === null || at < best.at)) best = { at, word, index };
    });
    if (!best) {
      parts.push({ text: rest });
      break;
    }
    if (best.at > 0) parts.push({ text: rest.slice(0, best.at) });
    parts.push({ text: best.word, hi: best.index });
    rest = rest.slice(best.at + best.word.length);
  }
  return parts;
}
