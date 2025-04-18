// src/pages/Promocoes.tsx
import { Link } from 'react-router-dom';
import { mockPromocoes } from '../mocks/promocoes';
import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi';

const Promocoes: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Atualizado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-500 to-amber-600 bg-clip-text text-transparent">
          Ofertas Imperdíveis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra promoções exclusivas e oportunidades únicas nos melhores estabelecimentos
        </p>
      </header>

      {/* Grid de Promoções */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPromocoes.map((promocao) => (
          <Link 
            key={promocao.id} 
            to={`/promocao/${promocao.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={promocao.imagem}
                alt={promocao.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {promocao.desconto}% OFF
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{promocao.nome}</h3>
              <p className="text-gray-600 mb-4">{promocao.descricao}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <FiClock className="w-4 h-4" />
                  <span>Válido até {formatDate(promocao.dataFim)}</span>
                </div>
                <Link
                  to={`/estabelecimento/${promocao.estabelecimentoId}`}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver estabelecimento
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Promocoes;