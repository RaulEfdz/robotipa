import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('text-center mb-8 md:mb-12', className)}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary-foreground mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
