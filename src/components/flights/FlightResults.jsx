"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import FlightFilters from "./FlightFilters";
import FlightResultCard from "./FlightResultCard";
import FlightBookingModal from "./FlightBookingModal";

function getTimeSlot(departureTime) {
  const hour = Number(departureTime.split(":")[0]);
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}

// `onBookNow` replaces the request-a-booking modal, e.g. with a hand-off to the
// supplier's own checkout. `heading` names the list ("Return flights").
export default function FlightResults({ route, airlines: airlineLogos = [], onBookNow, heading }) {
  const { flights, from, to, fromCode, toCode } = route;

  const airlineOptions = useMemo(
    () => Array.from(new Set(flights.map((flight) => flight.airline))),
    [flights]
  );
  const priceBounds = useMemo(() => {
    const prices = flights.map((flight) => flight.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [flights]);

  const [stops, setStops] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    stops.length + timeSlots.length + airlines.length + (maxPrice < priceBounds.max ? 1 : 0);

  useEffect(() => {
    if (!filtersOpen) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setFiltersOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  function toggleValue(list, setList, value) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function handleReset() {
    setStops([]);
    setTimeSlots([]);
    setAirlines([]);
    setMaxPrice(priceBounds.max);
  }

  const filteredFlights = useMemo(() => {
    let result = flights.filter((flight) => {
      if (stops.length > 0 && !stops.includes(flight.stops)) return false;
      if (timeSlots.length > 0 && !timeSlots.includes(getTimeSlot(flight.departureTime))) return false;
      if (airlines.length > 0 && !airlines.includes(flight.airline)) return false;
      if (flight.price > maxPrice) return false;
      return true;
    });

    if (sortBy === "cheapest") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "fastest") {
      result = [...result].sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === "departure") {
      result = [...result].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return result;
  }, [flights, stops, timeSlots, airlines, maxPrice, sortBy]);

  const filtersPanel = (
    <FlightFilters
      airlineOptions={airlineOptions}
      stops={stops}
      onToggleStop={(value) => toggleValue(stops, setStops, value)}
      timeSlots={timeSlots}
      onToggleTimeSlot={(value) => toggleValue(timeSlots, setTimeSlots, value)}
      airlines={airlines}
      onToggleAirline={(value) => toggleValue(airlines, setAirlines, value)}
      maxPrice={maxPrice}
      priceBounds={priceBounds}
      onPriceChange={setMaxPrice}
      onReset={handleReset}
    />
  );

  return (
    <section className="px-3 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#0F172A]">
              {heading ? `${heading} · ` : ""}
              {filteredFlights.length} Flight Option{filteredFlights.length === 1 ? "" : "s"}
            </h2>
            <p className="text-[13px] text-[#6B7280]">
              {from} ({fromCode}) to {to} ({toCode})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex h-[40px] shrink-0 items-center gap-2 rounded-[10px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-semibold text-[#0F172A] transition hover:border-[#17BEBB] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0F4C81] px-1 text-[11px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-[40px] w-full min-w-0 rounded-[10px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#0F172A] outline-none transition-colors focus:border-[#17BEBB] sm:w-auto"
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="cheapest">Sort by: Cheapest</option>
            <option value="fastest">Sort by: Fastest</option>
            <option value="departure">Sort by: Departure Time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar on desktop; on phones the same panel lives in the sheet below. */}
          <div className="hidden lg:block">
            {filtersPanel}
          </div>

          <div className="space-y-3">
            {filteredFlights.length === 0 && (
              <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#6B7280]">
                No flights match the selected filters. Try resetting your filters.
              </div>
            )}

            {filteredFlights.map((flight) => (
              <FlightResultCard
                key={flight.id}
                flight={flight}
                from={from}
                to={to}
                airlines={airlineLogos}
                onBookNow={onBookNow ?? setSelectedFlight}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedFlight && (
        <FlightBookingModal
          flight={selectedFlight}
          from={from}
          to={to}
          onClose={() => setSelectedFlight(null)}
        />
      )}
      {/* FILTER SHEET — phones only; the panel is the same one the sidebar renders */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
          />

          <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[18px] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
            <div className="flex shrink-0 items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
              <div className="flex items-center gap-3">
                <h3 className="text-[15px] font-bold text-[#0F172A]">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[12px] font-semibold text-[#0F4C81] underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#0F172A]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <FlightFilters
                airlineOptions={airlineOptions}
                stops={stops}
                onToggleStop={(value) => toggleValue(stops, setStops, value)}
                timeSlots={timeSlots}
                onToggleTimeSlot={(value) => toggleValue(timeSlots, setTimeSlots, value)}
                airlines={airlines}
                onToggleAirline={(value) => toggleValue(airlines, setAirlines, value)}
                maxPrice={maxPrice}
                priceBounds={priceBounds}
                onPriceChange={setMaxPrice}
                onReset={handleReset}
                showHeader={false}
              />
            </div>

            <div className="shrink-0 border-t border-[#E5E7EB] p-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="h-[46px] w-full rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white"
              >
                Show {filteredFlights.length} flights
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
