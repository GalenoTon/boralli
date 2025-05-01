// src/pages/dashboard/DashboardEstabelecimentos.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiX, FiGrid, FiList, FiStar, FiClock, FiEye, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEstabelecimentos, Estabelecimento } from '../../mocks/estabelecimentos';
import { mockProdutos } from '../../mocks/produtos';
import { mockPromocoes } from '../../mocks/promocoes';

const categorias = ["Bar", "Restaurante", "Cafeteria", "Outros"] as const;
const polosTuristicos = ["Centro Histórico", "Bairro Italiano", "Zona Sul", "Jardins", "Outro"] as const;

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, error, type = 'text', required = false }) => (
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

const DashboardEstabelecimentos: React.FC = () => {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(mockEstabelecimentos);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<Estabelecimento | null>(null);
  const [formData, setFormData] = useState<Partial<Estabelecimento>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode('list');
      }
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
    if (!formData.endereco?.trim()) novosErros.endereco = 'Endereço é obrigatório';
    if (!formData.poloTuristico?.trim()) novosErros.poloTuristico = 'Polo Turístico é obrigatório';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      if (formData.id) {
        setEstabelecimentos(estabelecimentos.map(e => 
          e.id === formData.id ? { ...e, ...formData } as Estabelecimento : e
        ));
      } else {
        const newEstabelecimento: Estabelecimento = {
          id: Date.now().toString(),
          ...formData,
        } as Estabelecimento;
        setEstabelecimentos([...estabelecimentos, newEstabelecimento]);
      }
      setShowModal(false);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    setEstabelecimentos(estabelecimentos.filter(e => e.id !== id));
  };

  const handleEdit = (estabelecimento: Estabelecimento) => {
    setFormData(estabelecimento);
    setShowModal(true);
  };

  const handleViewDetails = (estabelecimento: Estabelecimento) => {
    setSelectedEstabelecimento(estabelecimento);
    setShowDetailsModal(true);
  };

  const filteredEstabelecimentos = estabelecimentos.filter(e => {
    const matchesSearch = e.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? e.categoria === selectedCategory : true;
    const matchesLocation = selectedLocation ? e.poloTuristico === selectedLocation : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const renderGridEstabelecimentos = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {filteredEstabelecimentos.map(estabelecimento => (
          <motion.div
            key={estabelecimento.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="relative h-36 sm:h-48">
              <img
                src={estabelecimento.imagem}
                alt={estabelecimento.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent"></div>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleViewDetails(estabelecimento)}
                  className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                  aria-label="Ver detalhes"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEdit(estabelecimento)}
                  className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                  aria-label="Editar"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(estabelecimento.id)}
                  className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                  aria-label="Excluir"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs rounded-full font-medium shadow-sm">
                  {estabelecimento.categoria}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{estabelecimento.nome}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FiMapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">{estabelecimento.endereco}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{estabelecimento.descricao}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                  <FiStar className="w-3 h-3 mr-1" />
                  4.8
                </span>
                <span className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  <FiClock className="w-3 h-3 mr-1" />
                  20-30min
                </span>
                <span className="flex items-center px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                  {estabelecimento.poloTuristico}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderListEstabelecimentos = () => (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {filteredEstabelecimentos.map(estabelecimento => (
          
          <motion.div
            key={estabelecimento.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
              <img
                src={estabelecimento.imagem}
                alt={estabelecimento.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full p-1">
                <span className="block w-full text-center text-xs bg-white/90 backdrop-blur-sm text-gray-800 rounded-full py-0.5 font-medium">
                  {estabelecimento.categoria}
                </span>
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold text-gray-900">{estabelecimento.nome}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewDetails(estabelecimento)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    aria-label="Ver detalhes"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(estabelecimento)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    aria-label="Editar"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(estabelecimento.id)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    aria-label="Excluir"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <FiMapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{estabelecimento.endereco}</span>
              </div>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-grow">{estabelecimento.descricao}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center text-red-600 font-medium">
                  <FiStar className="w-3 h-3 mr-0.5" />
                  4.8
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">20-30min</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 truncate">{estabelecimento.poloTuristico}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const getProdutosDoEstabelecimento = (estabelecimentoId: string) => {
    return mockProdutos.filter(p => p.estabelecimentoId === estabelecimentoId);
  };

  const getPromocoesDoEstabelecimento = (estabelecimentoId: string) => {
    return mockPromocoes.filter(p => p.estabelecimentoId === estabelecimentoId);
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
          <h1 className="text-xl font-bold text-gray-900">Estabelecimentos</h1>
          <p className="text-sm text-gray-500">Gerencie seus estabelecimentos</p>
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
              placeholder="Buscar estabelecimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="">Categoria</option>
              {categorias.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedLocation || ''}
              onChange={(e) => setSelectedLocation(e.target.value || null)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="">Localização</option>
              {polosTuristicos.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 flex items-center justify-center ${
                  viewMode === 'grid' ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500'
                }`}
                aria-label="Ver em grade"
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500'
                }`}
                aria-label="Ver em lista"
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="relative">
        {filteredEstabelecimentos.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Nenhum estabelecimento encontrado</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedLocation(null);
              }}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">{filteredEstabelecimentos.length} estabelecimentos encontrados</p>
            </div>
            {viewMode === 'grid' ? renderGridEstabelecimentos() : renderListEstabelecimentos()}
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
            role="dialog"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h2 id="modal-title" className="text-lg font-bold text-gray-900">
                  {formData.id ? 'Editar Estabelecimento' : 'Novo Estabelecimento'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="overflow-y-auto max-h-[70vh] p-4 modal-scroll">
                <form id="estabelecimento-form" onSubmit={handleSubmit} className="space-y-4">
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
                  <FormInput
                    label="Endereço"
                    value={formData.endereco || ''}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    error={errors.endereco}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormSelect
                      label="Categoria"
                      value={formData.categoria || ''}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      options={categorias}
                      error={errors.categoria}
                      required
                    />
                    <FormSelect
                      label="Polo Turístico"
                      value={formData.poloTuristico || ''}
                      onChange={(e) => setFormData({ ...formData, poloTuristico: e.target.value })}
                      options={polosTuristicos}
                      error={errors.poloTuristico}
                      required
                    />
                  </div>
                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    required
                  />
                </form>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="estabelecimento-form"
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors text-sm font-medium"
                >
                  {formData.id ? 'Salvar' : 'Criar'}
                </button>
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
                    {selectedEstabelecimento?.nome || 'Detalhes do Estabelecimento'}
                  </h2>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={`${
                isMobile 
                  ? 'max-w-4xl mx-auto px-4 py-6' 
                  : 'overflow-y-auto max-h-[70vh] p-4 modal-scroll'
              }`}>
                {selectedEstabelecimento && (
                  <div className="space-y-6">
                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                      <img 
                        src={selectedEstabelecimento.imagem}
                        alt={selectedEstabelecimento.nome}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-full font-medium shadow-sm">
                          {selectedEstabelecimento.categoria}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Informações Gerais</h3>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                          <div className="flex items-start gap-3">
                            <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{selectedEstabelecimento.endereco}</p>
                              <p className="text-sm text-gray-500">Endereço</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{selectedEstabelecimento.telefone}</p>
                              <p className="text-sm text-gray-500">Telefone</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiClock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">Segunda a Sexta: 11h às 23h</p>
                              <p className="text-sm text-gray-500">Horário de Funcionamento</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Sobre</h3>
                        <p className="text-gray-800">{selectedEstabelecimento.descricao}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Localização</h3>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-800">{selectedEstabelecimento.poloTuristico}</span>
                        </div>
                      </div>

                      {/* Produtos */}
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Produtos</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getProdutosDoEstabelecimento(selectedEstabelecimento.id).map(produto => (
                            <div key={produto.id} className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-800">{produto.nome}</p>
                                  <p className="text-sm text-gray-500 mt-1">{produto.descricao}</p>
                                </div>
                                <span className="text-red-600 font-semibold">
                                  R$ {produto.preco.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Promoções */}
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Promoções</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getPromocoesDoEstabelecimento(selectedEstabelecimento.id).map(promocao => (
                            <div key={promocao.id} className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-800">{promocao.nome}</p>
                                  <p className="text-sm text-gray-500 mt-1">{promocao.descricao}</p>
                                </div>
                                <span className="text-red-600 font-semibold">
                                  {promocao.desconto}% OFF
                                </span>
                              </div>
                            </div>
                          ))}
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

export default DashboardEstabelecimentos;