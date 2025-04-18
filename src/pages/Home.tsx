// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { mockProdutos } from '../mocks/produtos';
import { mockPromocoes } from '../mocks/promocoes';

const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Viva experiências',
      highlight: 'extraordinárias',
      subtitle: 'Descubra os melhores estabelecimentos próximos a você',
      cta: [
        { text: 'Explorar Agora', link: '/dashboard/estabelecimentos', variant: 'primary' },
        { text: 'Cadastre-se Grátis', link: '/register', variant: 'secondary' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Descubra sabores',
      highlight: 'únicos',
      subtitle: 'Produtos exclusivos e ofertas especiais esperando por você',
      cta: [
        { text: 'Ver Ofertas', link: '/produtos', variant: 'primary' },
        { text: 'Saiba Mais', link: '/sobre', variant: 'secondary' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Promoções',
      highlight: 'exclusivas',
      subtitle: 'Ofertas por tempo limitado para clientes especiais',
      cta: [
        { text: 'Ver Promoções', link: '/promocoes', variant: 'primary' },
        { text: 'Criar Conta', link: '/register', variant: 'secondary' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Section Carrossel */}
      <section className="relative min-h-[80vh] rounded-2xl overflow-hidden shadow-2xl isolate group">
        <div className="absolute inset-0 transition-opacity duration-1000 ease-out">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/40" />
            </div>
          ))}
        </div>

        <div className="relative max-w-2xl mx-auto px-4 text-center space-y-8 h-[80vh] flex items-center justify-center">
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {heroSlides[activeSlide].title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                {heroSlides[activeSlide].highlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100/90 font-light max-w-xl mx-auto leading-relaxed">
              {heroSlides[activeSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {heroSlides[activeSlide].cta.map((button, index) => (
                <Link
                  key={index}
                  to={button.link}
                  className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    button.variant === 'primary'
                      ? 'bg-amber-500 text-gray-900 hover:bg-amber-400 shadow-lg hover:shadow-xl'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Seção de Estabelecimentos em Destaque */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Destaques <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">da Cidade</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">Os locais mais bem avaliados pelos nossos usuários</p>
          </div>
          <Link 
            to="/estabelecimentos" 
            className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg border border-amber-100 hover:border-amber-200 hover:bg-amber-50 transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockEstabelecimentos.map((estab) => (
            <div key={estab.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Link to={`/estabelecimento/${estab.id}`} className="block">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={estab.imagem}
                    alt={estab.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold truncate">{estab.nome}</h3>
                  <p className="text-sm font-light opacity-90 truncate">{estab.endereco}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Produtos em Destaque */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ofertas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Exclusivas</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">Produtos selecionados com descontos especiais</p>
          </div>
          <Link 
            to="/produtos" 
            className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg border border-amber-100 hover:border-amber-200 hover:bg-amber-50 transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProdutos.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <Link to={`/produto/${prod.id}`} className="block">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate mb-2">{prod.nome}</h3>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-xl font-bold text-amber-600">
                        R$ {prod.preco.toFixed(2)}
                      </span>
                      {prod.precoOriginal && (
                        <span className="text-gray-400 line-through block text-sm">
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
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Promoções <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Relâmpago</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">Ofertas por tempo limitado</p>
          </div>
          <Link 
            to="/promocoes" 
            className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg border border-amber-100 hover:border-amber-200 hover:bg-amber-50 transition-colors"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockPromocoes.map((promo) => (
            <div key={promo.id} className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Link to={`/promocao/${promo.id}`} className="block">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={promo.imagem}
                    alt={promo.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{promo.nome}</h3>
                  <p className="text-lg font-light opacity-95">{promo.descricao}</p>
                  <div className="mt-3 text-sm font-medium bg-amber-500/90 text-gray-900 px-3 py-1 rounded-full inline-block">
                    {promo.dataInicio} - {promo.dataFim}
                  </div>
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