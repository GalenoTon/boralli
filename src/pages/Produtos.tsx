// src/pages/Produtos.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiSearch, FiMapPin, FiFilter, FiX } from 'react-icons/fi';
import { mockProdutos } from '../mocks/produtos';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { motion, AnimatePresence } from 'framer-motion';

const ProdutosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const categories = Array.from(new Set(mockProdutos.map(prod => prod.categoria)));
  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));

  const filteredProdutos = mockProdutos.filter(prod => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === prod.estabelecimentoId);
    const matchesSearch = prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prod.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prod.categoria === selectedCategory;
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section - Otimizado para mobile */}
      <div className="relative bg-primary-500">
        <div className="absolute inset-0">
          <img
            src="/images/promocoes-hero.jpg"
            alt="Produtos"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Produtos
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Explore nossa seleção de produtos e descubra as melhores ofertas
            </p>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa - Sempre visível */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {isMobile && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FiFilter className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros - Visíveis em desktop, modal em mobile */}
      {!isMobile && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
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
              {(selectedCategory || selectedLocation || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <FiX className="w-4 h-4" />
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Filtros para Mobile */}
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
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Polo Turístico
                  </label>
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

      {/* Indicadores de Filtros Ativos - Mobile */}
      {isMobile && (selectedCategory || selectedLocation) && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                <FiTag className="w-3 h-3" />
                <span>{selectedCategory}</span>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 p-0.5 rounded-full hover:bg-primary-200"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
            {selectedLocation && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                <FiMapPin className="w-3 h-3" />
                <span>{selectedLocation}</span>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="ml-1 p-0.5 rounded-full hover:bg-primary-200"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid de Produtos - Otimizado para mobile */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredProdutos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">Nenhum produto encontrado.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProdutos.map(produto => {
              const estabelecimento = mockEstabelecimentos.find(est => est.id === produto.estabelecimentoId);
              return (
                <Link
                  key={produto.id}
                  to={`/produto/${produto.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                    {produto.desconto && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        -{produto.desconto}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{produto.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <FiMapPin className="w-4 h-4 text-primary-500" />
                      <span className="truncate">{estabelecimento?.nome}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <FiTag className="w-4 h-4 text-primary-500" />
                      <span>{produto.categoria}</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-primary-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      {produto.precoOriginal && (
                        <span className="text-sm text-gray-400 line-through">
                          R$ {produto.precoOriginal.toFixed(2)}
                        </span>
                      )}
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

export default ProdutosPage;