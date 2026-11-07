"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/common/SiteImage";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Bus,
  ChevronDown,
  ChevronRight,
  Gift,
  Home,
  Landmark,
  Map,
  Menu,
  Phone,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import MegaMenu from "./MegaMenu";
import SpecialtyToursMenu from "./SpecialtyToursMenu";
import CustomizedHolidaysMenu from "./CustomizedHolidaysMenu";
import { indiaNavigation } from "@/data/navigationData";
import { CONTACT } from "@/lib/contact";
import { SPECIALTY_FEATURED, SPECIALTY_MORE } from "@/data/specialityTours";
import { CUSTOMIZED_HOLIDAYS_MENU, PLAN_MY_HOLIDAY_HREF } from "@/data/customizedHolidays";

const links = [
  { label: "India", megaMenu: "india", href: "/india" },
  { label: "Specialty Tours", megaMenu: "specialty" },
  { label: "Customized Holidays", megaMenu: "customized" },
  { label: "Flights", hasBadge: true, href: "/flights" },
  { label: "Transport", href: "/transport" },
  { label: "Hotels", href: "/hotels" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Contact Us", href: "/contact" },
];

const mobileMenuLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "India Tours", href: "/india", icon: Landmark },
  {
    label: "Speciality Tours",
    icon: Sparkles,
    submenu: {
      type: "flat",
      items: [...SPECIALTY_FEATURED, ...SPECIALTY_MORE],
      viewAllHref: "/speciality-tours",
      viewAllLabel: "View All Speciality Tours",
    },
  },
  {
    label: "Customized Holidays",
    icon: Map,
    submenu: {
      type: "grouped",
      groups: [
        CUSTOMIZED_HOLIDAYS_MENU.indiaHolidays,
        CUSTOMIZED_HOLIDAYS_MENU.travelStyle,
        CUSTOMIZED_HOLIDAYS_MENU.holidayServices,
      ],
      viewAllHref: PLAN_MY_HOLIDAY_HREF,
      viewAllLabel: "Plan My Holiday",
    },
  },
  { label: "Flights", href: "/flights", icon: Plane, badge: "New" },
  { label: "Transport", href: "/transport", icon: Bus },
  { label: "Hotels", href: "/hotels", icon: Building2 },
  { label: "Gift Cards", href: "/gift-cards", icon: Gift },
  { label: "Contact Us", href: "/contact", icon: Phone },
];

