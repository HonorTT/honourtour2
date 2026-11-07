"use client";

import { useState } from "react";
import Image from "@/components/common/SiteImage";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import CardRail from "@/components/common/CardRail";

/* =========================================================
   POPULAR DESTINATIONS
   A category rail on the left and image-led cards on the
   right: the region sits in a pill on the photo, and the
   name, tour count and Book now button share a frosted
   panel resting on the bottom of the image.
========================================================= */

export default function PopularDestinations({ items = [], groups = [] }) {
  const [active, setActive] = useState(groups[0] ?? "All");

  const visible = active === "All" ? items : items.filter((item) => item.region === active);

  return (
    <section className="w-full px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
            Kashmir &amp; beyond
          </h2>
          <p className="mt-1.5 text-[14px] font-light text-[#60646C]">
            Srinagar, Gulmarg, Pahalgam and Sonmarg — plus the other India tours we run.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-6">
        {/* CATEGORY PANEL */}
        <div className="rounded-[18px] bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.07)] lg:self-start lg:p-4">
          <p className="px-1 pb-2 text-[14px] font-bold text-[#0F172A] lg:pb-3">Package Offers</p>

          <div className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible">
            {groups.map((group, index) => {
              const isActive = group === active;

              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActive(group)}
                  className={`flex shrink-0 items-center justify-between gap-2 rounded-[12px] px-3 py-2.5 text-[13px] transition lg:w-full lg:rounded-[10px] ${
                    isActive
                      ? "bg-[#E6F7F5] font-semibold text-[#0F172A]"
                      : "font-medium text-[#64748B] hover:bg-[#F7FAFC]"
                  } ${index > 0 ? "lg:border-t lg:border-[#F1F5F9]" : ""}`}
                >
                  {group}
                  {isActive && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17BEBB] text-white">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CARDS */}
        <CardRail
          className="flex gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory"
          label="destinations"
        >
          {visible.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative block h-[258px] w-[230px] shrink-0 snap-start overflow-hidden rounded-[18px] no-underline shadow-[0_4px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(15,23,42,0.16)] sm:w-[250px]"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="250px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

              {/* REGION PILL */}
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#0F172A] backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[#17BEBB]" />
                {item.region}
              </span>

              {/* FROSTED INFO PANEL */}
              <div className="absolute inset-x-2.5 bottom-2.5 rounded-[14px] bg-white/92 p-2.5 backdrop-blur-md">
                <p className="truncate text-[14px] font-semibold leading-tight text-[#0F172A]">
                  {item.name}
                </p>
                {item.tagline ? (
                  <p className="truncate text-[11px] font-medium text-[#0F4C81]">{item.tagline}</p>
                ) : null}
                <p className="mt-0.5 text-[11px] font-light text-[#6B7280]">{item.tourCount}</p>

                <span className="mt-2 flex h-8 w-full items-center justify-center rounded-[9px] bg-[#FF7A1A] text-[11.5px] font-bold text-white transition group-hover:bg-[#E56A0F]">
                  Book now
                </span>
              </div>
            </Link>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
