export interface FaqItem {
  id: string;
  category: 'general' | 'registration' | 'access' | 'rules' | 'amenities';
  question: {
    EN: string;
    FR: string;
    ES: string;
  };
  answer: {
    EN: string;
    FR: string;
    ES: string;
  };
  highlights?: {
    EN: string[];
    FR: string[];
    ES: string[];
  };
  mapLink?: string;
}

export interface ConductRule {
  id: string;
  number: string;
  title: {
    EN: string;
    FR: string;
    ES: string;
  };
  description: {
    EN: string;
    FR: string;
    ES: string;
  };
  tag: {
    EN: string;
    FR: string;
    ES: string;
  };
  severity?: 'standard' | 'safety' | 'zero_tolerance';
}

export interface SkatingSkillLevel {
  id: 'first_timer' | 'beginner' | 'intermediate' | 'advanced';
  colorCode: string;
  colorName: string;
  dotBg: string;
  borderClass: string;
  textClass: string;
  bgGlowClass: string;
  pace?: {
    EN: string;
    FR: string;
    ES: string;
  };
  name: {
    EN: string;
    FR: string;
    ES: string;
  };
  requirements: {
    EN: string[];
    FR: string[];
    ES: string[];
  };
  accessibleEvents: {
    EN: string[];
    FR: string[];
    ES: string[];
  };
}

