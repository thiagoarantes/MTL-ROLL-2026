import React from 'react';
import { Globe, Menu, X } from 'lucide-react';

interface TopNavBarProps {
  activeView: 'calendar' | 'syndicate';
  onViewChange: (view: 'calendar' | 'syndicate', sectionId?: string) => void;
  lang: 'EN' | 'FR' | 'ES';
  onChangeLang: (lang: 'EN' | 'FR' | 'ES') => void;
  registerFormUrl?: string;
  boutiqueUrl?: string;
}

export default function TopNavBar({
  activeView,
  onViewChange,
  lang,
  onChangeLang,
  registerFormUrl = 'https://forms.gle/7A9spHxz3Qm8VyEfA',
  boutiqueUrl = 'https://www.zeffy.com/en-CA/embed/ticketing/dons-durant-la-saison-estivale',
}: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [desktopLangOpen, setDesktopLangOpen] = React.useState(false);
  const [mobileLangOpen, setMobileLangOpen] = React.useState(false);

  const navLinks = [
    { id: 'calendar', labelEN: 'Calendar', labelFR: 'Calendrier', labelES: 'Calendario' },
    { id: 'syndicate', labelEN: 'Syndicate', labelFR: 'Syndicat', labelES: 'Sindicato' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    onViewChange(link.id as any);
  };

  const t = {
    register: lang === 'EN' ? 'Register' : lang === 'FR' ? 'S\'inscrire' : 'Registrarse',
    boutique: lang === 'EN' ? 'Shop' : lang === 'FR' ? 'Boutique' : 'Tienda',
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111415]/80 backdrop-blur-md border-b-2 border-[#9500FF]/30 shadow-[0_4px_20px_rgba(149,0,255,0.2)]">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center w-full px-8 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <button
          onClick={() => onViewChange('calendar')}
          className="font-headline text-2xl uppercase tracking-tighter text-[#E1FD15] drop-shadow-[0_0_8px_rgba(225,253,21,0.6)] scale-95 active:scale-90 transition-transform cursor-pointer text-left"
          id="brand-logo"
        >
          <span className="text-[#9500FF]">MTL</span>{' '}
          <span className="text-[#E1FD15]">ROLL</span>{' '}
          <span className="text-white">2026</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="flex items-center space-x-8">
          {navLinks.map((link) => {
            const isLinkActive = activeView === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`transition-all duration-100 font-headline text-sm uppercase tracking-wider scale-95 active:scale-90 cursor-pointer ${
                  isLinkActive
                    ? 'text-[#E1FD15] border-b-2 border-[#E1FD15] pb-1 font-bold drop-shadow-[0_0_5px_#E1FD15]'
                    : 'text-[#e2e2e4] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15]'
                }`}
              >
                {lang === 'EN' ? link.labelEN : lang === 'FR' ? link.labelFR : link.labelES}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Popdown */}
          <div className="relative">
            <button
              onClick={() => setDesktopLangOpen(!desktopLangOpen)}
              className="text-[#e2e2e4] hover:text-[#E1FD15] hover:drop-shadow-[0_0_5px_#E1FD15] transition-colors duration-300 scale-95 active:scale-90 cursor-pointer flex items-center gap-1.5 font-mono text-xs uppercase"
              title={lang === 'EN' ? 'Select Language' : lang === 'FR' ? 'Choisir la langue' : 'Seleccionar idioma'}
              id="lang-toggle-btn"
              aria-haspopup="true"
              aria-expanded={desktopLangOpen}
            >
              <Globe className="w-4.5 h-4.5 text-[#E1FD15]" />
              <span>{lang}</span>
              <span className="text-[8px] text-[#666666]">▼</span>
            </button>

            {desktopLangOpen && (
              <>
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDesktopLangOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-36 bg-[#0c0e10]/95 border-2 border-[#9500FF]/50 text-white font-mono text-xs z-50 shadow-[0_0_15px_rgba(149,0,255,0.3)] animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-[#111415] px-3 py-1.5 border-b border-[#9500FF]/30 text-[9px] text-[#666666] tracking-wider uppercase font-bold">
                    {lang === 'EN' ? 'Select Language' : lang === 'FR' ? 'Choisir langue' : 'Elegir idioma'}
                  </div>
                  <button
                    onClick={() => {
                      onChangeLang('EN');
                      setDesktopLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer ${
                      lang === 'EN' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[9px] opacity-60">EN</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('FR');
                      setDesktopLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer border-t border-[#111415] ${
                      lang === 'FR' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>Français</span>
                    <span className="text-[9px] opacity-60">FR</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('ES');
                      setDesktopLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer border-t border-[#111415] ${
                      lang === 'ES' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>Español</span>
                    <span className="text-[9px] opacity-60">ES</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Boutique CTA */}
          <a
            href={boutiqueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#9500FF] bg-[#1a0933]/70 text-white hover:bg-[#9500FF] hover:text-white hover:shadow-[0_0_15px_rgba(149,0,255,0.7)] px-5 py-2 rounded-none font-headline text-sm uppercase tracking-wider transition-all scale-95 active:scale-90 cursor-pointer font-bold inline-block text-center"
            id="boutique-navbar-btn"
          >
            {t.boutique}
          </a>

          {/* Register CTA */}
          <a
            href={registerFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E1FD15] text-[#0B0C10] px-6 py-2 rounded-none font-headline text-sm uppercase tracking-wider hover:shadow-[0_0_15px_rgba(225,253,21,0.8)] transition-all scale-95 active:scale-90 cursor-pointer font-bold border-0 inline-block text-center"
            id="register-navbar-btn"
          >
            {t.register}
          </a>
        </div>
      </div>

      {/* Mobile Nav Top Bar */}
      <div className="flex justify-between items-center w-full px-6 py-4 md:hidden">
        <button
          onClick={() => onViewChange('calendar')}
          className="font-headline text-xl uppercase tracking-tighter text-[#E1FD15] drop-shadow-[0_0_8px_rgba(225,253,21,0.6)] text-left"
        >
          <span className="text-[#9500FF]">MTL</span>{' '}
          <span className="text-[#E1FD15]">ROLL</span>
        </button>
        
        <div className="flex items-center space-x-3">
          {/* Mobile Language Popdown */}
          <div className="relative">
            <button
              onClick={() => setMobileLangOpen(!mobileLangOpen)}
              className="text-[#e2e2e4] p-1 scale-95 active:scale-90 cursor-pointer flex items-center gap-1 font-mono text-xs uppercase"
              aria-haspopup="true"
              aria-expanded={mobileLangOpen}
            >
              <Globe className="w-4 h-4 text-[#E1FD15]" />
              <span>{lang}</span>
              <span className="text-[7px] text-[#666666]">▼</span>
            </button>

            {mobileLangOpen && (
              <>
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setMobileLangOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-32 bg-[#0c0e10]/95 border border-[#9500FF]/50 text-white font-mono text-xs z-50 shadow-[0_0_12px_rgba(149,0,255,0.3)] animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      onChangeLang('EN');
                      setMobileLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer ${
                      lang === 'EN' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[9px] opacity-60">EN</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('FR');
                      setMobileLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer border-t border-[#111415] ${
                      lang === 'FR' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>Français</span>
                    <span className="text-[9px] opacity-60">FR</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('ES');
                      setMobileLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#9500FF]/15 transition-all flex items-center justify-between cursor-pointer border-t border-[#111415] ${
                      lang === 'ES' ? 'text-[#E1FD15] font-bold bg-[#9500FF]/5' : 'text-[#e2e2e4]'
                    }`}
                  >
                    <span>Español</span>
                    <span className="text-[9px] opacity-60">ES</span>
                  </button>
                </div>
              </>
            )}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#E1FD15] scale-95 active:scale-90 p-1 cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e10]/95 border-b-2 border-[#9500FF]/50 px-6 py-6 space-y-4 flex flex-col transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isLinkActive = activeView === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`py-2 text-left font-headline text-lg uppercase tracking-wider cursor-pointer ${
                  isLinkActive
                    ? 'text-[#E1FD15] font-bold drop-shadow-[0_0_5px_#E1FD15] border-l-2 border-[#E1FD15] pl-3'
                    : 'text-[#e2e2e4] hover:text-[#E1FD15] pl-0'
                }`}
              >
                {lang === 'EN' ? link.labelEN : lang === 'FR' ? link.labelFR : link.labelES}
              </button>
            );
          })}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={boutiqueUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full border-2 border-[#9500FF] bg-[#1a0933]/70 text-white hover:bg-[#9500FF] py-3 text-center font-headline uppercase tracking-wider font-bold text-sm scale-95 active:scale-90 cursor-pointer block"
              id="mobile-boutique-btn"
            >
              {t.boutique}
            </a>
            <a
              href={registerFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#E1FD15] text-[#0B0C10] py-3 text-center font-headline uppercase tracking-wider font-bold text-sm scale-95 active:scale-90 cursor-pointer block"
              id="mobile-register-btn"
            >
              {t.register}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
