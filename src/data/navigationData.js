/* =========================================================
   NAVBAR MEGA MENU DATA (India + World)

   Structure is deliberately data-driven so IndiaMegaMenu /
   WorldMegaMenu stay generic renderers instead of hundreds
   of hardcoded JSX elements.

   Every leaf item resolves to /india/[slug] or /world/[slug],
   which is handled by the EXISTING dynamic destination route
   (src/app/india/[destination]/page.jsx and
   src/app/world/[destination]/page.jsx) via getDestination()
   in src/data/destinations.js. Curated slugs (already rich
   with real package data) are reused via `override`; every
   other slug resolves through the generic fallback resolver
   so nothing ever links to a 404.
========================================================= */

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function link(parent, name, override) {
  const slug = override || `${toSlug(name)}-tour-packages`;
  return { name, href: `/${parent}/${slug}` };
}

function column(parent, heading, children = [], overrides = {}) {
  return {
    heading: link(parent, heading, overrides[heading]),
    items: children.map((name) => link(parent, name, overrides[name])),
  };
}

/* =========================================================
   INDIA
========================================================= */

const indiaOverrides = {
  Rajasthan: "rajasthan-tour-packages",
  Kerala: "kerala-tour-packages",
  "Andaman and Nicobar": "andaman-tour-packages",
};

