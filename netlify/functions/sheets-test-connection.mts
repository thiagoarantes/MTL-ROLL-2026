import type { Config } from '@netlify/functions';
import { google } from 'googleapis';
import { ensureHeaders, getGoogleAuthClient, getSpreadsheetId } from '../lib/google-sheets';

export default async () => {
  const spreadsheetId = await getSpreadsheetId();

  if (!spreadsheetId) {
    return Response.json({ error: 'No Spreadsheet ID configured. Please set one first.' }, { status: 400 });
  }

  try {
    const auth = getGoogleAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    // Get spreadsheet metadata to verify read access
    const metaResponse = await sheets.spreadsheets.get({ spreadsheetId });
    const title = metaResponse.data.properties?.title || 'Untitled Spreadsheet';

    await ensureHeaders(sheets, spreadsheetId);

    const formattedDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
    const testRow = [
      'TEST-CONN',
      'SYSTEM STATUS CHECK',
      'Live Proxy Connected',
      'N/A',
      'N/A',
      'N/A',
      'N/A',
      'N/A',
      'N/A',
      'Service Account Verified',
      formattedDate,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [testRow] },
    });

    return Response.json({
      success: true,
      title,
      message: 'Successfully established contact! Test sync row written to Sheet1.',
    });
  } catch (err: any) {
    console.error('Service Account Test Connection failure:', err);
    return Response.json(
      {
        success: false,
        error: err.message || 'Verification failed. Confirm permissions and spreadsheet share access.',
      },
      { status: 500 },
    );
  }
};

export const config: Config = {
  path: '/api/sheets/test-connection',
  method: 'POST',
};
