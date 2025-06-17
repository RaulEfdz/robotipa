
// This is an AI-powered ROI calculator flow that takes company details as input and returns ROI projections, risk analysis, and a roadmap.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ROICalculatorInputSchema = z.object({
  companySize: z
    .string()
    .describe('El tamaño de la empresa (ej: pequeña, mediana, grande).'),
  automationLevel: z
    .string()
    .describe('El nivel actual de automatización en la empresa (ej: bajo, medio, alto).'),
  errorRates: z
    .string()
    .describe('Las tasas de error actuales en los procesos de la empresa (ej: bajo, medio, alto).'),
  costs: z.string().describe('Los costos operativos actuales de la empresa.'),
});

export type ROICalculatorInput = z.infer<typeof ROICalculatorInputSchema>;

const ROICalculatorOutputSchema = z.object({
  roiProjections: z.object({
    oneYear: z.string().describe('La proyección de ROI para 1 año.'),
    threeYears: z.string().describe('La proyección de ROI para 3 años.'),
    fiveYears: z.string().describe('La proyección de ROI para 5 años.'),
  }),
  riskAnalysis: z.string().describe('El análisis de riesgo para implementar soluciones Robotipa.'),
  roadmap: z
    .string()
    .describe('Una hoja de ruta para implementar soluciones Robotipa en la empresa.'),
});

export type ROICalculatorOutput = z.infer<typeof ROICalculatorOutputSchema>;

export async function calculateROI(input: ROICalculatorInput): Promise<ROICalculatorOutput> {
  return calculateROIFlow(input);
}

const calculateROIPrompt = ai.definePrompt({
  name: 'calculateROIPrompt',
  input: {schema: ROICalculatorInputSchema},
  output: {schema: ROICalculatorOutputSchema},
  prompt: `You are an expert in calculating the ROI for implementing AI and automation solutions in companies.

  Based on the company details provided, generate ROI projections for 1, 3, and 5 years, a risk analysis, and a roadmap for implementing Robotipa's solutions.

  Company Size: {{{companySize}}}
  Automation Level: {{{automationLevel}}}
  Error Rates: {{{errorRates}}}
  Costs: {{{costs}}}

  Return the ROI projections, risk analysis, and roadmap in the following JSON format:
  {{json ROICalculatorOutputSchema}}
  `,
});

const calculateROIFlow = ai.defineFlow(
  {
    name: 'calculateROIFlow',
    inputSchema: ROICalculatorInputSchema,
    outputSchema: ROICalculatorOutputSchema,
  },
  async input => {
    const {output} = await calculateROIPrompt(input);
    return output!;
  }
);
