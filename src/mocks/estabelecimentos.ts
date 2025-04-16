// src/mocks/estabelecimentos.ts
export type Estabelecimento = {
  id: string;
  nome: string;
  endereco: string;
  poloTuristico: string;
  categoria: string;
  imagem: string;
};

export const mockEstabelecimentos: Estabelecimento[] = [
  {
    id: '1',
    nome: 'The Craft Beer Pub',
    endereco: 'Rua das Cervejas, 150',
    poloTuristico: 'Centro Histórico',
    categoria: 'Bar',
    imagem: 'https://images.unsplash.com/photo-1552566626-52f8b828add9', // Bar com barril
  },
  {
    id: '2',
    nome: 'La Pizzeria Napoletana',
    endereco: 'Avenida Forno a Lenha, 220',
    poloTuristico: 'Bairro Italiano',
    categoria: 'Restaurante',
    imagem: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212', // Pizzaria
  },
  {
    id: '3',
    nome: 'Churrascaria Gaúcha',
    endereco: 'Estrada dos Espetos, 300',
    poloTuristico: 'Zona Sul',
    categoria: 'Restaurante',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462', // Churrasco
  },
  {
    id: '4',
    nome: 'Sushi Lounge',
    endereco: 'Alameda Wasabi, 45',
    poloTuristico: 'Jardins',
    categoria: 'Restaurante',
    imagem: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a', // Sushi
  }
];