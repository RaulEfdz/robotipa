import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, PlayCircle, BarChart2, Zap, TrendingUp } from 'lucide-react';
import type { SuccessStory } from '@/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';


const StoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => {
  const impactChartData = story.impact
    .filter(item => item.before && item.after)
    .map(item => ({
      name: item.metric,
      before: parseFloat(item.before?.replace('%', '') || '0'),
      after: parseFloat(item.after?.replace('%', '') || '0'),
    }));

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="relative w-full h-56">
        <Image
          src={story.image}
          alt={story.clientName}
          layout="fill"
          objectFit="cover"
          data-ai-hint={story.aiHint}
        />
         <Badge variant="secondary" className="absolute top-2 left-2 bg-primary text-primary-foreground">{story.industry}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-card-foreground">{story.clientName}</CardTitle>
        <CardDescription className="text-card-foreground/80 font-semibold">"{story.challenge}"</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="font-semibold text-card-foreground mb-1 flex items-center"><Zap className="w-4 h-4 mr-2 text-accent" />Solución:</h4>
          <p className="text-sm text-card-foreground/90">{story.solution}</p>
        </div>
        <div>
          <h4 className="font-semibold text-card-foreground mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-accent" />Impacto Cuantificable:</h4>
          <ul className="space-y-1">
            {story.impact.map((item, index) => (
              <li key={index} className="text-sm text-card-foreground/90 flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-accent/70" />
                <strong>{item.metric}:</strong>&nbsp;{item.value}
                {item.before && item.after && ` (De ${item.before} a ${item.after})`}
              </li>
            ))}
          </ul>
        </div>

        {impactChartData.length > 0 && (
          <div className="my-4">
            <h4 className="font-semibold text-card-foreground mb-2">Antes y Después:</h4>
            <ChartContainer config={{
              before: { label: 'Antes', color: 'hsl(var(--muted))' },
              after: { label: 'Después', color: 'hsl(var(--accent))' },
            }} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactChartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} stroke="hsl(var(--card-foreground))" />
                  <YAxis stroke="hsl(var(--card-foreground))"/>
                  <RechartsTooltip cursor={{fill: 'hsl(var(--background))'}} contentStyle={{backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))'}} />
                  <Legend />
                  <Bar dataKey="before" fill="var(--color-before)" radius={4} />
                  <Bar dataKey="after" fill="var(--color-after)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold text-card-foreground mb-1">Tecnologías Utilizadas:</h4>
          <div className="flex flex-wrap gap-2">
            {story.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs border-accent text-accent">{tech}</Badge>
            ))}
          </div>
        </div>
        {story.testimonial && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm italic text-card-foreground/90">"{story.testimonial.text}"</p>
            <p className="text-xs text-right font-medium text-card-foreground/70 mt-1">- {story.testimonial.author}</p>
            {story.testimonial.videoUrl && (
              <Button variant="link" size="sm" className="text-accent hover:text-accent-foreground p-0 mt-1">
                <PlayCircle className="w-4 h-4 mr-1" /> Ver Testimonio
              </Button>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {story.pdfUrl && (
          <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 group">
            <Download className="mr-2 h-4 w-4" /> Descargar Caso de Estudio en PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
