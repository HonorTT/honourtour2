/* =========================================================
   DRAFT DESTINATIONS — matching
   A destination whose admin record is set to "Draft" must not
   be linked from anywhere on the site. Links reach a place in
   two ways, so both are checked:
     - by address: "/india/gujarat-tour-packages"
     - by name: a city inside a state page ("Varanasi" opens
       Uttar Pradesh with ?city=), or a tile such as "Delhi Agra"
       or "Rann of Kutch" that names a drafted place.

   Pure functions with no database access, so client and
   server code can both use them. The list itself comes from
   getDraftDestinations() in src/lib/destinationStatus.js.
========================================================= */

/** "Andhra Pradesh / Telangana Tour Packages" -> "andhra pradesh telangana" */
export function placeWords(value) {
  return ` ${String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\btour packages?\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
}

/** "/india/gujarat-tour-packages?x=1" -> "gujarat-tour-packages" */
export function slugFromHref(href) {
  return String(href ?? "")
    .split(/[?#]/)[0]
    .replace(/\/+$/, "")
    .split("/")
    .pop();
}

/**
 * True when a link points at, or names, a drafted destination.
 * `drafts` is { slugs: string[], names: string[] }; names already went through placeWords.
 */
export function isDraftedPlace({ href, name } = {}, drafts) {
  if (!drafts || (!drafts.slugs?.length && !drafts.names?.length)) return false;

  if (href && String(href).startsWith("/india/") && drafts.slugs.includes(slugFromHref(href))) return true;

  // Whole words only: "Uttar Pradesh" must not catch "Himachal Pradesh".
  const haystack = placeWords(name);
  return haystack.trim() !== "" && drafts.names.some((drafted) => haystack.includes(drafted));
}

/** A list of { name, href } with every drafted place taken out. */
export const withoutDraftedPlaces = (items = [], drafts) => items.filter((item) => !isDraftedPlace(item, drafts));
