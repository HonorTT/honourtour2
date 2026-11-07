import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getAllPackages } from "@/lib/packages";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Women's Special Tour Packages | Group Holidays for Women",
  description:
    "Explore Women's Special tour packages across India — thoughtfully planned group holidays designed around comfort, safety and shared travel experiences.",
  path: "/womens-special",
});

const womensSlugs = [
  "womens-special-delhi-agra",
  "womens-special-rajasthan",
  "womens-special-kashmir",
  "womens-special-kerala",
];

const config = {
  slug: "womens-special",
  breadcrumbTrail: ["Speciality Tours", "Women's Special Tours"],
  heading: "Women's Special Tour Packages",
  hiddenSections: ["regions", "interests", "seasons", "durations", "blogs"],
  intro:
    "Travel with a group of like-minded women on holidays designed around comfort, camaraderie and thoughtfully planned itineraries across India.",
  introExtra:
    "Every Women's Special departure is planned with attentive tour managers, comfortable stays and well-paced sightseeing, making it easy to explore new destinations while making new friends along the way.",
  reviewsLabel: "3,204 Reviews",
  listing: {
    liveBadgeLabel: "5 Tours Ongoing in Women's Special right now!",
  },
  filters: {
    priceMin: "30,000",
    priceMax: "2,70,000",
    priceRanges: ["₹30,000 - ₹60,000", "₹60,000 - ₹1L", "₹1L - ₹1.6L", "₹1.6L above"],
    departureCities: [
      "Mumbai (28)",
      "Delhi (24)",
      "Ahmedabad (12)",
      "Hyderabad (9)",
      "Bangalore (8)",
      "Pune (6)",
      "Chennai (5)",
    ],
    countries: [
      "India (27)",
    ],
    cities: [
      "Delhi (2)",
      "Jaipur (1)",
      "Srinagar (1)",
      "Kochi (1)",
    ],
    durations: ["3 - 5 Days", "6 - 8 Days", "9 - 14 Days"],
    packageTypes: ["Group Tour (47)"],
    specialityTours: ["Women's Special (47)", "Family (18)", "Short Trips (9)"],
  },
  regions: {
    title: "Women's Tours By Destination",
    items: [
      { name: "Rajasthan", count: "1 tour" },
      { name: "Kashmir", count: "1 tour" },
      { name: "Kerala", count: "1 tour" },
      { name: "Sri Lanka", count: "1 tour" },
      { name: "Nepal", count: "1 tour" },
      { name: "Thailand", count: "1 tour" },
    ],
  },
  interests: {
    title: "Women's Tours By Interest",
    items: ["Heritage", "Spiritual", "Hill Stations", "Beaches", "Shopping"],
  },
  seasons: {
    title: "Women's Tours By Season",
    items: ["Summer", "Monsoon", "Winter", "Spring"],
  },
  durations: {
    title: "Women's Tours By Duration",
    items: ["Less than 5 days", "6 to 8 days", "9 to 14 days", "More than 14 days"],
  },
  blogs: [
    "Safe travel tips for women's group tours",
    "Best Women's Special destinations in India",
    "Why travel with a women's only group",
    "Packing guide for group holidays",
    "Stories from our Women's Special travellers",
  ],
  reviews: [
    {
      name: "Sunita",
      tour: "Women's Special Rajasthan",
      category: "Women's Special",
      review:
        "A wonderful group of women and a beautifully managed tour. Felt completely safe and comfortable throughout the trip.",
    },
    {
      name: "Kavita",
      tour: "Women's Special Kashmir",
      category: "Women's Special",
      review:
        "The houseboat stay and gardens were magical. Our tour manager took great care of the entire group.",
    },
    {
      name: "Deepa",
      tour: "Women's Special Delhi Agra",
      category: "Women's Special",
      review:
        "Perfectly planned short trip with great company. Would happily book another Women's Special tour.",
    },
  ],
  faqHeading: "Women's Special Frequently Asked Questions",
  faqSubheading: "Answers to commonly asked questions about our Women's Special tours.",
  faqs: [
    {
      question: "What are Women's Special tour packages?",
      answer:
        "Women's Special tours are group holidays curated exclusively for women travellers, designed around comfort, safety and shared experiences with fellow women travellers.",
    },
    {
      question: "Are Women's Special tours safe for solo women travellers?",
      answer:
        "Yes, these tours are specifically designed for women travelling solo or in groups, with dedicated tour managers and thoughtfully planned itineraries.",
    },
    {
      question: "What destinations are available under Women's Special tours?",
      answer:
        "Women's Special tours are available across India, including Rajasthan, Kashmir and Kerala.",
    },
    {
      question: "What is included in a Women's Special package?",
      answer:
        "Inclusions vary by itinerary but generally include accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
    },
    {
      question: "Can I book a Women's Special tour for a group of friends?",
      answer:
        "Yes, Women's Special tours welcome both individual travellers and groups of friends or family members travelling together.",
    },
  ],
  seo: {
    heading: "Get to know more about Women's Special Tours before booking your package",
    paragraphs: [
      "Women's Special tours are thoughtfully designed group holidays that bring together women travellers who share a love for exploring new destinations. These tours combine comfortable stays, planned sightseeing and the camaraderie of travelling with a like-minded group.",
      "From the heritage of Rajasthan to the meadows of Kashmir, our Women's Special packages are curated to offer a comfortable and memorable travel experience.",
    ],
    extraParagraphs: [
      "Whether you are travelling solo or with friends, a Women's Special tour offers the comfort of a dedicated tour manager, well-paced itineraries and a supportive group of fellow travellers.",
      "Explore the available Women's Special packages above and choose a holiday that matches your travel plans.",
    ],
  },
};

export default async function WomensSpecialPage() {
  const catalog = await getAllPackages();
  const womensPackages = womensSlugs.map((slug) => catalog.find((item) => item.slug === slug)).filter(Boolean);

  const pageConfig = {
    ...config,
    packages: womensPackages,
    durations: { ...config.durations, packages: womensPackages.slice(0, 4) },
  };

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Women's Special", href: "/womens-special" },
        ])}
      />
      <Navbar />

      <main>
        <TourCategoryPage config={pageConfig} />
      </main>

      <Footer />
    </>
  );
}
