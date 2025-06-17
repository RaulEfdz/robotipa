
'use server';

import { calculateROI, type ROICalculatorInput, type ROICalculatorOutput } from '@/ai/flows/roi-calculator';
import { z } from 'zod';

const ROICalculatorFormSchema = z.object({
  companySize: z.string().min(1, "El tamaño de la empresa es obligatorio."),
  automationLevel: z.string().min(1, "El nivel de automatización es obligatorio."),
  errorRates: z.string().min(1, "Las tasas de error son obligatorias."),
  costs: z.string().min(1, "Los costos actuales son obligatorios."),
});

export type ROICalculatorFormState = {
  data: ROICalculatorOutput | null;
  error: string | null;
  message: string | null;
};

export async function submitROICalculator(
  prevState: ROICalculatorFormState,
  formData: FormData
): Promise<ROICalculatorFormState> {
  try {
    const rawFormData = {
      companySize: formData.get('companySize'),
      automationLevel: formData.get('automationLevel'),
      errorRates: formData.get('errorRates'),
      costs: formData.get('costs'),
    };

    const validatedFields = ROICalculatorFormSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        data: null,
        error: "Falló la validación. Por favor revisa tus datos.",
        message: validatedFields.error.flatten().fieldErrors  ? JSON.stringify(validatedFields.error.flatten().fieldErrors) : "Error de Validación"
      };
    }
    
    const inputData: ROICalculatorInput = validatedFields.data;
    const result = await calculateROI(inputData);

    if (!result) {
      return { data: null, error: 'El cálculo por IA falló. Por favor inténtalo de nuevo.', message: null };
    }

    return { data: result, error: null, message: '¡Cálculo de ROI exitoso!' };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Ocurrió un error desconocido.';
    return { data: null, error, message: null };
  }
}
