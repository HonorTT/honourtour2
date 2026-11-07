"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CUSTOMIZED_HOLIDAYS_MENU, PLAN_MY_HOLIDAY_HREF } from "@/data/customizedHolidays";

function Column({ heading, items, onNavigate }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#0F4C81]">{heading}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
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
  );
}

export default function CustomizedHolidaysMenu({ open, onNavigate, onMouseEnter, onMouseLeave }) {
  const { indiaHolidays, travelStyle, holidayServices } = CUSTOMIZED_HOLIDAYS_MENU;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-40 max-lg:hidden w-[calc(100%-2rem)] max-w-[900px] -translate-x-1/2 rounded-b-[14px] border border-t-0 border-[#E5E7EB] bg-white text-left shadow-[0_16px_32px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-b border-[#E5E7EB] px-6 py-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">Customized Holidays</p>
      </div>

      <div className="grid grid-cols-3 gap-6 px-6 py-5">
        <Column heading={indiaHolidays.heading} items={indiaHolidays.items} onNavigate={onNavigate} />
        <Column heading={travelStyle.heading} items={travelStyle.items} onNavigate={onNavigate} />
        <Column heading={holidayServices.heading} items={holidayServices.items} onNavigate={onNavigate} />
      </div>

      <Link
        href={PLAN_MY_HOLIDAY_HREF}
        onClick={onNavigate}
        className="flex items-center justify-center gap-1.5 border-t border-[#E5E7EB] bg-[#FF7A1A] py-3 text-[13px] font-bold text-white no-underline transition hover:bg-[#E56A0F]"
      >
        Plan My Holiday
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
