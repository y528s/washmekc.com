import Stripe from 'stripe';
import { appendLeadRow } from './_lib/sheets.js';
import { sendLeadConfirmation, sendAdminNotification } from './_lib/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    name, phone, email, address, lat, lng, sqft, stories, yearBuilt,
    services, estimateLow, estimateHigh, photoUrl, finalTotal,
    origin, saveCard, paymentOption, timing, flexible,
  } = req.body;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const serviceList = Array.isArray(services) ? services.join(', ') : services;
    const isDeposit = paymentOption === 'deposit';
    const chargeAmount = isDeposit ? Math.round(finalTotal * 0.4 * 100) : Math.round(finalTotal * 100);

    const lineItemName = isDeposit
      ? `NeighborhoodWash Deposit (40%) – ${serviceList}`
      : `NeighborhoodWash – ${serviceList}`;

    // Write to sheets (non-blocking)
    const leadData = {
      name, phone, email, address, lat, lng, sqft, stories, yearBuilt,
      services, estimateLow, estimateHigh, photoUrl, finalTotal,
      depositPaid: false, timing, flexible,
    };

    appendLeadRow(leadData).catch(err => console.error('Sheets write failed:', err));

    // Send emails (non-blocking)
    Promise.all([
      sendLeadConfirmation(leadData),
      sendAdminNotification(leadData),
    ]).catch(err => console.error('Email failed:', err));

    // Create Stripe checkout session
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: lineItemName },
          unit_amount: chargeAmount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/BookingConfirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?canceled=true`,
      customer_email: email,
      metadata: {
        name, email, phone, address, services: serviceList,
        final_total: String(finalTotal), payment_option: paymentOption,
      },
    };

    if (saveCard) {
      sessionConfig.payment_intent_data = { setup_future_usage: 'on_session' };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.json({ sessionUrl: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Create checkout error:', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
