import React from 'react';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Compass,
  Train,
  ShieldAlert,
  Bike,
  Sparkles,
  Layers,
  Info,
  Clock,
  ArrowUpRight,
  Droplet,
} from 'lucide-react';

interface SitesMapViewProps {
  lang: 'EN' | 'FR' | 'ES';
  registerFormUrl?: string;
  initialMapId?: string;
  onMapChange?: (mapId: string) => void;
}

interface SiteSpot {
  id: string;
  category: 'hub' | 'circuit' | 'rally' | 'scenic';
  name: {
    EN: string;
    FR: string;
    ES: string;
  };
  badge: {
    EN: string;
    FR: string;
    ES: string;
  };
  address: string;
  metroAccess: {
    EN: string;
    FR: string;
    ES: string;
  };
  description: {
    EN: string;
    FR: string;
    ES: string;
  };
  activities: {
    EN: string[];
    FR: string[];
    ES: string[];
  };
  googleMapsQuery: string;
}

const FESTIVAL_SPOTS: SiteSpot[] = [
  {
    id: 'willibrord-rink',
    category: 'hub',
    name: {
      EN: 'Willibrord Park BBB Rink (HQ Hub)',
      FR: 'Patinoire BBB du parc Willibrord (QG Principal)',
      ES: 'Pista BBB del Parque Willibrord (Sede Central)',
    },
    badge: {
      EN: 'MAIN FESTIVAL HQ',
      FR: 'QG PRINCIPAL DU FESTIVAL',
      ES: 'SEDE PRINCIPAL',
    },
    address: '800 Rue Willibrord, Verdun, QC H4G 2T9',
    metroAccess: {
      EN: 'Metro De L\'Église (Green Line) or Metro Verdun (5 min walk / 2 min roll)',
      FR: 'Métro De L\'Église (Ligne Verte) ou Métro Verdun (5 min à pied / 2 min en patins)',
      ES: 'Metro De L\'Église (Línea Verde) o Metro Verdun (5 min a pie / 2 min rodando)',
    },
    description: {
      EN: 'The central gathering heart of MTL ROLL 2026. Ultra-smooth covered concrete outdoor rink, sound system, guest demos, and workshop zones.',
      FR: 'Le cœur névralgique de MTL ROLL 2026. Patinoire extérieure couverte en béton ultra-lisse avec sonorisation, ateliers, démonstrations et zone détente.',
      ES: 'El corazón de MTL ROLL 2026. Pista exterior cubierta de concreto pulido con sistema de sonido, talleres, exhibiciones y zona de descanso.',
    },
    activities: {
      EN: ['Slalom & Wizard Workshops', 'Open Skate & Music', 'High Jump & Limbo Challenge', 'Skate Games & Relay'],
      FR: ['Ateliers Slalom & Wizard', 'Patinage libre & Musique', 'Saut en hauteur & Limbo', 'Jeux collectifs & Défis'],
      ES: ['Talleres de Slalom y Wizard', 'Patinaje Libre con Música', 'Salto de Altura y Limbo', 'Juegos y Retos Grupales'],
    },
    googleMapsQuery: 'Patinoire+Bleu+Blanc+Bouge+Parc+Willibrord+Verdun',
  },
  {
    id: 'gilles-villeneuve',
    category: 'circuit',
    name: {
      EN: 'Circuit Gilles-Villeneuve (F1 Track)',
      FR: 'Circuit Gilles-Villeneuve (Piste de F1)',
      ES: 'Circuito Gilles Villeneuve (Pista de F1)',
    },
    badge: {
      EN: 'HIGH VELOCITY SECTOR',
      FR: 'SECTEUR HAUTE VITESSE',
      ES: 'SECTOR ALTA VELOCIDAD',
    },
    address: 'Parc Jean-Drapeau, Île Notre-Dame, Montréal, QC',
    metroAccess: {
      EN: 'Metro Jean-Drapeau (Yellow Line) or via the Champlain Ice Control Structure (Estacade) bike path',
      FR: 'Métro Jean-Drapeau (Ligne Jaune) ou via la piste cyclable de l\'Estacade du pont Champlain',
      ES: 'Metro Jean-Drapeau (Línea Amarilla) o por la ciclovía del dique del puente Champlain',
    },
    description: {
      EN: '4.36 kilometers of mirror-smooth Formula 1 tarmac. Wide curves, iconic straightaways, and the ultimate venue for inline speed skating mechanics.',
      FR: '4,36 kilomètres d\'asphalte de Formule 1 d\'une fluidité exceptionnelle. Courbes larges, lignes droites mythiques et cadre idéal pour le patin de vitesse.',
      ES: '4.36 kilómetros de asfalto de Fórmula 1 impecable. Curvas amplias, rectas míticas y el escenario perfecto para el patinaje de velocidad.',
    },
    activities: {
      EN: ['"I Am Speed!" VRL Workshop', 'Peloton Drafting Drills', 'Sprint Checkpoints', 'Urban Convoys Arrival'],
      FR: ['Atelier "Je suis la vitesse !" (Club VRL)', 'Entraînement en peloton', 'Points de vitesse', 'Arrivée de la randonnée urbaine'],
      ES: ['Taller "¡Soy la Velocidad!" (Club VRL)', 'Técnicas de Pelotón', 'Pruebas de Velocidad', 'Llegada de la ruta urbana'],
    },
    googleMapsQuery: 'Circuit+Gilles+Villeneuve+Montreal',
  },
  {
    id: 'parc-souvenir',
    category: 'rally',
    name: {
      EN: 'Parc du Souvenir (Verdun Metro)',
      FR: 'Parc du Souvenir (Métro Verdun)',
      ES: 'Parc du Souvenir (Metro Verdun)',
    },
    badge: {
      EN: 'RIDE CONVOY DEPARTURE POINT',
      FR: 'POINT DE DÉPART DES CONVOIS',
      ES: 'PUNTO DE SALIDA DE RUTAS',
    },
    address: '4501 Rue de Verdun, Verdun, QC H4G 1L9',
    metroAccess: {
      EN: 'Directly outside Verdun Metro Station (Green Line)',
      FR: 'Directement à la sortie de la station Métro Verdun (Ligne Verte)',
      ES: 'Directamente en la salida de la estación de Metro Verdun (Línea Verde)',
    },
    description: {
      EN: 'The primary urban muster station. Wide pedestrian staging grounds directly above the metro, with easy rolling access to Verdun avenues.',
      FR: 'La station de ralliement principale pour les randonnées urbaines. Grande esplanade piétonne à la sortie du métro pour équiper ses patins.',
      ES: 'Punto de reunión principal para las rutas urbanas. Amplia explanada peatonal justo al salir del metro para colocarse los patines.',
    },
    activities: {
      EN: ['10km Sunday Morning Street Ride Launch', 'Safety Briefing & Group Marshaling', 'Return Convoy Finish Line'],
      FR: ['Départ Randonnée 10 km Dimanche', 'Consignes de sécurité & Encadrement', 'Point d\'arrivée du convoi retour'],
      ES: ['Salida de la Ruta Urbana de 10 km', 'Briefing de Seguridad y Grupos', 'Punto de llegada de la ruta de regreso'],
    },
    googleMapsQuery: 'Parc+du+Souvenir+Verdun+Montreal',
  },
  {
    id: 'lachine-canal',
    category: 'scenic',
    name: {
      EN: 'Lachine Canal & Waterfront Paths',
      FR: 'Canal de Lachine & Berges du Fleuve',
      ES: 'Canal de Lachine y Riberas del Río',
    },
    badge: {
      EN: 'SCENIC CRUISE CORRIDOR',
      FR: 'CORRIDOR PANORAMIQUE',
      ES: 'CORREDOR PANORÁMICO',
    },
    address: 'Canal de Lachine National Historic Site, Montréal, QC',
    metroAccess: {
      EN: 'Accessible from Verdun, Charlevoix, or Lionel-Groulx Metro Stations',
      FR: 'Accessible depuis les métros Verdun, Charlevoix ou Lionel-Groulx',
      ES: 'Accesible desde las estaciones de metro Verdun, Charlevoix o Lionel-Groulx',
    },
    description: {
      EN: 'Paved, car-free multi-use paved trails along historic locks and scenic waterfronts. Used for daytime scenic rolls and return routes.',
      FR: 'Pistes cyclables asphaltées et sécurisées longeant les écluses historiques et les cours d\'eau. Idéal pour les traversées fluides et sans circulation automobile.',
      ES: 'Pistas pavimentadas sin tráfico vehicular a lo largo de las históricas esclusas y riberas. Ideal para rodadas fluidas y seguras.',
    },
    activities: {
      EN: ['Sunday Return 10km Ride Route', 'Scenic Waterfront Cruising', 'Smooth Asphalt Transit'],
      FR: ['Itinéraire de la randonnée de retour 10 km', 'Balade fluide au bord de l\'eau', 'Transit en asphalte régulier'],
      ES: ['Recorrido de regreso de 10 km', 'Paseo panorámico junto al agua', 'Tránsito en asfalto suave'],
    },
    googleMapsQuery: 'Canal+de+Lachine+Montreal',
  },
];

