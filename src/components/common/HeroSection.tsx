"use client";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-lego-primary w-full min-h-screen flex items-center">
      {/* Background Pattern with Parallax */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Dynamic Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute -bottom-20 left-1/2 w-[200%] transform -translate-x-1/2 animate-pulse"
          style={{
            transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`,
          }}
          width="2745"
          height="488"
          viewBox="0 0 2745 488"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Usar los colores lego personalizados */}
          <path
            d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
            className="stroke-lego-secondary/30 animate-pulse"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
            className="stroke-lego-secondary/20"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
            className="stroke-lego-secondary/25"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-2 h-2 bg-lego-accent/20 rounded-full animate-bounce"
          style={{
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${30 + mousePosition.y * 0.05}%`,
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-lego-secondary/30 rounded-full animate-bounce"
          style={{
            left: `${70 + mousePosition.x * 0.08}%`,
            top: `${20 + mousePosition.y * 0.03}%`,
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-lego-accent/40 rounded-full animate-bounce"
          style={{
            left: `${80 + mousePosition.x * 0.06}%`,
            top: `${60 + mousePosition.y * 0.04}%`,
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 py-24 lg:py-32 mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-lego-primary bg-lego-secondary/90 backdrop-blur-sm rounded-full border border-lego-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="w-2 h-2 bg-lego-accent rounded-full mr-2 animate-pulse"></span>
            Centro Creativo de Innovación
          </div>

          {/* Main Heading with Animation */}
          <h1 className="font-bold text-lego-accent text-5xl md:text-7xl lg:text-8xl max-w-6xl mx-auto leading-tight mb-8">
            <span className="inline-block bg-gradient-to-r from-lego-secondary to-lego-accent bg-clip-text text-transparent animate-pulse">
              Robotipa:
            </span>
            <br />
            <span className="inline-block hover:scale-105 transition-transform duration-300 text-lego-neutral">
              Transformando
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-lego-accent to-lego-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 delay-100">
              ideas en realidad
            </span>
          </h1>

          {/* Description */}
          <div className="mt-8 max-w-4xl mx-auto">
            <p className="text-lego-secondary text-lg md:text-xl leading-relaxed mb-8 opacity-90">
              Un centro creativo donde la imaginación se encuentra con la
              artesanía para transformar ideas en realidades tangibles. Nos
              especializamos en convertir visiones conceptuales en formas
              concretas a través del diseño, el arte y la innovación
              tecnológica.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button className="group relative px-8 py-4 bg-lego-accent text-lego-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[200px]">
              <span className="relative z-10">Explorar Proyectos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lego-accent to-lego-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-lego-accent rounded-full group-hover:scale-95 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-lego-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                Explorar Proyectos
              </span>
            </button>

            <button className="group px-8 py-4 border-2 border-lego-secondary/30 text-lego-accent font-semibold rounded-full backdrop-blur-sm hover:bg-lego-secondary/10 hover:border-lego-secondary/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                Contactar
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-lego-secondary/10 backdrop-blur-sm rounded-xl border border-lego-secondary/20 hover:bg-lego-secondary/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-lego-accent mb-2">
                100+
              </div>
              <div className="text-lego-secondary text-sm">
                Proyectos Realizados
              </div>
            </div>
            <div className="text-center p-6 bg-lego-secondary/10 backdrop-blur-sm rounded-xl border border-lego-secondary/20 hover:bg-lego-secondary/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-lego-accent mb-2">5+</div>
              <div className="text-lego-secondary text-sm">
                Años de Experiencia
              </div>
            </div>
            <div className="text-center p-6 bg-lego-secondary/10 backdrop-blur-sm rounded-xl border border-lego-secondary/20 hover:bg-lego-secondary/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-lego-accent mb-2">
                24/7
              </div>
              <div className="text-lego-secondary text-sm">
                Soporte Creativo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-lego-secondary/70 hover:text-lego-accent transition-colors duration-300 cursor-pointer">
          <span className="text-sm mb-2">Descubre más</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
