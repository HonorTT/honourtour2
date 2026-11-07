/* =========================================================
   SITE URL
   Every canonical tag, the sitemap and robots.txt are built
   from this, so a wrong value points search engines at a
   domain that may not exist.

   Order: an explicit env var wins; otherwise fall back to the
   Vercel deployment we are actually running on, which is
   always reachable. The hard-coded domain is the last resort
   for when the custom domain is finally live.
========================================================= */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Vercel injects these on the server at build and run time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "https://www.honortourandtravels.com";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Honor Tour & Travels";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export const DEFAULT_KEYWORDS = [
  "Honor Tour & Travels",
  // Kashmir leads: it is the bulk of what the company sells.
  "Kashmir tour packages",
  "Srinagar tour package",
  "Gulmarg tour package",
  "Pahalgam tour package",
  "Sonmarg tour package",
  "Kashmir family tour",
  "Kashmir honeymoon package",
  "Jammu Kashmir tour",
  "Leh Ladakh tour packages",
  "tour packages",
  "India tour packages",
  "holiday packages",
  "flight booking",
  "hotel booking",
  "customized holidays",
];

function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds a Next.js Metadata object with title, description, canonical,
 * Open Graph and Twitter tags pre-wired from a small set of inputs.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  // Pages opt *out* of indexing — the not-found branches pass noIndex: true.
  noIndex = false,
  keywords = [],
  // An admin-set canonical wins over the page's own URL — for a tour that is
  // deliberately duplicated under two destinations, say.
  canonical,
  type = "website",
}) {
  const url = canonical ? absoluteUrl(canonical) : absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

  return {
    // `absolute` switches off the root layout's "%s | Honor Tour & Travels"
    // template. Every caller already passes a finished title — an admin-written
    // meta title most of all — and the suffix was pushing those past the length
    // Google shows, and repeating the brand name when the title already had it.
    title: { absolute: title },
    description,
    // The page's own keywords lead; the site-wide list follows, deduplicated.
    keywords: [...new Set([...keywords, ...DEFAULT_KEYWORDS].filter(Boolean))],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function tourSchema({ title, description, image, price, path, days }) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description,
    image: image ? absoluteUrl(image) : DEFAULT_OG_IMAGE,
    url: absoluteUrl(path),
    ...(days ? { itinerary: { "@type": "ItemList", numberOfItems: days } } : {}),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
    },
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function hotelSchema({ name, description, image, address, rating, reviewCount, pricePerNight, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name,
    description,
    image: image ? absoluteUrl(image) : DEFAULT_OG_IMAGE,
    url: absoluteUrl(path),
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "IN",
    },
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: reviewCount || 1,
          },
        }
      : {}),
    ...(pricePerNight
      ? {
          priceRange: `₹${pricePerNight}`,
        }
      : {}),
  };
}

/** FAQ rich results — Google can show these straight in the SERP. */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/india?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

