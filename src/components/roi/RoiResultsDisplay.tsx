
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ROICalculatorOutput } from '@/ai/flows/roi-calculator';
import { TrendingUp, ShieldAlert, GitFork, Download, CalendarClock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from "recharts";


interface RoiResultsDisplayProps {
  results: ROICalculatorOutput | null;
  loading?: boolean;
}

const chartConfig = {
  roi: {
    label: "ROI (%)",
    color: "hsl(var(--accent))",
  },
} satisfies Record<string,any>;

const RoiResultsDisplay: React.FC<RoiResultsDisplayProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-xl bg-card">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
        <CardFooter>
           <Skeleton className="h-10 w-1/3 mx-auto" />
        </CardFooter>
      </Card>
    );
  }

  if (!results) {
    return null;
  }
  
  const roiData = [
    { year: "1 Año", roi: parseFloat(results.roiProjections.oneYear.replace('%','')) || 0 },
    { year: "3 Años", roi: parseFloat(results.roiProjections.threeYears.replace('%','')) || 0 },
    { year: "5 Años", roi: parseFloat(results.roiProjections.fiveYears.replace('%','')) || 0 },
  ];


  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 shadow-xl animate-shine bg-card" style={{animationDelay: '0.5s', backgroundSize: '200% auto', backgroundImage: 'linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card) / 0.8) 10%, hsl(var(--card)) 20%, hsl(var(--card)) 100%)'}}>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-card-foreground">Tus Proyecciones de ROI Personalizadas</CardTitle>
        <CardDescription className="text-card-foreground/80">
          Basado en tus datos, aquí tienes una estimación de los beneficios que Robotipa puede aportar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-card-foreground flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-accent" />Proyecciones de ROI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { label: '1 Año', value: results.roiProjections.oneYear },
              { label: '3 Años', value: results.roiProjections.threeYears },
              { label: '5 Años', value: results.roiProjections.fiveYears },
            ].map(proj => (
              <Card key={proj.label} className="p-4 bg-background/30">
                <p className="text-sm font-medium text-muted-foreground flex items-center justify-center"><CalendarClock className="mr-1 h-4 w-4" />{proj.label}</p>
                <p className="text-3xl font-bold text-accent">{proj.value}</p>
              </Card>
            ))}
          </div>
          <div className="mt-6 h-[250px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--card-foreground))"/>
                  <YAxis stroke="hsl(var(--card-foreground))" tickFormatter={(value) => `${value}%`}/>
                  <ChartTooltip 
                    cursor={false} 
                    content={<ChartTooltipContent 
                      indicator="dot" 
                      labelKey="year"
                      nameKey="roi"
                      formatter={(value) => `${value}%`} 
                      className="bg-popover text-popover-foreground"
                    />} 
                  />
                   <Legend />
                  <Bar dataKey="roi" fill="var(--color-roi)" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground flex items-center"><ShieldAlert className="mr-2 h-6 w-6 text-accent" />Análisis de Riesgo</h3>
          <p className="text-sm text-card-foreground/90 whitespace-pre-line">{results.riskAnalysis}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-card-foreground flex items-center"><GitFork className="mr-2 h-6 w-6 text-accent transform rotate-90" />Hoja de Ruta de Implementación</h3>
          <p className="text-sm text-card-foreground/90 whitespace-pre-line">{results.roadmap}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" /> Descargar Informe Completo en PDF (Próximamente)
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoiResultsDisplay;
