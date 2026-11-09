import { packages } from "./packages.js";
import { getCityNamesUnder, getParentNamesFor, getSiblingCityNames, getSiblingRegionNames } from "./navigationData.js";
import { isIndiaPackage } from "./packageRegion.js";

/* =========================================================
   RAW DESTINATION DATA
   One entry per homepage destination icon. Each entry is
   turned into a TourCategoryPage-compatible config by
   buildDestinationConfig() below, reusing the same page
   architecture already built for /india, /world,
   /womens-special and /seniors-special.
========================================================= */

export const rawDestinations = [
  // ===================== WORLD DESTINATIONS =====================
  {
    slug: "europe-tour-packages",
    parent: "world",
    name: "Europe",
    heading: "Europe Tour Packages",
    metaTitle: "Europe Tour Packages | Europe Holiday Packages",
    metaDescription:
      "Explore Europe tour packages covering Switzerland, France, Italy, Austria and more with Honor Tour & Travels's curated group holidays and customized itineraries.",
    breadcrumbTrail: ["World", "Europe Tour Packages"],
    packageCount: 127,
    liveTourCount: 8,
    reviewsLabel: "4,120 Reviews",
    intro:
      "From snow-capped Alpine peaks to timeless piazzas and romantic riversides, Europe remains one of the most loved holiday destinations for Indian travellers.",
    introExtra:
      "Our Europe tour packages are thoughtfully curated to cover Western Europe's iconic capitals, the fjords of the north, the sunlit Mediterranean coast and the old-world charm of Central and Eastern Europe, combining comfortable stays with well-paced sightseeing and experienced tour managers.",
    tabs: ["All Europe (127)", "Western Europe", "Northern Europe", "Central & Eastern Europe", "Mediterranean Europe"],
    countries: [
      "Switzerland (24)", "France (22)", "Italy (19)", "Austria (14)", "Germany (12)",
      "Spain (11)", "Portugal (6)", "Netherlands (9)", "Belgium (7)", "United Kingdom (10)",
      "Greece (8)", "Czech Republic (5)", "Hungary (5)", "Croatia (4)", "Norway (4)",
      "Sweden (3)", "Finland (3)", "Denmark (3)",
    ],
    cities: [
      "Paris (22)", "London (10)", "Rome (14)", "Zurich (16)", "Lucerne (14)",
      "Vienna (9)", "Amsterdam (9)", "Prague (5)", "Budapest (5)", "Barcelona (7)",
      "Madrid (6)", "Venice (12)", "Florence (11)",
    ],
    packageSlugs: [
      "european-highlights", "all-of-switzerland", "european-panorama", "central-eastern-europe",
      "swiss-paris-delight", "best-of-greece", "scandinavia-highlights", "european-jewels",
      "italy-switzerland", "london-paris-swiss",
    ],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Ahmedabad", "Tours from Bangalore", "Tours from Pune", "Tours from Hyderabad"],
    related: {
      note: "Explore a hassle-free way to secure your United Kingdom visa with our detailed, easy-to-follow guide.",
      title: "Explore Europe",
      items: [
        { name: "Western Europe Tour Packages" },
        { name: "Northern Europe Tour Packages" },
        { name: "Eastern Europe Tour Packages" },
        { name: "Central Europe Tour Packages" },
      ],
    },
    regions: {
      title: "Europe Tour Packages By Region",
      items: [
        { name: "Western Europe", count: "38 tours" },
        { name: "Northern Europe", count: "12 tours" },
        { name: "Central & Eastern Europe", count: "22 tours" },
        { name: "Mediterranean Europe", count: "27 tours" },
        { name: "Switzerland Specials", count: "24 tours" },
        { name: "United Kingdom", count: "10 tours" },
      ],
    },
    faqHeading: "Europe Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "What countries are included in the Europe tour?",
        answer:
          "Our Europe tour packages cover popular countries such as Switzerland, France, Italy, Austria, Germany, the Netherlands, Belgium and more, depending on the selected itinerary.",
      },
      {
        question: "How much does it cost to tour Europe?",
        answer:
          "Europe holiday packages typically start from around ₹1.9 lakh per person and vary based on duration, countries covered and hotel category selected.",
      },
      {
        question: "Which is the best time to visit Europe?",
        answer:
          "Summer (May to September) is the most popular season for Europe holidays, offering pleasant weather for sightseeing, though spring and early autumn are also great options.",
      },
      {
        question: "What is a Schengen visa?",
        answer:
          "The Schengen visa allows travel across 27 European countries with a single visa, and is required for most Indian travellers visiting Western, Northern and Central Europe.",
      },
      {
        question: "What is the best Europe itinerary for a first-time visitor?",
        answer:
          "First-time visitors often prefer combination itineraries covering France, Switzerland and Italy, which balance iconic landmarks, scenic countryside and comfortable travel times.",
      },
    ],
    seoParagraphs: [
      "Europe holidays bring together some of the world's most celebrated cities, mountain landscapes and coastal towns in a single continent. From the fashion capitals of France and Italy to the alpine beauty of Switzerland and Austria, every region offers a distinct travel experience.",
      "Popular countries among Indian travellers include Switzerland, France, Italy and increasingly the Netherlands, Belgium and Central European destinations like Czech Republic and Hungary. Group tours are usually planned across 7 to 12 days, giving travellers enough time to explore multiple countries comfortably.",
    ],
    seoExtraParagraphs: [
      "Family tours, group departures and customized holidays are all available across our Europe itineraries, along with well-planned transport, comfortable hotels and a mix of European and Indian meal options for a relaxed travel experience.",
      "Whether it's the Eiffel Tower, the Swiss Alps or the canals of Amsterdam, planning your trip around the right season, duration and countries will help you make the most of your European holiday.",
    ],
  },

  {
    slug: "south-east-asia-tour-packages",
    parent: "world",
    name: "South East Asia",
    heading: "South East Asia Tour Packages",
    metaTitle: "South East Asia Tour Packages | Asia Holiday Packages",
    metaDescription:
      "Discover South East Asia tour packages across Thailand, Vietnam, Singapore, Malaysia, Indonesia and Cambodia with Honor Tour & Travels's curated group holidays.",
    breadcrumbTrail: ["World", "South East Asia Tour Packages"],
    packageCount: 59,
    liveTourCount: 4,
    reviewsLabel: "2,845 Reviews",
    intro:
      "South East Asia brings together golden temples, tropical islands and vibrant cityscapes, making it one of the most popular international holiday regions for Indian travellers.",
    introExtra:
      "Our South East Asia packages cover Thailand's beaches, Vietnam's heritage, Singapore and Malaysia's modern skylines, Indonesia's islands and Cambodia's ancient temples, with well-planned itineraries suited to families, couples and groups.",
    tabs: ["All South East Asia (59)", "Thailand", "Vietnam", "Singapore Malaysia", "Indonesia", "Cambodia Philippines"],
    countries: ["Thailand (18)", "Vietnam (7)", "Singapore (13)", "Malaysia (13)", "Indonesia (6)", "Cambodia (3)", "Philippines (2)"],
    cities: ["Bangkok (18)", "Phuket (9)", "Hanoi (5)", "Ho Chi Minh City (6)", "Singapore (13)", "Kuala Lumpur (10)", "Denpasar (6)", "Siem Reap (2)"],
    packageSlugs: ["best-of-thailand", "highlights-of-vietnam", "singapore-malaysia", "vietnam-cambodia", "bali-experience", "thailand-malaysia"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Chennai", "Tours from Bangalore", "Tours from Hyderabad", "Tours from Kolkata"],
    related: {
      note: "Most South East Asia destinations offer visa-on-arrival or e-visa facilities for Indian passport holders, making travel planning simple.",
      title: "Explore South East Asia",
      items: [
        { name: "Thailand Tour Packages" },
        { name: "Vietnam Tour Packages" },
        { name: "Singapore Malaysia Packages" },
        { name: "Bali Tour Packages" },
      ],
    },
    regions: {
      title: "South East Asia Tour Packages By Region",
      items: [
        { name: "Thailand", count: "18 tours" },
        { name: "Vietnam", count: "7 tours" },
        { name: "Singapore & Malaysia", count: "16 tours" },
        { name: "Indonesia (Bali)", count: "6 tours" },
        { name: "Cambodia", count: "3 tours" },
        { name: "Philippines", count: "2 tours" },
      ],
    },
    faqHeading: "South East Asia Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which South East Asian countries are covered in these packages?",
        answer: "Our South East Asia packages cover Thailand, Vietnam, Singapore, Malaysia, Indonesia and Cambodia, either individually or in combination itineraries.",
      },
      {
        question: "Do I need a visa to travel to South East Asia?",
        answer: "Most South East Asian countries offer e-visa or visa-on-arrival facilities for Indian passport holders, though requirements vary by destination.",
      },
      {
        question: "What is the best time to visit South East Asia?",
        answer: "November to February offers pleasant weather across most of South East Asia, though the region can be visited comfortably for much of the year.",
      },
      {
        question: "How many days are ideal for a South East Asia holiday?",
        answer: "6 to 8 days is ideal for a single-country holiday, while combination tours covering two or more countries typically run 8 to 10 days.",
      },
      {
        question: "Are South East Asia tours suitable for families?",
        answer: "Yes, our South East Asia packages are designed to suit families, couples and groups with a balance of sightseeing, leisure and beach time.",
      },
    ],
    seoParagraphs: [
      "South East Asia is a diverse region offering everything from Thailand's temples and islands to Vietnam's history, Singapore and Malaysia's modern cityscapes, and Indonesia's tropical beaches.",
      "Group tours across South East Asia are typically planned over 6 to 9 days, making them ideal for both first-time international travellers and repeat visitors looking for a relaxed holiday.",
    ],
    seoExtraParagraphs: [
      "Family tours, honeymoon packages and group departures are widely available, with well-organised transport, comfortable hotels and a good mix of local and Indian food options.",
      "Whether it's the beaches of Phuket, the temples of Angkor Wat or the skyline of Singapore, choosing the right combination of countries and season will help you plan a memorable South East Asia holiday.",
    ],
  },

  {
    slug: "australia-new-zealand-tour-packages",
    parent: "world",
    name: "Australia New Zealand",
    heading: "Australia New Zealand Tour Packages",
    metaTitle: "Australia New Zealand Tour Packages | Australia Holiday Packages",
    metaDescription:
      "Explore Australia New Zealand tour packages covering Sydney, Melbourne, Auckland and Queenstown with Honor Tour & Travels's curated group holidays.",
    breadcrumbTrail: ["World", "Australia New Zealand Tour Packages"],
    packageCount: 22,
    liveTourCount: 2,
    reviewsLabel: "1,340 Reviews",
    intro:
      "Australia and New Zealand offer some of the world's most dramatic natural landscapes, from the Sydney Harbour skyline to the fjords of Milford Sound.",
    introExtra:
      "Our Australia New Zealand packages combine cosmopolitan cities, the Great Barrier Reef, adventure capitals and glacier-fed lakes, giving travellers a well-rounded experience of both countries.",
    tabs: ["All Australia New Zealand (22)", "Australia", "New Zealand", "Combined Tours"],
    countries: ["Australia (14)", "New Zealand (8)"],
    cities: ["Sydney (10)", "Melbourne (8)", "Cairns (4)", "Auckland (6)", "Rotorua (3)", "Queenstown (5)"],
    packageSlugs: ["best-of-australia", "australia-highlights", "best-of-new-zealand", "australia-new-zealand-explorer"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Bangalore", "Tours from Chennai", "Tours from Hyderabad", "Tours from Pune"],
    related: {
      title: "Explore Australia New Zealand",
      items: [
        { name: "Australia Tour Packages" },
        { name: "New Zealand Tour Packages" },
        { name: "Sydney Melbourne Tours" },
        { name: "Queenstown Tours" },
      ],
    },
    regions: {
      title: "Australia New Zealand Packages By Region",
      items: [
        { name: "Sydney & Melbourne", count: "12 tours" },
        { name: "Cairns & Great Barrier Reef", count: "4 tours" },
        { name: "Auckland & Rotorua", count: "6 tours" },
        { name: "Queenstown & South Island", count: "5 tours" },
        { name: "Combined Australia NZ", count: "3 tours" },
        { name: "Adventure Tours", count: "6 tours" },
      ],
    },
    faqHeading: "Australia New Zealand Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Can I visit both Australia and New Zealand in one trip?",
        answer: "Yes, our Australia New Zealand Explorer package is designed to combine both countries in a single well-paced itinerary.",
      },
      {
        question: "What is the best time to visit Australia and New Zealand?",
        answer: "September to April (Australia and New Zealand's spring to autumn) offers the most pleasant weather for sightseeing and outdoor activities.",
      },
      {
        question: "Do I need separate visas for Australia and New Zealand?",
        answer: "Yes, Australia and New Zealand each require their own visa for Indian passport holders, and our team assists with the documentation process.",
      },
      {
        question: "How many days are recommended for this region?",
        answer: "8 to 9 days is ideal for a single-country holiday, while a combined Australia New Zealand tour typically runs 12 days.",
      },
      {
        question: "Are these tours suitable for adventure seekers?",
        answer: "Yes, destinations like Queenstown and Cairns offer optional adventure activities alongside our regular sightseeing itinerary.",
      },
    ],
    seoParagraphs: [
      "Australia and New Zealand are known for their dramatic natural landscapes, from the Great Barrier Reef and Sydney Harbour to New Zealand's fjords and geothermal parks.",
      "Group tours typically run 8 to 12 days depending on whether one or both countries are covered, giving travellers time to experience cities, coastlines and mountain regions comfortably.",
    ],
    seoExtraParagraphs: [
      "Family tours and group departures are available across the region, with comfortable transport, well-selected hotels and guided sightseeing throughout.",
      "Whether it's the Sydney Opera House, the Great Barrier Reef or Milford Sound, planning around the right season will help you enjoy the best of both countries.",
    ],
  },

  {
    slug: "america-tour-packages",
    parent: "world",
    name: "America",
    heading: "America Tour Packages",
    metaTitle: "America Tour Packages | USA Canada Holiday Packages",
    metaDescription:
      "Explore America tour packages covering the USA and Canada, from New York and Las Vegas to the Canadian Rockies, with Honor Tour & Travels's curated group holidays.",
    breadcrumbTrail: ["World", "America Tour Packages"],
    packageCount: 40,
    liveTourCount: 3,
    reviewsLabel: "1,876 Reviews",
    intro:
      "From the skyscrapers of New York to the natural wonders of the Canadian Rockies, America offers an incredible range of experiences across the USA and Canada.",
    introExtra:
      "Our America tour packages are designed to cover iconic cities, national landmarks and scenic drives across the East Coast, West Coast and Canada, with comfortable stays and well-organised sightseeing throughout.",
    tabs: ["All America (40)", "USA", "Canada", "East Coast", "West Coast"],
    countries: ["USA (28)", "Canada (12)"],
    cities: ["New York (14)", "Washington DC (8)", "Las Vegas (10)", "Los Angeles (9)", "San Francisco (6)", "Toronto (5)", "Vancouver (6)", "Niagara Falls (4)"],
    packageSlugs: ["american-highlights", "east-coast-usa", "west-coast-usa", "canadian-rockies", "usa-canada-explorer"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Ahmedabad", "Tours from Bangalore", "Tours from Hyderabad", "Tours from Chennai"],
    related: {
      title: "Explore America",
      items: [
        { name: "East Coast USA Packages" },
        { name: "West Coast USA Packages" },
        { name: "Canadian Rockies Packages" },
        { name: "USA Canada Explorer Packages" },
      ],
    },
    regions: {
      title: "America Packages By Region",
      items: [
        { name: "East Coast USA", count: "14 tours" },
        { name: "West Coast USA", count: "12 tours" },
        { name: "Las Vegas Specials", count: "10 tours" },
        { name: "Canadian Rockies", count: "8 tours" },
        { name: "USA Canada Combined", count: "6 tours" },
        { name: "National Parks", count: "5 tours" },
      ],
    },
    faqHeading: "America Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which cities are covered in the America tour packages?",
        answer: "Our America packages cover major cities such as New York, Washington DC, Las Vegas, Los Angeles, San Francisco, Toronto and Vancouver depending on the itinerary.",
      },
      {
        question: "Do I need a visa to travel to the USA or Canada?",
        answer: "Yes, both the USA and Canada require a visa for Indian passport holders, and our team assists with guidance on the documentation process.",
      },
      {
        question: "What is the best time to visit America?",
        answer: "April to October offers pleasant weather for most of the USA and Canada, making it the most popular season for group tours.",
      },
      {
        question: "How many days are ideal for an America holiday?",
        answer: "8 days is ideal for a single coast itinerary, while combined USA Canada tours typically run 10 to 11 days.",
      },
      {
        question: "Can I combine the USA and Canada in one trip?",
        answer: "Yes, our USA Canada Explorer package is designed to combine the best of both countries in a single itinerary.",
      },
    ],
    seoParagraphs: [
      "America offers an incredible diversity of experiences, from the iconic skyline of New York and the entertainment of Las Vegas to the natural beauty of the Canadian Rockies and Niagara Falls.",
      "Group tours across America are typically planned over 8 to 11 days, covering either the East Coast, West Coast or a combination of the USA and Canada.",
    ],
    seoExtraParagraphs: [
      "Family tours and group departures are available with comfortable transport, well-selected hotels and a mix of guided sightseeing and leisure time.",
      "Whether it's the Statue of Liberty, the Golden Gate Bridge or Niagara Falls, planning around the right season and cities will help you make the most of your America holiday.",
    ],
  },

  {
    slug: "africa-tour-packages",
    parent: "world",
    name: "Africa",
    heading: "Africa Tour Packages",
    metaTitle: "Africa Tour Packages | Africa Safari Holiday Packages",
    metaDescription:
      "Discover Africa tour packages covering South Africa, Kenya, Egypt and more with Honor Tour & Travels's curated safari and group holiday itineraries.",
    breadcrumbTrail: ["World", "Africa Tour Packages"],
    packageCount: 12,
    liveTourCount: 1,
    reviewsLabel: "612 Reviews",
    intro:
      "Africa is home to some of the world's most extraordinary wildlife, landscapes and ancient civilizations, from the savannahs of Kenya to the pyramids of Egypt.",
    introExtra:
      "Our Africa packages combine guided safaris, cultural experiences and comfortable stays across South Africa, Kenya, Egypt and Morocco, designed for families, couples and groups seeking a memorable African holiday.",
    tabs: ["All Africa (12)", "South Africa", "Kenya Tanzania", "Egypt", "Morocco"],
    countries: ["South Africa (4)", "Kenya (3)", "Tanzania (2)", "Egypt (2)", "Morocco (1)"],
    cities: ["Cape Town (4)", "Johannesburg (3)", "Nairobi (3)", "Cairo (2)", "Luxor (2)", "Zanzibar (1)"],
    packageSlugs: ["best-of-south-africa", "kenya-safari", "egypt-highlights", "african-safari-experience"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Bangalore", "Tours from Hyderabad"],
    related: {
      title: "Explore Africa",
      items: [
        { name: "South Africa Tour Packages" },
        { name: "Kenya Safari Packages" },
        { name: "Egypt Tour Packages" },
        { name: "African Safari Packages" },
      ],
    },
    regions: {
      title: "Africa Packages By Region",
      items: [
        { name: "South Africa", count: "4 tours" },
        { name: "Kenya & Tanzania", count: "5 tours" },
        { name: "Egypt", count: "2 tours" },
        { name: "Morocco", count: "1 tour" },
        { name: "Safari Specials", count: "6 tours" },
        { name: "Zanzibar Beaches", count: "1 tour" },
      ],
    },
    faqHeading: "Africa Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which African countries are covered in these packages?",
        answer: "Our Africa packages cover South Africa, Kenya, Tanzania, Egypt and Morocco, either individually or as part of combination itineraries.",
      },
      {
        question: "What is included in a safari package?",
        answer: "Safari packages typically include lodge or tented camp accommodation, meals, guided game drives and tour manager assistance.",
      },
      {
        question: "What is the best time for an African safari?",
        answer: "June to October is considered the best time for wildlife safaris in Kenya and Tanzania due to the Great Migration season.",
      },
      {
        question: "Do I need a visa to travel to Africa?",
        answer: "Visa requirements vary by country; South Africa, Kenya and Egypt each have their own entry requirements which our team helps you navigate.",
      },
      {
        question: "Are Africa tours suitable for families?",
        answer: "Yes, our Africa packages are designed with comfortable accommodation and paced itineraries suitable for families and groups.",
      },
    ],
    seoParagraphs: [
      "Africa offers a unique blend of wildlife safaris, ancient history and stunning coastlines, from the plains of the Maasai Mara to the pyramids of Giza.",
      "Group tours across Africa are typically planned over 7 to 9 days, combining guided safaris with city sightseeing and cultural experiences.",
    ],
    seoExtraParagraphs: [
      "Family tours and group departures are available with comfortable lodges, experienced safari guides and well-organised transport throughout.",
      "Whether it's a Kruger National Park safari, the Great Pyramids of Giza or the beaches of Zanzibar, planning around the right season will help you make the most of your African holiday.",
    ],
  },

  {
    slug: "japan-china-korea-tour-packages",
    parent: "world",
    name: "Japan China Korea",
    heading: "Japan China Korea Tour Packages",
    metaTitle: "Japan China Korea Tour Packages | East Asia Holiday Packages",
    metaDescription:
      "Explore Japan China Korea tour packages covering Tokyo, Kyoto, Beijing, Shanghai and Seoul with Honor Tour & Travels's curated East Asia group holidays.",
    breadcrumbTrail: ["World", "Japan China Korea Tour Packages"],
    packageCount: 27,
    liveTourCount: 2,
    reviewsLabel: "1,285 Reviews",
    intro:
      "Japan, China and South Korea combine ancient heritage with modern innovation, offering travellers a fascinating mix of temples, technology and culture.",
    introExtra:
      "Our Japan China Korea packages are curated to cover Tokyo's energy, Kyoto's timeless temples, China's Great Wall and Terracotta Army, and Seoul's vibrant culture, with well-paced itineraries and experienced tour managers.",
    tabs: ["All Japan China Korea (27)", "Japan", "China", "South Korea", "Combined Tours"],
    countries: ["Japan (8)", "China (9)", "South Korea (7)"],
    cities: ["Tokyo (8)", "Kyoto (6)", "Osaka (5)", "Beijing (5)", "Shanghai (4)", "Xian (2)", "Seoul (7)"],
    packageSlugs: ["best-of-japan", "japan-korea", "highlights-of-china", "china-korea", "japan-explorer"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Bangalore", "Tours from Chennai", "Tours from Hyderabad"],
    related: {
      title: "Explore Japan China Korea",
      items: [
        { name: "Japan Tour Packages" },
        { name: "China Tour Packages" },
        { name: "Korea Tour Packages" },
        { name: "Japan Korea Combined Packages" },
      ],
    },
    regions: {
      title: "Japan China Korea Packages By Region",
      items: [
        { name: "Tokyo & Kyoto", count: "8 tours" },
        { name: "Osaka & Surrounds", count: "5 tours" },
        { name: "Beijing & Xian", count: "7 tours" },
        { name: "Shanghai", count: "4 tours" },
        { name: "Seoul & South Korea", count: "7 tours" },
        { name: "Combined Tours", count: "5 tours" },
      ],
    },
    faqHeading: "Japan China Korea Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Can I visit Japan, China and Korea in one trip?",
        answer: "Yes, our combined itineraries such as Japan Korea and China Korea allow you to experience two countries in a single well-paced tour.",
      },
      {
        question: "What is the best time to visit Japan, China or Korea?",
        answer: "Spring (March to May) and autumn (September to November) are popular for cherry blossoms, pleasant weather and autumn foliage across the region.",
      },
      {
        question: "Do I need a visa for Japan, China or South Korea?",
        answer: "Visa requirements vary by country and are subject to change; our team provides updated guidance based on your chosen itinerary.",
      },
      {
        question: "How many days are ideal for this region?",
        answer: "7 days is ideal for a single-country holiday, while combined tours covering two countries typically run 8 to 9 days.",
      },
      {
        question: "Is the bullet train included in Japan itineraries?",
        answer: "Yes, our Japan packages typically include bullet train travel between major cities such as Tokyo, Kyoto and Osaka.",
      },
    ],
    seoParagraphs: [
      "Japan, China and South Korea offer a fascinating blend of ancient heritage and modern innovation, from Kyoto's temples and the Great Wall of China to Seoul's vibrant markets and palaces.",
      "Group tours across the region are typically planned over 7 to 9 days, allowing travellers to explore iconic landmarks, enjoy local cuisine and experience efficient rail travel between cities.",
    ],
    seoExtraParagraphs: [
      "Family tours and group departures are available across Japan, China and Korea, with comfortable hotels, guided sightseeing and well-organised transport throughout.",
      "Whether it's cherry blossoms in Tokyo, the Terracotta Army in Xian or palaces in Seoul, choosing the right season and combination of countries will help you plan a memorable East Asian holiday.",
    ],
  },

  // ===================== INDIA DESTINATIONS =====================
  {
    slug: "rajasthan-tour-packages",
    parent: "india",
    name: "Rajasthan",
    heading: "Rajasthan Tour Packages",
    metaTitle: "Rajasthan Tour Packages | Rajasthan Holiday Packages",
    metaDescription:
      "Explore Rajasthan tour packages covering Jaipur, Udaipur, Jodhpur and Jaisalmer with Honor Tour & Travels's curated royal heritage group holidays.",
    breadcrumbTrail: ["India", "Rajasthan Tour Packages"],
    packageCount: 36,
    liveTourCount: 3,
    reviewsLabel: "2,410 Reviews",
    intro:
      "Rajasthan's majestic forts, royal palaces and golden deserts make it one of India's most iconic and colourful holiday destinations.",
    introExtra:
      "Our Rajasthan tour packages cover the Pink City of Jaipur, the lake city of Udaipur, the blue city of Jodhpur, the golden city of Jaisalmer and hill stations like Mount Abu, combining heritage sightseeing with comfortable stays and desert experiences.",
    tabs: ["All Rajasthan (36)", "Jaipur", "Udaipur", "Jodhpur Jaisalmer", "Desert Tours"],
    countries: [],
    cities: ["Jaipur (13)", "Udaipur (10)", "Jodhpur (7)", "Jaisalmer (6)", "Bikaner (3)", "Mount Abu (3)", "Ajmer (2)", "Pushkar (2)"],
    packageSlugs: ["jaipur-udaipur-tour-package", "rajasthan-highlights", "royal-rajasthan", "jaisalmer-jodhpur", "best-of-rajasthan"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Ahmedabad", "Tours from Bangalore", "Tours from Pune", "Tours from Indore"],
    related: {
      title: "Explore Rajasthan",
      items: [
        { name: "Jaipur Tour Packages" },
        { name: "Udaipur Tour Packages" },
        { name: "Jodhpur Jaisalmer Packages" },
        { name: "Desert Safari Packages" },
      ],
    },
    regions: {
      title: "Rajasthan Packages By City",
      items: [
        { name: "Jaipur", count: "13 tours" },
        { name: "Udaipur", count: "10 tours" },
        { name: "Jodhpur", count: "7 tours" },
        { name: "Jaisalmer", count: "6 tours" },
        { name: "Mount Abu", count: "3 tours" },
        { name: "Pushkar", count: "2 tours" },
      ],
    },
    faqHeading: "Rajasthan Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which cities are covered in Rajasthan tour packages?",
        answer: "Our Rajasthan packages cover Jaipur, Udaipur, Jodhpur, Jaisalmer, Mount Abu, Ajmer and Pushkar depending on the selected itinerary.",
      },
      {
        question: "What is the best time to visit Rajasthan?",
        answer: "October to March offers pleasant weather for sightseeing, making it the most popular season to visit Rajasthan.",
      },
      {
        question: "What is included in a Rajasthan tour package?",
        answer: "Inclusions typically cover hotel accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
      },
      {
        question: "Is a desert safari included in the Jaisalmer itinerary?",
        answer: "Yes, most of our Jaisalmer itineraries include a desert safari experience at the Sam Sand Dunes.",
      },
      {
        question: "Are Rajasthan tours suitable for families?",
        answer: "Yes, our Rajasthan packages are designed to suit families, couples and groups with a good balance of heritage sightseeing and leisure time.",
      },
    ],
    seoParagraphs: [
      "Rajasthan is one of India's most colourful states, known for its majestic forts, royal palaces, vibrant markets and golden desert landscapes.",
      "Group tours across Rajasthan are typically planned over 5 to 9 days, covering cities such as Jaipur, Udaipur, Jodhpur and Jaisalmer.",
    ],
    seoExtraParagraphs: [
      "Family tours, group departures and customized holidays are all available across Rajasthan, with comfortable heritage-style hotels and well-organised transport.",
      "Whether it's the Amber Fort, Lake Pichola or the Sam Sand Dunes, choosing the right combination of cities and season will help you plan a memorable Rajasthan holiday.",
    ],
  },

  {
    slug: "kerala-tour-packages",
    parent: "india",
    name: "Kerala",
    heading: "Kerala Tour Packages",
    metaTitle: "Kerala Tour Packages | Kerala Holiday Packages",
    metaDescription:
      "Explore Kerala tour packages covering Kochi, Munnar, Alleppey and Kovalam with Honor Tour & Travels's curated backwater and hill station group holidays.",
    breadcrumbTrail: ["India", "Kerala Tour Packages"],
    packageCount: 20,
    liveTourCount: 2,
    reviewsLabel: "1,760 Reviews",
    intro:
      "Kerala's backwaters, tea gardens and beaches make it one of India's most relaxing and picturesque holiday destinations.",
    introExtra:
      "Our Kerala tour packages combine the misty hills of Munnar, wildlife experiences in Thekkady, tranquil backwater cruises in Alleppey and the beaches of Kovalam, designed for families, couples and groups.",
    tabs: ["All Kerala (20)", "Munnar", "Alleppey Backwaters", "Kovalam Beaches", "Wildlife Tours"],
    countries: [],
    cities: ["Kochi (8)", "Munnar (9)", "Thekkady (4)", "Alleppey (7)", "Kovalam (3)", "Thiruvananthapuram (2)"],
    packageSlugs: ["highlights-of-kerala", "best-of-kerala", "kerala-backwaters", "munnar-alleppey", "kerala-family-tour"],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Chennai", "Tours from Bangalore", "Tours from Hyderabad", "Tours from Cochin"],
    related: {
      title: "Explore Kerala",
      items: [
        { name: "Munnar Tour Packages" },
        { name: "Alleppey Backwater Packages" },
        { name: "Kovalam Beach Packages" },
        { name: "Kerala Wildlife Packages" },
      ],
    },
    regions: {
      title: "Kerala Packages By City",
      items: [
        { name: "Kochi", count: "8 tours" },
        { name: "Munnar", count: "9 tours" },
        { name: "Alleppey", count: "7 tours" },
        { name: "Thekkady", count: "4 tours" },
        { name: "Kovalam", count: "3 tours" },
        { name: "Thiruvananthapuram", count: "2 tours" },
      ],
    },
    faqHeading: "Kerala Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which places are covered in Kerala tour packages?",
        answer: "Our Kerala packages cover Kochi, Munnar, Thekkady, Alleppey, Kovalam and Thiruvananthapuram depending on the selected itinerary.",
      },
      {
        question: "What is the best time to visit Kerala?",
        answer: "September to March offers pleasant weather for sightseeing and backwater cruises, making it the most popular season to visit Kerala.",
      },
      {
        question: "Is a houseboat stay included in Kerala packages?",
        answer: "Yes, most of our Alleppey and backwater itineraries include a houseboat cruise experience.",
      },
      {
        question: "What is included in a Kerala tour package?",
        answer: "Inclusions typically cover hotel accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
      },
      {
        question: "Are Kerala tours suitable for families?",
        answer: "Yes, our Kerala packages are designed to suit families, couples and groups with a relaxed pace and comfortable stays.",
      },
    ],
    seoParagraphs: [
      "Kerala, known as God's Own Country, is famous for its tranquil backwaters, misty tea gardens, wildlife sanctuaries and pristine beaches.",
      "Group tours across Kerala are typically planned over 5 to 8 days, covering destinations such as Kochi, Munnar, Thekkady and Alleppey.",
    ],
    seoExtraParagraphs: [
      "Family tours, group departures and customized holidays are all available across Kerala, with comfortable stays and well-organised backwater cruises.",
      "Whether it's the tea gardens of Munnar, a houseboat cruise in Alleppey or the beaches of Kovalam, choosing the right combination of destinations will help you plan a memorable Kerala holiday.",
    ],
  },

  {
    slug: "andaman-tour-packages",
    parent: "india",
    name: "Andaman",
    heading: "Andaman Tour Packages",
    metaTitle: "Andaman Tour Packages | Andaman Islands Holiday Packages",
    metaDescription:
      "Explore Andaman tour packages covering Port Blair, Havelock Island and Neil Island with Honor Tour & Travels's curated island holiday itineraries.",
    breadcrumbTrail: ["India", "Andaman Tour Packages"],
    packageCount: 9,
    liveTourCount: 1,
    reviewsLabel: "845 Reviews",
    intro:
      "The Andaman Islands offer some of India's most pristine beaches, crystal-clear waters and vibrant coral reefs, perfect for a relaxing island getaway.",
    introExtra:
      "Our Andaman packages combine the historic significance of Port Blair with the beaches of Havelock Island and Neil Island, offering water activities, scuba diving and leisure time by the sea.",
    tabs: ["All Andaman (9)", "Port Blair", "Havelock Island", "Neil Island"],
    countries: [],
    cities: ["Port Blair (5)", "Havelock Island (6)", "Neil Island (3)"],
    packageSlugs: ["best-of-andaman", "andaman-highlights", "andaman-island-escape", "port-blair-havelock"],
    joiningLeavingCities: ["Tours from Chennai", "Tours from Kolkata", "Tours from Delhi", "Tours from Mumbai", "Tours from Bangalore"],
    related: {
      title: "Explore Andaman",
      items: [
        { name: "Port Blair Tour Packages" },
        { name: "Havelock Island Packages" },
        { name: "Neil Island Packages" },
        { name: "Andaman Honeymoon Packages" },
      ],
    },
    regions: {
      title: "Andaman Packages By Island",
      items: [
        { name: "Port Blair", count: "5 tours" },
        { name: "Havelock Island", count: "6 tours" },
        { name: "Neil Island", count: "3 tours" },
        { name: "Scuba Diving Specials", count: "4 tours" },
        { name: "Honeymoon Packages", count: "2 tours" },
        { name: "Family Packages", count: "3 tours" },
      ],
    },
    faqHeading: "Andaman Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which islands are covered in Andaman tour packages?",
        answer: "Our Andaman packages cover Port Blair, Havelock Island and Neil Island depending on the selected itinerary.",
      },
      {
        question: "What is the best time to visit Andaman?",
        answer: "October to May offers the best weather for beach activities, scuba diving and island hopping in Andaman.",
      },
      {
        question: "Is inter-island ferry travel included?",
        answer: "Yes, on-tour ferry transport between Port Blair, Havelock Island and Neil Island is included in our Andaman packages.",
      },
      {
        question: "Is scuba diving included in Andaman packages?",
        answer: "Scuba diving is available as part of select itineraries or as an optional add-on activity at Havelock Island.",
      },
      {
        question: "Are Andaman tours suitable for honeymoon couples?",
        answer: "Yes, the Andaman Island Escape package is specially designed for couples seeking a relaxing beach honeymoon.",
      },
    ],
    seoParagraphs: [
      "The Andaman Islands are known for their pristine beaches, turquoise waters and vibrant marine life, making them one of India's top island getaways.",
      "Group tours across Andaman are typically planned over 4 to 6 days, covering Port Blair's historic sites and the beaches of Havelock and Neil Island.",
    ],
    seoExtraParagraphs: [
      "Family tours, honeymoon packages and group departures are all available across Andaman, with comfortable resort stays and well-organised ferry transport between islands.",
      "Whether it's the Cellular Jail, Radhanagar Beach or a scuba diving session at Elephant Beach, choosing the right combination of islands will help you plan a memorable Andaman holiday.",
    ],
  },

  {
    slug: "kashmir-tour-packages",
    parent: "india",
    name: "Kashmir",
    heading: "Kashmir Tour Packages",
    metaTitle: "Kashmir Tour Packages | Srinagar, Gulmarg & Pahalgam Holidays",
    metaDescription:
      "Explore Kashmir tour packages covering Srinagar, Gulmarg, Pahalgam and Sonmarg with Honor Tour & Travels's curated Himalayan group holidays.",
    breadcrumbTrail: ["India", "Kashmir Tour Packages"],
    packageCount: 16,
    liveTourCount: 2,
    reviewsLabel: "1,520 Reviews",
    intro:
      "Known as paradise on earth, Kashmir offers snow-capped mountains, alpine meadows and serene lakes that make it one of India's most breathtaking destinations.",
    introExtra:
      "Our Kashmir packages combine houseboat stays on Dal Lake, gondola rides in Gulmarg, valley views in Pahalgam and glacier excursions in Sonmarg, designed for families, couples and groups.",
    tabs: ["All Kashmir (16)", "Srinagar", "Gulmarg Pahalgam", "Sonmarg", "Jammu"],
    countries: [],
    cities: ["Srinagar (9)", "Gulmarg (6)", "Pahalgam (6)", "Sonmarg (3)", "Jammu (2)"],
    packageSlugs: [],
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Ahmedabad", "Tours from Bangalore", "Tours from Chandigarh", "Tours from Amritsar"],
    related: {
      title: "Explore Kashmir",
      items: [
        { name: "Srinagar Tour Packages" },
        { name: "Gulmarg Pahalgam Packages" },
        { name: "Sonmarg Tour Packages" },
        { name: "Kashmir Family Packages" },
      ],
    },
    regions: {
      title: "Kashmir Packages By Destination",
      items: [
        { name: "Srinagar", count: "9 tours" },
        { name: "Gulmarg", count: "6 tours" },
        { name: "Pahalgam", count: "6 tours" },
        { name: "Sonmarg", count: "3 tours" },
        { name: "Jammu", count: "2 tours" },
        { name: "Houseboat Specials", count: "4 tours" },
      ],
    },
    faqHeading: "Kashmir Frequently Asked Questions",
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: "Which places are covered in Kashmir tour packages?",
        answer: "Our Kashmir packages cover Srinagar, Gulmarg, Pahalgam, Sonmarg and Jammu depending on the selected itinerary.",
      },
      {
        question: "What is the best time to visit Kashmir?",
        answer: "April to October is ideal for pleasant weather and valley sightseeing, while December to February suits travellers seeking snowfall.",
      },
      {
        question: "Is a houseboat stay included in Kashmir packages?",
        answer: "Yes, most of our Srinagar itineraries include a houseboat stay on Dal Lake along with a Shikara ride.",
      },
      {
        question: "What is included in a Kashmir tour package?",
        answer: "Inclusions typically cover hotel or houseboat accommodation, selected meals, sightseeing, on-tour transport and tour manager services.",
      },
      {
        question: "Are Kashmir tours suitable for families?",
        answer: "Yes, our Kashmir packages are designed to suit families, couples and groups with a comfortable, well-paced itinerary.",
      },
    ],
    seoParagraphs: [
      "Kashmir is renowned for its snow-capped mountains, alpine meadows, serene lakes and Mughal gardens, earning its reputation as paradise on earth.",
      "Group tours across Kashmir are typically planned over 5 to 8 days, covering Srinagar, Gulmarg, Pahalgam and Sonmarg.",
    ],
    seoExtraParagraphs: [
      "Family tours, group departures and customized holidays are all available across Kashmir, with comfortable stays including a signature houseboat experience on Dal Lake.",
      "Whether it's a Shikara ride on Dal Lake, the Gulmarg Gondola or the meadows of Pahalgam, choosing the right combination of destinations and season will help you plan a memorable Kashmir holiday.",
    ],
  },
];

