// src/pages/dashboard/DashboardPromocoes.tsx
import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMapPin, FiClock } from 'react-icons/fi';
import { mockPromocoes, Promocao } from '../../mocks/promocoes';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

const DashboardPromocoes: React.FC = () => {
  const [promocoes, setPromocoes] = useState<Promocao[]>(mockPromocoes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromocao, setEditingPromocao] = useState<Promocao | null>(null);
  const [formData, setFormData] = useState<Partial<Promocao>>({
    nome: '',
    descricao: '',
    desconto: 0,
    dataInicio: '',
    dataFim: '',
    imagem: '',
    estabelecimentoId: '',
    produtoId: ''
  });

  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));

  const filteredPromocoes = promocoes.filter(promo => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === promo.estabelecimentoId);
    const matchesSearch = promo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleOpenModal = (promocao?: Promocao) => {
    if (promocao) {
      setEditingPromocao(promocao);
      setFormData(promocao);
    } else {
      setEditingPromocao(null);
      setFormData({
        nome: '',
        descricao: '',
        desconto: 0,
        dataInicio: '',
        dataFim: '',
        imagem: '',
        estabelecimentoId: '',
        produtoId: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPromocao(null);
    setFormData({
      nome: '',
      descricao: '',
      desconto: 0,
      dataInicio: '',
      dataFim: '',
      imagem: '',
      estabelecimentoId: '',
      produtoId: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromocao) {
      setPromocoes(promocoes.map(promo => 
        promo.id === editingPromocao.id ? { ...formData, id: editingPromocao.id } as Promocao : promo
      ));
    } else {
      const newPromocao: Promocao = {
        ...formData as Promocao,
        id: Date.now().toString()
      };
      setPromocoes([...promocoes, newPromocao]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setPromocoes(promocoes.filter(promo => promo.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promoções</h1>
          <p className="text-gray-600">Gerencie as promoções do sistema</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="mt-4 md:mt-0 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Adicionar Promoção
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar promoções..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos os polos</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Promoções */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promoção
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estabelecimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desconto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPromocoes.map(promocao => {
                const estabelecimento = mockEstabelecimentos.find(est => est.id === promocao.estabelecimentoId);
                return (
                  <tr key={promocao.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={promocao.imagem}
                          alt={promocao.nome}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{promocao.nome}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{promocao.descricao}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {estabelecimento?.nome}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(promocao.dataInicio).toLocaleDateString()} - {new Date(promocao.dataFim).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-primary-500">
                        {promocao.desconto}% off
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(promocao)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(promocao.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingPromocao ? 'Editar Promoção' : 'Adicionar Promoção'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    value={formData.desconto}
                    onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Término
                    </label>
                    <input
                      type="date"
                      value={formData.dataFim}
                      onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estabelecimento
                  </label>
                  <select
                    value={formData.estabelecimentoId}
                    onChange={(e) => setFormData({ ...formData, estabelecimentoId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um estabelecimento</option>
                    {mockEstabelecimentos.map(estabelecimento => (
                      <option key={estabelecimento.id} value={estabelecimento.id}>
                        {estabelecimento.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    value={formData.imagem}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    {editingPromocao ? 'Salvar Alterações' : 'Adicionar Promoção'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPromocoes;