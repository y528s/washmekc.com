import { sendContactFormEmail } from './_lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    await sendContactFormEmail({ name, email, phone, message });
    return res.json({ success: true });
  } catch (err) {
    console.error('Send contact email error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
