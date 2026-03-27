import { Resend } from 'resend';

let resendClient = null;

function getResend() {
  if (resendClient) return resendClient;
  resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

const FROM_EMAIL = 'NeighborhoodWash <noreply@washmekc.com>';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'hello@washmekc.com,jacob@neighborpaint.com').split(',');

export async function sendEmail({ to, subject, html, replyTo }) {
  const resend = getResend();
  return resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
}

export async function sendLeadConfirmation({ name, email, address, services, estimateLow, estimateHigh, finalTotal }) {
  const serviceList = Array.isArray(services) ? services.join(', ') : services;
  const priceDisplay = finalTotal
    ? `$${Number(finalTotal).toFixed(2)}`
    : `$${estimateLow} – $${estimateHigh}`;

  return sendEmail({
    to: email,
    subject: `Your NeighborhoodWash Estimate – ${address}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Neighborhood<span style="color: #007AFF;">Wash</span></h1>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #1a1a1a;">Thanks, ${name}!</h2>
          <p style="color: #555; line-height: 1.6;">We've received your estimate request. Here's a summary:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0; font-weight: 600;">${address}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Services</td><td style="padding: 8px 0; font-weight: 600;">${serviceList}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Estimate</td><td style="padding: 8px 0; font-weight: 600; color: #007AFF;">${priceDisplay}</td></tr>
          </table>
          <p style="color: #555; line-height: 1.6;">Our team will review your request and reach out within 24 hours to confirm scheduling.</p>
          <p style="color: #555;">— The NeighborhoodWash Team</p>
        </div>
        <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; font-size: 12px; color: #999;">
          <p>NeighborhoodWash &bull; Johnson County, KS &bull; 913-701-3077</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminNotification(leadData) {
  const serviceList = Array.isArray(leadData.services) ? leadData.services.join(', ') : leadData.services;

  return sendEmail({
    to: ADMIN_EMAILS,
    subject: `🏠 New Lead: ${leadData.name} – ${leadData.address}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #007AFF; padding: 16px 24px;">
          <h2 style="color: white; margin: 0;">New Estimate Request</h2>
        </div>
        <div style="padding: 24px;">
          <div style="background: #f0f7ff; border: 1px solid #007AFF; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #007AFF;">$${Number(leadData.finalTotal || leadData.estimateHigh || 0).toFixed(2)}</div>
            <div style="color: #666; font-size: 14px;">Estimated Total</div>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; width: 120px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">${leadData.name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadData.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadData.email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Address</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadData.address}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Sqft / Stories</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadData.sqft} sqft / ${leadData.stories} stories</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Services</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceList}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Deposit</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadData.depositPaid ? 'Paid' : 'Not paid'}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
}

export async function sendDepositConfirmation({ name, email, address, services, finalTotal, depositAmount, balanceDue }) {
  return sendEmail({
    to: email,
    subject: `Payment Confirmed – NeighborhoodWash`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Neighborhood<span style="color: #007AFF;">Wash</span></h1>
        </div>
        <div style="padding: 32px 24px;">
          <div style="background: #e8f5e9; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
            <div style="color: #2e7d32; font-size: 18px; font-weight: 600;">✓ Payment Received</div>
          </div>
          <h2 style="color: #1a1a1a;">Thanks, ${name}!</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0; font-weight: 600;">${address}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Services</td><td style="padding: 8px 0; font-weight: 600;">${Array.isArray(services) ? services.join(', ') : services}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Total</td><td style="padding: 8px 0; font-weight: 600;">$${Number(finalTotal).toFixed(2)}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Deposit Paid</td><td style="padding: 8px 0; font-weight: 600; color: #2e7d32;">$${Number(depositAmount).toFixed(2)}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Balance Due</td><td style="padding: 8px 0; font-weight: 600;">$${Number(balanceDue).toFixed(2)}</td></tr>
          </table>
          <p style="color: #555; line-height: 1.6;">We'll be in touch within 24 hours to confirm your service date.</p>
        </div>
        <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; font-size: 12px; color: #999;">
          <p>NeighborhoodWash &bull; Johnson County, KS &bull; 913-701-3077</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactFormEmail({ name, email, phone, message }) {
  return sendEmail({
    to: ADMIN_EMAILS,
    subject: `Contact Form: ${name}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #888; width: 100px;">Name</td><td style="padding: 8px; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Email</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Phone</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="color: #333; white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
      </div>
    `,
  });
}