export const SKATING_SKILL_LEVELS: SkatingSkillLevel[] = [
  {
    id: 'first_timer',
    colorCode: '#E1FD15',
    colorName: 'Yellow / Jaune / Amarillo',
    dotBg: 'bg-[#E1FD15]',
    borderClass: 'border-[#E1FD15]/60 hover:border-[#E1FD15]',
    textClass: 'text-[#E1FD15]',
    bgGlowClass: 'shadow-[0_0_20px_rgba(225,253,21,0.15)]',
    name: {
      EN: 'First-timer',
      FR: 'Première Fois',
      ES: 'Primera Vez',
    },
    requirements: {
      EN: [
        'Great job for having the courage to take up skating!',
        'Our practice sessions and open clinics will be perfect for learning basics, balance, and improving your skills.',
      ],
      FR: [
        'Bravo pour ton courage à te lancer dans le patin !',
        "Nos événements de pratique et initiations seront parfaits pour apprendre les bases, l'équilibre et t'améliorer.",
      ],
      ES: [
        '¡Qué bien que hayas tenido el valor de empezar a patinar!',
        'Nuestras sesiones de práctica serán perfectas para aprender las bases, el equilibrio y mejorar tus habilidades.',
      ],
    },
    accessibleEvents: {
      EN: [
        'Magic Monday',
        'Saturday on wheels (winter season)',
        'Sunday Fun Days',
      ],
      FR: [
        'Lundi Magique',
        'Samedi ça roule (saison hivernale)',
        'Dimanches Fun de l\'été',
      ],
      ES: [
        'Lunes mágico',
        'Sábado sobre ruedas (temporada de invierno)',
        'Días de diversión los domingos',
      ],
    },
  },
  {
    id: 'beginner',
    colorCode: '#00FF66',
    colorName: 'Green / Vert / Verde',
    dotBg: 'bg-[#00FF66]',
    borderClass: 'border-[#00FF66]/60 hover:border-[#00FF66]',
    textClass: 'text-[#00FF66]',
    bgGlowClass: 'shadow-[0_0_20px_rgba(0,255,102,0.15)]',
    pace: {
      EN: '10 km in 2h',
      FR: '10 km en 2h',
      ES: '10 km en 2h',
    },
    name: {
      EN: 'Beginner',
      FR: 'Débutant',
      ES: 'Principiante',
    },
    requirements: {
      EN: [
        'You can ride while balancing and control your direction',
        'You know how to control your speed on flat ground and slow down with T-brake on one side',
        'You can skate 10 km in 2 hours',
      ],
      FR: [
        'Tu peux rouler en équilibre et contrôler ta direction',
        'Tu sais contrôler ta vitesse sur le plat et ralentir avec le freinage en T d\'un côté',
        'Tu peux patiner 10 km en 2h',
      ],
      ES: [
        'Puedes patinar manteniendo el equilibrio y controlando la dirección',
        'Sabes cómo controlar tu velocidad en terreno llano y reducir la velocidad con el freno en T de un lado',
        'Puedes patinar 10 km en 2 horas',
      ],
    },
    accessibleEvents: {
      EN: [
        'All from First-timer level',
        'Urban Wednesday with introduction',
        'Saturday Night Roller Fever',
      ],
      FR: [
        'Tout du niveau Première Fois',
        'Mercredi urbain avec initiation',
        'La fièvre du Samedi soir en roller',
      ],
      ES: [
        'Todo de nível Primera Vez',
        'Miércoles urbano con presentación',
        'Fiebre de patines del sábado por la noche',
      ],
    },
  },
  {
    id: 'intermediate',
    colorCode: '#00D2FF',
    colorName: 'Blue / Bleu / Azul',
    dotBg: 'bg-[#00D2FF]',
    borderClass: 'border-[#00D2FF]/60 hover:border-[#00D2FF]',
    textClass: 'text-[#00D2FF]',
    bgGlowClass: 'shadow-[0_0_20px_rgba(0,210,255,0.15)]',
    pace: {
      EN: '15 km in 2h',
      FR: '15 km en 2h',
      ES: '15 km en 2h',
    },
    name: {
      EN: 'Intermediate',
      FR: 'Intermédiaire',
      ES: 'Intermedio',
    },
    requirements: {
      EN: [
        'You know how to control your speed on gentle slopes',
        'You know how to take turns by leaning into them (carving/drift)',
        'You know how to stop using the T-stop on both sides',
        'You can skate 15 km in 2 hours',
      ],
      FR: [
        'Tu sais contrôler ta vitesse dans les pentes légères',
        'Tu sais prendre les courbes en dérive',
        'Tu sais freiner en T des 2 côtés',
        'Tu peux patiner 15 km en 2h',
      ],
      ES: [
        'Sabes cómo controlar tu velocidad en pendientes suaves',
        'Sabes cómo tomar las curvas inclinándote hacia ellas',
        'Sabes cómo detenerte usando el freno en T en ambos lados',
        'Puedes patinar 15 km en 2 horas',
      ],
    },
    accessibleEvents: {
      EN: [
        'All from Beginner level',
        'Light-Up the 514',
        'Urban Wednesday (off-summer-season)',
      ],
      FR: [
        'Tout du niveau Débutant',
        'Illumine le 514',
        'Mercredi urbain (hors saison estivale)',
      ],
      ES: [
        'Todo de nível Principiante',
        'Ilumina el 514',
        'Miércoles urbano (fuera de la temporada de verano)',
      ],
    },
  },
  {
    id: 'advanced',
    colorCode: '#FF0055',
    colorName: 'Red / Rouge / Rojo',
    dotBg: 'bg-[#FF0055]',
    borderClass: 'border-[#FF0055]/60 hover:border-[#FF0055]',
    textClass: 'text-[#FF0055]',
    bgGlowClass: 'shadow-[0_0_20px_rgba(255,0,85,0.15)]',
    pace: {
      EN: '25 km in 2h',
      FR: '25 km en 2h',
      ES: '25 km en 2h',
    },
    name: {
      EN: 'Advanced',
      FR: 'Avancé',
      ES: 'Avanzado',
    },
    requirements: {
      EN: [
        'You can control your speed in all situations: traffic, steep descents',
        'You can navigate obstacles: curbs, potholes, gravel',
        'You can take turns with a cross-step (crossovers)',
        'You can skate backward and perform powerslides and/or soul slides',
        'You can skate 25 km in 2 hours',
      ],
      FR: [
        'Tu sais contrôler ta vitesse en toutes circonstances : circulation, descente abrupte',
        'Tu sais gérer les obstacles : trottoirs, nids-de-poule, gravier',
        'Tu sais prendre les courbes en croisé',
        'Tu sais patiner en arrière et déraper en powerslide et/ou soul slide',
        'Tu peux patiner 25 km en 2h',
      ],
      ES: [
        'Puedes controlar tu velocidad en cualquier situación: tráfico, descensos empinados',
        'Puedes sortear obstáculos: bordillos, baches, grava',
        'Puedes tomar las curvas con un paso cruzado',
        'Puedes patinar hacia atrás y hacer derrapes y/o soul slides',
        'Puedes patinar 25 km en 2 horas',
      ],
    },
    accessibleEvents: {
      EN: [
        'All from Intermediate level',
        'Explore the 514 (off-summer-season)',
      ],
      FR: [
        'Tout du niveau Intermédiaire',
        'Explore le 514 (hors saison estivale)',
      ],
      ES: [
        'Todo de nível Intermedio',
        'Explora el 514 (fuera de la temporada de verano)',
      ],
    },
  },
];

