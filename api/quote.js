// /api/quote — landing-page quote-request handler.
//
// Validates the payload and emails the lead to the owner via Resend.
// Email send is best-effort (logs but doesn't fail the request) so a
// transient Resend hiccup never bricks the form. The Vercel function
// log is the durable record of every submission.
//
// Required env vars on Vercel:
//   RESEND_API_KEY       — Resend API key
//   ADMIN_EMAILS         — comma-separated, e.g. "hello@washmekc.com,jacob@neighborpaint.com"
//
// Optional:
//   RESEND_FROM_EMAIL    — defaults to "NeighborhoodWash <noreply@washmekc.com>"

import { Resend } from 'resend';

const ALLOWED_SERVICES = new Set(['House', 'Driveway', 'Deck/Patio', 'Fence', 'Roof', 'Gutters']);

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

// Tiny HTML escape — anything the homeowner typed gets escaped before it
// goes into the email body.
function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function homeownerHtml({ name, address, services }) {
  const firstName = (name || '').split(' ')[0] || 'neighbor';
  const serviceList = Array.isArray(services) ? services.join(', ') : (services || '');
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1A1F2E;">
      <div style="background: #1E3A5F; padding: 24px; text-align: center;">
        <h1 style="color: #FAFAF7; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
          Neighborhood<span style="color: #F4B324;">Wash</span>
        </h1>
      </div>
      <div style="padding: 32px 24px; background: #FAFAF7;">
        <h2 style="margin: 0 0 12px 0; font-size: 22px;">Got it, ${escapeHtml(firstName)}.</h2>
        <p style="line-height: 1.6; color: #5A6478; margin: 0 0 16px 0;">
          Thanks for reaching out. We'll text you within 24 hours with a flat-rate quote. No call center, no upsell scripts.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 15px;">
          <tr><td style="padding: 8px 0; color: #5A6478; width: 110px;">Address</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(address)}</td></tr>
          <tr><td style="padding: 8px 0; color: #5A6478;">Services</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(serviceList)}</td></tr>
        </table>
        <p style="line-height: 1.6; color: #5A6478; margin: 16px 0 0 0;">A copy of our certificate of insurance comes with the quote.</p>
        <p style="line-height: 1.6; color: #5A6478; margin: 8px 0 0 0;">— The NeighborhoodWash team</p>
      </div>
      <div style="background: #f1f1ee; padding: 14px 24px; text-align: center; font-size: 12px; color: #5A6478;">
        NeighborhoodWash · Overland Park, KS · (913) 701-3077
      </div>
    </div>
  `;
}

function adminHtml({ name, address, email, phone, services, notes }) {
  const serviceList = Array.isArray(services) ? services.join(', ') : (services || '');
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1A1F2E;">
      <div style="background: #F4B324; padding: 14px 20px;">
        <h2 style="margin: 0; color: #1A1F2E; font-size: 18px;">New landing-page quote request</h2>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14.5px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #5A6478; width: 110px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #5A6478;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${escapeHtml(phone)}" style="color: #1E3A5F;">${escapeHtml(phone)}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #5A6478;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #1E3A5F;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #5A6478;">Address</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(address)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #5A6478;">Services</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(serviceList)}</td></tr>
        </table>
        ${
          notes
            ? `<div style="margin-top: 16px; padding: 14px; background: #FAFAF7; border-left: 3px solid #1E3A5F; border-radius: 4px;">
                <div style="font-size: 12px; color: #5A6478; margin-bottom: 4px;">Notes</div>
                <div style="white-space: pre-wrap; color: #1A1F2E;">${escapeHtml(notes)}</div>
              </div>`
            : ''
        }
        <p style="margin-top: 18px; font-size: 12px; color: #5A6478;">
          Source: landing page (washmekc.com/) · ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
        </p>
      </div>
    </div>
  `;
}

let resend = null;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { name, address, email, phone, services, notes } = body;

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

  const safeNotes = typeof notes === 'string' ? notes.slice(0, 1000) : '';
  const lead = {
    name: name.trim(),
    address: address.trim(),
    email: email.trim(),
    phone: phone.trim(),
    services,
    notes: safeNotes,
  };

  // Durable record — always logs.
  console.log('[quote] new request', {
    receivedAt: new Date().toISOString(),
    ...lead,
    ua: req.headers['user-agent'],
    referer: req.headers['referer'] || req.headers['referrer'] || null,
  });

  // Best-effort email. Don't fail the request if Resend is down.
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'NeighborhoodWash <noreply@washmekc.com>';
  const adminEmails = (process.env.ADMIN_EMAILS || 'hello@washmekc.com').split(',').map((s) => s.trim()).filter(Boolean);

  if (process.env.RESEND_API_KEY) {
    const client = getResend();
    Promise.allSettled([
      client.emails.send({
        from: fromEmail,
        to: [lead.email],
        subject: 'Got your quote request – NeighborhoodWash',
        html: homeownerHtml(lead),
      }),
      client.emails.send({
        from: fromEmail,
        to: adminEmails,
        subject: `Lead: ${lead.name} — ${lead.address}`,
        reply_to: lead.email,
        html: adminHtml(lead),
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`[quote] email ${i === 0 ? 'homeowner' : 'admin'} failed:`, r.reason?.message || r.reason);
        }
      });
    });
  } else {
    console.warn('[quote] RESEND_API_KEY not set — skipping email send. Lead is in the function log only.');
  }

  return res.status(200).json({ success: true });
}
