// src/pages/Estabelecimento.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockEstabelecimentos, Estabelecimento as EstabelecimentoType } from '../mocks/estabelecimentos';
import { mockProdutos } from '../mocks/produtos';
import { mockPromocoes, Promocao as PromocaoType } from '../mocks/promocoes';
import { FiArrowLeft, FiStar, FiMapPin, FiTag, FiClock, FiShoppingBag } from 'react-icons/fi';
import { Produto as ProdutoType } from '../types/Produto';

const EstabelecimentoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const estabelecimento = mockEstabelecimentos.find(
    (estab: EstabelecimentoType) => estab.id === id
  );

  const produtos: ProdutoType[] = mockProdutos.filter(
    (prod: ProdutoType) => prod.estabelecimentoId === id
  );
  const promocoes: PromocaoType[] = mockPromocoes.filter(
    (promo: PromocaoType) => promo.estabelecimentoId === id
  );

  if (!estabelecimento) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-md space-y-4">
          <h1 className="text-5xl">🏬</h1>
          <h2 className="text-3xl font-bold text-gray-900">Estabelecimento não encontrado</h2>
          <p className="text-gray-600">O local que você está procurando não existe ou foi removido.</p>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/estabelecimentos"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft className="w-5 h-5" />
        Voltar para estabelecimentos
      </Link>

      {/* Header do Estabelecimento */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-12">
        <img
          src={estabelecimento.imagem}
          alt={estabelecimento.nome}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex items-end">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">{estabelecimento.nome}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiStar className="w-5 h-5 text-amber-400" />
                <span>4.8 (250 avaliações)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiMapPin className="w-5 h-5 text-primary-400" />
                <span>{estabelecimento.poloTuristico}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sobre o estabelecimento</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{estabelecimento.descricao}</p>
      </div>

      {/* Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Endereço</h3>
          <p className="text-gray-600">{estabelecimento.endereco}</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Horário de Funcionamento</h3>
          <p className="text-gray-600">Seg-Sex: 11h às 23h<br/>Sáb-Dom: 12h às 00h</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Categoria</h3>
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-600 px-4 py-2 rounded-full">
            <FiTag className="w-5 h-5" />
            <span>{estabelecimento.categoria}</span>
          </div>
        </div>
      </div>

      {/* Seção de Produtos */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Cardápio
            <span className="text-primary-500 ml-2">Destaques</span>
          </h2>
        </div>
        
        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto: ProdutoType) => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  {produto.desconto && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-amber-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow">
                      -{produto.desconto}% OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{produto.nome}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary-600">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    {produto.precoOriginal && (
                      <span className="text-gray-400 line-through text-sm">
                        R$ {produto.precoOriginal.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum produto disponível no momento</p>
          </div>
        )}
      </section>

      {/* Seção de Promoções */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ofertas
            <span className="text-amber-600 ml-2">Especiais</span>
          </h2>
        </div>

        {promocoes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {promocoes.map((promo: PromocaoType) => {
              const isActive = new Date(promo.dataFim) > new Date();
              
              return (
                <Link
                  key={promo.id}
                  to={`/promocao/${promo.id}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-100 p-3 rounded-xl">
                        <FiTag className="w-8 h-8 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.nome}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{promo.descricao}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FiClock className="w-5 h-5 text-amber-500" />
                            <span>
                              {formatDate(promo.dataInicio)} - {formatDate(promo.dataFim)}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full ${
                            isActive 
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {isActive ? 'Ativa' : 'Expirada'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiTag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma promoção ativa no momento</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default EstabelecimentoPage;