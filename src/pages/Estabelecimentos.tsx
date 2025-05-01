// src/pages/Estabelecimentos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEstabelecimentos, polosTuristicos } from '../mocks/estabelecimentos';
import { Star, Clock, MapPin, Search, Filter } from 'lucide-react';
import { usePolo } from '../contexts/PoloContext';

const Estabelecimentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { poloSelecionado, setPoloSelecionado, filtrarEstabelecimentos } = usePolo();
  const estabelecimentos = filtrarEstabelecimentos(mockEstabelecimentos);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop)',
            filter: 'brightness(0.3)'
          }}
        />

        {/* Conteúdo do Hero - Ajustado espaçamento */}
        <div className="relative max-w-[1280px] mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
              Explore o Rio de Janeiro
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Descubra os Melhores Estabelecimentos
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Encontre restaurantes, bares, cafés e muito mais em cada polo turístico da cidade maravilhosa
            </p>

            {/* Barra de Busca e Filtros */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar estabelecimentos..."
                  className="w-full pl-12 pr-4 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={poloSelecionado}
                onChange={(e) => setPoloSelecionado(e.target.value)}
                className="h-14 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Todos os polos turísticos</option>
                {polosTuristicos.map((polo) => (
                  <option key={polo.id} value={polo.id}>
                    {polo.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Container Principal - Ajustado espaçamento */}
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Seção de Filtros Ativos */}
        <div className="py-4 flex flex-wrap gap-2">
          {poloSelecionado && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
              {polosTuristicos.find(p => p.id === poloSelecionado)?.nome}
              <button onClick={() => setPoloSelecionado('')} className="ml-2">×</button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
              Busca: {searchTerm}
              <button onClick={() => setSearchTerm('')} className="ml-2">×</button>
            </span>
          )}
        </div>

        {/* Grid de Estabelecimentos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-8">
          {estabelecimentos
            .filter((est) => 
              est.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              est.descricao.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((est) => (
              <Link
                key={est.id}
                to={`/estabelecimento/${est.id}`}
                className="bg-white rounded-lg hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={est.imagem}
                    alt={est.nome}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-amber-500 mr-1" />
                      <span className="text-xs font-medium">4.5</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{est.nome}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {est.descricao}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{est.endereco}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Estabelecimentos;