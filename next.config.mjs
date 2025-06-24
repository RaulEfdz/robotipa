/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },
  // Configuración para manejar módulos del lado del servidor
  webpack: (config, { isServer }) => {
    // Configuración para fs/promises
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    // Manejo de handlebars
    config.module.noParse = /(^|\/|\\)[\/\\]node_modules[\/\\](handlebars)[\/\\]/;
    return config;
  },
  // Configuración para exportación estática
  output: 'standalone',
  // Deshabilitar telemetría
  telemetry: false,
  // Configuración de compresión
  compress: true,
  // Configuración de caché de compilación
  experimental: {
    // Deshabilitar características experimentales que pueden causar problemas
    optimizeCss: false,
    serverComponentsExternalPackages: ['@genkit-ai/*']
  },
  // Ignorar errores de TypeScript durante la compilación
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignorar advertencias de ESLint durante la compilación
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
