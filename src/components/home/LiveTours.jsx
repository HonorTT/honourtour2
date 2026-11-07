"use client";

import Image from "@/components/common/SiteImage";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { homeData } from "@/data/homeData";

/* =========================================================
   LIVE TOURS
   Deliberately unlike the destination cards above it: a dark
   panel instead of white, wide landscape tiles instead of
   tall portrait ones, and the copy beside the tiles rather
   than under them — so the two sections read as two
   different things while scrolling.
========================================================= */

const AUTO_SLIDE_MS = 3000;

export default function LiveTours({ cards, trustReviews }) {
  const reviews = trustReviews?.length ? trustReviews : homeData.trustReviews.reviews;
  const liveCards = cards?.length ? cards : homeData.liveTours.cards;
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((i) => (i + 1) % reviews.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const review = reviews[reviewIndex];

  return (
    <section className="w-full py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden bg-[#0B3B63] sm:rounded-[26px]">
        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:items-center lg:gap-10 lg:p-10">
          {/* COPY */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5EEAD4]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live right now
            </span>

            <h2 className="mt-4 text-[24px] font-bold leading-tight text-white sm:text-[30px]">
              27+ tours are on the road with Honor Tour &amp; Travels
            </h2>

            <p className="mt-3 text-[14px] font-light leading-relaxed text-white/70">
              Guests everywhere are travelling with ease and care — step into your journey.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="flex h-[44px] items-center gap-2 rounded-full bg-[#FF7A1A] px-5 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#E56A0F]"
              >
                Upcoming Departures
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-[13px] font-light italic text-white/60">in the next 15 days</span>
            </div>
          </div>

          {/* WIDE LIVE TILES */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {liveCards.map((card) => (
              <div
                key={card.destination}
                className="group relative h-[112px] overflow-hidden rounded-[14px] sm:h-[132px]"
                style={
                  card.image
                    ? undefined
                    : {
                        backgroundImage: `linear-gradient(135deg, ${card.color1} 0%, ${card.color2} 50%, ${card.color3} 100%)`,
                      }
                }
              >
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.destination}
                    fill
                    sizes="(max-width: 640px) 45vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute inset-x-3 bottom-2.5">
                  <p className="truncate text-[14px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">{card.destination}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-light text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {card.liveTourCount} tours live
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW STRIP */}
        <div className="border-t border-white/10 px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <CheckCircle className="hidden h-5 w-5 shrink-0 text-emerald-400 sm:block" />

            <p className="min-w-0 flex-1 text-[14px] font-light leading-relaxed text-white/85">
              &ldquo;{review.excerpt}&rdquo;
              <span className="ml-2 whitespace-nowrap text-[13px] font-semibold text-white">
                — {review.guest}
              </span>
              <span className="ml-2 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/70">
                {review.destination}
              </span>
            </p>

            <div className="flex shrink-0 gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === reviewIndex ? "w-5 bg-[#5EEAD4]" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
