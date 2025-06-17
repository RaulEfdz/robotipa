"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Ana Rodríguez",
    role: "Gerente de Proyectos, GreenLab",
    image: "/testimonials/ana.jpg",
    feedback:
      "Gracias a sus soluciones pudimos automatizar nuestros procesos internos. El equipo fue ágil, transparente y siempre dispuesto a apoyar.",
  },
  {
    name: "Carlos Méndez",
    role: "CTO, Jardinísimo",
    image: "/testimonials/carlos.jpg",
    feedback:
      "La integración con nuestro ecommerce fue impecable. Ahora manejamos todo el contenido con facilidad desde un solo lugar.",
  },
  {
    name: "María González",
    role: "Directora de Marketing, Coempresa",
    image: "/testimonials/maria.jpg",
    feedback:
      "Nos ayudaron a lanzar en tiempo récord. El diseño y la funcionalidad superaron nuestras expectativas.",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonios"
      className="py-20 bg-background border-t border-lego-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Testimonios
          </h2>
          <p className="text-lego-accent/80 max-w-2xl mx-auto">
            Lo que dicen nuestros clientes sobre nuestros servicios y
            soluciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-lego-secondary/10 p-6 rounded-xl border border-lego-secondary/20 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">
                    {t.name}
                  </h4>
                  <p className="text-lego-accent/80 text-sm">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-white/90 italic mb-2">
                "{t.feedback}"
              </p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
