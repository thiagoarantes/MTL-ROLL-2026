import type { Config } from '@netlify/functions';
import { google } from 'googleapis';
import { ensureHeaders, getGoogleAuthClient, getSpreadsheetId } from '../lib/google-sheets';

export default async (req: Request) => {
  const body = await req.json().catch(() => null);
  const registration = body?.registration;

  if (!registration) {
    return Response.json({ error: 'Missing registration payload' }, { status: 400 });
  }

  const spreadsheetId = await getSpreadsheetId();

  if (!spreadsheetId) {
    return Response.json({
      success: false,
      error: 'Google Sheets live sync has not been configured with a target Spreadsheet ID on the server.',
    });
  }

  try {
    const auth = getGoogleAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const formattedDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
    const row = [
      registration.id,
      registration.skaterName,
      registration.email,
      registration.phone || 'N/A',
      registration.emergencyContact || 'N/A',
      registration.skaterLevel,
      registration.skateType,
      registration.bilingualPref,
      Array.isArray(registration.selectedActivityIds) ? registration.selectedActivityIds.join(', ') : '',
      registration.customTag || 'N/A',
      formattedDate,
    ];

    await ensureHeaders(sheets, spreadsheetId);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return Response.json({ success: true });
  } catch (err: any) {
    console.error('Service Account Secure proxy registration sync failure:', err);
    return Response.json({
      success: false,
      error: err.message || 'Secure service account connection failed.',
    });
  }
};

export const config: Config = {
  path: '/api/sync-registration',
  method: 'POST',
};
