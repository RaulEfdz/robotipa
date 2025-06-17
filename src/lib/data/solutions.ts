
// src/lib/data/solutions.ts
import type { Service } from '@/types';

export let mockServices: Service[] = [
  {
    id: 'retail-automation',
    title: 'Automatización Minorista Potenciada por IA',
    industry: 'retail',
    serviceType: 'automation',
    companySizeCompatibility: ['small', 'medium', 'large'],
    shortDescription: 'Optimiza tus operaciones minoristas con automatización inteligente.',
    longDescription: 'Nuestras soluciones de automatización minorista potenciadas por IA cubren todo, desde la gestión de inventario y experiencias de cliente personalizadas hasta procesos de pago automatizados. Aumenta la eficiencia y mejora la satisfacción del cliente.',
    features: ['Seguimiento Automatizado de Inventario', 'Motores de Recomendación Personalizados', 'Chatbots de IA para Servicio al Cliente', 'Optimización de la Cadena de Suministro'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'retail automation',
    hasDemo: true,
  },
  {
    id: 'finance-fraud-detection',
    title: 'Detección Avanzada de Fraude para Finanzas',
    industry: 'finance',
    serviceType: 'ai_consulting',
    companySizeCompatibility: ['medium', 'large'],
    shortDescription: 'Protege tu institución financiera con detección de fraude de IA de vanguardia.',
    longDescription: 'Aprovecha el machine learning para identificar y prevenir transacciones fraudulentas en tiempo real. Nuestras soluciones se adaptan a nuevos patrones de fraude, minimizando pérdidas y protegiendo a tus clientes.',
    features: ['Monitoreo de Transacciones en Tiempo Real', 'Detección de Anomalías', 'Análisis de Comportamiento', 'Soporte para Cumplimiento Normativo'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'finance security',
    hasDemo: false,
  },
  {
    id: 'manufacturing-predictive-maintenance',
    title: 'Mantenimiento Predictivo para Manufactura',
    industry: 'manufacturing',
    serviceType: 'data_analytics',
    companySizeCompatibility: ['large'],
    shortDescription: 'Minimiza el tiempo de inactividad con mantenimiento predictivo impulsado por IA.',
    longDescription: 'Utiliza datos de sensores y algoritmos de IA para predecir fallas de equipos antes de que ocurran. Optimiza los programas de mantenimiento, reduce los costos operativos y mejora la efectividad general del equipo (OEE).',
    features: ['Análisis de Datos de Sensores', 'Reconocimiento de Patrones de Falla', 'Programación Optimizada de Mantenimiento', 'Integración IIoT'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'manufacturing robot',
    hasDemo: true,
  },
  {
    id: 'healthcare-diagnosis-support',
    title: 'Soporte de Diagnóstico con IA para Salud',
    industry: 'healthcare',
    serviceType: 'custom_ai_dev',
    companySizeCompatibility: ['medium', 'large'],
    shortDescription: 'Mejora la precisión diagnóstica con herramientas potenciadas por IA.',
    longDescription: 'Desarrolla soluciones de IA personalizadas para ayudar a los profesionales de la salud a diagnosticar enfermedades de manera más precisa y eficiente. Analiza imágenes médicas, datos de pacientes e investigaciones para proporcionar información valiosa.',
    features: ['Análisis de Imágenes Médicas', 'Soporte para Decisiones Clínicas', 'Planificación de Tratamiento Personalizado', 'Soluciones Cumpliendo HIPAA'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'healthcare technology',
    hasDemo: false,
  },
];

// Function to allow external updates, if needed by actions.
// This approach is for prototype purposes. In production, use a database.
export function updateSolutionsData(newSolutions: Service[]): void {
  mockServices = newSolutions;
}
