import React from 'react';
import { FileSpreadsheet, ExternalLink, LogOut, Check, AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import { User } from 'firebase/auth';

interface GoogleSheetsSyncConfigProps {
  user: User | null;
  spreadsheetInfo: { id: string; url: string } | null;
  isLoading: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefreshSpreadsheet: () => void;
  lang: 'EN' | 'FR' | 'ES';
}

export default function GoogleSheetsSyncConfig({
  user,
  spreadsheetInfo,
  isLoading,
  error,
  onConnect,
  onDisconnect,
  onRefreshSpreadsheet,
  lang,
}: GoogleSheetsSyncConfigProps) {
  const t = {
    syncTitle: lang === 'EN' ? 'Google Sheets Live Sync' : lang === 'FR' ? 'Synchro Google Sheets' : 'Sincronización en Vivo',
    syncDesc:
      lang === 'EN'
        ? 'Automatically sync new event registrations to a Google Spreadsheet live in your Google Drive.'
        : lang === 'FR'
        ? 'Synchronisez automatiquement les nouvelles inscriptions en temps réel dans une feuille Google Sheets.'
        : 'Sincroniza automáticamente los registros en una hoja de cálculo de Google Sheets.',
    connectedAs: lang === 'EN' ? 'CONNECTED AS' : lang === 'FR' ? 'CONNECTÉ EN TANT QUE' : 'CONECTADO COMO',
    disconnect: lang === 'EN' ? 'DISCONNECT' : lang === 'FR' ? 'DÉCONNECTER' : 'DESCONECTAR',
    liveSync: lang === 'EN' ? 'LIVE SYNC ACTIVE' : lang === 'FR' ? 'SYNCHRO LIVE ACTIVE' : 'SINCRONIZACIÓN ACTIVA',
    reconnect: lang === 'EN' ? 'RE-SYNC FILE' : lang === 'FR' ? 'RE-SYNCHRONISER' : 'RE-SINCRONIZAR HILO',
    openSpreadsheet: lang === 'EN' ? 'OPEN SHEET' : lang === 'FR' ? 'OUVRIR FEUILLE' : 'ABRIR HOJA',
    initializing: lang === 'EN' ? 'SYNCING PIPELINE...' : lang === 'FR' ? 'SYNCHRONISATION...' : 'SINCRONIZANDO...',
    googleBtnLabel: lang === 'EN' ? 'Sign in with Google' : lang === 'FR' ? 'Se connecter avec Google' : 'Iniciar sesión con Google',
  };

  return (
    <div className="bg-[#111415] border-2 border-[#9500FF]/30 p-6 relative overflow-hidden group">
      {/* Techno Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E1FD15]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#9500FF]" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: Status / Text Description */}
        <div className="flex items-start gap-4 flex-1">
          <div className={`p-3 rounded-none border ${user ? 'bg-[#9500FF]/10 border-[#9500FF] text-[#E1FD15]' : 'bg-[#1F2833] border-[#333537] text-[#666666]'}`}>
            <FileSpreadsheet className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-headline text-sm font-black uppercase tracking-wider text-white">
                {t.syncTitle}
              </h3>
              {user && (
                <span className="flex items-center gap-1 font-mono text-[9px] text-[#E1FD15] bg-[#9500FF]/25 border border-[#E1FD15]/30 px-2 py-0.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-[#E1FD15] rounded-full animate-ping" />
                  {t.liveSync}
                </span>
              )}
            </div>
            <p className="text-xs text-[#c7c9ac] mt-1 max-w-xl">
              {t.syncDesc}
            </p>

            {user && spreadsheetInfo && (
              <div className="mt-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[10px]">
                <span className="text-[#666666] uppercase">{t.connectedAs}:</span>
                <span className="text-white bg-[#0B0C10] px-2 py-0.5 border border-[#333537] font-bold">
                  {user.email}
                </span>
                <span className="text-[#666666]">//</span>
                <span className="text-[#c7c9ac]">
                  File: <span className="text-[#E1FD15] underline font-bold">MTL Roll Registrations - 2026</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Sync Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
          
          {isLoading && (
            <div className="flex items-center gap-2 font-mono text-xs text-[#E1FD15]">
              <RefreshCw className="w-4 h-4 animate-spin text-[#9500FF]" />
              <span>{t.initializing}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 bg-red-950/20 border border-red-500/30 px-3 py-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !user && (
            <button
              onClick={onConnect}
              className="gsi-material-button font-sans font-bold flex items-center justify-center cursor-pointer relative"
              style={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '0px',
                color: '#1f1f1f',
                fontSize: '13px',
                height: '40px',
                padding: '0 16px',
                width: '100%',
                maxWidth: '240px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
              id="connect-google-sheets-btn"
            >
              <div className="gsi-material-button-state" style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .15s' }}></div>
              <div className="gsi-material-button-content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div className="gsi-material-button-icon" style={{ display: 'flex', width: '20px', height: '20px' }}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '100%', height: '100%' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents" style={{ fontFamily: '"Roboto", arial, sans-serif', fontWeight: '500', letterSpacing: '0.25px' }}>
                  {t.googleBtnLabel}
                </span>
              </div>
            </button>
          )}

          {!isLoading && user && (
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              
              {spreadsheetInfo && (
                <a
                  href={spreadsheetInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#E1FD15] text-[#0B0C10] hover:bg-[#cbf212] font-headline text-[10px] tracking-wider uppercase font-black px-4 py-2.5 transition-all w-full sm:w-auto justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.openSpreadsheet}</span>
                </a>
              )}

              <button
                onClick={onRefreshSpreadsheet}
                className="flex items-center gap-1.5 bg-[#1F2833] border border-[#464932] text-white hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 font-mono text-[9px] tracking-wider uppercase font-bold px-3 py-2.5 transition-all w-full sm:w-auto justify-center cursor-pointer"
                title="Verify spreadsheet connectivity"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.reconnect}</span>
              </button>

              <button
                onClick={onDisconnect}
                className="flex items-center gap-1.5 bg-[#0c0e10] border border-red-500/30 text-red-400 hover:bg-red-950/20 font-mono text-[9px] tracking-wider uppercase font-bold px-3 py-2.5 transition-all w-full sm:w-auto justify-center cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>{t.disconnect}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
