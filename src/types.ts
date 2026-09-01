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
  websiteUrl?: string;
  instagramUrl?: string;
  isUserAdded?: boolean;
}

export interface Organizer {
  id: string;
  name: string;
  roleDescription: string | {
    EN: string;
    FR: string;
    ES: string;
  };
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

export type SkillLevelId = 'first_timer' | 'beginner' | 'intermediate' | 'advanced';

export interface LocalizedText {
  EN: string;
  FR: string;
  ES: string;
}

export interface TimetableEvent {
  id: string;
  title: string | LocalizedText;
  description: string | LocalizedText;
  longDescription?: string | LocalizedText;
  image: string;
  date: string | LocalizedText;
  time: string; // e.g. "18:00 - 19:30"
  level: SkillLevelId; // 'first_timer' | 'beginner' | 'intermediate' | 'advanced'
  startLocation: string | LocalizedText;
  endLocation?: string | LocalizedText; // Empty: same place; Filled: ride / route
  category: string | LocalizedText;
  type?: 'ride' | 'competition' | 'workshop' | 'social';
  day: 1 | 2 | 3;
  iconName?: string;
}
