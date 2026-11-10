"use client";

import CardRail from "@/components/common/CardRail";
import Image from "@/components/common/SiteImage";
import { useState } from "react";
import Link from "@/components/common/SiteLink";
import { Award, CalendarDays, ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";
import { homeData } from "@/data/homeData";
import { getDestinationImage } from "@/data/destinationImages";

export default function ChinaPromo({ promoPackages }) {
  const chinaPromo = {
    ...homeData.chinaPromo,
    packages: promoPackages?.length ? promoPackages : homeData.chinaPromo.packages,
  };
  const packages = chinaPromo.packages;
  const [start, setStart] = useState(0);

  const visible = Array.from({ length: Math.min(4, packages.length) }, (_, i) => packages[(start + i) % packages.length]);

  const goPrev = () => setStart((value) => (value === 0 ? packages.length - 1 : value - 1));
  const goNext = () => setStart((value) => (value + 1) % packages.length);

  return (
    <section className="py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative">
          <div className="grid overflow-hidden border-y border-[#E5E7EB] bg-gradient-to-br from-white to-[#EAF3FB] shadow-[0_4px_24px_rgba(15,23,42,0.05)] sm:rounded-[20px] sm:border lg:grid-cols-[55%_45%] lg:max-h-[380px]">
            {/* TEXT + CARDS */}
            <div className="order-2 min-w-0 p-4 sm:p-6 md:p-8 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F7F5] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F4C81]">
                  <Award className="h-3.5 w-3.5" />
                  Legacy of Excellence
                </span>

                {packages.length > 4 && (
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <button
                      type="button"
                      aria-label="Previous packages"
                      onClick={goPrev}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-sm transition hover:border-[#17BEBB] hover:text-[#0F4C81]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next packages"
                      onClick={goNext}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17BEBB] text-white shadow-sm transition hover:bg-[#0F4C81]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <h2 className="mt-3 text-[26px] font-black italic leading-[1.15] text-[#0F172A] sm:text-[32px] lg:mt-2 lg:text-[34px] lg:leading-[1.15]">
                <span className="text-[#17BEBB]">Paradise</span> on Earth.{" "}
                <span className="text-[#0F4C81]">Planned</span> to the detail.
              </h2>

              <p className="mt-3 text-[14px] font-semibold italic text-[#17BEBB] sm:text-[15px] lg:mt-1.5 lg:text-[14px]">
                All-inclusive Kashmir tours, run by our own team in the valley
              </p>

              <CardRail className="mt-5 flex gap-3 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 md:mt-6 lg:mt-4" label="packages">
                {visible.map((pkg) => (
                  <Link
                    key={pkg.slug}
                    href={`/package/${pkg.slug}`}
                    className="group flex min-w-[88%] max-w-[88%] flex-shrink-0 snap-start flex-col cursor-pointer rounded-[14px] border border-[#E5E7EB] bg-white p-3.5 no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] sm:min-w-0 sm:max-w-none lg:p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F7F5] text-[#17BEBB] lg:h-7 lg:w-7">
                      <CalendarDays className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                    </div>
                    <div className="mt-3 text-[13px] font-bold leading-tight text-[#0F172A] lg:mt-2 lg:text-[12px]">{pkg.name}</div>
                    <div className="mt-1 text-[11px] text-[#94A3B8] lg:mt-0.5 lg:text-[10px]">{pkg.days}</div>
                    <div className="mt-2 text-[11px] text-[#475569] lg:mt-1.5 lg:text-[10px]">Starting from</div>
                    <div className="text-[15px] font-bold text-[#0F172A] lg:text-[13px]">{pkg.price}</div>

                    <span className="mt-3 flex h-7 w-7 items-center justify-center self-start rounded-full bg-[#17BEBB] text-white transition-colors group-hover:bg-[#0F4C81] lg:mt-2 lg:h-6 lg:w-6">
                      <ArrowRight className="h-3.5 w-3.5 lg:h-3 lg:w-3" />
                    </span>
                  </Link>
                ))}
              </CardRail>
            </div>

            {/* IMAGE — bleeds to the box edge */}
            <div className="relative order-1 h-[220px] w-full overflow-hidden rounded-[20px] lg:order-2 lg:h-[320px] lg:self-center">
              <Image
                src={getDestinationImage("kashmir")}
                alt="Kashmir"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trusted by 50,000+ Travelers
              </div>
            </div>
          </div>

          {/* FLOATING BOOK ONLINE CARD */}
          <Link
            href={`/package/${packages[0].slug}`}
            className="absolute hidden w-[200px] rounded-[14px] bg-white p-3 no-underline shadow-[0_8px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 lg:bottom-4 lg:right-6 lg:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[#0F4C81]">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-tight text-[#0F172A]">Book Your Dream Tour</p>
                <p className="truncate text-[11px] text-[#64748B]">365 days, 24*7 from your city!</p>
              </div>
            </div>

            <span className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#FF7A1A] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]">
              Book Online
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
