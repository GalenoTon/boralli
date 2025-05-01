// src/pages/Produtos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProdutos } from '../mocks/produtos';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { Search, Filter, DollarSign } from 'lucide-react';
import { usePolo } from '../contexts/PoloContext';

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { poloSelecionado, filtrarPorPolo } = usePolo();
  const produtos = filtrarPorPolo(mockProdutos, mockEstabelecimentos);

  const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop)',
            filter: 'brightness(0.3)'
          }}
        />

        {/* Conteúdo do Hero */}
        <div className="relative max-w-[1280px] mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
              Gastronomia Carioca
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Produtos em Destaque
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Explore os melhores pratos, bebidas e especialidades dos estabelecimentos do Rio
            </p>

            {/* Barra de Busca e Filtros */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-12 pr-4 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="h-14 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                <option value="comida">Comidas</option>
                <option value="bebida">Bebidas</option>
                <option value="souvenir">Souvenirs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Container Principal - Ajustado espaçamento */}
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Seção de Filtros Ativos */}
        <div className="py-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
              Busca: {searchTerm}
              <button onClick={() => setSearchTerm('')} className="ml-2">×</button>
            </span>
          )}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-8">
          {produtos
            .filter((produto) =>
              produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((produto) => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="bg-white rounded-lg hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    R$ {formatPrice(produto.preco)}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{produto.nome}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {produto.descricao}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 truncate">
                      {mockEstabelecimentos.find(e => e.id === produto.estabelecimentoId)?.nome}
                    </span>
                    <button className="px-2 py-1 bg-amber-500 text-white rounded text-xs">
                      Ver mais
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;