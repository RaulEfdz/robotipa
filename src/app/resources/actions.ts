
'use server';

import { resourceRecommendation, type ResourceRecommendationInput, type ResourceRecommendationOutput } from '@/ai/flows/resource-recommendation';
import { z } from 'zod';

const RecommendationRequestSchema = z.object({
  industry: z.string().min(1, "La industria es obligatoria."),
  companySize: z.string().min(1, "El tamaño de la empresa es obligatorio."),
});

export type RecommendationFormState = {
  recommendations: ResourceRecommendationOutput['recommendations'] | null;
  error: string | null;
  message: string | null;
};

export async function getPersonalizedRecommendations(
  prevState: RecommendationFormState,
  formData: FormData
): Promise<RecommendationFormState> {
  try {
    const rawFormData = {
      industry: formData.get('industry'),
      companySize: formData.get('companySize'),
    };

    const validatedFields = RecommendationRequestSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        recommendations: null,
        error: "Falló la validación. Por favor revisa tus datos.",
        message: validatedFields.error.flatten().fieldErrors ? JSON.stringify(validatedFields.error.flatten().fieldErrors) : "Error de Validación"
      };
    }
    
    const inputData: ResourceRecommendationInput = validatedFields.data;
    const result = await resourceRecommendation(inputData);

    if (!result || !result.recommendations) {
      return { recommendations: null, error: 'La recomendación por IA falló. Por favor inténtalo de nuevo.', message: null };
    }

    return { recommendations: result.recommendations, error: null, message: '¡Recomendaciones cargadas!' };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Ocurrió un error desconocido.';
    return { recommendations: null, error, message: null };
  }
}
