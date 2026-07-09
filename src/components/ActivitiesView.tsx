import React from 'react';
import { Search, Flame, Shuffle, Activity as ActivityIcon, Sparkles, Sliders, ShieldAlert, Zap, Compass, Check, X, Calendar, MapPin, Bike, Brush, Milestone } from 'lucide-react';
import { Activity } from '../types';

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

  // Calculate user stats if registered
  const registeredEventsList = activities.filter(a => registeredActivityIds.includes(a.id));
  const estimatedDistance = registeredEventsList.reduce((acc, curr) => {
    if (curr.id === 'act-long-distance') return acc + 50;
    if (curr.id === 'act-night-ride') return acc + 25;
    if (curr.id === 'act-mural-ride') return acc + 15;
    return acc + 5; // Default short sessions
  }, 0);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Grid Left: Catalog of Activities */}
        <div className="lg:col-span-9 space-y-6">
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
                      className="col-span-1 md:col-span-2 bg-[#1F2833] border-t-2 border-[#9500FF] relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_25px_rgba(225,253,21,0.15)] hover:border-[#E1FD15] flex flex-col md:flex-row text-left"
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

                        <div className="flex flex-wrap gap-2 mb-8 font-mono text-[9px] text-[#c7c9ac]">
                          <span className="px-2 py-1 bg-[#111415] border border-[#464932] uppercase">{act.date}</span>
                          <span className="px-2 py-1 bg-[#111415] border border-[#464932] uppercase">{act.time}</span>
                        </div>

                        <div className="mt-auto">
                          <button 
                            onClick={() => onOpenRegister(act.id)}
                            className={`py-3 px-6 font-headline text-xs font-bold uppercase flex items-center gap-2 tracking-widest scale-95 active:scale-90 transition-all cursor-pointer border-0 ${
                              isRegistered
                                ? 'bg-[#333537] text-white'
                                : 'bg-[#E1FD15] text-[#0B0C10] hover:shadow-[0_0_15px_#E1FD15]'
                            }`}
                          >
                            <span>{isRegistered ? t.registered : t.joinVector}</span>
                            {!isRegistered && <span className="font-sans font-bold">→</span>}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }

                // Standard layouts for all other items
                return (
                  <article 
                    key={act.id}
                    className="bg-[#1F2833] border-t-2 border-[#333537] relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_25px_rgba(225,253,21,0.15)] hover:border-[#E1FD15] p-6 flex flex-col justify-between text-left"
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

                    <button 
                      onClick={() => onOpenRegister(act.id)}
                      className={`font-headline text-xs py-2 px-4 border-2 transition-all duration-300 uppercase w-full scale-95 active:scale-90 cursor-pointer ${
                        isRegistered
                          ? 'border-[#333537] bg-[#333537] text-white'
                          : 'border-[#9500FF] text-white hover:bg-[#9500FF] hover:text-white'
                      }`}
                    >
                      {isRegistered ? t.registered : t.register}
                    </button>
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

        {/* Grid Right: Synced Terminal Dashboard */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#1F2833] border border-[#9500FF]/30 p-5 relative text-left">
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E1FD15] m-2 opacity-50" />
            
            <span className="font-mono text-[9px] text-[#9500FF] tracking-widest font-bold uppercase block mb-3">
              // {t.gridPanel}
            </span>

            <div className="space-y-4">
              <div className="p-3 bg-[#111415] border border-[#464932]">
                <p className="font-mono text-[8px] text-[#c7c9ac] uppercase font-bold">{t.distanceEst}</p>
                <p className="font-headline text-2xl text-[#E1FD15] font-black uppercase mt-1">
                  {estimatedDistance} <span className="text-xs text-white">KM</span>
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] text-[#c7c9ac] uppercase font-bold mb-2">{t.mySchedule}</p>
                
                {registeredEventsList.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {registeredEventsList.map(item => (
                      <div key={item.id} className="bg-[#111415] p-2 border-l-2 border-[#9500FF] flex justify-between items-center text-xs">
                        <div className="min-w-0">
                          <p className="font-headline text-xs font-bold text-white uppercase truncate">{item.title}</p>
                          <p className="font-mono text-[9px] text-[#c7c9ac] truncate mt-0.5">{item.location}</p>
                        </div>
                        <span className="font-mono text-[8px] text-[#E1FD15] border border-[#E1FD15]/20 px-1 bg-[#0c0e10]">SYNC</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-[#111415] text-center border border-[#464932]">
                    <p className="font-mono text-[10px] text-[#c7c9ac]">
                      {lang === 'EN' ? 'No vectors active.' : lang === 'FR' ? 'Aucun vecteur actif.' : 'Ningún vector activo.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#464932]/30 flex items-center justify-between text-[10px] font-mono text-[#c7c9ac]">
                <span>{t.terminalActive}</span>
                <span className="w-2 h-2 rounded-full bg-[#E1FD15] animate-ping" />
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
