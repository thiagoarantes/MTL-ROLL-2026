import { Activity, Guest, Organizer, Sponsor } from '../types';
export * from './calendarData';
export * from './faqData';

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-night-ride',
    title: 'Night Ride',
    category: 'Prime Event',
    description: 'The definitive MTL ROLL experience. A massive, synchronized assault on the city streets under the cover of darkness. High speeds, neon trails, and pure kinetic energy.',
    longDescription: 'The headline event of MTL ROLL 2026. Join over a thousand skaters as we take over Montreal’s high-velocity boulevards. Fully escorted by safety marshals, this synchronized ride spans across major downtown vectors with neon light installations and synchronized mobile sound systems.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaEtvIx3NC3aokEq5kAnJDSJej_iPs2Ir0RXyjztW_Bo-vgBwr2NREvtKYDGAKjGBvJ-mKODUcLe7js9QKoJto-O-z9W2doNrsIiazWALsCJWxQpYugsn_vInMSp6elnmQ0aDv--AnPNJHalMz7dl_99mSwqqei5OC0BM19vf8yu7Uug4CKtI6cVFwxLuoWYiC3nxV2MoyMjFDnxj5lVJASm0zmIASXFPtHWW5ZfU5G0EkvuHVBDiN',
    iconName: 'directions_bike', // Will map to Lucide icon Bike or Zap
    difficulty: 'All Levels',
    date: 'Friday & Saturday, Sept 11 & 12',
    time: '20:00 - 23:00',
    location: 'Starts at Verdun Grid Hub',
  },
  {
    id: 'act-mural-ride',
    title: 'Mural Ride',
    category: 'Rides',
    description: "A curated tour through Montreal's most iconic and hidden street art installations. Pace is moderate, visuals are maximum.",
    longDescription: "Explore the legendary street murals of Montreal. This slow-to-moderate paced ride takes you through Saint-Laurent and Mile End back alleys, detailing the history of the city’s underground art scene and culminating in an outdoor gallery social.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo4OsmywxyzTBGMpyJ2bONw_D0vlGKtLZIUtQ4wCtoFmboYAd8JRtC56FQUMeY8x9V8dzM_NfKPZx3nWcaZ-Sl4MOCRIbSLJQWf2iyqQohqSR3A_ehGXIy2s8JKHmB3JdIyFoQFP6DRGkHWg8OZCF8NMnXp-wK4XDzjSuww4NIBVKO79hSU39GeE8hzJPDSmXzxEfLubeML19YdskJ-qsNR1-1XIFxYW_ZjYVFVuti1sqlSA6uLIU0',
    iconName: 'brush', // Lucide Brush / Palette
    difficulty: 'All Levels',
    date: 'Saturday, Sept 12',
    time: '14:00 - 17:00',
    location: 'Starts at Saint-Laurent Metro',
  },
  {
    id: 'act-long-distance',
    title: 'Long Distance',
    category: 'Rides',
    description: 'Test your endurance on a relentless 50km circuit. Strategic pacing and drafting are essential to survive the loop.',
    longDescription: 'A brutal test of mental and physical fortitude. This 50km circuit pushes you across Montreal’s scenic outer canal vectors and port areas. Perfect for marathon speed-skaters and long-frame inline enthusiasts who thrive on drafting and pace control.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtwBSh3I9965A5VA97GMNT6WPcpuu5lY8I0IjGiK64Fk0WHYIT5lLoUPqdrAuZgT135nCSSYXNEfdmjHaaTmCSimZFNPGifGOgEHqV9Ce7EiT2ka47xYp-GUeXAz7mZOk50o73irbImltxqiiVP2kW6I3JS43Y4XX4P68mZoG07MBWF4_BVlxnFnuICCFniVFHWu74Nsja97XezTH6yQTaucqy6wP_2Gzi8Ppx8r-LeFXGjoDfCTB8',
    iconName: 'route', // Lucide Route / Milestone
    difficulty: 'Tech',
    date: 'Sunday, Sept 13',
    time: '09:00 - 12:00',
    location: 'Starts at Lachine Canal Grid',
  },
  {
    id: 'act-slalom',
    title: 'Slalom',
    category: 'Tech',
    description: 'Precision carving through tightly spaced cones. Requires maximum agility, technical edge control, and intense focus.',
    longDescription: 'For the precision masters. We construct a technical cone grid where competitors showcase speed-slalom, classic freestyle, and battle slalom. Master-class coaching sessions are also held prior to the tournament.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-_Ict4THRYVHUB8CLRsQjgip0_D30ZyoyF3yuGBHdka_2AoHhMmS9U6mAhb27nWMMs3BBRNqfKVwy6kfq8sz8PmtLkrxyWtaPp4TSQBSk7UMiNpERlxI8-680gry-LjbhUsgZUsqRaHxzTfrRQ6-yh7DOA76n1FMmzJeTY_J-CRZF08Ei8v6bewiMx3ZrF2rSd7FLtZ9MoNHkbLYjc_bqWQis-tSHZlQWJyvXG7ejVkQfcMDwSu2J',
    iconName: 'timeline', // Lucide Sliders / Shuffle
    difficulty: 'Tech',
    date: 'Saturday, Sept 12',
    time: '11:00 - 13:00',
    location: 'Verdun Arena Court',
  },
  {
    id: 'act-jump',
    title: 'Jump',
    category: 'High Risk',
    description: 'Ramp launches and gap clears. Push your aerial limits in a controlled environment with expert spotters.',
    longDescription: 'High-flying gravity-defying action. Using bespoke wooden launch ramps and adjustable high bars, competitors battle for maximum height (Free Jump) and best style trick (High Jump) over simulated urban obstacles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcz5koXIDour-9seud2hMpfMyL-_igvkj8j03j20Zl82np7JbR2LTnhd6xlbVKwvbU9LsACykPpKen2VtNbc5FFrl72JyV5zULmrPzmprHSN6Xz5ZsIqK2Ru3HsHTdGaxGLUb8tsP56qQHAuvq9_jEyWiVxo4BIY6rwuwUL2WbKOn3x-9b94cTQj63E3Al0yVXhOMHS3d0ujSQfuGQf_FhLbd1NYV5vjJMu7TSfeZwWXMuIYwWhj8T',
    iconName: 'flight_takeoff', // Lucide TrendingUp / Rocket
    difficulty: 'High Risk',
    date: 'Sunday, Sept 13',
    time: '15:00 - 18:00',
    location: 'Verdun Outdoor Pump Circuit',
  },
  {
    id: 'act-wizard',
    title: 'Wizard',
    category: 'Style',
    description: 'Flow state skating. Link complex transitions, spins, and footwork on flat ground with long-frame setups.',
    longDescription: 'Explore flatland artistry. Led by style pioneers, this session teaches wizard-style movements, swivels, gazelles, lions, and artistic carve combinations. Perfect for those with multi-rockered long frames looking to unlock flow state.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGtm6jK2gS9pavNm6jz5SH78XNkpBRlByAo36kawzTStCMCJWYmZDHSmFxJA65lvTw8t7zt04GLIQyw1RzK2wuO05f9ZUaAlWtvbO0aBn3eJYWya9H6nsp3DxS7hNByQEjXU3KTQwIMIXkc0poEBPheC_ZLEE9T_YNzd8qje1-WGGFqKJmuIpyaCUb_hfOnjQh6gB6tvT__tk1NoJ2zBkZsKku1Z9MZ1hdAsg0SCfd8F8nraYwsNCR',
    iconName: 'auto_awesome', // Lucide Sparkles
    difficulty: 'Style',
    date: 'Saturday, Sept 12',
    time: '16:30 - 18:00',
    location: 'Verdun Waterfront Plaza',
  }
];

