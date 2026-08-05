import React from 'react';
import { Globe, Instagram, ExternalLink, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Organizer, Guest, Sponsor } from '../types';

interface SyndicateViewProps {
  organizers: Organizer[];
  guests: Guest[];
  sponsors: Sponsor[];
  onAddSponsor: (newSponsor: Sponsor) => void;
  lang: 'EN' | 'FR' | 'ES';
}

export default function SyndicateView({
  organizers,
  guests,
  sponsors,
  onAddSponsor,
  lang,
}: SyndicateViewProps) {
  const activeOrg = organizers[0];
  const [selectedGuest, setSelectedGuest] = React.useState<Guest | null>(null);

  const selectedIndex = selectedGuest ? guests.findIndex((g) => g.id === selectedGuest.id) : -1;

  const handlePrevGuest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (guests.length === 0 || selectedIndex === -1) return;
    const prevIndex = (selectedIndex - 1 + guests.length) % guests.length;
    setSelectedGuest(guests[prevIndex]);
  };

  const handleNextGuest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (guests.length === 0 || selectedIndex === -1) return;
    const nextIndex = (selectedIndex + 1) % guests.length;
    setSelectedGuest(guests[nextIndex]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedGuest) return;
      if (e.key === 'Escape') {
        setSelectedGuest(null);
      } else if (e.key === 'ArrowLeft') {
        const currIdx = guests.findIndex((g) => g.id === selectedGuest.id);
        if (currIdx !== -1 && guests.length > 0) {
          const prevIdx = (currIdx - 1 + guests.length) % guests.length;
          setSelectedGuest(guests[prevIdx]);
        }
      } else if (e.key === 'ArrowRight') {
        const currIdx = guests.findIndex((g) => g.id === selectedGuest.id);
        if (currIdx !== -1 && guests.length > 0) {
          const nextIdx = (currIdx + 1) % guests.length;
          setSelectedGuest(guests[nextIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGuest, guests]);

  const t = {
    sysOverlay: lang === 'EN' ? 'SYS.DATA_OVERLAY // 04' : lang === 'FR' ? 'SYS.DATA_OVERLAY // 04' : 'SYS.DATA_OVERLAY // 04',
    title: lang === 'EN' ? 'Syndicate & Protocol' : lang === 'FR' ? 'Syndicat & Protocole' : 'Sindicato y Protocolo',
    description: lang === 'EN'
      ? 'Accessing the master registry of entities powering the night grid. Organizers, designated VIP guests, and corporate sponsors fueling the kinetic energy of MTL ROLL 2026.'
      : lang === 'FR'
      ? 'Accès au registre principal des entités qui alimentent le réseau nocturne. Organisateurs, invités VIP désignés et partenaires corporatifs soutenant l\'énergie cinétique de MTL ROLL 2026.'
      : 'Accediendo al registro principal de entidades que impulsan la red nocturna. Organizadores, invitados VIP designados y patrocinadores corporativos que alimentan la energía cinética de MTL ROLL 2026.',
    coreOrganizers: lang === 'EN' ? 'Core Organizers' : lang === 'FR' ? 'Organisateurs Principaux' : 'Organizadores Principales',
    registeredGuests: lang === 'EN' ? 'Registered Guests' : lang === 'FR' ? 'Invités Enregistrés' : 'Invitados Registrados',
    networkSponsors: lang === 'EN' ? 'Network Sponsors' : lang === 'FR' ? 'Partenaires Réseau' : 'Patrocinadores de la Red',
  };

  return (
    <div className="py-24 px-6 md:px-16 w-full max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Header Section */}
      <header className="mb-24 flex flex-col items-start gap-4">
        <span className="inline-block px-3 py-1 bg-[#1F2833] font-mono text-xs text-[#9500FF] border border-[#9500FF]/30 font-bold tracking-widest">
          {t.sysOverlay}
        </span>
        <h1 className="font-headline text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9500FF] to-[#E1FD15] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(149,0,255,0.4)]">
          {t.title}
        </h1>
        <p className="font-sans text-sm md:text-base text-[#c7c9ac] max-w-2xl border-l-2 border-[#E1FD15] pl-4 leading-relaxed">
          {t.description}
        </p>
      </header>

      {/* Core Organizers (Bento Highlight) */}
      <section className="mb-24" id="organizers-anchor">
        <div className="flex items-center justify-between mb-8 border-b border-[#1F2833] pb-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-[#9500FF]"></div>
            <h2 className="font-headline text-2xl md:text-3xl uppercase tracking-tight text-white font-black">
              {lang === 'EN' ? (
                <>Core <span className="text-[#9500FF] drop-shadow-[0_0_10px_rgba(149,0,255,0.5)]">Organizers</span></>
              ) : lang === 'FR' ? (
                <>Organisateurs <span className="text-[#9500FF] drop-shadow-[0_0_10px_rgba(149,0,255,0.5)]">Principaux</span></>
              ) : (
                <>Organizadores <span className="text-[#9500FF] drop-shadow-[0_0_10px_rgba(149,0,255,0.5)]">Principales</span></>
              )}
            </h2>
          </div>
        </div>

        {/* Carousel Slide */}
        <div className="bg-[#1F2833] border border-[#9500FF]/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9500FF]/10 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Image Block */}
            <div className="w-full md:w-auto p-6 md:p-8 flex items-center justify-center bg-[#0c0e10] border-b md:border-b-0 md:border-r border-[#9500FF]/30">
              <div className="w-64 sm:w-72 md:w-80 aspect-square relative overflow-hidden bg-black border border-[#333537] shadow-lg">
                <img 
                  src={activeOrg.image} 
                  alt={activeOrg.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Info Block */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center relative z-10 text-left">
              <span className="font-mono text-xs text-[#666666] mb-2 font-semibold">
                &gt; ENTITY_ID: {activeOrg.entityId}
              </span>
              <h3 className="font-headline text-3xl font-black uppercase text-[#E1FD15] mb-6">
                {activeOrg.name}
              </h3>
              <p className="font-sans text-sm md:text-base text-[#c7c9ac] mb-8 leading-relaxed">
                {activeOrg.roleDescription}
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {activeOrg.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-block px-3 py-1 bg-[#0c0e10] font-mono text-[10px] text-white border border-[#333537]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Guests Section (Glassmorphism Cards + Add Guest Terminal) */}
      <section className="mb-24" id="guests-anchor">
        <div className="flex items-center gap-4 mb-8 border-b border-[#1F2833] pb-4">
          <div className="h-px w-12 bg-[#E1FD15]"></div>
          <h2 className="font-headline text-2xl md:text-3xl uppercase tracking-tight text-white font-black">
            {lang === 'EN' ? (
              <>Registered <span className="text-[#E1FD15] drop-shadow-[0_0_10px_rgba(225,253,21,0.5)]">Guests</span></>
            ) : lang === 'FR' ? (
              <>Invités <span className="text-[#E1FD15] drop-shadow-[0_0_10px_rgba(225,253,21,0.5)]">Enregistrés</span></>
            ) : (
              <>Invitados <span className="text-[#E1FD15] drop-shadow-[0_0_10px_rgba(225,253,21,0.5)]">Registrados</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter gap-4 items-stretch">
          
          {/* Guest profiles */}
          {guests.map((g) => (
            <div 
              key={g.id} 
              onClick={() => setSelectedGuest(g)}
              className="bg-[#1F2833] border-t-2 border-[#9500FF] p-6 flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300 relative cursor-pointer"
            >
              {g.isUserAdded && (
                <span className="absolute top-2 right-2 font-mono text-[8px] bg-[#E1FD15] text-[#0B0C10] px-1 uppercase font-bold animate-pulse z-10">
                  User Profile
                </span>
              )}
              <div className="w-full aspect-square mb-6 relative overflow-hidden bg-[#0c0e10] border border-[#333537]">
                <img 
                  src={g.image} 
                  alt={g.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0 group-hover:contrast-125"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-3 py-1.5 bg-[#9500FF] text-white font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Profile</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B0C10] to-transparent pointer-events-none" />
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {g.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[#9500FF] font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline text-xl text-white uppercase font-black tracking-tight truncate group-hover:text-[#E1FD15] transition-colors">{g.name}</h3>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Guest Full View Dialog Modal */}
      {selectedGuest && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedGuest(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0B0C10] border-2 border-[#9500FF] p-6 sm:p-8 shadow-[0_0_30px_rgba(149,0,255,0.3)] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close & Carousel Controls */}
            <div className="flex items-center justify-between border-b border-[#333537] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#E1FD15] font-bold uppercase tracking-widest">
                  GUEST [{selectedIndex + 1}/{guests.length}] // {selectedGuest.tags.join(' / ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Carousel Prev/Next Quick Header Controls */}
                <div className="flex items-center gap-1 bg-[#1F2833] border border-[#333537] p-0.5 mr-2">
                  <button
                    onClick={handlePrevGuest}
                    className="p-1 hover:bg-[#9500FF] text-white transition-colors"
                    title="Previous Guest (Left Arrow)"
                    aria-label="Previous guest"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-[10px] text-[#666666] px-1 font-bold">
                    {selectedIndex + 1}/{guests.length}
                  </span>
                  <button
                    onClick={handleNextGuest}
                    className="p-1 hover:bg-[#9500FF] text-white transition-colors"
                    title="Next Guest (Right Arrow)"
                    aria-label="Next guest"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedGuest(null)}
                  className="p-1.5 bg-[#1F2833] hover:bg-[#9500FF] text-white border border-[#333537] transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Preview Container - Full display with side navigation arrows */}
            <div className="w-full bg-black border border-[#333537] mb-6 flex items-center justify-center max-h-[60vh] overflow-hidden p-2 relative group">
              {/* Prev Overlay Button */}
              <button
                onClick={handlePrevGuest}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-[#0B0C10]/80 hover:bg-[#9500FF] text-white border border-[#9500FF]/50 transition-all duration-200 shadow-lg group/btn backdrop-blur-sm"
                aria-label="Previous guest image"
              >
                <ChevronLeft className="w-6 h-6 text-[#E1FD15] group-hover/btn:text-white transition-colors" />
              </button>

              <img 
                key={selectedGuest.id}
                src={selectedGuest.image} 
                alt={selectedGuest.name} 
                className="max-w-full max-h-[55vh] object-contain rounded-sm transition-opacity duration-300"
              />

              {/* Next Overlay Button */}
              <button
                onClick={handleNextGuest}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-[#0B0C10]/80 hover:bg-[#9500FF] text-white border border-[#9500FF]/50 transition-all duration-200 shadow-lg group/btn backdrop-blur-sm"
                aria-label="Next guest image"
              >
                <ChevronRight className="w-6 h-6 text-[#E1FD15] group-hover/btn:text-white transition-colors" />
              </button>
            </div>

            {/* Guest Name & Details */}
            <div className="text-left space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-headline text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {selectedGuest.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedGuest.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#1F2833] font-mono text-xs text-[#9500FF] border border-[#9500FF]/40 font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedGuest.instagramUrl && (
                <div className="pt-3 border-t border-[#1F2833]">
                  <a
                    href={selectedGuest.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F2833] hover:bg-[#9500FF] text-white border border-[#9500FF]/50 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200 group"
                  >
                    <Instagram className="w-4 h-4 text-[#E1FD15] group-hover:text-white transition-colors" />
                    <span>Instagram Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Footer Controls & Keyboard hint */}
            <div className="mt-6 pt-4 border-t border-[#1F2833] flex items-center justify-between text-left">
              <button
                onClick={handlePrevGuest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2833] hover:bg-[#9500FF] text-white font-mono text-xs uppercase font-bold transition-colors border border-[#333537]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="font-mono text-[10px] text-[#666666] uppercase">
                Use <kbd className="px-1 py-0.5 bg-[#1F2833] border border-[#333537] text-[#E1FD15]">←</kbd> <kbd className="px-1 py-0.5 bg-[#1F2833] border border-[#333537] text-[#E1FD15]">→</kbd> keys to navigate
              </span>

              <button
                onClick={handleNextGuest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2833] hover:bg-[#9500FF] text-white font-mono text-xs uppercase font-bold transition-colors border border-[#333537]"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E1FD15] m-2" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E1FD15] m-2" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E1FD15] m-2" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E1FD15] m-2" />
          </div>
        </div>
      )}

      {/* Sponsors Section (Asymmetric Grid) */}
      <section id="sponsors-anchor">
        <div className="flex items-center gap-4 mb-8 border-b border-[#1F2833] pb-4">
          <div className="h-px w-12 bg-[#c7c9ac]"></div>
          <h2 className="font-headline text-2xl md:text-3xl uppercase tracking-tight text-white font-black">
            {lang === 'EN' ? (
              <>Network <span className="text-[#c7c9ac]">Sponsors</span></>
            ) : lang === 'FR' ? (
              <>Partenaires <span className="text-[#c7c9ac]">Réseau</span></>
            ) : (
              <>Patrocinadores de la <span className="text-[#c7c9ac]">Red</span></>
            )}
          </h2>
        </div>

        <div className="flex justify-center">
          
          {/* Featured Sponsor Verdun */}
          <div className="w-full max-w-2xl bg-[#0B0C10] border border-[#333537] p-8 flex flex-col items-center justify-center relative group overflow-hidden text-center">
            <div className="absolute inset-0 bg-[#9500FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <span className="font-mono text-xs text-[#666666] block mb-4 font-bold uppercase tracking-widest">
              GOV_NODE // PARTNER
            </span>

            {/* Dark Verdun Logo Image */}
            <a 
              href="https://montreal.ca/verdun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block max-w-xs md:max-w-sm mb-6 transition-transform duration-300 hover:scale-105"
            >
              <img 
                src="/verdun_logo.svg" 
                alt="Arrondissement de Verdun - Ville de Montréal"
                className="w-full h-auto object-contain rounded-sm"
              />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 z-10">
              <a
                href="https://montreal.ca/verdun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F2833] hover:bg-[#E1FD15] text-white hover:text-[#0B0C10] border border-[#E1FD15]/40 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>montreal.ca/verdun</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="https://www.instagram.com/arr_verdun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F2833] hover:bg-[#9500FF] text-white border border-[#9500FF]/50 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                <Instagram className="w-4 h-4 text-[#E1FD15]" />
                <span>@arr_verdun</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Tech bracket decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#333537] m-3" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#333537] m-3" />
          </div>

        </div>
      </section>

    </div>
  );
}
