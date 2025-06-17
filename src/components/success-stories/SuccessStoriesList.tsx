
'use client';

import React from 'react';
import StoryCard from './StoryCard';
import { mockSuccessStories } from '@/lib/data/success-stories';
import PageTitle from '@/components/common/PageTitle';

const SuccessStoriesList: React.FC = () => {
  return (
    <div className="space-y-12">
      <PageTitle
        title="Casos de Éxito de Clientes"
        subtitle="Observa cómo Robotipa ha entregado resultados tangibles y soluciones transformadoras para negocios como el tuyo."
      />
      {mockSuccessStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* Adjusted to 2 columns for better readability of cards */}
          {mockSuccessStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-primary-foreground/80">No hay casos de éxito disponibles por el momento. ¡Vuelve pronto!</p>
      )}
    </div>
  );
};

export default SuccessStoriesList;
