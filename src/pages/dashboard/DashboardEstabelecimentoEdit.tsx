import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiPlus, FiSave, FiCalendar, FiX, FiImage, FiDollarSign, FiTag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';
import { mockProdutos } from '../../mocks/produtos';
import { mockPromocoes } from '../../mocks/promocoes';
import { Produto } from '../../types/Produto';

// Tipo Promocao baseado no arquivo de mocks
type Promocao = {
  id: string;
  nome: string;
  descricao: string;
  desconto: number;
  dataInicio: string;
  dataFim: string;
  imagem: string;
  estabelecimentoId: string;
  produtoId: string;
};

// Interface Estabelecimento baseada no arquivo de mocks
interface Estabelecimento {
  id: string;
  nome: string;
  endereco: string;
  poloTuristico: string;
  categoria: string;
  imagem: string;
  descricao: string;
  telefone: string;
}

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  name: string;
  error?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, name, error, type = 'text', required = false, disabled = false, icon }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
          error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
        } transition-shadow ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${icon ? 'pl-10' : ''}`}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  options: Array<{ value: string; label: string }> | string[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, name, options, error, required = false, disabled = false, icon }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
          error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
        } transition-shadow ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${icon ? 'pl-10' : ''}`}
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
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const DashboardEstabelecimentoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState<Estabelecimento | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Estabelecimento>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Produto[]>([]);
  const [promotions, setPromotions] = useState<Promocao[]>([]);

  // Estados para modais
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<Promocao | null>(null);
  const [productForm, setProductForm] = useState<Partial<Produto>>({
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: ''
  });
  const [promotionForm, setPromotionForm] = useState<Partial<Promocao>>({
    nome: '',
    descricao: '',
    desconto: 0,
    dataInicio: '',
    dataFim: '',
    produtoId: '',
    imagem: ''
  });
  const [productErrors, setProductErrors] = useState<Record<string, string>>({});
  const [promotionErrors, setPromotionErrors] = useState<Record<string, string>>({});

  const polosTuristicos = ["Centro Histórico", "Bairro Italiano", "Zona Sul", "Jardins", "Outro"];
  const categorias = ["Bar", "Restaurante", "Cafeteria", "Outros"];

  useEffect(() => {
    const estab = mockEstabelecimentos.find(e => e.id === id);
    if (estab) {
      setEstablishment(estab);
      setFormData(estab);
      setProducts(mockProdutos.filter(p => p.estabelecimentoId === id));
      setPromotions(mockPromocoes.filter(p => p.estabelecimentoId === id));
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!validateForm() || !establishment) return;

    const updatedEstablishment = {
      ...establishment,
      ...formData
    };

    setEstablishment(updatedEstablishment);
    setIsEditing(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.endereco?.trim()) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.poloTuristico) newErrors.poloTuristico = 'Polo turístico é obrigatório';
    if (!formData.categoria) newErrors.categoria = 'Categoria é obrigatória';
    if (!formData.descricao?.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (!formData.telefone?.trim()) newErrors.telefone = 'Telefone é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Funções para Produtos
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const validateProductForm = () => {
    const newErrors: Record<string, string> = {};
    if (!productForm.nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!productForm.descricao?.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (!productForm.preco) newErrors.preco = 'Preço é obrigatório';
    if (!productForm.categoria) newErrors.categoria = 'Categoria é obrigatória';
    setProductErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProduct = () => {
    if (!validateProductForm() || !id) return;

    const newProduct: Produto = {
      id: editingProduct?.id || Date.now().toString(),
      nome: productForm.nome || '',
      descricao: productForm.descricao || '',
      preco: productForm.preco || 0,
      categoria: productForm.categoria || '',
      imagem: productForm.imagem || 'https://via.placeholder.com/150',
      estabelecimentoId: id
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts(prev => [...prev, newProduct]);
    }

    setShowProductModal(false);
    setProductForm({
      nome: '',
      descricao: '',
      preco: 0,
      categoria: '',
      imagem: ''
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleEditProduct = (product: Produto) => {
    setEditingProduct(product);
    setProductForm({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      categoria: product.categoria,
      imagem: product.imagem
    });
    setShowProductModal(true);
  };

  // Funções para Promoções
  const handlePromotionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPromotionForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const validatePromotionForm = () => {
    const newErrors: Record<string, string> = {};
    if (!promotionForm.nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!promotionForm.descricao?.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (!promotionForm.desconto) newErrors.desconto = 'Desconto é obrigatório';
    if (!promotionForm.dataInicio) newErrors.dataInicio = 'Data de início é obrigatória';
    if (!promotionForm.dataFim) newErrors.dataFim = 'Data de fim é obrigatória';
    if (!promotionForm.produtoId) newErrors.produtoId = 'Produto é obrigatório';
    setPromotionErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePromotion = () => {
    if (!validatePromotionForm() || !id) return;

    const newPromotion: Promocao = {
      id: editingPromotion?.id || Date.now().toString(),
      nome: promotionForm.nome || '',
      descricao: promotionForm.descricao || '',
      desconto: promotionForm.desconto || 0,
      dataInicio: promotionForm.dataInicio || '',
      dataFim: promotionForm.dataFim || '',
      produtoId: promotionForm.produtoId || '',
      imagem: promotionForm.imagem || 'https://via.placeholder.com/150',
      estabelecimentoId: id
    };

    if (editingPromotion) {
      setPromotions(prev => prev.map(p => p.id === editingPromotion.id ? newPromotion : p));
    } else {
      setPromotions(prev => [...prev, newPromotion]);
    }

    setShowPromotionModal(false);
    setPromotionForm({
      nome: '',
      descricao: '',
      desconto: 0,
      dataInicio: '',
      dataFim: '',
      produtoId: '',
      imagem: ''
    });
    setEditingPromotion(null);
  };

  const handleDeletePromotion = (promotionId: string) => {
    setPromotions(prev => prev.filter(p => p.id !== promotionId));
  };

  const handleEditPromotion = (promotion: Promocao) => {
    setEditingPromotion(promotion);
    setPromotionForm({
      nome: promotion.nome,
      descricao: promotion.descricao,
      desconto: promotion.desconto,
      dataInicio: promotion.dataInicio,
      dataFim: promotion.dataFim,
      produtoId: promotion.produtoId,
      imagem: promotion.imagem
    });
    setShowPromotionModal(true);
  };

  if (!establishment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Estabelecimento não encontrado</h2>
          <button
            onClick={() => navigate('/dashboard/estabelecimentos')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-72">
            <img
              src={establishment.imagem}
              alt={establishment.nome}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {establishment.categoria}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {establishment.poloTuristico}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white">{establishment.nome}</h1>
            </div>
            <button
              onClick={() => navigate('/dashboard/estabelecimentos')}
              className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
            >
              <FiArrowLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Informações do Estabelecimento</h2>
                <p className="text-gray-500">Gerencie os dados do seu estabelecimento</p>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${
                  isEditing 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100'
                    : 'bg-white border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600'
                }`}
              >
                {isEditing ? (
                  <>
                    <FiSave className="w-5 h-5" />
                    Salvar Alterações
                  </>
                ) : (
                  <>
                    <FiEdit2 className="w-5 h-5" />
                    Editar Informações
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informações Básicas */}
              <div className="space-y-5">
                <FormInput
                  label="Nome do Estabelecimento"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                  name="nome"
                  error={errors.nome}
                  required
                  disabled={!isEditing}
                />

                <FormInput
                  label="Endereço Completo"
                  value={formData.endereco || ''}
                  onChange={handleInputChange}
                  name="endereco"
                  error={errors.endereco}
                  required
                  disabled={!isEditing}
                />

                <FormInput
                  label="Telefone para Contato"
                  value={formData.telefone || ''}
                  onChange={handleInputChange}
                  name="telefone"
                  error={errors.telefone}
                  required
                  disabled={!isEditing}
                  type="tel"
                />
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-5">
                <FormSelect
                  label="Categoria"
                  value={formData.categoria || ''}
                  onChange={handleInputChange}
                  name="categoria"
                  options={categorias}
                  error={errors.categoria}
                  required
                  disabled={!isEditing}
                  icon={<FiTag className="w-4 h-4" />}
                />

                <FormSelect
                  label="Polo Turístico"
                  value={formData.poloTuristico || ''}
                  onChange={handleInputChange}
                  name="poloTuristico"
                  options={polosTuristicos}
                  error={errors.poloTuristico}
                  required
                  disabled={!isEditing}
                />

                <FormInput
                  label="URL da Imagem"
                  value={formData.imagem || ''}
                  onChange={handleInputChange}
                  name="imagem"
                  type="url"
                  disabled={!isEditing}
                  icon={<FiImage className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Estabelecimento
                {isEditing && <span className="text-red-500 ml-1">*</span>}
              </label>
              <textarea
                name="descricao"
                value={formData.descricao || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={5}
                className={`w-full border ${errors.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 focus:ring-2 ${
                  errors.descricao ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                } transition-shadow ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                placeholder="Descreva seu estabelecimento, incluindo especialidades, ambiente, história..."
              ></textarea>
              {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
            </div>
          </div>

          {/* Seção de Produtos */}
          <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Cardápio</h2>
                <p className="text-gray-500">Gerencie os produtos oferecidos pelo estabelecimento</p>
              </div>
              <button
                onClick={() => {
                  setProductForm({
                    nome: '',
                    descricao: '',
                    preco: 0,
                    categoria: '',
                    imagem: ''
                  });
                  setEditingProduct(null);
                  setShowProductModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-100"
              >
                <FiPlus className="w-5 h-5" />
                Adicionar Produto
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <FiPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum produto cadastrado</h3>
                <p className="mt-1 text-sm text-gray-500">Comece adicionando seu primeiro produto ao cardápio.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowProductModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Adicionar Produto
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={product.imagem}
                        alt={product.nome}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300')}
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{product.nome}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.descricao}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-blue-600">
                          {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          {product.categoria}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Seção de Promoções */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Promoções Ativas</h2>
                <p className="text-gray-500">Gerencie as promoções do seu estabelecimento</p>
              </div>
              <button
                onClick={() => {
                  setPromotionForm({
                    nome: '',
                    descricao: '',
                    desconto: 0,
                    dataInicio: '',
                    dataFim: '',
                    produtoId: '',
                    imagem: ''
                  });
                  setEditingPromotion(null);
                  setShowPromotionModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all shadow-lg shadow-purple-100"
              >
                <FiPlus className="w-5 h-5" />
                Adicionar Promoção
              </button>
            </div>

            {promotions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <FiTag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma promoção ativa</h3>
                <p className="mt-1 text-sm text-gray-500">Adicione promoções para atrair mais clientes.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowPromotionModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Adicionar Promoção
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map(promotion => {
                  const product = products.find(p => p.id === promotion.produtoId);
                  return (
                    <motion.div
                      key={promotion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-all"
                    >
                      <div className="relative h-48">
                        <img
                          src={promotion.imagem || (product?.imagem || 'https://via.placeholder.com/400')}
                          alt={promotion.nome}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={() => handleEditPromotion(promotion)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePromotion(promotion.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-xl font-bold text-white">{promotion.nome}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                              {promotion.desconto}% OFF
                            </span>
                            {product && (
                              <span className="text-sm text-white/90">em {product.nome}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{promotion.descricao}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar className="flex-shrink-0" />
                            <span>{formatDate(promotion.dataInicio)}</span>
                            <span className="mx-1">-</span>
                            <FiCalendar className="flex-shrink-0" />
                            <span>{formatDate(promotion.dataFim)}</span>
                          </div>
                          {product && (
                            <span className="text-sm font-medium text-blue-600">
                              {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal de Produto */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <FormInput
                  label="Nome do Produto"
                  name="nome"
                  value={productForm.nome || ''}
                  onChange={handleProductInputChange}
                  error={productErrors.nome}
                  required
                  icon={<FiTag className="w-4 h-4" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição do Produto
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="descricao"
                    value={productForm.descricao || ''}
                    onChange={handleProductInputChange}
                    rows={3}
                    className={`w-full border ${productErrors.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
                      productErrors.descricao ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    } transition-shadow`}
                    placeholder="Descreva o produto, ingredientes, características..."
                  ></textarea>
                  {productErrors.descricao && <p className="text-red-500 text-sm mt-1">{productErrors.descricao}</p>}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    label="Preço (R$)"
                    name="preco"
                    type="number"
                    step="0.01"
                    min="0"
                    value={productForm.preco?.toString() || ''}
                    onChange={handleProductInputChange}
                    error={productErrors.preco}
                    required
                    icon={<FiDollarSign className="w-4 h-4" />}
                  />

                  <FormSelect
                    label="Categoria"
                    name="categoria"
                    value={String(productForm.categoria || '')}
                    onChange={handleProductInputChange}
                    options={['Cerveja', 'Hambúrguer', 'Pizza', 'Acompanhamento', 'Carne', 'Sushi', 'Bebida', 'Sobremesa']}
                    error={productErrors.categoria}
                    required
                  />
                </div>

                <FormInput
                  label="URL da Imagem do Produto"
                  name="imagem"
                  value={productForm.imagem || ''}
                  onChange={handleProductInputChange}
                  type="url"
                  icon={<FiImage className="w-4 h-4" />}
                />

                {productForm.imagem && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pré-visualização</label>
                    <img
                      src={productForm.imagem}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                    />
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white z-10 p-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-100"
                >
                  <FiSave size={18} />
                  {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Promoção */}
      <AnimatePresence>
        {showPromotionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingPromotion ? 'Editar Promoção' : 'Adicionar Nova Promoção'}
                </h2>
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <FormInput
                  label="Nome da Promoção"
                  name="nome"
                  value={promotionForm.nome || ''}
                  onChange={handlePromotionInputChange}
                  error={promotionErrors.nome}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição da Promoção
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="descricao"
                    value={promotionForm.descricao || ''}
                    onChange={handlePromotionInputChange}
                    rows={3}
                    className={`w-full border ${promotionErrors.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
                      promotionErrors.descricao ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    } transition-shadow`}
                    placeholder="Descreva os detalhes da promoção, condições, etc..."
                  ></textarea>
                  {promotionErrors.descricao && <p className="text-red-500 text-sm mt-1">{promotionErrors.descricao}</p>}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    label="Desconto (%)"
                    name="desconto"
                    type="number"
                    min="1"
                    max="100"
                    value={promotionForm.desconto?.toString() || ''}
                    onChange={handlePromotionInputChange}
                    error={promotionErrors.desconto}
                    required
                  />

                  <FormSelect
                    label="Produto"
                    name="produtoId"
                    value={String(promotionForm.produtoId || '')}
                    onChange={handlePromotionInputChange}
                    options={products.map(p => ({ value: String(p.id), label: p.nome }))}
                    error={promotionErrors.produtoId}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    label="Data de Início"
                    name="dataInicio"
                    type="date"
                    value={promotionForm.dataInicio || ''}
                    onChange={handlePromotionInputChange}
                    error={promotionErrors.dataInicio}
                    required
                    icon={<FiCalendar className="w-4 h-4" />}
                  />

                  <FormInput
                    label="Data de Fim"
                    name="dataFim"
                    type="date"
                    value={promotionForm.dataFim || ''}
                    onChange={handlePromotionInputChange}
                    error={promotionErrors.dataFim}
                    required
                    icon={<FiCalendar className="w-4 h-4" />}
                  />
                </div>

                <FormInput
                  label="URL da Imagem da Promoção"
                  name="imagem"
                  value={promotionForm.imagem || ''}
                  onChange={handlePromotionInputChange}
                  type="url"
                  icon={<FiImage className="w-4 h-4" />}
                />

                {promotionForm.imagem && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pré-visualização</label>
                    <img
                      src={promotionForm.imagem}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                    />
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white z-10 p-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePromotion}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-purple-100"
                >
                  <FiSave size={18} />
                  {editingPromotion ? 'Salvar Alterações' : 'Adicionar Promoção'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardEstabelecimentoEdit;