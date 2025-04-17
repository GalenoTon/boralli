// src/pages/dashboard/DashboardEstabelecimentoEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiPlus, FiSave, FiCalendar, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEstabelecimentos, Estabelecimento } from '../../mocks/estabelecimentos';
import { mockProdutos, Produto } from '../../mocks/produtos';
import { mockPromocoes, Promocao } from '../../mocks/promocoes';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  name: string;
  error?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, name, error, type = 'text', required = false, disabled = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      name={name} // Corrigido aqui
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
        error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
      } transition-shadow ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
    />
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
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, name, options, error, required = false, disabled = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      name={name} // Corrigido aqui
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
        error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
      } transition-shadow ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
    return <div className="p-8">Estabelecimento não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-64">
            <img
              src={establishment.imagem}
              alt={establishment.nome}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white">{establishment.nome}</h1>
              <p className="text-white/80">{establishment.categoria}</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/estabelecimentos')}
              className="absolute top-4 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <FiArrowLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Informações do Estabelecimento</h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? (
                  <>
                    <FiSave className="w-5 h-5" />
                    Salvar Alterações
                  </>
                ) : (
                  <>
                    <FiEdit2 className="w-5 h-5" />
                    Editar
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <FormInput
                  label="Nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                  name="nome"
                  error={errors.nome}
                  required
                  disabled={!isEditing}
                />

                <FormInput
                  label="Endereço"
                  value={formData.endereco || ''}
                  onChange={handleInputChange}
                  name="endereco"
                  error={errors.endereco}
                  required
                  disabled={!isEditing}
                />
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-4">
                <FormSelect
                  label="Categoria"
                  value={formData.categoria || ''}
                  onChange={handleInputChange}
                  name="categoria"
                  options={categorias}
                  error={errors.categoria}
                  required
                  disabled={!isEditing}
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
                />
              </div>
            </div>
          </div>

          {/* Seção de Produtos */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Produtos</h2>
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                Adicionar Produto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.nome}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.descricao}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-blue-600">
                      {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Seção de Promoções */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Promoções</h2>
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                Adicionar Promoção
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promotions.map(promotion => (
                <motion.div
                  key={promotion.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-purple-50 to-blue-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{promotion.nome}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPromotion(promotion)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePromotion(promotion.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{promotion.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar className="flex-shrink-0" />
                    <span>{formatDate(promotion.dataInicio)}</span>
                    <span className="mx-1">-</span>
                    <FiCalendar className="flex-shrink-0" />
                    <span>{formatDate(promotion.dataFim)}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-lg font-bold text-green-600">
                      {promotion.desconto}% de desconto
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <FormInput
                  label="Nome"
                  name="nome"
                  value={productForm.nome || ''}
                  onChange={handleProductInputChange}
                  error={productErrors.nome}
                  required
                />

                <FormInput
                  label="Descrição"
                  name="descricao"
                  value={productForm.descricao || ''}
                  onChange={handleProductInputChange}
                  error={productErrors.descricao}
                  required
                />

                <FormInput
                  label="Preço"
                  name="preco"
                  type="number"
                  value={productForm.preco?.toString() || ''}
                  onChange={handleProductInputChange}
                  error={productErrors.preco}
                  required
                />

                <FormSelect
                  label="Categoria"
                  name="categoria"
                  value={String(productForm.categoria || '')}
                  onChange={handleProductInputChange}
                  options={['Cerveja', 'Hambúrguer', 'Pizza', 'Acompanhamento', 'Carne', 'Sushi']}
                  error={productErrors.categoria}
                  required
                />

                <FormInput
                  label="URL da Imagem"
                  name="imagem"
                  value={productForm.imagem || ''}
                  onChange={handleProductInputChange}
                  type="url"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} />
                  Salvar
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editingPromotion ? 'Editar Promoção' : 'Nova Promoção'}
                </h2>
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <FormInput
                  label="Nome"
                  name="nome"
                  value={promotionForm.nome || ''}
                  onChange={handlePromotionInputChange}
                  error={promotionErrors.nome}
                  required
                />

                <FormInput
                  label="Descrição"
                  name="descricao"
                  value={promotionForm.descricao || ''}
                  onChange={handlePromotionInputChange}
                  error={promotionErrors.descricao}
                  required
                />

                <FormInput
                  label="Desconto (%)"
                  name="desconto"
                  type="number"
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

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Data de Início"
                    name="dataInicio"
                    type="date"
                    value={promotionForm.dataInicio || ''}
                    onChange={handlePromotionInputChange}
                    error={promotionErrors.dataInicio}
                    required
                  />

                  <FormInput
                    label="Data de Fim"
                    name="dataFim"
                    type="date"
                    value={promotionForm.dataFim || ''}
                    onChange={handlePromotionInputChange}
                    error={promotionErrors.dataFim}
                    required
                  />
                </div>

                <FormInput
                  label="URL da Imagem"
                  name="imagem"
                  value={promotionForm.imagem || ''}
                  onChange={handlePromotionInputChange}
                  type="url"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePromotion}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} />
                  Salvar
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