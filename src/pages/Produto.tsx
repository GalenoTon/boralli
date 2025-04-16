// src/pages/Produto.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProdutos, Produto as ProdutoType } from '../mocks/produtos';
import { mockEstabelecimentos, Estabelecimento as EstabelecimentoType } from '../mocks/estabelecimentos';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiStar, FiMapPin, FiClock, FiTag , FiArrowRight} from 'react-icons/fi';

const ProdutoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const produto = mockProdutos.find((p: ProdutoType) => p.id === id);

  if (!produto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-md space-y-4">
          <h1 className="text-5xl">😕</h1>
          <h2 className="text-3xl font-bold text-gray-900">Produto não encontrado</h2>
          <p className="text-gray-600">O produto que você está procurando não existe ou foi removido.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const estabelecimento = mockEstabelecimentos.find(
    (est: EstabelecimentoType) => est.id === produto.estabelecimentoId
  );

  const hasDiscount = produto.precoOriginal && produto.desconto;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galeria de Imagens */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Badge de Desconto */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-amber-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                -{produto.desconto}% OFF
              </div>
            )}
            {/* Botões de Ação */}
            {/* <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-white/90 rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all">
                <FiHeart className="w-6 h-6 text-gray-400 hover:text-red-500" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <FiArrowLeft className="w-5 h-5" />
            Voltar para produtos
          </Link>

          <h1 className="text-4xl font-bold text-gray-900">{produto.nome}</h1>
          
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-primary-600">
              R$ {produto.preco.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">
                R$ {produto.precoOriginal?.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">{produto.descricao}</p>

          {/* Estabelecimento */}
          {estabelecimento && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={estabelecimento.imagem}
                  alt={estabelecimento.nome}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{estabelecimento.nome}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMapPin className="w-4 h-4" />
                    <span>{estabelecimento.endereco}</span>
                  </div>
                </div>
              </div>
              <Link
                to={`/estabelecimento/${estabelecimento.id}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                Ver estabelecimento
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="flex-1 flex items-center justify-center gap-3 bg-primary-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-primary-700 transition-all">
              <FiHeart className="w-6 h-6" />
              Adicionar ao Favorito
            </button>
          </div>

          {/* Detalhes Adicionais */}
          {/* <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
              <FiClock className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">Preparo em 15-25min</span>
            </div>
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
              <FiStar className="w-5 h-5 text-amber-500" />
              <span className="text-gray-600">Avaliação 4.8 (150+)</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;