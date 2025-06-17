
// src/lib/constants.ts
export const INDUSTRIES = [
  { value: "retail", label: "Minorista" },
  { value: "finance", label: "Finanzas" },
  { value: "manufacturing", label: "Manufactura" },
  { value: "healthcare", label: "Salud" },
  { value: "technology", label: "Tecnología" },
  { value: "services", label: "Servicios Profesionales" },
  { value: "energy", label: "Energía" },
  { value: "telecom", label: "Telecomunicaciones" },
  { value: "education", label: "Educación" },
  { value: "other", label: "Otro" },
];

export const SERVICE_TYPES = [
  { value: "automation", label: "Soluciones de Automatización" },
  { value: "ai_consulting", label: "Consultoría de IA" },
  { value: "data_analytics", label: "Análisis de Datos" },
  { value: "custom_ai_dev", label: "Desarrollo de IA a Medida" },
  { value: "rpa", label: "Automatización Robótica de Procesos (RPA)" },
  { value: "ml_solutions", label: "Soluciones de Machine Learning" },
  { value: "nlp_solutions", label: "Soluciones de Procesamiento de Lenguaje Natural (PNL)" },
  { value: "other", label: "Otro" },
];

export const COMPANY_SIZES = [
  { value: "small", label: "Pequeña (1-50 empleados)" },
  { value: "medium", label: "Mediana (51-500 empleados)" },
  { value: "large", label: "Grande (501+ empleados)" },
  { value: "startup", label: "Startup (<10 empleados)"},
  { value: "enterprise", label: "Corporativo (5000+ empleados)"}
];

export const AUTOMATION_LEVELS = [
  { value: "low", label: "Bajo" },
  { value: "medium", label: "Medio" },
  { value: "high", label: "Alto" },
  { value: "none", label: "Ninguno" },
  { value: "experimental", label: "Experimental" },
];

export const ERROR_RATES = [
  { value: "low", label: "Bajo (<5%)" },
  { value: "medium", label: "Medio (5-15%)" },
  { value: "high", label: "Alto (>15%)" },
  { value: "unknown", label: "Desconocido" },
];
