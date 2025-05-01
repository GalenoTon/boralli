// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { mockEstabelecimentos, Estabelecimento, polosTuristicos } from '../mocks/estabelecimentos';
import { mockProdutos } from '../mocks/produtos';
import { mockPromocoes as mockCupons, Promocao } from '../mocks/promocoes';
import { 
  Search, 
  Menu, 
  Utensils, 
  ShoppingCart, 
  Coffee, 
  Pill, 
  PawPrint, 
  Zap, 
  HeartPulse, 
  Plus,
  Star,
  Clock,
  MapPin,
  Map
} from 'lucide-react';

// Extensão dos tipos para incluir propriedades adicionais
interface EstabelecimentoComAvaliacao extends Estabelecimento {
  avaliacao: number;
  tempoEntrega: string;
  pedidoMinimo: number;
}

interface CategoriaMobile {
  id: string;
  nome: string;
  icone: React.ComponentType<{ className?: string }>;
}

// Extensão do tipo Promocao para incluir a propriedade usos
type PromocaoComUsos = Promocao & {
  usos?: string;
};

// Categorias para o mobile
const categoriasMobile: CategoriaMobile[] = [
  { id: 'restaurantes', nome: 'Restaurantes', icone: Utensils },
  { id: 'mercados', nome: 'Mercados', icone: ShoppingCart },
  { id: 'bebidas', nome: 'Bebidas', icone: Coffee },
  { id: 'farmácias', nome: 'Farmácias', icone: Pill },
  { id: 'pet', nome: 'Pet', icone: PawPrint },
  { id: 'express', nome: 'Express', icone: Zap },
  { id: 'saude', nome: 'Saúde', icone: HeartPulse },
  { id: 'mais', nome: 'Ver mais', icone: Plus },
];

