import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/email/ContactFormEmail';

// Valores de ejemplo - Reemplazar con tus propias credenciales cuando estés listo
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'tu_api_key_aqui';
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'contacto@robotipa.com';

// Inicializar Resend con la clave de API
const resend = new Resend(RESEND_API_KEY);

export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor, ingresa un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  phone: z.string().optional(),
  company: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validar los datos
    const validatedData = contactFormSchema.parse(formData);
    
    // Configurar y enviar el email
    await resend.emails.send({
      from: 'Robotipa <contacto@robotipa.com>',
      to: process.env.EMAIL_RECIPIENT || 'contacto@robotipa.com',
      subject: 'Nuevo contacto desde Robotipa',
      text: `Nuevo contacto:
      Nombre: ${validatedData.name}
      Email: ${validatedData.email}
      Teléfono: ${validatedData.phone || 'No proporcionado'}
      Empresa: ${validatedData.company || 'No proporcionada'}
      Mensaje: ${validatedData.message}`
    });
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    } else if (error instanceof Error) {
      console.error('Error al enviar el email:', error);
      return { 
        success: false, 
        message: 'Error al enviar el email. Por favor, inténtalo de nuevo.' 
      };
    }
    console.error('Error en el formulario:', error);
    return { 
      success: false, 
      message: 'Error al procesar el formulario. Por favor, inténtalo de nuevo.' 
    };
  }
}
