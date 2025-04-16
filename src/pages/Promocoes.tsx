// src/pages/Promocoes.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { mockPromocoes } from '../mocks/promocoes';
import { FiClock, FiTag, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

const Promocoes: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Atualizado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-500 to-amber-600 bg-clip-text text-transparent">
          Ofertas Imperdíveis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra promoções exclusivas e oportunidades únicas nos melhores estabelecimentos
        </p>
      </header>

      {/* Grid de Promoções */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockPromocoes.map((promo) => {
          const isActive = new Date(promo.dataFim) > new Date();
          
          return (
            <div
              key={promo.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <Link to={`/promocao/${promo.id}`} className="block">
                {/* Imagem com Overlay */}
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={promo.imagem}
                    alt={promo.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badge de Status */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isActive 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {isActive ? 'Ativa' : 'Expirada'}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.nome}</h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{promo.descricao}</p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiClock className="w-5 h-5 text-primary-500" />
                      <span className="text-sm">
                        {formatDate(promo.dataInicio)} - {formatDate(promo.dataFim)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiTag className="w-5 h-5 text-amber-500" />
                      <span className="text-sm">{promo.estabelecimentoId}</span>
                    </div>
                  </div>

                  {/* Barra de Progresso do Tempo */}
                  {isActive && (
                    <div className="relative pt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Tempo restante</span>
                        <span>7 dias</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-amber-500" 
                          style={{ width: '65%' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Botão de Ação */}
                  <div className="mt-4 flex items-center justify-between text-primary-600">
                    <span className="font-medium">Ver oferta</span>
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promocoes;