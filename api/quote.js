// /api/quote — landing-page quote-request handler.
//
// This is intentionally a stub. It validates the payload, logs to the Vercel
// function logs, and returns success. Wire it to a real backend by following
// the TODO at the bottom of this file.
//
// The existing /api/submit-lead.js writes to Google Sheets + sends email via
// Resend; reuse those helpers (api/_lib/sheets.js, api/_lib/email.js) when
// you're ready to promote this from a stub to production.

const ALLOWED_SERVICES = new Set([
  'House',
  'Driveway',
  'Deck/Patio',
  'Fence',
  'Roof',
  'Gutters',
]);

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  // Loose check — strip non-digits and require 10–15 digits.
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { name, address, email, phone, services, notes } = body;

  // Minimal validation. The form does the heavy lifting; this is the safety net.
  const errors = {};
  if (!name || typeof name !== 'string' || name.trim().length < 2) errors.name = 'Name is required.';
  if (!address || typeof address !== 'string' || address.trim().length < 5) errors.address = 'Address is required.';
  if (!isEmail(email)) errors.email = 'A valid email is required.';
  if (!isPhone(phone)) errors.phone = 'A valid phone number is required.';
  if (!Array.isArray(services) || services.length === 0) {
    errors.services = 'Pick at least one service.';
  } else if (services.some((s) => !ALLOWED_SERVICES.has(s))) {
    errors.services = 'Unknown service selected.';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'Validation failed', fieldErrors: errors });
  }

  // Log so the team can spot-check submissions in Vercel function logs.
  console.log('[quote] new request', {
    receivedAt: new Date().toISOString(),
    name,
    address,
    email,
    phone,
    services,
    notes: typeof notes === 'string' ? notes.slice(0, 500) : '',
    ua: req.headers['user-agent'],
    referer: req.headers['referer'] || req.headers['referrer'] || null,
  });

  // TODO: wire to email + CRM. Two recommended hookups:
  //   1) Reuse api/_lib/sheets.js#appendLeadRow to drop into the existing Google Sheet.
  //   2) Reuse api/_lib/email.js#sendAdminNotification to ping the owner immediately,
  //      and #sendLeadConfirmation to send the homeowner an auto-reply.
  // The shape above is already compatible with submit-lead's `leadData` argument —
  // just spread it through.

  return res.status(200).json({ success: true });
}
