import type { Produto } from '../../types/Produto';

interface Props {
  produtos: Produto[];
}

const ProdutosSection: React.FC<Props> = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        {/* Carousel content */}
      </div>
    </section>
  );
};

export default ProdutosSection; 