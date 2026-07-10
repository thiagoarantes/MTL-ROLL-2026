import type { Config } from '@netlify/functions';
import { extractSpreadsheetId, saveConfig } from '../lib/google-sheets';

export default async (req: Request) => {
  const body = await req.json().catch(() => null);
  const rawSpreadsheetId = body?.spreadsheetId;

  if (!rawSpreadsheetId) {
    return Response.json({ error: 'Spreadsheet ID or URL is required' }, { status: 400 });
  }

  const cleanId = extractSpreadsheetId(rawSpreadsheetId);

  try {
    await saveConfig({ spreadsheetId: cleanId, updatedAt: new Date().toISOString() });
    return Response.json({ success: true, spreadsheetId: cleanId });
  } catch (e) {
    console.error('Failed to write sheets configuration:', e);
    return Response.json({ error: 'Failed to write configuration on server.' }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/sheets/config',
  method: 'POST',
};
