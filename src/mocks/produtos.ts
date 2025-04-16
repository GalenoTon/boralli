// src/mocks/produtos.ts
export type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  estabelecimentoId: string;
  descricao: string;
};

export const mockProdutos: Produto[] = [
  // Produtos para The Craft Beer Pub (id:1)
  {
    id: '1',
    nome: 'Cerveja Artesanal IPA',
    preco: 18.90,
    imagem: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7',
    estabelecimentoId: '1',
    descricao: 'IPA com notas cítricas e amargor equilibrado'
  },
  {
    id: '2',
    nome: 'Hambúrguer Gourmet',
    preco: 34.90,
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    estabelecimentoId: '1',
    descricao: 'Angus 200g com queijo cheddar e bacon'
  },

  // Produtos para La Pizzeria Napoletana (id:2)
  {
    id: '3',
    nome: 'Pizza Margherita',
    preco: 59.90,
    imagem: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94',
    estabelecimentoId: '2',
    descricao: 'Massa napolitana com mussarela de búfala'
  },
  {
    id: '4',
    nome: 'Garlic Bread',
    preco: 19.90,
    imagem: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9',
    estabelecimentoId: '2',
    descricao: 'Pão italiano com alho assado'
  },

  // Produtos para Churrascaria Gaúcha (id:3)
  {
    id: '5',
    nome: 'Picanha Nobre',
    preco: 89.90,
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462',
    estabelecimentoId: '3',
    descricao: 'Corte nobre acompanhado de farofa e vinagrete'
  },
  {
    id: '6',
    nome: 'Costela no Fogo de Chão',
    preco: 79.90,
    imagem: 'https://images.unsplash.com/photo-1568360987818-833c9383a326?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '3',
    descricao: 'Desfiada na hora com mandioca crocante'
  },

  // Produtos para Sushi Lounge (id:4)
  {
    id: '7',
    nome: 'Combinado Sushi Premium',
    preco: 129.90,
    imagem: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '4',
    descricao: '18 peças selecionadas com salmão e atum'
  },
  {
    id: '10',
    nome: 'Hot Roll Crocante',
    preco: 39.90,
    imagem: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    estabelecimentoId: '4',
    descricao: '10 unidades empanadas com recheio de salmão e cream cheese'
  }
];