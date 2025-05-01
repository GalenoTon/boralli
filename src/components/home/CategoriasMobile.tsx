import { Utensils, ShoppingCart } from 'lucide-react';

const categorias = [
  { id: 'restaurantes', nome: 'Restaurantes', icone: Utensils },
  { id: 'mercados', nome: 'Mercados', icone: ShoppingCart },
  // ... outras categorias
];

const CategoriasMobile: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {categorias.map((categoria) => (
        <div key={categoria.id} className="flex flex-col items-center">
          <categoria.icone className="w-6 h-6 text-primary" />
          <span className="text-sm mt-1">{categoria.nome}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriasMobile; 