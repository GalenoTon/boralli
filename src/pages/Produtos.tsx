// src/pages/Produtos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { mockProdutos } from '../mocks/produtos';
import { FiShoppingCart, FiHeart, FiArrowRight, FiTag } from 'react-icons/fi';

const Produtos: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Aprimorado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-500 to-amber-600 bg-clip-text text-transparent">
          Nossas Delícias
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore uma seleção premium de produtos cuidadosamente escolhidos para sua experiência gastronômica
        </p>
      </header>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProdutos.map((prod) => (
          <div
            key={prod.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <Link to={`/produto/${prod.id}`} className="block">
              {/* Imagem com Overlay */}
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                <img
                  src={prod.imagem}
                  alt={prod.nome}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                {/* Botão Favorito */}
                <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all">
                  <FiHeart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{prod.nome}</h3>
                  {/* <span className="flex items-center gap-1 text-primary-600">
                    <FiShoppingCart className="w-5 h-5" />
                  </span> */}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{prod.descricao}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary-600">
                      R$ {prod.preco.toFixed(2)}
                    </span>
                    {prod.precoOriginal && (
                      <span className="text-gray-400 line-through text-sm">
                        R$ {prod.precoOriginal.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-primary-600">
                    <span className="text-sm mr-2">Detalhes</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Tag de Desconto */}
            {prod.desconto && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-amber-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow">
                -{prod.desconto}% OFF
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produtos;