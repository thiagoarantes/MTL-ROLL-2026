import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react';
import TopNavBar from './components/TopNavBar';
import CalendarView from './components/CalendarView';
import SyndicateView from './components/SyndicateView';
import FaqConductView from './components/FaqConductView';

import { GUESTS, ORGANIZERS, SPONSORS } from './data';
import { Sponsor } from './types';

const REGISTER_FORM_URL = 'https://forms.gle/7A9spHxz3Qm8VyEfA';
const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc1bOWF_xmJuNlZifWtSGFHFhYTJUqjYpvbMZCE_rdhs5js8A/viewform';

export default function App() {
  // Navigation & Localization
  const [activeView, setActiveView] = React.useState<'calendar' | 'syndicate' | 'faq'>('calendar');
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
  const handleViewChange = (view: 'calendar' | 'syndicate' | 'faq', sectionId?: string) => {
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
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <button
                onClick={() => handleViewChange('faq')}
                className="text-[#E1FD15] hover:underline uppercase tracking-wider cursor-pointer"
              >
                {lang === 'EN' ? 'FAQ & Conduct' : lang === 'FR' ? 'FAQ & Conduite' : 'FAQ y Conducta'}
              </button>
            </div>
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

    </div>
  );
}
