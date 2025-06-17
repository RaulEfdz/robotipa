
'use client';

import React, { useState, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import LeadGenerationForm from './LeadGenerationForm';
import { mockResources } from '@/lib/data/resources';
import type { Resource } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormState, useFormStatus } from 'react-dom';
import { getPersonalizedRecommendations, type RecommendationFormState } from '@/app/resources/actions';
import { INDUSTRIES, COMPANY_SIZES } from '@/lib/constants';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

const resourceCategories = ['Todos', 'Industria', 'Tecnología', 'Estrategia'];
const resourceTypes = ['Todos', 'Guía', 'Informe Técnico', 'Caso de Estudio', 'Webinar'];


function RecommendationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Obtener Recomendaciones IA
    </Button>
  );
}


const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showAISearch, setShowAISearch] = useState(false);

  const initialState: RecommendationFormState = { recommendations: null, error: null, message: null };
  const [recoState, recoFormAction] = useFormState(getPersonalizedRecommendations, initialState);


  const filteredResources = useMemo(() => {
    return mockResources.filter((resource) => {
      const matchesCategory = activeTab === 'Todos' || resource.category === activeTab;
      const matchesSearchTerm = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'Todos' || resource.type === typeFilter;
      return matchesCategory && matchesSearchTerm && matchesType;
    });
  }, [activeTab, searchTerm, typeFilter]);

  const handleDownloadClick = (resource: Resource) => {
    if (resource.isGated) {
      setSelectedResource(resource);
      setIsModalOpen(true);
    } else {
      alert(`Descargando ${resource.title} (descarga directa - implementar lógica real)`);
      console.log("Descargando:", resource.downloadUrl);
    }
  };

  const handleLeadFormSubmitSuccess = (data: any) => {
    setIsModalOpen(false);
    alert(`Gracias, ${data.name}! Descargando ${selectedResource?.title}. (implementar descarga real)`);
    if (selectedResource) {
       console.log("Descargando:", selectedResource.downloadUrl);
    }
    setSelectedResource(null);
  };

  return (
    <div className="space-y-12">
      <PageTitle
        title="Biblioteca de Recursos"
        subtitle="Explora nuestra colección de guías, informes técnicos, casos de estudio y webinars para profundizar tu conocimiento sobre IA y automatización."
      />

      <Card className="p-4 md:p-6 shadow-lg bg-card">
        <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-background text-foreground focus:ring-accent"
              aria-label="Buscar recursos"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-background text-foreground focus:ring-accent" aria-label="Filtrar por tipo">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filtrar por Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              {resourceTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowAISearch(!showAISearch)} className="w-full md:w-auto hover:bg-accent hover:text-accent-foreground">
            <Lightbulb className="h-4 w-4 mr-2" /> Recomendaciones IA
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-background/50">
            {resourceCategories.map(category => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        </CardContent>
      </Card>
      
      {showAISearch && (
        <Card className="p-6 mb-8 shadow-lg bg-card border border-accent">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-card-foreground flex items-center">
              <Lightbulb className="h-6 w-6 mr-2 text-accent" /> Recomendaciones con IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={recoFormAction} className="space-y-4">
              <p className="text-sm text-card-foreground/80">Cuéntanos sobre tu empresa para obtener sugerencias de recursos personalizadas.</p>
              <Select name="industry" required>
                <SelectTrigger className="bg-background text-foreground" aria-label="Selecciona tu industria">
                  <SelectValue placeholder="Selecciona tu industria" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  {INDUSTRIES.map(industry => (
                    <SelectItem key={industry.value} value={industry.value}>{industry.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="companySize" required>
                <SelectTrigger className="bg-background text-foreground" aria-label="Selecciona el tamaño de tu empresa">
                  <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  {COMPANY_SIZES.map(size => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RecommendationSubmitButton />
               {recoState.error && <Alert variant="destructive"><AlertDescription>{recoState.error}</AlertDescription></Alert>}
            </form>
            {recoState.recommendations && recoState.recommendations.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-semibold text-card-foreground">Aquí tienes algunas recomendaciones para ti:</h4>
                <ul className="list-disc list-inside text-sm text-card-foreground/90 space-y-1">
                {recoState.recommendations.map(rec => (
                    <li key={rec.link}>
                      <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{rec.title}</a>
                      : {rec.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {recoState.recommendations && recoState.recommendations.length === 0 && (
                 <p className="mt-4 text-sm text-center text-card-foreground/80">No se encontraron recomendaciones específicas basadas en tu selección. Intenta ajustar o explora todos los recursos.</p>
            )}
          </CardContent>
        </Card>
      )}


      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} onDownloadClick={handleDownloadClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
           <Image src="https://placehold.co/300x200.png" alt="No se encontraron recursos" width={150} height={100} className="mx-auto mb-4 opacity-50" data-ai-hint="empty box" />
          <p className="text-xl text-primary-foreground/80">Ningún recurso coincide con tus filtros actuales.</p>
          <p className="text-muted-foreground">Prueba un término de búsqueda diferente o amplía tus filtros.</p>
        </div>
      )}

      {selectedResource && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-card text-card-foreground sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl text-card-foreground">{selectedResource.title}</DialogTitle>
              <DialogDescription className="text-card-foreground/80">
                Accede a este recurso exclusivo proporcionando tus detalles.
              </DialogDescription>
            </DialogHeader>
            <LeadGenerationForm
              resourceTitle={selectedResource.title}
              onSubmitSuccess={handleLeadFormSubmitSuccess}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ResourceLibrary;