/* =========================================================
   BUILD TourCategoryPage-COMPATIBLE CONFIG
========================================================= */

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function buildDestinationConfig(raw, catalogue = packages) {
  // A stored list is treated as a deliberate pin; otherwise the tours are
  // matched live, so catalogue edits flow through to every destination page.
  const pinned = (raw.packageSlugs || [])
    .map((slug) => catalogue.find((item) => item.slug === slug))
    .filter(Boolean);

  const resolvedPackages = pinned.length
    ? pinned
    : packagesForDestination(raw.parent, raw.name, catalogue);

  const packageCount = resolvedPackages.length;
  const liveTourCount = Math.max(1, Math.min(raw.liveTourCount || 3, packageCount || 1));

  // "By Region/City" tiles link out to their own destination page
  // (curated if one exists, otherwise the generic fallback resolver
  // in getDestination() below always produces a working page).
  const regionsWithLinks = {
    ...raw.regions,
    items: raw.regions.items.map((item) => ({
      ...item,
      href: item.href || `/${raw.parent}/${toSlug(item.name)}-tour-packages`,
    })),
  };

  return {
    slug: raw.slug,
    breadcrumbTrail: raw.breadcrumbTrail,
    heading: raw.heading,
    intro: raw.intro,
    introExtra: raw.introExtra,
    reviewsLabel: raw.reviewsLabel,
    listing: {
      // The count line and the tab row were dropped; the cards speak for
      // themselves. Only the live badge is left.
      liveBadgeLabel: `${liveTourCount} Tours Ongoing in ${raw.name} right now!`,
    },
    filters: {
      departureCities: [
        "Mumbai", "Delhi", "Ahmedabad", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Chennai", "Cochin", "Indore",
      ].map((city) => `${city}`),
      countries: raw.countries,
      cities: filterCities(raw, resolvedPackages),
      durations: ["3 - 5 Days", "6 - 8 Days", "9 - 14 Days", "15+ Days"],
      packageTypes: ["Group Tour", "Customized Holidays"],
      specialityTours: ["Family", "Honeymoon Special", "Women's Special", "Seniors' Special", "Short Trips"],
    },
    packages: resolvedPackages,
    joiningLeaving: {
      heading: `View ${raw.name} Tour Packages`,
      cities: raw.joiningLeavingCities,
    },
    // Destination sub-pages (opened from the homepage destination
    // icons / mega menu) skip the By Region/Interest/Season/Duration/
    // Explore/Blogs sections — those stay on /india, /world,
    // /womens-special, /seniors-special and the city pages only.
    hiddenSections: ["regions", "interests", "seasons", "durations", "related", "linkCloud", "blogs"],
    related: raw.related,
    regions: regionsWithLinks,
    interests: {
      title: `${raw.name} Tour Packages By Interest`,
      items: ["Family", "Honeymoon", "Group Tour", "Customized Holidays"],
    },
    seasons: {
      title: `${raw.name} Tour Packages By Season`,
      items: ["Summer", "Monsoon", "Winter", "Spring"],
    },
    durations: {
      title: `Explore ${raw.name} Packages By Duration`,
      items: ["Less than 5 days", "6 to 8 days", "9 to 14 days", "More than 14 days"],
      packages: resolvedPackages.slice(0, 4),
    },
    blogs: [
      `Best places to visit in ${raw.name}`,
      `${raw.name} travel guide`,
      `Top experiences in ${raw.name}`,
      `Packing tips for ${raw.name}`,
      `Stories from our ${raw.name} travellers`,
    ],
    reviews: [
      {
        name: "Anita",
        tour: raw.heading,
        category: "Group Tour",
        review: `A wonderful and well-managed ${raw.name} holiday. Everything from hotels to sightseeing was planned perfectly.`,
      },
      {
        name: "Rakesh",
        tour: raw.heading,
        category: "Family",
        review: `Our tour manager took great care of the group throughout the ${raw.name} itinerary. Highly recommended.`,
      },
      {
        name: "Sneha",
        tour: raw.heading,
        category: "Group Tour",
        review: `Excellent experience with great hotels, sightseeing and transportation across ${raw.name}.`,
      },
    ],
    faqHeading: raw.faqHeading,
    faqSubheading: raw.faqSubheading,
    faqs: raw.faqs,
    seo: {
      heading: `Get to know more about ${raw.name} before booking your tour packages`,
      paragraphs: raw.seoParagraphs,
      extraParagraphs: raw.seoExtraParagraphs,
    },
  };
}

