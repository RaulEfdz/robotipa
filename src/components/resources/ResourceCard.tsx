import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Lock, SearchCode } from 'lucide-react';
import type { Resource } from '@/types';

interface ResourceCardProps {
  resource: Resource;
  onDownloadClick: (resource: Resource) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownloadClick }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="relative w-full h-48">
        <Image
          src={resource.image}
          alt={resource.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={resource.aiHint}
        />
        <Badge variant="outline" className="absolute top-2 left-2 bg-primary text-primary-foreground border-primary-foreground/50">{resource.type}</Badge>
         {resource.isGated && <Badge variant="destructive" className="absolute top-2 right-2 bg-accent text-accent-foreground"><Lock className="mr-1 h-3 w-3" /> Protegido</Badge>}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-headline text-card-foreground">{resource.title}</CardTitle>
        <CardDescription className="text-card-foreground/80 text-sm">{resource.subcategory} - {resource.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-card-foreground/90">{resource.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 group"
          onClick={() => onDownloadClick(resource)}
        >
          {resource.isGated ? <Lock className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
          {resource.isGated ? 'Desbloquear y Descargar' : 'Descargar Ahora'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
