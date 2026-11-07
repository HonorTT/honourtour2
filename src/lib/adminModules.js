/* =========================================================
   ADMIN MODULE REGISTRY
   One entry per content type. Drives the sidebar, the generic
   list/add/edit pages at src/app/admin/[module]/*, and the
   generic server actions in src/app/admin/[module]/actions.js.
   Field "type" controls which input AdminForm renders:
     text | textarea | number | boolean | select | image |
     string-list (repeatable plain-text rows) |
     json (freeform JSON textarea, for nested arrays/objects)
========================================================= */

export const adminModules = {
  bookings: {
    label: "Package Bookings",
    group: "Bookings",
    model: "booking",
    titleField: "packageTitle",
    revalidate: [],
    listColumns: ["packageTitle", "customerName", "customerPhone", "departureDate", "guests", "totalPrice", "status"],
    fields: [
      { name: "packageSlug", label: "Package slug", type: "text", required: true },
      { name: "packageTitle", label: "Package title", type: "text", required: true },
      { name: "departureCity", label: "Departure city", type: "text", required: true },
      { name: "departureDate", label: "Departure date", type: "text", required: true },
      { name: "guests", label: "Guests", type: "number", required: true },
      { name: "totalPrice", label: "Total price (INR)", type: "number", required: true },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerPhone", label: "Customer phone", type: "text", required: true },
      { name: "customerEmail", label: "Customer email", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Confirmed", "Cancelled"], required: true },
    ],
  },

  enquiries: {
    label: "Enquiries",
    group: "Bookings",
    model: "enquiry",
    titleField: "name",
    revalidate: [],
    listColumns: ["name", "phone", "email", "subject", "guests", "nights", "estimate", "status"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "email", label: "Email", type: "text" },
      { name: "subject", label: "Enquiry about", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "source", label: "Page", type: "text" },
      { name: "guests", label: "Guests", type: "number" },
      { name: "nights", label: "Nights", type: "number" },
      { name: "estimate", label: "Indicative total (INR)", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["New", "Review", "Contacted", "Confirmed", "Cancelled"], required: true },
    ],
  },

  "hotel-bookings": {
    label: "Hotel Bookings",
    group: "Bookings",
    model: "hotelBooking",
    titleField: "hotelName",
    revalidate: [],
    listColumns: ["hotelName", "roomType", "customerName", "customerPhone", "checkIn", "checkOut", "status"],
    fields: [
      { name: "hotelName", label: "Hotel", type: "text", required: true },
      { name: "roomType", label: "Room type", type: "text", required: true },
      { name: "pricePerNight", label: "Price per night (INR)", type: "number" },
      { name: "checkIn", label: "Check-in", type: "text" },
      { name: "checkOut", label: "Check-out", type: "text" },
      { name: "guests", label: "Guests", type: "number" },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerPhone", label: "Customer phone", type: "text", required: true },
      { name: "customerEmail", label: "Customer email", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Confirmed", "Cancelled"], required: true },
    ],
  },

  "flight-bookings": {
    label: "Flight Bookings",
    group: "Bookings",
    model: "flightBooking",
    titleField: "airline",
    revalidate: [],
    listColumns: ["airline", "flightNumber", "from", "to", "customerName", "customerPhone", "status"],
    fields: [
      { name: "airline", label: "Airline", type: "text", required: true },
      { name: "flightNumber", label: "Flight number", type: "text" },
      { name: "from", label: "From", type: "text" },
      { name: "to", label: "To", type: "text" },
      { name: "departureTime", label: "Departure time", type: "text" },
      { name: "arrivalTime", label: "Arrival time", type: "text" },
      { name: "price", label: "Fare per person (INR)", type: "number" },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerPhone", label: "Customer phone", type: "text", required: true },
      { name: "customerEmail", label: "Customer email", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Confirmed", "Cancelled"], required: true },
    ],
  },

  "transport-bookings": {
    label: "Transport Bookings",
    group: "Bookings",
    model: "transportBooking",
    titleField: "vehicleName",
    revalidate: [],
    listColumns: ["vehicleName", "pickupCity", "dropCity", "days", "totalPrice", "customerName", "status"],
    fields: [
      { name: "vehicleName", label: "Vehicle", type: "text", required: true },
      { name: "vehicleType", label: "Type", type: "select", options: ["Car", "Bus"] },
      { name: "pickupCity", label: "Pickup city", type: "text" },
      { name: "dropCity", label: "Drop city", type: "text" },
      { name: "days", label: "Days", type: "number" },
      { name: "totalPrice", label: "Total price (INR)", type: "number" },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerPhone", label: "Customer phone", type: "text", required: true },
      { name: "customerEmail", label: "Customer email", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Confirmed", "Cancelled"], required: true },
    ],
  },

  packages: {
    label: "Packages",
    group: "Catalog",
    model: "package",
    titleField: "title",
    revalidate: ["/", "/package", "/india"],
    listColumns: ["title", "slug", "category", "price"],

    // A richer list for the catalogue: thumbnail, title with its duration,
    // location, price and status — grouped so one city's tours sit together.
    list: {
      numbered: true,
      image: "imageUrl",
      title: { key: "title", meta: ["tourType", "duration"] },
      columns: [
        { key: "location", label: "Location" },
        { key: "price", label: "Price", type: "money", note: "emi", noteSuffix: "/month EMI" },
        { key: "status", label: "Status", type: "badge" },
      ],
      // India tours first, then grouped by city.
      sortBy: ["region", "location", "title"],
    },

    // Grouped editor: the long catalogue form reads as sections with the
    // commercial settings pinned beside it. Anything not listed here still
    // renders, under "More settings".
    form: {
      layout: "columns",
      previewPath: "/package/{slug}",
      subtitle: "Edit your tour package details, itinerary, pricing and media.",
      statusField: "status",

      // Three cards across the top, mirroring how the work actually splits:
      // what the tour is, what it costs, and how it is presented.
      columns: [
        {
          title: "Basic Information",
          icon: "info",
          fields: [
            "title",
            "slug",
            "location",
            "state",
            "country",
            "category",
            "tourType",
            "relatedGroup",
            "description",
            "imageUrl",
            "imageAlt",
            "imageTitle",
          ],
          pairs: [
            ["state", "country"],
            ["category", "tourType"],
          ],
        },
        {
          title: "Pricing & Settings",
          icon: "pricing",
          fields: ["price", "emi", "days", "nights", "cities", "status", "order", "rating", "reviews", "highlights"],
          pairs: [["days", "nights"], ["cities", "status"], ["rating", "reviews"]],
        },
        {
          title: "SEO & Search",
          icon: "seo",
          fields: ["metaTitle", "metaDescription", "metaKeywords", "canonicalUrl", "noIndex"],
          preview: "seo",
        },
      ],

      full: [
        { title: "Gallery Photos", icon: "media", fields: ["gallery"] },
        { title: "Day-wise Itinerary", icon: "itinerary", fields: ["itinerary"] },
        { title: "Departure Cities", icon: "calendar", fields: ["departureCities"] },
        { title: "Inclusions & Exclusions", icon: "list", fields: ["inclusions", "exclusions"] },
        { title: "Frequently Asked Questions", icon: "faq", fields: ["faqs"] },
        {
          title: "Accommodation",
          icon: "hotel",
          fields: ["accommodation"],
        },
        {
          title: "Payment Terms",
          icon: "pricing",
          fields: ["paymentTerms"],
        },
        {
          title: "Traveller Information",
          icon: "info",
          fields: ["needToKnow", "tourDetails", "cancellationPolicy", "upgrades"],
        },
      ],
    },
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Hidden"],
        required: true,
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        allowCustom: true,
        // Trip types only — these drive the /speciality-tours pages. World
        // grouping comes from the package's country, not its category.
        options: [
          "Adventure",
          "Family",
          "General",
          "Group",
          "Honeymoon Special",
          "Luxury",
          "Religious",
          "Seniors' Special",
          "Short Trips",
          "Solo",
          "Women's Special",
        ],
      },
      {
        name: "tourType",
        label: "Tour Type",
        type: "select",
        required: true,
        allowCustom: true,
        options: ["Group Tour", "Customized Holiday", "Private Tour"],
      },
      { name: "days", label: "Days", type: "number", required: true },
      { name: "nights", label: "Nights", type: "number", required: true },
      { name: "cities", label: "Cities count", type: "number", required: true },
      { name: "price", label: "Price (INR)", type: "number", required: true },
      { name: "emi", label: "EMI (INR/month)", type: "number", required: true },
      {
        name: "order",
        label: "Display order",
        type: "number",
        help: "Lower shows first, so 0 (or blank) pins a package to the top of every listing. Numbers can be reused — ties keep their current order.",
      },
      { name: "rating", label: "Rating", type: "number", step: "0.1" },
      { name: "reviews", label: "Reviews count", type: "number" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "imageUrl", label: "Cover image", type: "image" },
      {
        name: "imageAlt",
        label: "Cover image — alt text",
        type: "text",
        help: "What the photo shows, for Google and for screen readers. Leave blank and the package title is used.",
      },
      { name: "imageTitle", label: "Cover image — title", type: "text" },
      {
        name: "gallery",
        label: "Gallery photos",
        type: "images",
        max: 4,
        help: "Up to 4 photos, shown beside the cover image on the package page. Leave empty and the site picks matching destination photos.",
      },
      { name: "country", label: "Country (World packages)", type: "text" },
      { name: "state", label: "State (India packages)", type: "text" },
      { name: "relatedGroup", label: "Related group key", type: "text" },
      {
        name: "metaTitle",
        label: "Meta title",
        type: "text",
        // Prefilled with the text the page is serving right now, so the box
        // shows real, editable content instead of a placeholder that vanishes
        // the moment you type.
        prefill: true,
        placeholderTemplate: "{title} Tour Package — {days}D/{nights}N from ₹{price}",
        help: "Google shows roughly the first 60 characters.",
      },
      {
        name: "metaDescription",
        label: "Meta description",
        type: "textarea",
        prefill: true,
        placeholderTemplate: "{description}",
        help: "Aim for 140–160 characters.",
      },
      {
        name: "metaKeywords",
        label: "Keywords",
        type: "string-list",
        help: "One phrase per line, e.g. “Kashmir honeymoon package”. Added to the site-wide keyword list.",
      },
      {
        name: "canonicalUrl",
        label: "Canonical URL (optional)",
        type: "text",
        placeholder: "Leave blank to use this page's own URL",
      },
      { name: "noIndex", label: "Hide this page from Google (noindex)", type: "boolean" },
      { name: "departureCities", label: "Departure cities", type: "string-list" },
      { name: "highlights", label: "Highlights", type: "string-list", required: true },
      { name: "inclusions", label: "Inclusions", type: "string-list", required: true },
      { name: "exclusions", label: "Exclusions", type: "string-list" },
      {
        name: "itinerary",
        label: "Itinerary",
        type: "rows",
        required: true,
        addLabel: "Add day",
        columns: [
          { name: "day", label: "Day", type: "number", placeholder: "1" },
          { name: "title", label: "Title", type: "text", placeholder: "Delhi – Arrival" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        name: "faqs",
        label: "FAQs",
        type: "rows",
        addLabel: "Add question",
        help: "Shown on the package page and sent to Google as FAQ rich-result data. Leave empty to use the standard questions.",
        columns: [
          { name: "question", label: "Question", type: "text", placeholder: "What is the best time to visit?" },
          { name: "answer", label: "Answer", type: "textarea", full: true },
        ],
      },
      {
        name: "needToKnow",
        label: "Need to know",
        type: "object",
        columns: [
          { name: "weather", label: "Weather", type: "textarea" },
          { name: "transport", label: "Transport", type: "textarea" },
          { name: "documents", label: "Documents required (one per line)", type: "list" },
          { name: "tourManager", label: "Tour manager", type: "textarea" },
        ],
      },
      {
        name: "cancellationPolicy",
        label: "Cancellation policy",
        type: "rows",
        addLabel: "Add slab",
        columns: [
          { name: "period", label: "Period", type: "text", placeholder: "30 - 44 days before departure" },
          { name: "charge", label: "Charge", type: "text", placeholder: "25% of tour cost" },
        ],
      },
      {
        name: "paymentTerms",
        label: "Payment terms",
        type: "string-list",
        help: "One term per line. The first one is shown in bold on the package page.",
      },
      {
        name: "accommodation",
        label: "Hotels by city",
        type: "rows",
        addLabel: "Add city",
        help: "One row per city on the tour. Filled from the package location until you change it.",
        columns: [
          { name: "city", label: "City", type: "text", placeholder: "Srinagar" },
          { name: "hotel", label: "Hotel", type: "text", placeholder: "Comfortable selected hotel" },
          { name: "stay", label: "Check-in / Check-out", type: "text", placeholder: "As per itinerary" },
        ],
      },
      {
        name: "upgrades",
        label: "Upgrades",
        type: "rows",
        addLabel: "Add upgrade",
        columns: [
          { name: "title", label: "Title", type: "text", placeholder: "Flight Upgrade" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        name: "tourDetails",
        label: "Tour details",
        type: "object",
        columns: [
          { name: "flight", label: "Flight", type: "textarea" },
          { name: "accommodation", label: "Accommodation", type: "textarea" },
          { name: "reporting", label: "Reporting", type: "textarea" },
        ],
      },
    ],
  },

  destinations: {
    label: "Destinations",
    group: "Catalog",
    model: "destination",
    titleField: "name",
    revalidate: ["/india"],
    listColumns: ["name", "parent", "slug", "liveTourCount"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "parent", label: "Parent section", type: "select", options: ["india", "world"], required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "metaTitle", label: "Meta title", type: "text", required: true },
      { name: "metaDescription", label: "Meta description", type: "textarea", required: true },
      { name: "breadcrumbTrail", label: "Breadcrumb trail", type: "string-list", required: true },
      { name: "liveTourCount", label: "Live tour count", type: "number" },
      { name: "reviewsLabel", label: "Reviews label", type: "text" },
      { name: "intro", label: "Intro", type: "textarea", required: true },
      { name: "introExtra", label: "Intro (extra)", type: "textarea" },
      { name: "countries", label: "Countries", type: "string-list" },
      { name: "cities", label: "Cities", type: "string-list" },
      {
        name: "packageSlugs",
        label: "Package slugs (leave empty to list this destination's own tours automatically)",
        type: "string-list",
      },
      { name: "joiningLeavingCities", label: "Joining/leaving cities", type: "string-list" },
      {
        name: "related",
        label: "Related block",
        type: "object",
        columns: [
          { name: "title", label: "Title", type: "text" },
          { name: "note", label: "Note", type: "textarea" },
          { name: "items", label: "Items", type: "records", keys: ["name"], placeholder: "One name per line" },
        ],
      },
      {
        name: "regions",
        label: "Regions block",
        type: "object",
        columns: [
          { name: "title", label: "Title", type: "text" },
          {
            name: "items",
            label: "Regions",
            type: "records",
            keys: ["name", "count"],
            rows: 5,
            placeholder: "Western Europe | 38 tours",
          },
        ],
      },
      { name: "faqHeading", label: "FAQ heading", type: "text" },
      { name: "faqSubheading", label: "FAQ subheading", type: "text" },
      {
        name: "faqs",
        label: "FAQs",
        type: "rows",
        addLabel: "Add FAQ",
        columns: [
          { name: "question", label: "Question", type: "text", full: true },
          { name: "answer", label: "Answer", type: "textarea" },
        ],
      },
      { name: "seoParagraphs", label: "SEO paragraphs", type: "string-list" },
      { name: "seoExtraParagraphs", label: "SEO paragraphs (extra)", type: "string-list" },
    ],
  },

  "departure-cities": {
    label: "Departure Cities",
    group: "Catalog",
    model: "departureCity",
    titleField: "name",
    revalidate: ["/", "/tour-packages-from"],
    listColumns: ["name", "slug", "departures", "startingPrice"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "name", label: "City name", type: "text", required: true },
      { name: "departures", label: "Departures", type: "number", required: true },
      { name: "startingPrice", label: "Starting price (INR)", type: "number", required: true },
      { name: "reviewsLabel", label: "Reviews label", type: "text" },
      { name: "intro", label: "Intro", type: "textarea", required: true },
      { name: "introExtra", label: "Intro (extra)", type: "textarea" },
      {
        name: "packageSlugs",
        label: "Package slugs (leave empty to list this destination's own tours automatically)",
        type: "string-list",
      },
      {
        name: "linkCloudTargets",
        label: "Link cloud targets",
        type: "rows",
        addLabel: "Add link",
        columns: [
          { name: "name", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text", placeholder: "/india/kashmir" },
        ],
      },
    ],
  },

  "flight-routes": {
    label: "Flight Routes",
    group: "Flights",
    model: "flightRoute",
    titleField: "slug",
    revalidate: ["/flights"],
    listColumns: ["from", "to", "slug", "minPrice", "maxPrice"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "from", label: "From city", type: "text", required: true },
      { name: "fromCode", label: "From airport code", type: "text", required: true },
      { name: "to", label: "To city", type: "text", required: true },
      { name: "toCode", label: "To airport code", type: "text", required: true },
      { name: "baseDuration", label: "Base duration (minutes)", type: "number", required: true },
      { name: "minPrice", label: "Min price (INR)", type: "number", required: true },
      { name: "maxPrice", label: "Max price (INR)", type: "number", required: true },
      { name: "count", label: "Flight count", type: "number", required: true },
      { name: "allowStops", label: "Allow connecting flights", type: "boolean" },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "relatedTours",
        label: "Related tours",
        type: "rows",
        addLabel: "Add tour",
        columns: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text", placeholder: "/package/best-of-kashmir" },
        ],
      },
      { name: "otherRoutes", label: "Other route slugs", type: "string-list" },
    ],
  },

  airports: {
    label: "Airports",
    group: "Flights",
    model: "airport",
    titleField: "city",
    revalidate: ["/flights"],
    listColumns: ["city", "code", "country"],
    fields: [
      { name: "city", label: "City", type: "text", required: true },
      { name: "code", label: "Airport code", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
    ],
  },

  airlines: {
    label: "Airlines",
    group: "Flights",
    model: "airline",
    titleField: "name",
    revalidate: ["/flights"],
    listColumns: ["name", "code", "color"],
    fields: [
      { name: "name", label: "Airline name (must match flight data exactly)", type: "text", required: true },
      { name: "code", label: "Carrier code (e.g. 6E)", type: "text", required: true },
      { name: "logoUrl", label: "Logo image", type: "image" },
      { name: "color", label: "Fallback badge color (hex, used if no logo)", type: "text", required: true },
    ],
  },

  transport: {
    label: "Transport Options",
    group: "Transport",
    model: "transportOption",
    titleField: "name",
    revalidate: ["/transport"],
    listColumns: ["type", "name", "capacity", "basePrice"],
    fields: [
      { name: "type", label: "Type", type: "select", options: ["Car", "Bus"], required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "image", label: "Image (optional)", type: "image" },
      { name: "capacity", label: "Seating capacity", type: "number", required: true },
      { name: "acType", label: "AC / Non-AC", type: "select", options: ["AC", "Non-AC"], required: true },
      { name: "pricePerKm", label: "Price per km (INR)", type: "number", required: true },
      { name: "basePrice", label: "Base price (INR)", type: "number", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "features", label: "Features", type: "string-list", required: true },
    ],
  },

  "transport-routes": {
    label: "Transport Routes",
    group: "Transport",
    model: "transportRoute",
    titleField: "slug",
    revalidate: ["/transport"],
    listColumns: ["from", "to", "slug", "distanceKm"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "from", label: "From city", type: "text", required: true },
      { name: "to", label: "To city", type: "text", required: true },
      { name: "distanceKm", label: "Distance (km)", type: "number", required: true },
      { name: "duration", label: "Typical duration label", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },

  hotels: {
    label: "Hotels",
    group: "Hotels",
    model: "hotel",
    titleField: "name",
    revalidate: ["/hotels"],
    listColumns: ["name", "city", "starRating", "pricePerNight"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "name", label: "Hotel name", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "citySlug", label: "City slug (used in URL)", type: "text", required: true },
      { name: "starRating", label: "Star rating (1-5)", type: "number", required: true },
      { name: "rating", label: "Guest rating (e.g. 4.5)", type: "number", step: "0.1" },
      { name: "reviewCount", label: "Review count", type: "number" },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "image", label: "Image", type: "image" },
      { name: "pricePerNight", label: "Starting price per night (INR)", type: "number", required: true },
      { name: "amenities", label: "Amenities", type: "string-list", required: true },
      {
        name: "rooms",
        label: "Rooms",
        type: "rows",
        required: true,
        addLabel: "Add room",
        columns: [
          { name: "type", label: "Room type", type: "text", placeholder: "Deluxe Room" },
          { name: "capacity", label: "Capacity", type: "number", placeholder: "2" },
          { name: "price", label: "Price per night (INR)", type: "number", placeholder: "4500" },
          { name: "amenities", label: "Amenities (one per line)", type: "list" },
          { name: "image", label: "Image path", type: "text", placeholder: "/uploads/destinations/room.jpg" },
        ],
      },
      { name: "checkInTime", label: "Check-in time", type: "text" },
      { name: "checkOutTime", label: "Check-out time", type: "text" },
      { name: "nearbyAttractions", label: "Nearby attractions", type: "string-list" },
    ],
  },

  "india-zones": {
    label: "Zone Cards",
    group: "India Page",
    model: "indiaZoneCard",
    titleField: "name",
    revalidate: ["/india"],
    listColumns: ["region", "name", "tours"],
    fields: [
      { name: "region", label: "Region", type: "select", options: ["North", "South", "West & Central", "East & North East"], required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tours", label: "Tours label", type: "text", required: true },
      { name: "visual", label: "Gradient classes (fallback if no image)", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },

  "india-explore-tiles": {
    label: "Explore Tiles",
    group: "India Page",
    model: "indiaExploreTile",
    titleField: "name",
    revalidate: ["/india"],
    listColumns: ["group", "name", "tours"],
    fields: [
      { name: "group", label: "Group (city / state / a season name)", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tours", label: "Tours label", type: "text", required: true },
      { name: "visual", label: "Gradient classes (fallback if no image)", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },

  "india-explore-interest": {
    label: "Explore by Interest",
    group: "India Page",
    model: "indiaExploreInterest",
    titleField: "title",
    revalidate: ["/india"],
    listColumns: ["title", "tag", "price"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "isDestinationLink", label: "Links to a destination page", type: "boolean" },
      { name: "tag", label: "Tag", type: "text", required: true },
      { name: "days", label: "Days label", type: "text", required: true },
      { name: "cities", label: "Cities label", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
      { name: "emi", label: "EMI label", type: "text", required: true },
    ],
  },

  "india-explore-duration": {
    label: "Explore by Duration",
    group: "India Page",
    model: "indiaExploreDuration",
    titleField: "title",
    revalidate: ["/india"],
    listColumns: ["title", "category", "days", "price"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "days", label: "Days", type: "number", required: true },
      { name: "cities", label: "Cities", type: "number", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
    ],
  },

  "india-blogs": {
    label: "Blog Tiles",
    group: "India Page",
    model: "indiaBlog",
    titleField: "title",
    revalidate: ["/india"],
    listColumns: ["title"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "style", label: "Gradient classes", type: "text", required: true },
    ],
  },

  "india-reviews": {
    label: "Reviews",
    group: "India Page",
    model: "indiaReview",
    titleField: "name",
    revalidate: ["/india"],
    listColumns: ["name", "tour", "category"],
    fields: [
      { name: "name", label: "Guest name", type: "text", required: true },
      { name: "tour", label: "Tour", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "review", label: "Review", type: "textarea", required: true },
      { name: "manager", label: "Tour manager", type: "text", required: true },
    ],
  },

  "india-faqs": {
    label: "FAQs",
    group: "India Page",
    model: "indiaFaq",
    titleField: "question",
    revalidate: ["/india"],
    listColumns: ["question"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
    ],
  },

  "home-hero": {
    label: "Hero Cards",
    group: "Home Page",
    model: "heroCard",
    titleField: "title",
    revalidate: ["/"],
    listColumns: ["title", "subtitle"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text", required: true },
    ],
  },

  "home-destinations": {
    label: "Destination Strip",
    group: "Home Page",
    model: "homeDestination",
    titleField: "name",
    revalidate: ["/"],
    listColumns: ["name", "tourCount", "icon"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tourCount", label: "Tour count label", type: "text", required: true },
      { name: "tagline", label: "Tagline (shown under the hero city cards)", type: "text" },
      { name: "href", label: "Custom link (optional — e.g. /package/best-of-kashmir)", type: "text" },
      { name: "icon", label: "Icon (lucide-react name)", type: "text", required: true },
    ],
  },

  "home-live-tours": {
    label: "Live Tours",
    group: "Home Page",
    model: "liveTourCard",
    titleField: "destination",
    revalidate: ["/"],
    listColumns: ["destination", "liveTourCount"],
    fields: [
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "liveTourCount", label: "Live tour count", type: "text", required: true },
      { name: "color1", label: "Gradient color 1", type: "text", required: true },
      { name: "color2", label: "Gradient color 2", type: "text", required: true },
      { name: "color3", label: "Gradient color 3", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },

  "home-china-promo": {
    label: "Kashmir Promo Band",
    group: "Home Page",
    model: "chinaPromoPackage",
    titleField: "name",
    revalidate: ["/"],
    listColumns: ["name", "days", "price"],
    fields: [
      { name: "days", label: "Days label", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
      { name: "slug", label: "Package slug", type: "text", required: true },
    ],
  },

  "home-most-loved-promo": {
    label: "Most Loved — Promo Strip",
    group: "Home Page",
    model: "mostLovedPromoDestination",
    titleField: "name",
    revalidate: ["/"],
    listColumns: ["name", "days", "price"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "days", label: "Days label", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
    ],
  },

  "home-most-loved": {
    label: "Most Loved Destinations",
    group: "Home Page",
    model: "mostLovedDestination",
    titleField: "name",
    revalidate: ["/"],
    listColumns: ["name", "price", "guests"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
      { name: "guests", label: "Guests label", type: "text", required: true },
      { name: "slug", label: "Package slug", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },

  "home-trust-stats": {
    label: "Trust Stats",
    group: "Home Page",
    model: "trustStat",
    titleField: "label",
    revalidate: ["/"],
    listColumns: ["value", "label", "icon"],
    fields: [
      { name: "value", label: "Value", type: "text", required: true },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "icon", label: "Icon (lucide-react name)", type: "text", required: true },
    ],
  },

  "home-trust-reviews": {
    label: "Trust Reviews",
    group: "Home Page",
    model: "trustReview",
    titleField: "destination",
    revalidate: ["/"],
    listColumns: ["destination", "type", "guest"],
    fields: [
      { name: "type", label: "Type", type: "text", required: true },
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "guest", label: "Guest name", type: "text", required: true },
      { name: "date", label: "Date label", type: "text", required: true },
    ],
  },

  "home-featured-tour": {
    label: "Featured Tour Slides",
    group: "Home Page",
    model: "featuredTourSlide",
    titleField: "title",
    revalidate: ["/"],
    listColumns: ["title", "region", "price"],
    fields: [
      { name: "region", label: "Region", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "locations", label: "Locations", type: "text", required: true },
      { name: "days", label: "Days label", type: "text", required: true },
      { name: "date", label: "Date label", type: "text", required: true },
      { name: "departure", label: "Departure label", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },

  "home-continue-travel": {
    label: "Continue Travel",
    group: "Home Page",
    model: "continueTravelTour",
    titleField: "name",
    revalidate: ["/"],
    listColumns: ["name", "duration", "price"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "duration", label: "Duration label", type: "text", required: true },
      { name: "price", label: "Price label", type: "text", required: true },
      { name: "cta", label: "CTA label", type: "text", required: true },
      { name: "slug", label: "Package slug", type: "text", required: true },
    ],
  },

  "home-inclusions": {
    label: "Tour Inclusions",
    group: "Home Page",
    model: "tourInclusionFeature",
    titleField: "title",
    revalidate: ["/"],
    listColumns: ["title", "icon"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon (lucide-react name)", type: "text", required: true },
    ],
  },

  "home-faq": {
    label: "FAQ",
    group: "Home Page",
    model: "faqItem",
    titleField: "question",
    revalidate: ["/"],
    listColumns: ["question", "category"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text" },
    ],
  },

  "home-promo-slides": {
    label: "Promo Carousel Slides",
    group: "Home Page",
    model: "promoSlide",
    titleField: "title",
    revalidate: ["/"],
    listColumns: ["type", "title"],
    fields: [
      { name: "type", label: "Type", type: "select", options: ["welcome", "poster"], required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "ctaLabel", label: "CTA label", type: "text" },
      { name: "price", label: "Price label", type: "text" },
      { name: "gradientFrom", label: "Gradient — from color (hex)", type: "text" },
      { name: "gradientVia", label: "Gradient — via color (hex)", type: "text" },
      { name: "gradientTo", label: "Gradient — to color (hex)", type: "text" },
    ],
  },
};

export const adminModuleGroups = ["Bookings", "Catalog", "Home Page", "India Page", "Flights", "Transport", "Hotels"];

export function getModule(slug) {
  return adminModules[slug] ?? null;
}

/**
 * The projection an index page needs — everything AdminTable draws, searches
 * or sorts by, and nothing else. Without it the list hands the browser whole
 * records: itineraries, FAQs, SEO paragraphs, all of it, for every row.
 */
export function listFields(moduleConfig) {
  const keys = new Set(["id"]);
  const list = moduleConfig.list;

  if (list) {
    keys.add(list.title.key);
    if (list.image) keys.add(list.image);

    for (const key of list.title.meta ?? []) {
      // "duration" is drawn from days and nights rather than stored.
      if (key === "duration") {
        keys.add("days");
        keys.add("nights");
      } else {
        keys.add(key);
      }
    }

    for (const column of list.columns) {
      keys.add(column.key);
      if (column.note) keys.add(column.note);
    }

    // The search box also matches on the slug, the thumbnail falls back to a
    // destination photo looked up by name, and "region" sorting needs these.
    for (const key of ["slug", "name", "title", "location", "country", "state"]) keys.add(key);
  } else {
    for (const key of moduleConfig.listColumns) keys.add(key);
  }

  return Object.fromEntries([...keys].map((key) => [key, true]));
}

/** The fields on a module that accept a value typed by the admin. */
export function customOptionFields(moduleConfig) {
  return moduleConfig.fields.filter((field) => field.allowCustom).map((field) => field.name);
}