/* =========================================================
   GENERIC FALLBACK RESOLVER

   The navbar mega menu links to well over a hundred
   destinations. Rather than hand-author a curated entry for
   every single one, only the richest/most-searched
   destinations above are curated. Every other mega-menu
   slug is resolved here: we derive a display name from the
   slug, find real matching packages already in packages.js
   (via keyword aliases for country/region names that don't
   literally appear in package text), and fall back to a
   small flagship package set so a listing page is never
   empty. This guarantees zero dead links.
========================================================= */

const ALIAS_KEYWORDS = {
  kashmir: ["srinagar", "gulmarg", "pahalgam", "sonmarg", "kashmir"],
  "leh-ladakh": ["leh", "kargil", "nubra", "pangong", "turtuk", "ladakh"],
  "himachal pradesh": ["shimla", "kufri", "manali", "dharamshala", "dalhousie", "kaza", "spiti"],
  "uttar pradesh": ["agra", "ayodhya", "lucknow", "varanasi", "mathura", "vrindavan", "fatehpur sikri", "jhansi", "prayagraj", "sarnath"],
  uttarakhand: ["haridwar", "rishikesh", "nainital", "mussoorie", "corbett"],
  "punjab and haryana": ["amritsar", "chandigarh", "kurukshetra", "panipat"],
  karnataka: ["bengaluru", "bangalore", "mysore", "coorg", "hampi"],
  "tamil nadu": ["chennai", "ooty", "kodaikanal", "madurai", "rameswaram"],
  "andhra pradesh / telangana": ["hyderabad", "tirupati", "visakhapatnam"],
  sikkim: ["gangtok", "pelling", "sikkim"],
  "west bengal": ["kolkata", "darjeeling", "kalimpong"],
  assam: ["guwahati", "kaziranga"],
  meghalaya: ["shillong", "cherrapunji"],
  gujarat: ["ahmedabad", "dwarka", "somnath", "kutch"],
  maharashtra: ["mumbai", "pune", "lonavala", "mahabaleshwar", "nashik"],
  "madhya pradesh": ["indore", "ujjain", "khajuraho"],
  "rajasthan west and central india": ["jaipur", "udaipur", "jodhpur", "jaisalmer", "rajasthan"],
  "north india": ["delhi", "agra", "shimla", "srinagar", "manali", "amritsar", "kashmir", "ladakh"],
  "south india": ["kerala", "karnataka", "tamil nadu", "hyderabad", "chennai", "bengaluru", "kochi"],
  "east and north east india": ["sikkim", "darjeeling", "assam", "meghalaya", "kolkata", "guwahati"],

  egypt: ["cairo", "luxor", "aswan", "alexandria", "hurghada", "nile"],
  kenya: ["nairobi", "maasai mara", "kenya"],
  "south africa": ["cape town", "johannesburg", "kruger", "south africa"],
  mauritius: ["mauritius", "port louis"],
  seychelles: ["seychelles"],
  tanzania: ["tanzania", "serengeti", "zanzibar"],
  zimbabwe: ["zimbabwe", "victoria falls"],
  france: ["paris", "france"],
  italy: ["rome", "venice", "florence", "milan", "italy"],
  switzerland: ["zurich", "lucerne", "interlaken", "switzerland", "titlis"],
  "united kingdom": ["london", "united kingdom"],
  spain: ["barcelona", "madrid", "spain"],
  germany: ["cologne", "germany", "munich"],
  austria: ["vienna", "austria"],
  greece: ["athens", "santorini", "mykonos", "greece"],
  netherlands: ["amsterdam", "netherlands"],
  japan: ["tokyo", "kyoto", "osaka", "japan"],
  china: ["beijing", "shanghai", "xian", "china"],
  "south korea": ["seoul", "korea"],
  thailand: ["bangkok", "phuket", "pattaya", "krabi", "thailand"],
  malaysia: ["kuala lumpur", "genting", "langkawi", "malaysia"],
  indonesia: ["bali", "denpasar", "ubud", "indonesia"],
  vietnam: ["hanoi", "ho chi minh", "danang", "hoi an", "vietnam"],
  usa: ["new york", "las vegas", "los angeles", "san francisco", "washington", "boston", "orlando"],
  canada: ["toronto", "vancouver", "niagara", "banff"],
  "south america": ["brazil", "argentina", "peru"],
  australia: ["sydney", "melbourne", "cairns", "gold coast", "brisbane"],
  "new zealand": ["auckland", "queenstown", "rotorua", "christchurch"],
  uae: ["dubai", "abu dhabi"],
  oman: ["muscat", "oman"],
  qatar: ["doha", "qatar"],
  turkey: ["istanbul", "cappadocia", "turkey"],
  jordan: ["jordan", "petra"],
  asia: ["thailand", "vietnam", "singapore", "malaysia", "indonesia", "bali", "bangkok", "japan", "china", "korea"],
  "middle east": ["dubai", "abu dhabi", "muscat", "doha", "istanbul"],
  antarctica: ["antarctica"],
};

