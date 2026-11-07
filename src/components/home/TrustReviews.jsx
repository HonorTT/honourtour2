"use client";

import CardRail from "@/components/common/CardRail";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  CheckCircle,
  Globe,
  Headphones,
  Heart,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
} from "lucide-react";
import EnquiryTrigger from "@/components/common/EnquiryTrigger";
import { homeData } from "@/data/homeData";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Stats carry an icon name; anything unrecognised falls back by position
// so a new stat never renders without an icon.
const STAT_ICONS = {
  Users,
  UserCheck,
  CheckCircle,
  Globe,
  MapPin,
  Award,
  Plane,
  Star,
  Headphones,
  ShieldCheck,
  Heart,
  Briefcase,
};
const STAT_ICON_ORDER = [Users, CheckCircle, UserCheck, Globe];

function statIcon(stat, index) {
  return STAT_ICONS[stat.icon] ?? STAT_ICON_ORDER[index % STAT_ICON_ORDER.length];
}

function parseStatValue(value) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { target: parseFloat(match[1]), suffix: match[2], decimals };
}

function CounterStat({ value, inView }) {
  const parsed = parseStatValue(value);

  const [display, setDisplay] = useState(() =>
    parsed ? `${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!inView || !parsed) return;

    const duration = 1200;
    let raf;
    let start;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(`${(parsed.target * progress).toFixed(parsed.decimals)}${parsed.suffix}`);
      if (progress < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <>{display}</>;
}

export default function TrustReviews({ stats, reviews }) {
  const trustReviews = {
    ...homeData.trustReviews,
    stats: stats?.length ? stats : homeData.trustReviews.stats,
    reviews: reviews?.length ? reviews : homeData.trustReviews.reviews,
  };
  const [sectionRef, inView] = useInView();

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`;

  return (
    <section className="sm:px-6 md:bg-[#0B3B63] md:py-8 lg:px-10">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1280px]">

        {/* ================= MOBILE-ONLY LAYOUT (<768px) ================= */}
        <div className="relative overflow-hidden bg-[#0B3B63] p-[18px] sm:rounded-[20px] md:hidden">
          <h2 className={`line-clamp-2 text-center text-[24px] font-bold leading-tight text-white sm:text-[30px] ${fade()}`}>
            Trusted by Honor Tour & Travels guests across India
          </h2>

          <div className={`mt-[18px] grid grid-cols-2 gap-5 ${fade("delay-100")}`}>
            {trustReviews.stats.map((stat, index) => {
              const Icon = statIcon(stat, index);
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center">
                    <Icon className="h-7 w-7 text-[#5EEAD4]" />
                  </div>
                  <div className="mt-2 text-[30px] font-bold text-white">
                    <CounterStat value={stat.value} inView={inView} />
                  </div>
                  <div className="mt-1 text-[14px] text-[#CBD5E1]">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <CardRail className={`mt-5 flex gap-4 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory ${fade("delay-200")}`}>
            {trustReviews.reviews.map((review, idx) => (
              <div
                key={idx}
                className="min-w-[290px] max-w-[290px] min-h-[195px] flex-shrink-0 snap-start rounded-[14px] bg-white px-3.5 py-4 transition-transform duration-200 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-[#F7FAFC] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#475569]">
                      {review.type}
                    </span>

                    <div className="mt-1.5 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
                      ))}
                    </div>

                    <h3 className="mt-1 text-[17px] font-bold leading-tight text-[#0F172A]">
                      {review.destination}
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[13px] font-bold text-[#0F4C81]">
                    {review.guest.charAt(0)}
                  </div>
                </div>

                <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
                  {review.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[#0F172A]">{review.guest}</p>
                  <p className="text-[12px] text-[#60646C]">{review.date}</p>
                </div>
              </div>
            ))}
          </CardRail>

          <EnquiryTrigger
            subject="Talk to a tour expert"
            className={`mt-[18px] flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#FF7A1A] text-[15px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 active:scale-95 ${fade("delay-300")}`}
          >
            <MessageCircle className="h-4 w-4" />
            Talk to a Tour Expert
          </EnquiryTrigger>
        </div>

        {/* ================= DESKTOP LAYOUT (unchanged, >=768px) ================= */}
        <div className="hidden md:block">
          <h2 className="text-center text-[24px] font-bold leading-tight text-white sm:text-[30px]">
            Trusted by Honor Tour & Travels guests across India
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustReviews.stats.map((stat, index) => {
              const Icon = statIcon(stat, index);
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center">
                    <Icon className="h-6 w-6 text-[#5EEAD4]" />
                  </div>
                  <div className="mt-2 text-[26px] font-bold text-white">
                    <CounterStat value={stat.value} inView={inView} />
                  </div>
                  <div className="mt-0.5 text-[12px] text-[#CBD5E1]">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <CardRail className="mt-6 flex items-stretch gap-6 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory lg:grid lg:gap-8 lg:overflow-visible lg:grid-cols-3">
            {trustReviews.reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex min-w-[280px] flex-shrink-0 snap-start flex-col rounded-[16px] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 lg:min-w-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#475569]">
                      {review.type}
                    </span>
                    <div className="mt-2 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
                      ))}
                    </div>
                  </div>

                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[15px] font-bold text-[#0F4C81]">
                    {review.guest.charAt(0)}
                  </span>
                </div>

                <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-[#0F172A]">
                  {review.destination}
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[#475569]">
                  {review.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3">
                  <p className="text-[13px] font-semibold text-[#0F172A]">{review.guest}</p>
                  <p className="text-[11.5px] text-[#60646C]">{review.date}</p>
                </div>
              </div>
            ))}
          </CardRail>

          <div className="mt-6 text-center">
            <EnquiryTrigger
              subject="Talk to a tour expert"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-6 py-2.5 text-[13px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to a Tour Expert
            </EnquiryTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
