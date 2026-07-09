import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react';
import TopNavBar from './components/TopNavBar';
import CalendarView from './components/CalendarView';
import ActivitiesView from './components/ActivitiesView';
import SyndicateView from './components/SyndicateView';
import RegistrationModal from './components/RegistrationModal';
import GoogleSheetsSyncConfig from './components/GoogleSheetsSyncConfig';

import { INITIAL_ACTIVITIES, INITIAL_GUESTS, INITIAL_ORGANIZERS, INITIAL_SPONSORS } from './data';
import { Activity, Guest, Sponsor, Registration } from './types';

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

  // Google Sheets Integration State (Server-backed proxy)
  const [isAdminMode, setIsAdminMode] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('setup') === 'sheets') {
        setIsAdminMode(true);
      }

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

    // Proxy the append request to Google Sheets via server-side API!
    fetch('/api/sync-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registration }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('Secure server proxy successfully appended registration to Admin Sheet!');
        } else {
          console.warn('Proxy Sheets append did not succeed:', data.error);
        }
      })
      .catch((err) => {
        console.error('Error in proxy Sheets sync:', err);
      });
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
      {isAdminMode && (
        <div className="max-w-7xl w-full mx-auto px-6 md:px-16 mb-12">
          <GoogleSheetsSyncConfig lang={lang} />
        </div>
      )}

      {/* Immersive Footer matching screenshots */}
      <footer className="bg-[#111415] py-12 border-t-2 border-[#9500FF]/50 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Copyright Brand Info */}
          <div className="font-headline text-xs font-black uppercase tracking-widest text-center md:text-left text-[#e2e2e4]">
            © 2026 MTL ROLL. RIDE THE WEEKEND.
          </div>

          {/* Socials Link Channels */}
          <div className="flex flex-wrap justify-center gap-6 font-sans text-xs">
            <a 
              href="https://www.facebook.com/groups/rollingtribes" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold flex items-center gap-1.5"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/rollingtribes/" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://rolling-tribes.web.app/" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
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
