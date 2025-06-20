import type { Resource } from '@/types';

export const mockResources: Resource[] = [
  {
    id: 'guide-ai-retail',
    title: 'La Guía Definitiva de IA en el Sector Minorista',
    description: 'Descubre cómo la IA está remodelando el panorama minorista, desde experiencias de compra personalizadas hasta la optimización de la cadena de suministro.',
    category: 'Industria',
    subcategory: 'Minorista',
    type: 'Guía',
    downloadUrl: '/resources/ai-in-retail-guide.pdf',
    isGated: true,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'retail guide book',
  },
  {
    id: 'whitepaper-ml-finance',
    title: 'Machine Learning para la Detección de Fraude Financiero',
    description: 'Un análisis profundo de técnicas avanzadas de ML para identificar y prevenir el fraude financiero en tiempo real.',
    category: 'Tecnología',
    subcategory: 'Machine Learning',
    type: 'Informe Técnico',
    downloadUrl: '/resources/ml-finance-fraud-whitepaper.pdf',
    isGated: true,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'finance document',
  },
  {
    id: 'casestudy-automation-manufacturing',
    title: 'Caso de Estudio: Automatización Aumenta Eficiencia en un 40% en Planta de Manufactura',
    description: 'Aprende cómo un fabricante líder aprovechó la automatización para mejorar significativamente la velocidad de producción y reducir errores.',
    category: 'Industria',
    subcategory: 'Manufactura',
    type: 'Caso de Estudio',
    downloadUrl: '/resources/automation-manufacturing-casestudy.pdf',
    isGated: false,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'factory report',
  },
  {
    id: 'webinar-digital-transformation',
    title: 'Webinar: Estrategias de Transformación Digital Impulsadas por IA',
    description: 'Perspectivas de expertos sobre la creación e implementación de estrategias de IA exitosas para una transformación digital integral.',
    category: 'Estrategia',
    subcategory: 'Transformación Digital',
    type: 'Webinar',
    downloadUrl: 'https://example.com/webinar-replay-link', 
    isGated: true,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'business webinar screen',
  },
  {
    id: 'guide-nlp-healthcare',
    title: 'PNL en Salud: Revolucionando la Atención al Paciente',
    description: 'Explora las aplicaciones del Procesamiento del Lenguaje Natural en el sector salud, desde la documentación clínica hasta la comunicación con el paciente.',
    category: 'Tecnología',
    subcategory: 'PNL',
    type: 'Guía',
    downloadUrl: '/resources/nlp-healthcare-guide.pdf',
    isGated: true,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'healthcare data',
  },
];
