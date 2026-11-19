import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { searchFlights } from "@/lib/travel/flights/search";
import { TravelError, TravelErrorCode } from "@/lib/travel/errors";
import { getAirports } from "@/lib/flights";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// A fresh search waits 20-40 s on the airlines; the supplier asks for 90 s.
export const maxDuration = 100;

/** The site sells domestic flights only, so both ends must be Indian airports we list. */
async function assertDomestic(body) {
  const indian = new Set(
    (await getAirports()).filter((a) => (a.country || "India") === "India").map((a) => a.code),
  );
  const from = String(body.from ?? "").trim().toUpperCase();
  const to = String(body.to ?? "").trim().toUpperCase();
  if (!indian.has(from) || !indian.has(to)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "We search flights between Indian cities only.", {
      expose: true,
    });
  }
}

export async function POST(request) {
  try {
    const body = await readJson(request);
    await assertDomestic(body);
    const result = await searchFlights(body);

    // An empty list is a valid answer, not an error — the UI shows "no results".
    return ok({ ...result, resultCount: result.offers.length });
  } catch (error) {
    return fail(error, "flights/search");
  }
}
