"use client";

import Image from "@/components/common/SiteImage";
import { useState } from "react";
import { Bus, Car, Minus, Plus, Snowflake, Users } from "lucide-react";

const TYPE_STYLE = {
  Car: { bg: "#0F4C81", Icon: Car },
  Bus: { bg: "#5B2A86", Icon: Bus },
};

export default function TransportOptionCard({ option, route, onBookNow }) {
  const style = TYPE_STYLE[option.type] || TYPE_STYLE.Car;
  const Icon = style.Icon;
  const [days, setDays] = useState(1);

  const perDay = route ? option.basePrice + option.pricePerKm * route.distanceKm : option.basePrice;
  const totalPrice = perDay * days;

  return (
    <article className="grid grid-cols-1 gap-4 rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#17BEBB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:grid-cols-[200px_1fr_auto] sm:items-center sm:gap-5">
      {/* VEHICLE PHOTO */}
      <div className="relative h-[130px] w-full shrink-0 overflow-hidden rounded-[12px] sm:h-[110px] sm:w-[200px]">
        {option.image ? (
          <Image
            src={option.image}
            alt={option.name}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, 200px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: style.bg }}
          >
            <Icon className="h-10 w-10 text-white/90" />
          </div>
        )}
        <span
          className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
          style={{ backgroundColor: style.bg }}
        >
          {option.type}
        </span>
      </div>

      {/* DETAILS */}
      <div className="min-w-0">
        <h3 className="text-[16px] font-bold text-[#0F172A]">{option.name}</h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[13px] text-[#475569]">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#0F4C81]" />
            {option.capacity} Seater
          </span>
          <span className="flex items-center gap-1">
            <Snowflake className="h-3.5 w-3.5 text-[#0F4C81]" />
            {option.acType}
          </span>
          {route && (
            <span className="text-[#94A3B8]">
              {route.distanceKm} km · {route.duration}
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-1 text-[13px] text-[#64748B] sm:line-clamp-none">{option.description}</p>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {option.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-[#E5E7EB] bg-[#F7FAFC] px-2.5 py-1 text-[11px] font-medium text-[#475569]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* PER-CARD DAY STEPPER */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#475569]">No. of Days</span>
          <div className="flex items-center gap-2.5 rounded-full border border-[#D1D5DB] bg-[#F7FAFC] px-1.5 py-1">
            <button
              type="button"
              onClick={() => setDays((value) => Math.max(1, value - 1))}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0F4C81] shadow-sm transition hover:bg-[#eef3ff]"
              aria-label={`Decrease days for ${option.name}`}
            >
              <Minus size={11} />
            </button>
            <span className="w-4 text-center text-[13px] font-bold text-[#0F172A]">{days}</span>
            <button
              type="button"
              onClick={() => setDays((value) => Math.min(30, value + 1))}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0F4C81] shadow-sm transition hover:bg-[#eef3ff]"
              aria-label={`Increase days for ${option.name}`}
            >
              <Plus size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* PRICE / CTA */}
      <div className="flex items-center justify-between gap-3 border-t border-[#F0F0F0] pt-3 sm:flex-col sm:items-end sm:gap-2 sm:border-t-0 sm:border-l sm:border-[#F0F0F0] sm:pt-0 sm:pl-5">
        <div className="shrink-0 sm:text-right">
          <p className="text-[19px] font-bold leading-tight text-[#0F172A]">
            ₹{totalPrice.toLocaleString("en-IN")}
          </p>
          <p className="text-[12px] text-[#6B7280]">
            {days > 1
              ? `₹${perDay.toLocaleString("en-IN")}/day × ${days} days`
              : route
              ? "for this trip"
              : "onwards"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(route ? { ...option, perDay, totalPrice, days, route } : option)}
          className="h-[44px] flex-1 rounded-[10px] bg-[#FF7A1A] px-5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F] sm:w-auto sm:flex-none sm:shrink-0"
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
