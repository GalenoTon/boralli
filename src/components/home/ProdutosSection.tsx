import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Produto } from '../../types/produto';

interface Props {
  produtos: Produto[];
}

const ProdutosSection: React.FC<Props> = ({ produtos }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    const target = direction === 'left'
      ? carouselRef.current.scrollLeft - scrollAmount
      : carouselRef.current.scrollLeft + scrollAmount;
    carouselRef.current.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        {/* Carousel content */}
      </div>
    </section>
  );
};

export default ProdutosSection; 