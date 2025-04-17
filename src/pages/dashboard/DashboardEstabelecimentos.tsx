// src/pages/dashboard/DashboardEstabelecimentos.tsx
import React, { useState, ChangeEvent } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiSave, FiMapPin, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEstabelecimentos, Estabelecimento } from '../../mocks/estabelecimentos';

const categorias = ["Bar", "Restaurante", "Cafeteria", "Outros"] as const;
const polosTuristicos = ["Centro Histórico", "Bairro Italiano", "Zona Sul", "Jardins", "Outro"] as const;

type Categoria = typeof categorias[number];
type PoloTuristico = typeof polosTuristicos[number];

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
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
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 ${
        error ? 'focus:ring-red-300' : 'focus:ring-blue-300'
      } transition-shadow`}
    >
      <option value="">Selecione...</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function DashboardEstabelecimentos() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(mockEstabelecimentos);
  const [formData, setFormData] = useState<Partial<Estabelecimento>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.endereco?.trim()) novosErros.endereco = 'Endereço é obrigatório';
    if (!formData.poloTuristico) novosErros.poloTuristico = 'Polo turístico é obrigatório';
    if (!formData.categoria) novosErros.categoria = 'Categoria é obrigatória';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const abrirModalAdicao = () => {
    setShowAddModal(true);
    setFormData({});
    setErrors({});
  };

  const abrirModalEdicao = (estab: Estabelecimento) => {
    setShowEditModal(true);
    setFormData({ ...estab });
    setErrors({});
  };

  const fecharModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setFormData({});
    setErrors({});
  };

  const salvarEstabelecimento = () => {
    if (!validarFormulario()) return;

    const novoEstabelecimento: Estabelecimento = {
      id: formData.id || Date.now().toString(),
      nome: formData.nome!,
      endereco: formData.endereco!,
      poloTuristico: formData.poloTuristico!,
      categoria: formData.categoria!,
      imagem: formData.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem',
    };

    setEstabelecimentos(prev => {
      if (formData.id) {
        return prev.map(e => e.id === novoEstabelecimento.id ? novoEstabelecimento : e);
      }
      return [...prev, novoEstabelecimento];
    });

    fecharModal();
  };

  const excluirEstabelecimento = (id: string) => {
    setEstabelecimentos(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Estabelecimentos</h1>
        
        <button
          onClick={abrirModalAdicao}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <FiPlus size={18} />
          Adicionar Estabelecimento
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
                <h2 className="text-xl font-semibold">Novo Estabelecimento</h2>
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
                  label="Endereço"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  error={errors.endereco}
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

                <FormSelect
                  label="Categoria"
                  value={formData.categoria || ''}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  options={categorias}
                  error={errors.categoria}
                  required
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    type="url"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarEstabelecimento}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} />
                  Criar Estabelecimento
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
                <h2 className="text-xl font-semibold">Editar Estabelecimento</h2>
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
                  label="Endereço"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  error={errors.endereco}
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

                <FormSelect
                  label="Categoria"
                  value={formData.categoria || ''}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  options={categorias}
                  error={errors.categoria}
                  required
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    type="url"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarEstabelecimento}
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

      {/* Grid de Estabelecimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {estabelecimentos.map((estab) => (
          <motion.div
            key={estab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => window.location.href = `/dashboard/estabelecimentos/${estab.id}/edit`}
          >
            {/* Imagem com Overlay */}
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={estab.imagem}
                alt={estab.nome}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center gap-2 text-white">
                  <FiStar className="w-5 h-5 text-amber-400" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{estab.nome}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <FiMapPin className="w-5 h-5 text-primary-500" />
                <span className="text-sm truncate">{estab.endereco}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                  {estab.categoria}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm">
                  {estab.poloTuristico}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => abrirModalEdicao(estab)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Editar"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => excluirEstabelecimento(estab.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Excluir"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}