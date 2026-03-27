import Stripe from 'stripe';
import { updateLeadStatus } from './_lib/sheets.js';
import { sendDepositConfirmation } from './_lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const meta = session.metadata || {};
    const finalTotal = parseFloat(meta.final_total || '0');
    const isDeposit = meta.payment_option === 'deposit';
    const depositAmount = isDeposit ? finalTotal * 0.4 : finalTotal;
    const balanceDue = isDeposit ? finalTotal - depositAmount : 0;

    // Update lead in sheets
    try {
      await updateLeadStatus(meta.email, {
        status: 'Deposit Paid',
        depositPaid: true,
      });
    } catch (sheetErr) {
      console.error('Sheet update failed:', sheetErr);
    }

    // Send confirmation email
    try {
      await sendDepositConfirmation({
        name: meta.name,
        email: meta.email,
        address: meta.address,
        services: meta.services,
        finalTotal,
        depositAmount,
        balanceDue,
      });
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr);
    }

    return res.json({
      success: true,
      depositPaid: true,
      customerName: meta.name,
      address: meta.address,
      services: meta.services,
      finalTotal: finalTotal.toFixed(2),
      depositAmount: depositAmount.toFixed(2),
      balanceDue: balanceDue.toFixed(2),
    });
  } catch (err) {
    console.error('Verify deposit error:', err);
    return res.status(500).json({ error: 'Failed to verify deposit' });
  }
}
