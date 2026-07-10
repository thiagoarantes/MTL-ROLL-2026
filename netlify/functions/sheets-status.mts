import type { Config } from '@netlify/functions';
import { getSpreadsheetId } from '../lib/google-sheets';

export default async () => {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || null;
  const isServiceAccountSetup = !!(email && process.env.GOOGLE_PRIVATE_KEY);
  const spreadsheetId = await getSpreadsheetId();

  return Response.json({
    serviceAccountConfigured: isServiceAccountSetup,
    serviceAccountEmail: email,
    spreadsheetId,
    spreadsheetUrl: spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : null,
    configured: isServiceAccountSetup && !!spreadsheetId,
  });
};

export const config: Config = {
  path: '/api/sheets/status',
  method: 'GET',
};
