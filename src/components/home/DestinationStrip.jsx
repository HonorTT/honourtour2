import { homeData } from "@/data/homeData";
import { getDestinationHref } from "@/data/destinations";
import { getDestinationImage } from "@/data/destinationImages";
import PopularDestinations from "./PopularDestinations";

/* =========================================================
   Resolves each destination's link, photo and region, then
   hands the list to the client component that renders the
   category rail and the cards.
========================================================= */

// Homepage copy for Kashmir differs slightly from the destination page name
const nameAliases = {
  "Jammu and Kashmir": "Kashmir",
};

// "/india/kerala-tour-packages" -> "India"
function regionFor(href) {
  return "India";
}

export default function DestinationStrip({ destinations }) {
  const source = destinations?.length ? destinations : homeData.destinations;

  const items = source.map((destination) => {
    // A row may carry its own link — Kashmir's valleys are sold as packages
    // rather than as separate destination pages.
    const href =
      destination.href ||
      getDestinationHref(nameAliases[destination.name] || destination.name) ||
      "/india";

    return {
      name: destination.name,
      tourCount: destination.tourCount || "Explore tours",
      // Optional one-liner from the admin ("Heaven on Earth"); it sits under
      // the name when it is set.
      tagline: destination.tagline || null,
      href,
      image: getDestinationImage(destination.name),
      region: regionFor(href),
    };
  });

  // "All" first, then only the regions actually present
  const groups = ["All", ...new Set(items.map((item) => item.region))];

  return <PopularDestinations items={items} groups={groups} />;
}
