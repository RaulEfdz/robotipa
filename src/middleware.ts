import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ADVERTENCIA: Almacenar contraseñas en texto plano es inseguro para producción.
// Esto es solo para fines de prototipo.
const ADMIN_PASSWORD_TOKEN = 'QPT756'; 
export const AUTH_COOKIE_NAME = 'robotipa-admin-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // Verificación de token muy básica para prototipo.
    // En una aplicación real, esto implicaría validación de JWT o sesión.
    if (authToken !== ADMIN_PASSWORD_TOKEN) { 
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname); // Opcional: redirigir de vuelta después del login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Aplicar middleware a todas las rutas bajo /admin, excluyendo assets y rutas de API de Next.js
  matcher: ['/admin/:path*'], 
};
