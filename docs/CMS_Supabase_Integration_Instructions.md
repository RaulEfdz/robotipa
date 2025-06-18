# Instrucciones para Integrar el CMS con Supabase y la Landing Page

## Objetivo General

El objetivo de esta aplicación es proporcionar una landing page completamente dinámica y administrable, donde todo el contenido (secciones principales, header, footer, recursos, casos de éxito, servicios, testimonios, planes, etc.) se gestiona desde un CMS personalizado conectado a una base de datos Supabase. Esto permite que el equipo de administración pueda modificar, agregar o eliminar información de manera centralizada y sin intervención de desarrolladores, facilitando la actualización continua del sitio web.

## Idea de Conexión con el CMS

La integración entre la landing page y el CMS se realiza a través de la base de datos Supabase, que actúa como fuente única de la verdad para todo el contenido. El CMS proporciona una interfaz amigable para gestionar los datos, mientras que la landing page (construida en Next.js) consulta Supabase en tiempo real para mostrar la información actualizada.

- **Gestión centralizada:** El CMS permite CRUD completo sobre cada modelo de datos (servicios, recursos, testimonios, header, footer, etc.).
- **Sincronización automática:** Los cambios realizados en el CMS se reflejan instantáneamente en la landing page, ya que ambas comparten la misma base de datos.
- **Analítica integrada:** Se registra cada visita a la página y a cada sección mediante la tabla `page_visits`, permitiendo análisis de tráfico y comportamiento de usuarios.
- **Escalabilidad:** La estructura permite agregar nuevas secciones o tipos de contenido fácilmente, solo añadiendo nuevas tablas/modelos en Supabase y el CMS.

Esta arquitectura garantiza que el sitio sea flexible, escalable y fácil de mantener, con una experiencia de edición de contenido moderna y segura para el equipo de administración.

---

## 1. Modelos de Datos en Supabase

Se ha definido un esquema SQL para crear las tablas necesarias en Supabase que reflejan las secciones principales del sitio:

- **hero_content**: Contenido principal de bienvenida, misión, visión e imagen destacada.
- **header_content**: Información y enlaces del header (menú principal, logo, enlaces rápidos, etc).
- **services**: Servicios ofrecidos, con detalles y descripciones.
- **service_features**: Características específicas de cada servicio.
- **service_company_sizes**: Compatibilidad de servicios con tamaños de empresa.
- **success_stories**: Casos de éxito con detalles de cliente, desafío, solución, etc.
- **success_story_impacts**: Métricas de impacto para cada caso de éxito.
- **success_story_technologies**: Tecnologías usadas en cada caso de éxito.
- **testimonials**: Testimonios vinculados a casos de éxito.
- **plans**: Planes o paquetes de soluciones ofrecidos.
- **plan_features**: Características específicas de cada plan.
- **resources**: Recursos descargables o consultables, como guías, informes, webinars.
- **footer_content**: Información del footer, como enlaces, redes sociales, dirección, contacto, etc.
- **page_visits**: Registro de visitas a la página y a cada sección (analítica).

El archivo con el esquema SQL está en: `db/supabase_schema.sql`

### Ejemplo de estructura de datos
-- Supabase SQL schema for landing page CMS content

-- Table for Hero / Homepage Content
CREATE TABLE hero_content (
  id SERIAL PRIMARY KEY,
  welcome_title TEXT NOT NULL,
  welcome_subtitle TEXT NOT NULL,
  mission_title TEXT NOT NULL,
  mission_text TEXT NOT NULL,
  vision_title TEXT NOT NULL,
  vision_text TEXT NOT NULL,
  main_image_url TEXT NOT NULL,
  main_image_alt TEXT NOT NULL,
  main_image_ai_hint TEXT
);

-- Table for Services
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  industry TEXT,
  service_type TEXT,
  short_description TEXT,
  long_description TEXT,
  image TEXT,
  ai_hint TEXT,
  has_demo BOOLEAN DEFAULT FALSE
);

-- Table for Service Features (one-to-many)
CREATE TABLE service_features (
  id SERIAL PRIMARY KEY,
  service_id TEXT REFERENCES services(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);

-- Table for company size compatibility (many-to-many)
CREATE TABLE service_company_sizes (
  id SERIAL PRIMARY KEY,
  service_id TEXT REFERENCES services(id) ON DELETE CASCADE,
  company_size TEXT NOT NULL
);

-- Table for Success Stories
CREATE TABLE success_stories (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  industry TEXT,
  challenge TEXT,
  solution TEXT,
  pdf_url TEXT,
  image TEXT,
  ai_hint TEXT
);

-- Table for Success Story Impact Metrics (one-to-many)
CREATE TABLE success_story_impacts (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  value TEXT NOT NULL,
  before_value TEXT,
  after_value TEXT
);

-- Table for Success Story Technologies (one-to-many)
CREATE TABLE success_story_technologies (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  technology TEXT NOT NULL
);

-- Table for Testimonials (linked to success stories)
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  video_url TEXT
);

