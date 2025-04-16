// src/pages/dashboard/DashboardProdutos.tsx
import React, { useState } from 'react';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  estabelecimentoId: string;
  descricao: string;
};

const initialProdutos: Produto[] = [
  {
    id: '1',
    nome: 'Café Expresso',
    preco: 5.0,
    imagem: 'https://via.placeholder.com/400x300?text=Café+Expresso',
    estabelecimentoId: '1',
    descricao: 'Café encorpado e aromático.',
  },
  {
    id: '2',
    nome: 'Bolo de Chocolate',
    preco: 12.0,
    imagem: 'https://via.placeholder.com/400x300?text=Bolo+de+Chocolate',
    estabelecimentoId: '2',
    descricao: 'Delicioso bolo com cobertura de ganache.',
  },
];

export default function DashboardProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [novoNome, setNovoNome] = useState('');
  const [novoPreco, setNovoPreco] = useState<number>(0);
  const [novaImagem, setNovaImagem] = useState('');
  const [novoEstabelecimentoId, setNovoEstabelecimentoId] = useState('');
  const [novoDescricao, setNovoDescricao] = useState('');

  const addProduto = () => {
    const newProduto: Produto = {
      id: Date.now().toString(),
      nome: novoNome,
      preco: novoPreco,
      imagem: novaImagem || 'https://via.placeholder.com/400x300?text=Novo+Produto',
      estabelecimentoId: novoEstabelecimentoId,
      descricao: novoDescricao,
    };
    setProdutos([...produtos, newProduto]);
    setNovoNome('');
    setNovoPreco(0);
    setNovaImagem('');
    setNovoEstabelecimentoId('');
    setNovoDescricao('');
    alert('Produto adicionado com sucesso!');
  };

  const deleteProduto = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProdutos(produtos.filter((prod) => prod.id !== id));
    alert('Produto excluído com sucesso!');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-cyan-800">Gerenciar Produtos</h1>

      {/* Formulário de Adição */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nome */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Preço */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Preço</label>
            <input
              type="number"
              placeholder="Preço"
              value={novoPreco}
              onChange={(e) => setNovoPreco(Number(e.target.value))}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* URL da Imagem */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">URL da Imagem</label>
            <input
              type="text"
              placeholder="URL da Imagem"
              value={novaImagem}
              onChange={(e) => setNovaImagem(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Estabelecimento */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Estabelecimento</label>
            <select
              value={novoEstabelecimentoId}
              onChange={(e) => setNovoEstabelecimentoId(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Selecione o Estabelecimento</option>
              {mockEstabelecimentos.map((est) => (
                <option key={est.id} value={est.id}>
                  {est.nome}
                </option>
              ))}
            </select>
          </div>
          {/* Descrição */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm text-gray-600">Descrição</label>
            <input
              type="text"
              placeholder="Descrição"
              value={novoDescricao}
              onChange={(e) => setNovoDescricao(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <button
          onClick={addProduto}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start md:items-center gap-4">
              <img
                src={prod.imagem}
                alt={prod.nome}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{prod.nome}</h3>
                <p className="text-sm text-gray-600">R$ {prod.preco.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{prod.descricao}</p>
                <p className="text-xs text-gray-500">
                  {mockEstabelecimentos.find((est) => est.id === prod.estabelecimentoId)?.nome ||
                    'Estabelecimento não encontrado'}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => deleteProduto(prod.id, e)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition mt-4 md:mt-0"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
