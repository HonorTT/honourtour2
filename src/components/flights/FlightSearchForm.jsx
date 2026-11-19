"use client";

import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftRight, CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";

// The airport list is admin-managed and arrives as a prop; the helpers
// stay in the data file because they are pure string work.
import { airports as fallbackAirports, buildRouteSlug } from "@/data/airports";

/* =========================================================
   SHARED FLIGHT SEARCH FORM
   Used on /flights (hero) and /flights/[route] (route hero).
   Client-side only: navigates to
     /flights/from-to-to?date=YYYY-MM-DD[&return=…]&adults=…
   and the route page runs the live search from that query.
========================================================= */

function matchAirports(list, query) {
  const q = query.trim().toLowerCase();
  if (!q) return list.slice(0, 8);
  return list.filter(
    (airport) =>
      airport.city.toLowerCase().includes(q) ||
      airport.code.toLowerCase().includes(q) ||
      (airport.country || "").toLowerCase().includes(q),
  );
}

const todayIso = () => new Date().toLocaleDateString("en-CA");
const noSubscribe = () => () => {};

/** Fills the form from the URL on a results page, so a search can be adjusted. */
function SearchFromUrl({ onLoad }) {
  const params = useSearchParams();
  const key = params.toString();

  useEffect(() => {
    if (key) onLoad(new URLSearchParams(key));
  }, [key, onLoad]);

  return null;
}