const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [poloSelecionado, setPoloSelecionado] = useState<string>('todos');

  const carouselRefs = {
    estabelecimentos: useRef<HTMLDivElement>(null),
    produtos: useRef<HTMLDivElement>(null),
    cupons: useRef<HTMLDivElement>(null),
  };

  const heroSlides = [
    {
      image:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Viva experiências',
      highlight: 'inesquecíveis',
      subtitle: 'Descubra os melhores estabelecimentos para momentos únicos',
      cta: [
        { text: 'Explorar Lugares', link: '/dashboard/estabelecimentos', variant: 'primary' },
        { text: 'Criar Conta', link: '/register', variant: 'secondary' },
      ],
    },
    {
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Saboreie produtos',
      highlight: 'exclusivos',
      subtitle: 'Descubra iguarias selecionadas por especialistas',
      cta: [
        { text: 'Ver Produtos', link: '/produtos', variant: 'primary' },
        { text: 'Sobre Nós', link: '/sobre', variant: 'secondary' },
      ],
    },
    {
      image:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Economize com',
      highlight: 'vantagens únicas',
      subtitle: 'Acesso especial a descontos e benefícios exclusivos',
      cta: [
        { text: 'Ver Cupons', link: '/promocoes', variant: 'primary' },
        { text: 'Cadastre-se', link: '/register', variant: 'secondary' },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    if (distance < -50) setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Scroll suave dos carrosséis
  const scrollCarousel = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const scrollAmount = 300;
    const target = direction === 'left'
      ? ref.current.scrollLeft - scrollAmount
      : ref.current.scrollLeft + scrollAmount;
    ref.current.scrollTo({ left: target, behavior: 'smooth' });
  };

  // Adiciona dados de avaliação e delivery aos mocks
  const estabelecimentosComAvaliacao: EstabelecimentoComAvaliacao[] = mockEstabelecimentos.map((est: Estabelecimento) => ({
    ...est,
    avaliacao: 4.5 + Math.random() * 0.5,
    tempoEntrega: `${Math.floor(Math.random() * 30) + 20} min`,
    pedidoMinimo: Math.floor(Math.random() * 20) + 10
  }));

  const cuponsComUsos: PromocaoComUsos[] = mockCupons.map((cupom) => ({
    ...cupom,
    usos: Math.random() > 0.5 ? 'Ilimitado' : `${Math.floor(Math.random() * 100) + 1} usos`,
  }));

  // Filtrar estabelecimentos por polo
  const estabelecimentosFiltrados = estabelecimentosComAvaliacao.filter(est => 
    poloSelecionado === 'todos' || est.polo === poloSelecionado
  );

  const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');

  return (
    <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-8 space-y-12 sm:space-y-20">
      {/* Filtro de Polos Turísticos - Mobile */}
      <div className="md:hidden px-4">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-gray-900">Polos Turísticos</h2>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-4 px-4">
          {polosTuristicos.map((polo) => (
            <button
              key={polo.id}
              onClick={() => setPoloSelecionado(polo.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[100px] transition-all duration-300 ${
                poloSelecionado === polo.id
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:shadow-md'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-100">
                <img
                  src={polo.imagem}
                  alt={polo.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-center">{polo.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de Polos Turísticos - Desktop */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Polos Turísticos</h2>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {polosTuristicos.map((polo) => (
              <button
                key={polo.id}
                onClick={() => setPoloSelecionado(polo.id)}
                className={`group relative overflow-hidden rounded-2xl h-40 transition-all duration-300 ${
                  poloSelecionado === polo.id
                    ? 'ring-4 ring-amber-500 shadow-xl'
                    : 'hover:ring-2 hover:ring-amber-400 hover:shadow-lg'
                }`}
              >
                <img
                  src={polo.imagem}
                  alt={polo.nome}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{polo.nome}</h3>
                  <span className="text-sm opacity-90">
                    {estabelecimentosFiltrados.filter(est => est.polo === polo.id).length} estabelecimentos
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de pesquisa para mobile */}
      <div className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Busque por item ou loja"
              className="w-full bg-gray-50 rounded-xl py-3 px-4 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="bg-amber-500 text-white p-3 rounded-xl hover:bg-amber-600 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Section - Desktop */}
      <section
        className="relative min-h-[60vh] sm:min-h-[90vh] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl isolate group transition-shadow hover:shadow-3xl hidden md:block"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 transition-opacity duration-1000 ease-out">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center h-[60vh] sm:h-[90vh] flex items-center justify-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              {heroSlides[activeSlide].title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 animate-text-glow">
                {heroSlides[activeSlide].highlight}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100/90 font-light max-w-xl mx-auto leading-relaxed drop-shadow-md">
              {heroSlides[activeSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {heroSlides[activeSlide].cta.map((btn, i) => (
                <Link
                  key={i}
                  to={btn.link}
                  className={`px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl transition-transform duration-300 transform hover:scale-105 ${
                    btn.variant === 'primary'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 hover:shadow-glow shadow-lg'
                      : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 backdrop-blur-lg hover:border-white/40'
                  }`}
                >
                  {btn.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, ix) => (
            <button
              key={ix}
              onClick={() => setActiveSlide(ix)}
              className={`h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full transition-all duration-300 ${
                ix === activeSlide ? 'bg-amber-400 w-6 sm:w-8 scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir para o slide ${ix + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Banners para mobile */}
      <section className="md:hidden mt-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide -mx-4 px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-[85vw] h-[200px] rounded-2xl overflow-hidden snap-start shadow-lg">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-2xl font-bold leading-tight">
                  {slide.title}{' '}
                  <span className="text-amber-400">{slide.highlight}</span>
                </h3>
                <p className="text-sm opacity-90 mt-2 line-clamp-2">{slide.subtitle}</p>
                <div className="flex gap-2 mt-3">
                  {slide.cta.map((btn, i) => (
                    <Link
                      key={i}
                      to={btn.link}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        btn.variant === 'primary'
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {btn.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona - Mobile */}
      <section className="md:hidden mt-6">
        <div className="px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-bold text-gray-900">Escolha seu destino</h3>
              </div>
              <p className="text-sm text-gray-600 pl-14">
                Selecione o polo turístico que deseja visitar e descubra os melhores estabelecimentos da região
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-bold text-gray-900">Explore os estabelecimentos</h3>
              </div>
              <p className="text-sm text-gray-600 pl-14">
                Conheça restaurantes, bares e lojas locais com avaliações e informações detalhadas
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-bold text-gray-900">Aproveite os cupons</h3>
              </div>
              <p className="text-sm text-gray-600 pl-14">
                Use cupons exclusivos para economizar em seus pedidos e experiências
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <h3 className="font-bold text-gray-900">Viva a experiência</h3>
              </div>
              <p className="text-sm text-gray-600 pl-14">
                Desfrute dos melhores estabelecimentos locais com descontos especiais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias para mobile */}
      <section className="md:hidden mt-6">
        <div className="px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Categorias</h2>
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-4 px-4">
            {categoriasMobile.map((categoria) => {
              const Icon = categoria.icone;
              return (
                <Link
                  key={categoria.id}
                  to={`/categoria/${categoria.id}`}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow min-w-[80px]"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{categoria.nome}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estabelecimentos para mobile */}
      <section className="md:hidden mt-6">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Restaurantes em Destaque</h2>
            <Link to="/estabelecimentos" className="text-sm text-amber-600 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="space-y-4">
            {estabelecimentosFiltrados.slice(0, 5).map((est) => (
              <Link
                key={est.id}
                to={`/estabelecimentos/${est.id}`}
                className="block bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative h-40">
                  <img
                    src={est.imagem}
                    alt={est.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{est.avaliacao.toFixed(1)}</span>
                  </div>
                  {est.categoria && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-block text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        {est.categoria}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{est.nome}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{est.endereco}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{est.tempoEntrega}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>Pedido min. R$ {est.pedidoMinimo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque para mobile */}
      <section className="md:hidden mt-6">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Produtos em Destaque</h2>
            <Link to="/produtos" className="text-sm text-amber-600 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockProdutos.slice(0, 4).map((prod) => (
              <Link
                key={prod.id}
                to={`/produto/${prod.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    className="w-full h-full object-cover"
                  />
                  {prod.precoOriginal && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      -{Math.round(100 - (prod.preco / prod.precoOriginal) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{prod.nome}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{prod.descricao}</p>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-amber-600">R$ {formatPrice(prod.preco)}</span>
                    {prod.precoOriginal && (
                      <span className="text-xs text-gray-400 line-through">R$ {formatPrice(prod.precoOriginal)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cupons em Destaque para mobile */}
      <section className="md:hidden mt-6">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Cupons Exclusivos</h2>
            <Link to="/promocoes" className="text-sm text-amber-600 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cuponsComUsos.slice(0, 4).map((cupom) => (
              <div
                key={cupom.id}
                className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-3"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg px-3 py-2 text-center">
                    <span className="text-xl font-black text-amber-900">{cupom.desconto}%</span>
                    <span className="block text-[0.65rem] font-bold text-amber-800 uppercase">OFF</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{cupom.nome}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{cupom.descricao}</p>
                <Link
                  to={`/promocao/${cupom.id}`}
                  className="block w-full text-center bg-amber-500 text-white text-xs font-bold py-1.5 rounded-lg"
                >
                  Resgatar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona - Desktop */}
      <section className="hidden md:block mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Como Funciona
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra como aproveitar ao máximo sua experiência em polos turísticos
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-50 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Escolha seu destino</h3>
                <p className="text-gray-600">
                  Selecione o polo turístico que deseja visitar e descubra os melhores estabelecimentos da região
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-50 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Explore os estabelecimentos</h3>
                <p className="text-gray-600">
                  Conheça restaurantes, bares e lojas locais com avaliações e informações detalhadas
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-50 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Aproveite os cupons</h3>
                <p className="text-gray-600">
                  Use cupons exclusivos para economizar em seus pedidos e experiências
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-50 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md mb-4">
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Viva a experiência</h3>
                <p className="text-gray-600">
                  Desfrute dos melhores estabelecimentos locais com descontos especiais
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locais Imperdíveis - Desktop */}
      <section className="space-y-8 sm:space-y-12 hidden md:block">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl font-bold text-gray-900">
            <span>Locais </span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Exclusivos</span>
          </h2>
          <Link
            to="/estabelecimentos"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
          >
            Explorar Todos →
          </Link>
        </div>

        {/* Desktop Grid View */}
        <div className="relative group">
          <button
            onClick={() => scrollCarousel('left', carouselRefs.estabelecimentos)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para esquerda"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={carouselRefs.estabelecimentos}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {estabelecimentosFiltrados.map((est) => (
              <div
                key={est.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(est.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
              <Link to={`/estabelecimento/${est.id}`} className="block">
                <div className="aspect-square relative overflow-hidden">
                    <img
                      src={est.imagem}
                      alt={est.nome}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ {est.avaliacao.toFixed(1)}
                    </span>
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 text-white space-y-2 transition-all duration-300 ${
                        hoveredCard === est.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                          {est.tempoEntrega}
                        </span>
                        <span className="text-sm font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                          Pedido min. R$ {est.pedidoMinimo}
                        </span>
                      </div>
                      {est.categoria && (
                        <span className="inline-block text-xs font-medium bg-amber-500/80 px-2 py-1 rounded-md backdrop-blur-sm">
                          {est.categoria}
                        </span>
                      )}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
                  <h3 className="text-xl font-bold truncate drop-shadow-md">{est.nome}</h3>
                  <p className="text-sm font-medium truncate opacity-90">{est.endereco}</p>
                </div>
              </Link>
            </div>
          ))}
          </div>
          <button
            onClick={() => scrollCarousel('right', carouselRefs.estabelecimentos)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para direita"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Produtos em Destaque - Desktop */}
      <section className="space-y-4 md:space-y-8 hidden md:block">
        <div className="flex items-center justify-between mb-3 md:mb-8">
          <h2 className="text-lg md:text-5xl font-bold text-gray-900">
            Produtos <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent md:inline hidden">Selecionados</span>
            <span className="md:hidden">em Destaque</span>
            </h2>
          <Link to="/produtos" className="text-sm text-amber-600 font-medium md:hidden">
            Ver todos
          </Link>
          <Link
            to="/produtos"
            className="hidden md:block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
          >
            Ver Todos →
          </Link>
        </div>

        {/* Desktop Grid View */}
        <div className="relative group hidden md:block">
          <button
            onClick={() => scrollCarousel('left', carouselRefs.produtos)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para esquerda"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={carouselRefs.produtos}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8"
          >
          {mockProdutos.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 flex-shrink-0 w-[85vw] sm:w-[300px] md:w-auto snap-center"
                onMouseEnter={() => setHoveredCard(prod.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
              <Link to={`/produto/${prod.id}`}>
                <div className="aspect-square relative overflow-hidden">
                    <img
                      src={prod.imagem}
                      alt={prod.nome}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  {prod.precoOriginal && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                        -{Math.round(100 - (prod.preco / prod.precoOriginal) * 100)}%
                    </span>
                  )}
                    <div
                      className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredCard === prod.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button className="bg-amber-500 text-white px-6 py-3 rounded-full font-bold transform hover:scale-105 transition-transform">
                        Ver Detalhes
                      </button>
                    </div>
                </div>
                  <div className="p-4 sm:p-6 space-y-3">
                  <h3 className="font-semibold text-gray-900 truncate text-lg">{prod.nome}</h3>
                  <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-amber-600">
                        R$ {formatPrice(prod.preco)}
                      </span>
                    {prod.precoOriginal && (
                        <span className="text-gray-400 line-through text-sm">
                          R$ {formatPrice(prod.precoOriginal)}
                        </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{prod.descricao}</p>
                </div>
              </Link>
            </div>
          ))}
          </div>
          <button
            onClick={() => scrollCarousel('right', carouselRefs.produtos)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para direita"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Cupons em Destaque - Desktop */}
      <section className="space-y-4 md:space-y-8 hidden md:block">
        <div className="flex items-center justify-between mb-3 md:mb-8">
          <h2 className="text-lg md:text-5xl font-bold text-gray-900">
            Cupons <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent md:inline hidden">exclusivos</span>
            <span className="md:hidden">em Destaque</span>
            </h2>
          <Link to="/promocoes" className="text-sm text-amber-600 font-medium md:hidden">
            Ver todos
          </Link>
          <Link
            to="/promocoes"
            className="hidden md:block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
          >
            Ver Todos →
          </Link>
        </div>
  
        {/* Desktop Grid View */}
        <div className="relative group hidden md:block">
          <button
            onClick={() => scrollCarousel('left', carouselRefs.cupons)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para esquerda"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={carouselRefs.cupons}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6"
          >
            {cuponsComUsos.map((cupom) => (
      <div
        key={cupom.id}
                className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden p-4 sm:p-6 flex-shrink-0 w-[85vw] sm:w-[300px] md:w-auto snap-center"
                onMouseEnter={() => setHoveredCard(cupom.id)}
                onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              Oferta Limitada
            </span>
            <h3 className="text-xl font-bold text-gray-900">{cupom.nome}</h3>
            <p className="text-sm text-gray-600">{cupom.descricao}</p>
          </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex flex-col items-center justify-center shadow-md">
            <span className="text-xl font-black text-amber-900">{cupom.desconto}%</span>
            <span className="text-[0.65rem] font-bold text-amber-800 uppercase">OFF</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-md">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Validade</p>
                <p className="text-sm font-semibold text-gray-800">{cupom.dataFim}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-md">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Usos</p>
                        <p className="text-sm font-semibold text-gray-800">{cupom.usos}</p>
              </div>
            </div>
          </div>
          <Link
            to={`/promocao/${cupom.id}`}
                    className={`block w-full text-center bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 text-sm font-bold py-2.5 px-4 rounded-lg transition-transform duration-300 ${
                      hoveredCard === cupom.id ? 'shadow-lg transform scale-105' : 'hover:shadow-sm'
                    }`}
          >
            Resgatar Agora →
          </Link>
        </div>
      </div>
    ))}
          </div>
          <button
            onClick={() => scrollCarousel('right', carouselRefs.cupons)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0"
            aria-label="Rolar para direita"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
  </div>
</section>
    </div>
  );
};

export default Home;
