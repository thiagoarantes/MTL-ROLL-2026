import React from 'react';
import { Search, Flame, Shuffle, Activity as ActivityIcon, Sparkles, Sliders, ShieldAlert, Zap, Compass, Check, X, Calendar, MapPin, Bike, Brush, Milestone, Clock } from 'lucide-react';
import { Activity } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ActivitiesViewProps {
  activities: Activity[];
  registeredActivityIds: string[];
  onOpenRegister: (activityId?: string) => void;
  lang: 'EN' | 'FR' | 'ES';
}

export default function ActivitiesView({
  activities,
  registeredActivityIds,
  onOpenRegister,
  lang,
}: ActivitiesViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<'All' | 'Style' | 'Tech' | 'High Risk' | 'Prime Event'>('All');
  const [activeDetailActivityId, setActiveDetailActivityId] = React.useState<string | null>(null);

  // Filter activities based on search and category
  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = 
      selectedDifficulty === 'All' ||
      (selectedDifficulty === 'Prime Event' && act.category === 'Prime Event') ||
      (selectedDifficulty === 'Style' && act.difficulty === 'Style') ||
      (selectedDifficulty === 'Tech' && act.difficulty === 'Tech') ||
      (selectedDifficulty === 'High Risk' && act.difficulty === 'High Risk');

    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyStyles = (diff?: string) => {
    switch (diff) {
      case 'High Risk':
        return { text: 'text-[#ffb4ab]', bg: 'bg-[#ffb4ab]/10 border-[#ffb4ab]/30' };
      case 'Tech':
        return { text: 'text-[#9500FF]', bg: 'bg-[#9500FF]/10 border-[#9500FF]/30' };
      case 'Style':
        return { text: 'text-[#E1FD15]', bg: 'bg-[#E1FD15]/10 border-[#E1FD15]/30' };
      default:
        return { text: 'text-[#bec7d6]', bg: 'bg-[#1F2833] border-[#464932]' };
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'directions_bike':
        return <Bike className="w-5 h-5 text-[#E1FD15]" />;
      case 'brush':
        return <Brush className="w-5 h-5 text-[#E1FD15]" />;
      case 'route':
        return <Milestone className="w-5 h-5 text-[#E1FD15]" />;
      case 'timeline':
        return <Shuffle className="w-5 h-5 text-[#E1FD15]" />;
      case 'flight_takeoff':
        return <Flame className="w-5 h-5 text-[#E1FD15]" />;
      case 'auto_awesome':
        return <Sparkles className="w-5 h-5 text-[#E1FD15]" />;
      default:
        return <Compass className="w-5 h-5 text-[#E1FD15]" />;
    }
  };



  const t = {
    title: lang === 'EN' ? 'Ride The Grid' : lang === 'FR' ? 'Parcourir Le Réseau' : 'Recorre la Red',
    subtitle: lang === 'EN'
      ? 'Choose your vector. From high-speed street assaults to technical park sessions, MTL ROLL 2026 offers an array of disciplines designed to test your limits.'
      : lang === 'FR'
      ? 'Choisissez votre vecteur. Des assauts urbains à grande vitesse aux sessions techniques de skatepark, MTL ROLL 2026 offre un éventail de disciplines conçues pour repousser vos limites.'
      : 'Elige tu vector. Desde asaltos callejeros a alta velocidad hasta sesiones técnicas en rampas, MTL ROLL 2026 ofrece una variedad de disciplinas diseñadas para poner a prueba tus límites.',
    primeEvent: lang === 'EN' ? '/// Prime Event' : lang === 'FR' ? '/// Événement Phare' : '/// Evento Principal',
    joinVector: lang === 'EN' ? 'Join Vector' : lang === 'FR' ? 'Rejoindre le Vecteur' : 'Unirse al Vector',
    register: lang === 'EN' ? 'Register' : lang === 'FR' ? 'S\'inscrire' : 'Registrarse',
    registered: lang === 'EN' ? 'Sync Activated' : lang === 'FR' ? 'Synchro Active' : 'Sincronización Activa',
    searchPlaceholder: lang === 'EN' ? 'Search vector codes...' : lang === 'FR' ? 'Rechercher des codes de vecteurs...' : 'Buscar códigos de vectores...',
    all: lang === 'EN' ? 'All Vectors' : lang === 'FR' ? 'Tous' : 'Todos',
    style: lang === 'EN' ? 'Style-focused' : lang === 'FR' ? 'Style' : 'Estilo',
    tech: lang === 'EN' ? 'Technical' : lang === 'FR' ? 'Technique' : 'Técnico',
    highRisk: lang === 'EN' ? 'High Risk' : lang === 'FR' ? 'Haute Voltige' : 'Alto Riesgo',
    primeOnly: lang === 'EN' ? 'Prime Event' : lang === 'FR' ? 'Événement Phare' : 'Evento Principal',
    gridPanel: lang === 'EN' ? 'GRID REGISTRY CONTROL' : lang === 'FR' ? 'CONTRÔLE DU SYNDICAT' : 'CONTROL DE REGISTRO',
    mySchedule: lang === 'EN' ? 'SYNCED VECTORS' : lang === 'FR' ? 'VECTEURS ENREGISTRÉS' : 'VECTORES SINCRONIZADOS',
    distanceEst: lang === 'EN' ? 'EST. ROLLING DISTANCE' : lang === 'FR' ? 'EST. DISTANCE EN ROULAGE' : 'DISTANCIA EST. RECORRIDA',
    terminalActive: lang === 'EN' ? 'TERMINAL STATUS: SYNCED' : lang === 'FR' ? 'STATUT TERMINAL : CONNECTÉ' : 'ESTADO DE TERMINAL: SINCRONIZADO',
  };

  return (
    <div className="py-24 px-6 md:px-16 w-full max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Immersive Header */}
      <header className="mb-12 relative">
        <span className="font-mono text-xs text-[#9500FF] uppercase tracking-widest font-black block mb-2">
          &gt; GRID.VECT_MASTER_CATALOG
        </span>
        <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E1FD15] drop-shadow-[0_0_15px_rgba(225,253,21,0.3)]">
          {t.title}
        </h1>
        <p className="font-sans text-sm md:text-base text-[#c7c9ac] mt-4 max-w-2xl border-l-2 border-[#E1FD15] pl-4 leading-relaxed">
          {t.subtitle}
        </p>
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#9500FF]/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
      </header>

      {/* Control Panel: Filters & Search */}
      <div className="bg-[#1F2833] border border-[#464932] p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c7c9ac]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#111415] border-b-2 border-[#666666] focus:border-[#E1FD15] py-2 pl-9 pr-3 text-white placeholder-[#666666] outline-none font-sans text-xs"
          />
        </div>

        {/* Categories toggles */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {([
            { id: 'All', label: t.all },
            { id: 'Prime Event', label: t.primeOnly },
            { id: 'Style', label: t.style },
            { id: 'Tech', label: t.tech },
            { id: 'High Risk', label: t.highRisk },
          ] as const).map((diff) => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`py-1.5 px-3 font-mono text-[9px] uppercase tracking-wider cursor-pointer border transition-all flex-1 md:flex-initial ${
                selectedDifficulty === diff.id
                  ? 'bg-[#E1FD15] border-[#E1FD15] text-[#0B0C10] font-black'
                  : 'bg-[#111415] border-[#464932] text-[#c7c9ac] hover:bg-[#1e2021]'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        
        {/* Catalog of Activities */}
        <div className="space-y-6">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter gap-4">
              
              {filteredActivities.map((act) => {
                const isNightRide = act.id === 'act-night-ride';
                const isRegistered = registeredActivityIds.includes(act.id);
                const diffStyles = getDifficultyStyles(act.difficulty);

                // Featured layout for Night Ride if it matches
                if (isNightRide) {
                  return (
                    <article 
                      key={act.id}
                      onClick={() => setActiveDetailActivityId(act.id)}
                      className="col-span-1 md:col-span-2 bg-[#1F2833] border-t-2 border-[#9500FF] relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_25px_rgba(225,253,21,0.15)] hover:border-[#E1FD15] flex flex-col md:flex-row text-left cursor-pointer"
                    >
                      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                        <img 
                          src={act.image} 
                          alt={act.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2833] via-transparent to-transparent hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2833] via-transparent to-transparent md:hidden" />
                      </div>

                      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          {renderIcon(act.iconName)}
                          <span className="font-mono text-[10px] text-[#9500FF] uppercase font-bold tracking-widest">{t.primeEvent}</span>
                        </div>
                        <h2 className="font-headline text-3xl font-black text-white mb-2 uppercase">{act.title}</h2>
                        <p className="font-sans text-xs text-[#c7c9ac] mb-6 leading-relaxed">
                          {act.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 font-mono text-[9px] text-[#c7c9ac]">
                          <span className="px-2 py-1 bg-[#111415] border border-[#464932] uppercase">{act.date}</span>
                          <span className="px-2 py-1 bg-[#111415] border border-[#464932] uppercase">{act.time}</span>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-[#333537]/50 pt-4">
                          <span className="font-mono text-[10px] text-[#E1FD15] uppercase tracking-wider group-hover:underline">
                            &gt; {lang === 'EN' ? 'VIEW DETAILS' : lang === 'FR' ? 'VOIR LES DÉTAILS' : 'VER DETALLES'}
                          </span>
                          {isRegistered && (
                            <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 px-2 py-0.5 font-bold">
                              {t.registered}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                }

                // Standard layouts for all other items
                return (
                  <article 
                    key={act.id}
                    onClick={() => setActiveDetailActivityId(act.id)}
                    className="bg-[#1F2833] border-t-2 border-[#333537] relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_25px_rgba(225,253,21,0.15)] hover:border-[#E1FD15] p-6 flex flex-col justify-between text-left cursor-pointer"
                  >
                    <div className="h-48 relative mb-6 w-full bg-[#111415] overflow-hidden">
                      <img 
                        src={act.image} 
                        alt={act.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2.5">
                          {renderIcon(act.iconName)}
                          <h2 className="font-headline text-lg font-black text-white uppercase">{act.title}</h2>
                        </div>
                        {act.difficulty && (
                          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border ${diffStyles.bg} ${diffStyles.text} font-bold`}>
                            {act.difficulty}
                          </span>
                        )}
                      </div>

                      <p className="font-sans text-xs text-[#c7c9ac] mb-6 leading-relaxed">
                        {act.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[9px] text-[#c7c9ac]">
                        <span className="px-2 py-0.5 bg-[#111415] border border-[#464932]">{act.time}</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-[#333537]/50 pt-4">
                      <span className="font-mono text-[10px] text-[#E1FD15] uppercase tracking-wider group-hover:underline">
                        &gt; {lang === 'EN' ? 'VIEW DETAILS' : lang === 'FR' ? 'VOIR LES DÉTAILS' : 'VER DETALLES'}
                      </span>
                      {isRegistered && (
                        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 px-2 py-0.5 font-bold">
                          {t.registered}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}

            </div>
          ) : (
            <div className="p-16 bg-[#1f2833]/50 border border-dashed border-[#464932] text-center">
              <span className="font-mono text-xs text-[#c7c9ac]">
                {lang === 'EN'
                  ? 'No vectors match your filter criteria.'
                  : lang === 'FR'
                  ? 'Aucun vecteur ne correspond à vos critères de recherche.'
                  : 'Ningún vector coincide con tus criterios de búsqueda.'}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Details & Carousel Modal */}
      <AnimatePresence>
        {activeDetailActivityId && (() => {
          const activeActivityIndex = filteredActivities.findIndex((a) => a.id === activeDetailActivityId);
          const activeActivity = activeActivityIndex !== -1 ? filteredActivities[activeActivityIndex] : null;
          
          if (!activeActivity) return null;

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setActiveDetailActivityId(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111415] border-2 border-[#9500FF] w-full max-w-2xl relative overflow-hidden text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Techno Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E1FD15] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9500FF] pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9500FF] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E1FD15] pointer-events-none" />

                {/* Header/Close */}
                <div className="flex items-center justify-between border-b border-[#333537] px-6 py-4 bg-[#1F2833]">
                  <div className="flex items-center gap-2">
                    {renderIcon(activeActivity.iconName)}
                    <span className="font-mono text-[10px] text-[#E1FD15] uppercase tracking-widest font-black">
                      // {activeActivity.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveDetailActivityId(null)}
                    className="p-1 text-[#c7c9ac] hover:text-[#E1FD15] transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="max-h-[70vh] overflow-y-auto">
                  {/* Hero image banner */}
                  <div className="w-full h-56 relative bg-black">
                    <img
                      src={activeActivity.image}
                      alt={activeActivity.title}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111415] to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <h2 className="font-headline text-2xl sm:text-3xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {activeActivity.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Descriptions */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#9500FF] uppercase tracking-widest font-black block">
                        &gt; DETAILED SPECIFICATIONS
                      </span>
                      <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed">
                        {activeActivity.longDescription || activeActivity.description}
                      </p>
                    </div>

                    {/* Metadata dashboard layout */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">DATE</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">{activeActivity.date}</p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">TIME</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">{activeActivity.time}</p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">LOCATION</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase truncate" title={activeActivity.location}>
                          {activeActivity.location}
                        </p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Flame className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">DIFFICULTY</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">
                          {activeActivity.difficulty || 'All Levels'}
                        </p>
                      </div>
                    </div>

                    {/* Spots Remaining Info */}
                    {activeActivity.spotsLeft !== undefined && (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#E1FD15]/5 border border-[#E1FD15]/20 font-mono text-[10px] text-[#E1FD15]">
                        <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
                        <span>
                          {lang === 'EN'
                            ? `SECURE SYSTEM: ${activeActivity.spotsLeft} places remaining for this active vector.`
                            : lang === 'FR'
                            ? `SYSTÈME SÉCURISÉ : ${activeActivity.spotsLeft} places restantes pour cette session.`
                            : `SISTEMA SEGURO: ${activeActivity.spotsLeft} cupos restantes para esta sesión activa.`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Carousel controls and action button */}
                <div className="border-t border-[#333537] bg-[#1F2833] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Previous / Next wrap triggers */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIdx = activeActivityIndex > 0 ? activeActivityIndex - 1 : filteredActivities.length - 1;
                        if (filteredActivities[prevIdx]) {
                          setActiveDetailActivityId(filteredActivities[prevIdx].id);
                        }
                      }}
                      className="px-3 py-1.5 border border-[#464932] hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 font-mono text-[9px] uppercase text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>&lt;</span>
                      <span>{lang === 'EN' ? 'Prev' : lang === 'FR' ? 'Préc' : 'Ant'}</span>
                    </button>

                    <span className="font-mono text-[10px] text-[#c7c9ac] px-2 bg-[#111415] border border-[#333537] py-1">
                      {activeActivityIndex + 1} / {filteredActivities.length}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = activeActivityIndex < filteredActivities.length - 1 ? activeActivityIndex + 1 : 0;
                        if (filteredActivities[nextIdx]) {
                          setActiveDetailActivityId(filteredActivities[nextIdx].id);
                        }
                      }}
                      className="px-3 py-1.5 border border-[#464932] hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 font-mono text-[9px] uppercase text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{lang === 'EN' ? 'Next' : lang === 'FR' ? 'Suiv' : 'Sig'}</span>
                      <span>&gt;</span>
                    </button>
                  </div>

                  {/* Register action trigger */}
                  <button
                    onClick={() => {
                      onOpenRegister(activeActivity.id);
                      setActiveDetailActivityId(null);
                    }}
                    className={`w-full sm:w-auto py-2.5 px-6 font-headline text-xs font-black uppercase tracking-wider transition-all scale-95 active:scale-90 cursor-pointer border-0 ${
                      registeredActivityIds.includes(activeActivity.id)
                        ? 'bg-[#333537] text-white'
                        : 'bg-[#9500FF] text-white hover:bg-[#8000DB] hover:shadow-[0_0_15px_#9500FF]'
                    }`}
                  >
                    {registeredActivityIds.includes(activeActivity.id)
                      ? t.registered
                      : (lang === 'EN' ? 'Register for Session' : lang === 'FR' ? 'S\'inscrire à la session' : 'Registrarse en la sesión')}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
