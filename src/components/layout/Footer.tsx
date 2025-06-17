import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground/80 py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} Robotipa. Todos los derechos reservados.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Robotipa en Twitter" className="hover:text-accent-foreground transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Robotipa en LinkedIn" className="hover:text-accent-foreground transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Robotipa en GitHub" className="hover:text-accent-foreground transition-colors">
            <Github size={20} />
          </a>
        </div>
        <p className="text-xs mt-4">
          Innovando con IA y Automatización.
        </p>
      </div>
    </footer>
  );
}
