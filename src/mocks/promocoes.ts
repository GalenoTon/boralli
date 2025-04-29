// src/mocks/promocoes.ts
export type Promocao = {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'desconto' | 'leve-mais-pague-menos' | 'brinde' | 'valor-fixo';
  desconto?: number;
  quantidadeLeve?: number;
  quantidadePague?: number;
  brindeDescricao?: string;
  valorFixo?: number;
  dataInicio: string;
  dataFim: string;
  imagem: string;
  estabelecimentoId: string;
  produtoId: string;
};

export const mockPromocoes: Promocao[] = [
  {
    id: '1',
    nome: 'Happy Hour IPA',
    tipo: 'desconto',
    descricao: 'Cerveja IPA com desconto no happy hour',
    desconto: 30,
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7',
    estabelecimentoId: '1',
    produtoId: '1',
  },
  {
    id: '2',
    nome: 'Pizza do Dia',
    tipo: 'leve-mais-pague-menos',
    descricao: 'Leve 3 pizzas, pague 2',
    quantidadeLeve: 3,
    quantidadePague: 2,
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94',
    estabelecimentoId: '2',
    produtoId: '3',
  },
  {
    id: '3',
    nome: 'Rodízio Especial',
    tipo: 'brinde',
    descricao: 'Rodízio completo com sobremesa grátis',
    brindeDescricao: 'Sorvete de creme com calda de chocolate',
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462',
    estabelecimentoId: '3',
    produtoId: '5',
  },
  {
    id: '4',
    nome: 'Combinado do Chef',
    tipo: 'valor-fixo',
    descricao: 'Combinado premium por preço especial',
    valorFixo: 79.90,
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252',
    estabelecimentoId: '4',
    produtoId: '7',
  },
  {
    id: '5',
    nome: 'Promoção Relâmpago',
    tipo: 'desconto',
    descricao: '40% de desconto em todos os drinks',
    desconto: 40,
    dataInicio: '2024-03-01',
    dataFim: '2024-03-07',
    imagem: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
    estabelecimentoId: '5',
    produtoId: '9',
  }
];