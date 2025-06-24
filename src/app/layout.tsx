import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://robotipa.com"),
  title: "Robotipa | Soluciones de IA y Automatización",
  description: "Potenciamos tu negocio con Inteligencia Artificial y soluciones de automatización personalizadas.",
  openGraph: {
    title: "Robotipa | Soluciones de IA y Automatización para Empresas",
    description: "Descubre cómo la IA puede transformar tu negocio y llevarlo al siguiente nivel.",
    url: "https://robotipa.com",
    siteName: "Robotipa",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotipa | Soluciones de IA y Automatización para Empresas",
    description: "Descubre cómo la IA puede transformar tu negocio.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
