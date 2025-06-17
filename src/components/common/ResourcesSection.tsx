"use client";

import React from "react";
import { Download, FileText } from "lucide-react";

const resources = [
  {
    title: "Guía de Automatización para PYMES",
    description:
      "Aprende cómo automatizar procesos clave en tu negocio con esta guía práctica.",
    link: "/downloads/guia-automatizacion.pdf",
  },
  {
    title: "Checklist de Ciberseguridad",
    description:
      "Asegura tu infraestructura tecnológica con este checklist esencial.",
    link: "/downloads/checklist-ciberseguridad.pdf",
  },
  {
    title: "Plantilla de ROI para Proyectos de IA",
    description:
      "Calcula fácilmente el retorno de inversión estimado de tus iniciativas con IA.",
    link: "/downloads/plantilla-roi.xlsx",
  },
];

const ResourcesSection = () => {
  return (
    <section
      id="recursos"
      className="py-20 border-t border-lego-secondary bg-lego-primary/5"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Recursos Descargables
          </h2>
          <p className="mt-2 text-lego-accent/80 max-w-xl mx-auto">
            Accede a guías, plantillas y herramientas diseñadas para impulsar tu
            transformación digital.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl border border-lego-secondary p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-lego-accent" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-lego-accent/80 text-sm mb-3">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    download
                    className="inline-flex items-center gap-2 text-lego-accent hover:text-white text-sm font-medium"
                  >
                    Descargar <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
