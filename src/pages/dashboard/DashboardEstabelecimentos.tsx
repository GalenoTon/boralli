// src/pages/dashboard/DashboardEstabelecimentos.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, X, Save, MapPin, Star } from 'lucide-react';
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
      className={`border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
    />
    {error && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {error}</p>}
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
      className={`border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
    >
      <option value="">Selecione...</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {error}</p>}
  </div>
);

const DashboardEstabelecimentos: React.FC = () => {
  const navigate = useNavigate();
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(mockEstabelecimentos);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Estabelecimento>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        setEstabelecimentos(estabelecimentos.map(e => e.id === formData.id ? { ...e, ...formData } as Estabelecimento : e));
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Gerenciar Estabelecimentos
        </h1>
        
        <button
          onClick={() => {
            setFormData({});
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Novo Estabelecimento
        </button>
      </div>

      {/* Modal de Adição */}
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
                  {formData.id ? 'Editar' : 'Novo'} Estabelecimento
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.descricao || ''}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className={`w-full border ${errors.descricao ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
                    rows={4}
                  />
                  {errors.descricao && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {errors.descricao}</p>}
                </div>

                <div className="md:col-span-2">
                  <FormInput
                    label="URL da Imagem"
                    value={formData.imagem || ''}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    type="url"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <Save size={20} />
                  {formData.id ? 'Salvar Alterações' : 'Criar Estabelecimento'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Estabelecimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estabelecimentos.map((estabelecimento) => (
          <motion.div
            key={estabelecimento.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
            onClick={() => navigate(`/dashboard/estabelecimentos/${estabelecimento.id}/edit`)}
          >
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={estabelecimento.imagem}
                alt={estabelecimento.nome}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-medium">4.8</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-sm">
                    {estabelecimento.categoria}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{estabelecimento.nome}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-sm truncate">{estabelecimento.endereco}</span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                {estabelecimento.descricao}
              </p>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(estabelecimento);
                  }}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                  aria-label="Editar"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(estabelecimento.id);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  aria-label="Excluir"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEstabelecimentos;