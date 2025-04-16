// src/pages/Estabelecimentos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { FiMapPin, FiStar, FiArrowRight } from 'react-icons/fi';

const Estabelecimentos: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Aprimorado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-500 to-amber-600 bg-clip-text text-transparent">
          Explore Estabelecimentos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descrita os melhores bares, restaurantes e experiências gastronômicas da sua região
        </p>
      </header>

      {/* Grid Interativo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockEstabelecimentos.map((estab) => (
          <Link
            key={estab.id}
            to={`/estabelecimento/${estab.id}`}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Imagem com Overlay */}
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={estab.imagem}
                alt={estab.nome}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center gap-2 text-white">
                  <FiStar className="w-5 h-5 text-amber-400" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{estab.nome}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <FiMapPin className="w-5 h-5 text-primary-500" />
                <span className="text-sm truncate">{estab.endereco}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                  {estab.categoria}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm">
                  {estab.poloTuristico}
                </span>
              </div>

              <div className="flex items-center justify-between text-primary-600">
                <span className="font-medium">Ver detalhes</span>
                <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Estabelecimentos;