-- Table for Plans
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT,
  featured BOOLEAN DEFAULT FALSE
);

-- Table for Plan Features (one-to-many)
CREATE TABLE plan_features (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);

-- Table for Resources
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  subcategory TEXT,
  type TEXT,
  download_url TEXT,
  is_gated BOOLEAN DEFAULT FALSE,
  image TEXT,
  ai_hint TEXT
);

-- Header Content Table
CREATE TABLE IF NOT EXISTS header_content (
  id TEXT PRIMARY KEY,
  logo_url TEXT,
  menu_links JSONB, -- [{"name": "Inicio", "url": "/"}, ...]
  quick_links JSONB -- [{"name": "Contacto", "url": "/contact"}, ...]
);

-- Footer Content Table
CREATE TABLE IF NOT EXISTS footer_content (
  id TEXT PRIMARY KEY,
  company_name TEXT,
  address TEXT,
  email TEXT,
  phone TEXT,
  social_links JSONB, -- [{"name": "Twitter", "url": "..."}, ...]
  legal_links JSONB   -- [{"name": "Aviso Legal", "url": "..."}, ...]
);

-- Page Visits Analytics Table
CREATE TABLE IF NOT EXISTS page_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT, -- Ejemplo: 'home', 'services', 'success_cases', etc.
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);

---

## 2. Configuración del CMS

- El CMS debe tener modelos que reflejen las tablas mencionadas arriba, incluyendo header y footer.
- Cada modelo debe permitir CRUD completo para gestionar el contenido dinámico.
- Para campos que son listas (features, technologies, impacts, company sizes, enlaces del header/footer), usar relaciones uno-a-muchos o muchos-a-muchos según corresponda o campos JSONB.
- El campo `id` en tablas con tipo `TEXT` debe ser un identificador único legible (slug o UUID).
- Para imágenes y archivos, almacenar URLs que apunten a recursos en almacenamiento (puede ser Supabase Storage o CDN).
- El header y el footer deben ser editables desde el CMS, permitiendo modificar enlaces, datos de contacto, redes sociales, menú, etc.

---

## 3. Conexión con Supabase

- Configurar el CMS para conectarse a la base de datos Supabase usando las credenciales y URL del proyecto.
- Asegurar que las migraciones del esquema SQL se apliquen correctamente.
- Validar que las relaciones entre tablas estén bien definidas y que las eliminaciones en cascada funcionen para mantener integridad.

---

## 4. Uso en Next.js

- Modificar las consultas de datos en Next.js para obtener contenido dinámico desde Supabase en lugar de archivos estáticos.
- Mapear los datos obtenidos a los componentes correspondientes:
  - HeroSection: datos de `hero_content`
  - Header: datos de `header_content`
  - ServicesSection: datos de `services` junto con `service_features` y `service_company_sizes`
  - SuccessCasesSection: datos de `success_stories`, `success_story_impacts`, `success_story_technologies` y `testimonials`
  - PricingSection: datos de `plans` y `plan_features`
  - ResourcesSection: datos de `resources`
  - Footer: datos de `footer_content`

---

## 5. Recomendaciones

- Usar UUIDs para IDs de tablas que no sean auto-incrementales para evitar colisiones.
- Implementar validaciones en el CMS para asegurar que los datos obligatorios estén completos.
- Aprovechar las capacidades de Supabase Storage para manejar imágenes y archivos.
- Considerar la paginación y filtros en el CMS para manejar grandes volúmenes de contenido.
- Documentar los endpoints y modelos para facilitar mantenimiento y futuras integraciones.

---

## 6. Sistema de Analítica y Registro de Visitas

Para registrar visitas a la página y a cada sección, utiliza la tabla `page_visits`.

- Cada vez que un usuario acceda a la página o navegue a una sección, realiza una inserción en esta tabla.
- Puedes implementar esto en Next.js usando una API route que reciba la sección visitada y los datos del usuario (user agent, IP).

Ejemplo de endpoint en Next.js:

```typescript
// pages/api/track-visit.ts
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { section } = req.body;
    const user_agent = req.headers['user-agent'] || '';
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    await supabase.from('page_visits').insert([
      { section, user_agent, ip_address }
    ]);

    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
```

- Llama a este endpoint desde el frontend cada vez que se cargue una sección relevante.
- Puedes consultar y analizar los datos de la tabla `page_visits` para obtener métricas de uso y comportamiento de los usuarios.

---

Con esta estructura, el CMS estará alineado con Supabase y la landing page podrá mostrar contenido totalmente dinámico y administrable, incluyendo la gestión del header, footer y el registro/analítica de visitas para análisis de uso.

---
