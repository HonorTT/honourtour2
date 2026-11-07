import Image from "@/components/common/SiteImage";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { Award, Headphones, MapPin, ShieldCheck, UsersRound } from "lucide-react";

import { homeData } from "@/data/homeData";
import { getDestinationHref } from "@/data/destinations";
import { getDestinationImage } from "@/data/destinationImages";
import HeroSearchPanel from "./HeroSearchPanel";

/* =========================================================
   HERO
   A full-bleed banner with the headline and trust badges on
   the left, a cluster of tilted "polaroid" destinations on
   the right, the search panel floating across the bottom
   edge.

   The polaroids come from the destination strip the admin
   already manages, so nothing here is a hard-coded place
   name. The city cards live in "Popular destinations"
   further down the page — they were duplicated here.
========================================================= */

// Only the 600 weight is used; the second file was dead weight.
const script = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" });

const BANNER = "/uploads/destinations/banner2.png";

// The two photo cards in the banner. "Ladakh" has no destination page of its
// own yet, so it falls back to the India listing.
const POLAROIDS = [
  { label: "Kashmir", lookup: "Kashmir" },
  { label: "Ladakh", lookup: "Leh Ladakh" },
];

const BADGES = [
  { icon: Award, title: "Best Price", note: "Guarantee", ring: "bg-[#FDF0D5] text-[#D98A0B]" },
  { icon: Headphones, title: "24/7", note: "Support", ring: "bg-[#E2EEFB] text-[#2E7BE8]" },
  { icon: UsersRound, title: "Expert", note: "Tour Managers", ring: "bg-[#E3F5E8] text-[#16A34A]" },
  { icon: ShieldCheck, title: "Safe &", note: "Trusted Travel", ring: "bg-[#DEF4F3] text-[#13A8A5]" },
];

export default function HeroSection({ cards, destinations }) {
  const strip = (destinations?.length ? destinations : homeData.destinations).map((item) => ({
    name: item.name,
    tagline: item.tagline || item.tourCount || "",
    href: getDestinationHref(item.name),
    image: getDestinationImage(item.name),
  }));

  const searchDestinations = strip
    .filter((item) => item.href)
    .map((item) => ({ name: item.name, href: item.href }));

  const polaroids = POLAROIDS.map((item) => ({
    name: item.label,
    href: getDestinationHref(item.lookup) || "/india",
    image: getDestinationImage(item.lookup),
  }));

  return (
    <section className="w-full">
      <div className="relative isolate overflow-hidden bg-[#0A2050]">

        {/* BANNER */}
        <Image
          src={BANNER}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          className="-z-10 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#06203F]/70 via-[#06203F]/25 to-[#06203F]/55 lg:bg-gradient-to-r lg:from-[#06203F]/90 lg:via-[#06203F]/55 lg:to-transparent" />

        <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8 lg:pb-32 lg:pt-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT — HEADLINE */}
            <div>
              <p className="flex items-center gap-2.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:gap-3 sm:text-[11.5px] sm:tracking-[0.3em]">
                <span className="h-px w-8 bg-[#FFB347]" />
                Explore · Experience · Discover
              </p>

              <h1 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[46px] lg:text-[62px]">
                Your{" "}
                <span className={`${script.className} text-[#FFA629]`}>Kashmir</span>
                <span className="block">Starts Here</span>
              </h1>

              <p className="mt-2.5 max-w-[520px] text-[13.5px] leading-relaxed text-white/85 sm:text-[15px] lg:text-[16px]">
                Srinagar, Gulmarg, Pahalgam and Sonmarg — planned by a team that lives
                here. Stays, transport and sightseeing in one price.
              </p>

              {/* TRUST BADGES */}
              <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
                {BADGES.map((badge) => (
                  <div key={badge.note} className="flex items-center gap-2.5">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${badge.ring}`}>
                      <badge.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-[11.5px] font-semibold leading-tight text-white sm:text-[13px]">
                      {badge.title}
                      <span className="block font-normal text-white/80">{badge.note}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — POLAROID CLUSTER */}
            <div aria-hidden className="relative hidden h-[280px] lg:block">
              <div className="absolute left-0 top-6 w-[180px] text-center">
                <p className={`${script.className} text-[34px] leading-[0.95] text-white`}>
                  Collect
                  <br />
                  Moments
                </p>
                <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Not things
                </p>
                <svg viewBox="0 0 160 14" className="mx-auto mt-1.5 h-3.5 w-[120px]" fill="none">
                  <path d="M6 8 C 48 2, 112 2, 154 6" stroke="#FFA629" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {polaroids.map((item, index) => {
                const layout = [
                  "left-[176px] top-[12px] -rotate-6",
                  "right-0 top-[86px] rotate-6",
                ][index];

                return (
                  <div
                    key={item.name}
                    className={`absolute w-[180px] rounded-[14px] bg-white p-2 shadow-[0_16px_40px_rgba(6,32,63,0.4)] ${layout}`}
                  >
                    <div className="relative h-[120px] overflow-hidden rounded-[10px]">
                      <Image src={item.image} alt="" fill sizes="180px" className="object-cover" />
                    </div>
                    <p className={`${script.className} mt-1.5 flex items-center gap-1 px-1 text-[17px] text-[#0F172A]`}>
                      <MapPin className="h-3.5 w-3.5 text-[#F0762B]" />
                      {item.name}
                    </p>
                  </div>
                );
              })}

              {/* paper-plane doodles */}
              <svg viewBox="0 0 40 40" className="absolute right-[6px] top-[18px] h-7 w-7 text-white/90" fill="currentColor">
                <path d="M38 4 L4 18 L16 22 L20 36 Z" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH — rides up over the banner's bottom edge */}
      <div className="relative z-10 mx-auto -mt-16 w-full max-w-[1280px] px-4 sm:-mt-20 sm:px-6 lg:px-8">
        <HeroSearchPanel destinations={searchDestinations} />
      </div>

    </section>
  );
}
