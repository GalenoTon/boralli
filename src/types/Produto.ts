export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  desconto?: number;
  categoria: string;
  imagem: string;
  estabelecimentoId: string;
} 