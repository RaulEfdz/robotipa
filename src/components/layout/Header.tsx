
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Soluciones' },
  { href: '/success-stories', label: 'Casos de Éxito' },
  { href: '/roi-calculator', label: 'Calculadora ROI' },
  { href: '/resources', label: 'Recursos' },
  { href: '/contact', label: 'Contacto' },
];

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-accent-foreground focus:outline-none focus:text-accent-foreground',
        isActive ? 'text-accent-foreground font-semibold border-b-2 border-accent' : 'text-primary-foreground/80',
        'px-2 py-1 rounded-md'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Inicio Robotipa">
          <Bot className="h-8 w-8 text-accent" />
          <span className="font-headline text-2xl font-bold text-primary-foreground">Robotipa</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground w-[250px] p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-accent-foreground focus:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
