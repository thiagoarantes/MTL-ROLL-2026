import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const CONFIG_FILE_PATH = path.join(process.cwd(), 'sheets-config.json');

// Helper to load sheets config
function loadConfig() {
  if (fs.existsSync(CONFIG_FILE_PATH)) {
    try {
      const content = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading sheets-config.json', e);
    }
  }
  return null;
}

// Helper to save sheets config
function saveConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing sheets-config.json', e);
    return false;
  }
}

// Helper to delete sheets config
function deleteConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      fs.unlinkSync(CONFIG_FILE_PATH);
    }
    return true;
  } catch (e) {
    console.error('Error deleting sheets-config.json', e);
    return false;
  }
}

// Helper to clean and extract spreadsheet ID from potential full URL
function extractSpreadsheetId(input: string): string {
  if (!input) return '';
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    return match[1];
  }
  return input.trim();
}

// Helper to get Google Auth client for service account
function getGoogleAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error('Google Service Account credentials (GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY) are not set in server environment.');
  }

  // Clean multiline key format issues
  privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1');

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Get Google Service Account configuration and spreadsheet status
  app.get('/api/sheets/status', (req, res) => {
    const config = loadConfig();
    const envSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const spreadsheetId = (config && config.spreadsheetId) || envSpreadsheetId || null;
    
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || null;
    const isServiceAccountSetup = !!(email && process.env.GOOGLE_PRIVATE_KEY);

    return res.json({
      serviceAccountConfigured: isServiceAccountSetup,
      serviceAccountEmail: email,
      spreadsheetId: spreadsheetId,
      spreadsheetUrl: spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : null,
      configured: isServiceAccountSetup && !!spreadsheetId,
    });
  });

  // API: Configure Spreadsheet ID dynamically
  app.post('/api/sheets/config', (req, res) => {
    const { spreadsheetId: rawSpreadsheetId } = req.body;
    if (!rawSpreadsheetId) {
      return res.status(400).json({ error: 'Spreadsheet ID or URL is required' });
    }

    const cleanId = extractSpreadsheetId(rawSpreadsheetId);
    const success = saveConfig({
      spreadsheetId: cleanId,
      updatedAt: new Date().toISOString(),
    });

    if (success) {
      return res.json({ success: true, spreadsheetId: cleanId });
    } else {
      return res.status(500).json({ error: 'Failed to write configuration on server.' });
    }
  });

  // API: Disconnect/reset Spreadsheet ID
  app.post('/api/sheets/disconnect', (req, res) => {
    const success = deleteConfig();
    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to clear configuration on server.' });
    }
  });

  // API: Test service account access to configured Google Sheet
  app.post('/api/sheets/test-connection', async (req, res) => {
    const config = loadConfig();
    const envSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const spreadsheetId = (config && config.spreadsheetId) || envSpreadsheetId;

    if (!spreadsheetId) {
      return res.status(400).json({ error: 'No Spreadsheet ID configured. Please set one first.' });
    }

    try {
      const auth = getGoogleAuthClient();
      const sheets = google.sheets({ version: 'v4', auth });
      
      // Get spreadsheet metadata to verify read access
      const metaResponse = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      const title = metaResponse.data.properties?.title || 'Untitled Spreadsheet';

      // Attempt to append a test indicator (non-destructively)
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

      // Check/initialize headers if empty
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
              values: [[
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
                'Registration Time'
              ]]
            }
          });
        }
      } catch (e) {
        console.warn('Headers auto-check skipped in test route:', e);
      }

      // Append test status verification row
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [testRow],
        },
      });

      return res.json({
        success: true,
        title,
        message: 'Successfully established contact! Test sync row written to Sheet1.',
      });
    } catch (err: any) {
      console.error('Service Account Test Connection failure:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Verification failed. Confirm permissions and spreadsheet share access.',
      });
    }
  });

  // API: Secure visitor registration sync using Service Account (No visitor or admin login needed)
  app.post('/api/sync-registration', async (req, res) => {
    const { registration } = req.body;
    if (!registration) {
      return res.status(400).json({ error: 'Missing registration payload' });
    }

    const config = loadConfig();
    const envSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const spreadsheetId = (config && config.spreadsheetId) || envSpreadsheetId;

    if (!spreadsheetId) {
      return res.json({
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

      // Auto-initialize headers if completely empty
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
              values: [[
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
                'Registration Time'
              ]]
            }
          });
        }
      } catch (headerErr) {
        console.warn('Headers auto-check failed or Sheet1 empty update failed (continuing with append):', headerErr);
      }

      // Append registration row
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });

      return res.json({ success: true });
    } catch (err: any) {
      console.error('Service Account Secure proxy registration sync failure:', err);
      return res.json({
        success: false,
        error: err.message || 'Secure service account connection failed.',
      });
    }
  });

  // Vite middleware setup (development vs production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
