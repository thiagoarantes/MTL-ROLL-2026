import React from 'react';
import { Sparkles, Calendar, Award, School, MapPin, ArrowRight, ShieldAlert, ArrowUpRight, Zap, Trophy, Flame } from 'lucide-react';
import { TIMETABLE_EVENTS } from '../data';
import { Activity } from '../types';

interface CalendarViewProps {
  onOpenRegister: (activityId?: string) => void;
  onNavigateToActivities: () => void;
  activities: Activity[];
  lang: 'EN' | 'FR' | 'ES';
}

export default function CalendarView({
  onOpenRegister,
  onNavigateToActivities,
  activities,
  lang,
}: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = React.useState<1 | 2 | 3>(1);
  const [filterType, setFilterType] = React.useState<'all' | 'ride' | 'competition' | 'workshop' | 'social'>('all');

  const scheduleContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToSchedule = () => {
    scheduleContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredEvents = TIMETABLE_EVENTS.filter((event) => {
    const matchesDay = event.day === selectedDay;
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesDay && matchesType;
  });

  const t = {
    hollowHeaderTitle: lang === 'EN' ? 'RIDE THE NIGHT' : lang === 'FR' ? 'ROULER LA NUIT' : 'CONDUCE LA NOCHE',
    viewSchedule: lang === 'EN' ? 'View Schedule' : lang === 'FR' ? 'Voir le Programme' : 'Ver Calendario',
    secureSpot: lang === 'EN' ? 'Secure Your Spot' : lang === 'FR' ? 'Réserver mon Billet' : 'Asegura tu Lugar',
    systemModule: lang === 'EN' ? '> SYSTEM.MODULE.ACTIVITIES' : lang === 'FR' ? '> SYSTÈME.MODULE.ACTIVITÉS' : '> SISTEMA.MÓDULO.ACTIVIDADES',
    coreEvents: lang === 'EN' ? 'Core Events' : lang === 'FR' ? 'Événements Majeurs' : 'Eventos Principales',
    coreEventsDesc: lang === 'EN' 
      ? 'Three days of high-velocity street skating, technical workshops, and underground culture.'
      : lang === 'FR'
      ? 'Trois jours de skate urbain à grande vitesse, d\'ateliers techniques et de culture underground.'
      : 'Tres días de patinaje urbano a alta velocidad, talleres técnicos y cultura underground.',
    massRideTitle: lang === 'EN' ? 'Mass Night Ride' : lang === 'FR' ? 'Randonnée de Nuit' : 'Patinada Nocturna Masiva',
    massRideDesc: lang === 'EN'
      ? 'Take over the streets of Montreal. A massive, police-escorted route through the city\'s iconic arteries. Fast pace, high energy.'
      : lang === 'FR'
      ? 'Envahissez les rues de Montréal. Un parcours massif escorté par la sécurité à travers les artères emblématiques de la ville. Allure rapide, énergie pure.'
      : 'Toma las calles de Montreal. Una ruta masiva escoltada por la policía a través de las icónicas arterias de la ciudad. Ritmo rápido, alta energía.',
    slalomTitle: lang === 'EN' ? 'Urban Slalom' : lang === 'FR' ? 'Slalom Urbain' : 'Eslalon Urbano',
    slalomDesc: lang === 'EN'
      ? 'Technical precision meets concrete. Compete or watch the city\'s best navigate the cone gauntlet.'
      : lang === 'FR'
      ? 'La précision technique s\'empare du bitume. Participez ou regardez les meilleurs slalomeurs affronter le tracé de cônes.'
      : 'La precisión técnica se une al asfalto. Compite o mira a los mejores de la ciudad sortear los conos.',
    workshopsTitle: lang === 'EN' ? 'Workshops' : lang === 'FR' ? 'Ateliers' : 'Talleres',
    workshopsDesc: lang === 'EN'
      ? 'Learn braking techniques, urban mobility, and advanced maneuvers from the pros.'
      : lang === 'FR'
      ? 'Apprenez les techniques de freinage, l\'agilité urbaine et les figures complexes avec des pros.'
      : 'Aprende técnicas de frenado, movilidad urbana y maniobras avanzadas de la mano de profesionales.',
    afterpartyTitle: lang === 'EN' ? 'Afterparty' : lang === 'FR' ? 'Soirée Après-Skate' : 'Fiesta Posterior',
    afterpartyDesc: lang === 'EN'
      ? 'When the wheels stop rolling, the bass drops. Exclusive venue for registered participants.'
      : lang === 'FR'
      ? 'Quand les roues s\'arrêtent de tourner, la basse s\'impose. Lieu exclusif pour les inscrits.'
      : 'Cuando las ruedas dejan de girar, bajan los bajos. Lugar exclusivo para participantes registrados.',
    rosterTitle: lang === 'EN' ? 'Full Roster' : lang === 'FR' ? 'Catalogue Complet' : 'Lista Completa',
    rosterDesc: lang === 'EN' ? '> View all activities' : lang === 'FR' ? '> Voir toutes les activités' : '> Ver todas las actividades',
    secTitle: lang === 'EN' ? 'TACTICAL TIMETABLE' : lang === 'FR' ? 'CALENDRIER DES VECTEURS' : 'HORARIO TÁCTICO',
    secSubtitle: lang === 'EN' ? 'Sync your local terminal with scheduled grid activations.' : lang === 'FR' ? 'Synchronisez vos platines avec le programme d\'activation du réseau.' : 'Sincroniza tu terminal local con las activaciones programadas.',
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
              MTL
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
            <button 
              onClick={() => onOpenRegister()}
              className="bg-[#E1FD15] text-[#0B0C10] px-8 py-4 rounded-none font-headline font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(225,253,21,0.8)] transition-all scale-95 active:scale-90 cursor-pointer border-0 w-full"
            >
              {t.secureSpot}
            </button>
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

      {/* Core Events Bento Section */}
      <section className="py-24 px-6 md:px-16 w-full max-w-7xl mx-auto" id="core-activities">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1F2833] pb-6">
          <div>
            <span className="font-mono text-xs text-[#9500FF] tracking-widest uppercase mb-2 block font-bold">
              {t.systemModule}
            </span>
            <h3 className="font-headline text-3xl md:text-4xl text-white font-black uppercase tracking-tight">
              {t.coreEvents}
            </h3>
          </div>
          <p className="font-sans text-[#c7c9ac] text-sm md:text-base max-w-md md:text-right">
            {t.coreEventsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Bento Card: Mass Night Ride */}
          <div 
            onClick={() => onOpenRegister('act-night-ride')}
            className="md:col-span-2 group relative bg-[#1F2833] p-8 min-h-[350px] border border-transparent hover:border-[#E1FD15] hover:shadow-[0_0_20px_rgba(225,253,21,0.15)] transition-all duration-500 overflow-hidden flex flex-col justify-end cursor-pointer"
          >
            {/* Background artwork */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-102 transition-all duration-700 mix-blend-luminosity grayscale"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzIYd8nyAicsDj0p9QMw0vc_OypY39Qi03q0N_nV2O9EkC9DmBiDS8VszGJGjdHD-Q7d01ywp0A6xGw1wqhRZnXfdWLJ7oDHSdPCDdacR6jox0ay6ByqcF0vqzVhG1U8N5QEOvUDL_kM1tdY-B4oTeUMUJk9bp_aUq1t407HctiUyKcpMOuhxJJcu9j-sFO1rDOgw3Ts73e8m-CiwhsK9C9-xMAS0iDUgpnTPFewCZ6D1H0a-IVUfa')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] to-transparent" />

            <div className="relative z-10 text-left">
              <span className="inline-block bg-[#333537] text-white font-mono text-[10px] font-bold px-2.5 py-1 mb-4 border border-[#464932]">
                DAY 1 & 2
              </span>
              <h4 className="font-headline text-2xl text-[#E1FD15] font-black uppercase tracking-tight mb-2 flex items-center gap-2">
                {t.massRideTitle}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </h4>
              <p className="font-sans text-sm text-[#e2e2e4] max-w-lg leading-relaxed">
                {t.massRideDesc}
              </p>
            </div>

            {/* Corner visual lines */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#9500FF] m-4 opacity-50" />
          </div>

          {/* Vertical Card: Slalom */}
          <div 
            onClick={() => onOpenRegister('act-slalom')}
            className="group relative bg-[#1F2833] p-8 min-h-[350px] border border-transparent hover:border-[#9500FF] hover:shadow-[0_0_20px_rgba(149,0,255,0.15)] transition-all duration-500 overflow-hidden flex flex-col justify-between text-left cursor-pointer"
          >
            <div className="w-full flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#9500FF]/10 flex items-center justify-center border border-[#9500FF]">
                <Trophy className="w-5 h-5 text-[#9500FF]" />
              </div>
              <span className="inline-block bg-[#333537] text-white font-mono text-[10px] font-bold px-2.5 py-1 border border-[#464932]">
                DAY 3
              </span>
            </div>

            <div className="relative z-10 mt-8">
              <h4 className="font-headline text-xl text-white font-black uppercase tracking-tight mb-2 flex items-center gap-1">
                {t.slalomTitle}
                <ArrowUpRight className="w-4 h-4 text-[#9500FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </h4>
              <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed">
                {t.slalomDesc}
              </p>
            </div>

            {/* Bottom active line slider overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#9500FF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </div>

          {/* Mini Card: Workshops */}
          <div 
            onClick={() => onOpenRegister('act-mural-ride')}
            className="group bg-[#1F2833] p-6 border-t-2 border-[#333537] hover:border-[#E1FD15] cursor-pointer transition-all duration-300 text-left flex flex-col justify-between min-h-[140px]"
          >
            <h4 className="font-headline text-lg text-white font-black uppercase tracking-tight flex items-center gap-2">
              <School className="w-5 h-5 text-[#E1FD15]" />
              {t.workshopsTitle}
            </h4>
            <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed mt-2 flex-grow">
              {t.workshopsDesc}
            </p>
          </div>

          {/* Mini Card: Afterparty */}
          <div 
            onClick={() => onOpenRegister('act-wizard')}
            className="group bg-[#1F2833] p-6 border-t-2 border-[#333537] hover:border-[#9500FF] cursor-pointer transition-all duration-300 text-left flex flex-col justify-between min-h-[140px]"
          >
            <h4 className="font-headline text-lg text-white font-black uppercase tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#9500FF]" />
              {t.afterpartyTitle}
            </h4>
            <p className="font-sans text-xs text-[#c7c9ac] leading-relaxed mt-2 flex-grow">
              {t.afterpartyDesc}
            </p>
          </div>

          {/* Mini Card: Full Roster (Navigate to activities view) */}
          <div 
            onClick={onNavigateToActivities}
            className="group bg-[#1F2833] p-6 border-t-2 border-[#333537] hover:border-[#E1FD15] cursor-pointer hover:bg-[#333537]/30 transition-all duration-300 text-left flex items-center justify-between min-h-[140px]"
          >
            <div>
              <h4 className="font-headline text-lg text-white font-black uppercase tracking-tight">
                {t.rosterTitle}
              </h4>
              <span className="font-mono text-xs text-[#c7c9ac] mt-1.5 block">
                {t.rosterDesc}
              </span>
            </div>
            <span className="p-2 bg-[#E1FD15]/10 group-hover:bg-[#E1FD15] rounded-none transition-all group-hover:translate-x-2">
              <ArrowRight className="w-5 h-5 text-[#E1FD15] group-hover:text-[#0B0C10] transition-colors" />
            </span>
          </div>

        </div>
      </section>

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
                      ? 'bg-[#E1FD15] border-[#E1FD15] text-[#0B0C10] font-black'
                      : 'bg-[#111415] border-[#464932] text-[#c7c9ac] hover:bg-[#1e2021]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
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
                      : 'bg-[#111415] border-[#464932] opacity-70 hover:opacity-100'
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
                filteredEvents.map((event, index) => {
                  
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
                      className={`bg-[#111415] p-5 border border-[#464932] border-l-4 ${themeColor} hover:border-[#9500FF]/50 transition-all duration-300 flex flex-col md:flex-row items-start justify-between gap-4 text-left group`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#E1FD15] font-semibold">{event.time}</span>
                          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border border-[#464932] ${typeTagColor}`}>
                            {event.type}
                          </span>
                        </div>
                        <h4 className="font-headline text-lg text-white font-black uppercase tracking-tight group-hover:text-[#E1FD15] transition-colors">
                          {event.title}
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
                        
                        <button
                          onClick={() => {
                            // Preselect corresponding activity if found, else default
                            const matchedActivity = activities.find(a => 
                              a.title.toLowerCase().includes(event.title.toLowerCase()) || 
                              event.title.toLowerCase().includes(a.title.toLowerCase())
                            );
                            onOpenRegister(matchedActivity?.id);
                          }}
                          className="font-mono text-[9px] font-bold text-[#E1FD15] border border-[#E1FD15]/30 hover:border-[#E1FD15] hover:bg-[#E1FD15]/10 px-2.5 py-1 uppercase tracking-wider cursor-pointer"
                        >
                          &gt; {t.vectorLabel}_LOCK
                        </button>
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
    </div>
  );
}
