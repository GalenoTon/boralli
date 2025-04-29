// src/pages/dashboard/DashboardProdutos.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiTag, FiMapPin, FiX } from 'react-icons/fi';
import { mockProdutos } from '../../mocks/produtos';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  desconto?: number;
  categoria: string;
  imagem: string;
  estabelecimentoId: string;
}

const DashboardProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<Partial<Produto>>({
    nome: '',
    descricao: '',
    preco: 0,
    precoOriginal: 0,
    desconto: 0,
    categoria: '',
    imagem: '',
    estabelecimentoId: ''
  });

  const categories = Array.from(new Set(produtos.map(prod => prod.categoria)));
  const locations = Array.from(new Set(mockEstabelecimentos.map(est => est.poloTuristico)));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const filteredProdutos = produtos.filter(prod => {
    const estabelecimento = mockEstabelecimentos.find(est => est.id === prod.estabelecimentoId);
    const matchesSearch = prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prod.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prod.categoria === selectedCategory;
    const matchesLocation = !selectedLocation || estabelecimento?.poloTuristico === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleOpenModal = (produto?: Produto) => {
    if (produto) {
      setEditingProduto(produto);
      setFormData(produto);
    } else {
      setEditingProduto(null);
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        precoOriginal: 0,
        desconto: 0,
        categoria: '',
        imagem: '',
        estabelecimentoId: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduto(null);
    setFormData({
      nome: '',
      descricao: '',
      preco: 0,
      precoOriginal: 0,
      desconto: 0,
      categoria: '',
      imagem: '',
      estabelecimentoId: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduto) {
      setProdutos(produtos.map(prod => 
        prod.id === editingProduto.id ? { ...formData, id: editingProduto.id } as Produto : prod
      ));
    } else {
      const newProduto: Produto = {
        ...formData as Produto,
        id: Date.now().toString()
      };
      setProdutos([...produtos, newProduto]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setProdutos(produtos.filter(prod => prod.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie os produtos do sistema</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="mt-4 md:mt-0 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <FiPlus className="w-5 h-5" />
          Adicionar Produto
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos os polos</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estabelecimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProdutos.map(produto => {
                const estabelecimento = mockEstabelecimentos.find(est => est.id === produto.estabelecimentoId);
                return (
                  <tr key={produto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{produto.descricao}</div>
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
                        <FiTag className="w-4 h-4 mr-2 text-gray-400" />
                        {produto.categoria}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        R$ {produto.preco.toFixed(2)}
                        {produto.precoOriginal && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            R$ {produto.precoOriginal.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(produto)}
                          className="text-orange-600 hover:text-orange-900"
                          aria-label="Editar"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(produto.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Excluir"
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
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                {editingProduto ? 'Editar Produto' : 'Adicionar Produto'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="overflow-y-auto max-h-[70vh] p-6 modal-scroll">
              <form id="produto-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
                      <input
                        type="number"
                        value={formData.preco}
                        onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                        className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço Original
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
                      <input
                        type="number"
                        value={formData.precoOriginal}
                        onChange={(e) => setFormData({ ...formData, precoOriginal: parseFloat(e.target.value) })}
                        className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estabelecimento <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.estabelecimentoId}
                      onChange={(e) => setFormData({ ...formData, estabelecimentoId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.imagem}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="produto-form"
                className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors"
              >
                {editingProduto ? 'Salvar Alterações' : 'Criar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProdutos;