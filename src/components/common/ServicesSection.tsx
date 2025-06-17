"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const services = [
  {
    title: "Automatización de Procesos",
    image: "/images/automation.jpg",
    shortDescription: "Optimiza tus operaciones con soluciones inteligentes.",
    longDescription:
      "Creamos flujos de trabajo automatizados para mejorar la eficiencia operativa de tu empresa.",
    features: [
      "Integración con tus sistemas actuales",
      "Ahorro de tiempo y recursos",
      "Reducción de errores humanos",
    ],
    hasDemo: true,
  },
  {
    title: "Dashboards Personalizados",
    image: "/images/dashboard.jpg",
    shortDescription: "Visualiza tus datos en tiempo real.",
    longDescription:
      "Desarrollamos dashboards interactivos adaptados a tus métricas clave.",
    features: [
      "Filtros inteligentes",
      "Diseño responsivo",
      "Actualización automática",
    ],
    hasDemo: false,
  },
  {
    title: "Integraciones API",
    image: "/images/integrations.jpg",
    shortDescription:
      "Conecta tus herramientas y mejora el flujo de información.",
    longDescription:
      "Creamos integraciones robustas con APIs de terceros para centralizar tu operación.",
    features: [
      "Conexiones seguras",
      "Monitoreo en tiempo real",
      "Documentación clara",
    ],
    hasDemo: true,
  },
];

const ServicesSection = () => {
  return (
    <section
      id="servicios"
      className="py-20 bg-background border-t border-lego-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Nuestros Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                />
                {service.hasDemo && (
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 bg-accent text-accent-foreground"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> Demo Disponible
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-card-foreground/80">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-card-foreground/90 mb-2">
                  {service.longDescription}
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-card-foreground/90">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent hover:text-accent-foreground group"
                >
                  Solicitar Información{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
