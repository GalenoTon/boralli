// src/pages/Favoritos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

const Favoritos: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Favoritos</h1>
        <p className="mt-4 text-lg text-gray-600">
          Veja os itens que você marcou como favoritos.
        </p>
      </header>
      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Você ainda não adicionou nenhum favorito.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Voltar para Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Link
              key={item.id}
              to={`/produto/${item.id}`} // Ajuste o link conforme o tipo do item
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-4"
            >
              {item.imagem && (
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-gray-800">{item.nome}</h3>
              {item.descricao && (
                <p className="text-gray-600">{item.descricao}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
