// src/lib/data/homepageContent.ts
export type HomepageContent = {
  welcomeTitle: string;
  welcomeSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  mainImageUrl: string;
  mainImageAlt: string;
  mainImageAiHint: string;
};

export let homepageContent: HomepageContent = {
  welcomeTitle: "Bienvenido a Robotipa",
  welcomeSubtitle: "Transformamos negocios con Inteligencia Artificial y Automatización.",
  missionTitle: "Nuestra Misión",
  missionText: "Impulsar la transformación digital de las empresas a través de soluciones innovadoras de inteligencia artificial y automatización, optimizando procesos y generando un crecimiento sostenible.",
  visionTitle: "Nuestra Visión",
  visionText: "Ser líderes en la revolución tecnológica, creando un futuro donde la inteligencia artificial y la automatización trabajen en sinergia con el talento humano para alcanzar niveles de eficiencia y creatividad sin precedentes.",
  mainImageUrl: "https://placehold.co/600x450.png",
  mainImageAlt: "Innovación y Tecnología en Robotipa",
  mainImageAiHint: "innovacion tecnologia futuro",
};