interface MapRoute {
  id: string;
  mid: string;
  title: {
    EN: string;
    FR: string;
    ES: string;
  };
  subtitle: {
    EN: string;
    FR: string;
    ES: string;
  };
  day: {
    EN: string;
    FR: string;
    ES: string;
  };
  distance: string;
  color: string;
}

const FESTIVAL_MAPS: MapRoute[] = [
  {
    id: 'friday-28k',
    mid: '195J_iaVcyqgElSFW2bT_Zl_BxUe_zgA',
    title: {
      EN: 'Friday 28K Ride',
      FR: 'Randonnée 28 km du Vendredi',
      ES: 'Ruta 28 km del Viernes',
    },
    subtitle: {
      EN: 'Verdun • Waterfront • Long Distance Cruise',
      FR: 'Verdun • Berges du Fleuve • Rando Longue Distance',
      ES: 'Verdun • Ribera del Río • Gran Recorrido',
    },
    day: {
      EN: 'Friday Daytime',
      FR: 'Vendredi Jour',
      ES: 'Viernes Día',
    },
    distance: '28 km',
    color: '#00D2FF',
  },
  {
    id: 'friday-night',
    mid: '1hORy8dbCwDiXlVk1hRMyR3-v-3M568g',
    title: {
      EN: 'Friday Night Ride',
      FR: 'Randonnée Nocturne du Vendredi',
      ES: 'Ruta Nocturna del Viernes',
    },
    subtitle: {
      EN: 'Light Up The 514 • Downtown • Illuminated Convoy',
      FR: 'Illumine le 514 • Centre-Ville • Convoi Lumineux',
      ES: 'Ilumina el 514 • Centro • Caravana Iluminada',
    },
    day: {
      EN: 'Friday Night',
      FR: 'Vendredi Soir',
      ES: 'Viernes Noche',
    },
    distance: 'Night Ride',
    color: '#9500FF',
  },
  {
    id: 'saturday-3k',
    mid: '1KkyOTdQCRmnVpVQRUcXNLguqdXK4FPQ',
    title: {
      EN: 'Saturday 3K Circuit',
      FR: 'Circuit 3 km du Samedi',
      ES: 'Circuito 3 km del Sábado',
    },
    subtitle: {
      EN: 'HQ Hub • Willibrord • Accessible Loop',
      FR: 'QG Principal • Willibrord • Boucle Accessible',
      ES: 'Sede Central • Willibrord • Circuito Accesible',
    },
    day: {
      EN: 'Saturday',
      FR: 'Samedi',
      ES: 'Sábado',
    },
    distance: '3 km',
    color: '#E1FD15',
  },
  {
    id: 'sunday-20k',
    mid: '1S9HYfYfLQ1ErHN-U0YzhGcmMGMQ7dOQ',
    title: {
      EN: 'Sunday 20K Ride',
      FR: 'Randonnée 20 km du Dimanche',
      ES: 'Ruta 20 km del Domingo',
    },
    subtitle: {
      EN: 'Lachine Canal • Waterfront • Closing Cruise',
      FR: 'Canal de Lachine • Pistes Cyclables • Rando de Clôture',
      ES: 'Canal Lachine • Ciclovías • Rodada de Cierre',
    },
    day: {
      EN: 'Sunday',
      FR: 'Dimanche',
      ES: 'Domingo',
    },
    distance: '20 km',
    color: '#FF6B00',
  },
];

