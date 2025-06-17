"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "../../hooks/use-mobile";
import { BotIcon, XIcon } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeOffcanvas = () => setIsOffcanvasOpen(false);

  return (
    <>
      <div className="hidden lg:block fixed top-0 left-1/2 transform -translate-x-1/2 bg-lego-accent text-lego-primary text-xs px-4 py-1 rounded-b-full shadow z-50">
        🚀 Tecnología y Creatividad por Robotipa
      </div>

      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-lego-primary/90 shadow-md backdrop-blur-sm"
            : "bg-lego-primary"
        }`}
      >
        <nav className="relative max-w-[85rem] w-full mx-auto flex items-center justify-between gap-3 pt-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Brand" className="flex-none">
            <div className=" p-1 transition-all">
              <Image
                height={200}
                width={200}
                src="/logo.png"
                alt="Logo Robotipa"
                className="w-12 h-12 object-contain"
              />
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {["inicio", "servicios", "recursos", "casos", "contacto"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="relative group px-3 py-2 text-sm font-semibold text-white hover:text-lego-accent transition"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-lego-accent group-hover:w-full transition-all"></span>
                </a>
              )
            )}
          </div>

          <div className="flex justify-end items-center gap-x-2">
            {isMobile && (
              <button
                type="button"
                className="md:hidden p-2 flex items-center text-sm rounded-lg border border-lego-accent/50 text-white hover:border-lego-accent hover:bg-lego-secondary/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span className="mr-1">Menú</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMobileMenuOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            )}

            <div className="hidden md:inline-block w-px h-4 bg-lego-secondary"></div>

            <button
              type="button"
              className="w-9 h-9 flex justify-center items-center rounded-lg border border-lego-accent/50 text-white hover:border-lego-accent hover:bg-lego-secondary/10 transition-colors"
              onClick={toggleOffcanvas}
              aria-label="Toggle side panel"
            >
              <BotIcon className="w-5 h-5 text-accent" />
            </button>
          </div>
        </nav>

        {isMobile && isMobileMenuOpen && (
          <div className="md:hidden w-full bg-lego-primary border-t border-lego-secondary shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {["inicio", "servicios", "recursos", "casos", "contacto"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 text-sm font-semibold text-white hover:bg-lego-secondary/10 rounded-lg transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </header>

      {isOffcanvasOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={closeOffcanvas}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-xs bg-lego-primary/90 border-l border-lego-secondary text-lego-accent shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center py-4 px-4 border-b border-lego-secondary">
          <h3 className="font-bold flex items-center gap-2">
            <BotIcon className="w-5 h-5 text-accent" />
            Panel IA
          </h3>
          <button
            type="button"
            className="w-8 h-8 flex justify-center items-center rounded-full bg-lego-secondary/20 text-lego-accent hover:bg-lego-secondary/40 transition-colors"
            onClick={closeOffcanvas}
            aria-label="Cerrar panel"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-4 text-sm text-white">
          <p>🤖 Bienvenido al panel de herramientas de IA de Robotipa.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Chat Asistente IA (próximamente)</li>
            <li>Recomendador de soluciones automáticas</li>
            <li>Generación de ideas creativas</li>
            <li>Paneles inteligentes personalizados</li>
          </ul>
          <p className="text-lego-accent/80">
            ¡Estamos trabajando con IA para transformar ideas en realidades!
          </p>
        </div>
      </div>
    </>
  );
}
