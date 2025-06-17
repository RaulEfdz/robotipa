import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Service } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="relative w-full h-48">
        <Image
          src={service.image}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={service.aiHint}
        />
        {service.hasDemo && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground">
            <CheckCircle className="mr-1 h-4 w-4" /> Demo Disponible
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-headline text-card-foreground">{service.title}</CardTitle>
        <CardDescription className="text-card-foreground/80">{service.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm text-accent hover:text-accent-foreground">Saber Más</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-card-foreground/90 mb-2">{service.longDescription}</p>
              <h4 className="font-semibold text-card-foreground mb-1">Características Clave:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-card-foreground/90">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground group">
          Solicitar Información <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