export const indiaNavigation = {
  recommended: [
    link("india", "Kashmir"),
    link("india", "Leh Ladakh"),
    link("india", "Kerala", indiaOverrides["Kerala"]),
    link("india", "Himachal", "himachal-pradesh-tour-packages"),
    link("india", "Rajasthan", indiaOverrides["Rajasthan"]),
    link("india", "Sikkim", "sikkim-tour-packages"),
    link("india", "Andaman and Nicobar", indiaOverrides["Andaman and Nicobar"]),
    link("india", "Goa"),
  ],
  regions: [
    {
      name: "North India",
      all: link("india", "North India"),
      columns: [
        column("india", "Delhi"),
        column("india", "Himachal Pradesh", [
          "Chandrataal", "Dalhousie", "Dharamshala", "Kaza", "Manali", "Shimla", "Spiti Valley",
        ]),
        column("india", "Kashmir", ["Gulmarg", "Pahalgam", "Sonmarg", "Srinagar"]),
        column("india", "Leh-Ladakh", ["Kargil", "Leh", "Nubra Valley", "Pangong Tso", "Turtuk"]),
        column("india", "Amritsar"),
        column("india", "Chandigarh"),
        column("india", "Punjab & Haryana", ["Kurukshetra", "Panipat"]),
        column("india", "Uttarakhand", [
          "Jim Corbett Park", "Haridwar", "Mussoorie", "Nainital", "Rishikesh", "Chardham Yatra",
        ]),
        column("india", "Uttar Pradesh", [
          "Agra", "Ayodhya", "Fatehpur Sikri", "Jhansi", "Lucknow", "Mathura", "Prayagraj", "Sarnath", "Varanasi", "Vrindavan",
        ]),
      ],
    },
    {
      name: "South India",
      all: link("india", "South India"),
      columns: [
        column("india", "Kerala", ["Munnar", "Alleppey", "Kochi", "Thekkady", "Kovalam", "Wayanad"]),
        column("india", "Karnataka", ["Bengaluru", "Mysore", "Coorg", "Hampi"]),
        column("india", "Tamil Nadu", ["Chennai", "Ooty", "Kodaikanal", "Madurai", "Rameswaram"]),
        column("india", "Andhra Pradesh / Telangana", ["Hyderabad", "Tirupati", "Visakhapatnam"]),
      ],
    },
    {
      name: "East & North East India",
      all: link("india", "East and North East India"),
      columns: [
        column("india", "Sikkim", ["Gangtok", "Pelling"]),
        column("india", "West Bengal", ["Kolkata", "Darjeeling", "Kalimpong"]),
        column("india", "Assam", ["Guwahati", "Kaziranga"]),
        column("india", "Meghalaya", ["Shillong", "Cherrapunji"]),
        column("india", "Arunachal Pradesh"),
        column("india", "Nagaland"),
        column("india", "Tripura"),
        column("india", "Mizoram"),
        column("india", "Manipur"),
      ],
    },
    {
      name: "Rajasthan, West & Central India",
      all: link("india", "Rajasthan West and Central India"),
      columns: [
        column("india", "Rajasthan", ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Mount Abu", "Pushkar", "Bikaner"], indiaOverrides),
        column("india", "Gujarat", ["Ahmedabad", "Dwarka", "Somnath", "Kutch"]),
        column("india", "Maharashtra", ["Mumbai", "Pune", "Lonavala", "Mahabaleshwar", "Nashik"]),
        column("india", "Madhya Pradesh", ["Indore", "Ujjain", "Khajuraho"]),
        column("india", "Goa"),
      ],
    },
  ],
};

/* =========================================================
   WORLD
========================================================= */

const worldOverrides = {
  Europe: "europe-tour-packages",
  "South East Asia": "south-east-asia-tour-packages",
  "Australia New Zealand": "australia-new-zealand-tour-packages",
  "Australia & New Zealand": "australia-new-zealand-tour-packages",
  America: "america-tour-packages",
  Africa: "africa-tour-packages",
  "Japan China Korea Taiwan": "japan-china-korea-tour-packages",
  "Japan China Korea": "japan-china-korea-tour-packages",
};

export const worldNavigation = {
  recommended: [
    link("world", "Europe", worldOverrides["Europe"]),
    link("world", "South East Asia", worldOverrides["South East Asia"]),
    link("world", "Australia New Zealand", worldOverrides["Australia New Zealand"]),
    link("world", "America", worldOverrides["America"]),
    link("world", "Africa", worldOverrides["Africa"]),
    link("world", "Japan China Korea Taiwan", worldOverrides["Japan China Korea Taiwan"]),
  ],
  regions: [
    {
      name: "Africa",
      all: link("world", "Africa", worldOverrides["Africa"]),
      columns: [
        column("world", "Egypt", ["Alexandria", "Aswan", "Cairo", "Hurghada", "Luxor", "Nile Cruise"]),
        column("world", "Kenya", ["Masai Mara"]),
        column("world", "Mauritius", ["Port Louis"]),
        column("world", "Seychelles"),
        column("world", "South Africa", [
          "Cape Town", "George", "Johannesburg", "Knysna", "Mossel Bay", "Oudtshoorn",
          "Pilanesberg National Park", "Port Elizabeth (Gqeberha)", "Stellenbosch", "Sun City",
        ]),
        column("world", "Tanzania"),
        column("world", "Zimbabwe", ["Victoria Falls"]),
      ],
    },
    {
      name: "America",
      all: link("world", "America", worldOverrides["America"]),
      columns: [
        column("world", "USA", ["New York", "Las Vegas", "Los Angeles", "San Francisco", "Orlando"]),
        column("world", "Canada", ["Toronto", "Vancouver", "Niagara Falls"]),
        column("world", "South America", ["Brazil", "Argentina", "Peru"]),
      ],
    },
    {
      name: "Asia",
      all: link("world", "Asia"),
      columns: [
        column("world", "Japan", ["Tokyo", "Osaka", "Kyoto"]),
        column("world", "China", ["Beijing", "Shanghai"]),
        column("world", "South Korea", ["Seoul"]),
        column("world", "Thailand", ["Bangkok", "Phuket", "Pattaya"]),
        column("world", "Singapore"),
        column("world", "Malaysia", ["Kuala Lumpur", "Langkawi"]),
        column("world", "Indonesia", ["Bali"]),
        column("world", "Vietnam", ["Hanoi", "Ho Chi Minh City"]),
      ],
    },
    {
      name: "Australia & New Zealand",
      all: link("world", "Australia & New Zealand", worldOverrides["Australia & New Zealand"]),
      columns: [
        column("world", "Australia", ["Sydney", "Melbourne", "Gold Coast", "Cairns", "Brisbane"]),
        column("world", "New Zealand", ["Auckland", "Queenstown", "Rotorua", "Christchurch"]),
      ],
    },
    {
      name: "Europe",
      all: link("world", "Europe", worldOverrides["Europe"]),
      columns: [
        column("world", "France", ["Paris"]),
        column("world", "Italy", ["Rome", "Venice", "Florence"]),
        column("world", "Switzerland", ["Zurich", "Lucerne", "Interlaken"]),
        column("world", "United Kingdom", ["London"]),
        column("world", "Spain", ["Barcelona", "Madrid"]),
        column("world", "Germany", ["Munich"]),
        column("world", "Austria", ["Vienna"]),
        column("world", "Greece", ["Athens", "Santorini"]),
        column("world", "Netherlands", ["Amsterdam"]),
      ],
    },
    {
      name: "Middle East",
      all: link("world", "Middle East"),
      columns: [
        column("world", "UAE", ["Dubai", "Abu Dhabi"]),
        column("world", "Oman", ["Muscat"]),
        column("world", "Qatar", ["Doha"]),
        column("world", "Turkey", ["Istanbul", "Cappadocia"]),
        column("world", "Jordan"),
      ],
    },
    {
      name: "Antarctica",
      all: link("world", "Antarctica"),
      columns: [
        column("world", "Antarctica", ["Antarctica Cruise", "Antarctic Peninsula"]),
      ],
    },
  ],
};

/* =========================================================
   SIBLING LOOKUPS

   Given any destination name from the mega menu (a country
   heading like "Egypt", or a city/place item like "Aswan"),
   find the real column it belongs to so the destination
   listing page's filter sidebar can show the ACTUAL cities
   that belong to that same country/state, and the actual
   countries/states that belong to the same region — instead
   of a generic, unrelated filter list.
========================================================= */

function allColumnsWithRegion(nav) {
  const rows = [];
  nav.regions.forEach((region) => {
    region.columns.forEach((col) => {
      rows.push({ region, col });
    });
  });
  return rows;
}

function findColumnFor(nav, name) {
  const lower = name.toLowerCase();
  return allColumnsWithRegion(nav).find(
    ({ col }) =>
      col.heading.name.toLowerCase() === lower ||
      col.items.some((item) => item.name.toLowerCase() === lower)
  );
}

export function getSiblingCityNames(navigationParent, name) {
  const nav = navigationParent === "india" ? indiaNavigation : worldNavigation;
  const match = findColumnFor(nav, name);
  if (!match) return [];
  return match.col.items.map((item) => item.name);
}

export function getSiblingRegionNames(navigationParent, name) {
  const nav = navigationParent === "india" ? indiaNavigation : worldNavigation;
  const match = findColumnFor(nav, name);
  if (!match) return [];
  return match.region.columns.map((col) => col.heading.name);
}

/**
 * The column heading a place sits under, so a page for a valley with no tours
 * of its own can show its state's tours (Gulmarg -> Kashmir).
 *
 * It stops there. A region only groups neighbours in the menu: Goa is not part
 * of Rajasthan, yet "Rajasthan, West & Central India" matched every Rajasthan
 * tour, so Goa's page was full of them. No tours is the honest answer there.
 */
export function getParentNamesFor(navigationParent, name) {
  const nav = navigationParent === "india" ? indiaNavigation : worldNavigation;
  const match = findColumnFor(nav, name);
  if (!match) return [];

  const heading = match.col.heading.name;

  return heading.toLowerCase() === name.toLowerCase() ? [] : [heading];
}
