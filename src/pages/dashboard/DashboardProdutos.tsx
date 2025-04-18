// src/pages/dashboard/DashboardProdutos.tsx
import { useState } from 'react';
import { Edit, Trash2, Plus, Save, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProdutos } from '../../mocks/produtos';
import { Produto } from '../../types/Produto';

const categorias = ["Café", "Bebidas", "Comidas", "Sobremesas"] as const;

export default function DashboardProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    if (!formData.nome?.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.descricao?.trim()) novosErros.descricao = 'Descrição é obrigatória';
    if (!formData.preco || formData.preco <= 0) novosErros.preco = 'Preço deve ser maior que zero';
    if (!formData.categoria) novosErros.categoria = 'Categoria é obrigatória';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const abrirModal = (produto?: Produto) => {
    setShowModal(true);
    setFormData(produto ? { ...produto } : {});
    setErrors({});
  };

  const fecharModal = () => {
    setShowModal(false);
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

    setProdutos(prev => formData.id 
      ? prev.map(p => p.id === novoProduto.id ? novoProduto : p)
      : [...prev, novoProduto]
    );

    fecharModal();
  };

  const excluirProduto = (id: string) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Gerenciar Produtos
        </h1>
        
        <button
          onClick={() => abrirModal()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Novo Produto
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
                  {formData.id ? 'Editar' : 'Novo'} Produto
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    value={formData.nome || ''}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className={`border ${errors.nome ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {errors.nome}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco || ''}
                    onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                    className={`border ${errors.preco ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
                  />
                  {errors.preco && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {errors.preco}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Categoria</label>
                  <select
                    value={formData.categoria || ''}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className={`border ${errors.categoria ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm`}
                  >
                    <option value="">Selecione...</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.categoria && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {errors.categoria}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    value={formData.descricao || ''}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className={`border ${errors.descricao ? 'border-red-500' : 'border-gray-200'} rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm w-full`}
                    rows={4}
                  />
                  {errors.descricao && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X size={14} /> {errors.descricao}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="url"
                      value={formData.imagem || ''}
                      onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                      className="border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm flex-1"
                    />
                    {formData.imagem && (
                      <div className="relative group">
                        <ImageIcon className="w-6 h-6 text-gray-500" />
                        <div className="absolute hidden group-hover:block bottom-full mb-2 left-0 w-48 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
                          <img
                            src={formData.imagem}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarProduto}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <Save size={20} />
                  {formData.id ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <motion.div
            key={produto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-2xl">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-sm">
                  {produto.categoria}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 truncate">{produto.nome}</h3>
                <span className="text-lg font-bold text-purple-600">
                  R$ {produto.preco.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-6">{produto.descricao}</p>
              
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => abrirModal(produto)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                  aria-label="Editar"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => excluirProduto(produto.id)}
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
}