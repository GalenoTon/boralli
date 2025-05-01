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
  Map,
  ArrowRight,
  DollarSign,
  Calendar,
  Users,
  Store,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Trophy,
  Heart,
  Navigation,
  Wallet
} from 'lucide-react';
import { usePolo } from '../contexts/PoloContext';
import { motion } from 'framer-motion';

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
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const carouselRefs = {
    estabelecimentos: useRef<HTMLDivElement>(null),
    produtos: useRef<HTMLDivElement>(null),
    cupons: useRef<HTMLDivElement>(null),
  };

  const { poloSelecionado, setPoloSelecionado, filtrarEstabelecimentos, filtrarPorPolo } = usePolo();

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Descubra o melhor do',
      highlight: 'Rio de Janeiro',
      subtitle: 'Explore restaurantes, bares e atrações turísticas incríveis',
      cta: [
        { text: 'Explorar Agora', link: '/estabelecimentos', variant: 'primary' },
        { text: 'Como Funciona', link: '#como-funciona', variant: 'secondary' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Experiências',
      highlight: 'Gastronômicas',
      subtitle: 'Sabores únicos em cada polo turístico da cidade',
      cta: [
        { text: 'Ver Restaurantes', link: '/estabelecimentos', variant: 'primary' },
        { text: 'Ver Promoções', link: '/promocoes', variant: 'secondary' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Momentos',
      highlight: 'Inesquecíveis',
      subtitle: 'Lugares perfeitos para criar memórias especiais',
      cta: [
        { text: 'Descobrir Lugares', link: '/estabelecimentos', variant: 'primary' },
        { text: 'Criar Conta', link: '/register', variant: 'secondary' },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Filtrar estabelecimentos
  const estabelecimentosFiltrados = filtrarEstabelecimentos(estabelecimentosComAvaliacao);
  
  // Filtrar produtos
  const produtosFiltrados = filtrarPorPolo(mockProdutos, mockEstabelecimentos);
  
  // Filtrar promoções
  const promocoesFiltradas = filtrarPorPolo(mockCupons, mockEstabelecimentos);

  const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');

  // Adicionar skeleton loading para estabelecimentos
  const EstabelecimentoSkeleton = () => (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Desktop */}
      <section className="hidden md:block relative h-[85vh] overflow-hidden">
  {heroSlides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${slide.image})`,
          transform: index === activeSlide ? 'scale(1)' : 'scale(1.1)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Content Container */}
      <div className="relative h-full container mx-auto px-6">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-2xl space-y-6">
            {/* Animated Tag */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-6 py-2.5 bg-white/20 backdrop-blur-lg rounded-full text-white text-sm font-semibold border border-white/30">
                {index === 0 ? 'Destaque' : index === 1 ? 'Gastronomia' : 'Experiências'}
              </span>
            </motion.div>

            {/* Titles with Staggered Animation */}
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold text-white leading-tight mx-auto"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mx-auto"
              >
                {slide.highlight}
              </motion.p>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-white/90 leading-relaxed max-w-xl mx-auto"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex gap-5 mt-8 justify-center"
            >
              {slide.cta.map((button, idx) => (
                <Link
                  key={idx}
                  to={button.link}
                  className={`
                    px-8 py-4 rounded-xl font-semibold
                    transition-all duration-300 transform hover:scale-[1.03]
                    ${button.variant === 'primary'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:border-white/50'
                    }
                  `}
                >
                  {button.text}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === activeSlide 
                  ? 'w-10 bg-gradient-to-r from-amber-500 to-amber-600' 
                  : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Arrows Navigation */}
        <div className="absolute inset-y-0 left-6 flex items-center">
          <button
            onClick={() => setActiveSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-6 flex items-center">
          <button
            onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  ))}
</section>

      {/* Container principal com espaçamentos estilo globo.com */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Mobile View */}
        <div className="md:hidden">
          {/* Categorias Mobile - Scroll Horizontal */}
          <div className="overflow-x-auto -mx-4 px-4 py-4 bg-white">
            <div className="flex gap-4 min-w-max">
              {categoriasMobile.map((cat) => {
                const Icon = cat.icone;
                return (
                  <div key={cat.id} className="flex flex-col items-center w-16">
                    <div className="p-3 rounded-xl bg-amber-50 mb-2">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-xs text-gray-700 text-center">{cat.nome}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Como Funciona - Mobile */}
          <div className="mt-6 bg-white -mx-4 px-4 py-6">
            <h2 className="text-lg font-bold mb-4">Como Funciona</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Navigation,
                  title: 'Escolha seu Polo',
                  description: 'Selecione o polo turístico que deseja explorar'
                },
                {
                  icon: Heart,
                  title: 'Encontre Lugares',
                  description: 'Explore estabelecimentos com avaliações reais'
                },
                {
                  icon: Wallet,
                  title: 'Aproveite Ofertas',
                  description: 'Acesse promoções exclusivas e descontos'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50">
                    <item.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.description}</p>
        </div>
                </div>
              ))}
            </div>
                </div>

          {/* Estabelecimentos Mobile */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Estabelecimentos em Destaque</h2>
              <Link to="/estabelecimentos" className="text-amber-600 text-xs font-medium">
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {estabelecimentosFiltrados.slice(0, 4).map((est) => (
          <Link
                  key={est.id}
                  to={`/estabelecimento/${est.id}`}
                  className="block bg-white rounded-xl"
                >
                  <img
                    src={est.imagem}
                    alt={est.nome}
                    className="w-full aspect-[4/3] object-cover rounded-t-xl"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 truncate">{est.nome}</h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 text-amber-500 mr-1" />
                      <span>{est.avaliacao.toFixed(1)}</span>
                      <span className="mx-1">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{est.tempoEntrega}</span>
                </div>
                  </div>
                </Link>
              ))}
            </div>
                </div>

          {/* Produtos Mobile */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Produtos em Destaque</h2>
              <Link to="/produtos" className="text-amber-600 text-xs font-medium">
                Ver todos
              </Link>
            </div>
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-3 min-w-max">
                {produtosFiltrados.map((produto) => (
                  <Link
                    key={produto.id}
                    to={`/produto/${produto.id}`}
                    className="block w-[160px] bg-white rounded-xl"
                  >
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full aspect-square object-cover rounded-t-xl"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 truncate">{produto.nome}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {produto.descricao}
                      </p>
                      <span className="text-sm font-bold text-amber-600">
                        R$ {formatPrice(produto.preco)}
                      </span>
                    </div>
                  </Link>
          ))}
        </div>
            </div>
          </div>

          {/* Promoções Mobile */}
          <div className="mt-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Promoções Disponíveis</h2>
              <Link to="/promocoes" className="text-amber-600 text-xs font-medium">
                Ver todas
          </Link>
        </div>
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-3 min-w-max">
                {promocoesFiltradas.map((cupom) => (
      <div
        key={cupom.id}
                    className="w-[280px] bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-base font-bold mb-1">{cupom.titulo}</h3>
                        <p className="text-xs text-white/90">{cupom.descricao}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-4">
                      <div className="flex items-center bg-white/10 rounded-lg px-2 py-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Válido até {cupom.dataFim}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-lg px-2 py-1">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{(cupom as PromocaoComUsos).usos}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs bg-white/10 rounded-lg px-2 py-1">
                        <Store className="w-3 h-3 mr-1" />
                        <span>
                          {mockEstabelecimentos.find((e) => e.id === cupom.estabelecimentoId)?.nome}
            </span>
                      </div>
                      <button className="flex items-center gap-1 bg-white text-amber-600 rounded-lg px-3 py-1 text-xs font-medium">
                        <Check className="w-3 h-3" />
                        Resgatar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Como Funciona - Desktop */}
          <section className="py-12">
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: Navigation,
                  title: 'Escolha seu Polo',
                  description: 'Selecione o polo turístico que deseja explorar'
                },
                {
                  icon: Heart,
                  title: 'Encontre Lugares',
                  description: 'Explore estabelecimentos com avaliações reais'
                },
                {
                  icon: Wallet,
                  title: 'Aproveite Ofertas',
                  description: 'Acesse promoções exclusivas e descontos'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-50">
                    <item.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Estabelecimentos Desktop */}
          <section className="py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Estabelecimentos em Destaque</h2>
              <Link
                to="/estabelecimentos"
                className="text-amber-600 text-sm font-medium hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {estabelecimentosFiltrados.map((est) => (
                <Link
                  key={est.id}
                  to={`/estabelecimento/${est.id}`}
                  className="block bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={est.imagem}
                      alt={est.nome}
                      className="w-full aspect-[4/3] object-cover rounded-t-xl"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">{est.avaliacao.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{est.nome}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{est.tempoEntrega}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{est.endereco}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Produtos Desktop */}
          <section className="py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel('left', carouselRefs.produtos)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="w-5 h-5 transform rotate-180" />
                </button>
                <button
                  onClick={() => scrollCarousel('right', carouselRefs.produtos)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={carouselRefs.produtos}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {produtosFiltrados.map((produto) => (
                <Link
                  key={produto.id}
                  to={`/produto/${produto.id}`}
                  className="flex-none w-[280px] snap-start bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full aspect-[4/3] object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{produto.nome}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-600">
                        R$ {formatPrice(produto.preco)}
                      </span>
                      <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm">
                        Ver mais
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Promoções Desktop */}
          <section className="py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Promoções Disponíveis</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel('left', carouselRefs.cupons)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="w-5 h-5 transform rotate-180" />
                </button>
                <button
                  onClick={() => scrollCarousel('right', carouselRefs.cupons)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={carouselRefs.cupons}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {promocoesFiltradas.map((cupom) => (
                <div
                  key={cupom.id}
                  className="flex-none w-[320px] snap-start bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{cupom.titulo}</h3>
                      <p className="text-sm text-white/90">{cupom.descricao}</p>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
                      <DollarSign className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm mb-8">
                    <div className="flex items-center bg-white/10 rounded-xl px-4 py-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Válido até <br></br> {cupom.dataFim}</span>
                    </div>
                    <div className="flex items-center bg-white/10 rounded-xl px-4 py-2">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{(cupom as PromocaoComUsos).usos}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white/10 rounded-xl px-4 py-2">
                      <Store className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {mockEstabelecimentos.find((e) => e.id === cupom.estabelecimentoId)?.nome}
                      </span>
          </div>
                    <button className="flex items-center gap-2 bg-white text-amber-600 hover:bg-white/90 transition-colors rounded-xl px-6 py-3 font-medium">
                      <Check className="w-5 h-5" />
                      Resgatar
                    </button>
        </div>
      </div>
    ))}
  </div>
</section>
        </div>
      </div>
    </div>
  );
};

export default Home;
