"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays, Loader2, PhoneCall } from "lucide-react";

import FlightResults from "./FlightResults";
import { CONTACT } from "@/lib/contact";

/* =========================================================
   LIVE FLIGHT RESULTS
   With a supplier configured, a route page shows real fares
   for the date in the URL (?date=…&adults=… from the search
   form). Without a date it asks for one instead of showing
   sample flights, which would read as real prices.

   Booking happens on the supplier's site: "Book Now" opens
   the `bookingUrl` the search returned, in a new tab.

   Without a supplier the page keeps its sample flights.
========================================================= */

const SEARCH_MESSAGES = [
  "Checking live fares with the airlines…",
  "Comparing IndiGo, Air India, Akasa, SpiceJet and more…",
  "Still searching. Live fares can take up to a minute.",
];

function toCard(offer, travellers) {
  return {
    ...offer,
    id: offer.offerId,
    status: offer.seatsLeft != null && offer.seatsLeft < 4 ? "Few Seats Left" : offer.refundable ? "Refundable" : "Available",
    priceLabel: travellers > 1 ? `total, ${travellers} travellers` : "/ person",
    bookLabel: "Book Now",
  };
}

function Notice({ icon: Icon, title, children }) {
  return (
    <section className="px-3 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px] rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center">
        {Icon && <Icon className="mx-auto h-7 w-7 text-[#17BEBB]" />}
        <p className="mt-2 text-[15px] font-semibold text-[#0F172A]">{title}</p>
        <div className="mt-1.5 text-[13px] text-[#6B7280]">{children}</div>
      </div>
    </section>
  );
}

function CallUs() {
  return (
    <a href={CONTACT.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-[#0F4C81] underline">
      <PhoneCall size={14} /> Call {CONTACT.phone}
    </a>
  );
}

function LiveSearch({ route, airlines }) {
  const params = useSearchParams();
  const date = params.get("date") || "";
  const returnDate = params.get("return") || "";
  const adults = Number(params.get("adults")) || 1;
  const children = Number(params.get("children")) || 0;
  const infants = Number(params.get("infants")) || 0;
  const travellers = adults + children + infants;

  const searchKey = date ? [route.fromCode, route.toCode, date, returnDate, adults, children, infants].join("|") : "";

  // Both are tagged with the search they belong to: a result for an older
  // search simply does not count, so nothing has to be reset by hand.
  const [state, setState] = useState({ key: "", status: "idle" });
  const [tick, setTick] = useState({ key: "", n: 0 });
  const messageIndex = tick.key === searchKey ? tick.n : 0;

  useEffect(() => {
    if (!searchKey) return undefined;

    const controller = new AbortController();

    const ticker = setInterval(
      () =>
        setTick((t) => ({
          key: searchKey,
          n: Math.min((t.key === searchKey ? t.n : 0) + 1, SEARCH_MESSAGES.length - 1),
        })),
      12_000,
    );

    fetch("/api/flights/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: route.fromCode,
        to: route.toCode,
        departDate: date,
        returnDate: returnDate || undefined,
        adults,
        children,
        infants,
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.ok) {
          setState({
            key: searchKey,
            status: "error",
            message: data?.message || "We could not load live fares right now.",
          });
          return;
        }
        setState({ key: searchKey, status: "done", offers: data.offers ?? [], bookingUrl: data.bookingUrl });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ key: searchKey, status: "error", message: "Check your internet connection and try again." });
      })
      .finally(() => clearInterval(ticker));

    return () => {
      controller.abort();
      clearInterval(ticker);
    };
  }, [searchKey, route.fromCode, route.toCode, date, returnDate, adults, children, infants]);

  if (!date) {
    return (
      <Notice icon={CalendarDays} title={`Pick a date to see live ${route.from} to ${route.to} fares`}>
        Choose your travel date and passengers in the search box above, then press Search.
      </Notice>
    );
  }

  if (state.key !== searchKey || state.status === "loading") {
    return (
      <Notice icon={Loader2} title={SEARCH_MESSAGES[messageIndex]}>
        A new search usually takes 20 to 40 seconds. Please keep this page open.
      </Notice>
    );
  }

  if (state.status === "error") {
    return (
      <Notice title={state.message}>
        <p>Try again in a moment, or call us and we will check fares for you.</p>
        <CallUs />
      </Notice>
    );
  }

  const outbound = state.offers.filter((offer) => offer.direction !== "inbound").map((o) => toCard(o, travellers));
  const inbound = state.offers.filter((offer) => offer.direction === "inbound").map((o) => toCard(o, travellers));

  if (outbound.length === 0) {
    return (
      <Notice title={`No flights found from ${route.from} to ${route.to} on this date`}>
        <p>Try another date, or call us and we will look for options.</p>
        <CallUs />
      </Notice>
    );
  }

  const book = () => {
    if (state.bookingUrl) window.open(state.bookingUrl, "_blank", "noopener,noreferrer");
    else window.location.href = CONTACT.phoneHref;
  };

  return (
    <>
      <div className="px-3 pt-6 sm:px-6 lg:px-8">
        <p className="mx-auto w-full max-w-[1280px] rounded-[10px] bg-[#EAF6F6] px-4 py-2.5 text-[12.5px] text-[#0B3B63]">
          Live fares in INR with all taxes, for {travellers} traveller{travellers > 1 ? "s" : ""}. Fares can change
          until payment. Book Now opens our booking partner&apos;s secure checkout, where the final price is
          confirmed.
        </p>
      </div>

      <FlightResults
        key={`out-${searchKey}`}
        route={{ ...route, flights: outbound }}
        airlines={airlines}
        onBookNow={book}
        heading={inbound.length ? "Departure" : undefined}
      />

      {inbound.length > 0 && (
        <FlightResults
          key={`in-${searchKey}`}
          route={{ ...route, from: route.to, to: route.from, fromCode: route.toCode, toCode: route.fromCode, flights: inbound }}
          airlines={airlines}
          onBookNow={book}
          heading="Return"
        />
      )}
    </>
  );
}

export default function LiveFlightResults({ route, airlines = [], live }) {
  // No supplier yet: the sample flights stay, exactly as before.
  if (!live) return <FlightResults route={route} airlines={airlines} />;

  return (
    <Suspense
      fallback={
        <Notice icon={CalendarDays} title={`Pick a date to see live ${route.from} to ${route.to} fares`}>
          Choose your travel date and passengers in the search box above, then press Search.
        </Notice>
      }
    >
      <LiveSearch route={route} airlines={airlines} />
    </Suspense>
  );
}
