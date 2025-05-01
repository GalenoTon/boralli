import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiHeart, FiMinus, FiPlus, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { mockProdutos } from '../mocks/produtos';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import Header from '../components/Header';

// Definição dos tipos
type ProdutoParams = {
  id: string;
};

type OpcaoAdicional = {
  id: string;
  nome: string;
  preco: number;
  selecionado: boolean;
};

const ProdutoDetalhe: React.FC = () => {
  const { id } = useParams<ProdutoParams>();
  const navigate = useNavigate();
  
  // Estados
  const [favorito, setFavorito] = useState<boolean>(false);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [observacoes, setObservacoes] = useState<string>('');
  const [opcionais, setOpcionais] = useState<OpcaoAdicional[]>([
    { id: '1', nome: 'Queijo extra', preco: 4.90, selecionado: false },
    { id: '2', nome: 'Bacon', preco: 5.90, selecionado: false },
    { id: '3', nome: 'Molho especial', preco: 2.50, selecionado: false },
    { id: '4', nome: 'Cebola caramelizada', preco: 3.90, selecionado: false },
  ]);

  // Encontrar o produto pelo ID
  const produto = mockProdutos.find(p => p.id === id);
  
  // Encontrar o estabelecimento associado ao produto
  const estabelecimento = produto 
    ? mockEstabelecimentos.find(e => e.id === produto.estabelecimentoId) 
    : null;

  // Funções
  const aumentarQuantidade = () => {
    setQuantidade(prev => prev + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

  const toggleFavorito = () => {
    setFavorito(prev => !prev);
  };

  const toggleOpcional = (id: string) => {
    setOpcionais(prev => prev.map(op => 
      op.id === id ? { ...op, selecionado: !op.selecionado } : op
    ));
  };

  const calcularTotal = (): number => {
    if (!produto) return 0;
    
    // Preço base do produto x quantidade
    let total = produto.preco * quantidade;
    
    // Adicionar preço dos opcionais selecionados
    opcionais.forEach(op => {
      if (op.selecionado) {
        total += op.preco * quantidade;
      }
    });
    
    return total;
  };

  const adicionarAoCarrinho = () => {
    // Aqui seria implementada a lógica para adicionar ao carrinho
    // Por enquanto, apenas navegamos para a página do estabelecimento
    if (estabelecimento) {
      alert('Produto adicionado ao carrinho!');
      navigate(`/estabelecimento/${estabelecimento.id}`);
    } else {
      navigate('/');
    }
  };

  if (!produto) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Produto não encontrado</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Barra superior com botão de voltar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-gray-900"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          onClick={toggleFavorito}
          className={`p-2 rounded-full ${favorito ? 'text-red-500' : 'text-gray-400'}`}
        >
          <FiHeart size={24} />
        </button>
      </div>
      
      {/* Imagem do produto */}
      <div className="w-full h-64 mb-4 overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Detalhes do produto */}
      <div className="flex-1 px-4 pb-24">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{produto.nome}</h1>
          {estabelecimento && (
            <p className="text-sm text-gray-500 mb-2">
              {estabelecimento.nome}
            </p>
          )}
          <p className="text-gray-600 mb-4">{produto.descricao}</p>
          <div className="text-xl font-bold text-gray-900">
            R$ {produto.preco.toFixed(2)}
          </div>
        </div>
        
        {/* Controle de quantidade */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Quantidade</h2>
          <div className="flex items-center">
            <button 
              onClick={diminuirQuantidade}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              disabled={quantidade <= 1}
            >
              <FiMinus size={20} />
            </button>
            <span className="mx-4 text-lg font-medium w-8 text-center">{quantidade}</span>
            <button 
              onClick={aumentarQuantidade}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <FiPlus size={20} />
            </button>
          </div>
        </div>
        
        {/* Opcionais */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Adicionais</h2>
          <div className="space-y-3">
            {opcionais.map(op => (
              <div 
                key={op.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleOpcional(op.id)}
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      op.selecionado 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'border-gray-300 text-transparent'
                    }`}
                  >
                    {op.selecionado && <FiCheck size={14} />}
                  </button>
                  <span className="text-gray-800">{op.nome}</span>
                </div>
                <span className="text-gray-700">+ R$ {op.preco.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Observações */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Observações</h2>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Alguma observação para o preparo do seu pedido?"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
      
      {/* Rodapé fixo com botão de adicionar ao carrinho */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-xl font-bold">R$ {calcularTotal().toFixed(2)}</span>
        </div>
        <button
          onClick={adicionarAoCarrinho}
          className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center justify-center font-semibold"
        >
          <FiShoppingBag className="mr-2" size={20} />
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProdutoDetalhe; 