function CityField({ label, value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);

  // Swapping From/To changes the value from outside; keep the text in step.
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    setQuery(value);
  }

  const suggestions = matchAirports(options, query).slice(0, 6);

  return (
    <div className="relative min-w-0 flex-1">
      <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
        {label}
      </label>

      <div className="mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2">
        <MapPin size={14} className="shrink-0 text-[#0F172A]" />

        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          className="w-full min-w-0 border-[#0F172A] bg-transparent text-[12px] font-semibold text-[#0F172A] outline-none"
        />
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[56px] z-30 max-h-[220px] overflow-y-auto rounded-[4px] border border-[#D1D5DB] bg-white shadow-xl">
          {suggestions.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                setQuery(airport.city);
                onChange(airport.city);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-[12px] hover:bg-[#F5F7FA]"
            >
              <span className="font-medium text-[#0F172A]">{airport.city}</span>
              <span className="text-[12px] text-[#6B7280]">{airport.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Counter({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <p className="text-[13px] font-semibold text-[#0F172A]">{label}</p>
        <p className="text-[11px] text-[#6B7280]">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D1D5DB] text-[#0F172A] transition hover:border-[#17BEBB] disabled:opacity-40"
        >
          <Minus size={13} />
        </button>
        <span className="w-4 text-center text-[13px] font-bold text-[#0F172A]">{value}</span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D1D5DB] text-[#0F172A] transition hover:border-[#17BEBB] disabled:opacity-40"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

function PassengerField({ pax, setPax }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const total = pax.adults + pax.children;
  const summary = `${pax.adults} Adult${pax.adults > 1 ? "s" : ""}${pax.children ? `, ${pax.children} Child` : ""}${
    pax.infants ? `, ${pax.infants} Infant` : ""
  } · Economy`;

  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
        Passengers &amp; Class
      </label>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-1 flex w-full items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2 text-left"
      >
        <Users size={14} className="shrink-0 text-[#0F172A]" />
        <span className="truncate text-[11px] font-semibold text-[#0F172A]">{summary}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[60px] z-30 w-[260px] rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-2 shadow-xl">
          <Counter
            label="Adults"
            hint="12+ years"
            value={pax.adults}
            min={1}
            max={9 - pax.children}
            onChange={(adults) => setPax({ ...pax, adults, infants: Math.min(pax.infants, adults) })}
          />
          <Counter
            label="Children"
            hint="2-11 years"
            value={pax.children}
            min={0}
            max={9 - pax.adults}
            onChange={(children) => setPax({ ...pax, children })}
          />
          <Counter
            label="Infants"
            hint="Under 2, one per adult"
            value={pax.infants}
            min={0}
            max={pax.adults}
            onChange={(infants) => setPax({ ...pax, infants })}
          />
          <p className="pb-1 pt-1 text-[11px] text-[#6B7280]">
            {total} of 9 seats · up to 9 adults and children per booking.
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mb-1 h-[36px] w-full rounded-[8px] bg-[#0B3B63] text-[12px] font-bold text-white"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default function FlightSearchForm({
  initialFrom = "Mumbai",
  initialTo = "Delhi",
  airports = fallbackAirports,
  compact = false,
}) {
  const router = useRouter();
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [error, setError] = useState("");

  // Today comes from the visitor's clock; the server may sit in another time zone.
  const minDate = useSyncExternalStore(noSubscribe, todayIso, () => "");

  const [loadFromUrl] = useState(() => (params) => {
    const date = params.get("date") || "";
    const back = params.get("return") || "";
    const count = (name, fallback) => {
      const value = Number(params.get(name));
      return Number.isInteger(value) && value >= 0 ? value : fallback;
    };
    setDepartDate(date);
    setReturnDate(back);
    setTripType(back ? "roundtrip" : "oneway");
    setPax({ adults: Math.max(1, count("adults", 1)), children: count("children", 0), infants: count("infants", 0) });
  });

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch(event) {
    event.preventDefault();
    setError("");

    const fromAirport = airports.find((a) => a.city.toLowerCase() === from.trim().toLowerCase());
    const toAirport = airports.find((a) => a.city.toLowerCase() === to.trim().toLowerCase());

    if (!fromAirport || !toAirport) {
      setError("Pick both cities from the list.");
      return;
    }
    if (fromAirport.code === toAirport.code) {
      setError("From and To cannot be the same city.");
      return;
    }
    if (!departDate) {
      setError("Pick a departure date.");
      return;
    }
    if (tripType === "roundtrip" && (!returnDate || returnDate < departDate)) {
      setError("Pick a return date on or after the departure date.");
      return;
    }

    const query = new URLSearchParams({ date: departDate });
    if (tripType === "roundtrip") query.set("return", returnDate);
    query.set("adults", String(pax.adults));
    if (pax.children) query.set("children", String(pax.children));
    if (pax.infants) query.set("infants", String(pax.infants));

    router.push(`/flights/${buildRouteSlug(fromAirport.city, toAirport.city)}?${query}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-md ${compact ? "" : "sm:p-5"}`}
    >
      <Suspense fallback={null}>
        <SearchFromUrl onLoad={loadFromUrl} />
      </Suspense>

      <div className="flex items-center gap-4 text-[12px] font-semibold text-[#0F172A]">
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
            className="accent-[#0F4C81]"
          />
          One Way
        </label>

        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
            className="accent-[#0F4C81]"
          />
          Round Trip
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_0.8fr_0.8fr_1fr_auto]">
        <div className="relative">
          <CityField label="From" value={from} onChange={setFrom} placeholder="Mumbai" options={airports} />

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap origin and destination"
            className="absolute -bottom-[15px] right-3 z-10 flex h-8 w-8 rotate-90 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#0F172A] shadow-md lg:hidden"
          >
            <ArrowLeftRight size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap origin and destination"
          className="mx-auto hidden h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#0F172A] lg:flex"
        >
          <ArrowLeftRight size={14} />
        </button>

        <CityField label="To" value={to} onChange={setTo} placeholder="Delhi" options={airports} />

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Departure
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2">
            <CalendarDays size={14} className="shrink-0 text-[#0F172A]" />
            <input
              type="date"
              value={departDate}
              min={minDate || undefined}
              onChange={(event) => setDepartDate(event.target.value)}
              aria-label="Departure date"
              className="w-full min-w-0 border-[#0F172A] bg-transparent text-[11px] font-semibold text-[#0F172A] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Return
          </label>
          <div
            className={`mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] px-2 py-2 ${
              tripType === "roundtrip" ? "bg-white" : "bg-[#F3F4F6]"
            }`}
          >
            <CalendarDays size={14} className="shrink-0 text-[#0F172A]" />
            <input
              type="date"
              value={tripType === "roundtrip" ? returnDate : ""}
              min={departDate || minDate || undefined}
              onChange={(event) => setReturnDate(event.target.value)}
              disabled={tripType !== "roundtrip"}
              aria-label="Return date"
              className="w-full min-w-0 border-[#0F172A] bg-transparent text-[11px] font-semibold text-[#0F172A] outline-none disabled:text-[#9CA3AF]"
            />
          </div>
        </div>

        <PassengerField pax={pax} setPax={setPax} />

        <button
          type="submit"
          className="flex h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[#FF7A1A] px-5 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F] lg:h-[38px] lg:rounded-[4px] lg:text-[12px] lg:shadow-none lg:hover:translate-y-0"
        >
          <Search size={14} />
          Search
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-[12px] font-semibold text-[#DC2626]">
          {error}
        </p>
      )}
    </form>
  );
}
