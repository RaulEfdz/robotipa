import type { SuccessStory } from '@/types';

export const mockSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    clientName: 'Global Retail Corp',
    industry: 'Minorista',
    challenge: 'Luchando con una gestión de inventario ineficiente y datos de clientes aislados, lo que llevaba a desabastecimientos y oportunidades de venta perdidas.',
    solution: 'Se implementó una plataforma de comercio unificado impulsada por IA que integra datos de inventario, ventas y clientes. Se desarrolló automatización de marketing personalizada.',
    impact: [
      { metric: 'Precisión de Inventario', value: '+30%', before: '65%', after: '95%' },
      { metric: 'Conversión de Ventas', value: '+15%' },
      { metric: 'Retención de Clientes', value: '+20%' },
    ],
    technologies: ['IA/ML', 'Computación en la Nube', 'Análisis de Big Data', 'Automatización RPA'],
    testimonial: {
      text: "La solución de Robotipa revolucionó nuestras operaciones. Hemos visto mejoras increíbles en eficiencia y satisfacción del cliente.",
      author: 'Jane Doe, COO de Global Retail Corp',
      videoUrl: 'https://example.com/video-testimonial-1'
    },
    pdfUrl: '/pdfs/global-retail-corp-case-study.pdf', 
    image: 'https://placehold.co/600x400.png',
    aiHint: 'retail success',
  },
  {
    id: 'story-2',
    clientName: 'SecureBank Inc.',
    industry: 'Finanzas',
    challenge: 'Enfrentando una creciente sofisticación en el fraude financiero, los sistemas existentes no podían mantenerse al día, resultando en pérdidas significativas.',
    solution: 'Se desplegó un sistema avanzado de detección de fraude en tiempo real utilizando algoritmos de machine learning para analizar patrones de transacciones e identificar anomalías.',
    impact: [
      { metric: 'Transacciones Fraudulentas Detectadas', value: '+99.5%' },
      { metric: 'Falsos Positivos Reducidos', value: '-40%' },
      { metric: 'Tiempo de Investigación por Caso', value: '-60%' },
    ],
    technologies: ['Machine Learning', 'Procesamiento de Datos en Tiempo Real', 'IA para Ciberseguridad', 'Blockchain (para pistas de auditoría)'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'finance chart graph',
  },
  {
    id: 'story-3',
    clientName: 'Precision Manufacturing Ltd.',
    industry: 'Manufactura',
    challenge: 'Altos costos operativos debido a tiempos de inactividad inesperados de equipos y programas de producción subóptimos.',
    solution: 'Se integró un sistema de mantenimiento predictivo utilizando sensores IIoT y análisis de IA. Se optimizó el flujo de producción con una herramienta de programación de IA.',
    impact: [
      { metric: 'Tiempo de Inactividad No Planificado', value: '-70%' },
      { metric: 'Costos de Mantenimiento', value: '-25%' },
      { metric: 'Producción', value: '+18%' },
    ],
    technologies: ['IIoT', 'Análisis Predictivo', 'Programación Impulsada por IA', 'Gemelo Digital'],
    testimonial: {
      text: "El sistema de mantenimiento predictivo ha cambiado las reglas del juego para la eficiencia y confiabilidad de nuestra planta.",
      author: 'John Smith, Gerente de Planta',
    },
    pdfUrl: '/pdfs/precision-manufacturing-case-study.pdf', 
    image: 'https://placehold.co/600x400.png',
    aiHint: 'factory robot arm',
  },
];
