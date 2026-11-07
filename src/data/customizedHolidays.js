/* =========================================================
   CUSTOMIZED HOLIDAYS MEGA MENU
   India items reuse the SAME dynamic destination routes
   as the India/World mega menus (src/app/india/[destination],
   src/app/world/[destination]) via destinations.js's resolver
   — no duplicate pages. Travel Style reuses the speciality
   tour routes. Holiday Services reuses existing feature pages
   (Hotels/Flights/Transport) where they exist, and anchors on
   /customized-holidays for the rest (no dedicated pages yet).
========================================================= */

export const CUSTOMIZED_HOLIDAYS_MENU = {
  indiaHolidays: {
    heading: "India Holidays",
    items: [
      { name: "Kashmir", href: "/india/kashmir-tour-packages" },
      { name: "Kerala", href: "/india/kerala-tour-packages" },
      { name: "Rajasthan", href: "/india/rajasthan-tour-packages" },
      { name: "Goa", href: "/india/goa-tour-packages" },
      { name: "Himachal Pradesh", href: "/india/himachal-pradesh-tour-packages" },
      { name: "Andaman", href: "/india/andaman-tour-packages" },
      { name: "North East India", href: "/india/east-and-north-east-india-tour-packages" },
    ],
  },
  travelStyle: {
    heading: "Travel Style",
    items: [
      { name: "Honeymoon", href: "/speciality-tours/honeymoon" },
      { name: "Family Holiday", href: "/speciality-tours/family" },
      { name: "Couple Holiday", href: "/speciality-tours/couple" },
      { name: "Friends Trip", href: "/speciality-tours/friends" },
      { name: "Solo Trip", href: "/speciality-tours/solo" },
      { name: "Luxury Holiday", href: "/speciality-tours/luxury" },
      { name: "Adventure Holiday", href: "/speciality-tours/adventure" },
    ],
  },
  holidayServices: {
    heading: "Holiday Services",
    items: [
      { name: "Hotels", href: "/hotels" },
      { name: "Flights", href: "/flights" },
      { name: "Transfers", href: "/transport" },
      { name: "Sightseeing", href: "/customized-holidays#sightseeing" },
      { name: "Activities", href: "/customized-holidays#activities" },
      { name: "Travel Insurance", href: "/customized-holidays#travel-insurance" },
    ],
  },
};

export const PLAN_MY_HOLIDAY_HREF = "/customized-holidays";
