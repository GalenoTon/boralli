// src/pages/Promocoes.tsx
import React, { useState } from 'react';
import { mockPromocoes, Promocao } from '../mocks/promocoes';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { Search, Calendar, Users, Store, Check, DollarSign } from 'lucide-react';
import { usePolo } from '../contexts/PoloContext';

const Promocoes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { poloSelecionado, filtrarPorPolo } = usePolo();
  const promocoes = filtrarPorPolo(mockPromocoes, mockEstabelecimentos);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop)',
            filter: 'brightness(0.3)'
          }}
        />

        {/* Conteúdo do Hero */}
        <div className="relative max-w-[1280px] mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
              Ofertas Especiais
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Promoções Imperdíveis
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Aproveite descontos exclusivos nos melhores estabelecimentos do Rio de Janeiro
            </p>

            {/* Barra de Busca e Filtros */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar promoções..."
                  className="w-full pl-12 pr-4 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="h-14 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Todos os tipos</option>
                <option value="desconto">Desconto</option>
                <option value="leve-mais-pague-menos">Leve e Pague</option>
                <option value="brinde">Brinde</option>
                <option value="valor-fixo">Valor Fixo</option>
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

        {/* Grid de Promoções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-8">
          {promocoes
            .filter((promo) =>
              promo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              promo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((promocao) => (
              <div
                key={promocao.id}
                className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{promocao.nome}</h3>
                    <p className="text-sm text-white/90">{promocao.descricao}</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-2 backdrop-blur-sm">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center bg-white/10 rounded-lg px-3 py-1.5">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    <span className="text-xs">Válido até {promocao.dataFim}</span>
                  </div>
                  <div className="flex items-center bg-white/10 rounded-lg px-3 py-1.5">
                    <Users className="w-3 h-3 mr-1.5" />
                    <span className="text-xs">Ilimitado</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white/10 rounded-lg px-3 py-1.5">
                    <Store className="w-3 h-3 mr-1.5" />
                    <span className="text-xs truncate">
                      {mockEstabelecimentos.find(e => e.id === promocao.estabelecimentoId)?.nome}
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 bg-white text-amber-600 hover:bg-white/90 transition-colors rounded-lg px-4 py-1.5 text-xs font-medium">
                    <Check className="w-3 h-3" />
                    Resgatar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Promocoes;