const INDIA_FLAGSHIP_SLUGS = [
  "jaipur-udaipur-tour-package", "best-of-kashmir", "highlights-of-kerala", "best-of-andaman",
];
const WORLD_FLAGSHIP_SLUGS = [
  "european-highlights", "best-of-thailand", "best-of-dubai", "best-of-japan",
];

function deriveNameFromSlug(slug) {
  const withoutSuffix = slug.replace(/-tour-packages$/, "");
  return withoutSuffix
    .split("-")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

// Words that would match half the catalogue if used on their own. Each of these
// once put a tour on the wrong page: "park" sent Kerala to Jim Corbett, "america"
// sent the USA to Brazil, "africa" sent Egypt to Cape Town, "falls" sent Nepal to
// Niagara. A place whose full name is one of these still matches on the full name.
const WEAK_TOKENS = new Set([
  "north", "south", "east", "west", "central", "india", "indian", "tour",
  "tours", "package", "packages", "and", "the", "new", "city", "valley",
  "park", "national", "falls", "cruise", "town", "cape", "bay", "lake", "beach",
  "island", "islands", "hill", "hills", "fort", "mount", "united", "kingdom",
  "africa", "america", "asia", "europe", "middle",
]);

function matchPackagesByName(name, catalogue = packages) {
  const key = name.toLowerCase();

  // "Leh-Ladakh" has no package of that exact name, but "All of Ladakh" is
  // plainly the right tour — so each strong word in the name counts too.
  const tokens = key
    .split(/[^a-z]+/)
    .filter((token) => token.length >= 4 && !WEAK_TOKENS.has(token));

  const keywords = Array.from(new Set([key, ...(ALIAS_KEYWORDS[key] || []), ...tokens]));

  // Whole words only. A plain substring match put "Jaisalmer Jodhpur" on the
  // Egypt page, because "Jaswant Thada" contains "aswan" — Egypt's city.
  const matchers = keywords.map(
    (keyword) => new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"),
  );

  return catalogue.filter((pkg) => {
    const haystack = `${pkg.title} ${pkg.location} ${pkg.category} ${(pkg.highlights || []).join(" ")}`.toLowerCase();
    return matchers.some((matcher) => matcher.test(haystack));
  });
}

/**
 * The tours a destination shows. Matched live against the catalogue so a
 * package added or renamed in the admin appears on its destination pages
 * straight away — a stored list would freeze them at seed time.
 */


/** A state's filter lists its real cities, leaving out any with no tours yet. */
function filterCities(raw, tours) {
  const cities = getCityNamesUnder(raw.parent, raw.name);
  if (cities.length === 0) return raw.cities;

  return cities.filter((city) =>
    tours.some((pkg) => `${pkg.title} ${pkg.location}`.toLowerCase().includes(city.toLowerCase())),
  );
}

export function packagesForDestination(parent, name, catalogue = packages) {
  // A World page must never list an India tour, or the other way round. Even
  // a perfect keyword match is wrong if it is on the wrong side of the site,
  // so the side is checked before anything else is considered.
  const onThisSide = (list) =>
    list.filter((pkg) => isIndiaPackage(pkg) === (parent === "india"));

  // A state also sells everything in its cities. "Jaipur Mandawa" never says
  // Rajasthan, yet it belongs on the Rajasthan page.
  const found = new Set(
    [name, ...getCityNamesUnder(parent, name)].flatMap((place) => matchPackagesByName(place, catalogue)),
  );

  let matches = onThisSide(catalogue.filter((pkg) => found.has(pkg)));
  if (matches.length) return matches;

  // No tours of its own: show the region's instead (Gulmarg -> Kashmir).
  for (const sibling of getParentNamesFor(parent, name)) {
    matches = onThisSide(matchPackagesByName(sibling, catalogue));
    if (matches.length) return matches;
  }

  return [];
}

function synthesizeDestination(parent, slug, catalogue = packages) {
  const name = deriveNameFromSlug(slug);
  if (!name) return null;

  const matches = packagesForDestination(parent, name, catalogue);

  const packageSlugs = matches.slice(0, 8).map((pkg) => pkg.slug);
  const parentLabel = parent === "india" ? "India" : "World";

  // Real sibling cities/countries from the mega menu column this
  // destination belongs to (e.g. "Aswan" -> Egypt's other cities;
  // "Egypt" -> Egypt's cities + Africa's other countries).
  const siblingCities = getSiblingCityNames(parent, name);
  const siblingRegionNames = parent === "world" ? getSiblingRegionNames(parent, name) : [];

  const raw = {
    slug,
    parent,
    name,
    heading: `${name} Tour Packages`,
    metaTitle: `${name} Tour Packages | ${name} Holiday Packages`,
    metaDescription: `Explore ${name} tour packages with Honor Tour & Travels's curated group holidays, itineraries and travel assistance.`,
    breadcrumbTrail: [parentLabel, `${name} Tour Packages`],
    packageCount: packageSlugs.length,
    liveTourCount: Math.max(1, Math.min(3, packageSlugs.length)),
    reviewsLabel: `${120 + packageSlugs.length * 35} Reviews`,
    intro: `${name} is a wonderful destination for travellers seeking a well-planned holiday, and our tour packages are designed to make the experience comfortable and memorable.`,
    introExtra: `Whether you are travelling with family, as a couple or in a group, our ${name} itineraries combine comfortable stays, guided sightseeing and experienced tour managers throughout your trip.`,
    tabs: [`All ${name} (${packageSlugs.length})`],
    countries: siblingRegionNames,
    cities: siblingCities,
    packageSlugs,
    joiningLeavingCities: ["Tours from Mumbai", "Tours from Delhi", "Tours from Bangalore", "Tours from Hyderabad"],
    related: {
      title: `Explore ${name}`,
      items: [{ name: `${name} Tour Packages` }],
    },
    regions: {
      title: `${name} Packages By Destination`,
      items: matches.slice(0, 6).map((pkg) => ({
        name: pkg.title,
        count: `${pkg.reviews || 0} reviews`,
        href: `/package/${pkg.slug}`,
      })),
    },
    faqHeading: `${name} Frequently Asked Questions`,
    faqSubheading: "We help you prepare for your trip and answer all your travel questions.",
    faqs: [
      {
        question: `What does a ${name} tour package include?`,
        answer: `Our ${name} packages typically include hotel accommodation, selected meals, sightseeing, on-tour transport and tour manager services.`,
      },
      {
        question: `What is the best time to visit ${name}?`,
        answer: `The ideal time to visit ${name} depends on the season and itinerary selected; our travel experts can help you choose the best travel window.`,
      },
      {
        question: `Are ${name} tours suitable for families?`,
        answer: `Yes, our ${name} packages are designed to suit families, couples and groups with a comfortable, well-paced itinerary.`,
      },
    ],
    seoParagraphs: [
      `${name} offers travellers a distinctive holiday experience, combining local culture, sightseeing and comfortable stays into a well-planned itinerary.`,
      `Our ${name} tour packages are designed for families, couples and groups, with options across different durations and travel styles.`,
    ],
    seoExtraParagraphs: [
      `Choosing the right season and duration will help you make the most of your ${name} holiday.`,
    ],
  };

  return { raw, config: buildDestinationConfig(raw) };
}

/**
 * The admin's own page for a place, when this address is not it. The menu builds
 * "/india/sikkim-tour-packages" from the name, but the admin can give the record
 * any slug. Without this the address gets a generic page of its own, and edits
 * to the real record never show up on it.
 */
export function findDestinationSlugByName(parent, slug, records = []) {
  const isOwnPage = (item) => item.parent === parent && item.slug === slug;
  if (records.some(isOwnPage) || rawDestinations.some(isOwnPage)) return null;

  const wanted = slug.replace(/-tour-packages$/, "");
  const match = records.find((item) => item.parent === parent && toSlug(item.name) === wanted);
  return match?.slug ?? null;
}

export function getDestination(parent, slug, records, catalogue) {
  // `records` comes from the destination collection; this file's own list is
  // the fallback, and anything in neither is synthesized as before.
  // Stored records win, and this file fills any gap — otherwise a slug that
  // exists here but not in the collection would fall through to the generic
  // synthesizer and lose its curated content.
  const source = records?.length
    ? [...records, ...rawDestinations.filter((item) => !records.some((r) => r.parent === item.parent && r.slug === item.slug))]
    : rawDestinations;
  const raw = source.find((item) => item.parent === parent && item.slug === slug);
  if (raw) return { raw, config: buildDestinationConfig(raw, catalogue) };
  return synthesizeDestination(parent, slug, catalogue);
}

export function getDestinationParams(parent) {
  return rawDestinations
    .filter((item) => item.parent === parent)
    .map((item) => ({ destination: item.slug }));
}

export function getDestinationHref(name) {
  const raw = rawDestinations.find((item) => item.name === name);
  if (!raw) return null;
  return `/${raw.parent}/${raw.slug}`;
}
