import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiPhone, FiChevronLeft, FiHeart, FiShare2, FiSearch } from 'react-icons/fi';
import { mockEstabelecimentos } from '../mocks/estabelecimentos';
import { mockProdutos } from '../mocks/produtos';
import { mockPromocoes } from '../mocks/promocoes';
import Header from '../components/Header';
import Footer from '../components/Footer';

type EstabelecimentoDetalheParams = {
  id: string;
};

type Categoria = {
  id: string;
  nome: string;
  quantidade: number;
};

const EstabelecimentoDetalhe: React.FC = () => {
  const { id } = useParams<EstabelecimentoDetalheParams>();
  const [activeTab, setActiveTab] = useState<'produtos' | 'promocoes' | 'informacoes'>('produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [isFavorito, setIsFavorito] = useState(false);

  const estabelecimento = mockEstabelecimentos.find(est => est.id === id);
  const produtosDoEstabelecimento = mockProdutos.filter(produto => produto.estabelecimentoId === id);
  const promocoesDoEstabelecimento = mockPromocoes.filter(promocao => promocao.estabelecimentoId === id);

  useEffect(() => {
    // Agrupar produtos por categoria
    if (produtosDoEstabelecimento.length > 0) {
      const categoriasMap = produtosDoEstabelecimento.reduce((acc, produto) => {
        if (!acc[produto.categoria]) {
          acc[produto.categoria] = {
            id: produto.categoria,
            nome: produto.categoria,
            quantidade: 0
          };
        }
        acc[produto.categoria].quantidade += 1;
        return acc;
      }, {} as Record<string, Categoria>);
      
      setCategorias(Object.values(categoriasMap));
      setSelectedCategoria(Object.values(categoriasMap)[0]?.id || null);
    }
  }, [produtosDoEstabelecimento]);

  if (!estabelecimento) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">Estabelecimento não encontrado</p>
        <Link to="/estabelecimentos" className="text-primary hover:underline mt-2 block">
          Voltar para a lista de estabelecimentos
        </Link>
      </div>
    );
  }

  const filteredProdutos = produtosDoEstabelecimento
    .filter(produto => 
      (searchTerm === '' || produto.nome.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategoria === null || produto.categoria === selectedCategoria)
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Banner e informações do estabelecimento */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-cover bg-center w-full" style={{ backgroundImage: `url(${estabelecimento.imagem})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute top-4 left-4 flex gap-2">
            <Link to="/estabelecimentos" className="p-2 bg-white rounded-full shadow">
              <FiChevronLeft className="text-gray-800" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              className="p-2 bg-white rounded-full shadow"
              onClick={() => setIsFavorito(!isFavorito)}
            >
              <FiHeart className={`${isFavorito ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
            </button>
            <button className="p-2 bg-white rounded-full shadow">
              <FiShare2 className="text-gray-800" />
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 relative">
          <h1 className="text-2xl font-bold text-gray-900">{estabelecimento.nome}</h1>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span className="flex items-center">
              <FiStar className="text-yellow-500 mr-1" />
              4.8 (243)
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <FiClock className="mr-1" />
              30-45 min
            </span>
            <span className="mx-2">•</span>
            <span>Entrega: R$ 5,99</span>
          </div>
          
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <FiMapPin className="mr-1" />
            <span>{estabelecimento.endereco}</span>
          </div>
          
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <FiPhone className="mr-1" />
            <span>{estabelecimento.telefone}</span>
          </div>
          
          <p className="mt-3 text-gray-700">{estabelecimento.descricao}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex max-w-6xl mx-auto">
          <button 
            className={`flex-1 py-4 px-6 font-medium text-sm ${activeTab === 'produtos' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setActiveTab('produtos')}
          >
            Produtos
          </button>
          <button 
            className={`flex-1 py-4 px-6 font-medium text-sm ${activeTab === 'promocoes' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setActiveTab('promocoes')}
          >
            Promoções
          </button>
          <button 
            className={`flex-1 py-4 px-6 font-medium text-sm ${activeTab === 'informacoes' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            onClick={() => setActiveTab('informacoes')}
          >
            Informações
          </button>
        </div>
      </div>
      
      {/* Conteúdo das tabs */}
      <div className="flex-grow p-4 max-w-6xl mx-auto w-full">
        {activeTab === 'produtos' && (
          <div>
            {/* Barra de pesquisa */}
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar produto"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Categorias */}
            {categorias.length > 0 && (
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {categorias.map(categoria => (
                    <button
                      key={categoria.id}
                      onClick={() => setSelectedCategoria(categoria.id)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategoria === categoria.id ? 
                        'bg-primary text-white' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {categoria.nome} ({categoria.quantidade})
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Lista de produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProdutos.length > 0 ? (
                filteredProdutos.map(produto => (
                  <Link
                    to={`/produto/${produto.id}`}
                    key={produto.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${produto.imagem})` }}></div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{produto.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{produto.descricao}</p>
                      <p className="mt-2 text-primary font-bold">
                        {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Nenhum produto encontrado</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'promocoes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promocoesDoEstabelecimento.length > 0 ? (
              promocoesDoEstabelecimento.map(promocao => (
                <Link
                  to={`/promocao/${promocao.id}`}
                  key={promocao.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${promocao.imagem})` }}></div>
                  <div className="p-4">
                    <div className="inline-block px-2 py-1 rounded bg-primary-light text-primary text-xs font-medium mb-2">
                      {promocao.tipo === 'desconto' && `${promocao.desconto}% OFF`}
                      {promocao.tipo === 'leve-mais-pague-menos' && `Leve ${promocao.quantidadeLeve} Pague ${promocao.quantidadePague}`}
                      {promocao.tipo === 'brinde' && 'Brinde'}
                      {promocao.tipo === 'valor-fixo' && promocao.valorFixo?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <h3 className="font-medium text-gray-900">{promocao.nome}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{promocao.descricao}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Válido até {new Date(promocao.dataFim).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Nenhuma promoção disponível</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'informacoes' && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Sobre {estabelecimento.nome}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">Endereço</h3>
                <p className="text-gray-600 mt-1">{estabelecimento.endereco}</p>
                <p className="text-gray-600">Polo Turístico: {estabelecimento.poloTuristico}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Contato</h3>
                <p className="text-gray-600 mt-1">
                  Telefone: {estabelecimento.telefone}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Horário de Funcionamento</h3>
                <p className="text-gray-600 mt-1">Segunda a Sexta: 11h00 às 23h00</p>
                <p className="text-gray-600">Sábados e Domingos: 11h00 às 00h00</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Formas de Pagamento</h3>
                <ul className="text-gray-600 mt-1">
                  <li>Cartão de Crédito</li>
                  <li>Cartão de Débito</li>
                  <li>Dinheiro</li>
                  <li>Pix</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default EstabelecimentoDetalhe; 