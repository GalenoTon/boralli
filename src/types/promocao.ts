export interface Promocao {
  id: string;
  nome: string;
  titulo: string;
  descricao: string;
  tipo: 'desconto' | 'leve-mais-pague-menos' | 'brinde' | 'valor-fixo';
  desconto: number;
  quantidadeLeve?: number;
  quantidadePague?: number;
  brindeDescricao?: string;
  valorFixo?: number;
  dataInicio: string;
  dataFim: string;
  imagem: string;
  estabelecimentoId: string;
  produtoId: string;
} 