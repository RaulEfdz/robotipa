
'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitROICalculator, type ROICalculatorFormState } from '@/app/roi-calculator/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPANY_SIZES, AUTOMATION_LEVELS, ERROR_RATES } from '@/lib/constants';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from 'lucide-react';
import type { ROICalculatorOutput } from '@/ai/flows/roi-calculator';


interface RoiCalculatorFormProps {
  onResults: (results: ROICalculatorOutput | null) => void;
  onFormSubmitStart: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Calcular ROI
    </Button>
  );
}

const RoiCalculatorForm: React.FC<RoiCalculatorFormProps> = ({ onResults, onFormSubmitStart }) => {
  const initialState: ROICalculatorFormState = { data: null, error: null, message: null };
  
  const wrappedFormAction = async (prevState: ROICalculatorFormState, formData: FormData): Promise<ROICalculatorFormState> => {
    onFormSubmitStart();
    const resultState = await submitROICalculator(prevState, formData);
    return resultState;
  };
  
  const [state, formAction] = useFormState(wrappedFormAction, initialState);

  React.useEffect(() => {
    if (state.data) {
      onResults(state.data);
    } else {
      onResults(null); 
    }
  }, [state.data, state.error, onResults]);
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-card-foreground">Calculadora de ROI con IA</CardTitle>
        <CardDescription className="text-center text-card-foreground/80">
          Estima el potencial retorno de inversión implementando las soluciones de IA y automatización de Robotipa.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          {state.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error} {state.message && typeof state.message === 'string' && state.message.length < 200 ? `Detalles: ${state.message}` : ''}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="companySize" className="text-card-foreground">Tamaño de la Empresa</Label>
            <Select name="companySize" required>
              <SelectTrigger id="companySize" className="bg-background text-foreground" aria-label="Selecciona el tamaño de la empresa">
                <SelectValue placeholder="Selecciona el tamaño de la empresa" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {COMPANY_SIZES.map(size => (
                  <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="automationLevel" className="text-card-foreground">Nivel Actual de Automatización</Label>
            <Select name="automationLevel" required>
              <SelectTrigger id="automationLevel" className="bg-background text-foreground" aria-label="Selecciona el nivel de automatización">
                <SelectValue placeholder="Selecciona el nivel de automatización" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {AUTOMATION_LEVELS.map(level => (
                  <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="errorRates" className="text-card-foreground">Tasas de Error Actuales en Procesos</Label>
            <Select name="errorRates" required>
              <SelectTrigger id="errorRates" className="bg-background text-foreground" aria-label="Selecciona las tasas de error">
                <SelectValue placeholder="Selecciona las tasas de error" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {ERROR_RATES.map(rate => (
                  <SelectItem key={rate.value} value={rate.value}>{rate.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="costs" className="text-card-foreground">Costos Operativos Anuales Actuales (ej: 500000)</Label>
            <Input
              id="costs"
              name="costs"
              type="number"
              placeholder="ej: 500000"
              required
              className="bg-background text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
};

export default RoiCalculatorForm;
