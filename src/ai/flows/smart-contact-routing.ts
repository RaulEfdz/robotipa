'use server';

/**
 * @fileOverview AI-powered contact routing flow.
 *
 * - smartContactRouting - A function that routes user inquiries to the appropriate expert or resource.
 * - SmartContactRoutingInput - The input type for the smartContactRouting function.
 * - SmartContactRoutingOutput - The return type for the smartContactRouting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartContactRoutingInputSchema = z.object({
  message: z.string().describe('El mensaje o consulta del usuario.'),
});
export type SmartContactRoutingInput = z.infer<typeof SmartContactRoutingInputSchema>;

const SmartContactRoutingOutputSchema = z.object({
  route: z.string().describe('La ruta recomendada para la consulta del usuario (ej: ventas, soporte, nombre del experto, nombre del recurso).'),
  reason: z.string().describe('El razonamiento detrás de la ruta recomendada.'),
});
export type SmartContactRoutingOutput = z.infer<typeof SmartContactRoutingOutputSchema>;

export async function smartContactRouting(input: SmartContactRoutingInput): Promise<SmartContactRoutingOutput> {
  return smartContactRoutingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartContactRoutingPrompt',
  input: {schema: SmartContactRoutingInputSchema},
  output: {schema: SmartContactRoutingOutputSchema},
  prompt: `You are an AI assistant tasked with routing user inquiries to the most appropriate expert or resource.

  Based on the user's message, determine the best route and explain your reasoning.

  Message: {{{message}}}
  \n  Respond in the following format:
  {
    "route": "", // e.g., sales, support, expert name, resource name
    "reason": ""  // Explanation of why this route is recommended
  }`,
});

const smartContactRoutingFlow = ai.defineFlow(
  {
    name: 'smartContactRoutingFlow',
    inputSchema: SmartContactRoutingInputSchema,
    outputSchema: SmartContactRoutingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
