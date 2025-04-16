// src/pages/dashboard/DashboardPromocoes.tsx
import React, { useState } from 'react';
import { mockEstabelecimentos } from '../../mocks/estabelecimentos';

export type Promotion = {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  estabelecimentoId: string;
};

const initialPromotions: Promotion[] = [
  {
    id: '1',
    nome: 'Promoção de Inverno',
    descricao: 'Descontos de até 30% em bebidas quentes e quitutes.',
    dataInicio: '2025-06-01',
    dataFim: '2025-06-30',
    estabelecimentoId: '1',
  },
  {
    id: '2',
    nome: 'Promoção de Verão',
    descricao: 'Ofertas especiais em sorvetes e bebidas geladas.',
    dataInicio: '2025-12-01',
    dataFim: '2025-12-31',
    estabelecimentoId: '2',
  },
];

export default function DashboardPromocoes() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaDataInicio, setNovaDataInicio] = useState('');
  const [novaDataFim, setNovaDataFim] = useState('');
  const [novoEstabelecimentoId, setNovoEstabelecimentoId] = useState('');

  const addPromocao = () => {
    if (!novoEstabelecimentoId) {
      alert('Por favor, selecione um estabelecimento.');
      return;
    }
    const newPromocao: Promotion = {
      id: Date.now().toString(),
      nome: novoNome,
      descricao: novaDescricao,
      dataInicio: novaDataInicio,
      dataFim: novaDataFim,
      estabelecimentoId: novoEstabelecimentoId,
    };
    setPromotions([...promotions, newPromocao]);
    setNovoNome('');
    setNovaDescricao('');
    setNovaDataInicio('');
    setNovaDataFim('');
    setNovoEstabelecimentoId('');
    alert('Promoção adicionada com sucesso!');
  };

  const deletePromocao = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPromotions(promotions.filter((promo) => promo.id !== id));
    alert('Promoção excluída com sucesso!');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-cyan-800">Gerenciar Promoções</h1>

      {/* Formulário de Adição */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Adicionar Nova Promoção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Nome */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Nome</label>
            <input
              type="text"
              placeholder="Nome da Promoção"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Campo Descrição */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Descrição</label>
            <input
              type="text"
              placeholder="Descrição da Promoção"
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Campo Data Início */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Data Início</label>
            <input
              type="date"
              value={novaDataInicio}
              onChange={(e) => setNovaDataInicio(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Campo Data Fim */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Data Fim</label>
            <input
              type="date"
              value={novaDataFim}
              onChange={(e) => setNovaDataFim(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Campo Seleção de Estabelecimento */}
          <div className="flex flex-col md:col-span-2">
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
        </div>
        <button
          onClick={addPromocao}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de Promoções */}
      <div className="space-y-4">
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{promo.nome}</h3>
                  <p className="text-sm text-gray-600">{promo.descricao}</p>
                  <p className="text-xs text-gray-500">
                    {promo.dataInicio} até {promo.dataFim}
                  </p>
                  <p className="text-xs text-gray-500">
                    {mockEstabelecimentos.find(est => est.id === promo.estabelecimentoId)?.nome || 'Estabelecimento não encontrado'}
                  </p>
                </div>
                <button
                  onClick={(e) => deletePromocao(promo.id, e)}
                  className="mt-2 md:mt-0 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhuma promoção encontrada.</p>
        )}
      </div>
    </div>
  );
}
