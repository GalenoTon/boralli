// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { mockProdutos } from '../mocks/produtos';
import { mockPromocoes } from '../mocks/promocoes';
import { FiArrowRight } from 'react-icons/fi';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Seção Herói com Animação */}
      <section className="relative text-center py-24 md:py-32 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-black to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Descubra Experiências <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-white">Únicas</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100/90 mb-8 max-w-2xl mx-auto">
            Conectamos você aos melhores estabelecimentos, produtos exclusivos e promoções personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard/estabelecimentos"
              className="px-8 py-4 bg-white/90 text-primary-600 font-semibold rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Explorar Agora
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            >
              Cadastre-se Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Estabelecimentos em Destaque */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Locais <span className="bg-gradient-to-r from-primary-500 to-amber-500 bg-clip-text text-transparent ml-2">Destacados</span>
            </h2>
            <p className="text-gray-500 mt-2">Mais visitados esta semana</p>
          </div>
          <Link 
            to="/estabelecimentos" 
            className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
          >
            Ver todos
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scrollbar-hide overflow-x-auto pb-4 md:overflow-visible md:pb-0">
          {mockEstabelecimentos.map((estab) => (
            <div
              key={estab.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[85%] md:min-w-0 snap-start"
            >
              <Link to={`/estabelecimento/${estab.id}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={estab.imagem}
                    alt={estab.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{estab.nome}</h3>
                  <span className="text-gray-500 text-sm truncate">{estab.endereco}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Produtos em Destaque */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Ofertas <span className="bg-gradient-to-r from-primary-500 to-amber-500 bg-clip-text text-transparent ml-2">Exclusivas</span>
            </h2>
            <p className="text-gray-500 mt-2">Produtos selecionados para você</p>
          </div>
          <Link 
            to="/produtos" 
            className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
          >
            Ver todos
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProdutos.map((prod) => (
            <div 
              key={prod.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <Link to={`/produto/${prod.id}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{prod.nome}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary-600">
                        R$ {prod.preco.toFixed(2)}
                      </span>
                      {prod.precoOriginal && (
                        <span className="text-gray-400 line-through text-sm">
                          R$ {prod.precoOriginal.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Promoções em Destaque */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Super Ofertas <span className="bg-gradient-to-r from-primary-500 to-amber-500 bg-clip-text text-transparent ml-2">Imperdíveis</span>
            </h2>
            <p className="text-gray-500 mt-2">Tempo limitado</p>
          </div>
          <Link 
            to="/promocoes" 
            className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
          >
            Ver todas
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockPromocoes.map((promo) => (
            <div
              key={promo.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <Link to={`/promocao/${promo.id}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={promo.imagem}
                    alt={promo.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{promo.nome}</h3>
                  <p className="text-gray-600 mb-2">{promo.descricao}</p>
                  <p className="text-sm text-gray-500">
                    {promo.dataInicio} até {promo.dataFim}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
