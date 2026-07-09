import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Registration } from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request the Sheets and Drive scopes
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If we have a user but no cached token, they need to sign in again to get the fresh credential token
        cachedAccessToken = null;
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

// Sign in via Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token from login.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Logout
export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Find or Create the Google Spreadsheet
export const findOrCreateSpreadsheet = async (
  accessToken: string
): Promise<{ id: string; url: string }> => {
  const fileName = 'MTL Roll Registrations - 2026';

  try {
    // 1. Search Google Drive for an existing spreadsheet with this name
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
      fileName
    )}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id,name,webViewLink)`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Drive search failed: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    if (searchData.files && searchData.files.length > 0) {
      const existingFile = searchData.files[0];
      return {
        id: existingFile.id,
        url: existingFile.webViewLink || `https://docs.google.com/spreadsheets/d/${existingFile.id}`,
      };
    }

    // 2. If not found, create a new spreadsheet
    const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: fileName,
        },
      }),
    });

    if (!createResponse.ok) {
      throw new Error(`Sheets creation failed: ${createResponse.statusText}`);
    }

    const createdData = await createResponse.json();
    const newId = createdData.spreadsheetId;
    const newUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${newId}`;

    // 3. Write Headers
    const headers = [
      [
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
      ],
    ];

    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${newId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`;
    const appendResponse = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: headers,
      }),
    });

    if (!appendResponse.ok) {
      console.warn('Headers initialization append failed:', appendResponse.statusText);
    }

    return { id: newId, url: newUrl };
  } catch (error) {
    console.error('findOrCreateSpreadsheet failed:', error);
    throw error;
  }
};

// Append a registration record to the spreadsheet
export const appendRegistration = async (
  accessToken: string,
  spreadsheetId: string,
  registration: Registration
): Promise<boolean> => {
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
        registration.selectedActivityIds.join(', '),
        registration.customTag || 'N/A',
        formattedDate,
      ],
    ];

    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`;
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: row,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sheets record append failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('appendRegistration failed:', error);
    return false;
  }
};
