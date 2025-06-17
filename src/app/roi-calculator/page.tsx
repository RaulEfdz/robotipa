'use client';

import React, { useState } from 'react';
import RoiCalculatorForm from '@/components/roi/RoiCalculatorForm';
import RoiResultsDisplay from '@/components/roi/RoiResultsDisplay';
import SectionWrapper from '@/components/common/SectionWrapper';
import type { ROICalculatorOutput } from '@/ai/flows/roi-calculator';
import PageTitle from '@/components/common/PageTitle';

export default function RoiCalculatorPage() {
  const [results, setResults] = useState<ROICalculatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleFormSubmitStart = () => {
    setIsLoading(true);
    setResults(null); 
  };

  const handleResults = (data: ROICalculatorOutput | null) => {
    setResults(data);
    setIsLoading(false);
  };
  
  return (
    <SectionWrapper>
      <PageTitle
        title="Calculadora de ROI con IA"
        subtitle="Completa los detalles de tu empresa para recibir una estimación generada por IA de tu potencial Retorno de Inversión con las soluciones de Robotipa, incluyendo análisis de riesgo y una hoja de ruta de implementación."
      />
      <RoiCalculatorForm onResults={handleResults} onFormSubmitStart={handleFormSubmitStart} />
      {(isLoading || results) && <RoiResultsDisplay results={results} loading={isLoading && !results} />}
    </SectionWrapper>
  );
}
