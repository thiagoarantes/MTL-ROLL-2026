import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

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

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Get current Google Sheets integration status for public/admin views
  app.get('/api/sheets/status', (req, res) => {
    const config = loadConfig();
    if (config && config.spreadsheetId) {
      return res.json({
        configured: true,
        spreadsheetUrl: config.spreadsheetUrl,
        adminEmail: config.adminEmail,
      });
    }
    return res.json({ configured: false });
  });

  // API: Save admin Google Sheets credentials/config (called after admin authenticates)
  app.post('/api/sheets/config', (req, res) => {
    const { accessToken, spreadsheetId, spreadsheetUrl, adminEmail } = req.body;
    if (!accessToken || !spreadsheetId) {
      return res.status(400).json({ error: 'Missing accessToken or spreadsheetId' });
    }

    const success = saveConfig({
      accessToken,
      spreadsheetId,
      spreadsheetUrl,
      adminEmail,
      updatedAt: new Date().toISOString(),
    });

    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to write configuration file on server.' });
    }
  });

  // API: Disconnect/reset integration
  app.post('/api/sheets/disconnect', (req, res) => {
    const success = deleteConfig();
    if (success) {
      return res.json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to clear configuration on server.' });
    }
  });

  // API: Secure visitor registration sync to admin's Google Sheet
  app.post('/api/sync-registration', async (req, res) => {
    const { registration } = req.body;
    if (!registration) {
      return res.status(400).json({ error: 'Missing registration payload' });
    }

    const config = loadConfig();
    if (!config || !config.accessToken || !config.spreadsheetId) {
      // Not configured, but we succeed silently or with informative status to not block registration flow
      return res.json({
        success: false,
        error: 'Google Sheets sync not active or configured by administrator.',
      });
    }

    try {
      const formattedDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
      const row = [
        [
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
        ],
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`;
      const sheetsResponse = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: row,
        }),
      });

      if (sheetsResponse.status === 401) {
        return res.json({
          success: false,
          expired: true,
          error: 'Admin Google token has expired. Re-authentication required by administrator.',
        });
      }

      if (!sheetsResponse.ok) {
        const errorText = await sheetsResponse.text();
        console.error('Google Sheets append error response:', errorText);
        return res.json({
          success: false,
          error: `Sheets API error: ${sheetsResponse.statusText}`,
        });
      }

      return res.json({ success: true });
    } catch (err: any) {
      console.error('Proxy sheets append exception:', err);
      return res.json({ success: false, error: err.message || 'Server proxy connection error' });
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
