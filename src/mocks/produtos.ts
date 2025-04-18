// src/mocks/produtos.ts
import { Produto } from '../types/Produto';

export const mockProdutos: Produto[] = [
  // Produtos para The Craft Beer Pub (id:1)
  {
    id: '1',
    nome: 'Hambúrguer Artesanal',
    descricao: 'Hambúrguer artesanal com queijo, alface e tomate',
    preco: 29.90,
    precoOriginal: 34.90,
    desconto: 15,
    categoria: 'Hambúrguer',
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '1',
  },
  {
    id: '2',
    nome: 'Pizza Margherita',
    descricao: 'Pizza tradicional com molho de tomate, queijo e manjericão',
    preco: 49.90,
    precoOriginal: 59.90,
    desconto: 17,
    categoria: 'Pizza',
    imagem: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '1',
  },

  // Produtos para La Pizzeria Napoletana (id:2)
  {
    id: '3',
    nome: 'Cerveja Artesanal',
    descricao: 'Cerveja artesanal IPA 500ml',
    preco: 19.90,
    precoOriginal: 24.90,
    desconto: 20,
    categoria: 'Cerveja',
    imagem: 'https://images.unsplash.com/photo-1516458464372-eea4ab222b31?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '2',
  },
  {
    id: '4',
    nome: 'Garlic Bread',
    descricao: 'Pão italiano com alho assado',
    preco: 19.90,
    categoria: 'Acompanhamento',
    imagem: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '2',
  },

  // Produtos para Churrascaria Gaúcha (id:3)
  {
    id: '5',
    nome: 'Picanha Nobre',
    descricao: 'Corte nobre acompanhado de farofa e vinagrete',
    preco: 89.90,
    categoria: 'Carne',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '3',
  },
  {
    id: '6',
    nome: 'Costela no Fogo de Chão',
    descricao: 'Desfiada na hora com mandioca crocante',
    preco: 79.90,
    categoria: 'Carne',
    imagem: 'https://images.unsplash.com/photo-1568360987818-833c9383a326?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '3',
  },

  // Produtos para Sushi Lounge (id:4)
  {
    id: '7',
    nome: 'Combinado Sushi Premium',
    descricao: '18 peças selecionadas com salmão e atum',
    preco: 129.90,
    categoria: 'Sushi',
    imagem: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '4',
  },
  {
    id: '10',
    nome: 'Hot Roll Crocante',
    descricao: '10 unidades empanadas com recheio de salmão e cream cheese',
    preco: 39.90,
    categoria: 'Sushi',
    imagem: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?auto=format&fit=crop&w=800&q=80',
    estabelecimentoId: '4',
  }
];