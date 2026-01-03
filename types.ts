
export type TabType = 
  | 'home' 
  | 'observatory' 
  | 'academy' 
  | 'factcheck' 
  | 'archive' 
  | 'reports' 
  | 'news' 
  | 'team' 
  | 'about' 
  | 'panic' 
  | 'admin'
  | 'login'
  | 'media-library'
  | string;

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  zoomLink?: string;
  registrationLink?: string;
  image: string;
  category: string;
  curriculum: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnail: string;
  category: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: string;
  relatedViolationId?: string;
}

export interface Violation {
  id: string;
  date: string;
  type: string;
  victim: string;
  city: string;
  perpetrator: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  status: 'confirmed' | 'pending';
  month: string; // للتمثيل البياني الزمني
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  category?: 'leadership' | 'advisory' | 'staff';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  activities: string[];
  // Added images array for ProjectsPage compatibility
  images: string[];
}

// Fix: Added missing Report interface
export interface Report {
  id: string;
  title: string;
  type: 'annual' | 'monthly' | 'special';
  date: string;
  thumbnail: string;
  url: string;
}

// Fix: Added missing SlideItem interface
export interface SlideItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tag: string;
  linkTab: TabType;
}

// Fix: Added missing PageContent interface
export interface PageContent {
  about: {
    heroTitle: string;
    heroDescription: string;
    vision: string;
    mission: string;
    goals: Array<{ text: string; iconName: string }>;
  };
}

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  typography: string;
  aboutContent: {
    heroTitle: string;
    heroDescription: string;
    vision: string;
    mission: string;
    intro: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    mapLocation: string;
    // Fix: Added mapIframe property
    mapIframe: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  tab: TabType;
  isVisible: boolean;
  order: number;
  iconName: string;
  // Added category for Sidebar compatibility
  category?: 'main' | 'media' | 'support';
}
