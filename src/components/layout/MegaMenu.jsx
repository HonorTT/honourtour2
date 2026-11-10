"use client";

import { useState } from "react";
import Link from "@/components/common/SiteLink";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

/* =========================================================
   GENERIC DESKTOP MEGA MENU
   A compact dropdown for the India navigation data: popular
   places on top, then region tabs, then that region's states.
   Hovering a tab previews its states; clicking one opens the
   region's page. Every link is a real Next.js Link resolved
   via src/data/navigationData.js.

   Each state shows only its name. The name opens the state's
   page; the arrow beside it reveals its cities, one state at a
   time. Closed city lists stay in the HTML (just hidden) so
   search engines still see the links.

   The state list has a fixed height so the menu does not jump
   when moving between a long region and a short one.
========================================================= */

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17BEBB]";

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

export default function MegaMenu({ data, open, onNavigate, onMouseEnter, onMouseLeave }) {
  const [activeRegion, setActiveRegion] = useState(0);
  const [openColumn, setOpenColumn] = useState(null);
  const region = data.regions[activeRegion];

  const selectRegion = (idx) => {
    if (idx === activeRegion) return;
    setActiveRegion(idx);
    setOpenColumn(null);
  };

  // Start collapsed again every time the menu is reopened.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setOpenColumn(null);
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-40 w-[calc(100%-2rem)] max-w-[920px] -translate-x-1/2 overflow-hidden rounded-b-[18px] bg-white text-left shadow-[0_24px_48px_rgba(15,23,42,0.18)] transition-all duration-200 ease-out max-lg:hidden ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-1 opacity-0"
      }`}
    >
      {/* POPULAR */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5ECF3] bg-[#F7FAFC] px-6 py-3">
        <p className="mr-1 text-[12.5px] font-semibold text-[#64748B]">Popular</p>

        {data.recommended.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[12.5px] font-medium text-[#0F172A] no-underline ring-1 ring-[#E5ECF3] transition-colors hover:bg-[#0B3B63] hover:text-white hover:ring-[#0B3B63] ${FOCUS_RING}`}
          >
            <MapPin className="h-3 w-3 text-[#17BEBB] transition-colors group-hover:text-[#5EEAD4]" />
            {item.name}
          </Link>
        ))}
      </div>

      {/* REGION TABS */}
      <div className="flex items-center justify-between gap-5 border-b border-[#E5ECF3] px-6">
        {data.regions.map((r, idx) => {
          const isActive = idx === activeRegion;

          return (
            <Link
              key={r.name}
              href={r.all.href}
              onMouseEnter={() => selectRegion(idx)}
              onFocus={() => selectRegion(idx)}
              onClick={onNavigate}
              className={`-mb-px whitespace-nowrap border-b-2 py-3.5 text-[13px] font-semibold no-underline transition-colors ${FOCUS_RING} ${
                isActive
                  ? "border-[#17BEBB] text-[#0B3B63]"
                  : "border-transparent text-[#64748B] hover:text-[#0B3B63]"
              }`}
            >
              {r.name}
            </Link>
          );
        })}
      </div>

      {/* STATES */}
      <div className="h-[410px] max-h-[calc(100vh-240px)] overflow-y-auto px-6 pb-4 pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0 text-[17px] font-bold leading-tight text-[#0B3B63]">{region.name}</p>

          <Link
            href={region.all.href}
            onClick={onNavigate}
            className={`flex shrink-0 items-center gap-1.5 text-[12.5px] font-bold text-[#FF7A1A] no-underline transition-colors hover:text-[#E56A0F] ${FOCUS_RING}`}
          >
            See all tours
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-2 grid grid-cols-2 items-start gap-x-8">
          {region.columns.map((col) => {
            const hasCities = col.items.length > 0;
            const isOpen = openColumn === col.heading.href;

            return (
              <div key={col.heading.href} className="border-b border-[#EEF2F6]">
                <div className="flex items-center gap-2 py-3">
                  <Link
                    href={col.heading.href}
                    onClick={onNavigate}
                    className={`group min-w-0 flex-1 rounded-[6px] no-underline ${FOCUS_RING}`}
                  >
                    <span
                      className={`block text-[14px] font-semibold leading-snug transition-colors group-hover:text-[#0F8F8C] ${
                        isOpen ? "text-[#0F8F8C]" : "text-[#0F172A]"
                      }`}
                    >
                      {col.heading.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-[#7A8796]">
                      {hasCities ? plural(col.items.length, "place") : "View tours"}
                    </span>
                  </Link>

                  {hasCities ? (
                    <button
                      type="button"
                      onClick={() => setOpenColumn(isOpen ? null : col.heading.href)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${col.heading.name} cities`}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${FOCUS_RING} ${
                        isOpen
                          ? "bg-[#0F8F8C] text-white"
                          : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E6F7F5] hover:text-[#0F8F8C]"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={col.heading.href}
                      onClick={onNavigate}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569] transition-colors hover:bg-[#E6F7F5] hover:text-[#0F8F8C]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                {hasCities && (
                  <ul hidden={!isOpen} className="pb-3.5 pt-0.5">
                    <li className="flex flex-wrap gap-1.5">
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onNavigate}
                          className={`rounded-full bg-[#EAF6F6] px-2.5 py-1 text-[12.5px] font-medium text-[#0B3B63] no-underline transition-colors hover:bg-[#0F8F8C] hover:text-white ${FOCUS_RING}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
