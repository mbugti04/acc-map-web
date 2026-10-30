const EARTH_RADIUS_MILES = 3958.8;
const FEET_PER_MILE = 5280;
export const METERS_PER_MILE = 1609.344;

const toRadians = (degrees) => degrees * Math.PI / 180;

// Great-circle (haversine) distance between two [lat, lng] points, in miles
export function distanceMiles([lat1, lng1], [lat2, lng2]) {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
}

// Feet under a tenth of a mile, miles above it, e.g. "350 feet away" or "1.2 miles away"
export function formatDistance(miles) {
  if (miles < 0.1) {
    const feet = Math.max(10, Math.round(miles * FEET_PER_MILE / 10) * 10);
    return `${feet} feet away`;
  }
  const rounded = miles < 10 ? parseFloat(miles.toFixed(1)) : Math.round(miles);
  return `${rounded} ${rounded === 1 ? 'mile' : 'miles'} away`;
}

// Short label for a radius filter, e.g. "¼ mile" or "5 miles"
export function formatRadius(miles) {
  const fractions = { 0.25: '¼', 0.5: '½' };
  if (fractions[miles]) return `${fractions[miles]} mile`;
  return `${miles} ${miles === 1 ? 'mile' : 'miles'}`;
}
