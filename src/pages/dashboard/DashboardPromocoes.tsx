// src/pages/dashboard/DashboardPromocoes.tsx
import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave, FiTag, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPromocoes } from '../../mocks/promocoes';
import { mockProdutos } from '../../mocks/produtos';

export type Promocao = {
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

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}

const FormInput = ({ label, value, onChange, error, type = 'text', required = false }: FormInputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
        error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
      } transition-shadow`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; nome: string }[];
  error?: string;
  required?: boolean;
}

const FormSelect = ({ label, value, onChange, options, error, required = false }: FormSelectProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
        error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
      } transition-shadow`}
    >
      <option value="">Selecione...</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.nome}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function DashboardPromocoes() {
  const [promocoes, setPromocoes] = useState<Promocao[]>(mockPromocoes);
  const [formData, setFormData] = useState<Partial<Promocao>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.desconto || formData.desconto <= 0) novosErros.desconto = 'Desconto deve ser maior que zero';
    if (!formData.dataInicio) novosErros.dataInicio = 'Data de início é obrigatória';
    if (!formData.dataFim) novosErros.dataFim = 'Data de fim é obrigatória';
    if (!formData.produtoId) novosErros.produtoId = 'Produto é obrigatório';
    if (!formData.estabelecimentoId) novosErros.estabelecimentoId = 'Estabelecimento é obrigatório';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const abrirModalAdicao = () => {
    setShowAddModal(true);
    setFormData({});
    setErrors({});
  };

  const abrirModalEdicao = (promocao: Promocao) => {
    setShowEditModal(true);
    setFormData({ ...promocao });
    setErrors({});
  };

  const fecharModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setFormData({});
    setErrors({});
  };

  const salvarPromocao = () => {
    if (!validarFormulario()) return;

    const novaPromocao: Promocao = {
      id: formData.id || Date.now().toString(),
      nome: formData.nome!,
      descricao: formData.descricao!,
      desconto: formData.desconto!,
      dataInicio: formData.dataInicio!,
      dataFim: formData.dataFim!,
      imagem: formData.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem',
      estabelecimentoId: formData.estabelecimentoId!,
      produtoId: formData.produtoId!,
    };

    setPromocoes(prev => {
      if (formData.id) {
        return prev.map(p => p.id === novaPromocao.id ? novaPromocao : p);
      }
      return [...prev, novaPromocao];
    });

    fecharModal();
  };

  const excluirPromocao = (id: string) => {
    setPromocoes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Promoções</h1>
        
        <button
          onClick={abrirModalAdicao}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <FiPlus size={18} />
          Adicionar Promoção
        </button>
      </div>

      {/* Modal de Adição */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Nova Promoção</h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  error={errors.nome}
                  required
                />

                <FormInput
                  label="Desconto (%)"
                  value={formData.desconto || ''}
                  onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) })}
                  type="number"
                  error={errors.desconto}
                  required
                />

                <FormInput
                  label="Data de Início"
                  value={formData.dataInicio || ''}
                  onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  type="date"
                  error={errors.dataInicio}
                  required
                />

                <FormInput
                  label="Data de Fim"
                  value={formData.dataFim || ''}
                  onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  type="date"
                  error={errors.dataFim}
                  required
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Descrição"
                    value={formData.descricao || ''}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    error={errors.descricao}
                    required
                  />
                </div>

                <FormSelect
                  label="Produto"
                  value={formData.produtoId || ''}
                  onChange={(e) => setFormData({ ...formData, produtoId: e.target.value })}
                  options={mockProdutos}
                  error={errors.produtoId}
                  required
                />

                <FormInput
                  label="URL da Imagem"
                  value={formData.imagem || ''}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  type="url"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarPromocao}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} />
                  Criar Promoção
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Edição */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Editar Promoção</h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  error={errors.nome}
                  required
                />

                <FormInput
                  label="Desconto (%)"
                  value={formData.desconto || ''}
                  onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) })}
                  type="number"
                  error={errors.desconto}
                  required
                />

                <FormInput
                  label="Data de Início"
                  value={formData.dataInicio || ''}
                  onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  type="date"
                  error={errors.dataInicio}
                  required
                />

                <FormInput
                  label="Data de Fim"
                  value={formData.dataFim || ''}
                  onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  type="date"
                  error={errors.dataFim}
                  required
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Descrição"
                    value={formData.descricao || ''}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    error={errors.descricao}
                    required
                  />
                </div>

                <FormSelect
                  label="Produto"
                  value={formData.produtoId || ''}
                  onChange={(e) => setFormData({ ...formData, produtoId: e.target.value })}
                  options={mockProdutos}
                  error={errors.produtoId}
                  required
                />

                <FormInput
                  label="URL da Imagem"
                  value={formData.imagem || ''}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  type="url"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarPromocao}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} />
                  Salvar Alterações
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Promoções */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {promocoes.map((promocao) => {
          const isActive = new Date(promocao.dataFim) > new Date();
          
          return (
            <motion.div
              key={promocao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <FiTag className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{promocao.nome}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{promocao.descricao}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FiClock className="w-5 h-5 text-amber-500" />
                        <span>
                          {new Date(promocao.dataInicio).toLocaleDateString()} - {new Date(promocao.dataFim).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full ${
                        isActive 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {isActive ? 'Ativa' : 'Expirada'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => abrirModalEdicao(promocao)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Editar"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => excluirPromocao(promocao.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Excluir"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}