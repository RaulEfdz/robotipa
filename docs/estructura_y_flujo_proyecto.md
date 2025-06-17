# Estructura y Flujo Actual del Proyecto Robotipa

Este documento describe la estructura actual del proyecto Robotipa y el flujo principal de la aplicación, excluyendo la parte de administración CMS que fue removida para manejarse por separado.

---

## 1. Descripción General

Robotipa es una aplicación web moderna construida con Next.js, React y TypeScript, utilizando Tailwind CSS para el estilo. El proyecto está diseñado para ser modular y escalable, integrando funcionalidades de inteligencia artificial mediante la librería Genkit y el modelo Gemini de Google AI.

---

## 2. Estructura de Carpetas Principal

- **src/app/**  
  Contiene las páginas y rutas principales de la aplicación.  
  - `page.tsx`: Página principal (home) que muestra bienvenida, misión, visión y una sección de soluciones.  
  - `globals.css`: Estilos globales.  
  - `layout.tsx`: Layout principal de la aplicación.  
  - `favicon.ico`: Icono del sitio.  
  - Subcarpetas por sección:  
    - `contact/`: Página de contacto.  
    - `resources/`: Biblioteca de recursos con formularios y tarjetas.  
    - `roi-calculator/`: Calculadora de ROI con formularios y resultados.  
    - `success-stories/`: Casos de éxito.  
  - **Nota:** La carpeta `admin/` fue eliminada para separar la gestión CMS.

- **src/components/**  
  Componentes React reutilizables organizados por funcionalidad:  
  - `common/`: Componentes comunes como logos, títulos, wrappers.  
  - `layout/`: Componentes de layout como Header y Footer.  
  - `resources/`, `roi/`, `solutions/`, `success-stories/`: Componentes específicos para cada sección.  
  - `ui/`: Componentes UI basados en Radix UI y utilidades propias.

- **src/ai/**  
  Código relacionado con la integración de inteligencia artificial:  
  - `genkit.ts`: Configuración del cliente Genkit con Google Gemini AI.  
  - `flows/`: Flujos de AI para recomendaciones de recursos, cálculo de ROI y enrutamiento inteligente de contactos.  
  - `dev.ts`: Código para desarrollo y pruebas AI.

- **src/lib/**  
  Utilidades, constantes y datos estáticos para la aplicación.

- **src/hooks/**  
  Hooks personalizados para funcionalidades específicas como manejo de estado móvil y notificaciones.

- **Configuración y Archivos Raíz**  
  - `package.json`: Dependencias y scripts del proyecto.  
  - `next.config.ts`: Configuración de Next.js.  
  - `tailwind.config.ts`: Configuración de Tailwind CSS.  
  - `tsconfig.json`: Configuración de TypeScript.  
  - `README.md`: Descripción básica del proyecto.

---

## 3. Flujo Principal de la Aplicación

1. **Inicio y Navegación**  
   El usuario accede a la página principal (`/`), donde se muestra contenido estático dinámico (bienvenida, misión, visión) y una sección destacada de soluciones.  
   La navegación principal permite acceder a las secciones: Soluciones, Casos de Éxito, Calculadora ROI, Recursos y Contacto.

2. **Secciones Funcionales**  
   - **Soluciones:** Presenta los servicios ofrecidos.  
   - **Casos de Éxito:** Muestra testimonios y resultados de clientes.  
   - **Calculadora ROI:** Permite calcular el retorno de inversión mediante formularios y muestra resultados.  
   - **Recursos:** Biblioteca con recursos descargables y formularios de generación de leads.  
   - **Contacto:** Formulario para que los usuarios puedan enviar consultas.

3. **Inteligencia Artificial**  
   La aplicación utiliza Genkit con el modelo Gemini de Google para potenciar funcionalidades como:  
   - Recomendación inteligente de recursos.  
   - Cálculo avanzado de ROI.  
   - Enrutamiento inteligente de contactos.

4. **Gestión de Contenido**  
   La gestión CMS (administración) fue removida para ser tratada aparte, por lo que actualmente el contenido estático se maneja mediante archivos de datos y componentes.

---

## 4. Tecnologías y Herramientas Clave

- **Next.js** para renderizado híbrido y rutas.  
- **React** con TypeScript para componentes UI.  
- **Tailwind CSS** para estilos utilitarios.  
- **Radix UI** para componentes accesibles.  
- **Genkit AI** con Google Gemini para funcionalidades AI.  
- **Firebase** (integración base, detalles no expuestos en configuración actual).  
- **Lucide-react** para iconografía.  
- **Recharts** para gráficos en la calculadora ROI.  
- **React Hook Form** para manejo de formularios.

---

Este documento puede ser actualizado conforme se realicen cambios o se integre la parte de administración CMS.
