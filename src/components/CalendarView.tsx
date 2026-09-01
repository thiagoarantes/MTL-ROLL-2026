import React from 'react';
import { 
  School, 
  MapPin, 
  ArrowRight, 
  Trophy, 
  Flame, 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Building2, 
  Brush, 
  Milestone, 
  Shuffle, 
  Sparkles, 
  Compass, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Navigation,
  CheckCircle2,
  Layers,
  Flag,
  List as ListIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMETABLE_EVENTS } from '../data/calendarData';
import { TimetableEvent, SkillLevelId, LocalizedText } from '../types';
import { SKATING_SKILL_LEVELS } from '../data/faqData';

interface CalendarViewProps {
  lang: 'EN' | 'FR' | 'ES';
  registerFormUrl?: string;
  volunteerFormUrl?: string;
}

export default function CalendarView({
  lang,
  registerFormUrl = 'https://forms.gle/7A9spHxz3Qm8VyEfA',
  volunteerFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc1bOWF_xmJuNlZifWtSGFHFhYTJUqjYpvbMZCE_rdhs5js8A/viewform',
}: CalendarViewProps) {
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  const [selectedDay, setSelectedDay] = React.useState<1 | 2 | 3 | 'all'>('all');
  const [filterType, setFilterType] = React.useState<'all' | 'ride' | 'competition' | 'workshop' | 'social'>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<'all' | SkillLevelId>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeDetailEventId, setActiveDetailEventId] = React.useState<string | null>(null);

  const scheduleContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToSchedule = () => {
    scheduleContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getLocalized = (field: string | LocalizedText | undefined): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.EN || '';
  };

  const getLevelInfo = (levelId: SkillLevelId) => {
    const level = SKATING_SKILL_LEVELS.find((lvl) => lvl.id === levelId);
    if (level) {
      return {
        id: level.id,
        name: level.name[lang] || level.name.EN,
        colorCode: level.colorCode,
        colorName: level.colorName,
        dotBg: level.dotBg,
        borderClass: level.borderClass,
        textClass: level.textClass,
        bgGlowClass: level.bgGlowClass,
        pace: level.pace ? level.pace[lang] : undefined,
      };
    }
    return {
      id: levelId,
      name: levelId,
      colorCode: '#E1FD15',
      colorName: 'Yellow',
      dotBg: 'bg-[#E1FD15]',
      borderClass: 'border-[#E1FD15]',
      textClass: 'text-[#E1FD15]',
      bgGlowClass: 'bg-[#E1FD15]/10',
      pace: undefined,
    };
  };

  // Events matching Category, Level, and Search query (independent of day)
  const matchingEvents = TIMETABLE_EVENTS.filter((event) => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesLevel = selectedLevel === 'all' || event.level === selectedLevel;
    
    const titleStr = getLocalized(event.title).toLowerCase();
    const descStr = getLocalized(event.description).toLowerCase();
    const startLocStr = getLocalized(event.startLocation).toLowerCase();
    const endLocStr = getLocalized(event.endLocation).toLowerCase();
    const catStr = getLocalized(event.category).toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = 
      !searchQuery || 
      titleStr.includes(q) ||
      descStr.includes(q) ||
      startLocStr.includes(q) ||
      endLocStr.includes(q) ||
      catStr.includes(q) ||
      event.time.toLowerCase().includes(q);

    return matchesType && matchesLevel && matchesSearch;
  });

  // List view specific events: applies the Day selection filter on top of other filters
  const listFilteredEvents = matchingEvents.filter((event) => {
    return selectedDay === 'all' || event.day === selectedDay;
  });

  // Master events list for carousel across active view mode
  const activeEventsPool = viewMode === 'calendar' ? matchingEvents : listFilteredEvents;
  const currentEventsList = activeEventsPool.length > 0 ? activeEventsPool : TIMETABLE_EVENTS;

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
      case 'building':
      case 'building2':
        return <Building2 className="w-4 h-4 text-[#E1FD15]" />;
      case 'brush':
        return <Brush className="w-4 h-4 text-[#E1FD15]" />;
      case 'route':
        return <Milestone className="w-4 h-4 text-[#E1FD15]" />;
      case 'timeline':
        return <Shuffle className="w-4 h-4 text-[#E1FD15]" />;
      case 'flight_takeoff':
        return <Flame className="w-4 h-4 text-[#E1FD15]" />;
      case 'auto_awesome':
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#E1FD15]" />;
      case 'school':
        return <School className="w-4 h-4 text-[#E1FD15]" />;
      case 'users':
        return <Users className="w-4 h-4 text-[#E1FD15]" />;
      case 'trophy':
      case 'award':
        return <Trophy className="w-4 h-4 text-[#E1FD15]" />;
      default:
        return <Compass className="w-4 h-4 text-[#E1FD15]" />;
    }
  };

  const t = {
    hollowHeaderTitle: lang === 'EN' ? 'RIDE THE NIGHT' : lang === 'FR' ? 'ROULER LA NUIT' : 'CONDUCE LA NOCHE',
    viewSchedule: lang === 'EN' ? 'View Schedule' : lang === 'FR' ? 'Voir le Programme' : 'Ver Calendario',
    secureSpot: lang === 'EN' ? 'Register' : lang === 'FR' ? 'S\'inscrire' : 'Registrarse',
    becomeVolunteer: lang === 'EN' ? 'Become a Volunteer' : lang === 'FR' ? 'Devenir Bénévole' : 'Hazte Voluntario',
    secTitle: lang === 'EN' ? 'TACTICAL TIMETABLE' : lang === 'FR' ? 'CALENDRIER DES VECTEURS' : 'HORARIO TÁCTICO',
    secSubtitle: lang === 'EN' 
      ? 'Synchronized schedule of rides, workshops, and competitions. Click any event to inspect full route vectors and requirements.' 
      : lang === 'FR' 
      ? 'Programme synchronisé des randonnées, ateliers et compétitions. Cliquez sur une session pour voir l\'itinéraire et les détails.' 
      : 'Horario sincronizado de rutas, talleres y competencias. Haz clic en un evento para ver rutas y especificaciones.',
    filterAll: lang === 'EN' ? 'All Activities' : lang === 'FR' ? 'Tout' : 'Todas',
    filterRides: lang === 'EN' ? 'Street Rides' : lang === 'FR' ? 'Randonnées' : 'Rutas Urbanas',
    filterComps: lang === 'EN' ? 'Competitions' : lang === 'FR' ? 'Compétitions' : 'Competiciones',
    filterWorkshops: lang === 'EN' ? 'Workshops' : lang === 'FR' ? 'Ateliers' : 'Talleres',
    filterSocials: lang === 'EN' ? 'Syndicate Socials' : lang === 'FR' ? 'Rassemblements' : 'Sociales del Sindicato',
    allLevels: lang === 'EN' ? 'All Levels' : lang === 'FR' ? 'Tous Niveaux' : 'Todos los Niveles',
    dayLabel: lang === 'EN' ? 'Day' : lang === 'FR' ? 'Jour' : 'Día',
    allDaysPrefix: lang === 'EN' ? 'ALL DAYS // SEPT 11–13' : lang === 'FR' ? 'TOUS LES JOURS // 11–13 SEPT' : 'TODOS LOS DÍAS // 11–13 SEPT',
    allDaysLabel: lang === 'EN' ? 'All Days (Full Grid)' : lang === 'FR' ? 'Tous les Jours (Complet)' : 'Todos los Días (Completo)',
    day1Label: lang === 'EN' ? 'Friday // Sept 11' : lang === 'FR' ? 'Vendredi // 11 Sept' : 'Viernes // 11 Sept',
    day2Label: lang === 'EN' ? 'Saturday // Sept 12' : lang === 'FR' ? 'Samedi // 12 Sept' : 'Sábado // 12 Sept',
    day3Label: lang === 'EN' ? 'Sunday // Sept 13' : lang === 'FR' ? 'Dimanche // 13 Sept' : 'Domingo // 13 Sept',
    day1Short: lang === 'EN' ? 'Friday Sept 11' : lang === 'FR' ? 'Vendredi 11 Sept' : 'Viernes 11 Sept',
    day2Short: lang === 'EN' ? 'Saturday Sept 12' : lang === 'FR' ? 'Samedi 12 Sept' : 'Sábado 12 Sept',
    day3Short: lang === 'EN' ? 'Sunday Sept 13' : lang === 'FR' ? 'Dimanche 13 Sept' : 'Domingo 13 Sept',
    listViewTab: lang === 'EN' ? 'List' : lang === 'FR' ? 'Liste' : 'Lista',
    calendarViewTab: lang === 'EN' ? 'Calendar' : lang === 'FR' ? 'Calendrier' : 'Calendario',
    noEvents: lang === 'EN' ? 'No scheduled vectors matching this filter.' : lang === 'FR' ? 'Aucun vecteur programmé pour ce filtre.' : 'No hay vectores programados que coincidan con este filtre.',
    vectorLabel: lang === 'EN' ? 'VECTOR' : lang === 'FR' ? 'VECTEUR' : 'VECTOR',
    viewDetails: lang === 'EN' ? 'VIEW DETAILS' : lang === 'FR' ? 'VOIR LES DÉTAILS' : 'VER DETALLES',
    searchPlaceholder: lang === 'EN' ? 'Filter sessions by title, venue, route, or category...' : lang === 'FR' ? 'Filtrer les sessions par titre, lieu, itinéraire ou catégorie...' : 'Filtrar sesiones por título, lugar, ruta o categoría...',
    specs: lang === 'EN' ? 'DETAILED SPECIFICATIONS' : lang === 'FR' ? 'SPÉCIFICATIONS DÉTAILLÉES' : 'ESPECIFICACIONES DETALLADAS',
    registerForSession: lang === 'EN' ? 'Register' : lang === 'FR' ? 'S\'inscrire' : 'Registrarse',
    dateLabel: lang === 'EN' ? 'DATE' : lang === 'FR' ? 'DATE' : 'FECHA',
    timeLabel: lang === 'EN' ? 'TIME' : lang === 'FR' ? 'HORAIRE' : 'HORA',
    levelLabel: lang === 'EN' ? 'LEVEL' : lang === 'FR' ? 'NIVEAU' : 'NIVEL',
    locationLabel: lang === 'EN' ? 'LOCATION' : lang === 'FR' ? 'LIEU' : 'LUGAR',
    categoryLabel: lang === 'EN' ? 'CATEGORY' : lang === 'FR' ? 'CATÉGORIE' : 'CATEGORÍA',
    startLocationLabel: lang === 'EN' ? 'STARTING LOCATION' : lang === 'FR' ? 'LIEU DE DÉPART' : 'LUGAR DE SALIDA',
    endLocationLabel: lang === 'EN' ? 'ENDING LOCATION' : lang === 'FR' ? 'LIEU D\'ARRIVÉE' : 'LUGAR DE LLEGADA',
    rideType: lang === 'EN' ? 'STREET RIDE' : lang === 'FR' ? 'RANDONNÉE URBAINE' : 'RUTA DE PATINAJE',
    fixedType: lang === 'EN' ? 'FIXED LOCATION' : lang === 'FR' ? 'LIEU UNIQUE' : 'LUGAR FIJO',
    routeTrajectory: lang === 'EN' ? 'ROUTE TRAJECTORY' : lang === 'FR' ? 'TRAJECTOIRE DU PARCOURS' : 'TRAYECTORIA DE LA RUTA',
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
            backgroundImage: "url('/mtlbg.png')" 
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

          <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a 
                href={registerFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 bg-[#E1FD15] text-[#0B0C10] px-6 font-headline font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(225,253,21,0.8)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer border-0 w-full flex items-center justify-center text-center"
              >
                {t.secureSpot}
              </a>
              <button 
                onClick={handleScrollToSchedule}
                className="h-14 bg-transparent border-2 border-[#9500FF] text-white px-6 font-headline font-bold text-sm uppercase tracking-widest hover:bg-[#9500FF]/20 hover:shadow-[0_0_20px_rgba(149,0,255,0.4)] active:scale-[0.98] transition-all cursor-pointer w-full flex items-center justify-center text-center"
              >
                {t.viewSchedule}
              </button>
            </div>

            {/* Become a Volunteer */}
            <div className="w-full">
              <a 
                href={volunteerFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 bg-[#111415]/90 border-2 border-[#00D2FF] text-[#00D2FF] hover:text-white hover:bg-[#00D2FF]/20 hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] active:scale-[0.98] px-6 font-headline font-bold text-sm uppercase tracking-widest transition-all cursor-pointer w-full flex items-center justify-center gap-2 text-center"
              >
                <Users className="w-4 h-4 text-[#00D2FF]" />
                <span>{t.becomeVolunteer}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Vertical visual laser line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#9500FF] to-transparent" />
      </header>

      {/* Tactical Timetable Section */}
      <section 
        ref={scheduleContainerRef}
        className="py-24 bg-[#0B0C10] border-t border-[#1F2833] w-full"
      >
        <div className="px-6 md:px-16 w-full max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-10 text-left border-b border-[#1F2833] pb-6 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#E1FD15] tracking-widest uppercase block mb-1 font-bold">
                  &gt; SYS.TACTICAL_TIMETABLE // 2026
                </span>
                <h3 className="font-headline text-3xl md:text-4xl text-white font-black uppercase tracking-tight">
                  {t.secTitle}
                </h3>
                <p className="text-sm text-[#c7c9ac] mt-2 max-w-3xl">
                  {t.secSubtitle}
                </p>
              </div>

              {/* View Mode Switcher: List vs Calendar */}
              <div className="flex items-center self-start md:self-auto bg-[#111415] border border-[#464932] p-1 gap-1 shrink-0">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#9500FF] text-white font-black shadow-[0_0_12px_rgba(149,0,255,0.4)] border border-[#9500FF]'
                      : 'text-[#c7c9ac] hover:text-white hover:bg-[#1a1d20] border border-transparent'
                  }`}
                  title={t.listViewTab}
                >
                  <ListIcon className="w-3.5 h-3.5" />
                  <span>{t.listViewTab}</span>
                </button>

                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'calendar'
                      ? 'bg-[#9500FF] text-white font-black shadow-[0_0_12px_rgba(149,0,255,0.4)] border border-[#9500FF]'
                      : 'text-[#c7c9ac] hover:text-white hover:bg-[#1a1d20] border border-transparent'
                  }`}
                  title={t.calendarViewTab}
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{t.calendarViewTab}</span>
                </button>
              </div>
            </div>

            {/* Category Filter directly under subtitle */}
            <div className="flex flex-wrap gap-2 pt-1">
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
                  className={`py-1.5 px-3.5 font-mono text-[11px] uppercase tracking-wider cursor-pointer border transition-all ${
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

          {/* Level Filter Bar & Search bar */}
          <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
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

            {/* Skill Level Quick Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider mr-1 hidden sm:inline">
                {t.levelLabel}:
              </span>
              <button
                onClick={() => setSelectedLevel('all')}
                className={`py-1 px-2.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer border transition-all ${
                  selectedLevel === 'all'
                    ? 'bg-[#1F2833] border-[#9500FF] text-white font-bold'
                    : 'bg-[#111415] border-[#333537] text-[#888] hover:text-white'
                }`}
              >
                {t.allLevels}
              </button>
              {SKATING_SKILL_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`py-1 px-2.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer border flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? `${lvl.bgGlowClass} ${lvl.borderClass} ${lvl.textClass} font-bold shadow-[0_0_10px_rgba(0,0,0,0.5)]`
                        : 'bg-[#111415] border-[#333537] text-[#c7c9ac] hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${lvl.dotBg}`} />
                    <span>{lvl.name[lang] || lvl.name.EN}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timetable Content: List View or 3-Column Calendar View */}
          {viewMode === 'calendar' ? (
            /* 3-Column Calendar Layout (Friday, Saturday, Sunday) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {([
                { day: 1 as const, label: t.day1Label, short: t.day1Short, dateCode: '2026-09-11' },
                { day: 2 as const, label: t.day2Label, short: t.day2Short, dateCode: '2026-09-12' },
                { day: 3 as const, label: t.day3Label, short: t.day3Short, dateCode: '2026-09-13' },
              ]).map((col) => {
                // Calendar view always displays all three days, filtered only by category/level/search
                const dayEvents = matchingEvents.filter((ev) => ev.day === col.day);

                return (
                  <div 
                    key={col.day} 
                    className="bg-[#111415] border border-[#272a2e] flex flex-col min-h-[500px]"
                  >
                    {/* Day Column Header */}
                    <div className="bg-[#181a1e] border-b border-[#272a2e] p-4 flex items-center justify-between sticky top-0 z-10">
                      <div>
                        <span className="font-mono text-[10px] text-[#9500FF] font-bold uppercase tracking-wider block">
                          {t.dayLabel} 0{col.day}
                        </span>
                        <h4 className="font-headline text-base text-white font-black uppercase tracking-tight">
                          {col.short}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] bg-[#0B0C10] border border-[#333537] text-[#E1FD15] px-2 py-0.5 font-bold">
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>

                    {/* Events List in Column */}
                    <div className="p-3.5 space-y-3 flex-1">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((event) => {
                          const title = getLocalized(event.title);
                          const levelInfo = getLevelInfo(event.level);

                          // Purple left border, yellow on hover
                          const themeBorder = 'border-l-[#9500FF]';

                          return (
                            <div
                              key={event.id}
                              onClick={() => setActiveDetailEventId(event.id)}
                              className={`bg-[#17191d] border border-[#272a2e] border-l-4 ${themeBorder} hover:border-[#E1FD15] hover:border-l-[#E1FD15] hover:bg-[#1f2227] hover:shadow-[0_0_15px_rgba(225,253,21,0.25)] transition-all p-3.5 cursor-pointer group text-left relative`}
                            >
                              {/* Time & Level Indicator */}
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-1.5 text-[#E1FD15] font-mono text-xs font-bold">
                                  <Clock className="w-3.5 h-3.5 shrink-0" />
                                  <span>{event.time}</span>
                                </div>
                                <span className={`w-2 h-2 rounded-full ${levelInfo.dotBg}`} title={levelInfo.name} />
                              </div>

                              {/* Title */}
                              <h5 className="font-headline text-sm text-white font-bold uppercase tracking-tight group-hover:text-[#E1FD15] transition-colors leading-snug">
                                {title}
                              </h5>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-12 px-4 border border-dashed border-[#2b2e33] text-center bg-[#0d0e11]/50 my-2">
                          <p className="font-mono text-[#888] text-[11px]">{t.noEvents}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Chrono Timeline Selection: List View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Days Column Selection */}
              <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0">
                {/* All Days Top Option - Thinner profile */}
                <button
                  onClick={() => setSelectedDay('all')}
                  className={`flex-1 lg:flex-none text-left py-2.5 px-3.5 cursor-pointer border transition-all relative shrink-0 min-w-[130px] lg:min-w-0 ${
                    selectedDay === 'all'
                      ? 'bg-[#1F2833] border-[#9500FF] shadow-[0_0_15px_rgba(149,0,255,0.15)]'
                      : 'bg-[#111415] border-[#464932] opacity-75 hover:opacity-100 hover:border-[#9500FF]/50'
                  }`}
                >
                  {selectedDay === 'all' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#9500FF]" />
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[9px] block text-[#9500FF] font-bold uppercase tracking-wider">
                      {t.allDaysPrefix}
                    </span>
                    <span className="font-mono text-[8px] text-[#E1FD15] bg-[#E1FD15]/10 px-1.5 py-0.5 border border-[#E1FD15]/30">
                      3D
                    </span>
                  </div>
                  <p className="font-headline text-[11px] text-white font-black uppercase tracking-tight mt-0.5">
                    {t.allDaysLabel}
                  </p>
                </button>

                {([
                  { day: 1, label: t.day1Label, prefix: `${t.dayLabel} 01` },
                  { day: 2, label: t.day2Label, prefix: `${t.dayLabel} 02` },
                  { day: 3, label: t.day3Label, prefix: `${t.dayLabel} 03` },
                ] as const).map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`flex-1 lg:flex-none text-left p-4 cursor-pointer border transition-all relative shrink-0 min-w-[130px] lg:min-w-0 ${
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
                {listFilteredEvents.length > 0 ? (
                  listFilteredEvents.map((event) => {
                    const title = getLocalized(event.title);
                    const description = getLocalized(event.description);
                    const dateStr = getLocalized(event.date);
                    const startLocation = getLocalized(event.startLocation);
                    const endLocation = getLocalized(event.endLocation);
                    const category = getLocalized(event.category);
                    const isRide = !!endLocation && endLocation.trim().length > 0;
                    const levelInfo = getLevelInfo(event.level);

                    // Purple left border, yellow on hover
                    const themeBorder = 'border-l-[#9500FF]';

                    return (
                      <div
                        key={event.id}
                        onClick={() => setActiveDetailEventId(event.id)}
                        className={`bg-[#111415] border border-[#333537] border-l-4 ${themeBorder} hover:border-[#E1FD15] hover:border-l-[#E1FD15] hover:shadow-[0_0_20px_rgba(225,253,21,0.2)] transition-all duration-300 p-5 group cursor-pointer text-left relative`}
                      >
                        {/* Content Area */}
                        <div className="flex flex-col justify-between gap-4">
                          <div className="space-y-2.5">
                            {/* Metadata row: Category, Type, Date, Time & Skill Level */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222528] pb-3">
                              <div className="flex flex-wrap items-center gap-2">
                                {/* Category Tag */}
                                <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-[#1F2833] border border-[#464932] text-white font-bold flex items-center gap-1.5">
                                  {renderIcon(event.iconName)}
                                  <span>{category}</span>
                                </span>

                                {/* Time */}
                                <div className="flex items-center gap-1.5 text-[#E1FD15] font-mono text-xs font-bold ml-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{event.time}</span>
                                </div>

                                {/* Date */}
                                <span className="text-gray-500 text-xs font-mono hidden sm:inline">•</span>
                                <span className="text-[#8e9196] font-mono text-[11px]">
                                  {dateStr}
                                </span>
                              </div>

                              {/* Level Badge from FAQ */}
                              <div className={`px-2 py-0.5 border ${levelInfo.borderClass} ${levelInfo.bgGlowClass} ${levelInfo.textClass} font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${levelInfo.dotBg}`} />
                                <span>{levelInfo.name}</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h4 className="font-headline text-lg sm:text-xl text-white font-black uppercase tracking-tight group-hover:text-[#E1FD15] transition-colors flex items-center justify-between gap-2">
                              <span>{title}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#E1FD15] shrink-0" />
                            </h4>

                            {/* Description */}
                            <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed line-clamp-2">
                              {description}
                            </p>
                          </div>

                          {/* Starting Location & Ending Location Display */}
                          <div className="bg-[#17191d] border border-[#272a2e] p-2.5 space-y-1.5">
                            {isRide ? (
                              /* Ride Route: Start ➔ End */
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                                <div className="flex items-center gap-1.5 text-[#E1FD15] min-w-0">
                                  <Navigation className="w-3.5 h-3.5 text-[#E1FD15] shrink-0" />
                                  <div className="truncate">
                                    <span className="text-[9px] text-gray-500 uppercase block tracking-wider font-sans">{t.startLocationLabel}:</span>
                                    <span className="text-white font-medium truncate block">{startLocation}</span>
                                  </div>
                                </div>

                                <div className="hidden sm:flex items-center text-[#E1FD15] shrink-0 px-1 font-bold">
                                  ➔
                                </div>

                                <div className="flex items-center gap-1.5 text-[#00D2FF] min-w-0">
                                  <Flag className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                                  <div className="truncate">
                                    <span className="text-[9px] text-gray-500 uppercase block tracking-wider font-sans">{t.endLocationLabel}:</span>
                                    <span className="text-white font-medium truncate block">{endLocation}</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Fixed Venue / Single Location */
                              <div className="flex items-center gap-1.5 text-xs font-mono text-white">
                                <MapPin className="w-3.5 h-3.5 text-[#9500FF] shrink-0" />
                                <div className="truncate">
                                  <span className="text-[9px] text-gray-500 uppercase block tracking-wider font-sans">{t.locationLabel}:</span>
                                  <span className="text-white font-medium truncate block">{startLocation}</span>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 border border-dashed border-[#464932] text-center bg-[#111415]/50">
                    <p className="font-mono text-[#c7c9ac] text-xs">{t.noEvents}</p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Details & Route Modal */}
      <AnimatePresence>
        {activeDetailEventId && (() => {
          const activeIndex = currentEventsList.findIndex((ev) => ev.id === activeDetailEventId);
          const activeEvent = activeIndex !== -1 ? currentEventsList[activeIndex] : null;

          if (!activeEvent) return null;

          const title = getLocalized(activeEvent.title);
          const description = getLocalized(activeEvent.description);
          const longDescription = getLocalized(activeEvent.longDescription) || description;
          const dateStr = getLocalized(activeEvent.date);
          const startLocation = getLocalized(activeEvent.startLocation);
          const endLocation = getLocalized(activeEvent.endLocation);
          const category = getLocalized(activeEvent.category);
          const isRide = !!endLocation && endLocation.trim().length > 0;
          const levelInfo = getLevelInfo(activeEvent.level);

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
                className="bg-[#111415] border-2 border-[#9500FF] w-full max-w-3xl relative overflow-hidden text-left shadow-[0_0_40px_rgba(149,0,255,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Techno Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E1FD15] pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9500FF] pointer-events-none z-20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9500FF] pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E1FD15] pointer-events-none z-20" />

                {/* Header/Close */}
                <div className="flex items-center justify-between border-b border-[#333537] px-6 py-4 bg-[#1F2833]">
                  <div className="flex items-center gap-2.5">
                    {renderIcon(activeEvent.iconName)}
                    <span className="font-mono text-[11px] text-[#E1FD15] uppercase tracking-widest font-black">
                      // {category}
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
                <div className="max-h-[72vh] overflow-y-auto">
                  {/* Hero image banner */}
                  <div className="w-full h-64 relative bg-black">
                    <img
                      src={activeEvent.image}
                      alt={title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111415] via-[#111415]/40 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 border ${levelInfo.borderClass} ${levelInfo.bgGlowClass} ${levelInfo.textClass} font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs`}>
                          {levelInfo.name}
                        </span>
                        <span className="bg-black/70 px-2 py-0.5 border border-[#333537] text-white font-mono text-[10px]">
                          {activeEvent.time}
                        </span>
                      </div>
                      <h2 className="font-headline text-2xl sm:text-3xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Structure elements grid: Date, Time, Level, Category, Locations */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Date */}
                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.dateLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">
                          {dateStr}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#E1FD15]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.timeLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">{activeEvent.time}</p>
                      </div>

                      {/* Level from FAQ */}
                      <div className={`p-3 border ${levelInfo.borderClass} ${levelInfo.bgGlowClass}`}>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${levelInfo.textClass}`} />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.levelLabel}</span>
                        </div>
                        <p className={`font-sans text-xs font-black uppercase ${levelInfo.textClass}`}>
                          {levelInfo.name}
                        </p>
                      </div>

                      {/* Category */}
                      <div className="bg-[#1F2833] p-3 border border-[#333537]">
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Layers className="w-3.5 h-3.5 text-[#9500FF]" />
                          <span className="font-mono text-[8px] uppercase tracking-wider">{t.categoryLabel}</span>
                        </div>
                        <p className="font-sans text-xs font-bold text-white uppercase">
                          {category}
                        </p>
                      </div>
                    </div>

                    {/* Location & Route Breakdown */}
                    <div className="bg-[#181a1e] border border-[#333537] p-4 space-y-3">
                      <span className="font-mono text-[9px] text-[#E1FD15] uppercase tracking-widest font-black block">
                        &gt; {isRide ? t.routeTrajectory : t.locationLabel}
                      </span>
                      
                      {isRide ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border-l-2 border-[#E1FD15] pl-3 py-1">
                            <div className="flex items-center gap-1 text-[#E1FD15] text-[10px] font-mono uppercase font-bold mb-1">
                              <Navigation className="w-3.5 h-3.5" />
                              <span>{t.startLocationLabel}</span>
                            </div>
                            <p className="font-sans text-xs text-white font-semibold">{startLocation}</p>
                          </div>

                          <div className="border-l-2 border-[#00D2FF] pl-3 py-1">
                            <div className="flex items-center gap-1 text-[#00D2FF] text-[10px] font-mono uppercase font-bold mb-1">
                              <Flag className="w-3.5 h-3.5" />
                              <span>{t.endLocationLabel}</span>
                            </div>
                            <p className="font-sans text-xs text-white font-semibold">{endLocation}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="border-l-2 border-[#9500FF] pl-3 py-1">
                          <div className="flex items-center gap-1 text-[#9500FF] text-[10px] font-mono uppercase font-bold mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{t.locationLabel}</span>
                          </div>
                          <p className="font-sans text-xs text-white font-semibold">{startLocation}</p>
                        </div>
                      )}
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#9500FF] uppercase tracking-widest font-black block">
                        &gt; {t.specs}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#c7c9ac] leading-relaxed">
                        {longDescription}
                      </p>
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
