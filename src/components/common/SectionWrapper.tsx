import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, id }) => {
  return (
    <section id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
