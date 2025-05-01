import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import type { EstabelecimentoComAvaliacao } from '../../types/estabelecimento';

interface Props {
  estabelecimentos: EstabelecimentoComAvaliacao[];
}

const EstabelecimentosSection: React.FC<Props> = ({ estabelecimentos }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Estabelecimentos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {estabelecimentos.map((estabelecimento) => (
            <Link
              key={estabelecimento.id}
              to={`/estabelecimento/${estabelecimento.id}`}
              className="block hover:shadow-lg transition-shadow duration-300 rounded-xl"
            >
              {/* Card content */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EstabelecimentosSection; 