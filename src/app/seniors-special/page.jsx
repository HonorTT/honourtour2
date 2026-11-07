import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getAllPackages } from "@/lib/packages";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Seniors' Special Tour Packages | Senior Citizen Group Tours",
  description:
    "Explore Seniors' Special tour packages across India — comfortably paced group holidays designed with well-planned itineraries and dedicated tour assistance.",
  path: "/seniors-special",
});

const seniorsSlugs = [
  "seniors-special-rajasthan",
  "seniors-special-kashmir",
  "seniors-special-kerala",
  "seniors-special-delhi-agra",
];

const config = {
  slug: "seniors-special",
  breadcrumbTrail: ["Speciality Tours", "Seniors' Special Tours"],
  heading: "Seniors' Special Tour Packages",
  hiddenSections: ["regions", "interests", "seasons", "durations", "blogs"],
  intro:
    "Comfortable, well-planned group holidays designed for senior travellers, with a relaxed pace, thoughtful assistance and memorable destinations across India.",
  introExtra:
    "Every Seniors' Special departure is planned with gentler sightseeing schedules, comfortable transport and dedicated tour managers who understand the needs of senior travellers, making every journey enjoyable and stress-free.",
  reviewsLabel: "2,187 Reviews",
  listing: {
    liveBadgeLabel: "4 Tours Ongoing in Seniors' Special right now!",
  },
  filters: {
    priceMin: "30,000",
    priceMax: "2,70,000",
    priceRanges: ["₹30,000 - ₹60,000", "₹60,000 - ₹1L", "₹1L - ₹1.6L", "₹1.6L above"],
    departureCities: [
      "Mumbai (18)",
      "Delhi (15)",
      "Ahmedabad (8)",
      "Hyderabad (6)",
      "Bangalore (5)",
      "Pune (4)",
    ],
    countries: [
      "India (17)",
    ],
    cities: [
      "Jaipur (1)",
      "Srinagar (1)",
      "Kochi (1)",
      "Delhi (1)",
    ],
    durations: ["3 - 5 Days", "6 - 8 Days", "9 - 14 Days"],
    packageTypes: ["Group Tour (30)"],
    specialityTours: ["Seniors' Special (30)", "Family (12)", "Short Trips (6)"],
  },
  regions: {
    title: "Seniors' Tours By Destination",
    items: [
      { name: "Rajasthan", count: "1 tour" },
      { name: "Kashmir", count: "1 tour" },
      { name: "Kerala", count: "1 tour" },
      { name: "Delhi Agra", count: "1 tour" },
      { name: "Nepal", count: "1 tour" },
      { name: "Sri Lanka", count: "1 tour" },
    ],
  },
  interests: {
    title: "Seniors' Tours By Interest",
    items: ["Heritage", "Spiritual", "Hill Stations", "Leisure", "Sightseeing"],
  },
  seasons: {
    title: "Seniors' Tours By Season",
    items: ["Summer", "Monsoon", "Winter", "Spring"],
  },
  durations: {
    title: "Seniors' Tours By Duration",
    items: ["Less than 5 days", "6 to 8 days", "9 to 14 days", "More than 14 days"],
  },
  blogs: [
    "Travel tips for senior citizens",
    "Best comfortable destinations for seniors",
    "Why choose a Seniors' Special group tour",
    "Packing essentials for senior travellers",
    "Stories from our Seniors' Special travellers",
  ],
  reviews: [
    {
      name: "Ramesh",
      tour: "Seniors' Special Rajasthan",
      category: "Seniors' Special",
      review:
        "Very comfortable pace throughout the tour. The tour manager took excellent care of the entire group.",
    },
    {
      name: "Lakshmi",
      tour: "Seniors' Special Kerala",
      category: "Seniors' Special",
      review:
        "A relaxed and beautifully planned holiday. Every stop had enough rest time, which we really appreciated.",
    },
    {
      name: "Suresh",
      tour: "Seniors' Special Delhi Agra",
      category: "Seniors' Special",
      review:
        "Well organised short trip with comfortable transport and hotels. Highly recommended for senior travellers.",
    },
  ],
  faqHeading: "Seniors' Special Frequently Asked Questions",
  faqSubheading: "Answers to commonly asked questions about our Seniors' Special tours.",
  faqs: [
    {
      question: "What are Seniors' Special tour packages?",
      answer:
        "Seniors' Special tours are group holidays designed specifically for senior travellers, with a comfortable pace, gentle sightseeing schedules and dedicated tour assistance.",
    },
    {
      question: "Are Seniors' Special tours suitable for travellers with limited mobility?",
      answer:
        "These tours are planned with a relaxed pace and ample rest time, though specific mobility requirements should be discussed with our tour team before booking.",
    },
    {
      question: "What destinations are available under Seniors' Special tours?",
      answer:
        "Seniors' Special tours are available across India, including Rajasthan, Kashmir and Kerala.",
    },
    {
      question: "What is included in a Seniors' Special package?",
      answer:
        "Inclusions vary by itinerary but generally include accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
    },
    {
      question: "Can family members accompany seniors on these tours?",
      answer:
        "Yes, family members are welcome to join Seniors' Special tours alongside senior travellers.",
    },
  ],
  seo: {
    heading: "Get to know more about Seniors' Special Tours before booking your package",
    paragraphs: [
      "Seniors' Special tours are thoughtfully paced group holidays created for senior travellers who want to explore new destinations comfortably. These tours combine relaxed itineraries, comfortable stays and dedicated tour assistance throughout the journey.",
      "From the royal forts of Rajasthan to the gardens of Kashmir, our Seniors' Special packages are designed to offer a comfortable and memorable travel experience.",
    ],
    extraParagraphs: [
      "Every itinerary is planned with gentler sightseeing schedules, ample rest time and comfortable transport, ensuring a relaxed and enjoyable holiday for senior travellers.",
      "Explore the available Seniors' Special packages above and choose a holiday that matches your travel plans.",
    ],
  },
};

export default async function SeniorsSpecialPage() {
  const catalog = await getAllPackages();
  const seniorsPackages = seniorsSlugs.map((slug) => catalog.find((item) => item.slug === slug)).filter(Boolean);

  const pageConfig = {
    ...config,
    packages: seniorsPackages,
    durations: { ...config.durations, packages: seniorsPackages.slice(0, 4) },
  };

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Seniors' Special", href: "/seniors-special" },
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
