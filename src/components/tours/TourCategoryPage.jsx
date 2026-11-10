"use client";

import { CONTACT } from "@/lib/contact";

import { useState } from "react";
import Link from "@/components/common/SiteLink";
import {
  ChevronDown,
  Columns2,
  Columns3,
  ChevronUp,
  Phone,
  Star,
  Quote,
  MapPin,
  Mail,
  MessageSquare,
} from "lucide-react";

import TourListing from "./TourListing";
import { toCardItem } from "./tourUtils";
import FAQAccordion from "@/components/common/FAQAccordion";

/* =========================================================
   GENERIC TOUR CATEGORY PAGE
   Same structure/design as the India tours page (intro,
   callback form, tabs, listing, destination/interest/season/
   duration sections, reviews, FAQ, SEO) driven entirely by a
   config object so it can be reused for World / Women's
   Special / Seniors' Special without touching /india.
========================================================= */

const gradients = [
  "from-orange-300 via-rose-500 to-orange-900",
  "from-blue-300 via-cyan-100 to-emerald-600",
  "from-green-300 via-emerald-600 to-green-900",
  "from-sky-300 via-slate-100 to-emerald-500",
  "from-cyan-300 via-blue-100 to-cyan-300",
  "from-orange-100 via-stone-200 to-sky-300",
];

function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-[20px] font-bold text-[#222] sm:text-[22px]">{children}</h2>
      <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#0F4C81]" />
    </div>
  );
}

function GradientPill({ name, count, index, href }) {
  return (
    <Link
      href={href || "#"}
      className={`group relative block h-[145px] transform-gpu overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-gradient-to-br no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] ${gradients[index % gradients.length]}`}
    >
      <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-full bg-black/10" />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-14 text-left">
        <h3 className="text-[14px] font-semibold text-white group-hover:underline">{name}</h3>

        {count && <p className="mt-0.5 text-[12px] text-white/90">{count}</p>}
      </div>
    </Link>
  );
}

