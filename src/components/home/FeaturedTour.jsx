"use client";

import Image from "@/components/common/SiteImage";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeData } from "@/data/homeData";
import BookingModal from "@/components/package/BookingModal";

const AUTO_SLIDE_MS = 5000;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
}

function parseDays(days) {
  return Number(String(days).match(/\d+/)?.[0]) || 1;
}

export default function FeaturedTour({ slides }) {
  const tours = slides?.length ? slides : homeData.featuredTour;
  const [index, setIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const featuredTour = tours[index];

  const goPrev = () => setIndex((i) => (i === 0 ? tours.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === tours.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (bookingOpen) return;
    const timer = setInterval(goNext, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, bookingOpen]);

  const bookingSummary = {
    slug: slugify(featuredTour.title),
    title: featuredTour.title,
    departureCity: featuredTour.departure.replace(/^Ex-/, ""),
    departureDate: featuredTour.date,
    days: parseDays(featuredTour.days),
    nights: Math.max(parseDays(featuredTour.days) - 1, 1),
    guests: 1,
    totalPrice: parsePrice(featuredTour.price),
  };

  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[14px]">
          <div
            className="relative h-[400px] w-full transition-all duration-300 sm:h-[380px] lg:h-[440px]"
            style={
              featuredTour.image
                ? undefined
                : { backgroundImage: `linear-gradient(135deg, #0B3B63 0%, #4DA8DA 100%)` }
            }
          >
            {featuredTour.image && (
              <Image
                src={featuredTour.image}
                alt={featuredTour.title}
                className="object-cover"
                fill
                sizes="100vw"
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(11,59,99,0.88) 0%, rgba(11,59,99,0.55) 45%, rgba(11,59,99,0.05) 100%)`,
              }}
            />

            {!featuredTour.image && (
              <div className="absolute inset-0">
                <div className="absolute left-8 top-12 h-32 w-32 rounded-full border-2 border-white/20" />
                <div className="absolute bottom-8 right-12 h-40 w-40 rounded-full bg-white/5" />
              </div>
            )}
          </div>

          <div key={index} className="absolute inset-0 flex flex-col justify-center px-6 transition-opacity duration-300 sm:px-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
              {featuredTour.region}
            </p>
            <h3 className="mt-2 text-[28px] font-black text-white sm:text-[40px]">
              {featuredTour.title}
            </h3>
            <p className="mt-3 text-[13px] text-white/90">{featuredTour.locations}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[13px] font-semibold text-white">
                {featuredTour.days} | {featuredTour.date} | from {featuredTour.departure}
              </p>
              <p className="text-[18px] font-black text-[#A9D8F0]">{featuredTour.price}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="rounded-full bg-white px-6 py-2 text-[13px] font-bold text-[#0F172A] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#F7FAFC] active:scale-95"
              >
                Book now
              </button>
              <p className="text-[11px] text-white/70">*T&C Apply</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-1">
            {tours.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-200 ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 flex gap-2 sm:bottom-6 sm:right-6">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={goPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next tour"
              onClick={goNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} summary={bookingSummary} />
    </section>
  );
}
