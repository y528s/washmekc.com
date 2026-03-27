export const SERVICE_CONFIGS = [
  { id: "house",     label: "House Washing",    defaultLow: 329, defaultHigh: 379 },
  { id: "driveway",  label: "Driveway Cleaning", defaultLow: 129, defaultHigh: 179 },
  { id: "patio",     label: "Patio Cleaning",    defaultLow: 149, defaultHigh: 199 },
  { id: "deck",      label: "Deck Cleaning",     defaultLow: 199, defaultHigh: 299 },
  { id: "fence",     label: "Fence Washing",     defaultLow: 199, defaultHigh: 299 },
  { id: "roof",      label: "Roof Soft Wash",    defaultLow: 399, defaultHigh: 699 },
  { id: "gutters",   label: "Gutter Cleaning",   defaultLow: 149, defaultHigh: 249 },
  { id: "walkways",  label: "Walkway Cleaning",  defaultLow: 69,  defaultHigh: 129 },
];

export function computeHouseWash(sqft, stories, pricing) {
  if (!pricing?.base_price_per_sqft) return 0;
  let price = (sqft || 2200) * pricing.base_price_per_sqft;
  const multiplier = pricing.story_multiplier || 1;
  if (stories === 2) price *= multiplier;
  else if (stories >= 3) price *= Math.pow(multiplier, 2);
  price = price * 1.03;
  price = Math.round(price / 18) * 18;
  return Math.max(price, pricing.min_estimate || 0);
}

export function getServicePriceLow(svcId, sqft, stories, pricing) {
  if (svcId === "house") return computeHouseWash(sqft, stories, pricing);
  const cfg = SERVICE_CONFIGS.find(s => s.id === svcId);
  return pricing?.[`${svcId}_price_low`] ?? cfg?.defaultLow ?? 0;
}

export function getServicePriceHigh(svcId, sqft, stories, pricing) {
  if (svcId === "house") return computeHouseWash(sqft, stories, pricing);
  const cfg = SERVICE_CONFIGS.find(s => s.id === svcId);
  return pricing?.[`${svcId}_price_high`] ?? cfg?.defaultHigh ?? 0;
}

/** Returns { low, high, servicePrices } where servicePrices[id] = low price */
export function computeServicesTotal(services, sqft, stories, pricing) {
  const servicePrices = {};
  let low = 0, high = 0;
  for (const svcId of services) {
    const priceLow = getServicePriceLow(svcId, sqft, stories, pricing);
    const priceHigh = getServicePriceHigh(svcId, sqft, stories, pricing);
    servicePrices[svcId] = priceLow;
    low += priceLow;
    high += priceHigh;
  }
  return { low, high, servicePrices };
}