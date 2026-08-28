import React from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ExternalLink,
  Lock,
  Gauge,
  CheckCircle2,
  Calendar,
  Zap,
  Layers,
  LayoutGrid,
  Table as TableIcon,
} from 'lucide-react';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  CONDUCT_RULES,
  SKATING_SKILL_LEVELS,
  SkatingSkillLevel,
} from '../faqData';

interface FaqConductViewProps {
  lang: 'EN' | 'FR' | 'ES';
  registerFormUrl?: string;
}

export default function FaqConductView({
  lang,
  registerFormUrl = 'https://forms.gle/7A9spHxz3Qm8VyEfA',
}: FaqConductViewProps) {
  const [activeTab, setActiveTab] = React.useState<'all' | 'faq' | 'levels' | 'conduct'>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedFaqId, setExpandedFaqId] = React.useState<string | null>('faq-what-is-mtl-roll');
  const [levelDisplayMode, setLevelDisplayMode] = React.useState<'cards' | 'table'>('cards');

  const t = {
    badge: lang === 'EN' ? 'MISSION PROTOCOLS' : lang === 'FR' ? 'PROTOCOLES DE MISSION' : 'PROTOCOLOS DE MISIÓN',
    mainTitle: lang === 'EN' ? 'FAQ & CODE OF CONDUCT' : lang === 'FR' ? 'FAQ & CODE DE CONDUITE' : 'FAQ Y CÓDIGO DE CONDUCTA',
    subtitle:
      lang === 'EN'
        ? 'Essential operational intelligence, skill level assessment, venue vectors, and core community principles for Montreal Roll 2026.'
        : lang === 'FR'
        ? 'Renseignements opérationnels essentiels, évaluation des niveaux, accès aux lieux et principes fondamentaux de la communauté pour Montréal Roll 2026.'
        : 'Información operativa esencial, evaluación de niveles de patinaje, ubicaciones y principios comunitarios de Montreal Roll 2026.',
    tabAll: lang === 'EN' ? 'All Intel' : lang === 'FR' ? 'Tout le dossier' : 'Todo el expediente',
    tabFaq: lang === 'EN' ? 'FAQ / Intel' : lang === 'FR' ? 'FAQ / Renseignements' : 'FAQ / Preguntas',
    tabLevels: lang === 'EN' ? 'Skating Levels' : lang === 'FR' ? 'Niveaux de patinage' : 'Niveles de patinaje',
    tabConduct: lang === 'EN' ? 'Code of Conduct' : lang === 'FR' ? 'Code de conduite' : 'Código de conducta',
    searchPlaceholder:
      lang === 'EN'
        ? 'Search questions, venues, rules, skill requirements (e.g. 15 km, powerslide)...'
        : lang === 'FR'
        ? 'Rechercher des questions, lieux, règles, prérequis (ex. 15 km, virage)...'
        : 'Buscar preguntas, lugares, reglas, requisitos de nivel (ej. 15 km, derrapes)...',
    faqSectionTitle: lang === 'EN' ? 'FREQUENTLY ASKED INTEL' : lang === 'FR' ? 'QUESTIONS FRÉQUENTES' : 'PREGUNTAS FRECUENTES',
    faqSectionSubtitle:
      lang === 'EN'
        ? 'Everything you need to know about disciplines, schedule access, registration, and gear.'
        : lang === 'FR'
        ? 'Tout ce que vous devez savoir sur les disciplines, l\'accès aux horaires, l\'inscription et l\'équipement.'
        : 'Todo lo que necesitas saber sobre disciplinas, horarios, registro y equipamiento.',
    levelsSectionTitle: lang === 'EN' ? 'SKATING SKILL LEVELS & REQUIREMENTS' : lang === 'FR' ? 'NIVEAUX DE PATINAGE & PRÉREQUIS' : 'NIVELES DE PATINAJE Y REQUISITOS',
    levelsSectionSubtitle:
      lang === 'EN'
        ? 'Gauge your skills accurately before hitting city convoys and workshops to ensure high velocity and safety for everyone.'
        : lang === 'FR'
        ? 'Évaluez votre niveau avec précision avant de rejoindre les convois urbains et ateliers pour garantir sécurité et fluidité pour tous.'
        : 'Evalúa tus habilidades con precisión antes de unirte a los convoys urbanos y talleres para garantizar la seguridad de todos.',
    conductSectionTitle: lang === 'EN' ? 'CODE OF CONDUCT & VALUES' : lang === 'FR' ? 'CODE DE CONDUITE & VALEURS' : 'CÓDIGO DE CONDUCTA Y VALORES',
    conductSectionSubtitle:
      lang === 'EN'
        ? 'Our pledge to ensure a secure, respectful, inclusive, and high-energy skating festival for all.'
        : lang === 'FR'
        ? 'Notre engagement pour garantir un festival de patinage sécuritaire, respectueux, inclusif et électrisant pour tous.'
        : 'Nuestro compromiso para garantizar un festival de patinaje seguro, respetuoso, inclusivo y lleno de energía.',
    openMap: lang === 'EN' ? 'Open GPS Coordinate' : lang === 'FR' ? 'Ouvrir les coordonnées GPS' : 'Abrir coordenadas GPS',
    needRegister: lang === 'EN' ? 'Event is free, but registration is mandatory.' : lang === 'FR' ? 'L\'événement est gratuit, mais l\'inscription est obligatoire.' : 'El evento es gratuito, pero el registro es obligatorio.',
    registerCta: lang === 'EN' ? 'Register Skater Pass' : lang === 'FR' ? 'Réserver mon laissez-passer' : 'Registrar mi pase',
    thLevel: lang === 'EN' ? 'Level' : lang === 'FR' ? 'Niveau' : 'Nivel',
    thRequirements: lang === 'EN' ? 'Requirements & Prerequisites' : lang === 'FR' ? 'Prérequis & Aptitudes' : 'Requisitos y Habilidades',
    thEvents: lang === 'EN' ? 'Accessible Events & Rides' : lang === 'FR' ? 'Événements & Randonnées accessibles' : 'Eventos y Rutas accesibles',
    paceBadge: lang === 'EN' ? 'Target Pace' : lang === 'FR' ? 'Allure cible' : 'Ritmo objetivo',
    toggleCards: lang === 'EN' ? 'Cards View' : lang === 'FR' ? 'Vue Cartes' : 'Vista Tarjetas',
    toggleTable: lang === 'EN' ? 'Matrix Table' : lang === 'FR' ? 'Tableau Matrice' : 'Tabla Matriz',
    noResults:
      lang === 'EN'
        ? 'No matching intel found. Try adjusting your query.'
        : lang === 'FR'
        ? 'Aucun renseignement trouvé. Essayez de modifier votre recherche.'
        : 'No se encontraron resultados. Intenta con otra búsqueda.',
  };

  // Filtered FAQ Items
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const qText = item.question[lang].toLowerCase();
    const aText = item.answer[lang].toLowerCase();
    const matchesSearch = !searchQuery || qText.includes(searchQuery.toLowerCase()) || aText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Skating Levels
  const filteredLevels = SKATING_SKILL_LEVELS.filter((lvl) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const nameMatch = lvl.name[lang].toLowerCase().includes(query);
    const reqMatch = lvl.requirements[lang].some((r) => r.toLowerCase().includes(query));
    const eventMatch = lvl.accessibleEvents[lang].some((e) => e.toLowerCase().includes(query));
    const paceMatch = lvl.pace ? lvl.pace[lang].toLowerCase().includes(query) : false;
    return nameMatch || reqMatch || eventMatch || paceMatch;
  });

  // Filtered Conduct Rules
  const filteredRules = CONDUCT_RULES.filter((rule) => {
    if (!searchQuery) return true;
    const titleText = rule.title[lang].toLowerCase();
    const descText = rule.description[lang].toLowerCase();
    const tagText = rule.tag[lang].toLowerCase();
    const query = searchQuery.toLowerCase();
    return titleText.includes(query) || descText.includes(query) || tagText.includes(query);
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-16" id="faq-conduct-page">
      {/* Header Banner */}
      <div className="mb-12 text-center md:text-left relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a0933]/70 border border-[#9500FF]/50 text-[#E1FD15] font-mono text-xs uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E1FD15]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
          {t.mainTitle}
        </h1>
        <p className="font-sans text-[#a0a0a0] text-sm md:text-base max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>

        {/* Navigation Switcher Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-3 border-b border-[#333537] pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 font-headline text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#E1FD15] text-[#0B0C10] font-bold shadow-[0_0_12px_rgba(225,253,21,0.5)]'
                : 'bg-[#111415] text-[#e2e2e4] border border-[#333537] hover:border-[#E1FD15]/50'
            }`}
          >
            {t.tabAll}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-2 font-headline text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'bg-[#9500FF] text-white font-bold shadow-[0_0_15px_rgba(149,0,255,0.6)]'
                : 'bg-[#111415] text-[#e2e2e4] border border-[#333537] hover:border-[#9500FF]/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t.tabFaq}</span>
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`px-5 py-2 font-headline text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'levels'
                ? 'bg-[#00D2FF] text-[#0B0C10] font-bold shadow-[0_0_15px_rgba(0,210,255,0.6)]'
                : 'bg-[#111415] text-[#e2e2e4] border border-[#333537] hover:border-[#00D2FF]/50'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>{t.tabLevels}</span>
          </button>
          <button
            onClick={() => setActiveTab('conduct')}
            className={`px-5 py-2 font-headline text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'conduct'
                ? 'bg-[#9500FF] text-white font-bold shadow-[0_0_15px_rgba(149,0,255,0.6)]'
                : 'bg-[#111415] text-[#e2e2e4] border border-[#333537] hover:border-[#9500FF]/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.tabConduct}</span>
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="mb-10 bg-[#111415] border border-[#333537] p-3 sm:p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-[#E1FD15] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="bg-transparent border-0 text-white font-sans text-sm md:text-base placeholder:text-[#666666] focus:outline-none w-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-mono text-[#a0a0a0] hover:text-white px-2 py-1 bg-[#1F2833] uppercase cursor-pointer"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* FAQ SECTION */}
      {(activeTab === 'all' || activeTab === 'faq') && (
        <section className="mb-16" id="faq-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-l-4 border-[#E1FD15] pl-4">
            <div>
              <div className="flex items-center gap-2 text-[#E1FD15] font-mono text-xs uppercase tracking-widest font-bold mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                {t.faqSectionTitle}
              </h2>
            </div>
            <p className="font-sans text-xs text-[#a0a0a0] max-w-md">
              {t.faqSectionSubtitle}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B0C10] border-2 border-[#E1FD15] text-[#E1FD15] font-bold shadow-[0_0_8px_rgba(225,253,21,0.4)]'
                      : 'bg-[#111415] border border-[#333537] text-[#a0a0a0] hover:text-white hover:border-[#666666]'
                  }`}
                >
                  {lang === 'EN' ? cat.labelEN : lang === 'FR' ? cat.labelFR : cat.labelES}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border transition-all duration-200 ${
                      isExpanded
                        ? 'bg-[#111415] border-[#E1FD15] shadow-[0_0_15px_rgba(225,253,21,0.15)]'
                        : 'bg-[#0E1012] border-[#22262B] hover:border-[#3A3F47]'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#E1FD15] font-bold mt-1 shrink-0">
                          [Q]
                        </span>
                        <h3 className="font-headline text-base sm:text-lg text-white font-bold leading-snug">
                          {faq.question[lang]}
                        </h3>
                      </div>
                      <div
                        className={`p-1.5 border shrink-0 transition-transform ${
                          isExpanded
                            ? 'border-[#E1FD15] text-[#E1FD15] bg-[#0B0C10]'
                            : 'border-[#333537] text-[#888888]'
                        }`}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-[#22262B] mt-2 animate-in fade-in duration-200">
                        {/* Highlights Tags */}
                        {faq.highlights && (
                          <div className="flex flex-wrap gap-2 my-3">
                            {faq.highlights[lang].map((h, i) => (
                              <span
                                key={i}
                                className="inline-block px-2.5 py-0.5 bg-[#0B0C10] border border-[#E1FD15]/40 text-[#E1FD15] font-mono text-[11px] uppercase tracking-wider"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Answer text */}
                        <div className="font-sans text-sm sm:text-base text-[#d0d0d4] leading-relaxed whitespace-pre-line">
                          {faq.answer[lang]}
                        </div>

                        {/* Map CTA Link if present */}
                        {faq.mapLink && (
                          <div className="mt-4 pt-3 border-t border-[#22262B] flex flex-wrap items-center gap-3">
                            <a
                              href={faq.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B0C10] border border-[#E1FD15] text-[#E1FD15] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E1FD15] hover:text-[#0B0C10] transition-all"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{t.openMap}</span>
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                            <span className="text-xs font-mono text-[#888888]">
                              Parc Willibrord / Métro Verdun
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#111415] border border-[#333537] text-[#a0a0a0] font-mono text-xs">
              {t.noResults}
            </div>
          )}
        </section>
      )}

      {/* SKATING SKILL LEVELS SECTION */}
      {(activeTab === 'all' || activeTab === 'levels') && (
        <section className="mb-16" id="levels-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-l-4 border-[#00D2FF] pl-4">
            <div>
              <div className="flex items-center gap-2 text-[#00D2FF] font-mono text-xs uppercase tracking-widest font-bold mb-1">
                <Gauge className="w-4 h-4 text-[#00D2FF]" />
                <span>SKATING LEVEL CLASSIFICATION</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                {t.levelsSectionTitle}
              </h2>
            </div>
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLevelDisplayMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                  levelDisplayMode === 'cards'
                    ? 'bg-[#00D2FF] text-[#0B0C10] font-bold border-[#00D2FF]'
                    : 'bg-[#111415] text-[#a0a0a0] border-[#333537] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.toggleCards}</span>
              </button>
              <button
                onClick={() => setLevelDisplayMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                  levelDisplayMode === 'table'
                    ? 'bg-[#00D2FF] text-[#0B0C10] font-bold border-[#00D2FF]'
                    : 'bg-[#111415] text-[#a0a0a0] border-[#333537] hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.toggleTable}</span>
              </button>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#a0a0a0] max-w-3xl mb-8 leading-relaxed">
            {t.levelsSectionSubtitle}
          </p>

          {/* Cards View */}
          {levelDisplayMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {filteredLevels.map((lvl) => (
                <div
                  key={lvl.id}
                  className={`bg-[#111415] border ${lvl.borderClass} p-6 flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${lvl.bgGlowClass}`}
                >
                  {/* Neon Color Indicator Top Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: lvl.colorCode }}
                  />

                  <div>
                    {/* Header: Dot + Level Name + Pace Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full shrink-0 shadow-lg border-2 border-white/20"
                          style={{
                            backgroundColor: lvl.colorCode,
                            boxShadow: `0 0 12px ${lvl.colorCode}`,
                          }}
                        />
                        <h3 className="font-headline text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                          {lvl.name[lang]}
                        </h3>
                      </div>

                      {lvl.pace && (
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0B0C10] border font-mono text-xs font-bold uppercase tracking-wider"
                          style={{
                            borderColor: `${lvl.colorCode}80`,
                            color: lvl.colorCode,
                          }}
                        >
                          <Zap className="w-3 h-3" />
                          <span>{lvl.pace[lang]}</span>
                        </div>
                      )}
                    </div>

                    {/* Requirements Block */}
                    <div className="mb-5 bg-[#0B0C10]/70 border border-[#22262B] p-4">
                      <div className="font-mono text-[11px] font-bold uppercase text-[#888888] tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: lvl.colorCode }} />
                        <span>{t.thRequirements}</span>
                      </div>
                      <ul className="space-y-2">
                        {lvl.requirements[lang].map((req, i) => (
                          <li
                            key={i}
                            className="font-sans text-xs sm:text-sm text-[#d4d4d8] leading-relaxed flex items-start gap-2"
                          >
                            <span
                              className="font-mono font-bold text-xs mt-0.5 shrink-0"
                              style={{ color: lvl.colorCode }}
                            >
                              •
                            </span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Accessible Events Section */}
                  <div className="pt-3 border-t border-[#22262B]">
                    <div className="font-mono text-[11px] font-bold uppercase text-[#888888] tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E1FD15]" />
                      <span>{t.thEvents}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lvl.accessibleEvents[lang].map((evt, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2.5 py-1 bg-[#0B0C10] border border-[#333537] text-white font-mono text-xs uppercase tracking-wide hover:border-[#E1FD15] transition-colors"
                        >
                          {evt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Matrix Table View */}
          {levelDisplayMode === 'table' && (
            <div className="overflow-x-auto bg-[#111415] border border-[#333537] shadow-xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#0B0C10] border-b-2 border-[#333537] font-headline text-xs uppercase tracking-widest text-[#E1FD15]">
                    <th className="p-4 sm:p-5 w-1/4">{t.thLevel}</th>
                    <th className="p-4 sm:p-5 w-1/2">{t.thRequirements}</th>
                    <th className="p-4 sm:p-5 w-1/4">{t.thEvents}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#22262B]">
                  {filteredLevels.map((lvl) => (
                    <tr
                      key={lvl.id}
                      className="hover:bg-[#161a1d] transition-colors duration-150"
                    >
                      {/* Level Column */}
                      <td className="p-4 sm:p-5 align-top">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-4 h-4 rounded-full shrink-0 shadow-md"
                            style={{
                              backgroundColor: lvl.colorCode,
                              boxShadow: `0 0 8px ${lvl.colorCode}`,
                            }}
                          />
                          <span className="font-headline text-base sm:text-lg font-black uppercase text-white">
                            {lvl.name[lang]}
                          </span>
                        </div>
                        {lvl.pace && (
                          <div
                            className="inline-block px-2 py-0.5 bg-[#0B0C10] border font-mono text-[10px] uppercase font-bold"
                            style={{
                              borderColor: `${lvl.colorCode}80`,
                              color: lvl.colorCode,
                            }}
                          >
                            {lvl.pace[lang]}
                          </div>
                        )}
                      </td>

                      {/* Requirements Column */}
                      <td className="p-4 sm:p-5 align-top">
                        <ul className="space-y-1.5">
                          {lvl.requirements[lang].map((req, i) => (
                            <li
                              key={i}
                              className="font-sans text-xs sm:text-sm text-[#d4d4d8] leading-relaxed flex items-start gap-2"
                            >
                              <span
                                className="font-mono font-bold text-xs mt-0.5 shrink-0"
                                style={{ color: lvl.colorCode }}
                              >
                                •
                              </span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Accessible Events Column */}
                      <td className="p-4 sm:p-5 align-top">
                        <div className="flex flex-col gap-1.5">
                          {lvl.accessibleEvents[lang].map((evt, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-1 bg-[#0B0C10] border border-[#262b30] text-[#e2e2e4] font-mono text-xs uppercase tracking-wide hover:border-[#E1FD15] transition-colors"
                            >
                              {evt}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredLevels.length === 0 && (
            <div className="p-8 text-center bg-[#111415] border border-[#333537] text-[#a0a0a0] font-mono text-xs">
              {t.noResults}
            </div>
          )}
        </section>
      )}

      {/* CODE OF CONDUCT SECTION */}
      {(activeTab === 'all' || activeTab === 'conduct') && (
        <section className="mb-16" id="conduct-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-l-4 border-[#9500FF] pl-4">
            <div>
              <div className="flex items-center gap-2 text-[#9500FF] font-mono text-xs uppercase tracking-widest font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>COMMUNITY STANDARDS & VALUES</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                {t.conductSectionTitle}
              </h2>
            </div>
            <p className="font-sans text-xs text-[#a0a0a0] max-w-md">
              {t.conductSectionSubtitle}
            </p>
          </div>

          {/* Conduct Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredRules.map((rule) => {
              const isZeroTolerance = rule.severity === 'zero_tolerance';
              const isSafety = rule.severity === 'safety';

              return (
                <div
                  key={rule.id}
                  className={`bg-[#111415] border p-6 flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                    isZeroTolerance
                      ? 'border-[#ff0055]/70 hover:border-[#ff0055] hover:shadow-[0_0_15px_rgba(255,0,85,0.2)]'
                      : isSafety
                      ? 'border-[#9500FF]/60 hover:border-[#9500FF] hover:shadow-[0_0_15px_rgba(149,0,255,0.2)]'
                      : 'border-[#333537] hover:border-[#E1FD15]/60'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      isZeroTolerance
                        ? 'bg-[#ff0055]'
                        : isSafety
                        ? 'bg-[#9500FF]'
                        : 'bg-[#E1FD15]'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-white/50">
                          {rule.number}
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border ${
                            isZeroTolerance
                              ? 'bg-[#ff0055]/10 border-[#ff0055] text-[#ff0055]'
                              : isSafety
                              ? 'bg-[#9500FF]/10 border-[#9500FF] text-[#9500FF]'
                              : 'bg-[#E1FD15]/10 border-[#E1FD15] text-[#E1FD15]'
                          }`}
                        >
                          {rule.tag[lang]}
                        </span>
                      </div>
                      {isZeroTolerance && (
                        <div className="flex items-center gap-1 text-[#ff0055] font-mono text-[10px] uppercase font-bold">
                          <Lock className="w-3 h-3" />
                          <span>ENFORCED</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-headline text-lg sm:text-xl font-bold text-white mb-3 tracking-wide">
                      {rule.title[lang]}
                    </h3>

                    <p className="font-sans text-sm text-[#c8c8cc] leading-relaxed">
                      {rule.description[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

