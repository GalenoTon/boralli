// src/pages/Promocoes.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiClock } from 'react-icons/fi';
import { mockPromocoes } from '../mocks/promocoes';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';

const Promocoes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));
  const categories = Array.from(new Set(mockEstabelecimentos.map(est => est.categoria)));

  const filteredPromocoes = mockPromocoes.filter(promo => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === promo.estabelecimentoId);
    const matchesSearch = promo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    const matchesCategory = !selectedCategory || estabelecimento?.categoria === selectedCategory;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary-500">
        <div className="absolute inset-0">
          <img
            src="/images/promocoes-hero.jpg"
            alt="Promoções"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Promoções Imperdíveis
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Descubra as melhores ofertas e descontos nos estabelecimentos de Bombinhas
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar promoções..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <select
              value={selectedLocation || ''}
              onChange={(e) => setSelectedLocation(e.target.value || null)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os polos</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Promoções */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPromocoes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma promoção encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromocoes.map(promocao => {
              const estabelecimento = mockEstabelecimentos.find(est => est.id === promocao.estabelecimentoId);
              return (
                <Link
                  key={promocao.id}
                  to={`/promocao/${promocao.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={promocao.imagem}
                      alt={promocao.nome}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {promocao.desconto}% off
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {promocao.nome}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {promocao.descricao}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      {estabelecimento?.nome}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FiClock className="w-4 h-4 mr-2" />
                      {new Date(promocao.dataInicio).toLocaleDateString()} - {new Date(promocao.dataFim).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promocoes;