export const FAQ_CATEGORIES = [
  { id: 'all', labelEN: 'All Intel', labelFR: 'Toutes les infos', labelES: 'Toda la información' },
  { id: 'general', labelEN: 'Overview', labelFR: 'Général', labelES: 'General' },
  { id: 'registration', labelEN: 'Access & Cost', labelFR: 'Accès & Tarifs', labelES: 'Acceso y Costos' },
  { id: 'access', labelEN: 'Spots & Transport', labelFR: 'Lieux & Transports', labelES: 'Ubicaciones' },
  { id: 'rules', labelEN: 'Gear & Wheels', labelFR: 'Équipement & Roues', labelES: 'Equipo y Ruedas' },
  { id: 'amenities', labelEN: 'Food & District', labelFR: 'Restauration & Quartier', labelES: 'Comida y Zona' },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-what-is-mtl-roll',
    category: 'general',
    question: {
      EN: 'What is Montréal Roll and what is different from Montréal-Roll-O-Rama?',
      FR: "Qu'est-ce que Montréal Roll et qu'est-ce qui change par rapport à Montréal-Roll-O-Rama ?",
      ES: '¿Qué es Montréal Roll y en qué se diferencia de Montréal-Roll-O-Rama?',
    },
    answer: {
      EN: 'Montréal Roll is an inline & quad skates festival: during 3 days, you can enjoy and discover the various disciplines around skating: slalom, jump, slides, speed skate, roller dance, urban rides, skatepark, pumptrack, games, etc.\n\nMontréal Roll keeps essentially the same spirit as Montréal-Roll-O-Rama but as several organizers and guests are different this year, the event was re-branded.',
      FR: "Montréal Roll est un festival de roller en ligne et de patins à roulettes (quad) : pendant 3 jours, profitez et découvrez les multiples disciplines du patinage : slalom, saut (jump), slides, vitesse, roller dance, randonnées urbaines, skatepark, pumptrack, jeux, etc.\n\nMontréal Roll conserve essentiellement le même esprit que Montréal-Roll-O-Rama, mais comme plusieurs organisateurs et invités changent cette année, l'événement a été rebaptisé.",
      ES: 'Montréal Roll es un festival de patinaje en línea y quad (patines de 4 ruedas): durante 3 días, podrás disfrutar y descubrir las diversas disciplinas del patinaje: slalom, saltos, slides, velocidad, roller dance, rutas urbanas, skatepark, pumptrack, juegos, etc.\n\nMontréal Roll mantiene esencialmente el mismo espíritu de Montréal-Roll-O-Rama, pero dado que varios organizadores e invitados son distintos este año, el evento renovó su nombre e identidad.',
    },
    highlights: {
      EN: ['3 Days of Festival', 'Inline & Quad Disciplines', 'Fresh Re-Branded Spirit'],
      FR: ['3 jours de festival', 'Disciplines Roller & Quad', 'Nouvelle identité dynamique'],
      ES: ['3 días de festival', 'Disciplinas en línea y quad', 'Nueva identidad renovada'],
    },
  },
  {
    id: 'faq-who-can-attend-cost',
    category: 'registration',
    question: {
      EN: 'Who can attend and how much is it? Do I need to register?',
      FR: "Qui peut participer et quel est le coût ? Dois-je m'inscrire ?",
      ES: '¿Quién puede asistir y cuánto cuesta? ¿Es necesario registrarse?',
    },
    answer: {
      EN: "Our mission is inclusiveness, hence the event is 100% FREE and open to everyone (whatever the age, genre, skill level). Some workshops and rides may ask for a certain skating level to attend; this is for everyone’s safety.\n\nEven though it is free, you MUST register for the event so organizers can calibrate logistics and safety convoys.",
      FR: "Notre mission est l'inclusion : l'événement est donc 100 % GRATUIT et ouvert à tous et à toutes (sans distinction d'âge, de genre ou de niveau de patinage). Certains ateliers et randonnées peuvent toutefois nécessiter un certain niveau technique pour participer, exclusivement pour la sécurité de tous.\n\nMême si l'accès est gratuit, vous devez obligatoirement vous inscrire à l'événement afin de nous aider à calibrer la logistique et la sécurité.",
      ES: "Nuestra misión es la inclusión total, por lo que el evento es 100% GRATUITO y abierto a todo el público (sin importar edad, género o nivel de habilidad). Algunos talleres y rutas pueden requerir un cierto nivel de patinaje para participar, estrictamente por la seguridad de todos.\n\nAunque sea gratis, es necesario registrarse previamente para ayudarnos a organizar la logística y los convoys de seguridad.",
    },
    highlights: {
      EN: ['100% Free Entry', 'All Ages & Skill Levels', 'Mandatory Registration'],
      FR: ['Entrée 100% gratuite', 'Tous âges & tous niveaux', 'Inscription requise'],
      ES: ['Entrada 100% gratuita', 'Todas las edades y niveles', 'Registro obligatorio'],
    },
  },
  {
    id: 'faq-access-locations',
    category: 'access',
    question: {
      EN: 'How to get access?',
      FR: 'Comment accéder aux sites et aux activités ?',
      ES: '¿Cómo llegar y acceder a los diferentes puntos?',
    },
    answer: {
      EN: 'Daily events are happening at Bleu Blanc Bouge (called BBB) rink located in Parc Willibrord, very close to Verdun metro station (Green line), Montréal, CANADA.\n\nThere will be workshops and sessions also held at:\n• Pumptrack d’Argenson: 2.3 km / 10 mins skating from BBB\n• Skatepark Arthur-Therrien: 1.9 km / 7 mins skating from BBB\n• Circuit Gilles Villeneuve, Parc Jean Drapeau: 10 km / 40 mins skating from BBB\n\nBe sure to check out the official event map for exact GPS coordinates and transit lines.',
      FR: "Les activités quotidiennes se déroulent principalement à la patinoire Bleu Blanc Bouge (appelée BBB) située au Parc Willibrord, tout près de la station de métro Verdun (Ligne Verte), Montréal, CANADA.\n\nDes ateliers et sessions auront également lieu aux emplacements suivants :\n• Pumptrack d’Argenson : 2,3 km / 10 min en patins depuis la patinoire BBB\n• Skatepark Arthur-Therrien : 1,9 km / 7 min en patins depuis la patinoire BBB\n• Circuit Gilles-Villeneuve, Parc Jean-Drapeau : 10 km / 40 min en patins depuis la patinoire BBB\n\nConsultez la carte officielle de l'événement pour les coordonnées GPS exactes et les accès de transport.",
      ES: 'Los eventos principales se llevan a cabo en la pista Bleu Blanc Bouge (conocida como BBB) ubicada en Parc Willibrord, muy cerca de la estación de metro Verdun (Línea Verde), Montréal, CANADÁ.\n\nTambién habrá talleres y sesiones en los siguientes puntos:\n• Pumptrack d’Argenson: 2.3 km / 10 mins patinando desde BBB\n• Skatepark Arthur-Therrien: 1.9 km / 7 mins patinando desde BBB\n• Circuit Gilles Villeneuve, Parc Jean Drapeau: 10 km / 40 mins patinando desde BBB\n\nAsegúrate de consultar el mapa oficial del evento para ubicar coordenadas y rutas de transporte.',
    },
    mapLink: 'https://maps.google.com/?q=Bleu+Blanc+Bouge+Parc+Willibrord+Verdun+Montreal',
    highlights: {
      EN: ['Main Hub: BBB Parc Willibrord', 'Verdun Metro (Green Line)', 'Multi-Spot Circuit'],
      FR: ['QG principal : BBB Parc Willibrord', 'Métro Verdun (Ligne Verte)', 'Circuit multi-spots'],
      ES: ['Punto principal: BBB Parc Willibrord', 'Metro Verdun (Línea Verde)', 'Circuito de múltiples puntos'],
    },
  },
  {
    id: 'faq-other-wheels',
    category: 'rules',
    question: {
      EN: 'Can I roll with something other than inline or quad skates?',
      FR: 'Puis-je rouler avec autre chose que des rollers en ligne ou des quads ?',
      ES: '¿Puedo participar con otro vehículo que no sean patines en línea o quads?',
    },
    answer: {
      EN: 'Skateboards, strollers, and scooters are NOT accepted during the events due to safety and speed differential considerations.\n\nBicycles are welcome to accompany the urban rides by staying at the rear of the convoy behind the skate marshals.',
      FR: "Les planches à roulettes (skateboards), les poussettes et les trottinettes ne sont PAS acceptées pendant les activités et randonnées pour des raisons strictes de sécurité et de gestion de convoi.\n\nLes vélos peuvent accompagner les randonnées en restant impérativement à l'arrière du convoi, derrière les encadreurs.",
      ES: 'Las patinetas (skateboards), carriolas y monopatines/scooters NO están permitidos durante las actividades debido a consideraciones de seguridad y velocidad de desplazamiento.\n\nLas bicicletas pueden acompañar las rutas urbanas manteniéndose siempre en la parte trasera del convoy detrás del equipo de seguridad.',
    },
    highlights: {
      EN: ['Inline & Quads Primary', 'No Skateboards/Scooters/Strollers', 'Bikes at Rear of Convoy'],
      FR: ['Roller & Quad prioritaires', 'Pas de skate/trottinette/poussette', 'Vélos à l\'arrière du convoi'],
      ES: ['Patines y Quads principales', 'Sin patinetas ni monopatines', 'Bicicletas al final del convoy'],
    },
  },
  {
    id: 'faq-substances-policy',
    category: 'rules',
    question: {
      EN: 'Are smoking, vaping, drinking, or drugs allowed in event areas?',
      FR: "Le tabagisme, le vapotage, l'alcool ou les drogues sont-ils permis sur les sites de l'événement ?",
      ES: '¿Se permite fumar, vapear, beber alcohol o consumir drogas en las áreas del evento?',
    },
    answer: {
      EN: 'No smoking, vaping, drinking alcohol, or using drugs in the event area, please! All official festival venues, workshops, and skate zones are designated clean, smoke-free, and substance-free spaces to guarantee the health, safety, and inclusive atmosphere for all skaters, families, and attendees.',
      FR: "Il est strictement interdit de fumer, vapoter, consommer de l'alcool ou des drogues sur l'ensemble des sites de l'événement. Tous les ateliers, patinoires et zones de patinage officielles sont des espaces sans fumée et sans substances, afin de garantir la santé, la sécurité et un environnement accueillant pour tous les participants et les familles.",
      ES: '¡Por favor, cero consumo de tabaco, vapeo, alcohol o drogas en toda el área del evento! Todas las sedes, talleres y pistas oficiales del festival son espacios libres de humo y sustancias para garantizar la salud, la seguridad y un ambiente sano e inclusivo para todos los patinadores y familias.',
    },
    highlights: {
      EN: ['Smoke-Free & Vape-Free', 'No Alcohol or Drugs', 'Safe & Clean for Everyone'],
      FR: ['Sans fumée ni vapotage', 'Sans alcool ni drogues', 'Environnement sain & sécuritaire'],
      ES: ['Libre de humo y vapeo', 'Sin alcohol ni drogas', 'Seguro y limpio para todos'],
    },
  },
  {
    id: 'faq-food-and-drink',
    category: 'amenities',
    question: {
      EN: 'Is it possible to eat and drink around the venue?',
      FR: 'Est-il possible de manger et boire à proximité ?',
      ES: '¿Es posible comer y beber en los alrededores de los eventos?',
    },
    answer: {
      EN: 'Yes! Wellington Street is located just 600m / 3 mins skating from the BBB rink.\n\nDuring the summer, Wellington is transformed into a pedestrianized street with cars completely closed off. It features dozens of terraces, restaurants, cafes, and specialty grocery shops. Skates and bicycles are allowed at a safe, low cruising pace.',
      FR: "Absolument ! La célèbre Promenade Wellington se trouve à seulement 600 m / 3 min en patins de la patinoire BBB.\n\nDurant l'été, la rue Wellington devient entièrement piétonne et fermée aux voitures. Elle regorge de terrasses animées, de restaurants, de cafés et de commerces locaux. Les patins et vélos y sont autorisés à vitesse modérée et sécuritaire.",
      ES: "¡Totalmente! La calle Wellington está ubicada a solo 600 m / 3 minutos patinando desde la pista BBB.\n\nDurante el verano, Wellington es una animada calle peatonal cerrada al tráfico de automóviles, con gran cantidad de terrazas, restaurantes, cafeterías y tiendas. Se permite circular en patines y bicicletas a ritmo tranquilo y respetuoso.",
    },
    highlights: {
      EN: ['Wellington Pedestrian Street', '600m from BBB Hub', 'Restaurants, Cafes & Terraces'],
      FR: ['Rue piétonne Wellington', 'À 600 m de la patinoire BBB', 'Terrasses, restos & cafés'],
      ES: ['Calle peatonal Wellington', 'A 600 m de la pista BBB', 'Restaurantes, terrazas y cafés'],
    },
  },
];

