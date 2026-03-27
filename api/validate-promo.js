import { getPromoCodes, incrementPromoUsage, getPricing } from './_lib/sheets.js';

const DEFAULT_PRICES = {
  house: 329, driveway: 129, patio: 149, deck: 199, fence: 199, roof: 399, gutters: 149, walkways: 69,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, subtotal, sqft, stories } = req.body;
  if (!code) return res.status(400).json({ valid: false, reason: 'Code is required' });

  try {
    const promoCodes = await getPromoCodes();
    const promo = promoCodes.find(p => (p.code || '').toLowerCase() === code.toLowerCase());

    if (!promo) return res.json({ valid: false, reason: 'Invalid promo code' });
    if (promo.is_active?.toLowerCase() !== 'true') return res.json({ valid: false, reason: 'This code is no longer active' });

    if (promo.expiry_date) {
      const expiry = new Date(promo.expiry_date);
      if (expiry < new Date()) return res.json({ valid: false, reason: 'This code has expired' });
    }

    const timesUsed = parseInt(promo.times_used || '0', 10);
    const maxUses = parseInt(promo.max_uses || '0', 10);
    if (maxUses > 0 && timesUsed >= maxUses) {
      return res.json({ valid: false, reason: 'This code has reached its usage limit' });
    }

    let discount = 0;
    let freeServiceId = null;
    let freeServiceLabel = null;
    let freeServicePrice = 0;

    const discountType = (promo.discount_type || '').toLowerCase();
    const discountValue = parseFloat(promo.discount_value || '0');

    if (discountType === 'percentage') {
      discount = (subtotal * discountValue) / 100;
    } else if (discountType === 'fixed') {
      discount = discountValue;
    } else if (discountType === 'free_service') {
      freeServiceId = promo.free_service_id || null;
      if (freeServiceId) {
        let pricing = null;
        try { pricing = await getPricing(); } catch {}

        if (freeServiceId === 'house' && sqft) {
          const basePricePerSqft = pricing?.base_price_per_sqft || 0.12;
          const storyMultiplier = stories > 1 ? (pricing?.story_multiplier || 1.5) : 1;
          const minEstimate = pricing?.min_estimate || 199;
          freeServicePrice = Math.max(sqft * basePricePerSqft * storyMultiplier, minEstimate);
        } else {
          const priceKey = `${freeServiceId}_price_low`;
          freeServicePrice = pricing?.[priceKey] || DEFAULT_PRICES[freeServiceId] || 0;
        }

        const labels = { house: 'House Washing', driveway: 'Driveway Cleaning', patio: 'Patio Cleaning', deck: 'Deck Cleaning', fence: 'Fence Cleaning', roof: 'Roof Cleaning', gutters: 'Gutter Cleaning', walkways: 'Walkway Cleaning' };
        freeServiceLabel = labels[freeServiceId] || freeServiceId;
        discount = freeServicePrice;
      }
    }

    // Increment usage
    try { await incrementPromoUsage(code); } catch (err) { console.error('Failed to increment promo usage:', err); }

    return res.json({
      valid: true,
      discount: Math.round(discount * 100) / 100,
      discountType: discountType,
      discountValue,
      code: promo.code,
      freeServiceId,
      freeServiceLabel,
      freeServicePrice: Math.round(freeServicePrice * 100) / 100,
    });
  } catch (err) {
    console.error('Validate promo error:', err);
    return res.status(500).json({ error: 'Failed to validate promo code' });
  }
}
