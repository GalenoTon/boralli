// src/pages/dashboard/DashboardEstabelecimentos.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEstabelecimentos, Estabelecimento } from '../../mocks/estabelecimentos';

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
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
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
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
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
  const navigate = useNavigate();
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(mockEstabelecimentos);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Estabelecimento>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

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

  const filteredEstabelecimentos = estabelecimentos.filter(e => {
    const matchesSearch = e.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? e.categoria === selectedCategory : true;
    const matchesLocation = selectedLocation ? e.poloTuristico === selectedLocation : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estabelecimentos</h1>
          <p className="text-gray-600">Gerencie os estabelecimentos do sistema</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <FiPlus className="w-5 h-5" />
          Adicionar Estabelecimento
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar estabelecimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {categorias.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos os polos</option>
            {polosTuristicos.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de Estabelecimentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEstabelecimentos.map(estabelecimento => (
            <motion.div
              key={estabelecimento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={estabelecimento.imagem}
                  alt={estabelecimento.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(estabelecimento)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-orange-100 text-orange-600 transition-colors"
                    aria-label="Editar"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(estabelecimento.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                    aria-label="Excluir"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{estabelecimento.nome}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{estabelecimento.descricao}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {estabelecimento.endereco}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {estabelecimento.categoria}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {estabelecimento.poloTuristico}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                  {formData.id ? 'Editar Estabelecimento' : 'Adicionar Estabelecimento'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Fechar"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="overflow-y-auto max-h-[70vh] p-6 modal-scroll">
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
              <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="estabelecimento-form"
                  className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors"
                >
                  {formData.id ? 'Salvar Alterações' : 'Criar Estabelecimento'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardEstabelecimentos;