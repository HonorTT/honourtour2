"use client";

import Image from "@/components/common/SiteImage";
import { useState } from "react";
import { getAirlineBadge } from "./airlineBadge";

function AirlineLogo({ airline, airlines }) {
  const badge = getAirlineBadge(airline, airlines);
  const [imgFailed, setImgFailed] = useState(false);

  if (badge.logoUrl && !imgFailed) {
    return (
      <div className="relative flex h-11 w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:h-16 sm:w-24 sm:rounded-[12px] sm:p-2">
        <Image
          src={badge.logoUrl}
          alt={airline}
          className="object-contain"
          fill
          sizes="(max-width: 640px) 68px, 96px"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-[14px] font-bold shadow-[0_2px_6px_rgba(0,0,0,0.15)] sm:h-16 sm:w-16 sm:rounded-[12px] sm:text-[16px]"
      style={{ backgroundColor: badge.bg, color: badge.text }}
    >
      {badge.code}
    </div>
  );
}

export default function FlightResultCard({ flight, from, to, airlines = [], onBookNow }) {
  return (
    <article className="grid grid-cols-1 gap-2.5 rounded-[14px] border border-[#E5E7EB] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[1.3fr_2fr_0.9fr] sm:items-center sm:gap-4 sm:p-4">
      {/* AIRLINE — the fare rides along on phones, where there is room to its right */}
      <div className="flex items-center gap-3">
        <AirlineLogo airline={flight.airline} airlines={airlines} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#0F172A]">{flight.airline}</p>
          <p className="text-[12px] text-[#6B7280]">{flight.flightNumber}</p>
        </div>

        <div className="ml-auto text-right sm:hidden">
          <p className="text-[17px] font-bold leading-tight text-[#0F172A]">
            ₹{flight.price.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-[#6B7280]">/ person</p>
        </div>
      </div>

      {/* TIMES */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="text-center">
          <p className="text-[16px] font-bold text-[#0F172A]">{flight.departureTime}</p>
          <p className="text-[12px] text-[#6B7280]">
            {flight.fromCode} {from}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-1">
          <p className="text-[12px] text-[#6B7280]">{flight.duration}</p>
          <div className="my-1.5 h-px w-full bg-[#D1D5DB]" />
          <p className="text-[12px] font-medium text-[#0F4C81]">{flight.stopsLabel}</p>
        </div>

        <div className="text-center">
          <p className="text-[16px] font-bold text-[#0F172A]">{flight.arrivalTime}</p>
          <p className="text-[12px] text-[#6B7280]">
            {flight.toCode} {to}
          </p>
        </div>
      </div>

      {/* PRICE / CTA */}
      <div className="flex items-center justify-between gap-3 border-t border-[#F0F0F0] pt-2.5 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-[#F0F0F0] sm:pt-0 sm:pl-4">
        <div className="sm:text-right">
          <p className="hidden text-[17px] font-bold text-[#0F172A] sm:block">
            ₹{flight.price.toLocaleString("en-IN")}
            <span className="ml-1 text-[12px] font-normal text-[#6B7280]">/ person</span>
          </p>
          <p
            className={`text-[12px] font-medium ${
              flight.status === "Few Seats Left" ? "text-orange-600" : "text-green-700"
            }`}
          >
            {flight.status}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(flight)}
          className="h-[42px] flex-1 rounded-[10px] bg-[#FF7A1A] px-4 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F] sm:w-auto sm:flex-none"
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
