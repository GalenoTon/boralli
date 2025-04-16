// src/pages/Promocao.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPromocoes, Promocao as PromocaoType } from '../mocks/promocoes';
import { mockEstabelecimentos, Estabelecimento as EstabelecimentoType } from '../mocks/estabelecimentos';
import { FiArrowLeft, FiClock, FiTag, FiAlertTriangle, FiStar, FiShoppingBag, FiCheckCircle, FiMapPin, FiArrowRight } from 'react-icons/fi';

const PromocaoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const promocao = mockPromocoes.find((p: PromocaoType) => p.id === id);

  useEffect(() => {
    const redeemedPromos = localStorage.getItem('redeemedPromos') || '[]';
    setIsRedeemed(JSON.parse(redeemedPromos).includes(id));
  }, [id]);

  const handleRedeem = async () => {
    if (!isActive || isRedeemed) return;

    try {
      setIsRedeeming(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const redeemedPromos = JSON.parse(localStorage.getItem('redeemedPromos') || '[]');
      localStorage.setItem('redeemedPromos', JSON.stringify([...redeemedPromos, id]));

      setIsRedeemed(true);
      alert('Promoção resgatada com sucesso! Apresente este comprovante no estabelecimento.');
    } catch (error) {
      alert('Erro ao resgatar promoção. Tente novamente.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!promocao) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-md space-y-4">
          <FiAlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">Promoção não encontrada</h2>
          <p className="text-gray-600">A promoção que você está procurando não existe ou já expirou.</p>
          <Link
            to="/promocoes"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            Voltar para promoções
          </Link>
        </div>
      </div>
    );
  }

  const estabelecimento = mockEstabelecimentos.find(
    (est: EstabelecimentoType) => est.id === promocao.estabelecimentoId
  );

  const isActive = new Date(promocao.dataFim) > new Date();
  const daysLeft = Math.ceil(
    (new Date(promocao.dataFim).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const renderRedeemButton = () => {
    if (!isActive) {
      return (
        <button
          className="w-full flex items-center justify-center gap-3 bg-gray-300 text-gray-600 py-4 px-8 rounded-xl font-semibold cursor-not-allowed"
          disabled
        >
          <FiAlertTriangle className="w-6 h-6" />
          Promoção Expirada
        </button>
      );
    }

    if (isRedeemed) {
      return (
        <button
          className="w-full flex items-center justify-center gap-3 bg-green-100 text-green-600 py-4 px-8 rounded-xl font-semibold cursor-not-allowed"
          disabled
        >
          <FiCheckCircle className="w-6 h-6" />
          Resgatado com Sucesso!
        </button>
      );
    }

    return (
      <button
        onClick={handleRedeem}
        disabled={isRedeeming}
        className={`w-full flex items-center justify-center gap-3 ${isRedeeming
            ? 'bg-primary-400'
            : 'bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-600 hover:to-amber-600'
          } text-white py-4 px-8 rounded-xl font-semibold transition-all`}
      >
        {isRedeeming ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          <>
            <FiShoppingBag className="w-6 h-6" />
            Resgatar Agora
          </>
        )}
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/promocoes"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft className="w-5 h-5" />
        Voltar para promoções
      </Link>

      {/* Header da Promoção */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-12">
        <img
          src={promocao.imagem}
          alt={promocao.nome}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex items-end">
          <div className="space-y-4 text-white">
            <div className="flex items-center gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${isActive
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
                }`}>
                {isActive ? `⏳ ${daysLeft} dias restantes` : 'Expirada'}
              </span>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiTag className="w-5 h-5" />
                <span>{estabelecimento?.categoria}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{promocao.nome}</h1>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Detalhes da Oferta</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{promocao.descricao}</p>
          </div>

          {/* Estabelecimento */}
          {estabelecimento && (
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={estabelecimento.imagem}
                  alt={estabelecimento.nome}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{estabelecimento.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="w-4 h-4" />
                      <span>{estabelecimento.endereco}</span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiStar className="w-4 h-4 text-amber-400" />
                    <span>4.8 (150 avaliações)</span>
                  </div> */}
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
        </div>

        {/* Sidebar com Informações */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">📅 Período da Promoção</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Início:</span>
                <span>{formatDate(promocao.dataInicio)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock className="w-5 h-5 text-amber-500" />
                <span className="font-medium">Término:</span>
                <span>{formatDate(promocao.dataFim)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">📍 Localização</h3>
            {estabelecimento ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMapPin className="w-5 h-5 text-red-500" />
                  <span>{estabelecimento.endereco}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiTag className="w-5 h-5 text-green-500" />
                  <span>{estabelecimento.poloTuristico}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Informações de localização não disponíveis</p>
            )}
          </div>

          {renderRedeemButton()}
        </div>
      </div>

      {/* Botão Sticky para Mobile */}
      {isActive && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
          {renderRedeemButton()}
        </div>
      )}
    </div>
  );
};

export default PromocaoPage;