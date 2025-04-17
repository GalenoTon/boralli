// src/pages/dashboard/DashboardProdutos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProdutos } from '../../mocks/produtos';
import { motion } from 'framer-motion';
import { FiTag, FiEdit, FiTrash2 } from 'react-icons/fi';

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  estabelecimentoId: string;
};

const categorias = ["Café", "Bebidas", "Comidas", "Sobremesas"];

export default function DashboardProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.preco || formData.preco <= 0) novosErros.preco = 'Preço deve ser maior que zero';
    if (!formData.categoria) novosErros.categoria = 'Categoria é obrigatória';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const abrirModalAdicao = () => {
    setShowAddModal(true);
    setFormData({});
    setErrors({});
  };

  const abrirModalEdicao = (produto: Produto) => {
    setShowEditModal(true);
    setFormData({ ...produto });
    setErrors({});
  };

  const fecharModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setFormData({});
    setErrors({});
  };

  const salvarProduto = () => {
    if (!validarFormulario()) return;

    const novoProduto: Produto = {
      id: formData.id || Date.now().toString(),
      nome: formData.nome!,
      descricao: formData.descricao!,
      preco: formData.preco!,
      categoria: formData.categoria!,
      imagem: formData.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem',
      estabelecimentoId: formData.estabelecimentoId || '1',
    };

    setProdutos(prev => {
      if (formData.id) {
        return prev.map(p => p.id === novoProduto.id ? novoProduto : p);
      }
      return [...prev, novoProduto];
    });

    fecharModal();
  };

  const excluirProduto = (id: string) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h1>
        
        <button
          onClick={abrirModalAdicao}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Adicionar Produto
        </button>
      </div>

      {/* Modal de Adição */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Novo Produto</h2>
              <button
                onClick={fecharModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.preco || ''}
                  onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                />
                {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Categoria</label>
                <select
                  value={formData.categoria || ''}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                >
                  <option value="">Selecione...</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  value={formData.descricao || ''}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow w-full"
                  rows={3}
                />
                {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 text-sm font-medium text-gray-700">URL da Imagem</label>
                <input
                  type="url"
                  value={formData.imagem || ''}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow w-full"
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
                onClick={salvarProduto}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Editar Produto</h2>
              <button
                onClick={fecharModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.preco || ''}
                  onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                />
                {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Categoria</label>
                <select
                  value={formData.categoria || ''}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow"
                >
                  <option value="">Selecione...</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  value={formData.descricao || ''}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow w-full"
                  rows={3}
                />
                {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 text-sm font-medium text-gray-700">URL da Imagem</label>
                <input
                  type="url"
                  value={formData.imagem || ''}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow w-full"
                />
                {formData.imagem && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Pré-visualização:</p>
                    <img
                      src={formData.imagem}
                      alt="Pré-visualização"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
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
                onClick={salvarProduto}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <motion.div
            key={produto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-2xl">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 truncate">{produto.nome}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{produto.descricao}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary-600">
                  R$ {produto.preco.toFixed(2)}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                  <FiTag className="w-4 h-4" />
                  {produto.categoria}
                </span>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => abrirModalEdicao(produto)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Editar"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => excluirProduto(produto.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Excluir"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}