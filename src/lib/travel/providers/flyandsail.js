import { notSupported, TravelError, TravelErrorCode } from "../errors.js";

/* =========================================================
   FLY & SAIL ADAPTER  (B2B partner API v1)
   Search only. Booking, payment and ticketing happen on
   flyandsail.in: the customer picks a flight here and is
   sent to the `bookingUrl` the search returns.

   Prices are INR, taxes and our agreed markup included, and
   are the TOTAL for all passengers. A new search takes
   20-40 s (live from the airlines); a repeat within 10 min
   answers from their cache in under a second.

   Env (server only):
     TRAVEL_PROVIDER=flyandsail
     TRAVEL_FLIGHTS_API_KEY=fas_live_...   (x-api-key)
     TRAVEL_API_BASE_URL                   (optional override)
========================================================= */

const DEFAULT_BASE_URL = "https://rquzpprcjnopofslufch.supabase.co/functions/v1/api";

// Their docs ask for at least 90 s; slower than that is treated as a failure.
const SEARCH_TIMEOUT_MS = 90_000;

const CABINS = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
};

function config() {
  const apiKey = (process.env.TRAVEL_FLIGHTS_API_KEY || process.env.TRAVEL_API_KEY || "").trim();
  if (!apiKey) {
    throw new TravelError(TravelErrorCode.PROVIDER_NOT_CONFIGURED, "TRAVEL_FLIGHTS_API_KEY is not set");
  }
  const baseUrl = (process.env.TRAVEL_API_BASE_URL || DEFAULT_BASE_URL).trim().replace(/\/+$/, "");
  return { apiKey, baseUrl };
}

/** Their error codes, mapped to what our routes and UI understand. */
function supplierError(status, code, message) {
  if (status === 429 || code === "daily_limit") {
    return new TravelError(
      TravelErrorCode.SUPPLIER_UNAVAILABLE,
      "Flight search is busy right now. Please call us and we will check fares for you.",
      { expose: true, details: { supplierCode: code } },
    );
  }
  if (status === 504 || code === "supplier_timeout") {
    return new TravelError(TravelErrorCode.TIMEOUT, "Airline systems were slow to respond. Please try again.", {
      expose: true,
    });
  }
  if (status === 400) {
    // Our own validation runs first, so this is rare; their message is plain English.
    return new TravelError(TravelErrorCode.INVALID_SEARCH, message || "Please check the search details.", {
      expose: true,
    });
  }
  // 401 / 403: our key is wrong or paused. Never tell the customer that.
  console.error(`[travel] flyandsail ${status} ${code}: ${message}`);
  return new TravelError(TravelErrorCode.SUPPLIER_UNAVAILABLE, `flyandsail returned ${status}`);
}

async function get(path, query) {
  const { apiKey, baseUrl } = config();
  const url = `${baseUrl}${path}?${new URLSearchParams(query)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      headers: { "x-api-key": apiKey, accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new TravelError(TravelErrorCode.TIMEOUT, "Airline systems were slow to respond. Please try again.", {
        expose: true,
        cause: error,
      });
    }
    throw new TravelError(TravelErrorCode.SUPPLIER_UNAVAILABLE, "flyandsail unreachable", { cause: error });
  } finally {
    clearTimeout(timer);
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.ok === false) {
    throw supplierError(response.status, payload?.error?.code, payload?.error?.message);
  }
  return payload;
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

/** Only a real https link may become a button on our site. */
function safeBookingUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toOffer(flight, direction) {
  const fares = Array.isArray(flight.fares) ? flight.fares : [];
  const cheapest = fares[0] ?? null;
  const departure = String(flight.departure ?? "");
  const arrival = String(flight.arrival ?? "");
  const stops = Number(flight.stops) || 0;
  const seatsLeft = Number(cheapest?.seatsLeft);
  const durationMinutes = Number(flight.durationMinutes) || 0;

  return {
    offerId: `${direction}:${flight.flightNumbers}:${departure}`,
    fareKey: cheapest?.fareId ?? `${flight.flightNumbers}:${departure}`,
    direction,
    airline: flight.airline,
    airlineCode: flight.airlineCode ?? null,
    flightNumber: flight.flightNumbers,
    fromCode: flight.from,
    toCode: flight.to,
    departure,
    arrival,
    departureTime: departure.slice(11, 16),
    arrivalTime: arrival.slice(11, 16),
    // Overnight arrivals show "+1" on the card.
    arrivesNextDay: Boolean(departure && arrival && arrival.slice(0, 10) > departure.slice(0, 10)),
    durationMinutes,
    duration: formatDuration(durationMinutes),
    stops,
    stopsLabel: stops === 0 ? "Non-stop" : `${stops} Stop${stops > 1 ? "s" : ""}`,
    price: Number(flight.lowestPrice ?? cheapest?.price),
    seatsLeft: Number.isFinite(seatsLeft) ? seatsLeft : null,
    refundable: cheapest?.refundable ?? null,
    fareType: cheapest?.fareType ?? null,
    checkInBaggage: cheapest?.checkInBaggage ?? null,
    cabinBaggage: cheapest?.cabinBaggage ?? null,
  };
}

export const flyAndSailProvider = {
  id: "flyandsail",
  label: "Fly & Sail",

  capabilities: {
    flights: { search: true, revalidate: false, book: false, cancel: false },
    hotels: { search: false, details: false, revalidate: false, book: false, cancel: false },
    buses: { search: false, seats: false, lock: false, book: false, cancel: false },
  },

  flights: {
    async search(params) {
      const query = {
        from: params.from,
        to: params.to,
        date: params.departDate,
        adults: String(params.adults),
        children: String(params.children),
        infants: String(params.infants),
        cabin: CABINS[params.cabin] ?? "Economy",
      };
      if (params.returnDate) query.return = params.returnDate;

      const data = await get("/flights/search", query);

      const offers = [
        ...(data.outbound ?? []).map((flight) => toOffer(flight, "outbound")),
        ...(data.inbound ?? []).map((flight) => toOffer(flight, "inbound")),
      ].filter((offer) => offer.airline && Number.isFinite(offer.price) && offer.price > 0);

      return {
        searchId: null,
        offers,
        bookingUrl: safeBookingUrl(data.bookingUrl),
        cached: Boolean(data.cached),
      };
    },

    revalidate: () => {
      throw notSupported("flight revalidation");
    },
    book: () => {
      throw notSupported("flight booking");
    },
    cancel: () => {
      throw notSupported("flight cancellation");
    },
    getBooking: () => {
      throw notSupported("flight booking lookup");
    },
  },

  hotels: {},
  buses: {},
};
