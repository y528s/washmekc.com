import { google } from 'googleapis';

let sheetsClient = null;

function getSheets() {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function appendLeadRow(leadData) {
  const sheets = getSheets();

  const row = [
    new Date().toISOString(),
    leadData.name || '',
    leadData.phone || '',
    leadData.email || '',
    leadData.address || '',
    leadData.lat || '',
    leadData.lng || '',
    leadData.sqft || '',
    leadData.stories || '',
    leadData.yearBuilt || '',
    Array.isArray(leadData.services) ? leadData.services.join(', ') : (leadData.services || ''),
    leadData.estimateLow || '',
    leadData.estimateHigh || '',
    leadData.finalTotal || '',
    leadData.depositPaid ? 'Yes' : 'No',
    leadData.photoUrl || '',
    'New',
    'Website',
  ];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Leads!A:R',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });

  return res.data.updates?.updatedRange || null;
}

export async function getPromoCodes() {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Promo Codes!A:H',
  });

  const rows = res.data.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

export async function incrementPromoUsage(code) {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Promo Codes!A:H',
  });

  const rows = res.data.values || [];
  if (rows.length < 2) return;

  const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));
  const timesUsedIdx = headers.indexOf('times_used');
  const codeIdx = headers.indexOf('code');

  if (timesUsedIdx === -1 || codeIdx === -1) return;

  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][codeIdx] || '').toLowerCase() === code.toLowerCase()) {
      const currentUsage = parseInt(rows[i][timesUsedIdx] || '0', 10);
      const rowNum = i + 1;
      const col = String.fromCharCode(65 + timesUsedIdx);

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Promo Codes!${col}${rowNum}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[currentUsage + 1]] },
      });
      break;
    }
  }
}

export async function getPricing() {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Pricing!A:B',
  });

  const rows = res.data.values || [];
  if (rows.length < 2) return null;

  const pricing = {};
  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    const val = rows[i][1];
    if (key) {
      pricing[key] = isNaN(Number(val)) ? val : Number(val);
    }
  }
  return pricing;
}

export async function updateLeadStatus(email, updates) {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Leads!A:R',
  });

  const rows = res.data.values || [];
  if (rows.length < 2) return;

  const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, '_'));
  const emailIdx = headers.indexOf('email');
  const statusIdx = headers.indexOf('status');
  const depositIdx = headers.indexOf('depositpaid');

  for (let i = rows.length - 1; i >= 1; i--) {
    if ((rows[i][emailIdx] || '').toLowerCase() === email.toLowerCase()) {
      const rowNum = i + 1;
      const updateCells = [];

      if (updates.status && statusIdx !== -1) {
        const col = String.fromCharCode(65 + statusIdx);
        updateCells.push(
          sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `Leads!${col}${rowNum}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[updates.status]] },
          })
        );
      }

      if (updates.depositPaid !== undefined && depositIdx !== -1) {
        const col = String.fromCharCode(65 + depositIdx);
        updateCells.push(
          sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `Leads!${col}${rowNum}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[updates.depositPaid ? 'Yes' : 'No']] },
          })
        );
      }

      await Promise.all(updateCells);
      break;
    }
  }
}
