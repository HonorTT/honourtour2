"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { homeData } from "@/data/homeData";

/* =========================================================
   ILLUSTRATED POSTER SLIDES
   No real photo assets are available in this project, so
   these three "poster" slides are hand-built inline SVGs
   (gradient sky + simple landmark shapes + the promotional
   copy baked directly into the artwork) rendered through a
   normal <img> with object-fit: cover — same as a real photo
   poster would be, just illustrated instead of photographic.
========================================================= */

function svgToDataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const FALLBACK_SLIDES = [{ id: "welcome", type: "welcome" }];

/** An admin-defined poster: gradient panel, headline, price and a CTA line. */
function PosterSlide({ slide, compact = false }) {
  const from = slide.gradientFrom || "#0B3B63";
  const via = slide.gradientVia || "#0F4C81";
  const to = slide.gradientTo || "#17BEBB";

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center p-5 text-center"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to})` }}
    >
      {slide.title ? (
        <p className={`font-black uppercase leading-tight tracking-tight text-white ${compact ? "text-[20px]" : "text-[34px]"}`}>
          {slide.title}
        </p>
      ) : null}

      {slide.subtitle ? (
        <p className={`mt-2 text-white/85 ${compact ? "text-[12px]" : "text-[15px]"}`}>{slide.subtitle}</p>
      ) : null}

      {slide.price ? (
        <p className={`mt-3 font-black text-[#FBB627] ${compact ? "text-[16px]" : "text-[26px]"}`}>{slide.price}</p>
      ) : null}

      {slide.ctaLabel ? (
        <span className={`mt-4 rounded-full bg-white/15 px-4 py-2 font-semibold text-white ring-1 ring-white/30 ${compact ? "text-[11px]" : "text-[13px]"}`}>
          {slide.ctaLabel}
        </span>
      ) : null}
    </div>
  );
}

const AUTO_SLIDE_MS = 5000;
const SWIPE_THRESHOLD = 40;

function WelcomeSlide() {
  const { mostLovedTours } = homeData;

  return (
    <div className="flex h-full flex-col justify-center bg-white p-5 sm:p-6">
      <div className="text-center">
        <h3 className="text-[24px] font-black leading-[1.1] text-[#0F172A] sm:text-[26px]">
          Honor Tour & Travels is Here!
        </h3>
        <p className="mt-1 text-[14px] font-bold text-[#0F4C81]">PAISA VASOOL Tours</p>

        <span className="mt-3 inline-block rounded-full bg-[#0F172A] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#FBB627]">
          Now welcoming you at
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {mostLovedTours.promoDestinations.map((dest) => (
          <div key={dest.name} className="overflow-hidden rounded-[10px] border border-[#E5E7EB]">
            <div className="relative h-[150px] bg-gradient-to-br from-[#4DA8DA] via-[#0F4C81] to-[#17BEBB]" />
            <div className="flex items-center justify-center gap-1 bg-white py-1.5">
              <MapPin className="h-3 w-3 flex-shrink-0 text-[#0F4C81]" />
              <span className="truncate text-[11px] font-semibold text-[#0F172A]">{dest.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-[14px] italic leading-relaxed text-[#475569]">
        Chalo, Bag Bharo, Nikal Pado!
      </p>

      <div className="mt-5 border-t border-[#E5E7EB] pt-3">
        <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#60646C]">
          India &bull; Group Tours &bull; Customized Holidays
        </p>
      </div>
    </div>
  );
}

function WelcomeCardCompact() {
  const { mostLovedTours } = homeData;

  return (
    <div className="flex h-full flex-col justify-center bg-white px-3.5 py-3">
      <div className="text-center">
        <h3 className="text-[16px] font-black leading-tight text-[#0F172A]">Honor Tour & Travels is Here!</h3>
        <p className="text-[11px] font-bold text-[#0F4C81]">PAISA VASOOL Tours</p>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {mostLovedTours.promoDestinations.map((dest) => (
          <div key={dest.name} className="overflow-hidden rounded-[6px] border border-[#E5E7EB]">
            <div className="h-[30px] bg-gradient-to-br from-[#4DA8DA] via-[#0F4C81] to-[#17BEBB]" />
            <div className="bg-white py-1 text-center">
              <span className="truncate text-[9px] font-semibold text-[#0F172A]">{dest.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-center text-[11px] italic leading-snug text-[#475569]">
        Chalo, Bag Bharo, Nikal Pado!
      </p>
    </div>
  );
}

export default function PromoCarousel({ slides }) {
  const promoSlides = slides?.length ? slides : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = promoSlides.length;

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(goNext, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;

    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();

    touchStartX.current = null;
  }

  return (
    <>
      {/* ================= MOBILE-ONLY (<768px): horizontal multi-card swipe ================= */}
      <div className="flex gap-2.5 overflow-x-auto px-1 pb-1 no-scrollbar snap-x snap-mandatory md:hidden">
        {promoSlides.map((slide) => (
          <div
            key={slide.id}
            className="h-[190px] w-[88%] flex-shrink-0 snap-start overflow-hidden rounded-[10px] border border-[#E5E7EB] shadow-sm"
          >
            {slide.type === "welcome" ? <WelcomeCardCompact /> : <PosterSlide slide={slide} compact />}
          </div>
        ))}
      </div>

      {/* ================= DESKTOP (>=768px, unchanged) ================= */}
      <div
        className="relative hidden h-[420px] overflow-hidden rounded-[16px] border border-[#E5E7EB] shadow-sm md:block lg:h-[460px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {promoSlides.map((slide) => (
            <div key={slide.id} className="h-full w-full flex-shrink-0">
              {slide.type === "welcome" ? <WelcomeSlide /> : <PosterSlide slide={slide} />}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-md transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-md transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {promoSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/60"
              } ${slide.type === "welcome" ? "!bg-[#0F4C81]/30" : ""} ${
                i === index && slide.type === "welcome" ? "!bg-[#0F4C81]" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
