import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/email/ContactFormEmail';
import { NextResponse } from 'next/server';

// Valores de ejemplo - Reemplazar con tus propias credenciales cuando estés listo
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'tu_api_key_aqui';
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'contacto@robotipa.com';

const resend = new Resend(RESEND_API_KEY);

export const contactFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Por favor, ingresa un email válido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(formData: FormData): Promise<NextResponse> {
  try {
    // 1. Verificación de Turnstile
    const turnstileToken = formData.get('cf-turnstile-response');

    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, message: 'Verificación anti-spam fallida. Por favor, inténtelo de nuevo.' },
        { status: 400 }
      );
    }

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/api/v1/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });
    
    const outcome = await turnstileResponse.json();
    if (!outcome.success) {
      return NextResponse.json(
        { success: false, message: 'Verificación anti-spam fallida. Por favor, inténtelo de nuevo.' },
        { status: 400 }
      );
    }

    // 2. Validar los datos
    const validatedData = contactFormSchema.parse({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string
    });

    // 3. Configurar y enviar el email
    await resend.emails.send({
      from: 'Robotipa <contacto@robotipa.com>',
      to: EMAIL_RECIPIENT,
      subject: 'Nuevo contacto desde Robotipa',
      text: `Nuevo contacto:
      Nombre: ${validatedData.name}
      Email: ${validatedData.email}
      Teléfono: ${validatedData.phone || 'No proporcionado'}
      Empresa: ${validatedData.company || 'No proporcionada'}
      Mensaje: ${validatedData.message}`
    });
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error en el formulario:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar el formulario. Por favor, inténtalo de nuevo.' 
      },
      { status: 500 }
    );
  }

}
