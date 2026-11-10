import { notFound } from "next/navigation";
import Link from "@/components/common/SiteLink";
import { ChevronRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/common/FAQAccordion";
import HotelGallery from "@/components/hotels/HotelGallery";
import HotelHeader from "@/components/hotels/HotelHeader";
import HotelAbout from "@/components/hotels/HotelAbout";
import HotelBookingCard from "@/components/hotels/HotelBookingCard";
import HotelAmenities from "@/components/hotels/HotelAmenities";
import HotelRoomList from "@/components/hotels/HotelRoomList";
import HotelLocation from "@/components/hotels/HotelLocation";
import HotelReviews from "@/components/hotels/HotelReviews";
import HotelPolicies from "@/components/hotels/HotelPolicies";
import { db } from "@/lib/db";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema, hotelSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const hotels = await db.hotel.findMany({ select: { slug: true, citySlug: true } });
  return hotels.map((h) => ({ city: h.citySlug, hotel: h.slug }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug, hotel: slug } = await params;
  const hotel = await db.hotel.findUnique({ where: { slug } });

  if (!hotel) {
    return buildMetadata({
      title: "Hotel Not Found",
      description: "The hotel you are looking for is not available.",
      path: `/hotels/${citySlug}/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${hotel.name}, ${hotel.city} | Hotel Booking`,
    description: hotel.description,
    path: `/hotels/${hotel.citySlug}/${hotel.slug}`,
    image: hotel.image,
  });
}

export default async function HotelDetailPage({ params }) {
  const { city: citySlug, hotel: slug } = await params;
  const hotel = await db.hotel.findUnique({ where: { slug } });

  if (!hotel || hotel.citySlug !== citySlug) {
    notFound();
  }

  const faqs = [
    {
      question: `What time is check-in and check-out at ${hotel.name}?`,
      answer: `Check-in starts at ${hotel.checkInTime} and check-out is by ${hotel.checkOutTime}. Early check-in or late check-out can be requested and is subject to availability.`,
    },
    {
      question: "Is breakfast included in the room price?",
      answer: "Inclusions vary by room type — please check each room's amenities above, or ask our team to confirm meal inclusions before booking.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, free cancellation is available up to 48 hours before check-in. Cancellation charges may apply closer to the check-in date.",
    },
  ];

  return (
    <>
      <JsonLd
        schema={[
          hotelSchema({
            name: hotel.name,
            description: hotel.description,
            image: hotel.image,
            address: hotel.address,
            rating: hotel.rating,
            reviewCount: hotel.reviewCount,
            pricePerNight: hotel.pricePerNight,
            path: `/hotels/${hotel.citySlug}/${hotel.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Hotels", href: "/hotels" },
            { name: hotel.city, href: `/hotels/${hotel.citySlug}` },
            { name: hotel.name, href: `/hotels/${hotel.citySlug}/${hotel.slug}` },
          ]),
        ]}
      />
      <Navbar />

      <main className="bg-[#F7F9FC]">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1240px] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-1 text-[12px] text-[#777]">
              <Link href="/" className="hover:text-[#0F4C81]">Home</Link>
              <ChevronRight size={11} />
              <Link href="/hotels" className="hover:text-[#0F4C81]">Hotels</Link>
              <ChevronRight size={11} />
              <Link href={`/hotels/${hotel.citySlug}`} className="hover:text-[#0F4C81]">{hotel.city}</Link>
              <ChevronRight size={11} />
              <span>{hotel.name}</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            GALLERY
        ===================================================== */}
        <section className="bg-white pb-6 pt-3">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <HotelGallery name={hotel.name} image={hotel.image} />
          </div>
        </section>

        {/* =====================================================
            HEADER + ABOUT / BOOKING CARD
        ===================================================== */}
        <section className="bg-white pb-8">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <HotelHeader hotel={hotel} />

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <HotelAbout description={hotel.description} />
              <HotelBookingCard hotel={hotel} />
            </div>
          </div>
        </section>

        {/* =====================================================
            AMENITIES
        ===================================================== */}
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <HotelAmenities amenities={hotel.amenities} />
          </div>
        </section>

        {/* =====================================================
            ROOMS
        ===================================================== */}
        <section id="rooms" className="py-6 sm:py-8">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
              <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">Available Rooms</h2>
              <p className="mt-1 text-[14px] text-[#64748B]">Choose a room type and book directly.</p>

              <div className="mt-5">
                <HotelRoomList hotelName={hotel.name} hotelImage={hotel.image} rooms={hotel.rooms} />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LOCATION / NEARBY
        ===================================================== */}
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <HotelLocation address={hotel.address} nearbyAttractions={hotel.nearbyAttractions} />
          </div>
        </section>

        {/* =====================================================
            REVIEWS
        ===================================================== */}
        <HotelReviews rating={hotel.rating} reviewCount={hotel.reviewCount} />

        {/* =====================================================
            POLICIES
        ===================================================== */}
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <HotelPolicies checkInTime={hotel.checkInTime} checkOutTime={hotel.checkOutTime} />
          </div>
        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}
        <section className="pb-10 pt-2 sm:pb-12">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
              <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">
                Frequently Asked Questions
              </h2>
              <div className="mt-5">
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* spacer so the mobile sticky price bar doesn't cover the footer */}
      <div className="h-[76px] lg:hidden" />

      <Footer />
    </>
  );
}