function MobileAccordionItem({ link, openIndex, index, onToggle, onNavigate, active }) {
  const Icon = link.icon;

  const row =
    "flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-[15px] font-medium transition";
  const resting = "text-[#0F172A] hover:bg-[#F1F5F9]";
  const current = "bg-[#E8F2FD] text-[#1C7FD6]";

  if (!link.submenu) {
    return (
      <Link href={link.href} onClick={onNavigate} className={`${row} ${active ? current : resting} no-underline`}>
        {Icon ? <Icon className="h-[22px] w-[22px] shrink-0" strokeWidth={1.7} /> : null}
        <span className="flex-1 text-left">{link.label}</span>
        {link.badge ? (
          <span className="rounded-full bg-[#E53935] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
            {link.badge}
          </span>
        ) : null}
      </Link>
    );
  }

  const isOpen = openIndex === index;

  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(index)}
        className={`${row} ${isOpen ? current : resting}`}
      >
        {Icon ? <Icon className="h-[22px] w-[22px] shrink-0" strokeWidth={1.7} /> : null}
        <span className="flex-1 text-left">{link.label}</span>
        <ChevronRight
          className={`h-4 w-4 shrink-0 text-[#94A3B8] transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-[42px] mt-0.5 space-y-2.5 border-l border-[#E5E7EB] pl-3">
          {link.submenu.type === "flat" &&
            link.submenu.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="block py-0.5 text-[13.5px] text-[#475569] no-underline hover:text-[#1C7FD6]"
              >
                {item.name}
              </Link>
            ))}

          {link.submenu.type === "grouped" &&
            link.submenu.groups.map((group) => (
              <div key={group.heading}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
                  {group.heading}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className="py-0.5 text-[13.5px] text-[#475569] no-underline hover:text-[#1C7FD6]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          <Link
            href={link.submenu.viewAllHref}
            onClick={onNavigate}
            className="inline-block pb-1 text-[13px] font-semibold text-[#F0762B] no-underline"
          >
            {link.submenu.viewAllLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const pathname = usePathname();
  const closeTimer = useRef(null);

  function openNow(key) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(key);
  }

  function closeWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function closeNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }

  function toggleNow(key) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu((current) => (current === key ? null : key));
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenAccordion(null);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
      setOpenAccordion(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // The drawer scrolls on its own; the page behind it must not.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0B3B63] text-white shadow-[0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(11,59,99,0.25)]">
      <div className="mx-auto flex h-[62px] w-full max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:h-[68px] lg:px-8">

        <Link href="/" className="flex shrink-0 items-center no-underline">
          <Image
            src="/uploads/brand/logo.png"
            alt="Honor Tour & Travels"
            width={929}
            height={269}
            priority
            sizes="130px"
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden items-center lg:flex">
          <div className="flex items-center whitespace-nowrap text-[12.5px] font-medium">
            {links.map((link) => {
              const isMega = Boolean(link.megaMenu);
              const isActive = isMega && openMenu === link.megaMenu;

              const inner = (
                <div
                  className={`relative flex h-[68px] items-center gap-1.5 transition-colors after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:transition-colors px-2 ${
                    isActive
                      ? "text-white after:bg-[#17BEBB]"
                      : "text-white/80 after:bg-transparent hover:text-white hover:after:bg-white/30"
                  }`}
                >
                  <span>{link.label}</span>
                  {isMega ? (
                    <ChevronDown className={`h-3.5 w-3.5 ${isActive ? "rotate-180" : ""}`} />
                  ) : null}
                  {link.hasBadge ? (
                    <span className="rounded-[3px] bg-[#E53935] px-1 py-px text-[9px] font-bold uppercase tracking-[0.1em] leading-[1.5] text-white">
                      New
                    </span>
                  ) : null}
                </div>
              );

              if (isMega) {
                const menuProps = {
                  open: isActive,
                  onNavigate: closeNow,
                  onMouseEnter: () => openNow(link.megaMenu),
                  onMouseLeave: closeWithDelay,
                };

                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => openNow(link.megaMenu)}
                    onMouseLeave={closeWithDelay}
                  >
                    {link.href ? (
                      <Link href={link.href} className="no-underline">
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" onClick={() => toggleNow(link.megaMenu)} className="no-underline">
                        {inner}
                      </button>
                    )}

                    {link.megaMenu === "india" && <MegaMenu data={indiaNavigation} {...menuProps} />}
                    {link.megaMenu === "specialty" && <SpecialtyToursMenu {...menuProps} />}
                    {link.megaMenu === "customized" && <CustomizedHolidaysMenu {...menuProps} />}
                  </div>
                );
              }

              return (
                <Link key={link.label} href={link.href} className="no-underline">
                  {inner}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CALL PILL — widest screens only, where the links leave room */}
        <a
          href={CONTACT.phoneHref}
          className="ml-4 hidden shrink-0 items-center gap-1.5 rounded-full border border-white/30 px-3.5 py-1.5 text-[12.5px] font-semibold text-white no-underline transition hover:bg-white/10 xl:flex"
        >
          <Phone className="h-4 w-4" />
          {CONTACT.phone}
        </a>

        <Link
          href={PLAN_MY_HOLIDAY_HREF}
          className="ml-2.5 hidden shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2B] to-[#F0621F] px-5 py-2 text-[13px] font-bold text-white no-underline shadow-[0_6px_16px_rgba(240,98,31,0.35)] transition hover:brightness-105 min-[1400px]:flex"
        >
          Plan My Trip
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* BACKDROP for desktop mega menu */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={openMenu ? 0 : -1}
        onClick={closeNow}
        className={`fixed inset-0 top-[68px] z-30 hidden bg-black/30 transition-opacity duration-200 lg:block ${
          openMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE DRAWER — slides in over the page, with its own scroll */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobileMenu}
          className={`absolute inset-0 h-full w-full cursor-default bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-[360px] flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[#E5E7EB] px-4 py-3.5">
            {/* The full logo's wordmark is white, so the drawer pairs the
                emblem with dark type of its own. */}
            <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 no-underline">
              <Image
                src="/uploads/brand/logo-mark.png"
                alt=""
                width={256}
                height={256}
                sizes="40px"
                className="h-10 w-10 object-contain"
              />
              <span className="leading-none">
                <span className="block text-[19px] font-extrabold tracking-tight text-[#0B3B63]">
                  HONOR
                </span>
                <span className="mt-0.5 block text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#F0762B]">
                  Tour &amp; Travels
                </span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#0F172A] transition hover:bg-[#F1F5F9]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-2">
            <div className="flex flex-col gap-0.5">
              {mobileMenuLinks.map((link, index) => (
                <MobileAccordionItem
                  key={link.label}
                  link={link}
                  index={index}
                  openIndex={openAccordion}
                  onToggle={(idx) => setOpenAccordion((current) => (current === idx ? null : idx))}
                  onNavigate={closeMobileMenu}
                  active={link.href === pathname}
                />
              ))}
            </div>
          </nav>

          <div className="shrink-0 space-y-2.5 border-t border-[#E5E7EB] px-4 py-3.5">
            <Link
              href={PLAN_MY_HOLIDAY_HREF}
              onClick={closeMobileMenu}
              className="flex items-center justify-between gap-3 rounded-[14px] bg-gradient-to-r from-[#0B3B63] to-[#1C7FD6] px-4 py-3.5 no-underline"
            >
              <span>
                <span className="block text-[15px] font-bold leading-tight text-white">
                  Plan Your Dream Holiday
                </span>
                <span className="mt-0.5 block text-[11.5px] text-white/75">
                  Get best deals on tour packages
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0762B] text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <a
              href={CONTACT.phoneHref}
              className="flex items-center justify-center gap-2 rounded-[12px] border border-[#E2E8F0] px-4 py-2.5 text-[14px] font-semibold text-[#0F172A] no-underline transition hover:bg-[#F8FAFC]"
            >
              <Phone className="h-4 w-4 text-[#17BEBB]" />
              {CONTACT.phone}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