export const GUESTS: Guest[] = [
  {
    id: 'guest-dave',
    name: 'Dave',
    tags: ['PUMPTRACK'],
    image: '/guests/dave.jpg',
    instagramUrl: 'https://www.instagram.com/85pereira/',
  },
  {
    id: 'guest-melina',
    name: 'Melina',
    tags: ['PUMPTRACK'],
    image: '/guests/melina.jpg',
    instagramUrl: 'https://www.instagram.com/_melina_rc/',
  },
  {
    id: 'guest-seb',
    name: 'Seb',
    tags: ['JUMP', 'WIZARD', 'SPEAKER'],
    image: '/guests/seb.jpg',
    instagramUrl: 'https://www.instagram.com/sebl988/',
  },
  {
    id: 'guest-karen',
    name: 'Karen',
    tags: ['SLALOM'],
    image: '/guests/karen.jpg',
    instagramUrl: 'https://www.instagram.com/karenest9/',
  },
  {
    id: 'guest-kaia',
    name: 'Kaia',
    tags: ['SLALOM'],
    image: '/guests/kaia.png',
    instagramUrl: 'https://www.instagram.com/kaia_baird_/',
  },
  {
    id: 'guest-saul',
    name: 'Saul',
    tags: ['SLIDE'],
    image: '/guests/saul.jpg',
    instagramUrl: 'https://www.instagram.com/saul_gomez_lopez/',
  },
  {
    id: 'guest-xav',
    name: 'Xavier',
    tags: ['SKATEPARK'],
    image: '/guests/xavier.jpg',
    instagramUrl: 'https://www.instagram.com/crazyxav.art/',
  },
  {
    id: 'guest-emile',
    name: 'Émile',
    tags: ['FREESTYLE'],
    image: '/guests/emile.jpg',
    instagramUrl: 'https://www.instagram.com/emile_besh/',
  },
  {
    id: 'guest-marly',
    name: 'Marly',
    tags: ['ROLLER_DANCE'],
    image: '/guests/marly.jpg',
    instagramUrl: 'https://www.instagram.com/skatewithmarly/',
  },
  {
    id: 'guest-pierra',
    name: 'Pierra',
    tags: ['SPEED_SKATING'],
    image: '/guests/pierra.jpg',
    websiteUrl: 'https://www.vrlleclub.com/non-classe/premiere-canadienne-championne-du-monde-en-roller-vitesse.html',
  },
  {
    id: 'guest-mathieu',
    name: 'Mathieu',
    tags: ['SPEED_SKATING'],
    image: '/guests/mathieu.jpg',
  },
  {
    id: 'guest-skatespace',
    name: 'SKATESPACE',
    tags: ['INTRO_TO_SKATING', 'ROLLER_DANCE', 'SLALOM', 'GAMES'],
    image: '/guests/skatespace.jpg',
    instagramUrl: 'https://www.instagram.com/skatespace.ca/',
  }
];

