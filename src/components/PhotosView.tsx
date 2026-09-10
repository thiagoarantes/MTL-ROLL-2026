import React from 'react';
import {
  Camera,
  ExternalLink,
  Play,
  Calendar,
  Search,
  Filter,
  Film,
  Share2,
  Info,
  Clock,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Instagram,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTO_ALBUMS, VIDEO_HIGHLIGHTS } from '../data/photosData';
import { PhotoAlbum, VideoHighlight, LocalizedText } from '../types';

interface PhotosViewProps {
  lang: 'EN' | 'FR' | 'ES';
  initialYear?: 'all' | '2025' | '2024' | '2026';
  onYearChange?: (year: 'all' | '2025' | '2024' | '2026') => void;
}

export default function PhotosView({ lang, initialYear, onYearChange }: PhotosViewProps) {
  const [selectedYear, setSelectedYear] = React.useState<'all' | '2025' | '2024' | '2026'>(initialYear || 'all');
  const [selectedDay, setSelectedDay] = React.useState<'all' | 'friday' | 'saturday' | 'sunday'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeVideoModal, setActiveVideoModal] = React.useState<VideoHighlight | null>(null);

  React.useEffect(() => {
    if (initialYear && initialYear !== selectedYear) {
      setSelectedYear(initialYear);
    }
  }, [initialYear]);

  const getLocalized = (field: string | LocalizedText | undefined): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.EN || '';
  };

  // Translations
  const t = {
    badge: lang === 'EN' ? 'COMMUNITY VISUAL ARCHIVES' : lang === 'FR' ? 'ARCHIVES VISUELLES DE LA COMMUNAUTÉ' : 'ARCHIVOS VISUALES DE LA COMUNIDAD',
    titleMain: lang === 'EN' ? 'PHOTO ALBUMS' : lang === 'FR' ? 'ALBUMS PHOTOS' : 'ÁLBUMES DE FOTOS',
    titleSub: lang === 'EN' ? '& EVENT RECAPS' : lang === 'FR' ? '& RÉCAPITULATIFS' : 'Y RESÚMENES EN VÍDEO',
    subtitle:
      lang === 'EN'
        ? 'Relive the speed, energy, and community of Montreal Roll-O-Rama. Browse official Google Photo albums from past festival editions and stream full event recap films.'
        : lang === 'FR'
        ? 'Revivez la vitesse, l\'énergie et la communion de Montréal Roll-O-Rama. Parcourez les albums Google Photos officiels des éditions précédentes et visionnez les films récapitulatifs du festival.'
        : 'Revive la velocidad, la energía y la comunidad de Montreal Roll-O-Rama. Explora los álbumes oficiales de Google Photos de ediciones pasadas y mira las películas y resúmenes del festival.',
    
    // Filters
    filterYear: lang === 'EN' ? 'Edition' : lang === 'FR' ? 'Édition' : 'Edición',
    allYears: lang === 'EN' ? 'All Years' : lang === 'FR' ? 'Toutes les années' : 'Todos los años',
    year2025: '2025',
    year2024: '2024',
    year2026: lang === 'EN' ? '2026 (Upcoming)' : lang === 'FR' ? '2026 (À venir)' : '2026 (Próximo)',
    
    filterDay: lang === 'EN' ? 'Day' : lang === 'FR' ? 'Jour' : 'Día',
    allDays: lang === 'EN' ? 'All Days' : lang === 'FR' ? 'Tous les jours' : 'Todos los días',
    friday: lang === 'EN' ? 'Friday' : lang === 'FR' ? 'Vendredi' : 'Viernes',
    saturday: lang === 'EN' ? 'Saturday' : lang === 'FR' ? 'Samedi' : 'Sábado',
    sunday: lang === 'EN' ? 'Sunday' : lang === 'FR' ? 'Dimanche' : 'Domingo',
    
    searchPlaceholder:
      lang === 'EN'
        ? 'Search albums (e.g. Olympic, Mural, Disco, Workshop)...'
        : lang === 'FR'
        ? 'Rechercher un album (ex. Stade, Mural, Disco, Atelier)...'
        : 'Buscar álbumes (ej. Estadio, Mural, Disco, Taller)...',

    // Card buttons & labels
    openGooglePhotos: lang === 'EN' ? 'Open in Google Photos' : lang === 'FR' ? 'Ouvrir dans Google Photos' : 'Abrir en Google Photos',
    copyLink: lang === 'EN' ? 'Copy Link' : lang === 'FR' ? 'Copier le lien' : 'Copiar enlace',
    copied: lang === 'EN' ? 'Link Copied!' : lang === 'FR' ? 'Lien copié !' : '¡Copiado!',
    videoAvailable: lang === 'EN' ? 'Watch Clip' : lang === 'FR' ? 'Voir le clip' : 'Ver vídeo',
    googlePhotosLabel: lang === 'EN' ? 'Official Google Photos Album' : lang === 'FR' ? 'Album Google Photos officiel' : 'Álbum oficial de Google Photos',
    
    // Video section
    videosHeading: lang === 'EN' ? 'FESTIVAL FILMS & VIDEO HIGHLIGHTS' : lang === 'FR' ? 'FILMS ET RÉCAPS VIDÉO DU FESTIVAL' : 'PELÍCULAS Y VÍDEOS DEL FESTIVAL',
    videosSub:
      lang === 'EN'
        ? 'Watch full weekend recaps, freestyle sessions, and downtown street action captured by the community.'
        : lang === 'FR'
        ? 'Visionnez les résumés complets du week-end, les sessions freestyle et l\'action dans les rues de Montréal capturés par la communauté.'
        : 'Mira los resúmenes completos del fin de semana, sesiones de freestyle y la acción callejera grabada por la comunidad.',
    watchOnYouTube: lang === 'EN' ? 'Watch on YouTube' : lang === 'FR' ? 'Regarder sur YouTube' : 'Ver en YouTube',

    // 2026 Banner
    banner2026Title: lang === 'EN' ? 'MTL ROLL 2026 — Photo Drop Coming Soon!' : lang === 'FR' ? 'MTL ROLL 2026 — Albums photos bientôt en ligne !' : 'MTL ROLL 2026 — ¡Fotos muy pronto!',
    banner2026Desc:
      lang === 'EN'
        ? 'Official photo albums for the 2026 festival edition will be published right here after the weekend. Got photos or clips to contribute? Share them with the organizers and community!'
        : lang === 'FR'
        ? 'Les albums photos officiels de l\'édition 2026 seront mis en ligne ici dès la fin du week-end. Vous avez pris des photos ou des vidéos ? Partagez-les avec les organisateurs et la communauté !'
        : 'Los álbumes de fotos oficiales de la edición 2026 se publicarán aquí justo después del fin de semana. ¿Tomaste fotos o vídeos? ¡Compártelos con la organización y la comunidad!',
    joinWhatsApp: lang === 'EN' ? 'Join WhatsApp Group' : lang === 'FR' ? 'Rejoindre le WhatsApp' : 'Unirse al WhatsApp',
    followInstagram: lang === 'EN' ? 'Instagram @montrealroll' : lang === 'FR' ? 'Instagram @montrealroll' : 'Instagram @montrealroll',

    // Stats
    totalAlbums: lang === 'EN' ? 'Albums Available' : lang === 'FR' ? 'Albums disponibles' : 'Álbumes disponibles',
    noResultsTitle: lang === 'EN' ? 'No albums match your filter' : lang === 'FR' ? 'Aucun album ne correspond au filtre' : 'Ningún álbum coincide con el filtro',
    noResultsDesc: lang === 'EN' ? 'Try adjusting your search query or selecting a different year.' : lang === 'FR' ? 'Essayez d\'ajuster vos critères ou sélectionnez une autre année.' : 'Prueba a ajustar la búsqueda o elige otro año.',
    clearFilters: lang === 'EN' ? 'Reset Filters' : lang === 'FR' ? 'Réinitialiser les filtres' : 'Restablecer filtros',
  };

  // Filtered albums
  const filteredAlbums = PHOTO_ALBUMS.filter((album) => {
    // Year filter
    if (selectedYear !== 'all') {
      if (selectedYear === '2026') return false; // 2026 handled via special banner
      if (album.year.toString() !== selectedYear) return false;
    }

    // Day filter
    if (selectedDay !== 'all' && album.day !== selectedDay) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = getLocalized(album.title).toLowerCase();
      const desc = getLocalized(album.description).toLowerCase();
      const badge = getLocalized(album.badge).toLowerCase();
      const edition = album.edition.toLowerCase();
      const day = album.day.toLowerCase();

      return (
        title.includes(q) ||
        desc.includes(q) ||
        badge.includes(q) ||
        edition.includes(q) ||
        day.includes(q)
      );
    }

    return true;
  });

  return (
    <div className="pt-28 md:pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Top Header Hero */}
      <div className="mb-10 text-center md:text-left border-b border-[#9500FF]/30 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a0933] border border-[#9500FF]/50 text-[#E1FD15] text-xs font-mono uppercase tracking-widest mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        
        <h1 className="font-headline text-3xl md:text-5xl uppercase tracking-tighter text-white font-extrabold drop-shadow-[0_0_12px_rgba(225,253,21,0.3)]">
          <span className="text-[#E1FD15]">{t.titleMain}</span>{' '}
          <span className="text-white">{t.titleSub}</span>
        </h1>
        
        <p className="mt-3 text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed font-sans">
          {t.subtitle}
        </p>

        {/* Quick highlight stat tags */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center md:justify-start font-mono text-xs">
          <div className="bg-[#111415] border border-[#9500FF]/40 px-3 py-1.5 flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-[#E1FD15] animate-pulse" />
            <span className="text-[#E1FD15] font-bold">{PHOTO_ALBUMS.length}</span>
            <span className="text-gray-400">{t.totalAlbums}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 space-y-4 bg-[#111415]/90 border border-[#9500FF]/40 p-4 md:p-5 backdrop-blur-md">
        
        {/* Row 1: Edition (Year) Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E1FD15]" />
            <span className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider">
              {t.filterYear}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: t.allYears },
                  { id: '2025', label: t.year2025 },
                  { id: '2024', label: t.year2024 },
                  { id: '2026', label: t.year2026 },
                ] as const
              ).map((yearOpt) => {
                const isActive = selectedYear === yearOpt.id;
                return (
                  <button
                    key={yearOpt.id}
                    onClick={() => {
                      setSelectedYear(yearOpt.id);
                      onYearChange?.(yearOpt.id);
                    }}
                    className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E1FD15] text-[#0B0C10] font-black shadow-[0_0_10px_rgba(225,253,21,0.5)]'
                        : 'bg-[#181a1f] text-gray-300 hover:text-white hover:bg-[#9500FF]/20 border border-[#9500FF]/20'
                    }`}
                  >
                    {yearOpt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#0c0e10] border border-[#9500FF]/40 text-white pl-9 pr-3 py-1.5 text-xs font-sans placeholder-gray-500 focus:outline-none focus:border-[#E1FD15] focus:ring-1 focus:ring-[#E1FD15] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Day Filter Tabs (hidden when 2026 selected) */}
        {selectedYear !== '2026' && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#9500FF]/20">
            <Filter className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider">
              {t.filterDay}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: t.allDays },
                  { id: 'friday', label: t.friday },
                  { id: 'saturday', label: t.saturday },
                  { id: 'sunday', label: t.sunday },
                ] as const
              ).map((dayOpt) => {
                const isActive = selectedDay === dayOpt.id;
                return (
                  <button
                    key={dayOpt.id}
                    onClick={() => setSelectedDay(dayOpt.id)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#9500FF] text-white font-bold shadow-[0_0_8px_rgba(149,0,255,0.6)]'
                        : 'bg-[#181a1f] text-gray-400 hover:text-white hover:bg-[#9500FF]/20'
                    }`}
                  >
                    {dayOpt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2026 Edition Callout Banner (shown when 2026 is selected or at the top of 'all') */}
      {(selectedYear === 'all' || selectedYear === '2026') && (
        <div className="mb-10 bg-gradient-to-r from-[#1a0933] to-[#111415] border-2 border-[#E1FD15]/60 p-6 shadow-[0_0_20px_rgba(225,253,21,0.15)] relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#E1FD15]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#E1FD15]/20 text-[#E1FD15] text-[11px] font-mono uppercase font-bold tracking-wider">
                <Clock className="w-3 h-3" />
                <span>SEPTEMBER 11-13, 2026</span>
              </div>
              <h3 className="font-headline text-xl md:text-2xl text-white font-bold uppercase tracking-tight">
                {t.banner2026Title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                {t.banner2026Desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 font-headline text-xs uppercase tracking-wider font-bold">
              <a
                href="https://chat.whatsapp.com/JyyW0HZxQsQDYbLdTaBG4p"
                target="_blank"
                rel="noreferrer"
                className="bg-[#E1FD15] text-[#0B0C10] hover:bg-[#E1FD15]/90 px-4 py-2.5 flex items-center gap-2 shadow-[0_0_12px_rgba(225,253,21,0.4)] transition-all scale-95 active:scale-90"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.joinWhatsApp}</span>
              </a>

              <a
                href="https://www.instagram.com/montrealroll/"
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[#9500FF] bg-[#111415] text-white hover:bg-[#9500FF]/30 px-4 py-2.5 flex items-center gap-2 transition-all scale-95 active:scale-90"
              >
                <Instagram className="w-4 h-4 text-[#E1FD15]" />
                <span>{t.followInstagram}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Albums Grid */}
      {selectedYear !== '2026' && (
        <>
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlbums.map((album) => {
                const title = getLocalized(album.title);
                const desc = getLocalized(album.description);
                const dayStr = getLocalized(album.dayLabel);

                return (
                  <div
                    key={album.id}
                    className="group bg-[#111415] border border-[#9500FF]/40 hover:border-[#E1FD15] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(149,0,255,0.3)]"
                  >
                    {/* Cover Thumbnail Image with overlay */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#0c0e10]">
                      <img
                        src={album.coverImage}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111415] via-transparent to-black/60" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-black/80 border border-[#E1FD15]/60 text-[#E1FD15] font-mono text-[10px] uppercase tracking-wider font-bold">
                          {album.year} • {dayStr}
                        </span>
                      </div>

                      {/* Google Photos Watermark Pill */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono border border-white/10">
                        {/* Google Photos 4-color Pinwheel Icon */}
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
                          <circle cx="12" cy="12" r="9" fill="none" stroke="#E1FD15" strokeWidth="1.5" />
                        </svg>
                        <span className="truncate">{album.edition}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-headline text-lg font-bold uppercase text-white tracking-wide group-hover:text-[#E1FD15] transition-colors leading-snug">
                          {title}
                        </h3>
                        <p className="mt-2 text-xs text-gray-300 font-sans leading-relaxed line-clamp-3">
                          {desc}
                        </p>
                      </div>

                      {/* Actions Footer */}
                      <div className="mt-5 pt-4 border-t border-[#9500FF]/20 space-y-2">
                        {/* Main Google Photos Link Button */}
                        <a
                          href={album.albumUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#E1FD15] hover:bg-[#E1FD15]/90 text-[#0B0C10] py-2.5 px-3 font-headline text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(225,253,21,0.2)] hover:shadow-[0_0_15px_rgba(225,253,21,0.5)] scale-95 active:scale-90"
                        >
                          <span>{t.openGooglePhotos}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {album.videoUrl && (
                          <a
                            href={album.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 px-3 bg-[#1a0933] hover:bg-[#9500FF]/40 border border-[#9500FF]/50 text-[#E1FD15] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{t.videoAvailable}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#111415] border border-[#9500FF]/30 p-12 text-center max-w-lg mx-auto">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-headline text-lg text-white font-bold uppercase tracking-wider mb-2">
                {t.noResultsTitle}
              </h3>
              <p className="text-xs text-gray-400 font-sans mb-5">
                {t.noResultsDesc}
              </p>
              <button
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedDay('all');
                  setSearchQuery('');
                }}
                className="bg-[#E1FD15] text-[#0B0C10] px-4 py-2 font-headline text-xs uppercase tracking-wider font-bold cursor-pointer"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </>
      )}

      {/* Official Video Recaps & Highlight Reels */}
      <div className="mt-16 pt-12 border-t-2 border-[#9500FF]/40">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a0933] border border-[#9500FF]/50 text-[#00D2FF] text-xs font-mono uppercase tracking-widest mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>COMMUNITY CINEMA</span>
          </div>
          <h2 className="font-headline text-2xl md:text-3xl uppercase tracking-tight text-white font-bold">
            {t.videosHeading}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-sans mt-1 max-w-2xl">
            {t.videosSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VIDEO_HIGHLIGHTS.map((video) => {
            const title = getLocalized(video.title);
            const desc = getLocalized(video.description);

            return (
              <div
                key={video.id}
                className="bg-[#111415] border border-[#9500FF]/40 p-4 md:p-5 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Responsive 16:9 YouTube Embed */}
                  <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black border border-[#9500FF]/30 mb-4">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#E1FD15] text-[#0B0C10] font-mono text-[10px] font-bold uppercase">
                      {video.year}
                    </span>
                    <span className="text-[#00D2FF] text-[10px] font-mono uppercase tracking-wider">
                      Official Reel
                    </span>
                  </div>

                  <h3 className="font-headline text-base md:text-lg text-white font-bold uppercase tracking-tight mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#9500FF]/20 flex items-center justify-between">
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-headline uppercase font-bold text-[#E1FD15] hover:underline"
                  >
                    <span>{t.watchOnYouTube}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
