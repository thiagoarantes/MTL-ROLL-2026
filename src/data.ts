import { Activity, Guest, Organizer, Sponsor, TimetableEvent } from './types';

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
    id: 'guest-saul',
    name: 'Saul Gomez Lopez',
    tag: 'SLIDE',
    image: '/guests/saul.jpg',
    instagramUrl: 'https://www.instagram.com/saul_gomez_lopez/',
  },
  {
    id: 'guest-karen',
    name: 'Karen Estrada',
    tag: 'SLALOM',
    image: '/guests/karen.jpg',
    instagramUrl: 'https://www.instagram.com/karenest9/',
  },
  {
    id: 'guest-vrl',
    name: 'VRL',
    tag: 'SYNDICATE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-_Ict4THRYVHUB8CLRsQjgip0_D30ZyoyF3yuGBHdka_2AoHhMmS9U6mAhb27nWMMs3BBRNqfKVwy6kfq8sz8PmtLkrxyWtaPp4TSQBSk7UMiNpERlxI8-680gry-LjbhUsgZUsqRaHxzTfrRQ6-yh7DOA76n1FMmzJeTY_J-CRZF08Ei8v6bewiMx3ZrF2rSd7FLtZ9MoNHkbLYjc_bqWQis-tSHZlQWJyvXG7ejVkQfcMDwSu2J',
    instagramUrl: 'https://www.instagram.com/vrl.skate/',
  },
  {
    id: 'guest-pumptrack',
    name: 'Pumptrack Team',
    tag: 'CREW_LINK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcz5koXIDour-9seud2hMpfMyL-_igvkj8j03j20Zl82np7JbR2LTnhd6xlbVKwvbU9LsACykPpKen2VtNbc5FFrl72JyV5zULmrPzmprHSN6Xz5ZsIqK2Ru3HsHTdGaxGLUb8tsP56qQHAuvq9_jEyWiVxo4BIY6rwuwUL2WbKOn3x-9b94cTQj63E3Al0yVXhOMHS3d0ujSQfuGQf_FhLbd1NYV5vjJMu7TSfeZwWXMuIYwWhj8T',
    instagramUrl: 'https://www.instagram.com/pumptrackmontreal/',
  }
];

export const ORGANIZERS: Organizer[] = [
  {
    id: 'org-rolling-tribes',
    name: 'Rolling Tribes',
    roleDescription: 'The architectural minds behind the night. Rolling Tribes is a collective of velocity addicts and urban navigators dedicated to reclaiming the concrete sprawl. They engineer the routes, establish the protocols, and ensure the grid remains electrified for every rider entering the zone.',
    entityId: 'RLL_TRB_01',
    image: '/rolling_tribes_logo.jpg',
    tags: ['ROUTING', 'LOGISTICS', 'OVERSEER']
  }
];

export const SPONSORS: Sponsor[] = [
  {
    id: 'spon-verdun',
    name: 'Arrondissement de Verdun',
    role: 'GOV_NODE',
    slotIndex: 1,
    isOpen: false,
  }
];

export const TIMETABLE_EVENTS: TimetableEvent[] = [
  // Day 1
  {
    id: 'time-d1-1',
    time: '18:00 - 19:30',
    title: 'Grid Onboarding & Registration',
    location: 'Verdun Hub, Hall A',
    type: 'social',
    day: 1,
    description: 'Check-in, collect your RFID helmet overlays, light packs, and sync your local client apps.',
  },
  {
    id: 'time-d1-2',
    time: '19:30 - 20:00',
    title: 'Pre-Ride Briefing & Vector Synchro',
    location: 'Verdun Hub, Main Stage',
    type: 'workshop',
    day: 1,
    description: 'Vital security briefing by Rolling Tribes and Route Engineers. Code of conduct, drafting protocols, and safety signals.',
  },
  {
    id: 'time-d1-3',
    time: '20:00 - 23:00',
    title: 'Mass Night Ride: Opening Salvo',
    location: 'Starting Vector: Verdun',
    type: 'ride',
    day: 1,
    description: 'The grid is live. Our flagship massive group ride rolls out through Verdun, Saint-Henri, and Old Port vectors.',
  },
  {
    id: 'time-d1-4',
    time: '23:00 - 01:00',
    title: 'Underground Node Social',
    location: 'Syndicate Depot (Secret location)',
    type: 'social',
    day: 1,
    description: 'Rehydrate, recharge, and swap specs with international teams. Ambient techno by guest DJs.',
  },

  // Day 2
  {
    id: 'time-d2-1',
    time: '11:00 - 13:00',
    title: 'Slalom Masterclass & Qualifications',
    location: 'Verdun Arena Court',
    type: 'competition',
    day: 2,
    description: 'Agility tests and qualification trials. Watch speed-slalom riders clear cones at insane tempos.',
  },
  {
    id: 'time-d2-2',
    time: '14:00 - 16:00',
    title: 'Street Murals Art Crawl Ride',
    location: 'Saint-Laurent Metro Station',
    type: 'ride',
    day: 2,
    description: 'Medium paced scenic ride through Mile End and Plateau, guided by street artists. High-fidelity photo-ops.',
  },
  {
    id: 'time-d2-3',
    time: '16:30 - 18:00',
    title: 'Wizard Flow & Carving Workshop',
    location: 'Verdun Waterfront Plaza',
    type: 'workshop',
    day: 2,
    description: 'A dedicated session for edge-flow, transitions, flatland carving, and swivel patterns.',
  },
  {
    id: 'time-d2-4',
    time: '20:00 - 22:30',
    title: 'Night Mass Ride: Chapter II',
    location: 'Downtown Core Vector',
    type: 'ride',
    day: 2,
    description: 'Higher intensity route crossing into Montreal Downtown streets. Experience maximum neon illumination.',
  },
  {
    id: 'time-d2-5',
    time: '22:30 - 03:00',
    title: 'Syndicate Afterparty: Bass Drop',
    location: 'Warehouse Vector B',
    type: 'social',
    day: 2,
    description: 'The absolute pinnacle night celebration with industrial synth sets, visual mapping, and heavy beats.',
  },

  // Day 3
  {
    id: 'time-d3-1',
    time: '09:00 - 12:30',
    title: 'Lachine Canal 50K Marathon',
    location: 'Lachine Canal Loop',
    type: 'competition',
    day: 3,
    description: 'The supreme endurance challenge. Draft lines, pace groups, and sprint checkpoints across 50 kilometers.',
  },
  {
    id: 'time-d3-2',
    time: '13:00 - 14:30',
    title: 'Braking and Downhill Mastery',
    location: 'Westmount Slope Side',
    type: 'workshop',
    day: 3,
    description: 'Advanced stopping methods (Magic Slide, Parallel Slide) and downhill speed control mechanics.',
  },
  {
    id: 'time-d3-3',
    time: '15:00 - 18:00',
    title: 'High-Jump & Ramp Battle',
    location: 'Verdun Pump Track Hub',
    type: 'competition',
    day: 3,
    description: 'Clear the bar. Spectacular high jump ramp launches and style gaps judged by veteran syndicate members.',
  },
  {
    id: 'time-d3-4',
    time: '18:30 - 20:00',
    title: 'Grid Closing Awards & Banquet',
    location: 'Verdun Waterfront Plaza',
    type: 'social',
    day: 3,
    description: 'Podium awards for Slalom, Marathon, and Jump. Crowning of MTL ROLL 2026 champions. Final sync out.',
  }
];
