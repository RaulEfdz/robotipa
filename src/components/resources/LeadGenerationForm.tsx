
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import type { Resource } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Dirección de correo electrónico inválida." }),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LeadGenerationFormProps {
  resourceTitle: string;
  onSubmitSuccess: (data: FormData) => void;
}

const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({ resourceTitle, onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Lead data:", data, "Resource:", resourceTitle);
    onSubmitSuccess(data);
    setIsSubmitting(false);
    form.reset(); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Para descargar "<strong>{resourceTitle}</strong>", por favor proporciona tus datos.
        </p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} className="bg-background text-foreground" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Dirección de Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan.perez@ejemplo.com" {...field} className="bg-background text-foreground"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Empresa (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Tu Empresa S.A." {...field} className="bg-background text-foreground"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Enviar y Descargar
        </Button>
      </form>
    </Form>
  );
};

export default LeadGenerationForm;
