import React from 'react';
import { FileSpreadsheet, ExternalLink, Trash2, AlertCircle, RefreshCw, Copy, Check, Terminal, Play, HelpCircle } from 'lucide-react';

interface GoogleSheetsSyncConfigProps {
  lang: 'EN' | 'FR' | 'ES';
}

export default function GoogleSheetsSyncConfig({ lang }: GoogleSheetsSyncConfigProps) {
  const [isSetup, setIsSetup] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = React.useState<string | null>(null);
  const [spreadsheetUrl, setSpreadsheetUrl] = React.useState<string | null>(null);
  
  const [inputValue, setInputValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isTesting, setIsTesting] = React.useState<boolean>(false);
  
  const [copied, setCopied] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [testResult, setTestResult] = React.useState<{ success: boolean; text: string } | null>(null);

  // Load configuration status from backend on mount
  const fetchStatus = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/sheets/status');
      if (!res.ok) throw new Error('Failed to retrieve server integration status.');
      const data = await res.json();
      
      setIsSetup(data.serviceAccountConfigured);
      setEmail(data.serviceAccountEmail);
      setSpreadsheetId(data.spreadsheetId);
      setSpreadsheetUrl(data.spreadsheetUrl);
      if (data.spreadsheetId) {
        setInputValue(data.spreadsheetId);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStatus();
  }, []);

  // Save Spreadsheet ID
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/sheets/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId: inputValue.trim() }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update Spreadsheet settings.');
      
      setSuccessMsg(lang === 'EN' ? 'Spreadsheet ID saved successfully.' : 'ID de feuille de calcul enregistré.');
      fetchStatus();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  // Test Connection
  const handleTestConnection = async () => {
    setIsTesting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/sheets/test-connection', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          text: `SUCCESS: Shared document connection verified! Row appended. Title: "${data.title}"`,
        });
      } else {
        throw new Error(data.error || 'Server rejected verification query.');
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        text: `FAILED: ${err.message}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Disconnect/Reset Config
  const handleDisconnect = async () => {
    if (!window.confirm(lang === 'EN' ? 'Are you sure you want to clear the target spreadsheet settings?' : 'Voulez-vous vraiment effacer les paramètres ?')) return;
    
    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/sheets/disconnect', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to disconnect Google Sheet config.');
      
      setInputValue('');
      setSpreadsheetId(null);
      setSpreadsheetUrl(null);
      setSuccessMsg(lang === 'EN' ? 'Spreadsheet disconnected.' : 'Feuille déconnectée.');
      fetchStatus();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to clear configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  // Copy email helper
  const handleCopyEmail = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    title: lang === 'EN' ? 'Google Sheets Live Sync Control Center' : 'Centre de contrôle Google Sheets',
    serviceAccount: lang === 'EN' ? 'Service Account' : 'Compte de service',
    credentials: lang === 'EN' ? 'CREDENTIALS STATUS' : 'STATUT DES CRÉDENTIELS',
    active: lang === 'EN' ? 'ACTIVE & SECURE' : 'ACTIF & SÉCURISÉ',
    notFound: lang === 'EN' ? 'NOT CONFIGURED IN SECRETS' : 'NON CONFIGURÉ DANS LES SECRETS',
    envInstructions: lang === 'EN' 
      ? 'Define GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your server environment secrets/settings to activate.'
      : 'Définissez GOOGLE_SERVICE_ACCOUNT_EMAIL et GOOGLE_PRIVATE_KEY dans les secrets d’environnement pour activer.',
    shareRequired: lang === 'EN' ? 'Action Required: Invite to Google Sheet' : 'Action requise: Inviter sur Google Sheet',
    shareRequiredDesc: lang === 'EN'
      ? 'Google Sheets requires sharing permission. Copy the service email below and share your Google Sheet with it as an Editor:'
      : 'Google Sheets nécessite l’autorisation de partage. Copiez l’adresse du compte de service et partagez votre feuille avec lui en tant qu’Éditeur:',
    targetId: lang === 'EN' ? 'Target Google Sheet ID or Full URL' : 'ID ou URL complète de la Google Sheet',
    saveBtn: lang === 'EN' ? 'Save Connection' : 'Enregistrer la connexion',
    saving: lang === 'EN' ? 'Saving...' : 'Enregistrement...',
    testSync: lang === 'EN' ? 'Run Test Row Sync' : 'Tester la synchronisation',
    testing: lang === 'EN' ? 'Testing Sync...' : 'Test en cours...',
    clearSettings: lang === 'EN' ? 'Disconnect Sheet' : 'Déconnecter la feuille',
    howItWorksTitle: lang === 'EN' ? 'Offline-Proof Sync Architecture' : 'Architecture de synchronisation robuste',
    howItWorksDesc: lang === 'EN'
      ? 'This is a server-to-server proxy integration. Visitor registrations are instantly piped securely using the backend service account. No user logins are requested, and connections never expire after an hour!'
      : 'Il s’agit d’une intégration de proxy serveur à serveur. Les inscriptions des visiteurs sont immédiatement envoyées en toute sécurité via le compte de service backend. Aucun login visiteur n’est requis, et la connexion n’expire jamais !',
  };

  return (
    <div className="bg-[#111415] border-2 border-[#9500FF]/50 p-6 relative overflow-hidden group">
      {/* Techno Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E1FD15]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#9500FF]" />

      <div className="flex items-center gap-3 border-b border-[#333537] pb-4 mb-5">
        <div className="p-2 bg-[#9500FF]/15 border border-[#9500FF] text-[#E1FD15]">
          <FileSpreadsheet className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-headline text-base font-black uppercase tracking-wider text-white">
            {t.title}
          </h2>
          <p className="font-mono text-[9px] text-[#c7c9ac] tracking-wide mt-0.5">
            // STATUS: {isLoading ? 'QUERYING ENGINE...' : spreadsheetId ? 'PROXY PIPELINE ACTIVE' : 'AWAITING SETUP'}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 font-mono text-xs text-[#E1FD15] gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#9500FF]" />
          <span>QUERYING BACKEND INTEGRATION CHANNELS...</span>
        </div>
      ) : (
        <div className="space-y-5">
          
          {/* Status Message Display */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 bg-red-950/20 border border-red-500/30 p-3 font-mono text-xs text-red-500">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2.5 bg-emerald-950/20 border border-emerald-500/30 p-3 font-mono text-xs text-emerald-400">
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Grid Layout: Status & Share Alert */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Status Section */}
            <div className="bg-[#0B0C10] border border-[#333537] p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#666666] block uppercase tracking-wider">
                  {t.credentials}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSetup ? 'bg-[#E1FD15] animate-pulse' : 'bg-red-500'}`} />
                  <span className="font-headline font-bold text-sm tracking-wide text-white uppercase">
                    {isSetup ? t.active : t.notFound}
                  </span>
                </div>
                {!isSetup && (
                  <p className="text-xs text-red-400/80 mt-2 font-mono text-[10px] leading-relaxed">
                    {t.envInstructions}
                  </p>
                )}
                {isSetup && email && (
                  <div className="mt-3.5 space-y-2">
                    <span className="font-mono text-[10px] text-[#666666] block uppercase">
                      SERVICE EMAIL ADDRESS:
                    </span>
                    <div className="flex items-center gap-1.5 bg-[#111415] border border-[#333537] px-2.5 py-1.5 rounded-none">
                      <span className="font-mono text-[10px] text-[#E1FD15] break-all select-all flex-1">
                        {email}
                      </span>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 text-[#c7c9ac] hover:text-[#E1FD15] border border-transparent hover:border-[#333537] transition-all shrink-0"
                        title="Copy Service Account Email"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#E1FD15]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 border-t border-[#333537] pt-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#9500FF] shrink-0" />
                <div className="font-sans text-[10px] text-[#c7c9ac] leading-tight">
                  <strong className="text-white block uppercase mb-0.5">{t.howItWorksTitle}</strong>
                  {t.howItWorksDesc}
                </div>
              </div>
            </div>

            {/* Sharing Instructions */}
            <div className="bg-[#9500FF]/5 border border-[#9500FF]/30 p-4 flex flex-col justify-between">
              <div>
                <span className="flex items-center gap-1.5 text-[#E1FD15] font-headline text-xs font-black uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  {t.shareRequired}
                </span>
                <p className="text-xs text-[#c7c9ac] mt-2 leading-relaxed">
                  {t.shareRequiredDesc}
                </p>
                <div className="mt-4 p-3 bg-[#0B0C10] border border-[#333537] font-mono text-[10px] space-y-1 text-white">
                  <div>1. Open your targeted Google Spreadsheet.</div>
                  <div>2. Click the <span className="text-[#E1FD15] font-bold">"Share"</span> button at top-right.</div>
                  <div>3. Paste the Service Account address and grant it <span className="text-[#E1FD15] font-bold">"Editor"</span> access.</div>
                  <div>4. Click send to authorize live sync uploads.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Configuration Form */}
          {isSetup && (
            <form onSubmit={handleSave} className="bg-[#0B0C10] border border-[#333537] p-4 space-y-3">
              <label className="block">
                <span className="font-mono text-[10px] text-[#666666] block uppercase tracking-wider mb-1.5">
                  {t.targetId}
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. 1A2B3C4D... or full spreadsheet browser link"
                    className="flex-1 bg-[#111415] border border-[#333537] hover:border-[#9500FF] focus:border-[#E1FD15] focus:outline-none px-3.5 py-2.5 font-mono text-xs text-white placeholder-gray-600 rounded-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSaving || !inputValue.trim()}
                    className="bg-[#9500FF] text-white hover:bg-[#8000DB] disabled:bg-[#333537] disabled:text-[#666666] font-headline text-xs font-black uppercase tracking-wider px-6 py-2.5 transition-all shrink-0"
                  >
                    {isSaving ? t.saving : t.saveBtn}
                  </button>
                </div>
              </label>

              {spreadsheetId && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#333537]/50 pt-3.5 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                      CONNECTED
                    </span>
                    <span className="text-[#666666] font-mono text-[10px]">//</span>
                    <span className="font-mono text-[10px] text-gray-500 break-all select-all">
                      ID: {spreadsheetId}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {spreadsheetUrl && (
                      <a
                        href={spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-[#E1FD15] text-[#0B0C10] hover:bg-[#cbf212] font-headline text-[9px] tracking-wider uppercase font-black px-3.5 py-2 transition-all w-full sm:w-auto justify-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>OPEN SHEET</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      className="flex items-center gap-1.5 bg-[#1F2833] border border-[#333537] hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 text-white font-mono text-[9px] tracking-wider uppercase font-bold px-3 py-2 transition-all w-full sm:w-auto justify-center cursor-pointer"
                    >
                      {isTesting ? <RefreshCw className="w-3 h-3 animate-spin text-[#E1FD15]" /> : <Play className="w-3 h-3 text-[#E1FD15]" />}
                      <span>{isTesting ? t.testing : t.testSync}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="flex items-center gap-1.5 bg-[#0c0e10] border border-red-500/20 text-red-400 hover:bg-red-950/20 font-mono text-[9px] tracking-wider uppercase font-bold px-3 py-2 transition-all w-full sm:w-auto justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{t.clearSettings}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Connection Test Diagnostic Console */}
          {testResult && (
            <div className="bg-[#0B0C10] border border-[#333537] p-4 font-mono text-xs rounded-none">
              <div className="flex items-center gap-2 text-white border-b border-[#333537] pb-2 mb-2.5">
                <Terminal className="w-4 h-4 text-[#E1FD15]" />
                <span className="font-bold text-[10px] uppercase tracking-wider">SYNC VERIFICATION OUTPUT LOG</span>
              </div>
              <div className={`p-3 border text-[11px] leading-relaxed break-all ${testResult.success ? 'bg-emerald-950/10 border-emerald-500/30 text-emerald-400' : 'bg-red-950/10 border-red-500/30 text-red-400'}`}>
                {testResult.text}
              </div>
              {testResult.success && (
                <p className="text-[10px] text-gray-500 mt-2">
                  ℹ️ The verification row was appended to your Google Sheet. Verify that a line with "TEST-CONN" and "SYSTEM STATUS CHECK" is now visible in the first tab.
                </p>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
