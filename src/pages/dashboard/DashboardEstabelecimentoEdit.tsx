// src/pages/dashboard/DashboardEstabelecimentoEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export type Establishment = {
  id: string;
  nome: string;
  endereco: string;
  poloTuristico: string;
  categoria: string;
  imagem: string;
};

export type Product = {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  estabelecimentoId: string;
  descricao: string;
};

export type Promotion = {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  estabelecimentoId: string;
};

// Dados simulados (Mocks)
const initialEstablishments: Establishment[] = [
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

const initialProducts: Product[] = [
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

const initialPromotions: Promotion[] = [
  {
    id: '1',
    nome: 'Promoção de Inverno',
    descricao: 'Descontos de até 30% em bebidas quentes.',
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

const DashboardEstabelecimentoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Estado para armazenar o estabelecimento atual
  const [establishment, setEstablishment] = useState<Establishment | null>(null);

  // Estados para edição dos campos
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [polo, setPolo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');

  // Estados para produtos e promoções relacionados
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    // Simula a busca do estabelecimento com base no id da URL
    const found = initialEstablishments.find(e => e.id === id) || null;
    setEstablishment(found);

    if (found) {
      setNome(found.nome);
      setEndereco(found.endereco);
      setPolo(found.poloTuristico);
      setCategoria(found.categoria);
      setImagem(found.imagem);
    }

    // Simula a busca dos produtos relacionados
    const relatedProducts = initialProducts.filter(p => p.estabelecimentoId === id);
    setProducts(relatedProducts);

    // Simula a busca das promoções relacionadas
    const relatedPromotions = initialPromotions.filter(promo => promo.estabelecimentoId === id);
    setPromotions(relatedPromotions);
  }, [id]);

  const handleSave = () => {
    if (!establishment) return;

    const updatedEstablishment: Establishment = {
      ...establishment,
      nome,
      endereco,
      poloTuristico: polo,
      categoria,
      imagem,
    };

    // Atualiza localmente o estabelecimento (em uma implementação real, chamaria uma API)
    setEstablishment(updatedEstablishment);
    alert('Estabelecimento atualizado com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Link para voltar à lista de estabelecimentos */}
      <Link to="/dashboard/estabelecimentos" className="text-blue-600 hover:underline">
        &larr; Voltar para Gerenciar Estabelecimentos
      </Link>

      {establishment ? (
        <>
          {/* Formulário de Edição */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Estabelecimento</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Endereço</label>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Polo Turístico</label>
                <input
                  type="text"
                  value={polo}
                  onChange={(e) => setPolo(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {/* Alternativamente, utilize um dropdown */}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Categoria</label>
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {/* Alternativamente, utilize um dropdown */}
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 text-sm text-gray-600">URL da Imagem</label>
                <input
                  type="text"
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
            >
              Salvar Alterações
            </button>
          </div>

          {/* Seção para exibir Produtos Relacionados */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Produtos Relacionados</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold text-gray-800">{prod.nome}</h3>
                    <p className="text-sm text-gray-600">{prod.descricao}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Nenhum produto relacionado encontrado.</p>
            )}
          </div>

          {/* Seção para exibir Promoções Relacionadas */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Promoções Relacionadas</h2>
            {promotions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-bold text-gray-800">{promo.nome}</h3>
                    <p className="text-sm text-gray-600">{promo.descricao}</p>
                    <p className="text-xs text-gray-500">
                      {promo.dataInicio} até {promo.dataFim}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma promoção relacionada encontrada.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-600">Estabelecimento não encontrado.</p>
      )}
    </div>
  );
};

export default DashboardEstabelecimentoEdit;
