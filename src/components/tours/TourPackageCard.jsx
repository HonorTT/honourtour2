"use client";

import Image from "@/components/common/SiteImage";
import Link from "@/components/common/SiteLink";

import EnquiryTrigger from "@/components/common/EnquiryTrigger";
import { CalendarDays, Clock3, Heart, MapPin, MessageCircle, Scale } from "lucide-react";
import { getDestinationImage } from "@/data/destinationImages";

/* =========================================================
   PREMIUM TOUR PACKAGE CARD
   Single responsive layout (no separate mobile/desktop
   markup) used across related-tours, India/World listing
   and speciality listing grids.
========================================================= */

function badgeStyle(tag) {
  if (tag.includes("GROUP")) return "bg-[#E6F7F5] text-[#0F4C81]";
  if (tag.includes("SALE")) return "bg-[#FFF1E6] text-[#E56A0F]";
  return "bg-[#FDEAF3] text-[#C0316B]";
}

function stopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}

export default function TourPackageCard({ item }) {
  const image = item.image || getDestinationImage(item.title);

  return (
    <Link
      href={`/package/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white no-underline shadow-[0_4px_16px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)]"
    >
      {/* IMAGE */}
      <div className="relative h-[132px] w-full shrink-0 overflow-hidden sm:h-[146px]">
        <Image
          src={image}
          alt={item.imageAlt || item.title}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${badgeStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-label={`Save ${item.title}`}
            onClick={stopPropagation}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#0F172A] shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-[#E11D48]"
          >
            <Heart size={15} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-3.5">
        <div>
          <h3 className="text-[15px] font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#0F4C81] sm:text-[16.5px]">
            {item.title}
          </h3>
          <p className="mt-0.5 text-[12px] font-semibold text-[#0F4C81]">∞ All Inclusive</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#475569]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={12} className="text-[#94A3B8]" />
            {item.days}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#94A3B8]" />
            {item.cities}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} className="text-[#94A3B8]" />
            {item.nights}
          </span>
        </div>

        <div className="border-t border-[#EEF1F5] pt-1.5">
          <p className="text-[11px] font-semibold text-[#16A34A]">Tour Highlights</p>
          <div className="mt-0.5 flex min-w-0 items-baseline gap-1.5">
            <p className="truncate text-[12px] text-[#64748B]">{item.highlights}</p>
            <span className="shrink-0 text-[11px] font-semibold text-[#0F4C81]">More</span>
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-auto rounded-[12px] bg-[#F7FAFC] px-3 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10.5px] text-[#64748B]">Starting price per person</p>
              <p className="mt-0.5 text-[19px] font-extrabold leading-none text-[#0F172A] sm:text-[21px]">
                {item.price}
              </p>
            </div>

            <div className="flex h-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#FF7A1A] px-3.5 text-[12px] font-bold text-white transition-colors group-hover:bg-[#E56A0F]">
              View Details
            </div>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569]">
          <button
            type="button"
            onClick={stopPropagation}
            className="flex items-center gap-1.5 transition-colors hover:text-[#0F4C81]"
          >
            <Scale size={13} />
            Compare
          </button>

          <EnquiryTrigger
            subject={item.title}
            quote={item.quote}
            stopPropagation
            className="flex items-center gap-1.5 transition-colors hover:text-[#0F4C81]"
          >
            <MessageCircle size={13} />
            Enquire Now
          </EnquiryTrigger>
        </div>
      </div>
    </Link>
  );
}
