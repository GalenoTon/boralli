// src/mocks/produtos.ts
import { Produto } from '../types/Produto';

export const mockProdutos: Produto[] = [
  {
    id: "1",
    nome: "Hambúrguer Clássico",
    descricao: "Pão, hambúrguer 180g, alface, tomate, cebola e molho especial",
    preco: 28.90,
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    estabelecimentoId: "1",
    categoria: "Hambúrgueres",
    disponivel: true
  },
  {
    id: "2",
    nome: "Pizza Margherita",
    descricao: "Molho de tomate, muçarela, manjericão fresco e azeite",
    preco: 49.90,
    imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
    estabelecimentoId: "2",
    categoria: "Pizzas",
    disponivel: true
  },
  {
    id: "3",
    nome: "Açaí 500ml",
    descricao: "Açaí cremoso com granola, banana e leite condensado",
    preco: 19.90,
    imagem: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNhaXxlbnwwfHwwfHx8MA%3D%3D",
    estabelecimentoId: "3",
    categoria: "Sobremesas",
    disponivel: true
  },
  {
    id: "4",
    nome: "Sushi Combinado 20 peças",
    descricao: "Mix de sushis variados com salmão, atum e camarão",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    estabelecimentoId: "4",
    categoria: "Japonesa",
    disponivel: true
  },
  {
    id: "5",
    nome: "Bolo de Chocolate",
    descricao: "Fatia de bolo de chocolate com cobertura de ganache",
    preco: 15.90,
    imagem: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    estabelecimentoId: "1",
    categoria: "Sobremesas",
    disponivel: true
  },
  {
    id: "6",
    nome: "Salada Caesar",
    descricao: "Alface americana, croutons, frango grelhado e molho caesar",
    preco: 32.90,
    imagem: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D",
    estabelecimentoId: "2",
    categoria: "Saladas",
    disponivel: true
  },
  {
    id: "7",
    nome: "Água Mineral 500ml",
    descricao: "Água mineral sem gás",
    preco: 4.50,
    imagem: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
    estabelecimentoId: "3",
    categoria: "Bebidas",
    disponivel: true
  },
  {
    id: "8",
    nome: "Refrigerante Lata",
    descricao: "Refrigerante cola 350ml",
    preco: 6.90,
    imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbGElMjBjYW58ZW58MHx8MHx8fDA%3D",
    estabelecimentoId: "4",
    categoria: "Bebidas",
    disponivel: true
  }
];