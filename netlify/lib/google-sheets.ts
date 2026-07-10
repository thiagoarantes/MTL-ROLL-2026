import { getStore } from '@netlify/blobs';
import { google } from 'googleapis';

const CONFIG_STORE = 'sheets-config';
const CONFIG_KEY = 'config';

export interface SheetsConfig {
  spreadsheetId: string;
  updatedAt: string;
}

export const SHEET_HEADERS = [
  'Ticket ID',
  'Skater Name',
  'Email',
  'Phone',
  'Emergency Contact',
  'Skater Level',
  'Skate Type',
  'Bilingual Preference',
  'Registered Activities',
  'Custom Tag',
  'Registration Time',
];

export function extractSpreadsheetId(input: string): string {
  if (!input) return '';
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  return input.trim();
}

export async function loadConfig(): Promise<SheetsConfig | null> {
  const store = getStore(CONFIG_STORE);
  return (await store.get(CONFIG_KEY, { type: 'json' })) as SheetsConfig | null;
}

export async function saveConfig(config: SheetsConfig): Promise<void> {
  const store = getStore(CONFIG_STORE);
  await store.setJSON(CONFIG_KEY, config);
}

export async function deleteConfig(): Promise<void> {
  const store = getStore(CONFIG_STORE);
  await store.delete(CONFIG_KEY);
}

// Falls back to the GOOGLE_SPREADSHEET_ID env var so a spreadsheet can be
// pre-wired via environment variables without ever touching the UI.
export async function getSpreadsheetId(): Promise<string | null> {
  const config = await loadConfig();
  return config?.spreadsheetId || process.env.GOOGLE_SPREADSHEET_ID || null;
}

export function getGoogleAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error(
      'Google Service Account credentials (GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY) are not set in server environment.',
    );
  }

  // Clean multiline key format issues (e.g. escaped newlines from env var UIs)
  privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1');

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  try {
    const rangeCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:A1',
    });
    if (!rangeCheck.data.values || rangeCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [SHEET_HEADERS],
        },
      });
    }
  } catch (e) {
    console.warn('Headers auto-check failed (continuing with append):', e);
  }
}
