// src/mocks/promocoes.ts
export type Promocao = {
  id: string;
  nome: string;
  descricao: string;
  desconto: number;
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
    descricao: 'Cerveja IPA com 30% de desconto no happy hour',
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
    descricao: 'Pizza Margherita com 20% de desconto às terças-feiras',
    desconto: 20,
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94',
    estabelecimentoId: '2',
    produtoId: '3',
  },
  {
    id: '3',
    nome: 'Rodízio Especial',
    descricao: 'Rodízio completo com 15% de desconto nos finais de semana',
    desconto: 15,
    dataInicio: '2024-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462',
    estabelecimentoId: '3',
    produtoId: '5',
  },
  {
    id: '4',
    nome: 'Combinado do Chef',
    descricao: 'Combinado premium com 25% de desconto',
    desconto: 25,
    dataInicio: '202-03-01',
    dataFim: '2025-12-31',
    imagem: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252',
    estabelecimentoId: '4',
    produtoId: '7',
  },
];