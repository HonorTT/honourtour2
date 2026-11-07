import Link from "next/link";
import {
  Compass, MapPinned, ShieldCheck, Phone,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CUSTOMIZED_HOLIDAYS_MENU } from "@/data/customizedHolidays";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customized Holidays | Plan Your Own India Itinerary",
  description:
    "Plan a fully customized holiday with Honor Tour & Travels — pick your destination, travel style and services, and let our experts build your itinerary.",
  path: "/customized-holidays",
});

const SERVICE_SECTIONS = [
  {
    id: "sightseeing",
    icon: MapPinned,
    title: "Sightseeing",
    description: "Curated sightseeing itineraries covering must-see landmarks and hidden gems at every destination, planned around a comfortable pace.",
  },
  {
    id: "activities",
    icon: Compass,
    title: "Activities",
    description: "From guided walks and water sports to cultural experiences, we can add on-ground activities that match your interests.",
  },
  {
    id: "travel-insurance",
    icon: ShieldCheck,
    title: "Travel Insurance",
    description: "Optional travel insurance can be added to your package for added peace of mind during your trip.",
  },
];

function ColumnList({ heading, items }) {
  return (
    <div>
      <h3 className="text-[14px] font-bold text-[#0F172A]">{heading}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[13px] text-[#475569] no-underline hover:text-[#0F4C81] hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CustomizedHolidaysPage() {
  const { indiaHolidays, travelStyle, holidayServices } = CUSTOMIZED_HOLIDAYS_MENU;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Customized Holidays", href: "/customized-holidays" },
        ])}
      />
      <Navbar />

      <main className="bg-white">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section
          className="relative overflow-hidden px-3 py-14 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, #0B3B63, #4DA8DA)" }}
        >
          <Compass className="pointer-events-none absolute right-6 top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32" />
          <div className="relative mx-auto w-full max-w-[1280px] text-center text-white">
            <h1 className="text-[30px] font-bold sm:text-[38px]">Customized Holidays</h1>
            <p className="mx-auto mt-2 max-w-[600px] text-[15px] text-white/80">
              Pick a destination, choose your travel style and let our experts build a holiday
              itinerary designed just for you.
            </p>
          </div>
        </section>

        {/* =====================================================
            BROWSE BY DESTINATION / STYLE / SERVICE
        ===================================================== */}
        <section className="px-3 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid grid-cols-2 gap-8 rounded-[16px] border border-[#E5E7EB] bg-[#F7FAFC] p-6 sm:p-8 lg:grid-cols-3">
              <ColumnList heading={indiaHolidays.heading} items={indiaHolidays.items} />
              <ColumnList heading={travelStyle.heading} items={travelStyle.items} />
              <ColumnList heading={holidayServices.heading} items={holidayServices.items} />
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}
        <section className="bg-[#F7F9FC] px-3 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-center text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
              What&apos;s Included in Holiday Services
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SERVICE_SECTIONS.map(({ id, icon: Icon, title, description }) => (
                <div
                  key={id}
                  id={id}
                  className="scroll-mt-24 rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5] text-[#17BEBB]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-[#0F172A]">{title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-[#6B7280]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PLAN MY HOLIDAY — CALLBACK
        ===================================================== */}
        <section className="px-3 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[640px] rounded-[16px] border border-[#E5E7EB] bg-[#F7FAFC] p-6 text-center sm:p-8">
            <h2 className="text-[22px] font-bold text-[#0F172A] sm:text-[26px]">Plan My Holiday</h2>
            <p className="mt-2 text-[14px] text-[#64748B]">
              Share your details and our travel experts will help design a customized itinerary for you.
            </p>

            <form className="mt-6 space-y-3 text-left">
              <input
                type="text"
                placeholder="Full Name"
                className="h-[46px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] outline-none transition-colors focus:border-[#17BEBB]"
              />
              <div className="flex h-[46px] items-center rounded-[10px] border border-[#D1D5DB] focus-within:border-[#17BEBB]">
                <span className="flex h-full items-center border-r border-[#D1D5DB] px-3 text-[13px] text-[#475569]">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="h-full min-w-0 flex-1 px-3 text-[14px] outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Preferred Destination (optional)"
                className="h-[46px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] outline-none transition-colors focus:border-[#17BEBB]"
              />

              <button
                type="submit"
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F]"
              >
                <Phone size={16} />
                Request a Callback
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
