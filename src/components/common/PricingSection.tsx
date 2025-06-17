"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Building2, Rocket } from "lucide-react";

const plans = [
  {
    title: "Start",
    description: "Ideal para emprendedores y proyectos personales.",
    price: "$750+",
    icon: BadgeCheck,
    features: [
      "1 solución integrada",
      "Diseño personalizado",
      "Asesoría inicial",
    ],
  },
  {
    title: "Pro",
    description: "Para negocios en crecimiento que necesitan eficiencia.",
    price: "$1,500+",
    icon: Rocket,
    featured: true,
    features: [
      "Hasta 3 soluciones integradas",
      "Automatizaciones inteligentes",
      "Dashboard personalizado",
      "Soporte prioritario",
    ],
  },
  {
    title: "Enterprise",
    description: "Soluciones avanzadas y escalables para empresas.",
    price: "A cotizar",
    icon: Building2,
    features: [
      "Soluciones a medida",
      "Integraciones complejas",
      "Consultoría técnica dedicada",
      "Escalabilidad garantizada",
    ],
  },
];

const PricingSection = () => {
  return (
    <section
      id="precios"
      className="py-20 bg-lego-primary/5 backdrop-blur-sm border-t border-lego-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Planes de Soluciones
        </h2>
        <p className="text-lg text-lego-accent/80 mb-12 text-center max-w-2xl mx-auto">
          Escoge el plan que se adapta a tu visión. Todos los planes incluyen
          asesoría inicial y enfoque centrado en resultados.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`flex flex-col justify-between p-6 rounded-xl border shadow transition hover:shadow-lg bg-lego-primary/80 text-white ${
                plan.featured
                  ? "border-lego-accent shadow-xl"
                  : "border-lego-secondary/30"
              }`}
            >
              <div>
                <plan.icon className="w-8 h-8 mb-3 text-lego-accent" />
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <p className="text-sm text-lego-accent/80 mb-4">
                  {plan.description}
                </p>
                <p className="text-2xl font-bold mb-4">{plan.price}</p>
                <ul className="text-sm space-y-1 mb-6">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="before:content-['•'] before:text-lego-accent before:mr-2"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                className="hover:bg-lego-accent hover:text-white"
              >
                Solicitar Cotización
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
