import React from 'react';
import { Shield, Users, Award, Plus, Check, MapPin, Sparkles, Building, Compass, AlertCircle, Heart, Info } from 'lucide-react';
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
            <div className="w-full md:w-1/3 relative min-h-[300px]">
              <img 
                src={activeOrg.image} 
                alt={activeOrg.name}
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale"
              />
              <div className="absolute inset-0 border-r-2 border-[#9500FF]/30 hidden md:block" />
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
              className="bg-[#1F2833] border-t-2 border-[#9500FF] p-6 flex flex-col justify-between group hover:translate-y-[-8px] transition-all duration-300 relative"
            >
              {g.isUserAdded && (
                <span className="absolute top-2 right-2 font-mono text-[8px] bg-[#E1FD15] text-[#0B0C10] px-1 uppercase font-bold animate-pulse">
                  User Profile
                </span>
              )}
              <div className="w-full aspect-square mb-6 relative overflow-hidden bg-[#0c0e10] border border-[#333537]">
                <img 
                  src={g.image} 
                  alt={g.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0 group-hover:contrast-125"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B0C10] to-transparent" />
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#9500FF] block mb-2 font-bold uppercase">{g.tag}</span>
                <h3 className="font-headline text-xl text-white mb-1 uppercase font-black tracking-tight truncate">{g.name}</h3>
                <p className="font-sans text-xs text-[#666666] leading-relaxed truncate">{g.role}</p>
              </div>
            </div>
          ))}



        </div>
      </section>

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
          <div className="w-full max-w-2xl bg-[#0B0C10] border border-[#333537] p-8 flex items-center justify-center min-h-[220px] relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#9500FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-center z-10">
              <span className="font-mono text-xs text-[#666666] block mb-2 font-bold uppercase">GOV_NODE</span>
              <h3 className="font-headline text-2xl md:text-3xl font-black uppercase text-white group-hover:text-[#E1FD15] transition-colors leading-tight tracking-tight">
                Arrondissement de Verdun
              </h3>
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
