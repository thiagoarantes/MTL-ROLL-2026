import React from 'react';
import TopNavBar from './components/TopNavBar';
import CalendarView from './components/CalendarView';
import ActivitiesView from './components/ActivitiesView';
import SyndicateView from './components/SyndicateView';
import RegistrationModal from './components/RegistrationModal';
import GoogleSheetsSyncConfig from './components/GoogleSheetsSyncConfig';

import { INITIAL_ACTIVITIES, INITIAL_GUESTS, INITIAL_ORGANIZERS, INITIAL_SPONSORS } from './data';
import { Activity, Guest, Sponsor, Registration } from './types';
import { initAuth, googleSignIn, logout, findOrCreateSpreadsheet, appendRegistration } from './lib/googleSheets';
import { User } from 'firebase/auth';

export default function App() {
  // Navigation & Localization
  const [activeView, setActiveView] = React.useState<'calendar' | 'activities' | 'syndicate'>('calendar');
  const [lang, setLang] = React.useState<'EN' | 'FR' | 'ES'>('EN');

  // Registration Modal States
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [preselectedActivityId, setPreselectedActivityId] = React.useState<string | undefined>(undefined);

  // Persistence States
  const [registeredActivityIds, setRegisteredActivityIds] = React.useState<string[]>([]);
  const [sponsors, setSponsors] = React.useState<Sponsor[]>(INITIAL_SPONSORS);

  // Google Sheets Integration State
  const [sheetsUser, setSheetsUser] = React.useState<User | null>(null);
  const [sheetsToken, setSheetsToken] = React.useState<string | null>(null);
  const [spreadsheetInfo, setSpreadsheetInfo] = React.useState<{ id: string; url: string } | null>(null);
  const [syncLoading, setSyncLoading] = React.useState(false);
  const [syncError, setSyncError] = React.useState<string | null>(null);

  // Load from localStorage on mount and initialize Firebase Auth listener
  React.useEffect(() => {
    try {
      const savedReg = localStorage.getItem('mtl_roll_registered_ids');
      if (savedReg) {
        setRegisteredActivityIds(JSON.parse(savedReg));
      }

      const savedSponsors = localStorage.getItem('mtl_roll_sponsors');
      if (savedSponsors) {
        setSponsors(JSON.parse(savedSponsors));
      } else {
        setSponsors(INITIAL_SPONSORS);
      }

      const savedLang = localStorage.getItem('mtl_roll_lang');
      if (savedLang === 'EN' || savedLang === 'FR' || savedLang === 'ES') {
        setLang(savedLang as 'EN' | 'FR' | 'ES');
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }

    // Initialize Firebase Auth / Workspace OAuth
    const unsubscribe = initAuth(
      async (user, token) => {
        setSheetsUser(user);
        setSheetsToken(token);
        await handleLoadSpreadsheet(token);
      },
      () => {
        setSheetsUser(null);
        setSheetsToken(null);
        setSpreadsheetInfo(null);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Handler to switch view and scroll to anchor if needed
  const handleViewChange = (view: 'calendar' | 'activities' | 'syndicate', sectionId?: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(`${sectionId}-anchor`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleChangeLang = (newLang: 'EN' | 'FR' | 'ES') => {
    setLang(newLang);
    localStorage.setItem('mtl_roll_lang', newLang);
  };

  const handleOpenRegister = (activityId?: string) => {
    setPreselectedActivityId(activityId);
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
    setPreselectedActivityId(undefined);
  };

  // Google Sheets integration helpers
  const handleLoadSpreadsheet = async (token: string) => {
    setSyncLoading(true);
    setSyncError(null);
    try {
      const info = await findOrCreateSpreadsheet(token);
      setSpreadsheetInfo(info);
    } catch (err: any) {
      console.error(err);
      setSyncError(lang === 'EN' ? 'Failed to sync Google Sheets file.' : 'Échec de la synchro Google Sheets.');
    } finally {
      setSyncLoading(false);
    }
  };

  const handleConnectSheets = async () => {
    setSyncLoading(true);
    setSyncError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setSheetsUser(result.user);
        setSheetsToken(result.accessToken);
        await handleLoadSpreadsheet(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setSyncError(
        lang === 'EN'
          ? 'Login or spreadsheet setup failed.'
          : lang === 'FR'
          ? "Échec de connexion ou d'initialisation."
          : 'Fallo en el inicio de sesión o configuración.'
      );
    } finally {
      setSyncLoading(false);
    }
  };

  const handleDisconnectSheets = async () => {
    setSyncLoading(true);
    try {
      await logout();
      setSheetsUser(null);
      setSheetsToken(null);
      setSpreadsheetInfo(null);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSyncLoading(false);
    }
  };

  const handleRefreshSpreadsheet = async () => {
    if (sheetsToken) {
      await handleLoadSpreadsheet(sheetsToken);
    } else {
      await handleConnectSheets();
    }
  };

  // Lock custom sponsor slot
  const handleAddSponsor = (newSponsor: Sponsor) => {
    const updatedSponsors = sponsors.map(s => 
      s.slotIndex === newSponsor.slotIndex ? newSponsor : s
    );
    setSponsors(updatedSponsors);
    localStorage.setItem('mtl_roll_sponsors', JSON.stringify(updatedSponsors));
  };

  // Successful registration callback
  const handleRegisterSuccess = (registration: Registration) => {
    // Sync registered activity IDs locally
    const newlySelected = registration.selectedActivityIds;
    const combinedIds = Array.from(new Set([...registeredActivityIds, ...newlySelected]));
    setRegisteredActivityIds(combinedIds);
    localStorage.setItem('mtl_roll_registered_ids', JSON.stringify(combinedIds));

    // Append to Google Sheets if connected!
    if (sheetsToken && spreadsheetInfo) {
      appendRegistration(sheetsToken, spreadsheetInfo.id, registration)
        .then((success) => {
          if (success) {
            console.log('Successfully synced registration to Google Sheets row!');
          } else {
            console.warn('Failed to sync registration to Google Sheets row.');
          }
        })
        .catch((err) => {
          console.error('Error in live Google Sheets append:', err);
        });
    }
  };

  return (
    <div className="bg-[#0B0C10] text-[#e2e2e4] font-sans flex flex-col min-h-screen overflow-x-hidden selection:bg-[#E1FD15] selection:text-[#0B0C10]">
      
      {/* Immersive Background glow elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9500FF]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#E1FD15]/3 blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* Top Navigation Terminal */}
      <TopNavBar
        activeView={activeView}
        onViewChange={handleViewChange}
        onOpenRegister={() => handleOpenRegister()}
        lang={lang}
        onChangeLang={handleChangeLang}
      />

      {/* Primary Context Target */}
      <main className="flex-grow">
        {activeView === 'calendar' && (
          <CalendarView
            onOpenRegister={handleOpenRegister}
            onNavigateToActivities={() => handleViewChange('activities')}
            activities={INITIAL_ACTIVITIES}
            lang={lang}
          />
        )}

        {activeView === 'activities' && (
          <ActivitiesView
            activities={INITIAL_ACTIVITIES}
            registeredActivityIds={registeredActivityIds}
            onOpenRegister={handleOpenRegister}
            lang={lang}
          />
        )}

        {activeView === 'syndicate' && (
          <SyndicateView
            organizers={INITIAL_ORGANIZERS}
            guests={INITIAL_GUESTS}
            sponsors={sponsors}
            onAddSponsor={handleAddSponsor}
            lang={lang}
          />
        )}
      </main>

      {/* Google Sheets Sync Integration Panel */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-16 mb-12">
        <GoogleSheetsSyncConfig
          user={sheetsUser}
          spreadsheetInfo={spreadsheetInfo}
          isLoading={syncLoading}
          error={syncError}
          onConnect={handleConnectSheets}
          onDisconnect={handleDisconnectSheets}
          onRefreshSpreadsheet={handleRefreshSpreadsheet}
          lang={lang}
        />
      </div>

      {/* Immersive Footer matching screenshots */}
      <footer className="bg-[#111415] py-16 border-t-2 border-[#9500FF]/50 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Copyright Brand Info */}
          <div className="font-headline text-xs font-black uppercase tracking-widest text-center md:text-left text-[#e2e2e4]">
            © 2026 MTL ROLL. RIDE THE WEEKEND.
          </div>

          {/* Socials Link Channels */}
          <div className="flex flex-wrap justify-center gap-6 font-sans text-xs">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold"
            >
              Facebook
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold"
            >
              Instagram
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold"
            >
              TikTok
            </a>
          </div>

          {/* Utility/Legal links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 font-sans text-xs">
            <a 
              href="#contact" 
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  lang === 'EN'
                    ? 'MTL ROLL Terminal sync support active: support@mtlroll2026.net'
                    : lang === 'FR'
                    ? 'Assistance Terminal active : support@mtlroll2026.net'
                    : 'Soporte de sincronización de Terminal de MTL ROLL activo: support@mtlroll2026.net'
                );
              }}
            >
              Contact
            </a>
            <a 
              href="#privacy" 
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  lang === 'EN'
                    ? 'MTL ROLL Offline Privacy Protocol 2026: No third-party data tracking. RFID identifiers are cleared post-event.'
                    : lang === 'FR'
                    ? "Protocole Confidentialité MTL ROLL 2026 : Aucun traçage de données tierces. Les identifiants RFID sont supprimés après l'événement."
                    : 'Protocolo de Privacidad fuera de línea de MTL ROLL 2026: Sin seguimiento de datos de terceros. Los identificadores RFID se borran después del evento.'
                );
              }}
            >
              Privacy
            </a>
          </div>

        </div>
      </footer>

      {/* Grid Synced Registration Overlay */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
        activities={INITIAL_ACTIVITIES}
        preselectedActivityId={preselectedActivityId}
        onRegisterSuccess={handleRegisterSuccess}
        lang={lang}
      />

    </div>
  );
}
