"use client";

import React from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    company: "TechNova",
    challenge: "Automatización de procesos manuales",
    solution: "Implementación de flujos de trabajo con IA",
    impact: "Reducción del 45% en tiempos operativos",
  },
  {
    company: "AgroVerde",
    challenge: "Falta de visibilidad en la cadena de suministro",
    solution: "Dashboard en tiempo real conectado a sensores IoT",
    impact: "Mejora del 60% en la toma de decisiones logísticas",
  },
  {
    company: "EduPlus",
    challenge: "Bajo compromiso de estudiantes en línea",
    solution: "Plataforma personalizada de seguimiento y análisis",
    impact: "Aumento del 35% en la retención estudiantil",
  },
];

const SuccessCasesSection = () => {
  return (
    <section
      id="casos"
      className="py-20 border-t border-lego-secondary bg-lego-primary/5"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Casos de Éxito
          </h2>
          <p className="mt-2 text-lego-accent/80">
            Historias reales de cómo nuestras soluciones han transformado
            negocios.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-lego-secondary/30 bg-lego-primary/10 p-6 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 text-lego-accent mb-2">
                <Briefcase className="w-5 h-5" />
                <span className="font-semibold">{item.company}</span>
              </div>
              <p className="text-white font-medium mb-1">Desafío:</p>
              <p className="text-lego-accent/80 text-sm mb-2">
                {item.challenge}
              </p>
              <p className="text-white font-medium mb-1">Solución:</p>
              <p className="text-lego-accent/80 text-sm mb-2">
                {item.solution}
              </p>
              <p className="text-white font-medium mb-1">Impacto:</p>
              <p className="text-lego-accent/80 text-sm">{item.impact}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="hover:bg-lego-accent hover:text-white"
          >
            Ver más casos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesSection;
