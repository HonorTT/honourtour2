"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Bus, CalendarDays, Hotel, MapPin, Plane, Search, UserRound } from "lucide-react";

/* =========================================================
   HERO SEARCH PANEL
   Floats over the bottom edge of the banner.

   Four tabs, each sending the visitor to the page that
   actually handles it. Holiday Packages keeps the original
   behaviour: pick one of the destinations the strip below
   renders and go to its existing page, with the date and
   traveller count riding along as query params — this form
   does not invent a search backend.
========================================================= */

const TABS = [
  { key: "packages", label: "Holiday Packages", icon: Briefcase },
  { key: "flights", label: "Flights", icon: Plane, href: "/flights" },
  { key: "hotels", label: "Hotels", icon: Hotel, href: "/hotels" },
  { key: "transport", label: "Transport", icon: Bus, href: "/transport" },
];

const ADULTS = ["1", "2", "3", "4", "5", "6"];
const CHILDREN = ["0", "1", "2", "3", "4"];

export default function HeroSearchPanel({ destinations = [] }) {
  const router = useRouter();
  const [tab, setTab] = useState("packages");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  const activeTab = TABS.find((item) => item.key === tab) ?? TABS[0];

  function handleSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (date) params.set("date", date);
    params.set("guests", String(Number(adults) + Number(children)));

    // Flights, hotels and transport have their own pages and their own
    // search; the tab simply takes the visitor there.
    const target = activeTab.href || destination || destinations[0]?.href;
    if (!target) return;

    const query = params.toString();
    router.push(activeTab.href ? target : query ? `${target}?${query}` : target);
  }

  const label = "mb-0.5 block text-[12px] font-semibold text-[#64748B]";
  const value = "w-full bg-transparent text-[14.5px] font-semibold text-[#0F172A] outline-none";

  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_18px_50px_rgba(10,32,80,0.22)] sm:rounded-[22px]">

      {/* TABS */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto px-3 pt-3 sm:gap-2 sm:px-4 sm:pt-4">
        {TABS.map((item) => {
          const active = item.key === tab;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition ${
                active
                  ? "bg-[#1C7FD6] text-white shadow-[0_6px_16px_rgba(28,127,214,0.3)]"
                  : "text-[#475569] hover:bg-[#F1F5F9]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="p-3 sm:p-4">
        <div className="grid gap-2 lg:flex lg:items-center lg:gap-0">

          {/* WHERE TO */}
          <label className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition hover:bg-[#F8FAFC] lg:flex-[1.5] lg:px-4">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
            <span className="min-w-0 flex-1">
              <span className={label}>Where to?</span>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                disabled={Boolean(activeTab.href)}
                className={`${value} -ml-0.5 cursor-pointer disabled:cursor-not-allowed disabled:text-[#94A3B8]`}
              >
                <option value="">Search Destination or City</option>
                {destinations.map((item) => (
                  <option key={item.name} value={item.href}>
                    {item.name}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <span className="hidden w-px shrink-0 bg-[#E5E7EB] lg:block lg:h-10" />

          {/* TRAVEL DATES */}
          <label className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition hover:bg-[#F8FAFC] lg:flex-1 lg:px-4">
            <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
            <span className="min-w-0 flex-1">
              <span className={label}>Travel Dates</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`${value} cursor-pointer`}
              />
            </span>
          </label>

          <span className="hidden w-px shrink-0 bg-[#E5E7EB] lg:block lg:h-10" />

          {/* TRAVELLERS */}
          <label className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition hover:bg-[#F8FAFC] lg:flex-1 lg:px-4">
            <UserRound className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
            <span className="min-w-0 flex-1">
              <span className={label}>Travellers</span>
              <span className="flex items-center gap-1">
                <select
                  value={adults}
                  onChange={(event) => setAdults(event.target.value)}
                  aria-label="Adults"
                  className={`${value} -ml-0.5 w-auto cursor-pointer`}
                >
                  {ADULTS.map((count) => (
                    <option key={count} value={count}>
                      {count} {count === "1" ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
                <span className="text-[#CBD5E1]">,</span>
                <select
                  value={children}
                  onChange={(event) => setChildren(event.target.value)}
                  aria-label="Children"
                  className={`${value} w-auto cursor-pointer`}
                >
                  {CHILDREN.map((count) => (
                    <option key={count} value={count}>
                      {count} {count === "1" ? "Child" : "Children"}
                    </option>
                  ))}
                </select>
              </span>
            </span>
          </label>

          <button
            type="submit"
            className="flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#FF8A2B] to-[#F0621F] px-7 text-[15px] font-bold text-white shadow-lg shadow-[#FF7A1A]/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-105 lg:ml-3 lg:shrink-0"
          >
            <Search className="h-[18px] w-[18px]" />
            {activeTab.href ? `Search ${activeTab.label}` : "Search Holidays"}
          </button>
        </div>
      </form>
    </div>
  );
}
