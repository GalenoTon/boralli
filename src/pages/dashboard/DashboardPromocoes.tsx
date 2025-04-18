// src/pages/dashboard/DashboardPromocoes.tsx
import React, { useState } from 'react';
import { Tag, Clock, Plus, X, Save, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPromocoes } from '../../mocks/promocoes';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

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
      className={`border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
    />
    {error && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {error}</p>}
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
      className={`border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
    >
      <option value="">Selecione...</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.nome}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {error}</p>}
  </div>
);

const DashboardPromocoes: React.FC = () => {
  const [promocoes, setPromocoes] = useState<Promocao[]>(mockPromocoes);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Promocao>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.desconto || formData.desconto <= 0) novosErros.desconto = 'Desconto deve ser maior que zero';
    if (!formData.dataInicio) novosErros.dataInicio = 'Data de início é obrigatória';
    if (!formData.dataFim) novosErros.dataFim = 'Data de fim é obrigatória';
    if (!formData.estabelecimentoId) novosErros.estabelecimentoId = 'Estabelecimento é obrigatório';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      const newPromocao: Promocao = {
        id: formData.id || Date.now().toString(),
        ...formData,
      } as Promocao;
      
      setPromocoes(prev => formData.id 
        ? prev.map(p => p.id === formData.id ? newPromocao : p)
        : [...prev, newPromocao]
      );
      
      setShowModal(false);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    setPromocoes(promocoes.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Gerenciar Promoções
        </h1>
        
        <button
          onClick={() => {
            setFormData({});
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Nova Promoção
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.id ? 'Editar' : 'Nova'} Promoção
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  label="Estabelecimento"
                  value={formData.estabelecimentoId || ''}
                  onChange={(e) => setFormData({ ...formData, estabelecimentoId: e.target.value })}
                  options={mockEstabelecimentos}
                  error={errors.estabelecimentoId}
                  required
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    type="url"
                  />
                  {formData.imagem && (
                    <div className="mt-4 flex items-center gap-3">
                      <ImageIcon className="w-6 h-6 text-gray-500" />
                      <img
                        src={formData.imagem}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Save size={20} />
                    {formData.id ? 'Salvar Alterações' : 'Criar Promoção'}
                  </button>
                </div>
              </form>
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
              whileHover={{ scale: 1.03 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={promocao.imagem}
                  alt={promocao.nome}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
                  <h3 className="text-2xl font-bold text-white">{promocao.nome}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{promocao.descricao}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>
                      {new Date(promocao.dataInicio).toLocaleDateString()} - {new Date(promocao.dataFim).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                    isActive 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {isActive ? 'Ativa' : 'Expirada'}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setFormData(promocao);
                      setShowModal(true);
                    }}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                    aria-label="Editar"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(promocao.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    aria-label="Excluir"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardPromocoes;