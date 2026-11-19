/* =========================================================
   AIRLINE LOGOS
   Real airline logo files hosted on Wikimedia Commons, loaded
   through its stable "Special:FilePath" redirect (resolves to
   the current upload regardless of file-hash directory, so it
   doesn't break if the file is re-uploaded). If the logo fails
   to load (offline, file renamed, etc.) the component falls
   back to a colored monogram badge below.
========================================================= */

const AIRLINE_STYLES = {
  "Air India": { code: "AI", bg: "#B7202E", text: "#FFFFFF", logoFile: "Air_India_2023.svg" },
  "IndiGo": { code: "6E", bg: "#00205B", text: "#FFFFFF", logoFile: "IndiGo_Airlines_logo.svg" },
  "SpiceJet": { code: "SG", bg: "#EE1C25", text: "#FFFFFF", logoFile: "New_SpiceJet_Logo.png" },
  "Akasa Air": { code: "QP", bg: "#5B2A86", text: "#FFFFFF", logoFile: "Akasa_Air_logo.svg" },
  "Air India Express": { code: "IX", bg: "#F7931E", text: "#FFFFFF", logoFile: "Air_India_Express_logo.svg" },
};

const FALLBACK_STYLE = { bg: "#0F4C81", text: "#FFFFFF" };

// Suppliers spell names their own way ("Spicejet", "Indigo"); match loosely.
const sameName = (a, b) => String(a ?? "").toLowerCase().replace(/s+/g, "") === String(b ?? "").toLowerCase().replace(/s+/g, "");

// `dbAirlines` (from the Airline admin module) takes priority when present,
// so whatever logo the site owner uploads in /admin/airlines is what shows —
// this static map is only the fallback for an airline not yet added there.
export function getAirlineBadge(airlineName, dbAirlines = []) {
  const dbMatch = dbAirlines.find((a) => sameName(a.name, airlineName));
  if (dbMatch) {
    return {
      code: dbMatch.code,
      bg: dbMatch.color || FALLBACK_STYLE.bg,
      text: FALLBACK_STYLE.text,
      logoUrl: dbMatch.logoUrl || null,
    };
  }

  const style = Object.entries(AIRLINE_STYLES).find(([name]) => sameName(name, airlineName))?.[1];
  const code = style?.code || airlineName?.slice(0, 2).toUpperCase() || "?";
  const logoUrl = style?.logoFile
    ? `https://commons.wikimedia.org/wiki/Special:FilePath/${style.logoFile}?width=240`
    : null;
  return {
    code,
    bg: style?.bg || FALLBACK_STYLE.bg,
    text: style?.text || FALLBACK_STYLE.text,
    logoUrl,
  };
}
