// src/mocks/estabelecimentos.ts
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

// Função auxiliar para obter o nome do polo
const getNomePolo = (poloId: string): string => {
  const polo = polosTuristicos.find(p => p.id === poloId);
  return polo ? polo.nome : poloId;
};

export const mockEstabelecimentos: Estabelecimento[] = [
  {
    id: '1',
    nome: 'Bar do Zé',
    descricao: 'Bar tradicional da Lapa com música ao vivo',
    endereco: 'Rua da Lapa, 123',
    telefone: '(21) 99999-9999',
    email: 'contato@zedolapa.com.br',
    imagem: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Bar',
    polo: 'lapa',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '2',
    nome: 'Restaurante Nordestino',
    descricao: 'Comida típica nordestina na Feira de São Cristóvão',
    endereco: 'Pavilhão 3, Feira de São Cristóvão',
    telefone: '(21) 99999-9999',
    email: 'contato@nordestino.com.br',
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Restaurante',
    polo: 'feira-sao-cristovao',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '3',
    nome: 'Café do Alto',
    descricao: 'Café com vista panorâmica de Santa Teresa',
    endereco: 'Rua Almirante Alexandrino, 456',
    telefone: '(21) 99999-9999',
    email: 'contato@cafedoalto.com.br',
    imagem: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Cafeteria',
    polo: 'santa-teresa',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '4',
    nome: 'Bar do Méier',
    descricao: 'Bar tradicional do Baixo Méier',
    endereco: 'Rua Dias da Cruz, 789',
    telefone: '(21) 99999-9999',
    email: 'contato@barmier.com.br',
    imagem: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Bar',
    polo: 'baixo-meier',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '5',
    nome: 'Restaurante da Praia',
    descricao: 'Comida típica carioca em Copacabana',
    endereco: 'Av. Atlântica, 1234',
    telefone: '(21) 99999-9999',
    email: 'contato@restaurantedapraia.com.br',
    imagem: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Restaurante',
    polo: 'copacabana',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '6',
    nome: 'Café Ipanema',
    descricao: 'Café com vista para o Arpoador',
    endereco: 'Rua Visconde de Pirajá, 456',
    telefone: '(21) 99999-9999',
    email: 'contato@cafeipanema.com.br',
    imagem: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Cafeteria',
    polo: 'ipanema',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  },
  {
    id: '7',
    nome: 'Bar do Leblon',
    descricao: 'Bar sofisticado no Leblon',
    endereco: 'Rua Dias Ferreira, 789',
    telefone: '(21) 99999-9999',
    email: 'contato@barlblon.com.br',
    imagem: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    categoria: 'Bar',
    polo: 'leblon',
    avaliacao: 4.5,
    tempoEntrega: "30-45 min",
    get poloTuristico() { return getNomePolo(this.polo); }
  }
];

export const polosTuristicos = [
  {
    id: 'todos',
    nome: 'Todos os Polos',
    imagem: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'feira-sao-cristovao',
    nome: 'Feira de São Cristóvão',
    imagem: 'https://images.unsplash.com/photo-1581876811976-97b4c6b3f1ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'lapa',
    nome: 'Lapa',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'baixo-meier',
    nome: 'Baixo Méier',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'santa-teresa',
    nome: 'Santa Teresa',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'copacabana',
    nome: 'Copacabana',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'ipanema',
    nome: 'Ipanema',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'leblon',
    nome: 'Leblon',
    imagem: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  }
];