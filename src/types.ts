export interface Activity {
  id: string;
  title: string;
  category: 'Prime Event' | 'Rides' | 'Competition' | 'Workshop' | 'Social' | 'Style' | 'Tech' | 'High Risk';
  description: string;
  longDescription?: string;
  image: string;
  iconName: string;
  difficulty?: 'Style' | 'Tech' | 'High Risk' | 'All Levels';
  date: string;
  time: string;
  location: string;
}

export interface Guest {
  id: string;
  name: string;
  tags: string[]; // e.g. ['VIP_ACCESS', 'SLIDE', 'SLALOM', 'CREW_LINK']
  image: string;
  instagramUrl?: string;
  isUserAdded?: boolean;
}

export interface Organizer {
  id: string;
  name: string;
  roleDescription: string;
  entityId: string;
  image: string;
  tags: string[];
  website?: string;
  instagramUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  image: string;
  website: string;
}

export interface Registration {
  id: string;
  skaterName: string;
  email: string;
  phone?: string;
  emergencyContact?: string;
  selectedActivityIds: string[];
  skaterLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  skateType: 'Inline' | 'Quads' | 'Three-Wheel' | 'Aggressive' | 'Other';
  bilingualPref: 'EN' | 'FR' | 'ES';
  customTag?: string;
  avatarUrl?: string;
}

export interface TimetableEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'ride' | 'competition' | 'workshop' | 'social';
  day: 1 | 2 | 3; // Sept 11, 12, 13
  date?: string;
  description: string;
  longDescription?: string;
  image?: string;
  iconName?: string;
  difficulty?: 'Style' | 'Tech' | 'High Risk' | 'All Levels';
  category?: string;
}
