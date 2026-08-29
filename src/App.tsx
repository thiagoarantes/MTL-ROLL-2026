import React from 'react';
import { Instagram, Facebook, Globe, MapPin } from 'lucide-react';
import TopNavBar from './components/TopNavBar';
import CalendarView from './components/CalendarView';
import SitesMapView from './components/SitesMapView';
import SyndicateView from './components/SyndicateView';
import FaqConductView from './components/FaqConductView';

import { GUESTS, ORGANIZERS, SPONSORS } from './data';
import { Sponsor } from './types';

const REGISTER_FORM_URL = 'https://forms.gle/7A9spHxz3Qm8VyEfA';
const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc1bOWF_xmJuNlZifWtSGFHFhYTJUqjYpvbMZCE_rdhs5js8A/viewform';

export default function App() {
  // Navigation & Localization
  const [activeView, setActiveView] = React.useState<'calendar' | 'map' | 'syndicate' | 'faq'>('calendar');
  const [lang, setLang] = React.useState<'EN' | 'FR' | 'ES'>('EN');

  // Persistence States
  const [sponsors, setSponsors] = React.useState<Sponsor[]>(SPONSORS);

  // Load from localStorage on mount (validating sponsor schema and syncing with data.ts)
  React.useEffect(() => {
    try {
      const savedSponsors = localStorage.getItem('mtl_roll_sponsors');
      if (savedSponsors) {
        const parsed = JSON.parse(savedSponsors);
        // Ensure parsed items match current Sponsor schema
        if (Array.isArray(parsed) && parsed.every(s => typeof s.website === 'string' && typeof s.id === 'string')) {
          // Merge predefined SPONSORS so any newly added sponsor in data.ts is immediately visible
          const baseMap = new Map<string, Sponsor>();
          SPONSORS.forEach(s => baseMap.set(s.id, s));
          parsed.forEach((s: Sponsor) => {
            if (!baseMap.has(s.id)) {
              baseMap.set(s.id, s);
            }
          });
          const merged = Array.from(baseMap.values());
          setSponsors(merged);
          localStorage.setItem('mtl_roll_sponsors', JSON.stringify(merged));
        } else {
          setSponsors(SPONSORS);
          localStorage.setItem('mtl_roll_sponsors', JSON.stringify(SPONSORS));
        }
      } else {
        setSponsors(SPONSORS);
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
  const handleViewChange = (view: 'calendar' | 'map' | 'syndicate' | 'faq', sectionId?: string) => {
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

  const handleAddSponsor = (newSponsor: Sponsor) => {
    const updatedSponsors = [...sponsors.filter(s => s.id !== newSponsor.id), newSponsor];
    setSponsors(updatedSponsors);
    localStorage.setItem('mtl_roll_sponsors', JSON.stringify(updatedSponsors));
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
        lang={lang}
        onChangeLang={handleChangeLang}
        registerFormUrl={REGISTER_FORM_URL}
      />

      {/* Primary Context Target */}
      <main className="flex-grow">
        {activeView === 'calendar' && (
          <CalendarView
            lang={lang}
            registerFormUrl={REGISTER_FORM_URL}
            volunteerFormUrl={VOLUNTEER_FORM_URL}
          />
        )}

        {activeView === 'map' && (
          <SitesMapView
            lang={lang}
            registerFormUrl={REGISTER_FORM_URL}
          />
        )}

        {activeView === 'syndicate' && (
          <SyndicateView
            organizers={ORGANIZERS}
            guests={GUESTS}
            sponsors={sponsors}
            onAddSponsor={handleAddSponsor}
            lang={lang}
          />
        )}

        {activeView === 'faq' && (
          <FaqConductView
            lang={lang}
            registerFormUrl={REGISTER_FORM_URL}
          />
        )}
      </main>

      {/* Immersive Footer matching screenshots */}
      <footer className="bg-[#111415] py-12 border-t-2 border-[#9500FF]/50 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Copyright & Quick Nav */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-left">
            <div className="font-headline text-xs font-black uppercase tracking-widest text-[#e2e2e4]">
              © 2026 MTL ROLL. RIDE THE WEEKEND.
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <button
                onClick={() => handleViewChange('map')}
                className="text-[#E1FD15] hover:underline uppercase tracking-wider cursor-pointer"
              >
                {lang === 'EN' ? 'Sites Map' : lang === 'FR' ? 'Plan des sites' : 'Plan de sitios'}
              </button>
              <span className="text-[#444444]">•</span>
              <button
                onClick={() => handleViewChange('faq')}
                className="text-[#E1FD15] hover:underline uppercase tracking-wider cursor-pointer"
              >
                {lang === 'EN' ? 'FAQ & Conduct' : lang === 'FR' ? 'FAQ & Conduite' : 'FAQ y Conducta'}
              </button>
            </div>
          </div>

          {/* Socials & Community Link Channels */}
          <div className="flex flex-wrap justify-center items-center gap-6 font-sans text-xs">
            <a 
              href="https://chat.whatsapp.com/F7nHbcrNuGJGlpq2oRIlgl" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#666666] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest font-bold flex items-center gap-1.5"
              id="footer-whatsapp-link"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.15C8.94 7.15 8.67 7.22 8.44 7.46C8.21 7.7 7.56 8.31 7.56 9.56C7.56 10.81 8.47 12.01 8.6 12.18C8.73 12.35 10.38 14.9 12.92 16C13.52 16.26 14 16.42 14.37 16.54C14.98 16.73 15.53 16.7 15.97 16.64C16.46 16.57 17.48 16.02 17.69 15.42C17.9 14.82 17.9 14.31 17.84 14.2C17.78 14.1 17.61 14.04 17.36 13.91C17.11 13.78 15.88 13.17 15.65 13.09C15.42 13.01 15.26 12.97 15.09 13.21C14.92 13.46 14.45 14.04 14.31 14.2C14.17 14.37 14.03 14.39 13.78 14.26C13.53 14.14 12.73 13.88 11.78 13.03C11.04 12.37 10.54 11.56 10.4 11.31C10.26 11.06 10.38 10.93 10.51 10.81C10.62 10.7 10.76 10.52 10.89 10.37C11.01 10.22 11.06 10.11 11.14 9.94C11.22 9.78 11.18 9.63 11.12 9.51C11.06 9.38 10.59 8.23 10.4 7.75C10.22 7.29 10.03 7.35 9.88 7.34C9.74 7.33 9.58 7.33 9.41 7.33L9.11 7.15Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
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

    </div>
  );
}
