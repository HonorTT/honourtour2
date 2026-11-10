"use client";

import { useState } from "react";
import Link from "@/components/common/SiteLink";
import { ChevronDown, ChevronRight } from "lucide-react";

/* =========================================================
   MOBILE ACCORDION NAVIGATION (India / World)
   No hover on touch devices, so tapping the region name
   expands/collapses its destination list inline.
========================================================= */

export default function MobileNavAccordion({ data, overviewHref, overviewLabel, onNavigate }) {
  const [openRegion, setOpenRegion] = useState(null);

  return (
    <div className="max-h-[70vh] overflow-y-auto bg-white text-left">
      <Link
        href={overviewHref}
        onClick={onNavigate}
        className="block border-b border-[#E5E7EB] px-4 py-3 text-[13px] font-semibold text-[#0F172A] no-underline"
      >
        {overviewLabel}
      </Link>

      <div className="border-b border-[#E5E7EB] px-4 py-3">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">
          Top Recommended
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.recommended.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-full border border-[#D1D5DB] px-3 py-1.5 text-[12px] font-medium text-[#0F172A] no-underline"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {data.regions.map((region, idx) => {
        const isOpen = openRegion === idx;
        return (
          <div key={region.name} className="border-b border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setOpenRegion(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] font-semibold text-[#0F172A]"
            >
              {region.name}
              {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>

            {isOpen && (
              <div className="bg-[#F9FAFB] px-4 pb-3">
                <Link
                  href={region.all.href}
                  onClick={onNavigate}
                  className="mb-2 inline-block text-[12px] font-semibold text-[#0F172A] no-underline underline"
                >
                  All of {region.name}
                </Link>

                <div className="space-y-3">
                  {region.columns.map((col) => (
                    <div key={col.heading.href}>
                      <Link
                        href={col.heading.href}
                        onClick={onNavigate}
                        className="text-[12px] font-semibold text-[#0F172A] no-underline"
                      >
                        {col.heading.name}
                      </Link>

                      {col.items.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                          {col.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={onNavigate}
                              className="py-0.5 text-[12px] text-[#4B5563] no-underline"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
