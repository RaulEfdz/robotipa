
// 'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized resource recommendations related to AI and automation.
 *
 * - resourceRecommendation - A function that takes industry and company size as input and returns personalized resource recommendations.
 * - ResourceRecommendationInput - The input type for the resourceRecommendation function.
 * - ResourceRecommendationOutput - The return type for the resourceRecommendation function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceRecommendationInputSchema = z.object({
  industry: z
    .string()
    .describe('La industria del visitante del sitio web.'),
  companySize: z
    .string()
    .describe('El tamaño de la empresa del visitante del sitio web.'),
});
export type ResourceRecommendationInput = z.infer<
  typeof ResourceRecommendationInputSchema
>;

const ResourceRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('El título del recurso.'),
      description: z.string().describe('Una breve descripción del recurso.'),
      link: z.string().describe('La URL del recurso.'),
    })
  ).describe('Una lista de recomendaciones de recursos personalizadas.'),
});
export type ResourceRecommendationOutput = z.infer<
  typeof ResourceRecommendationOutputSchema
>;

export async function resourceRecommendation(
  input: ResourceRecommendationInput
): Promise<ResourceRecommendationOutput> {
  return resourceRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resourceRecommendationPrompt',
  input: {schema: ResourceRecommendationInputSchema},
  output: {schema: ResourceRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides personalized resource recommendations related to AI and automation.

  Based on the industry and company size of the website visitor, provide a list of relevant resources.

  Industry: {{{industry}}}
  Company Size: {{{companySize}}}

  Here are some example resources:
  - Title: "AI in Retail: A Comprehensive Guide"
    Description: "Learn how AI is transforming the retail industry and the benefits it can bring to your business."
    Link: "/resources/ai-in-retail"
  - Title: "Automation for Manufacturing: A Step-by-Step Guide"
    Description: "Discover how automation can improve efficiency and reduce costs in the manufacturing industry."
    Link: "/resources/automation-for-manufacturing"
  - Title: "AI and Finance: Reducing Fraud"
    Description: "A whitepaper discussing the applications of AI to reduce fraud in the financial industry."
    Link: "/resources/ai-finance-fraud"

  Return a JSON array of recommendations.
  `,
});

const resourceRecommendationFlow = ai.defineFlow(
  {
    name: 'resourceRecommendationFlow',
    inputSchema: ResourceRecommendationInputSchema,
    outputSchema: ResourceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
