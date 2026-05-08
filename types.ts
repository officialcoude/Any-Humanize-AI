export enum ToneType {
  STANDARD = 'Standard',
  CASUAL = 'Casual',
  PROFESSIONAL = 'Professional',
  ACADEMIC = 'Academic',
  STORYTELLER = 'Storyteller',
  WITTY = 'Witty'
}

export enum AppMode {
  SCRIPT = 'script',
  HUMANIZE = 'humanize',
  SEO_YT = 'seo_yt',
  CAPTION = 'caption',
  THUMBNAIL = 'thumbnail'
}

export enum ScriptFormat {
  YOUTUBE_VIDEO = 'YouTube Video',
  INSTAGRAM_REEL = 'Instagram Reel / TikTok',
  TUTORIAL = 'Tutorial / How-To',
  PODCAST = 'Podcast Segment',
  BLOG_OUTLINE = 'Blog Outline',
  PRESENTATION = 'Presentation Script'
}

export enum ScriptStyle {
  VLOG = 'Vlog / Lifestyle',
  EDUCATIONAL = 'Educational / Informative',
  REVIEW = 'Product Review / Tech',
  COMEDY = 'Comedy / Skit',
  MOTIVATIONAL = 'Motivational / Speech',
  NEWS = 'News / Commentary',
  CINEMATIC = 'Cinematic / Storytelling',
  GAMING = 'Gaming / Walkthrough'
}

export enum CaptionTone {
  WITTY = 'Witty & Fun',
  INSPIRING = 'Inspiring & Motivational',
  EDUCATIONAL = 'Educational & Value',
  PROMOTIONAL = 'Sales & Promotional',
  STORYTELLING = 'Storytelling',
  MINIMALIST = 'Minimalist & Short',
  ENGAGING = 'Question & Engagement',
  DOCUMENTARY = 'Documentary Style',
  CINEMATOGRAPHY = 'Cinematography Focus',
  PHOTOGRAPHER = 'Photographer Aesthetic'
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  FACEBOOK = 'Facebook',
  YOUTUBE = 'YouTube Shorts',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter/X'
}

export enum VideoCategory {
  GENERAL = 'General Audience',
  GAMERS = 'Gamers',
  FITNESS = 'Fitness Enthusiasts',
  PARENTS = 'Parents',
  TRAVELERS = 'Travelers',
  BUSINESS = 'Small Business Owners',
  ART = 'Art Lovers',
  CREATORS = 'YouTubers/Creators',
  STUDENTS = 'Students',
  TECH = 'Tech Geeks',
  FOODIES = 'Foodies',
  FASHION = 'Fashionistas',
  PETS = 'Pet Owners',
  DEVOTIONAL = 'Devotional Audience',
  ASTROLOGY = 'Astrology Seekers',
  COUPLES = 'Couples',
  GEN_Z = 'Gen Z',
  MILLENNIALS = 'Millennials'
}

export interface ThumbnailConcept {
  text: string;
  style: string;
  colors: string[];
  fonts: string[];
  layout: string;
}

export interface HumanizeResponse {
  original: string;
  humanized: string;
  tone: ToneType;
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export interface HistoryItem {
  id: string;
  original: string;
  humanized: string;
  tone: string; // Stores ToneType, ScriptFormat, ScriptStyle, or "SEO Metadata"
  timestamp: number;
  mode?: AppMode;
}

export interface User {
  id: string;
  name: string;
  email?: string; 
  mobile?: string; 
}