"use client";

import React, { useState, useMemo } from "react";
import ServiceCard from "./ServiceCard";
import { mockServices } from "@/lib/data/solutions";
import type { Service } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { INDUSTRIES, SERVICE_TYPES, COMPANY_SIZES } from "@/lib/constants";
import PageTitle from "@/components/common/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const SolutionsShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [companySizeFilter, setCompanySizeFilter] = useState("all");

  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearchTerm =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        industryFilter === "all" || service.industry === industryFilter;
      const matchesServiceType =
        serviceTypeFilter === "all" ||
        service.serviceType === serviceTypeFilter;
      const matchesCompanySize =
        companySizeFilter === "all" ||
        service.companySizeCompatibility.includes(companySizeFilter);
      return (
        matchesSearchTerm &&
        matchesIndustry &&
        matchesServiceType &&
        matchesCompanySize
      );
    });
  }, [searchTerm, industryFilter, serviceTypeFilter, companySizeFilter]);

  return (
    <div className="space-y-12">
      <PageTitle
        title="Explora Nuestras Soluciones de IA y Automatización"
        subtitle="Descubre cómo Robotipa puede transformar tu negocio con soluciones a medida para diversas industrias y necesidades."
      />

      <Card className="p-6 shadow-lg bg-lego-secondary/10 backdrop-blur-sm border border-lego-secondary/20">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lego-secondary/60" />
              <Input
                type="text"
                placeholder="Buscar soluciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-lego-primary/5 text-lego-secondary focus:ring-lego-accent"
                aria-label="Buscar soluciones"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger
                className="bg-lego-primary/5 text-lego-secondary focus:ring-lego-accent"
                aria-label="Filtrar por industria"
              >
                <SelectValue placeholder="Filtrar por Industria" />
              </SelectTrigger>
              <SelectContent className="bg-lego-secondary/10 text-lego-secondary">
                <SelectItem value="all">Todas las Industrias</SelectItem>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={serviceTypeFilter}
              onValueChange={setServiceTypeFilter}
            >
              <SelectTrigger
                className="bg-lego-primary/5 text-lego-secondary focus:ring-lego-accent"
                aria-label="Filtrar por tipo de servicio"
              >
                <SelectValue placeholder="Filtrar por Tipo de Servicio" />
              </SelectTrigger>
              <SelectContent className="bg-lego-secondary/10 text-lego-secondary">
                <SelectItem value="all">Todos los Tipos de Servicio</SelectItem>
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={companySizeFilter}
              onValueChange={setCompanySizeFilter}
            >
              <SelectTrigger
                className="bg-lego-primary/5 text-lego-secondary focus:ring-lego-accent"
                aria-label="Filtrar por tamaño de empresa"
              >
                <SelectValue placeholder="Filtrar por Tamaño de Empresa" />
              </SelectTrigger>
              <SelectContent className="bg-lego-secondary/10 text-lego-secondary">
                <SelectItem value="all">
                  Todos los Tamaños de Empresa
                </SelectItem>
                {COMPANY_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <SlidersHorizontal className="mx-auto h-12 w-12 text-lego-secondary/40 mb-4" />
          <p className="text-xl text-lego-secondary">
            Ninguna solución coincide con tus filtros actuales.
          </p>
          <p className="text-lego-secondary/70">
            Intenta ajustar tu búsqueda o criterios de filtro.
          </p>
        </div>
      )}
    </div>
  );
};

export default SolutionsShowcase;
