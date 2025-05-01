export interface Estabelecimento {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email: string;
  imagem: string;
  categoria: string;
  polo: string;
  avaliacao: number;
  tempoEntrega: string;
  get poloTuristico(): string;
}

export interface EstabelecimentoComAvaliacao extends Estabelecimento {
  avaliacao: number;
  tempoEntrega: string;
  pedidoMinimo: number;
} 