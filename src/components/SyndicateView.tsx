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
  const [selectedOrganizer, setSelectedOrganizer] = React.useState<Organizer | null>(null);
  const [selectedGuest, setSelectedGuest] = React.useState<Guest | null>(null);

  const selectedGuestIndex = selectedGuest ? guests.findIndex((g) => g.id === selectedGuest.id) : -1;
  const selectedOrgIndex = selectedOrganizer ? organizers.findIndex((o) => o.id === selectedOrganizer.id) : -1;

  const handlePrevGuest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (guests.length === 0 || selectedGuestIndex === -1) return;
    const prevIndex = (selectedGuestIndex - 1 + guests.length) % guests.length;
    setSelectedGuest(guests[prevIndex]);
  };

  const handleNextGuest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (guests.length === 0 || selectedGuestIndex === -1) return;
    const nextIndex = (selectedGuestIndex + 1) % guests.length;
    setSelectedGuest(guests[nextIndex]);
  };

  const handlePrevOrg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (organizers.length === 0 || selectedOrgIndex === -1) return;
    const prevIndex = (selectedOrgIndex - 1 + organizers.length) % organizers.length;
    setSelectedOrganizer(organizers[prevIndex]);
  };

  const handleNextOrg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (organizers.length === 0 || selectedOrgIndex === -1) return;
    const nextIndex = (selectedOrgIndex + 1) % organizers.length;
    setSelectedOrganizer(organizers[nextIndex]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedOrganizer) {
        if (e.key === 'Escape') {
          setSelectedOrganizer(null);
        } else if (e.key === 'ArrowLeft') {
          const currIdx = organizers.findIndex((o) => o.id === selectedOrganizer.id);
          if (currIdx !== -1 && organizers.length > 0) {
            const prevIdx = (currIdx - 1 + organizers.length) % organizers.length;
            setSelectedOrganizer(organizers[prevIdx]);
          }
        } else if (e.key === 'ArrowRight') {
          const currIdx = organizers.findIndex((o) => o.id === selectedOrganizer.id);
          if (currIdx !== -1 && organizers.length > 0) {
            const nextIdx = (currIdx + 1) % organizers.length;
            setSelectedOrganizer(organizers[nextIdx]);
          }
        }
      } else if (selectedGuest) {
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrganizer, selectedGuest, organizers, guests]);

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
    viewDetails: lang === 'EN' ? 'View Details' : lang === 'FR' ? 'Voir Détails' : 'Ver Detalles',
    viewProfile: lang === 'EN' ? 'View Profile' : lang === 'FR' ? 'Voir Profil' : 'Ver Perfil',
    websiteLabel: lang === 'EN' ? 'Official Website' : lang === 'FR' ? 'Site Officiel' : 'Sitio Oficial',
    instagramLabel: lang === 'EN' ? 'Instagram Profile' : lang === 'FR' ? 'Profil Instagram' : 'Perfil de Instagram',
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

      {/* Core Organizers Section */}
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

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
          {organizers.map((org) => (
            <div
              key={org.id}
              onClick={() => setSelectedOrganizer(org)}
              className="bg-[#1F2833] border-t-2 border-[#9500FF] hover:border-[#E1FD15] p-6 flex flex-col justify-between group hover:translate-y-[-6px] transition-all duration-300 relative cursor-pointer"
            >
              <div>
                {/* Image Box */}
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] mb-6 relative overflow-hidden bg-black border border-[#333537] flex items-center justify-center p-4">
                  <img
                    src={org.image}
                    alt={org.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="px-3 py-1.5 bg-[#9500FF] text-white font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3 h-3" />
                      <span>{t.viewDetails}</span>
                    </div>
                  </div>
                </div>

                {/* Entity ID & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-[#666666] font-semibold">
                    &gt; {org.entityId}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {org.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 bg-[#0B0C10] border border-[#9500FF]/50 text-[#9500FF] font-mono text-[10px] font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Organizer Name */}
                <h3 className="font-headline text-2xl text-white uppercase font-black tracking-tight group-hover:text-[#E1FD15] transition-colors">
                  {org.name}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-[#333537]/50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#c7c9ac] uppercase tracking-wider">
                  &gt; INSPECT_ENTITY
                </span>
                <Maximize2 className="w-4 h-4 text-[#9500FF] group-hover:text-[#E1FD15] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizer Full Detail Modal */}
      {selectedOrganizer && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedOrganizer(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0B0C10] border-2 border-[#9500FF] p-6 sm:p-8 shadow-[0_0_30px_rgba(149,0,255,0.3)] my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close & Carousel Controls */}
            <div className="flex items-center justify-between border-b border-[#333537] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#E1FD15] font-bold uppercase tracking-widest">
                  ORGANIZER [{selectedOrgIndex + 1}/{organizers.length}] // {selectedOrganizer.entityId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {organizers.length > 1 && (
                  <div className="flex items-center gap-1 bg-[#1F2833] border border-[#333537] p-0.5 mr-2">
                    <button
                      onClick={handlePrevOrg}
                      className="p-1 hover:bg-[#9500FF] text-white transition-colors cursor-pointer"
                      title="Previous Organizer (Left Arrow)"
                      aria-label="Previous organizer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[10px] text-[#666666] px-1 font-bold">
                      {selectedOrgIndex + 1}/{organizers.length}
                    </span>
                    <button
                      onClick={handleNextOrg}
                      className="p-1 hover:bg-[#9500FF] text-white transition-colors cursor-pointer"
                      title="Next Organizer (Right Arrow)"
                      aria-label="Next organizer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setSelectedOrganizer(null)}
                  className="p-1.5 bg-[#1F2833] hover:bg-[#9500FF] text-white border border-[#333537] transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Preview Container */}
            <div className="w-full bg-black border border-[#333537] mb-6 flex items-center justify-center p-6 relative max-h-[300px] overflow-hidden">
              <img 
                key={selectedOrganizer.id}
                src={selectedOrganizer.image} 
                alt={selectedOrganizer.name} 
                referrerPolicy="no-referrer"
                className="max-h-[220px] max-w-full object-contain rounded-sm"
              />
            </div>

            {/* Organizer Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#E1FD15] uppercase tracking-tight">
                  {selectedOrganizer.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedOrganizer.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#1F2833] font-mono text-xs text-[#9500FF] border border-[#9500FF]/40 font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#c7c9ac] leading-relaxed pt-2">
                {typeof selectedOrganizer.roleDescription === 'string'
                  ? selectedOrganizer.roleDescription
                  : selectedOrganizer.roleDescription[lang]}
              </p>

              {/* Social & Website Links */}
              {(selectedOrganizer.website || selectedOrganizer.instagramUrl) && (
                <div className="pt-4 border-t border-[#1F2833] flex flex-wrap items-center gap-3">
                  {selectedOrganizer.website && (
                    <a
                      href={selectedOrganizer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F2833] hover:bg-[#E1FD15] text-white hover:text-[#0B0C10] border border-[#E1FD15]/40 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{t.websiteLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  )}

                  {selectedOrganizer.instagramUrl && (
                    <a
                      href={selectedOrganizer.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F2833] hover:bg-[#9500FF] text-white border border-[#9500FF]/50 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200 group"
                    >
                      <Instagram className="w-4 h-4 text-[#E1FD15] group-hover:text-white transition-colors" />
                      <span>{t.instagramLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E1FD15] m-2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E1FD15] m-2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E1FD15] m-2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E1FD15] m-2 pointer-events-none" />
          </div>
        </div>
      )}

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
              className="bg-[#1F2833] border-t-2 border-[#9500FF] hover:border-[#E1FD15] p-6 flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300 relative cursor-pointer"
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
                    <span>{t.viewProfile}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B0C10] to-transparent pointer-events-none" />
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {g.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block px-2 py-0.5 bg-[#0B0C10] border border-[#E1FD15]/50 text-[#E1FD15] font-mono text-[10px] font-bold uppercase tracking-wider"
                    >
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
                  GUEST [{selectedGuestIndex + 1}/{guests.length}] // {selectedGuest.tags.join(' / ')}
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
                    {selectedGuestIndex + 1}/{guests.length}
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

            {/* Image Preview Container - Full display */}
            <div className="w-full bg-black border border-[#333537] mb-6 flex items-center justify-center max-h-[60vh] overflow-hidden p-2 relative">
              <img 
                key={selectedGuest.id}
                src={selectedGuest.image} 
                alt={selectedGuest.name} 
                className="max-w-full max-h-[55vh] object-contain rounded-sm transition-opacity duration-300"
              />
            </div>

            {/* Guest Name & Details */}
            <div className="text-left space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-headline text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {selectedGuest.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedGuest.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#1F2833] font-mono text-xs text-[#E1FD15] border border-[#E1FD15]/40 font-bold uppercase">
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
                    <span>{t.instagramLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}
            </div>

            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E1FD15] m-2" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E1FD15] m-2" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E1FD15] m-2" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E1FD15] m-2" />
          </div>
        </div>
      )}

      {/* Sponsors Section */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B0C10] border border-[#333537] hover:border-[#E1FD15] p-6 sm:p-8 flex flex-col items-center justify-between text-center group hover:shadow-[0_0_25px_rgba(225,253,21,0.15)] hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#9500FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-full flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-[#666666] font-bold uppercase tracking-widest">
                  &gt; SPONSOR_NODE
                </span>
                <ExternalLink className="w-4 h-4 text-[#9500FF] group-hover:text-[#E1FD15] transition-colors" />
              </div>

              {/* Sponsor Logo Image */}
              <div className="w-full aspect-[16/9] max-h-36 flex items-center justify-center p-4 bg-black/50 border border-[#1F2833] mb-6 overflow-hidden">
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="w-full">
                <h3 className="font-headline text-xl text-white uppercase font-black tracking-tight group-hover:text-[#E1FD15] transition-colors">
                  {sponsor.name}
                </h3>
              </div>

              {/* Tech bracket decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#333537] group-hover:border-[#E1FD15] transition-colors m-3" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#333537] group-hover:border-[#E1FD15] transition-colors m-3" />
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
