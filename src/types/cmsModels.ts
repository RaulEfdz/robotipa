/**
 * TypeScript models for CMS content types based on current project content.
 */

export interface HomepageContent {
  welcomeTitle: string;
  welcomeSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  mainImageUrl: string;
  mainImageAlt: string;
  mainImageAiHint: string;
}

export interface Resource {
  id: string; // unique identifier
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  downloadUrl: string;
  isGated: boolean;
  image: string;
  aiHint: string;
}

export interface Service {
  id: string; // unique identifier
  title: string;
  industry: string;
  serviceType: string;
  companySizeCompatibility: string[]; // e.g. ['small', 'medium', 'large']
  shortDescription: string;
  longDescription: string;
  features: string[];
  image: string;
  aiHint: string;
  hasDemo: boolean;
}

export interface SuccessStoryImpact {
  metric: string;
  value: string;
  before?: string;
  after?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  feedback: string;
}

export interface SuccessStory {
  id: string; // unique identifier
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: SuccessStoryImpact[];
  technologies: string[];
  testimonial?: {
    text: string;
    author: string;
    videoUrl?: string;
  };
  pdfUrl: string;
  image: string;
  aiHint: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  iconName: string; // icon identifier string for CMS
  features: string[];
  featured?: boolean;
}

export interface ContactInfo {
  address: string;
  email: string;
  hiringText: string;
  jobOpeningsUrl: string;
}
