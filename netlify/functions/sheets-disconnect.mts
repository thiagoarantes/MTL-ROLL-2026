import type { Config } from '@netlify/functions';
import { deleteConfig } from '../lib/google-sheets';

export default async () => {
  try {
    await deleteConfig();
    return Response.json({ success: true });
  } catch (e) {
    console.error('Failed to clear sheets configuration:', e);
    return Response.json({ error: 'Failed to clear configuration on server.' }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/sheets/disconnect',
  method: 'POST',
};
