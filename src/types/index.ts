export interface Service {
  id: string;
  title: string;
  industry: string; // Corresponde a los 'value' de INDUSTRIES en constants.ts
  serviceType: string; // Corresponde a los 'value' de SERVICE_TYPES en constants.ts
  companySizeCompatibility: string[]; // Corresponde a los 'value' de COMPANY_SIZES
  shortDescription: string;
  longDescription: string;
  features: string[];
  image: string;
  hasDemo: boolean;
  aiHint?: string;
}

export interface SuccessStory {
  id: string;
  clientName: string;
  industry: string; // Debería ser el label traducido o un identificador consistente
  challenge: string;
  solution: string;
  impact: { metric: string; value: string; before?: string; after?: string }[];
  technologies: string[];
  testimonial?: { text: string; author: string; videoUrl?: string };
  pdfUrl?: string;
  image: string;
  aiHint?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Industria' | 'Tecnología' | 'Estrategia' | 'Todos'; // Ajustado para incluir 'Todos'
  subcategory: string; 
  type: 'Guía' | 'Informe Técnico' | 'Caso de Estudio' | 'Webinar' | 'Todos'; // Ajustado para incluir 'Todos'
  downloadUrl: string; 
  isGated: boolean;
  image: string;
  aiHint?: string;
}
