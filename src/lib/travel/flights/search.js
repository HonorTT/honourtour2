import { flightOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { isIsoDate } from "../validate.js";

/* =========================================================
   FLIGHT SEARCH
   Validates the query, asks the adapter, and guarantees the
   shape the existing FlightResults UI already renders.
========================================================= */

const CABINS = ["economy", "premium_economy", "business", "first"];

export function normaliseSearchParams(input = {}) {
  const from = String(input.from ?? "").trim().toUpperCase();
  const to = String(input.to ?? "").trim().toUpperCase();

  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick a valid origin and destination airport.", { expose: true });
  }
  if (from === to) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Origin and destination cannot be the same.", { expose: true });
  }
  if (!isIsoDate(input.departDate)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick a departure date.", { expose: true });
  }
  if (input.departDate < new Date().toISOString().slice(0, 10)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Departure date cannot be in the past.", { expose: true });
  }
  if (input.returnDate && !isIsoDate(input.returnDate)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Return date is not valid.", { expose: true });
  }
  if (input.returnDate && input.returnDate < input.departDate) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Return date must be after departure.", { expose: true });
  }

  const adults = Number(input.adults ?? 1);
  const children = Number(input.children ?? 0);
  const infants = Number(input.infants ?? 0);

  if (!Number.isInteger(adults) || adults < 1 || adults > 9) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Between 1 and 9 adults.", { expose: true });
  }
  if (adults + children > 9) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Up to 9 travellers per booking.", { expose: true });
  }
  if (infants > adults) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Each infant needs an accompanying adult.", { expose: true });
  }

  return {
    from,
    to,
    departDate: input.departDate,
    returnDate: input.returnDate || null,
    adults,
    children: Number.isInteger(children) && children >= 0 ? children : 0,
    infants: Number.isInteger(infants) && infants >= 0 ? infants : 0,
    cabin: CABINS.includes(input.cabin) ? input.cabin : "economy",
    currency: (input.currency || "INR").toUpperCase(),
  };
}

/** An offer the UI can render and the booking flow can trust. */
function assertOfferShape(offer) {
  const missing = ["offerId", "fareKey", "airline", "price"].filter((key) => offer?.[key] == null);
  if (missing.length) {
    throw new TravelError(
      TravelErrorCode.SUPPLIER_UNAVAILABLE,
      `Adapter returned an offer missing: ${missing.join(", ")}`
    );
  }
  return { ...offer, isLive: true };
}

export async function searchFlights(input) {
  const params = normaliseSearchParams(input);
  const result = await flightOps.search(params);

  const offers = Array.isArray(result?.offers) ? result.offers.map(assertOfferShape) : [];

  return {
    searchId: result?.searchId ?? null,
    params,
    offers,
    // Suppliers that sell on their own site hand back where to send the customer.
    bookingUrl: result?.bookingUrl ?? null,
    searchedAt: new Date().toISOString(),
  };
}
