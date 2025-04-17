export interface Estabelecimento {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  imagem: string;
}

export const mockEstabelecimentos: Estabelecimento[] = [
  {
    id: 1,
    nome: "Restaurante Sabor & Arte",
    descricao: "Culinária contemporânea com toques regionais",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 1234-5678",
    imagem: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    nome: "Café da Manhã",
    descricao: "Café especial e pães artesanais",
    endereco: "Av. Principal, 456 - Jardim",
    telefone: "(11) 9876-5432",
    imagem: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
  }
]; 