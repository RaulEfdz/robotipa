import { Mail } from 'react-email/components';
import { type ReactEmailProps } from 'react-email';

interface ContactFormEmailProps extends ReactEmailProps {
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  };
}

export const ContactFormEmail = ({ data }: ContactFormEmailProps) => {
  return (
    <Mail>
      <h1 className="text-2xl font-bold mb-4">Nuevo Contacto desde Robotipa</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Nombre:</strong> {data.name}
        </div>
        <div>
          <strong>Email:</strong> {data.email}
        </div>
        {data.phone && (
          <div>
            <strong>Teléfono:</strong> {data.phone}
          </div>
        )}
        {data.company && (
          <div>
            <strong>Empresa:</strong> {data.company}
          </div>
        )}
        <div>
          <strong>Mensaje:</strong>
          <p className="mt-2">{data.message}</p>
        </div>
      </div>
    </Mail>
  );
};
