// src/pages/dashboard/DashboardProdutos.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiDollarSign, FiTag, FiClock, FiPercent, FiMapPin, FiEye, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProdutos } from '../../mocks/produtos';
import { Produto } from '../../types/Produto';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
  step?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, error, type = 'text', required = false, step, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-200'
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
      step={step}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  error?: string;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, options, error, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-200'
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
    >
      <option value="">Selecione...</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const DashboardProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setErrors({});
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.categoria?.trim()) novosErros.categoria = 'Categoria é obrigatória';
    if (!formData.preco) novosErros.preco = 'Preço é obrigatório';
    
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      if (formData.id) {
        setProdutos(produtos.map(p => 
          p.id === formData.id ? { ...p, ...formData } as Produto : p
      ));
    } else {
      const newProduto: Produto = {
          id: Date.now().toString(),
          ...formData,
          preco: Number(formData.preco),
          desconto: formData.desconto ? Number(formData.desconto) : 0,
          tempoPreparo: formData.tempoPreparo || "15-20 min"
        } as Produto;
      setProdutos([...produtos, newProduto]);
      }
      setShowModal(false);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleEdit = (produto: Produto) => {
    setFormData(produto);
    setShowModal(true);
  };

  const handleViewDetails = (produto: Produto) => {
    setSelectedProduto(produto);
    setShowDetailsModal(true);
  };

  const filteredProdutos = produtos
    .filter(p => {
      const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? p.categoria === selectedCategory : true;
      const matchesEstabelecimento = selectedEstabelecimento ? p.estabelecimentoId === selectedEstabelecimento : true;
      return matchesSearch && matchesCategory && matchesEstabelecimento;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.preco - b.preco;
      if (sortBy === 'price-desc') return b.preco - a.preco;
      // Por padrão, ordena por popularidade (simulada)
      return Math.random() - 0.5; // Simulação para este exemplo
    });

  const getEstabelecimentoNome = (estabelecimentoId: string) => {
    const estabelecimento = mockEstabelecimentos.find(e => e.id === estabelecimentoId);
    return estabelecimento ? estabelecimento.nome : 'Desconhecido';
  };

  const calcularPrecoComDesconto = (preco: number, desconto?: number) => {
    if (!desconto) return preco;
    return preco - (preco * desconto / 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
      {/* Mobile Floating Button */}
      {isMobile && (
        <div className="fixed right-4 bottom-20 z-20">
          <button
            onClick={() => setShowModal(true)}
            className="w-14 h-14 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <FiPlus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500">Gerencie o cardápio do seu estabelecimento</p>
        </div>
        {!isMobile && (
        <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          <FiPlus className="w-5 h-5" />
            Adicionar
        </button>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-6 sticky top-16 sm:top-20 -mx-4 px-4 sm:mx-0 sm:px-0 pt-2 pb-4 bg-white z-10 border-b border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
              <option value="">Todas categorias</option>
              {Array.from(new Set(produtos.map(p => p.categoria))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
              value={selectedEstabelecimento || ''}
              onChange={(e) => setSelectedEstabelecimento(e.target.value || null)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
              <option value="">Todos estabelecimentos</option>
              {mockEstabelecimentos.map(estabelecimento => (
                <option key={estabelecimento.id} value={estabelecimento.id}>{estabelecimento.nome}</option>
            ))}
          </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popularity' | 'price-asc' | 'price-desc')}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="popularity">Mais populares</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="relative">
        {filteredProdutos.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Nenhum produto encontrado</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedEstabelecimento(null);
              }}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">{filteredProdutos.length} produtos encontrados</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredProdutos.map(produto => (
                  <motion.div
                    key={produto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="relative">
                      <div className="h-36 bg-gray-100 relative overflow-hidden">
                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                        />
                        {produto.desconto && produto.desconto > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                            <FiPercent className="w-3 h-3 mr-1" />
                            {produto.desconto}% OFF
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => handleEdit(produto)}
                          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                          aria-label="Editar"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(produto.id)}
                          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                          aria-label="Excluir"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {produto.categoria}
                        </span>
                        {!produto.disponivel && (
                          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                            Indisponível
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mt-1 mb-1">{produto.nome}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{produto.descricao}</p>
                      <div className="flex items-center mb-3 text-xs text-gray-500">
                        <FiMapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{getEstabelecimentoNome(produto.estabelecimentoId)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-end gap-1">
                          {produto.desconto && produto.desconto > 0 ? (
                            <>
                              <span className="text-gray-400 text-xs line-through">
                                R$ {produto.preco.toFixed(2)}
                              </span>
                              <span className="text-red-600 font-semibold">
                                R$ {calcularPrecoComDesconto(produto.preco, produto.desconto).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-900 font-semibold">
                              R$ {produto.preco.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-500 text-xs">
                          <FiClock className="w-3 h-3 mr-1" />
                          {produto.tempoPreparo || "15-20 min"}
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(produto)}
                        className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                      >
                        <FiEye className="w-4 h-4" />
                        Ver Detalhes
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
        </div>
          </>
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 ${
              isMobile ? 'bg-white overflow-y-auto' : 'flex items-center justify-center p-4 backdrop-blur-sm bg-black/50'
            }`}
            onClick={isMobile ? undefined : () => setShowModal(false)}
        >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`${
                isMobile 
                  ? 'w-full' 
                  : 'relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header Fixo */}
              <div className={`sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm ${
                isMobile ? '' : 'rounded-t-xl'
              }`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleCloseModal()}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FiArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h2 className="text-lg font-bold text-gray-900">
                      {formData.id ? 'Editar Produto' : 'Novo Produto'}
              </h2>
                  </div>
              <button
                    onClick={() => handleCloseModal()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
                </div>
            </div>

              {/* Conteúdo */}
              <div className={`${
                isMobile 
                  ? 'max-w-4xl mx-auto px-4 py-6' 
                  : 'overflow-y-auto max-h-[70vh] p-4 modal-scroll'
              }`}>
                <form id="produto-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Nome"
                      value={formData.nome || ''}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      error={errors.nome}
                    required
                  />
                    <FormInput
                      label="Descrição"
                      value={formData.descricao || ''}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      error={errors.descricao}
                    required
                  />
                </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Preço (R$)"
                      value={formData.preco || ''}
                      onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
                        type="number"
                      step="0.01"
                      error={errors.preco}
                        required
                      />
                    <FormInput
                      label="Desconto (%)"
                      value={formData.desconto || ''}
                      onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) || 0 })}
                        type="number"
                      step="1"
                      />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormSelect
                      label="Categoria"
                      value={formData.categoria || ''}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      options={Array.from(new Set(produtos.map(p => p.categoria)))}
                      error={errors.categoria}
                      required
                    />
                    <FormSelect
                      label="Estabelecimento"
                      value={formData.estabelecimentoId || ''}
                      onChange={(e) => {
                        const estabelecimentoId = mockEstabelecimentos.find(est => est.nome === e.target.value)?.id || '';
                        setFormData({ ...formData, estabelecimentoId });
                      }}
                      options={mockEstabelecimentos.map(e => e.nome)}
                      error={errors.estabelecimentoId}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Tempo de Preparo (minutos)"
                      value={formData.tempoPreparo || ''}
                      onChange={(e) => setFormData({ ...formData, tempoPreparo: Number(e.target.value) })}
                      type="number"
                      step="1"
                      placeholder="Ex: 20"
                    />
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-red-500 rounded-md focus:ring-red-500 border-gray-300"
                          checked={formData.disponivel !== false}
                          onChange={(e) => setFormData({ ...formData, disponivel: e.target.checked })}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Disponível</span>
                    </label>
                  </div>
                </div>

                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  />

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                      onClick={() => handleCloseModal()}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                      className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors text-sm font-medium"
              >
                      {formData.id ? 'Salvar' : 'Criar'}
              </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {showDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 ${
              isMobile ? 'bg-white overflow-y-auto' : 'flex items-center justify-center p-4 backdrop-blur-sm bg-black/50'
            }`}
            onClick={isMobile ? undefined : () => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`${
                isMobile 
                  ? 'w-full' 
                  : 'relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Fixo */}
              <div className={`sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm ${
                isMobile ? '' : 'rounded-t-xl'
              }`}>
                <div className="flex items-center gap-4 p-4">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedProduto?.nome || 'Detalhes do Produto'}
                  </h2>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={`${
                isMobile 
                  ? 'max-w-4xl mx-auto px-4 py-6' 
                  : 'overflow-y-auto max-h-[70vh] p-4 modal-scroll'
              }`}>
                {selectedProduto && (
                  <div className="space-y-6">
                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                      <img 
                        src={selectedProduto.imagem}
                        alt={selectedProduto.nome}
                        className="w-full h-full object-cover"
                      />
                      {selectedProduto.desconto && selectedProduto.desconto > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-full font-medium shadow-sm flex items-center">
                            <FiPercent className="w-4 h-4 mr-1" />
                            {selectedProduto.desconto}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Informações Gerais</h3>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                          <div className="flex items-start gap-3">
                            <FiTag className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{selectedProduto.categoria}</p>
                              <p className="text-sm text-gray-500">Categoria</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiDollarSign className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">
                                {selectedProduto.desconto && selectedProduto.desconto > 0 ? (
                                  <>
                                    <span className="text-gray-400 line-through mr-2">
                                      R$ {selectedProduto.preco.toFixed(2)}
                                    </span>
                                    <span className="text-red-600">
                                      R$ {calcularPrecoComDesconto(selectedProduto.preco, selectedProduto.desconto).toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  `R$ ${selectedProduto.preco.toFixed(2)}`
                                )}
                              </p>
                              <p className="text-sm text-gray-500">Preço</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiClock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{selectedProduto.tempoPreparo || "15-20 min"}</p>
                              <p className="text-sm text-gray-500">Tempo de preparo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Descrição</h3>
                        <p className="text-gray-800">{selectedProduto.descricao}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Estabelecimento</h3>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-800">{getEstabelecimentoNome(selectedProduto.estabelecimentoId)}</span>
                        </div>
            </div>
          </div>
        </div>
      )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardProdutos;