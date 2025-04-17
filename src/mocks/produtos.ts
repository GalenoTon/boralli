// src/mocks/produtos.ts
export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  estabelecimentoId: string;
};

export const mockProdutos: Produto[] = [
  // Produtos para The Craft Beer Pub (id:1)
  {
    id: '1',
    nome: 'Cerveja Artesanal IPA',
    descricao: 'IPA com notas cítricas e amargor equilibrado',
    preco: 18.90,
    categoria: 'Cerveja',
    imagem: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7',
    estabelecimentoId: '1',
  },
  {
    id: '2',
    nome: 'Hambúrguer Gourmet',
    descricao: 'Angus 200g com queijo cheddar e bacon',
    preco: 34.90,
    categoria: 'Hambúrguer',
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    estabelecimentoId: '1',
  },

  // Produtos para La Pizzeria Napoletana (id:2)
  {
    id: '3',
    nome: 'Pizza Margherita',
    descricao: 'Massa napolitana com mussarela de búfala',
    preco: 59.90,
    categoria: 'Pizza',
    imagem: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94',
    estabelecimentoId: '2',
  },
  {
    id: '4',
    nome: 'Garlic Bread',
    descricao: 'Pão italiano com alho assado',
    preco: 19.90,
    categoria: 'Acompanhamento',
    imagem: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9',
    estabelecimentoId: '2',
  },

  // Produtos para Churrascaria Gaúcha (id:3)
  {
    id: '5',
    nome: 'Picanha Nobre',
    descricao: 'Corte nobre acompanhado de farofa e vinagrete',
    preco: 89.90,
    categoria: 'Carne',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462',
    estabelecimentoId: '3',
  },
  {
    id: '6',
    nome: 'Costela no Fogo de Chão',
    descricao: 'Desfiada na hora com mandioca crocante',
    preco: 79.90,
    categoria: 'Carne',
    imagem: 'https://images.unsplash.com/photo-1568360987818-833c9383a326?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '3',
  },

  // Produtos para Sushi Lounge (id:4)
  {
    id: '7',
    nome: 'Combinado Sushi Premium',
    descricao: '18 peças selecionadas com salmão e atum',
    preco: 129.90,
    categoria: 'Sushi',
    imagem: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '4',
  },
  {
    id: '10',
    nome: 'Hot Roll Crocante',
    descricao: '10 unidades empanadas com recheio de salmão e cream cheese',
    preco: 39.90,
    categoria: 'Sushi',
    imagem: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '4',
  }
];