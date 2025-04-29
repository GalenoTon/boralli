// src/pages/Promocoes.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Tag, X, Filter } from 'lucide-react';
import { mockPromocoes } from '../mocks/promocoes';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { motion, AnimatePresence } from 'framer-motion';

const Promocoes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));
  const categories = Array.from(new Set(mockEstabelecimentos.map(est => est.categoria)));

  const renderBadge = (promocao: typeof mockPromocoes[0]) => {
    switch (promocao.tipo) {
      case 'desconto':
        return `${promocao.desconto}% OFF`;
      case 'leve-mais-pague-menos':
        return `Leve ${promocao.quantidadeLeve}, Pague ${promocao.quantidadePague}`;
      case 'brinde':
        return `Brinde: ${promocao.brindeDescricao?.substring(0, 20)}...`;
      case 'valor-fixo':
        return `R$ ${promocao.valorFixo?.toFixed(2)}`;
      default:
        return 'Promoção';
    }
  };

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'desconto': return 'bg-green-500';
      case 'leve-mais-pague-menos': return 'bg-blue-500';
      case 'brinde': return 'bg-purple-500';
      case 'valor-fixo': return 'bg-orange-500';
      default: return 'bg-primary-500';
    }
  };

  const filteredPromocoes = mockPromocoes.filter(promo => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === promo.estabelecimentoId);
    const matchesSearch = promo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    const matchesCategory = !selectedCategory || estabelecimento?.categoria === selectedCategory;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedLocation(null);
    setSelectedCategory(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 h-[600px]">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mercado local com promoções"
            className="h-full w-full object-cover object-center opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 via-primary-700/50 to-primary-900/90" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Ofertas Exclusivas
              </span>
              <br />
              <span className="bg-gradient-to-l from-accent-300 to-primary-400 bg-clip-text text-transparent">
                Bombinhas
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl leading-8 text-gray-200 font-light max-w-2xl mx-auto"
            >
              Economize com as melhores promoções dos estabelecimentos locais
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/30" />
      </div>

      {/* Barra de Pesquisa */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar promoções..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {isMobile && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros Desktop */}
      {!isMobile && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
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
              {(selectedLocation || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Filtros Mobile */}
      <AnimatePresence>
        {isMobile && showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Polo Turístico</label>
                  <select
                    value={selectedLocation || ''}
                    onChange={(e) => setSelectedLocation(e.target.value || null)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Todos os polos</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Promoções */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredPromocoes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">Nenhuma promoção encontrada.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPromocoes.map(promocao => {
              const estabelecimento = mockEstabelecimentos.find(est => est.id === promocao.estabelecimentoId);
              return (
                <Link
                  key={promocao.id}
                  to={`/promocao/${promocao.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={promocao.imagem}
                      alt={promocao.nome}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-3 right-3 ${getBadgeColor(promocao.tipo)} text-white px-2 py-1 rounded-lg text-xs font-bold`}>
                      {renderBadge(promocao)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{promocao.nome}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {promocao.descricao}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="truncate">{estabelecimento?.nome}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Tag className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{estabelecimento?.categoria}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-primary-500" />
                      <span>
                        {new Date(promocao.dataInicio).toLocaleDateString()} - {' '}
                        {new Date(promocao.dataFim).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promocoes;