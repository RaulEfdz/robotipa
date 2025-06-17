
'use server';

import { smartContactRouting, type SmartContactRoutingInput, type SmartContactRoutingOutput } from '@/ai/flows/smart-contact-routing';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio."),
  email: z.string().email("Dirección de correo electrónico inválida."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactFormState = {
  data: SmartContactRoutingOutput | null;
  error: string | null;
  message: string | null; 
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  }
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const rawFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const validatedFields = ContactFormSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        data: null,
        error: "Falló la validación. Por favor revisa tus datos.",
        message: "Por favor corrige los errores a continuación.",
        fieldErrors,
      };
    }
    
    const inputData: SmartContactRoutingInput = { message: validatedFields.data.message };
    console.log("Envío de formulario de contacto de:", validatedFields.data.name, validatedFields.data.email);

    const result = await smartContactRouting(inputData);

    if (!result) {
      return { data: null, error: 'El enrutamiento por IA falló. Por favor inténtalo de nuevo o contáctanos directamente.', message: null };
    }

    return { data: result, error: null, message: '¡Mensaje enviado con éxito! Lo enrutaremos apropiadamente.' };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Ocurrió un error desconocido.';
    return { data: null, error, message: null };
  }
}
