
'use client';

import React, { useState, useMemo } from 'react';
import ServiceCard from './ServiceCard';
import { mockServices } from '@/lib/data/solutions';
import type { Service } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { INDUSTRIES, SERVICE_TYPES, COMPANY_SIZES } from '@/lib/constants';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const SolutionsShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [companySizeFilter, setCompanySizeFilter] = useState('all');

  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearchTerm = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || service.industry === industryFilter;
      const matchesServiceType = serviceTypeFilter === 'all' || service.serviceType === serviceTypeFilter;
      const matchesCompanySize = companySizeFilter === 'all' || service.companySizeCompatibility.includes(companySizeFilter);
      return matchesSearchTerm && matchesIndustry && matchesServiceType && matchesCompanySize;
    });
  }, [searchTerm, industryFilter, serviceTypeFilter, companySizeFilter]);

  return (
    <div className="space-y-12">
      <PageTitle
        title="Explora Nuestras Soluciones de IA y Automatización"
        subtitle="Descubre cómo Robotipa puede transformar tu negocio con soluciones a medida para diversas industrias y necesidades."
      />

      <Card className="p-6 shadow-lg bg-card">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar soluciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background text-foreground focus:ring-accent"
                aria-label="Buscar soluciones"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="bg-background text-foreground focus:ring-accent" aria-label="Filtrar por industria">
                <SelectValue placeholder="Filtrar por Industria" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all">Todas las Industrias</SelectItem>
                {INDUSTRIES.map(industry => (
                  <SelectItem key={industry.value} value={industry.value}>{industry.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
              <SelectTrigger className="bg-background text-foreground focus:ring-accent" aria-label="Filtrar por tipo de servicio">
                <SelectValue placeholder="Filtrar por Tipo de Servicio" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all">Todos los Tipos de Servicio</SelectItem>
                {SERVICE_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={companySizeFilter} onValueChange={setCompanySizeFilter}>
              <SelectTrigger className="bg-background text-foreground focus:ring-accent" aria-label="Filtrar por tamaño de empresa">
                <SelectValue placeholder="Filtrar por Tamaño de Empresa" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all">Todos los Tamaños de Empresa</SelectItem>
                {COMPANY_SIZES.map(size => (
                  <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
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
          <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl text-primary-foreground/80">Ninguna solución coincide con tus filtros actuales.</p>
          <p className="text-muted-foreground">Intenta ajustar tu búsqueda o criterios de filtro.</p>
        </div>
      )}

      <Card className="mt-16 p-6 bg-card shadow-lg">
         <CardContent className="p-0 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full md:w-1/3 h-48 md:h-64">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Recomendaciones IA" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-md"
              data-ai-hint="ai brain network"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-headline font-semibold text-card-foreground mb-3">Recomendaciones Personalizadas</h3>
            <p className="text-card-foreground/80 mb-4">
              Nuestra IA puede ayudarte a encontrar la solución perfecta. Cuéntanos un poco sobre tus necesidades y te proporcionaremos sugerencias personalizadas.
              (Esta funcionalidad es ilustrativa y se desarrollará más adelante basándose en los datos de interacción del usuario).
            </p>
            <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Obtener Recomendaciones de IA (Próximamente)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolutionsShowcase;