export const CONDUCT_RULES: ConductRule[] = [
  {
    id: 'conduct-respect',
    number: '01',
    title: {
      EN: 'Respect Everyone',
      FR: 'Respect de tous et toutes',
      ES: 'Respeto para todos',
    },
    description: {
      EN: "We’re a diverse crew, and we love it that way! Show kindness, respect, and patience to everyone—no exceptions.",
      FR: "Nous formons une communauté diversifiée et nous en sommes particulièrement fiers ! Faites preuve de bienveillance, de respect et de patience envers chacun·e — sans aucune exception.",
      ES: "¡Somos una comunidad diversa y nos encanta que así sea! Muestra amabilidad, respeto y paciencia con todas las personas, sin excepciones.",
    },
    tag: {
      EN: 'DIVERSITY & COMMUNITY',
      FR: 'DIVERSITÉ & COMMUNAUTÉ',
      ES: 'DIVERSIDAD Y COMUNIDAD',
    },
    severity: 'standard',
  },
  {
    id: 'conduct-positive',
    number: '02',
    title: {
      EN: 'Keep It Positive',
      FR: 'Restez positif·ve',
      ES: 'Mantén una actitud positiva',
    },
    description: {
      EN: 'Bring your best attitude when you come skate. High energy, mutual encouragement, and welcoming vibes build our festival culture.',
      FR: "Venez patiner avec votre meilleure énergie et un état d'esprit positif. L'encouragement mutuel et les bonnes ondes sont le cœur de notre festival.",
      ES: 'Trae tu mejor energía y vibra positiva cuando vengas a rodar. El apoyo mutuo y la buena actitud son la esencia de nuestro festival.',
    },
    tag: {
      EN: 'FESTIVAL ENERGY',
      FR: 'ÉNERGIE FESTIVALE',
      ES: 'ENERGÍA DEL FESTIVAL',
    },
    severity: 'standard',
  },
  {
    id: 'conduct-safety',
    number: '03',
    title: {
      EN: 'Safety First',
      FR: "Sécurité d'abord",
      ES: 'La seguridad es primero',
    },
    description: {
      EN: 'We recommend wearing protective gear (helmets, wristguards, knee/elbow pads) to promote safety and encourage everyone to send it with confidence.',
      FR: "Nous recommandons vivement le port d'équipements de protection (casque, protège-poignets, genouillères, coudières) pour patiner en toute sécurité et se dépasser avec confiance.",
      ES: 'Recomendamos usar equipo de protección (casco, muñequeras, rodilleras y coderas) para garantizar la seguridad y permitir que todos rueden con total confianza.',
    },
    tag: {
      EN: 'PROTECTIVE GEAR',
      FR: 'ÉQUIPEMENTS DE PROTECTION',
      ES: 'EQUIPO DE PROTECCIÓN',
    },
    severity: 'safety',
  },
  {
    id: 'conduct-space-consent',
    number: '04',
    title: {
      EN: 'Respect for Personal Space & Consent',
      FR: "Respect de l'espace personnel & consentement",
      ES: 'Respeto al espacio personal y consentimiento',
    },
    description: {
      EN: "Let’s make sure everyone has room to roll. Watch your speed, and be mindful of other skaters. Give people the space they need to feel comfortable and safe at all times. Always ask and get clear consent before any physical contact.",
      FR: "Assurons-nous que chacun·e ait l'espace nécessaire pour rouler librement. Surveillez votre vitesse et restez attentif·ve aux patineur·se·s autour de vous. Demandez et obtenez toujours un consentement explicite avant tout contact physique.",
      ES: "Asegurémonos de que todos tengan espacio para rodar cómodamente. Controla tu velocidad y mantente alerta a los demás patinadores. Brinda el espacio necesario para que todos se sientan seguros. Pide y obtén consentimiento claro antes de cualquier contacto físico.",
    },
    tag: {
      EN: 'SPACE & CONSENT',
      FR: 'ESPACE & CONSENTEMENT',
      ES: 'ESPACIO Y CONSENTIMIENTO',
    },
    severity: 'safety',
  },
  {
    id: 'conduct-have-fun',
    number: '05',
    title: {
      EN: 'Have Fun & Be You',
      FR: 'Amusez-vous et soyez vous-même',
      ES: 'Diviértete y sé tú mismo',
    },
    description: {
      EN: 'Express yourself, try new disciplines, and have a blast. Be authentically yourself, and let your unique skating style and personality shine!',
      FR: "Exprimez-vous, expérimentez de nouvelles disciplines et profitez au maximum. Soyez authentiquement vous-même et faites rayonner votre style unique !",
      ES: "Exprésate libremente, prueba nuevas disciplinas y pásala en grande. ¡Sé auténticamente tú y deja que tu estilo y personalidad brillen!",
    },
    tag: {
      EN: 'CREATIVE FREEDOM',
      FR: 'LIBERTÉ CRÉATIVE',
      ES: 'LIBERTAD CREATIVA',
    },
    severity: 'standard',
  },
  {
    id: 'conduct-zero-hate',
    number: '06',
    title: {
      EN: 'Zero Tolerance for Hate & Bullying',
      FR: 'Tolérance zéro pour la haine et l\'intimidation',
      ES: 'Tolerancia cero hacia el odio y el acoso',
    },
    description: {
      EN: 'Any form of discrimination, harassment, racism, sexism, homophobia, transphobia, or bullying has absolutely no place here. We take this seriously—everyone must feel welcome and secure.',
      FR: "Toute forme de discrimination, harcèlement, racisme, sexisme, homophobie, transphobie ou intimidation n'a absolument aucune place ici. Nous prenons cela très au sérieux — chaque participant·e doit se sentir pleinement bienvenu·e.",
      ES: "Cualquier forma de discriminación, acoso, racismo, sexismo, homofobia, transfobia o intimidación queda terminantemente prohibida. Nos tomamos esto con total seriedad: todas las personas deben sentirse bienvenidas y seguras.",
    },
    tag: {
      EN: 'ZERO TOLERANCE',
      FR: 'TOLÉRANCE ZÉRO',
      ES: 'TOLERANCIA CERO',
    },
    severity: 'zero_tolerance',
  },
  {
    id: 'conduct-harassment',
    number: '07',
    title: {
      EN: 'Sexual Harassment and Inappropriate Behavior',
      FR: 'Harcèlement sexuel et comportements inappropriés',
      ES: 'Acoso sexual y conductas inapropiadas',
    },
    description: {
      EN: 'Sexual harassment of any kind will not be tolerated. This includes unwanted physical contact, sexual comments, unsolicited jokes, gestures, or advances—in person or online. Reported incidents are taken seriously, handled respectfully, and kept strictly confidential.',
      FR: "Le harcèlement sexuel sous toutes ses formes ne sera toléré à aucun moment. Cela comprend les contacts physiques non consentis, les remarques sexuelles, les blagues déplacées, les gestes ou avances non sollicités — en personne ou en ligne. Tout incident signalé sera traité avec rigueur, respect et confidentialité absolue.",
      ES: "El acoso sexual de cualquier tipo no será tolerado bajo ninguna circunstancia. Esto incluye contacto físico no consentido, comentarios sexuales, bromas ofensivas, gestos o insinuaciones, ya sea en persona o por medios digitales. Los incidentes reportados serán atendidos con máxima seriedad, respeto y estricta confidencialidad.",
    },
    tag: {
      EN: 'SAFE ENVIRONMENT',
      FR: 'ENVIRONNEMENT SÉCURISÉ',
      ES: 'ESPACIO SEGURO',
    },
    severity: 'zero_tolerance',
  },
];
