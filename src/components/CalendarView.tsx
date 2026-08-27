import React from 'react';
import { 
  School, 
  MapPin, 
  ArrowRight, 
  Trophy, 
  Flame, 
  X, 
  Calendar, 
  Clock, 
  Bike, 
  Brush, 
  Milestone, 
  Shuffle, 
  Sparkles, 
  Compass, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMETABLE_EVENTS } from '../data';
import { TimetableEvent } from '../types';

interface CalendarViewProps {
  lang: 'EN' | 'FR' | 'ES';
  registerFormUrl?: string;
}

export default function CalendarView({
  lang,
  registerFormUrl = 'https://forms.gle/7A9spHxz3Qm8VyEfA',
}: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = React.useState<1 | 2 | 3>(1);
  const [filterType, setFilterType] = React.useState<'all' | 'ride' | 'competition' | 'workshop' | 'social'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeDetailEventId, setActiveDetailEventId] = React.useState<string | null>(null);

  const scheduleContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToSchedule = () => {
    scheduleContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredEvents = TIMETABLE_EVENTS.filter((event) => {
    const matchesDay = event.day === selectedDay;
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch = 
      !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesType && matchesSearch;
  });

  // Master events list for carousel across the whole schedule or filtered view
  const currentEventsList = filteredEvents.length > 0 ? filteredEvents : TIMETABLE_EVENTS;

  // Keyboard navigation for active detail modal
  React.useEffect(() => {
    if (!activeDetailEventId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDetailEventId(null);
      } else if (e.key === 'ArrowLeft') {
        const idx = currentEventsList.findIndex((ev) => ev.id === activeDetailEventId);
        if (idx !== -1) {
          const prevIdx = idx > 0 ? idx - 1 : currentEventsList.length - 1;
          setActiveDetailEventId(currentEventsList[prevIdx].id);
        }
      } else if (e.key === 'ArrowRight') {
        const idx = currentEventsList.findIndex((ev) => ev.id === activeDetailEventId);
        if (idx !== -1) {
          const nextIdx = idx < currentEventsList.length - 1 ? idx + 1 : 0;
          setActiveDetailEventId(currentEventsList[nextIdx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDetailEventId, currentEventsList]);

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'directions_bike':
      case 'bike':
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
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#E1FD15]" />;
      case 'school':
        return <School className="w-5 h-5 text-[#E1FD15]" />;
      case 'users':
        return <Users className="w-5 h-5 text-[#E1FD15]" />;
      case 'trophy':
      case 'award':
        return <Trophy className="w-5 h-5 text-[#E1FD15]" />;
      default:
        return <Compass className="w-5 h-5 text-[#E1FD15]" />;
    }
  };

  const t = {
    hollowHeaderTitle: lang === 'EN' ? 'RIDE THE NIGHT' : lang === 'FR' ? 'ROULER LA NUIT' : 'CONDUCE LA NOCHE',
    viewSchedule: lang === 'EN' ? 'View Schedule' : lang === 'FR' ? 'Voir le Programme' : 'Ver Calendario',
    secureSpot: lang === 'EN' ? 'Register' : lang === 'FR' ? 'S\'inscrire' : 'Registrarse',
    secTitle: lang === 'EN' ? 'TACTICAL TIMETABLE' : lang === 'FR' ? 'CALENDRIER DES VECTEURS' : 'HORARIO TÁCTICO',
    secSubtitle: lang === 'EN' ? 'Sync your local terminal with scheduled grid activations. Click any session to open event details.' : lang === 'FR' ? 'Synchronisez vos platines avec le programme d\'activation du réseau. Cliquez sur une session pour voir les détails.' : 'Sincroniza tu terminal con las activaciones programadas. Haz clic en una sesión para ver detalles.',
    filterAll: lang === 'EN' ? 'All Activities' : lang === 'FR' ? 'Tout' : 'Todas',
    filterRides: lang === 'EN' ? 'Street Rides' : lang === 'FR' ? 'Randonnées' : 'Rutas Urbanas',
    filterComps: lang === 'EN' ? 'Competitions' : lang === 'FR' ? 'Compétitions' : 'Competiciones',
    filterWorkshops: lang === 'EN' ? 'Workshops' : lang === 'FR' ? 'Ateliers' : 'Talleres',
    filterSocials: lang === 'EN' ? 'Syndicate Socials' : lang === 'FR' ? 'Rassemblements' : 'Sociales del Sindicato',
    dayLabel: lang === 'EN' ? 'Day' : lang === 'FR' ? 'Jour' : 'Día',
    day1Label: lang === 'EN' ? 'Friday // Sept 11' : lang === 'FR' ? 'Vendredi // 11 Sept' : 'Viernes // 11 Sept',
    day2Label: lang === 'EN' ? 'Saturday // Sept 12' : lang === 'FR' ? 'Samedi // 12 Sept' : 'Sábado // 12 Sept',
    day3Label: lang === 'EN' ? 'Sunday // Sept 13' : lang === 'FR' ? 'Dimanche // 13 Sept' : 'Domingo // 13 Sept',
    noEvents: lang === 'EN' ? 'No scheduled vectors matching this filter.' : lang === 'FR' ? 'Aucun vecteur programmé pour ce filtre.' : 'No hay vectores programados que coincidan con este filtro.',
    vectorLabel: lang === 'EN' ? 'VECTOR' : lang === 'FR' ? 'VECTEUR' : 'VECTOR',
    viewDetails: lang === 'EN' ? 'VIEW DETAILS' : lang === 'FR' ? 'VOIR LES DÉTAILS' : 'VER DETALLES',
    searchPlaceholder: lang === 'EN' ? 'Filter sessions by name, venue, or keyword...' : lang === 'FR' ? 'Filtrer les sessions par nom, lieu ou mot-clé...' : 'Filtrar sesiones por nombre, lugar o palabra clave...',
    specs: lang === 'EN' ? 'DETAILED SPECIFICATIONS' : lang === 'FR' ? 'SPÉCIFICATIONS DÉTAILLÉES' : 'ESPECIFICACIONES DETALLADAS',
    registerForSession: lang === 'EN' ? 'Register for Session' : lang === 'FR' ? 'S\'inscrire à la session' : 'Registrarse en la sesión',
    dateLabel: lang === 'EN' ? 'DATE' : lang === 'FR' ? 'DATE' : 'FECHA',
    timeLabel: lang === 'EN' ? 'TIME' : lang === 'FR' ? 'HORAIRE' : 'HORA',
    locationLabel: lang === 'EN' ? 'LOCATION' : lang === 'FR' ? 'LIEU' : 'LUGAR',
    difficultyLabel: lang === 'EN' ? 'DIFFICULTY' : lang === 'FR' ? 'NIVEAU' : 'DIFICULTAD',
    prev: lang === 'EN' ? 'Prev' : lang === 'FR' ? 'Préc' : 'Ant',
    next: lang === 'EN' ? 'Next' : lang === 'FR' ? 'Suiv' : 'Sig',
  };

  return (
    <div className="flex flex-col w-full">
      {/* Immersive Hero Header */}
      <header className="relative w-full min-h-[921px] flex flex-col justify-center items-center pt-24 overflow-hidden border-b border-[#1F2833]">
        {/* Background Skyline */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-40 mix-blend-luminosity grayscale"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBk23iiPsQondimS8L4yxRofJ4bhsP047QTlBPD9Q2yAq81d3NVWmJPkMoTr-538WC-BYjgSUwL2KujXsd86RSSIWoIUPFWDCjC5znhkqE4sNF6ERE4RBrz1NAHjpvdYcCzVPhl3-Zxr86kRXEL4pew3b0hF0wcEmcXlS-W5jMlp00OGwHKc4tUvXNDcF2u6iZERWETMLoSwYmpfSpLYCqlrL4J03o2ZyXAxyJT3Z-l3270gFsqfT5g')" 
          }}
        />
        {/* Dark to transparent gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/60 via-[#0B0C10]/40 to-[#0B0C10]" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          {/* Authentic Logo hollow effect from mockups */}
          <div className="mb-6 select-none flex flex-col items-center">
            {/* Hollow purple word stroke */}
            <h1 
              className="font-headline text-8xl md:text-[140px] leading-none mb-[-10px] md:mb-[-25px] font-black uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(149,0,255,0.6)]"
              style={{
                WebkitTextStroke: '3px #9500FF',
                color: 'transparent'
              }}
            >
              <span className="lg:hidden">MTL</span>
              <span className="hidden lg:inline">MONTRÉAL</span>
            </h1>
            {/* Hollow lime word stroke */}
            <h1 
              className="font-headline text-9xl md:text-[160px] mt-[-28px] leading-none uppercase font-black tracking-tighter drop-shadow-[0_0_20px_rgba(225,253,21,0.6)] z-10"
              style={{
                WebkitTextStroke: '3px #E1FD15',
                color: 'transparent'
              }}
            >
              ROLL
            </h1>
          </div>

          <h2 className="font-headline text-3xl md:text-4xl text-white font-bold drop-shadow-md mb-2">2026</h2>
          <p className="font-headline text-lg md:text-xl text-[#E1FD15] tracking-[0.2em] font-extrabold uppercase drop-shadow-md">
            SEPT 11-12-13
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <a 
              href={registerFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E1FD15] text-[#0B0C10] px-8 py-4 rounded-none font-headline font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(225,253,21,0.8)] transition-all scale-95 active:scale-90 cursor-pointer border-0 w-full inline-block text-center"
              style={{ display: "flex", alignItems: "center", justifyContent: "center"}}
            >
              {t.secureSpot}
            </a>
            <button 
              onClick={handleScrollToSchedule}
              className="bg-transparent border-2 border-[#9500FF] text-white px-8 py-4 rounded-none font-headline font-bold text-sm uppercase tracking-widest hover:bg-[#9500FF]/20 transition-all scale-95 active:scale-90 cursor-pointer w-full"
            >
              {t.viewSchedule}
            </button>
          </div>
        </div>

        {/* Vertical visual laser line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#9500FF] to-transparent" />
      </header>

      {/* Schedule / Timetable Section */}
      <section 
        ref={scheduleContainerRef}
        className="py-24 bg-[#0B0C10] border-t border-[#1F2833] w-full"
      >
        <div className="px-6 md:px-16 w-full max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-12 text-left border-b border-[#1F2833] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#E1FD15] tracking-widest uppercase block mb-1 font-bold">
                &gt; SYS.SCHED_SERVICE // 2026
              </span>
              <h3 className="font-headline text-3xl md:text-4xl text-white font-black uppercase tracking-tight">
                {t.secTitle}
              </h3>
              <p className="text-sm text-[#c7c9ac] mt-2 max-w-xl">
                {t.secSubtitle}
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-1.5 self-start">
              {([
                { id: 'all', label: t.filterAll },
                { id: 'ride', label: t.filterRides },
                { id: 'competition', label: t.filterComps },
                { id: 'workshop', label: t.filterWorkshops },
                { id: 'social', label: t.filterSocials },
              ] as const).map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`py-1.5 px-3 font-mono text-[10px] uppercase tracking-wider cursor-pointer border transition-all ${
                    filterType === filter.id
                      ? 'bg-[#E1FD15] border-[#E1FD15] text-[#0B0C10] font-black shadow-[0_0_10px_rgba(225,253,21,0.4)]'
                      : 'bg-[#111415] border-[#464932] text-[#c7c9ac] hover:bg-[#1e2021] hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside Timetable */}
          <div className="mb-8">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c7c9ac]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#111415] border border-[#464932] text-xs font-mono pl-9 pr-8 py-2.5 text-white placeholder-[#666] focus:border-[#E1FD15] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#c7c9ac] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Chrono Timeline Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Days Column Selection */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5">
              {([
                { day: 1, label: t.day1Label, prefix: `${t.dayLabel} 01` },
                { day: 2, label: t.day2Label, prefix: `${t.dayLabel} 02` },
                { day: 3, label: t.day3Label, prefix: `${t.dayLabel} 03` },
              ] as const).map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`flex-1 text-left p-4 cursor-pointer border transition-all relative ${
                    selectedDay === item.day
                      ? 'bg-[#1F2833] border-[#9500FF] shadow-[0_0_15px_rgba(149,0,255,0.15)]'
                      : 'bg-[#111415] border-[#464932] opacity-70 hover:opacity-100 hover:border-[#9500FF]/50'
                  }`}
                >
                  {selectedDay === item.day && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#9500FF]" />
                  )}
                  <span className="font-mono text-[10px] block text-[#9500FF] font-bold uppercase">{item.prefix}</span>
                  <p className="font-headline text-xs text-white font-black uppercase tracking-tight mt-1">{item.label}</p>
                </button>
              ))}
            </div>

            {/* Timetable Flow List */}
            <div className="lg:col-span-9 space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  
                  // Map type to border/glow indicator colors
                  const themeColor = 
                    event.type === 'ride' ? 'border-l-[#E1FD15]' :
                    event.type === 'competition' ? 'border-l-[#ffb4ab]' :
                    event.type === 'workshop' ? 'border-l-[#9500FF]' : 'border-l-[#bec7d6]';

                  const typeTagColor = 
                    event.type === 'ride' ? 'text-[#E1FD15] bg-[#E1FD15]/5' :
                    event.type === 'competition' ? 'text-[#ffb4ab] bg-[#ffb4ab]/5' :
                    event.type === 'workshop' ? 'text-[#9500FF] bg-[#9500FF]/5' : 'text-white bg-white/5';

                  return (
                    <div
                      key={event.id}
                      onClick={() => setActiveDetailEventId(event.id)}
                      className={`bg-[#111415] p-5 border border-[#464932] border-l-4 ${themeColor} hover:border-[#9500FF] hover:shadow-[0_0_15px_rgba(149,0,255,0.2)] transition-all duration-300 flex flex-col md:flex-row items-start justify-between gap-4 text-left group cursor-pointer`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#E1FD15] font-semibold">{event.time}</span>
                          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border border-[#464932] ${typeTagColor}`}>
                            {event.type}
                          </span>
                        </div>
                        <h4 className="font-headline text-lg text-white font-black uppercase tracking-tight group-hover:text-[#E1FD15] transition-colors flex items-center gap-2">
                          {event.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#E1FD15]" />
                        </h4>
                        <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed max-w-2xl">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3 self-stretch justify-between text-left md:text-right shrink-0">
                        <div className="flex items-center gap-1.5 text-[#c7c9ac] text-xs font-mono">
                          <MapPin className="w-3.5 h-3.5 text-[#9500FF]" />
                          <span className="truncate max-w-[180px]">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDetailEventId(event.id);
                            }}
                            className="font-mono text-[9px] font-bold text-[#E1FD15] border border-[#E1FD15]/30 hover:border-[#E1FD15] hover:bg-[#E1FD15]/10 px-2.5 py-1 uppercase tracking-wider cursor-pointer inline-block"
                          >
                            &gt; {t.viewDetails}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 border border-dashed border-[#464932] text-center">
                  <p className="font-mono text-[#c7c9ac] text-xs">{t.noEvents}</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Details & Carousel Modal */}
      <AnimatePresence>
        {activeDetailEventId && (() => {
          const activeIndex = currentEventsList.findIndex((ev) => ev.id === activeDetailEventId);
          const activeEvent = activeIndex !== -1 ? currentEventsList[activeIndex] : null;

          if (!activeEvent) return null;

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setActiveDetailEventId(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111415] border-2 border-[#9500FF] w-full max-w-2xl relative overflow-hidden text-left shadow-[0_0_40px_rgba(149,0,255,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Techno Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E1FD15] pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9500FF] pointer-events-none z-20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9500FF] pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E1FD15] pointer-events-none z-20" />

                {/* Header/Close */}
                <div className="flex items-center justify-between border-b border-[#333537] px-6 py-4 bg-[#1F2833]">
                  <div className="flex items-center gap-2">
                    {renderIcon(activeEvent.iconName)}
                    <span className="font-mono text-[10px] text-[#E1FD15] uppercase tracking-widest font-black">
                      // {activeEvent.category || activeEvent.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#c7c9ac] px-2 bg-[#111415] border border-[#333537] py-0.5">
                      {activeIndex + 1} / {currentEventsList.length}
                    </span>
                    <button
                      onClick={() => setActiveDetailEventId(null)}
                      className="p-1 text-[#c7c9ac] hover:text-[#E1FD15] transition-all cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="max-h-[70vh] overflow-y-auto">
                  {/* Hero image banner */}
                  <div className="w-full h-56 relative bg-black">
                    <img
                      src={activeEvent.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaEtvIx3NC3aokEq5kAnJDSJej_iPs2Ir0RXyjztW_Bo-vgBwr2NREvtKYDGAKjGBvJ-mKODUcLe7js9QKoJto-O-z9W2doNrsIiazWALsCJWxQpYugsn_vInMSp6elnmQ0aDv--AnPNJHalMz7dl_99mSwqqei5OC0BM19vf8yu7Uug4CKtI6cVFwxLuoWYiC3nxV2MoyMjFDnxj5lVJASm0zmIASXFPtHWW5ZfU5G0EkvuHVBDiN'}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111415] via-[#111415]/40 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <h2 className="font-headline text-2xl sm:text-3xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {activeEvent.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Descriptions */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#9500FF] uppercase tracking-widest font-black block">
                        &gt; {t.specs}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#c7c9ac] leading-relaxed">
                        {activeEvent.longDescription || activeEvent.description}
                      </p>
                    </div>

                    {/* Metadata dashboard layout */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.dateLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">
                          {activeEvent.date || `Day 0${activeEvent.day}`}
                        </p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.timeLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">{activeEvent.time}</p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.locationLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase truncate" title={activeEvent.location}>
                          {activeEvent.location}
                        </p>
                      </div>

                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-500 mb-1">
                          <Flame className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.difficultyLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">
                          {activeEvent.difficulty || 'All Levels'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Carousel controls and action button */}
                <div className="border-t border-[#333537] bg-[#1F2833] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Previous / Next wrap triggers */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIdx = activeIndex > 0 ? activeIndex - 1 : currentEventsList.length - 1;
                        if (currentEventsList[prevIdx]) {
                          setActiveDetailEventId(currentEventsList[prevIdx].id);
                        }
                      }}
                      className="px-3 py-1.5 border border-[#464932] hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 font-mono text-[9px] uppercase text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>{t.prev}</span>
                    </button>

                    <span className="font-mono text-[10px] text-[#c7c9ac] px-2 bg-[#111415] border border-[#333537] py-1">
                      {activeIndex + 1} / {currentEventsList.length}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = activeIndex < currentEventsList.length - 1 ? activeIndex + 1 : 0;
                        if (currentEventsList[nextIdx]) {
                          setActiveDetailEventId(currentEventsList[nextIdx].id);
                        }
                      }}
                      className="px-3 py-1.5 border border-[#464932] hover:border-[#E1FD15] hover:bg-[#E1FD15]/5 font-mono text-[9px] uppercase text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{t.next}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Register action trigger */}
                  <a
                    href={registerFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setActiveDetailEventId(null);
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 font-headline text-xs font-black uppercase tracking-wider transition-all scale-95 active:scale-90 cursor-pointer border-0 inline-block text-center bg-[#9500FF] text-white hover:bg-[#8000DB] hover:shadow-[0_0_15px_#9500FF]"
                  >
                    {t.registerForSession}
                  </a>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
