import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiPlus, FiMinus, FiTrash2, FiCreditCard } from 'react-icons/fi';
import { mockProdutos } from '../mocks/produtos';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tipos
type ItemCarrinho = {
  id: string;
  produtoId: string;
  quantidade: number;
  observacoes?: string;
  opcionais: { id: string; nome: string; preco: number }[];
};

type FormaPagamento = 'credito' | 'debito' | 'dinheiro' | 'pix';

// Dados mockados para simular o carrinho
const enderecoEntrega = {
  principal: true,
  rua: 'Av. Paulista',
  numero: '1000',
  complemento: 'Apto 123',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  estado: 'SP',
  cep: '01310-100'
};

const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([
    {
      id: '1',
      produtoId: '1',
      quantidade: 1,
      observacoes: 'Sem cebola',
      opcionais: [
        { id: '1', nome: 'Queijo extra', preco: 3.5 }
      ]
    },
    {
      id: '2',
      produtoId: '2',
      quantidade: 2,
      opcionais: []
    }
  ]);
  const [estabelecimentoId, setEstabelecimentoId] = useState<string | null>(null);
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('credito');
  const [troco, setTroco] = useState<string>('');
  const [cupom, setCupom] = useState<string>('');
  const [cupomAplicado, setCupomAplicado] = useState<boolean>(false);
  const [desconto, setDesconto] = useState<number>(0);
  
  // Valor fictício para taxa de entrega
  const taxaEntrega = 5.99;
  
  // Ao carregar a página, vamos verificar qual estabelecimento os produtos pertencem
  useEffect(() => {
    if (itensCarrinho.length > 0) {
      const primeiroItem = itensCarrinho[0];
      const produto = mockProdutos.find(p => p.id === primeiroItem.produtoId);
      if (produto) {
        setEstabelecimentoId(produto.estabelecimentoId);
      }
    }
  }, [itensCarrinho]);
  
  // Buscar o estabelecimento
  const estabelecimento = estabelecimentoId 
    ? mockEstabelecimentos.find(e => e.id === estabelecimentoId) 
    : null;
  
  // Funções para manipulação dos itens do carrinho
  const aumentarQuantidade = (id: string) => {
    setItensCarrinho(
      itensCarrinho.map(item => 
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };
  
  const diminuirQuantidade = (id: string) => {
    setItensCarrinho(
      itensCarrinho.map(item => 
        item.id === id && item.quantidade > 1 
          ? { ...item, quantidade: item.quantidade - 1 } 
          : item
      )
    );
  };
  
  const removerItem = (id: string) => {
    setItensCarrinho(itensCarrinho.filter(item => item.id !== id));
  };
  
  const aplicarCupom = () => {
    if (cupom.trim().toUpperCase() === 'BORALLI10') {
      setDesconto(10);
      setCupomAplicado(true);
    } else if (cupom.trim().toUpperCase() === 'BORALLI20') {
      setDesconto(20);
      setCupomAplicado(true);
    } else {
      alert('Cupom inválido');
      setCupomAplicado(false);
      setDesconto(0);
    }
  };
  
  // Calcular subtotal dos itens
  const calcularSubtotal = () => {
    return itensCarrinho.reduce((total, item) => {
      const produto = mockProdutos.find(p => p.id === item.produtoId);
      if (!produto) return total;
      
      const precoOpcionais = item.opcionais.reduce((sum, op) => sum + op.preco, 0);
      return total + ((produto.preco + precoOpcionais) * item.quantidade);
    }, 0);
  };
  
  // Calcular o total com desconto
  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const valorComDesconto = subtotal * (1 - desconto / 100);
    return valorComDesconto + taxaEntrega;
  };
  
  // Finalizar pedido
  const finalizarPedido = () => {
    // Simular finalização do pedido
    console.log('Pedido finalizado:', {
      itens: itensCarrinho,
      estabelecimento,
      enderecoEntrega,
      formaPagamento,
      troco: formaPagamento === 'dinheiro' ? troco : undefined,
      subtotal: calcularSubtotal(),
      taxaEntrega,
      desconto,
      total: calcularTotal()
    });
    
    // Navegar para a página de confirmação (que seria criada em outro momento)
    navigate('/pedido-confirmado');
  };
  
  // Se o carrinho estiver vazio, mostrar mensagem
  if (itensCarrinho.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center max-w-md w-full">
            <div className="text-7xl mb-4">🛒</div>
            <h1 className="text-xl font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-6">Adicione itens para continuar com seu pedido</p>
            <Link to="/" className="bg-primary text-white py-3 px-6 rounded-lg font-medium block hover:bg-primary-dark">
              Explorar restaurantes
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 container mx-auto max-w-4xl p-4">
        {/* Cabeçalho do carrinho */}
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <FiChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">Carrinho</h1>
        </div>
        
        <div className="md:flex md:gap-6">
          {/* Coluna principal */}
          <div className="md:flex-1">
            {/* Informações do estabelecimento */}
            {estabelecimento && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex items-center">
                  <img 
                    src={estabelecimento.imagem} 
                    alt={estabelecimento.nome} 
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{estabelecimento.nome}</h3>
                    <p className="text-sm text-gray-500">Tempo estimado: 30-45 min</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Endereço de entrega */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-medium mb-3">Endereço de entrega</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{enderecoEntrega.rua}, {enderecoEntrega.numero}</p>
                  <p className="text-sm text-gray-500">
                    {enderecoEntrega.bairro}, {enderecoEntrega.cidade} - {enderecoEntrega.estado}
                  </p>
                </div>
                <button className="text-primary text-sm">Alterar</button>
              </div>
            </div>
            
            {/* Itens do carrinho */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-medium mb-3">Itens do pedido</h3>
              <div className="space-y-4">
                {itensCarrinho.map(item => {
                  const produto = mockProdutos.find(p => p.id === item.produtoId);
                  if (!produto) return null;
                  
                  const precoOpcionais = item.opcionais.reduce((sum, op) => sum + op.preco, 0);
                  const precoUnitario = produto.preco + precoOpcionais;
                  const precoTotal = precoUnitario * item.quantidade;
                  
                  return (
                    <div key={item.id} className="flex border-b border-gray-100 pb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={produto.imagem} 
                          alt={produto.nome} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{produto.nome}</h4>
                          <span className="font-medium">
                            {precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                        </div>
                        
                        {item.opcionais.length > 0 && (
                          <p className="text-sm text-gray-500 mt-1">
                            {item.opcionais.map(op => op.nome).join(', ')}
                          </p>
                        )}
                        
                        {item.observacoes && (
                          <p className="text-sm text-gray-500 mt-1">
                            Obs: {item.observacoes}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button 
                              onClick={() => diminuirQuantidade(item.id)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="mx-2 w-6 text-center font-medium">{item.quantidade}</span>
                            <button 
                              onClick={() => aumentarQuantidade(item.id)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removerItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Link 
                to={estabelecimento ? `/estabelecimento/${estabelecimento.id}` : '/'}
                className="text-primary font-medium block text-center mt-4"
              >
                Adicionar mais itens
              </Link>
            </div>
            
            {/* Cupom de desconto */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-medium mb-3">Cupom de desconto</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Código do cupom"
                  value={cupom}
                  onChange={(e) => setCupom(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={cupomAplicado}
                />
                <button
                  onClick={aplicarCupom}
                  disabled={cupomAplicado}
                  className={`px-4 py-2 rounded-r-lg font-medium ${
                    cupomAplicado
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {cupomAplicado ? 'Aplicado' : 'Aplicar'}
                </button>
              </div>
              {cupomAplicado && (
                <p className="text-green-600 text-sm mt-2">
                  Cupom aplicado! {desconto}% de desconto.
                </p>
              )}
            </div>
            
            {/* Formas de pagamento */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-medium mb-3">Forma de pagamento</h3>
              <div className="space-y-3">
                <div 
                  className={`flex items-center p-3 rounded-lg border ${
                    formaPagamento === 'credito' ? 'border-primary' : 'border-gray-200'
                  } hover:border-primary cursor-pointer`}
                  onClick={() => setFormaPagamento('credito')}
                >
                  <div className={`w-5 h-5 rounded-full border ${
                    formaPagamento === 'credito' ? 'bg-primary border-primary' : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {formaPagamento === 'credito' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="ml-3">Cartão de crédito</span>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg border ${
                    formaPagamento === 'debito' ? 'border-primary' : 'border-gray-200'
                  } hover:border-primary cursor-pointer`}
                  onClick={() => setFormaPagamento('debito')}
                >
                  <div className={`w-5 h-5 rounded-full border ${
                    formaPagamento === 'debito' ? 'bg-primary border-primary' : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {formaPagamento === 'debito' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="ml-3">Cartão de débito</span>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg border ${
                    formaPagamento === 'pix' ? 'border-primary' : 'border-gray-200'
                  } hover:border-primary cursor-pointer`}
                  onClick={() => setFormaPagamento('pix')}
                >
                  <div className={`w-5 h-5 rounded-full border ${
                    formaPagamento === 'pix' ? 'bg-primary border-primary' : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {formaPagamento === 'pix' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="ml-3">PIX</span>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg border ${
                    formaPagamento === 'dinheiro' ? 'border-primary' : 'border-gray-200'
                  } hover:border-primary cursor-pointer`}
                  onClick={() => setFormaPagamento('dinheiro')}
                >
                  <div className={`w-5 h-5 rounded-full border ${
                    formaPagamento === 'dinheiro' ? 'bg-primary border-primary' : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {formaPagamento === 'dinheiro' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="ml-3">Dinheiro</span>
                </div>
                
                {formaPagamento === 'dinheiro' && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-700 mb-2">Troco para quanto?</p>
                    <input
                      type="text"
                      placeholder="R$ 0,00"
                      value={troco}
                      onChange={(e) => setTroco(e.target.value)}
                      className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Resumo do pedido */}
          <div className="md:w-72 mt-4 md:mt-0">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <h3 className="font-medium mb-3">Resumo de valores</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>
                    {taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                
                {desconto > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>
                      -{((calcularSubtotal() * desconto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                )}
                
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>
                      {calcularTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={finalizarPedido}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 mt-6 hover:bg-primary-dark"
              >
                <FiCreditCard />
                <span>Finalizar pedido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10 md:mb-0"></div>
      <Footer />
    </div>
  );
};

export default Carrinho; 