"use client";

import Link from "@/components/common/SiteLink";
import { ArrowRight } from "lucide-react";
import { SPECIALTY_FEATURED, SPECIALTY_MORE } from "@/data/specialityTours";

export default function SpecialtyToursMenu({ open, onNavigate, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-40 max-lg:hidden w-[520px] -translate-x-1/2 rounded-b-[14px] border border-t-0 border-[#E5E7EB] bg-white text-left shadow-[0_16px_32px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-b border-[#E5E7EB] px-6 py-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">Speciality Tours</p>
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 py-5">
        <div>
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#0F4C81]">Featured</p>
          <ul className="space-y-1.5">
            {SPECIALTY_FEATURED.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block rounded-[6px] px-2 py-1.5 text-[13px] font-medium text-[#0F172A] no-underline transition hover:bg-[#F7FAFC] hover:text-[#0F4C81]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#0F4C81]">More Experiences</p>
          <ul className="space-y-1.5">
            {SPECIALTY_MORE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block rounded-[6px] px-2 py-1.5 text-[13px] text-[#374151] no-underline transition hover:bg-[#F7FAFC] hover:text-[#0F4C81]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/speciality-tours"
        onClick={onNavigate}
        className="flex items-center justify-center gap-1.5 border-t border-[#E5E7EB] bg-[#F7FAFC] py-3 text-[13px] font-semibold text-[#0F4C81] no-underline transition hover:bg-[#EEF3FF]"
      >
        View All Speciality Tours
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
