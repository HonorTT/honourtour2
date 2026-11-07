export const airports = [
  { city: "Mumbai", code: "BOM", country: "India" },
  { city: "Delhi", code: "DEL", country: "India" },
  { city: "Srinagar", code: "SXR", country: "India" },
  { city: "Bangalore", code: "BLR", country: "India" },
  { city: "Hyderabad", code: "HYD", country: "India" },
  { city: "Chennai", code: "MAA", country: "India" },
  { city: "Kolkata", code: "CCU", country: "India" },
  { city: "Pune", code: "PNQ", country: "India" },
  { city: "Ahmedabad", code: "AMD", country: "India" },
  { city: "Goa", code: "GOI", country: "India" },
  { city: "Jaipur", code: "JAI", country: "India" },
  { city: "Lucknow", code: "LKO", country: "India" },
  { city: "Cochin", code: "COK", country: "India" },
  { city: "Leh", code: "IXL", country: "India" },
];

export function slugifyCity(city) {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export function findAirportByCity(city) {
  if (!city) return null;
  const target = slugifyCity(city);
  return airports.find((airport) => slugifyCity(airport.city) === target) || null;
}

export function findAirportBySlugToken(token) {
  if (!token) return null;
  return airports.find((airport) => slugifyCity(airport.city) === token) || null;
}

export function searchAirports(query) {
  const q = query.trim().toLowerCase();
  if (!q) return airports.slice(0, 8);
  return airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(q) || airport.code.toLowerCase().includes(q)
  );
}

export function buildRouteSlug(fromCity, toCity) {
  return `${slugifyCity(fromCity)}-to-${slugifyCity(toCity)}`;
}
