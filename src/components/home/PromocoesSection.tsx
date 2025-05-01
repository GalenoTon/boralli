import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Promocao } from '../../types/promocao';

interface Props {
  promocoes: Promocao[];
}

const PromocoesSection: React.FC<Props> = ({ promocoes }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Promoções Disponíveis</h2>
        {/* Carousel content */}
      </div>
    </section>
  );
};

export default PromocoesSection; 