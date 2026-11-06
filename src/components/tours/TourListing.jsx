"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import TourFilterSidebar from "./TourFilterSidebar";
import TourPackageCard from "./TourPackageCard";
import EnquiryTrigger from "@/components/common/EnquiryTrigger";
import { toCardItem, filterPackages, packageMatchesKeyword } from "./tourUtils";

/* =========================================================
   GENERIC TOUR LISTING (filters + package cards)
   Filters are REAL: toggling a city/country/package type/
   speciality/duration checkbox or moving the price slider
   actually narrows down the `packages` array below.
========================================================= */

const PER_PAGE = 12;

/** [1, "gap", 4, 5, 6, "gap", 20] — first, last and a window around current. */
function pageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => pages.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => pages.add(n));

  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? ["gap", page] : [page],
  );
}

export default function TourListing({ packages, badgeTag, filters = {}, wideCards = false }) {
  const listingRef = useRef(null);
  const isFirstRender = useRef(true);

  const priceBounds = useMemo(() => {
    if (packages.length === 0) return { min: 0, max: 0 };
    const prices = packages.map((pkg) => pkg.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [packages]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState([]);
  const [selectedSpecialityTours, setSelectedSpecialityTours] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [sortBy, setSortBy] = useState("deals");
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function handleReset() {
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedPackageTypes([]);
    setSelectedSpecialityTours([]);
    setSelectedDurations([]);
    setSortBy("deals");
    setMaxPrice(priceBounds.max);
  }

  const effectiveMaxPrice = maxPrice === 0 ? priceBounds.max : maxPrice;

  const filteredPackages = useMemo(
    () =>
      filterPackages(packages, {
        countries: selectedCountries,
        cities: selectedCities,
        packageTypes: selectedPackageTypes,
        specialityTours: selectedSpecialityTours,
        durations: selectedDurations,
        maxPrice: effectiveMaxPrice || priceBounds.max,
      }),
    [
      packages,
      selectedCountries,
      selectedCities,
      selectedPackageTypes,
      selectedSpecialityTours,
      selectedDurations,
      effectiveMaxPrice,
      priceBounds.max,
    ]
  );

  // Filtering can shrink the results list a lot, shrinking page height —
  // if the browser was scrolled deep into a long list, it then clamps the
  // scroll position to the new (shorter) page and the user lands on the
  // footer with no warning. Keep the listing in view when filters change.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    listingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [
    selectedCountries,
    selectedCities,
    selectedPackageTypes,
    selectedSpecialityTours,
    selectedDurations,
    effectiveMaxPrice,
  ]);

  // "deals" keeps the order the admin set on each package; the rest reorder
  // a copy so the original list is left alone.
  const sortedPackages = useMemo(() => {
    if (sortBy === "deals") return filteredPackages;

    const byKey = {
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      duration: (a, b) => a.days - b.days,
    };

    return byKey[sortBy] ? [...filteredPackages].sort(byKey[sortBy]) : filteredPackages;
  }, [filteredPackages, sortBy]);



  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(sortedPackages.length / PER_PAGE));

  // Filtering down to fewer pages must not strand the visitor on page 7.
  const currentPage = Math.min(page, totalPages);

  const visiblePackages = sortedPackages.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const goToPage = (next) => {
    setPage(next);
    listingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // A country box that every tour on the page matches filters nothing — on a
  // Kashmir page "India" just sat there. Options that cannot narrow the list
  // are dropped, and the group disappears when fewer than two are left.
  const availableCountries = useMemo(() => {
    const useful = (filters.countries ?? []).filter((country) => {
      const hits = packages.filter((pkg) => packageMatchesKeyword(pkg, country)).length;
      return hits > 0 && hits < packages.length;
    });

    return useful.length > 1 ? useful : [];
  }, [filters.countries, packages]);

  const sidebarProps = {
    ...filters,
    countries: availableCountries,
    priceBounds,
    maxPrice: effectiveMaxPrice || priceBounds.max,
    onPriceChange: setMaxPrice,
    selectedCountries,
    onToggleCountry: (value) => toggle(selectedCountries, setSelectedCountries, value),
    selectedCities,
    onToggleCity: (value) => toggle(selectedCities, setSelectedCities, value),
    sortBy,
    onSortChange: setSortBy,
    selectedPackageTypes,
    onTogglePackageType: (value) => toggle(selectedPackageTypes, setSelectedPackageTypes, value),
    selectedSpecialityTours,
    onToggleSpeciality: (value) => toggle(selectedSpecialityTours, setSelectedSpecialityTours, value),
    selectedDurations,
    onToggleDuration: (value) => toggle(selectedDurations, setSelectedDurations, value),
    onReset: handleReset,
  };

  // Filters have nothing to work on when the destination has no tours, and a
  // price slider stuck at zero only makes the page look broken.
  if (packages.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#667085]">
        <p className="text-[15px] font-semibold text-[#0F172A]">
          We are still putting tours together for this destination.
        </p>
        <p className="mt-1.5">Tell us your dates and we will plan a custom itinerary for you.</p>
        <EnquiryTrigger
          subject="Custom itinerary request"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#E56A0F]"
        >
          Plan My Trip
        </EnquiryTrigger>
      </div>
    );
  }

  return (
    <div ref={listingRef} className="grid grid-cols-1 gap-7 scroll-mt-24 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* MOBILE FILTER TOGGLE */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#D1D5DB] bg-white text-[13px] font-semibold text-[#222] transition hover:border-[#17BEBB] hover:text-[#0F4C81] lg:hidden"
      >
        <SlidersHorizontal size={14} />
        Filter Your Tour
      </button>

      {/* DESKTOP SIDEBAR (sticky, scrolls internally if taller than viewport) */}
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto">
          <TourFilterSidebar {...sidebarProps} />
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/40 transition-opacity"
          />

          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col overflow-y-auto bg-[#f5f5f5] shadow-xl transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3.5">
              <h3 className="text-[14px] font-semibold">Filter Your Tour</h3>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#333] hover:bg-[#eee]"
              >
                <X size={16} />
              </button>
            </div>

            <TourFilterSidebar {...sidebarProps} />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="sticky bottom-0 mt-auto h-[44px] w-full rounded-[10px] bg-[#FF7A1A] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]"
            >
              Show {filteredPackages.length} Packages
            </button>
          </div>
        </div>
      )}

      {/* content-start: the filter column is tall, and without this a short list
          stretches its rows to match, pulling the cards to 700px. */}
      <div
        className={`grid grid-cols-1 content-start gap-4 sm:grid-cols-2${wideCards ? "" : " lg:grid-cols-3"}`}
      >
        {filteredPackages.length === 0 && (
          <div className="col-span-full rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#667085]">
            <p>No packages match the selected filters.</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 rounded-full border border-[#0F4C81] px-4 py-2 text-[12px] font-semibold text-[#0F4C81] transition hover:bg-[#0F4C81] hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

        {visiblePackages.map((pkg) => (
          <TourPackageCard key={pkg.slug} item={toCardItem(pkg, badgeTag)} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Pages of tours" className="flex flex-wrap items-center justify-center gap-2 lg:col-start-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#333] transition hover:border-[#17BEBB] disabled:cursor-not-allowed disabled:border-[#E5E7EB] disabled:text-[#b9bec6] disabled:hover:border-[#E5E7EB]"
          >
            Previous
          </button>

          {pageItems(currentPage, totalPages).map((item, index) =>
            item === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-[13px] text-[#777]">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => goToPage(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`h-9 min-w-9 rounded-[8px] border px-2 text-[13px] font-medium transition ${
                  item === page
                    ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                    : "border-[#D1D5DB] bg-white text-[#333] hover:border-[#17BEBB]"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#333] transition hover:border-[#17BEBB] disabled:cursor-not-allowed disabled:border-[#E5E7EB] disabled:text-[#b9bec6] disabled:hover:border-[#E5E7EB]"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
