import { notFound } from "next/navigation";
import Link from "@/components/common/SiteLink";
import { ChevronRight, Hotel as HotelIcon } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HotelCard from "@/components/hotels/HotelCard";
import { db } from "@/lib/db";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const hotels = await db.hotel.findMany({ select: { citySlug: true } });
  const unique = Array.from(new Set(hotels.map((h) => h.citySlug)));
  return unique.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const hotel = await db.hotel.findFirst({ where: { citySlug } });

  if (!hotel) {
    return buildMetadata({
      title: "Hotels Not Found",
      description: "The city you are looking for is not available.",
      path: `/hotels/${citySlug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `Hotels in ${hotel.city} | Best Deals & Verified Properties`,
    description: `Browse and book hotels in ${hotel.city} with Honor Tour & Travels.`,
    path: `/hotels/${citySlug}`,
  });
}

export default async function HotelCityPage({ params }) {
  const { city: citySlug } = await params;
  const hotels = await db.hotel.findMany({ where: { citySlug }, orderBy: { order: "asc" } });

  if (hotels.length === 0) {
    notFound();
  }

  const cityName = hotels[0].city;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Hotels", href: "/hotels" },
          { name: cityName, href: `/hotels/${citySlug}` },
        ])}
      />
      <Navbar />

      <main className="bg-white">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section
          className="relative overflow-hidden px-3 pb-8 pt-6 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, #0B3B63, #4DA8DA)" }}
        >
          <HotelIcon className="pointer-events-none absolute right-6 top-6 h-20 w-20 text-white/10" />

          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-300">
              <Link href="/" className="hover:text-[#5EEAD4]">Home</Link>
              <ChevronRight size={11} />
              <Link href="/hotels" className="hover:text-[#5EEAD4]">Hotels</Link>
              <ChevronRight size={11} />
              <span className="text-white">{cityName}</span>
            </div>

            <h1 className="mt-3 text-[28px] font-bold text-white sm:text-[36px]">
              Hotels in {cityName}
            </h1>
            <p className="mt-2 text-[13px] text-slate-300">
              {hotels.length} hotel{hotels.length > 1 ? "s" : ""} available
            </p>
          </div>
        </section>

        {/* =====================================================
            HOTEL LIST
        ===================================================== */}
        <section className="px-3 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px] space-y-4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
