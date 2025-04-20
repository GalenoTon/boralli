// src/pages/Produtos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiSearch, FiMapPin } from 'react-icons/fi';
import { mockProdutos } from '../mocks/produtos';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';

const ProdutosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const categories = Array.from(new Set(mockProdutos.map(prod => prod.categoria)));
  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));

  const filteredProdutos = mockProdutos.filter(prod => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === prod.estabelecimentoId);
    const matchesSearch = prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prod.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prod.categoria === selectedCategory;
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-12">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Produtos"
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex items-end">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Produtos</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Explore nossa seleção de produtos e descubra as melhores ofertas
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
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
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProdutos.map(produto => {
          const estabelecimento = mockEstabelecimentos.find(est => est.id === produto.estabelecimentoId);
          return (
            <Link
              key={produto.id}
              to={`/produto/${produto.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-48 sm:h-56 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{produto.nome}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FiMapPin className="w-4 h-4" />
                  <span className="truncate">{estabelecimento?.nome}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiTag className="w-4 h-4" />
                  <span>{produto.categoria}</span>
                </div>
                <div className="mt-3">
                  <span className="text-lg font-semibold text-primary-600">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredProdutos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
};

export default ProdutosPage;