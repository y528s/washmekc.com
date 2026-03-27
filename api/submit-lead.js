import { appendLeadRow } from './_lib/sheets.js';
import { sendLeadConfirmation, sendAdminNotification } from './_lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const leadData = req.body;

  try {
    // Write to Google Sheets (primary data store)
    await appendLeadRow(leadData);

    // Send emails (non-blocking — don't fail the lead submission)
    try {
      await Promise.all([
        sendLeadConfirmation(leadData),
        sendAdminNotification(leadData),
      ]);
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Submit lead error:', err);
    return res.status(500).json({ error: 'Failed to submit lead' });
  }
}
