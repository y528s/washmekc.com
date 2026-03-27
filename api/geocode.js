export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Address is required' });

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=us`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'NeighborhoodWash/1.0 (hello@washmekc.com)' },
    });

    const data = await response.json();
    if (!data.length) return res.status(404).json({ error: 'Address not found' });

    const result = data[0];
    return res.json({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      formatted_address: result.display_name,
    });
  } catch (err) {
    console.error('Geocode error:', err);
    return res.status(500).json({ error: 'Geocoding failed' });
  }
}