export default function SitesMapView({ lang, initialMapId, onMapChange }: SitesMapViewProps) {
  const [activeMapId, setActiveMapId] = React.useState<string>(initialMapId || 'friday-28k');
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);

  React.useEffect(() => {
    if (initialMapId && initialMapId !== activeMapId) {
      const exists = FESTIVAL_MAPS.some((m) => m.id === initialMapId);
      if (exists) {
        setIsMapLoaded(false);
        setActiveMapId(initialMapId);
      }
    }
  }, [initialMapId]);

  const currentMap = FESTIVAL_MAPS.find((m) => m.id === activeMapId) || FESTIVAL_MAPS[0];
  const GOOGLE_MY_MAPS_EMBED_URL = `https://www.google.com/maps/d/embed?mid=${currentMap.mid}&ll=45.476294%2C-73.586692&z=12`;
  const GOOGLE_MY_MAPS_VIEWER_URL = `https://www.google.com/maps/d/u/0/viewer?mid=${currentMap.mid}`;

  const t = {
    badge: lang === 'EN' ? 'TACTICAL GEODATA' : lang === 'FR' ? 'CARTOGRAPHIE TACTIQUE' : 'GEODATOS TÁCTICOS',
    title: lang === 'EN' ? 'FESTIVAL SITES & ROUTES MAP' : lang === 'FR' ? 'PLAN DES SITES & ITINÉRAIRES' : 'PLAN DE LOS SITIOS Y RUTAS',
    subtitle:
      lang === 'EN'
        ? 'Official route corridors and key festival spots across Montreal.'
        : lang === 'FR'
        ? 'Itinéraires officiels et points clés du festival à Montréal.'
        : 'Rutas oficiales y puntos clave del festival en Montreal.',
    selectRoute: lang === 'EN' ? 'SELECT ROUTE MAP' : lang === 'FR' ? 'SÉLECTIONNER UN ITINÉRAIRE' : 'SELECCIONAR RUTA',
    openExternal:
      lang === 'EN' ? 'Open in Google Maps' : lang === 'FR' ? 'Ouvrir dans Google Maps' : 'Abrir en Google Maps',
    keyLocationsHeading: lang === 'EN' ? 'FESTIVAL WAYPOINTS & ACCESS' : lang === 'FR' ? 'POINTS DE REPÈRE & ACCÈS' : 'PUNTOS CLAVE Y ACCESOS',
    metroLabel: lang === 'EN' ? 'Transit / Metro' : lang === 'FR' ? 'Accès Métro / STM' : 'Acceso Metro / STM',
    activitiesLabel: lang === 'EN' ? 'Featured Events' : lang === 'FR' ? 'Activités sur place' : 'Actividades en el sitio',
    directionsBtn: lang === 'EN' ? 'Get Directions' : lang === 'FR' ? 'Itinéraire GPS' : 'Cómo llegar',
    tipsHeading: lang === 'EN' ? 'SKATER LOGISTICS & TRANSIT TIPS' : lang === 'FR' ? 'LOGISTIQUE & CONSEILS DE DÉPLACEMENT' : 'LOGÍSTICA Y CONSEJOS DE TRANSPORTE',
    tip1Title: lang === 'EN' ? 'STM Metro Access with Skates' : lang === 'FR' ? 'Accès au métro STM avec patins' : 'Acceso al Metro STM con patines',
    tip1Desc:
      lang === 'EN'
        ? 'Carrying skates on STM trains and buses is fully allowed. For your safety, walk in shoes inside metro stations and change into skates outside at the plaza.'
        : lang === 'FR'
        ? 'Le transport de patins est autorisé dans le métro et les autobus STM. Pour votre sécurité, marchez avec des chaussures dans les stations et chaussez vos patins à l\'extérieur.'
        : 'Se permite llevar patines en el metro y autobuses STM. Por seguridad, usa calzado dentro de las estaciones y ponte los patines al salir.',
    tip2Title: lang === 'EN' ? 'Water & Amenities' : lang === 'FR' ? 'Points d\'eau & Commodités' : 'Agua y Servicios',
    tip2Desc:
      lang === 'EN'
        ? 'Water bottle refilling fountains and public washrooms are available directly at Willibrord Park chalet and along the Lachine Canal rest stops.'
        : lang === 'FR'
        ? 'Des fontaines d\'eau potable et des toilettes publiques sont accessibles au chalet du parc Willibrord ainsi que le long des berges et du canal de Lachine.'
        : 'Hay fuentes de agua potable y baños públicos disponibles en el chalet del parque Willibrord y en los puntos de descanso del Canal Lachine.',
    tip3Title: lang === 'EN' ? 'Pavement & Gear Checklist' : lang === 'FR' ? 'État des sols & Équipement' : 'Estado del Suelo y Equipo',
    tip3Desc:
      lang === 'EN'
        ? 'Willibrord Rink has ultra-smooth polished concrete (ideal for 84A–88A wheels). Street rides feature mixed asphalt with some tactile paving; wrist guards and headlights are recommended for night convoys.'
        : lang === 'FR'
        ? 'La patinoire Willibrord offre un béton poli ultra-lisse (idéal pour roues 84A–88A). Les randonnées urbaines empruntent de l\'asphalte varié; protège-poignets et lampes sont fortement conseillés pour la nuit.'
        : 'La pista Willibrord tiene concreto pulido muy suave (ideal para ruedas 84A–88A). Las rutas urbanas combinan varios asfaltos; se recomiendan muñequeras y luces para la noche.',
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9500FF]/10 border border-[#9500FF]/40 text-[#E1FD15] font-mono text-xs uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-[#E1FD15] animate-pulse" />
          <span>{t.badge}</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl uppercase font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(225,253,21,0.3)]">
          <span className="text-[#E1FD15]">{t.title.split('&')[0]}</span>
          {t.title.includes('&') && (
            <>
              {' '}&{' '}
              <span className="text-[#9500FF]">{t.title.split('&')[1]}</span>
            </>
          )}
        </h1>

        <p className="text-[#a0a5ad] font-sans text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Route Map Selector Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E1FD15] font-bold flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5" />
            {t.selectRoute}
          </span>
          <a
            href={GOOGLE_MY_MAPS_VIEWER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#a0a5ad] hover:text-[#E1FD15] flex items-center gap-1 transition-colors"
          >
            <span>{currentMap.title[lang]}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FESTIVAL_MAPS.map((mapItem) => {
            const isSelected = activeMapId === mapItem.id;
            return (
              <button
                key={mapItem.id}
                onClick={() => {
                  if (activeMapId !== mapItem.id) {
                    setIsMapLoaded(false);
                    setActiveMapId(mapItem.id);
                    onMapChange?.(mapItem.id);
                  }
                }}
                className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#1a1c22] border-[#E1FD15] shadow-[0_0_15px_rgba(225,253,21,0.25)]'
                    : 'bg-[#111415] border-[#272a2e] hover:border-[#9500FF]/70 hover:bg-[#15171b]'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: mapItem.color }}
                  />
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#a0a5ad]">
                    {mapItem.day[lang]}
                  </span>
                  <span
                    className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded-xs"
                    style={{
                      backgroundColor: `${mapItem.color}20`,
                      color: mapItem.color,
                      border: `1px solid ${mapItem.color}60`,
                    }}
                  >
                    {mapItem.distance}
                  </span>
                </div>

                <div>
                  <div
                    className={`font-headline text-sm font-bold uppercase tracking-wide leading-tight ${
                      isSelected ? 'text-[#E1FD15]' : 'text-white'
                    }`}
                  >
                    {mapItem.title[lang]}
                  </div>
                  <div className="font-sans text-[11px] text-[#787f8a] truncate mt-1">
                    {mapItem.subtitle[lang]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Google My Maps Frame */}
      <section
        aria-label={t.title}
        className="w-full"
      >
        <div className="border-2 border-[#9500FF]/60 bg-[#111415] shadow-[0_0_25px_rgba(149,0,255,0.25)] relative overflow-hidden flex flex-col">
          
          {/* Tactical Bar Header */}
          <div className="bg-[#17191d] px-4 py-2.5 border-b border-[#272a2e] flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#E1FD15] truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E1FD15] animate-ping shrink-0" />
              <span className="font-bold tracking-wider uppercase truncate">
                GOOGLE MY MAPS // {currentMap.title[lang].toUpperCase()} ({currentMap.distance})
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={GOOGLE_MY_MAPS_VIEWER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E1FD15] hover:underline flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]"
              >
                <span>{t.openExternal}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* IFrame Container with Fallback/Loading UI */}
          <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-[#111415]">
            {!isMapLoaded && (
              <div className="absolute inset-0 bg-[#111415] flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-10 h-10 border-2 border-[#E1FD15] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-mono text-xs text-[#E1FD15] uppercase tracking-widest">
                  Loading {currentMap.title[lang]} Data...
                </p>
              </div>
            )}

            <iframe
              key={currentMap.id}
              src={GOOGLE_MY_MAPS_EMBED_URL}
              title={`MTL ROLL 2026 - ${currentMap.title[lang]}`}
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsMapLoaded(true)}
            />
          </div>

          {/* Tactical Bottom Status Bar */}
          <div className="bg-[#111415] px-4 py-2.5 border-t border-[#272a2e] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#888888]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#9500FF]" />
              <span>{currentMap.subtitle[lang]}</span>
            </div>
            <a
              href={GOOGLE_MY_MAPS_VIEWER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1FD15] hover:underline flex items-center gap-1 font-bold uppercase tracking-wider"
            >
              <span>{t.openExternal}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      </section>

      {/* Spot Categories */}
      <div className="space-y-6">
        <div className="border-b border-[#272a2e] pb-4">
          <h2 className="font-headline text-xl sm:text-2xl uppercase tracking-wider text-white flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#E1FD15]" />
            <span>{t.keyLocationsHeading}</span>
          </h2>
        </div>

        {/* Spot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FESTIVAL_SPOTS.map((spot) => {
            const spotName = spot.name[lang];
            const spotBadge = spot.badge[lang];
            const spotDesc = spot.description[lang];
            const spotMetro = spot.metroAccess[lang];
            const spotActivities = spot.activities[lang];

            return (
              <div
                key={spot.id}
                className="bg-[#111415] border border-[#272a2e] border-l-4 border-l-[#9500FF] hover:border-[#E1FD15] hover:border-l-[#E1FD15] p-6 transition-all duration-200 hover:shadow-[0_0_20px_rgba(225,253,21,0.15)] flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-[#9500FF]/20 border border-[#9500FF]/40 text-[#E1FD15] font-mono text-[10px] uppercase font-bold tracking-widest">
                      {spotBadge}
                    </span>
                    <span className="font-mono text-xs text-[#666666] uppercase">
                      ID: {spot.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Spot Name */}
                  <h3 className="font-headline text-xl uppercase font-bold text-white group-hover:text-[#E1FD15] transition-colors">
                    {spotName}
                  </h3>

                  {/* Address */}
                  <p className="font-mono text-xs text-[#e2e2e4] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E1FD15] shrink-0 mt-0.5" />
                    <span>{spot.address}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#a0a5ad] leading-relaxed">
                    {spotDesc}
                  </p>

                  {/* Metro Access */}
                  <div className="bg-[#17191d] p-3 border border-[#272a2e] space-y-1 font-mono text-xs">
                    <div className="text-[10px] text-[#E1FD15] uppercase font-bold flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5" />
                      <span>{t.metroLabel}</span>
                    </div>
                    <div className="text-[#e2e2e4] text-[11px] leading-tight">
                      {spotMetro}
                    </div>
                  </div>

                  {/* Activities on Site */}
                  <div className="space-y-1.5 pt-1">
                    <div className="font-mono text-[10px] uppercase text-[#666666] tracking-wider font-bold">
                      {t.activitiesLabel}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {spotActivities.map((act, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#1f2227] text-[#e2e2e4] font-mono text-[10px] border border-[#272a2e]"
                        >
                          • {act}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-4 border-t border-[#272a2e] flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${spot.googleMapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-headline text-xs uppercase font-bold text-[#E1FD15] hover:text-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.directionsBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="font-mono text-[10px] text-[#555555] uppercase">
                    MTL ROLL 2026
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Skater Transit & Logistics Section */}
      <div className="border border-[#272a2e] bg-[#111415] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#272a2e] pb-4">
          <Info className="w-6 h-6 text-[#E1FD15]" />
          <div>
            <h3 className="font-headline text-lg sm:text-xl uppercase font-black text-white tracking-wider">
              {t.tipsHeading}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          <div className="space-y-2 bg-[#17191d] p-4 border border-[#272a2e]">
            <div className="font-headline text-sm uppercase font-bold text-[#E1FD15] flex items-center gap-2">
              <Train className="w-4 h-4 text-[#9500FF]" />
              <span>{t.tip1Title}</span>
            </div>
            <p className="text-xs text-[#a0a5ad] leading-relaxed">
              {t.tip1Desc}
            </p>
          </div>

          <div className="space-y-2 bg-[#17191d] p-4 border border-[#272a2e]">
            <div className="font-headline text-sm uppercase font-bold text-[#E1FD15] flex items-center gap-2">
              <Droplet className="w-4 h-4 text-[#9500FF]" />
              <span>{t.tip2Title}</span>
            </div>
            <p className="text-xs text-[#a0a5ad] leading-relaxed">
              {t.tip2Desc}
            </p>
          </div>

          <div className="space-y-2 bg-[#17191d] p-4 border border-[#272a2e]">
            <div className="font-headline text-sm uppercase font-bold text-[#E1FD15] flex items-center gap-2">
              <Bike className="w-4 h-4 text-[#9500FF]" />
              <span>{t.tip3Title}</span>
            </div>
            <p className="text-xs text-[#a0a5ad] leading-relaxed">
              {t.tip3Desc}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}