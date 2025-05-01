// src/pages/dashboard/DashboardPromocoes.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiX, FiPercent, FiCalendar, FiGift, FiTag, FiEye, FiArrowLeft } from 'react-icons/fi';
import { mockPromocoes, Promocao } from '../../mocks/promocoes';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';
import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import DetailModal from '../../components/ui/DetailModal';

type TipoPromocao = 'desconto' | 'leve-mais-pague-menos' | 'brinde' | 'valor-fixo';

interface PromocaoCompleta extends Promocao {
  tipo: TipoPromocao;
  quantidadeLeve?: number;
  quantidadePague?: number;
  brindeDescricao?: string;
  valorFixo?: number;
}

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
  options: Array<{ value: string; label: string }> | string[];
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
      {Array.isArray(options) && options.map((option) => {
        if (typeof option === 'string') {
          return <option key={option} value={option}>{option}</option>;
        } else {
          return <option key={option.value} value={option.value}>{option.label}</option>;
        }
      })}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const DashboardPromocoes: React.FC = () => {
  const [promocoes, setPromocoes] = useState<PromocaoCompleta[]>(mockPromocoes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<string | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<TipoPromocao | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPromocao, setSelectedPromocao] = useState<PromocaoCompleta | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState<Partial<PromocaoCompleta>>({
    nome: '',
    descricao: '',
    tipo: 'desconto',
    desconto: 0,
    dataInicio: '',
    dataFim: '',
    imagem: '',
    estabelecimentoId: '',
    produtoId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const filteredPromocoes = promocoes.filter(promo => {
    const matchesSearch = promo.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          promo.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstabelecimento = selectedEstabelecimento ? promo.estabelecimentoId === selectedEstabelecimento : true;
    const matchesTipo = selectedTipo ? promo.tipo === selectedTipo : true;
    return matchesSearch && matchesEstabelecimento && matchesTipo;
  });

  const getEstabelecimentoNome = (estabelecimentoId: string) => {
    const estabelecimento = mockEstabelecimentos.find(e => e.id === estabelecimentoId);
    return estabelecimento ? estabelecimento.nome : 'Desconhecido';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nome: '',
      descricao: '',
      tipo: 'desconto',
      desconto: 0,
      dataInicio: '',
      dataFim: '',
      imagem: '',
      estabelecimentoId: '',
      produtoId: ''
    });
    setErrors({});
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.tipo) novosErros.tipo = 'Tipo é obrigatório';
    if (!formData.estabelecimentoId) novosErros.estabelecimentoId = 'Estabelecimento é obrigatório';
    if (!formData.dataInicio) novosErros.dataInicio = 'Data de início é obrigatória';
    if (!formData.dataFim) novosErros.dataFim = 'Data de término é obrigatória';
    
    if (formData.tipo === 'desconto' && (!formData.desconto || formData.desconto > 100)) {
      novosErros.desconto = 'Desconto deve ser entre 1 e 100%';
    }
    if (formData.tipo === 'leve-mais-pague-menos' && 
      (!formData.quantidadeLeve || !formData.quantidadePague || formData.quantidadeLeve <= formData.quantidadePague)) {
      novosErros.quantidadeLeve = 'Leve deve ser maior que Pague';
    }
    if (formData.tipo === 'valor-fixo' && !formData.valorFixo) {
      novosErros.valorFixo = 'Valor fixo é obrigatório';
    }
    if (formData.tipo === 'brinde' && !formData.brindeDescricao) {
      novosErros.brindeDescricao = 'Descrição do brinde é obrigatória';
    }
    
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      if (formData.id) {
        setPromocoes(promocoes.map(p => 
          p.id === formData.id ? { ...p, ...formData } as PromocaoCompleta : p
        ));
      } else {
        const newPromocao: PromocaoCompleta = {
          ...formData as PromocaoCompleta,
          id: Date.now().toString()
        };
        setPromocoes([...promocoes, newPromocao]);
      }
      setShowModal(false);
      setFormData({
        nome: '',
        descricao: '',
        tipo: 'desconto',
        desconto: 0,
        dataInicio: '',
        dataFim: '',
        imagem: '',
        estabelecimentoId: '',
        produtoId: ''
      });
    }
  };

  const handleDelete = (id: string) => {
    setPromocoes(promocoes.filter(p => p.id !== id));
  };

  const handleEdit = (promocao: PromocaoCompleta) => {
    setFormData(promocao);
    setShowModal(true);
  };

  const handleViewDetails = (promocao: PromocaoCompleta) => {
    setSelectedPromocao(promocao);
    setShowDetailsModal(true);
  };

  const renderizarDetalhesPromocao = (promocao: PromocaoCompleta) => {
    switch (promocao.tipo) {
      case 'desconto':
        return (
          <div className="flex items-center text-red-500 font-semibold">
            <FiPercent className="w-4 h-4 mr-1" />
            {promocao.desconto}% OFF
          </div>
        );
      case 'leve-mais-pague-menos':
        return (
          <div className="flex items-center text-blue-500 font-semibold">
            <FiTag className="w-4 h-4 mr-1" />
            Leve {promocao.quantidadeLeve}, Pague {promocao.quantidadePague}
          </div>
        );
      case 'brinde':
        return (
          <div className="flex items-center text-green-500 font-semibold">
            <FiGift className="w-4 h-4 mr-1" />
            Brinde
          </div>
        );
      case 'valor-fixo':
        return (
          <div className="flex items-center text-amber-500 font-semibold">
            <FiTag className="w-4 h-4 mr-1" />
            R$ {promocao.valorFixo?.toFixed(2)}
          </div>
        );
      default:
        return 'Promoção';
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const tiposPromocao = [
    { value: 'desconto', label: 'Desconto Percentual' },
    { value: 'leve-mais-pague-menos', label: 'Leve Mais, Pague Menos' },
    { value: 'brinde', label: 'Brinde' },
    { value: 'valor-fixo', label: 'Valor Fixo' }
  ];

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
          <h1 className="text-xl font-bold text-gray-900">Promoções</h1>
          <p className="text-sm text-gray-500">Gerencie as promoções do seu estabelecimento</p>
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
              placeholder="Buscar promoções..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <select
              value={selectedTipo || ''}
              onChange={(e) => setSelectedTipo(e.target.value as TipoPromocao || null)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="">Todos os tipos</option>
              {tiposPromocao.map(tipo => (
                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
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
          </div>
        </div>
      </div>

      {/* Lista de Promoções */}
      <div className="relative">
        {filteredPromocoes.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Nenhuma promoção encontrada</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedEstabelecimento(null);
                setSelectedTipo(null);
              }}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">{filteredPromocoes.length} promoções encontradas</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredPromocoes.map(promocao => (
                  <motion.div
                    key={promocao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="relative">
                      <div className="h-36 bg-gray-100 relative overflow-hidden">
                        <img
                          src={promocao.imagem}
                          alt={promocao.nome}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                        />
                        {renderizarDetalhesPromocao(promocao)}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => handleViewDetails(promocao)}
                          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                          aria-label="Ver detalhes"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(promocao)}
                          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                          aria-label="Editar"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(promocao.id)}
                          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors"
                          aria-label="Excluir"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">{promocao.nome}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{promocao.descricao}</p>
                      <div className="flex items-center mb-3 text-xs text-gray-500">
                        <FiMapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{getEstabelecimentoNome(promocao.estabelecimentoId)}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <FiCalendar className="w-3 h-3 mr-1" />
                        <span>{formatarData(promocao.dataInicio)} - {formatarData(promocao.dataFim)}</span>
                      </div>
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
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            {/* Header Fixo */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleCloseModal()}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-lg font-bold text-gray-900">
                    {formData.id ? 'Editar Promoção' : 'Nova Promoção'}
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
            <div className="max-w-4xl mx-auto px-4 py-6">
              <form id="promocao-form" onSubmit={handleSubmit} className="space-y-6">
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
                  <FormSelect
                    label="Tipo de Promoção"
                    value={formData.tipo || ''}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoPromocao })}
                    options={tiposPromocao}
                    error={errors.tipo}
                    required
                  />
                  <FormSelect
                    label="Estabelecimento"
                    value={formData.estabelecimentoId || ''}
                    onChange={(e) => {
                      const estabelecimentoId = e.target.value;
                      setFormData({ ...formData, estabelecimentoId });
                    }}
                    options={mockEstabelecimentos.map(e => ({ value: e.id.toString(), label: e.nome }))}
                    error={errors.estabelecimentoId}
                    required
                  />
                </div>

                {formData.tipo === 'desconto' && (
                  <FormInput
                    label="Desconto (%)"
                    value={formData.desconto || ''}
                    onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) || 0 })}
                    type="number"
                    step="1"
                    error={errors.desconto}
                    required
                  />
                )}

                {formData.tipo === 'leve-mais-pague-menos' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput
                      label="Quantidade Leve"
                      value={formData.quantidadeLeve || ''}
                      onChange={(e) => setFormData({ ...formData, quantidadeLeve: parseInt(e.target.value) || 0 })}
                      type="number"
                      step="1"
                      error={errors.quantidadeLeve}
                      required
                    />
                    <FormInput
                      label="Quantidade Pague"
                      value={formData.quantidadePague || ''}
                      onChange={(e) => setFormData({ ...formData, quantidadePague: parseInt(e.target.value) || 0 })}
                      type="number"
                      step="1"
                      error={errors.quantidadePague}
                      required
                    />
                  </div>
                )}

                {formData.tipo === 'brinde' && (
                  <FormInput
                    label="Descrição do Brinde"
                    value={formData.brindeDescricao || ''}
                    onChange={(e) => setFormData({ ...formData, brindeDescricao: e.target.value })}
                    error={errors.brindeDescricao}
                    required
                  />
                )}

                {formData.tipo === 'valor-fixo' && (
                  <FormInput
                    label="Valor Fixo (R$)"
                    value={formData.valorFixo || ''}
                    onChange={(e) => setFormData({ ...formData, valorFixo: parseFloat(e.target.value) || 0 })}
                    type="number"
                    step="0.01"
                    error={errors.valorFixo}
                    required
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Data de Início"
                    value={formData.dataInicio || ''}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    type="date"
                    error={errors.dataInicio}
                    required
                  />
                  <FormInput
                    label="Data de Término"
                    value={formData.dataFim || ''}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                    type="date"
                    error={errors.dataFim}
                    required
                  />
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
                    {selectedPromocao?.nome || 'Detalhes da Promoção'}
                  </h2>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={`${
                isMobile 
                  ? 'max-w-4xl mx-auto px-4 py-6' 
                  : 'overflow-y-auto max-h-[70vh] p-4 modal-scroll'
              }`}>
                {selectedPromocao && (
                  <div className="space-y-6">
                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                      <img 
                        src={selectedPromocao.imagem}
                        alt={selectedPromocao.nome}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        {renderizarDetalhesPromocao(selectedPromocao)}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Informações Gerais</h3>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                          <div className="flex items-start gap-3">
                            <FiTag className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{selectedPromocao.tipo}</p>
                              <p className="text-sm text-gray-500">Tipo de Promoção</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{getEstabelecimentoNome(selectedPromocao.estabelecimentoId)}</p>
                              <p className="text-sm text-gray-500">Estabelecimento</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiCalendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{formatarData(selectedPromocao.dataInicio)} - {formatarData(selectedPromocao.dataFim)}</p>
                              <p className="text-sm text-gray-500">Período da Promoção</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-500 text-sm mb-2">Descrição</h3>
                        <p className="text-gray-800">{selectedPromocao.descricao}</p>
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

export default DashboardPromocoes;