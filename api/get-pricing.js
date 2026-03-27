import { getPricing } from './_lib/sheets.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const pricing = await getPricing();
    return res.json(pricing || {});
  } catch (err) {
    console.error('Get pricing error:', err);
    return res.status(500).json({ error: 'Failed to fetch pricing' });
  }
}