export const ORGANIZERS: Organizer[] = [
  {
    id: 'org-rolling-tribes',
    name: 'Rolling Tribes',
    roleDescription: {
      EN: 'The architectural minds behind the night. Rolling Tribes is a collective of velocity addicts and urban navigators dedicated to reclaiming the concrete sprawl. They engineer the routes, establish the protocols, and ensure the grid remains electrified for every rider entering the zone.',
      FR: "Les architectes au cœur de l'événement. Rolling Tribes est un collectif de passionnés de vitesse et de navigateurs urbains dévoués à s'approprier les espaces urbains. Ils conçoivent les parcours, établissent les protocoles de sécurité et veillent à dynamiser chaque kilomètre pour tous les patineurs.",
      ES: 'Las mentes maestras detrás del evento. Rolling Tribes es un colectivo de apasionados por la velocidad y exploradores urbanos dedicados a conquistar el asfalto. Diseñan las rutas, establecen los protocolos de seguridad y aseguran que la energía se mantenga al máximo para cada participante.',
    },
    entityId: 'RLL_TRB_01',
    image: '/organizers/rolling_tribes_logo.jpg',
    tags: ['ROUTING', 'LOGISTICS', 'OVERSEER'],
    website: 'https://rollingtribes.com',
    instagramUrl: 'https://www.instagram.com/rollingtribes/',
  },
  {
    id: 'org-city-verdun',
    name: 'Arrondissement de Verdun',
    roleDescription: {
      EN: 'Official municipal host and territorial partner for MONTRÉAL ROLL 2026. Arrondissement de Verdun powers the grid by opening prime waterfront plazas, pump track hubs, and protected urban corridors, championing active mobility and community skate culture.',
      FR: "Arrondissement hôte officiel et partenaire territorial de MONTRÉAL ROLL 2026. L'arrondissement de Verdun soutient le festival en ouvrant ses magnifiques berges, ses installations de pumptrack et ses corridors urbains protégés, valorisant la mobilité active et la culture du patinage.",
      ES: 'Anfitrión municipal oficial y aliado territorial de MONTRÉAL ROLL 2026. La alcaldía de Verdun impulsa el evento abriendo sus plazas costeras, circuitos de pumptrack y corredores urbanos protegidos, promoviendo la movilidad activa y la cultura del patinaje.',
    },
    entityId: 'ARR_VRDN_02',
    image: '/organizers/verdun_logo.svg',
    tags: ['HOST_BOROUGH', 'CIVIC_PARTNER', 'URBAN_CORRIDORS', 'ACTIVE_MOBILITY'],
    website: 'https://montreal.ca/verdun',
    instagramUrl: 'https://www.instagram.com/arr_verdun',
  }
];

export const SPONSORS: Sponsor[] = [
  {
    id: 'spon-rockin',
    name: 'ROCKIN\' FRAMES',
    image: '/sponsors/rockin.png',
    website: 'https://rockinframes.com',
  },
  {
    id: 'spon-solo',
    name: 'Boutique Solo-Inline',
    image: '/sponsors/solo.png',
    website: 'https://solo-inline.com/'
  },
  {
    id: 'spon-xact',
    name: 'Xact Skate Shop',
    image: '/sponsors/xact.png',
    website: 'https://xactskateshop.com/'
  },
  {
    id: 'spon-lowlife',
    name: 'Lowlife Mtl',
    image: '/sponsors/lowlife.png',
    website: 'https://www.lowlifemtl.com/'
  },
  {
    id: 'spon-skpro',
    name: 'SkatePro',
    image: '/sponsors/skatepro.png',
    website: 'https://www.skatepro.ca/'
  },
  {
    id: 'spon-prosk8place',
    name: 'ProSkaters Place',
    image: '/sponsors/proskaterplace.png',
    website: 'https://proskatersplace.ca/'
  },
  {
    id: 'spon-flyingeagle',
    name: 'FlyingEagle Skate',
    image: '/sponsors/flyingeagle.png',
    website: 'https://www.flyingeagleskates.com/'
  },
  {
    id: 'spon-yoyo',
    name: 'YOYOSKATE',
    image: '/sponsors/yoyo.png',
    website: 'https://www.yoyoskateofficial.com/'
  }
];
