// src/mocks/promocoes.ts
export type Promocao = {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  estabelecimentoId: string;
  imagem: string; // Nova propriedade
};

export const mockPromocoes: Promocao[] = [
  {
    id: '1',
    nome: 'Happy Hour Especial',
    descricao: 'Cervejas artesanais com 40% de desconto das 17h às 19h',
    dataInicio: '2024-07-01',
    dataFim: '2024-07-31',
    estabelecimentoId: '1',
    imagem: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600' // Bar cheio
  },
  {
    id: '2',
    nome: 'Noite da Pizza',
    descricao: 'Todas as pizzas tamanho família por R$ 49,90 às quartas-feiras',
    dataInicio: '2024-07-01',
    dataFim: '2025-12-31',
    estabelecimentoId: '2',
    imagem: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Pizza promocional
  },
  {
    id: '3',
    nome: 'Rodízio Executivo',
    descricao: 'Almoço de rodízio completo por R$ 69,90 de segunda a sexta',
    dataInicio: '2024-07-01',
    dataFim: '2024-07-31',
    estabelecimentoId: '3',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600' // Churrasco
  },
  {
    id: '4',
    nome: 'Sushi a Dois',
    descricao: 'Combinado romântico para casais com taça de saquê incluída',
    dataInicio: '2024-07-10',
    dataFim: '2024-08-10',
    estabelecimentoId: '4',
    imagem: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600' // Sushi romântico
  }
];