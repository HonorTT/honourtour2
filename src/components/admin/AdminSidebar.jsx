"use client";

import { useState } from "react";
import Link from "@/components/common/SiteLink";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  Bus,
  ChevronDown,
  ClipboardList,
  Flag,
  Hotel,
  House,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Plane,
  Settings2,
} from "lucide-react";

/* =========================================================
   ADMIN SIDEBAR
   Dashboard and Bookings stay at the top because they are
   the day-to-day screens. Everything that edits website
   content sits under Settings, one collapsible section per
   group, so the sidebar is a short list instead of thirty
   links. The section holding the open module expands on its
   own.
========================================================= */

// A face for every row — a wall of text is what made this feel unfinished.
const MODULE_ICONS = {
  bookings: ClipboardList,
  enquiries: MessageSquare,
  "hotel-bookings": BedDouble,
  "flight-bookings": Plane,
  "transport-bookings": Bus,
};

const GROUP_ICONS = {
  Catalog: Layers,
  "Home Page": House,
  "India Page": Flag,
  Flights: Plane,
  Transport: Bus,
  Hotels: Hotel,
};

/** The orange sliver that marks the row you are on. */
function ActiveBar() {
  return (
    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#FFB347] to-[#FF7A1A]" />
  );
}

export default function AdminSidebar({ groups }) {
  const pathname = usePathname();

  const isCurrent = (slug) => pathname === `/admin/${slug}` || pathname.startsWith(`/admin/${slug}/`);
  const currentGroup = groups.find((g) => g.modules.some((m) => isCurrent(m.slug)))?.group ?? null;

  const [openGroup, setOpenGroup] = useState(currentGroup);

  const bookings = groups.find((g) => g.group === "Bookings");
  const settingsGroups = groups.filter((g) => g.group !== "Bookings");

  const rowClass = (active) =>
    `group relative flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] no-underline transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-white/[0.16] to-white/[0.04] font-semibold text-white ring-1 ring-inset ring-white/10"
        : "text-white/70 hover:bg-white/[0.07] hover:text-white"
    }`;

  const iconClass = (active) =>
    `h-[16px] w-[16px] shrink-0 transition-colors ${
      active ? "text-[#FFB347]" : "text-white/45 group-hover:text-white/80"
    }`;

  return (
    <nav className="admin-scroll flex-1 overflow-y-auto px-3 py-4">
      {(() => {
        const active = pathname === "/admin";
        return (
          <Link href="/admin" className={rowClass(active)}>
            {active && <ActiveBar />}
            <LayoutDashboard className={iconClass(active)} />
            Dashboard
          </Link>
        );
      })()}

      <p className="mt-5 px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
        Bookings &amp; Leads
      </p>

      <div className="flex flex-col gap-0.5">
        {bookings?.modules.map((m) => {
          const active = isCurrent(m.slug);
          const Icon = MODULE_ICONS[m.slug] ?? ClipboardList;

          return (
            <Link key={m.slug} href={`/admin/${m.slug}`} className={rowClass(active)}>
              {active && <ActiveBar />}
              <Icon className={iconClass(active)} />
              {m.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 px-3 pb-1.5">
        <Settings2 className="h-3.5 w-3.5 text-white/30" />
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
          Website Settings
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {settingsGroups.map(({ group, modules }) => {
          const isOpen = openGroup === group;
          const hasCurrent = modules.some((m) => isCurrent(m.slug));
          const Icon = GROUP_ICONS[group] ?? Layers;

          return (
            <div key={group}>
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : group)}
                aria-expanded={isOpen}
                className={`group relative flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] transition-all duration-200 ${
                  hasCurrent
                    ? "font-semibold text-white"
                    : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {hasCurrent && !isOpen && <ActiveBar />}
                <Icon className={iconClass(hasCurrent)} />

                <span className="flex-1 text-left">{group}</span>

                <span className="rounded-full bg-white/[0.08] px-1.5 py-px text-[10px] font-semibold text-white/50">
                  {modules.length}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Height animation keeps the jump out of a thirteen-item list. */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="my-1 ml-[22px] flex flex-col gap-px border-l border-white/10 pl-2.5">
                    {modules.map((m) => {
                      const active = isCurrent(m.slug);

                      return (
                        <Link
                          key={m.slug}
                          href={`/admin/${m.slug}`}
                          className={`relative flex items-center gap-2 rounded-[8px] py-[7px] pl-3 pr-2 text-[12.5px] leading-tight no-underline transition-all duration-200 ${
                            active
                              ? "bg-white/[0.12] font-semibold text-white"
                              : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span
                            className={`absolute left-[-13px] h-1.5 w-1.5 rounded-full transition-colors ${
                              active ? "bg-[#FF7A1A]" : "bg-white/20"
                            }`}
                          />
                          {m.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
