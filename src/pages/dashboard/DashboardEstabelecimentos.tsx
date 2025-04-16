// src/pages/dashboard/DashboardEstabelecimentos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export type Estabelecimento = {
  id: string;
  nome: string;
  endereco: string;
  poloTuristico: string;
  categoria: string;
  imagem: string;
};

const categorias = ["Café e Confeitarias", "Restaurantes", "Padarias", "Bares"];
const polosTuristicos = ["Feira de São Cristóvão", "Baixo Meier", "Lapa", "Outro"];

const initialEstabelecimentos: Estabelecimento[] = [
  {
    id: '1',
    nome: 'Café do Boralli',
    endereco: 'Rua A, 100',
    poloTuristico: 'Feira de São Cristóvão',
    categoria: 'Café e Confeitarias',
    imagem: 'https://via.placeholder.com/400x300?text=Café+do+Boralli',
  },
  {
    id: '2',
    nome: 'Restaurante Boralli',
    endereco: 'Av. B, 200',
    poloTuristico: 'Baixo Meier',
    categoria: 'Restaurantes',
    imagem: 'https://via.placeholder.com/400x300?text=Restaurante+Boralli',
  },
];

export default function DashboardEstabelecimentos() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(initialEstabelecimentos);

  // Estados para o formulário de adição
  const [novoNome, setNovoNome] = useState('');
  const [novoEndereco, setNovoEndereco] = useState('');
  const [novoPolo, setNovoPolo] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaImagem, setNovaImagem] = useState('');

  // Estados para o modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [estabelecimentoEdit, setEstabelecimentoEdit] = useState<Estabelecimento | null>(null);

  // Função para adicionar um novo estabelecimento
  const addEstabelecimento = () => {
    const newEstab: Estabelecimento = {
      id: Date.now().toString(),
      nome: novoNome,
      endereco: novoEndereco,
      poloTuristico: novoPolo,
      categoria: novaCategoria,
      imagem: novaImagem || 'https://via.placeholder.com/400x300?text=Novo+Estabelecimento',
    };
    setEstabelecimentos([...estabelecimentos, newEstab]);
    setNovoNome('');
    setNovoEndereco('');
    setNovoPolo('');
    setNovaCategoria('');
    setNovaImagem('');
    alert('Estabelecimento adicionado com sucesso!');
  };

  // Função para abrir o modal de edição
  const openEditModal = (estab: Estabelecimento, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEstabelecimentoEdit(estab);
    setShowEditModal(true);
  };

  // Função para salvar as alterações do modal
  const saveEdit = () => {
    if (estabelecimentoEdit) {
      setEstabelecimentos(
        estabelecimentos.map(estab =>
          estab.id === estabelecimentoEdit.id ? estabelecimentoEdit : estab
        )
      );
      setShowEditModal(false);
      setEstabelecimentoEdit(null);
      alert('Estabelecimento atualizado com sucesso!');
    }
  };

  // Função para excluir um estabelecimento
  const deleteEstabelecimento = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEstabelecimentos(estabelecimentos.filter(estab => estab.id !== id));
    alert('Estabelecimento excluído com sucesso!');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-cyan-800">Gerenciar Estabelecimentos</h1>
      
      {/* Formulário de Adição */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Estabelecimento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Nome */}
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
          {/* Campo Endereço */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Endereço</label>
            <input
              type="text"
              placeholder="Endereço"
              value={novoEndereco}
              onChange={(e) => setNovoEndereco(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {/* Campo Polo Turístico */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Polo Turístico</label>
            <select
              value={novoPolo}
              onChange={(e) => setNovoPolo(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Selecione o Polo Turístico</option>
              {polosTuristicos.map((polo) => (
                <option key={polo} value={polo}>
                  {polo}
                </option>
              ))}
            </select>
          </div>
          {/* Campo Categoria */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Categoria</label>
            <select
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Selecione a Categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Campo URL da Imagem */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm text-gray-600">URL da Imagem</label>
            <input
              type="text"
              placeholder="URL da Imagem"
              value={novaImagem}
              onChange={(e) => setNovaImagem(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <button
          onClick={addEstabelecimento}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de Estabelecimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {estabelecimentos.map((estab) => (
          <div key={estab.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-xl transition-shadow">
            {/* Área clicável do card (redireciona para detalhes) */}
            <Link to={`/dashboard/estabelecimentos/${estab.id}/edit`} className="flex items-start gap-4 flex-grow">
              <img
                src={estab.imagem}
                alt={estab.nome}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{estab.nome}</h3>
                <p className="text-sm text-gray-600">Endereço: {estab.endereco}</p>
                <p className="text-sm text-gray-600">
                  Polo: {estab.poloTuristico} — Categoria: {estab.categoria}
                </p>
              </div>
            </Link>
            {/* Botões de ação */}
            <div className="flex gap-2">
              <button
                onClick={(e) => openEditModal(estab, e)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition"
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteEstabelecimento(estab.id, e);
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição */}
      {showEditModal && estabelecimentoEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fundo semitransparente */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowEditModal(false)}
          ></div>
          {/* Conteúdo do Modal */}
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Editar Estabelecimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo Nome */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  value={estabelecimentoEdit.nome}
                  onChange={(e) =>
                    setEstabelecimentoEdit({
                      ...estabelecimentoEdit,
                      nome: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              {/* Campo Endereço */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Endereço</label>
                <input
                  type="text"
                  value={estabelecimentoEdit.endereco}
                  onChange={(e) =>
                    setEstabelecimentoEdit({
                      ...estabelecimentoEdit,
                      endereco: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              {/* Campo Polo Turístico */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Polo Turístico</label>
                <select
                  value={estabelecimentoEdit.poloTuristico}
                  onChange={(e) =>
                    setEstabelecimentoEdit({
                      ...estabelecimentoEdit,
                      poloTuristico: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="">Selecione o Polo Turístico</option>
                  {polosTuristicos.map((polo) => (
                    <option key={polo} value={polo}>
                      {polo}
                    </option>
                  ))}
                </select>
              </div>
              {/* Campo Categoria */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Categoria</label>
                <select
                  value={estabelecimentoEdit.categoria}
                  onChange={(e) =>
                    setEstabelecimentoEdit({
                      ...estabelecimentoEdit,
                      categoria: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="">Selecione a Categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {/* Campo URL da Imagem */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 text-sm text-gray-600">URL da Imagem</label>
                <input
                  type="text"
                  value={estabelecimentoEdit.imagem}
                  onChange={(e) =>
                    setEstabelecimentoEdit({
                      ...estabelecimentoEdit,
                      imagem: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