export default function TourCategoryPage({ config }) {
  const [showMoreIntro, setShowMoreIntro] = useState(false);
  const [showMoreSeo, setShowMoreSeo] = useState(false);
  // Three cards a row by default; the toggle drops to two bigger ones. The
  // button used to do nothing at all.
  const [wideCards, setWideCards] = useState(false);
  const [season, setSeason] = useState(config.seasons.items[0]);
  const [interest, setInterest] = useState(config.interests.items[0]);
  const [duration, setDuration] = useState(config.durations.items[0]);

  return (
    <div className="india-page">
      {/* =========================
          INTRO SECTION
      ========================== */}
      <section className="india-intro">
        <div className="india-container india-intro-grid">
          <div className="india-intro-content">
            <div className="india-breadcrumb">
              <Link href="/">Home</Link>

              {config.breadcrumbTrail.map((crumb) => (
                <span key={crumb}>
                  › {crumb}
                </span>
              ))}
            </div>

            <h1>{config.heading}</h1>

            <p>{config.intro}</p>

            {showMoreIntro && config.introExtra && (
              <p className="india-extra-text">{config.introExtra}</p>
            )}

            <button
              type="button"
              className="india-read-more"
              onClick={() => setShowMoreIntro(!showMoreIntro)}
            >
              {showMoreIntro ? "Read Less" : "Read More"}

              <ChevronDown
                size={14}
                className={showMoreIntro ? "rotate-chevron" : ""}
              />
            </button>

            {config.packages.length > 0 && (
            <div className="india-rating">
              <div className="india-stars">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={15} fill="currentColor" />
                ))}
              </div>

              <strong>5</strong>

              <span className="rating-divider" />

              <a href="#reviews">{config.reviewsLabel}</a>
            </div>
            )}
          </div>

          {/* CALLBACK FORM */}
          <div className="callback-card">
            <h3>Want us to call you?</h3>

            <label htmlFor={`${config.slug}-callback-name`}>Full Name</label>

            <input
              id={`${config.slug}-callback-name`}
              type="text"
              placeholder="Full Name"
            />

            <label htmlFor={`${config.slug}-callback-mobile`}>Mobile Number</label>

            <div className="mobile-input">
              <span>🇮🇳</span>
              <span className="country-code">+91</span>

              <input
                id={`${config.slug}-callback-mobile`}
                type="tel"
                placeholder="Mobile Number"
              />
            </div>

            <button type="button">
              <Phone size={16} />
              Request Call Back
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORY TABS + LISTING
      ========================== */}
      <section className="india-tabs-section">
        <div className="india-container">
          {config.packages.length > 0 && (
          <div className="india-listing-heading">
            <div className="live-tours-badge">
              <span />
              {config.listing.liveBadgeLabel}
            </div>

            <div className="listing-actions">
              {/* The button offers the layout you are not in, and its icon
                  shows how many cards a row that layout gives. */}
              <button
                type="button"
                onClick={() => setWideCards((on) => !on)}
                aria-pressed={wideCards}
                title={wideCards ? "Show 3 cards per row" : "Show 2 larger cards per row"}
                className={wideCards ? "grid-view is-active" : "grid-view"}
              >
                {wideCards ? <Columns3 size={15} /> : <Columns2 size={15} />}
                {wideCards ? "3 per row" : "2 per row"}
              </button>
            </div>
          </div>
          )}

          <TourListing
            packages={config.packages}
            filters={config.filters}
            wideCards={wideCards}
          />

        </div>
      </section>

      {/* =================================================
          BY REGION / DESTINATION
      ================================================= */}
      {!config.hiddenSections?.includes("regions") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>{config.regions.title}</SectionTitle>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {config.regions.items.map((item, index) => (
              <GradientPill
                key={item.name}
                name={item.name}
                count={item.count}
                index={index}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY INTEREST
      ================================================= */}
      {!config.hiddenSections?.includes("interests") && (
      <section className="bg-white py-12">
        <div className="india-container">
          <SectionTitle>{config.interests.title}</SectionTitle>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {config.interests.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setInterest(item)}
                className={`h-[38px] rounded-full border px-4 text-[13px] font-medium transition ${
                  interest === item
                    ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                    : "border-[#D1D5DB] bg-white text-[#333] hover:border-[#17BEBB]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY SEASON
      ================================================= */}
      {!config.hiddenSections?.includes("seasons") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>{config.seasons.title}</SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {config.seasons.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSeason(item)}
                className={`h-[38px] min-w-[125px] rounded-full border px-4 text-[13px] font-medium transition ${
                  season === item
                    ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                    : "border-[#D1D5DB] bg-white text-[#333] hover:border-[#17BEBB]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY DURATION
      ================================================= */}
      {!config.hiddenSections?.includes("durations") && (
      <section className="bg-white py-12">
        <div className="india-container">
          <SectionTitle>{config.durations.title}</SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {config.durations.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDuration(item)}
                className={`h-[38px] rounded-full border px-4 text-[13px] font-medium transition ${
                  duration === item
                    ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                    : "border-[#D1D5DB] bg-white text-[#333] hover:border-[#17BEBB]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-7 flex max-w-[1180px] flex-wrap justify-center gap-3">
            {config.durations.packages.map((pkg) => {
              const item = toCardItem(pkg);

              return (
                <Link
                  key={pkg.slug}
                  href={`/package/${pkg.slug}`}
                  className="block w-[220px] shrink-0 rounded-[14px] border border-[#E5E7EB] bg-white p-3 no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <div className="h-[80px] rounded-[10px] bg-gradient-to-br from-sky-200 via-orange-200 to-slate-500" />

                  <div className="mt-2.5">
                    <span className="inline-block rounded-[4px] border border-[#17BEBB] bg-[#F7FAFC] px-1.5 py-0.5 text-[11px] font-semibold text-[#0F4C81]">
                      GROUP TOUR
                    </span>

                    <h3 className="mt-2 min-h-[36px] text-[13px] font-semibold leading-[1.3] text-[#1e1e1e]">
                      {pkg.title}
                    </h3>

                    <span className="mt-1 inline-block text-[12px] font-semibold underline">
                      ∞ All Inclusive
                    </span>

                    <div className="mt-3 flex gap-2 text-[12px] text-[#475569]">
                      <span>{item.days}</span>
                      <span>•</span>
                      <span className="underline">{item.cities}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_80px] items-end gap-2 border-t border-[#E5E7EB] pt-2">
                      <div>
                        <p className="text-[11px] text-[#777]">Starting price</p>
                        <strong className="text-[15px]">{item.price}</strong>
                      </div>

                      <span className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#FF7A1A] text-[11px] font-semibold text-white">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          RELATED / EXPLORE MORE
      ================================================= */}
      {config.related && !config.hiddenSections?.includes("related") && (
        <section className="bg-white py-12">
          <div className="india-container">
            {config.related.note && (
              <p className="mx-auto max-w-[820px] text-center text-[13px] leading-[1.7] text-[#555]">
                {config.related.note}
              </p>
            )}

            <SectionTitle>{config.related.title}</SectionTitle>

            <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:grid-cols-4">
              {config.related.items.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className="group relative block h-[145px] transform-gpu overflow-hidden rounded-[14px] border border-[#E5E7EB] no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <div
                    className={`h-full w-full bg-gradient-to-br ${gradients[index % gradients.length]}`}
                  />

                  <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-full bg-black/10" />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-14 text-left">
                    <h3 className="text-[14px] font-semibold text-white group-hover:underline">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          DESTINATION LINK CLOUD
      ================================================= */}
      {config.linkCloud && !config.hiddenSections?.includes("linkCloud") && (
        <section className="bg-white py-10">
          <div className="india-container">
            <SectionTitle>{config.linkCloud.title}</SectionTitle>

            <div className="mx-auto mt-6 flex max-w-[1180px] flex-wrap justify-center gap-2">
              {config.linkCloud.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#D1D5DB] bg-white px-4 py-2 text-[12px] font-medium text-[#333] no-underline transition hover:border-[#17BEBB] hover:text-[#0F4C81]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          BLOGS
      ================================================= */}
      {!config.hiddenSections?.includes("blogs") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>Popular Travel Blogs</SectionTitle>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {config.blogs.map((blog, index) => (
              <article key={blog} className="group cursor-pointer">
                <div
                  className={`h-[115px] rounded-[14px] bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-300 group-hover:scale-[1.02]`}
                />

                <h3 className="mt-2.5 text-[13px] font-medium leading-[1.3] text-[#222] group-hover:text-[#0F4C81]">
                  {blog}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          REVIEWS
      ================================================= */}
      <section id="reviews" className="relative overflow-hidden bg-[#0B3B63] py-12">
        <div className="india-container relative">
          <Quote
            size={100}
            className="absolute -left-3 top-8 text-white/[0.08]"
            fill="currentColor"
          />

          <Quote
            size={100}
            className="absolute -right-3 bottom-0 rotate-180 text-white/[0.08]"
            fill="currentColor"
          />

          <div className="relative z-10 text-center text-white">
            <h2 className="text-[20px] font-bold sm:text-[22px]">Honor Tour & Travels tour reviews</h2>

            <p className="mt-1 text-[13px] text-white/80">
              What are you waiting for? Chalo Bag Bharo Nikal Pado!
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-7 grid max-w-[1180px] gap-4 md:grid-cols-3">
            {config.reviews.map((review) => (
              <article
                key={`${review.name}-${review.tour}`}
                className="relative flex min-h-[205px] flex-col rounded-[14px] border border-[#E5E7EB]/20 bg-white p-4 text-[#222] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#F5A623]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[12px] font-semibold text-[#222]">5</span>
                  </div>

                  <span className="rounded-[4px] border border-[#17BEBB] bg-[#F7FAFC] px-1.5 py-0.5 text-[11px] font-semibold text-[#0F4C81]">
                    {review.category}
                  </span>
                </div>

                <h3 className="mt-3 text-[14px] font-semibold">{review.tour}</h3>

                <p className="mt-3 line-clamp-3 text-[13px] leading-[1.5] text-[#666]">
                  &quot;{review.review}&quot;
                </p>

                <div className="mt-auto flex items-end justify-between border-t border-[#eee] pt-3">
                  <div>
                    <strong className="block text-[13px]">{review.name}</strong>
                    <span className="text-[12px] text-[#888]">Jul, 2026</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ
      ================================================= */}
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <div className="text-center">
            <h2 className="text-[20px] font-bold text-[#222] sm:text-[22px]">{config.faqHeading}</h2>

            <p className="mt-2 text-[13px] text-[#777]">{config.faqSubheading}</p>

            <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#0F4C81]" />
          </div>

          <div className="mx-auto mt-7 max-w-[820px]">
            <FAQAccordion items={config.faqs} />
          </div>
        </div>
      </section>

      {/* =================================================
          SEO CONTENT
      ================================================= */}
      <section className="bg-white py-10">
        <div className="india-container">
          <div className="mx-auto max-w-[1040px]">
            <h2 className="text-[18px] font-semibold text-[#222]">{config.seo.heading}</h2>

            <div className="mt-4 text-[13px] leading-[1.8] text-[#6b6b6b]">
              {config.seo.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 first:mt-0">
                  {paragraph}
                </p>
              ))}

              {showMoreSeo &&
                config.seo.extraParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3">
                    {paragraph}
                  </p>
                ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMoreSeo(!showMoreSeo)}
              className="mt-3 flex items-center gap-1 text-[12px] font-semibold underline"
            >
              {showMoreSeo ? "Read Less" : "Read More"}

              {showMoreSeo ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <div className="mt-6 border-t border-[#ddd] pt-4">
              <p className="text-[12px] text-[#999]">
                {config.heading} | Honor Tour & Travels Holiday Packages | All prices and
                tour information are subject to availability and selected
                itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTACT STRIP
      ================================================= */}
      <section className="border-t border-[#ddd] bg-white">
        <div className="india-container">
          <div className="grid min-h-[72px] grid-cols-2 items-center gap-4 py-3 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <MapPin size={17} className="text-[#0F4C81]" />

              <div>
                <p className="text-[12px] text-[#777]">150+ Honor Tour & Travels Offices</p>
                <button className="text-[13px] font-semibold underline">Locate Us</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={17} className="text-[#0F4C81]" />

              <div>
                <p className="text-[12px] text-[#777]">Request a Quote</p>
                <a href={CONTACT.phoneHref} className="text-[13px] font-semibold underline">
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare size={17} className="text-[#0F4C81]" />

              <div className="min-w-0">
                <p className="text-[12px] text-[#777]">For Feedback</p>
                <span className="break-all text-[13px] font-semibold">{CONTACT.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={17} className="text-[#0F4C81]" />

              <div className="min-w-0">
                <p className="text-[12px] text-[#777]">For Enquiries</p>
                <span className="break-all text-[13px] font-semibold">{CONTACT.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
