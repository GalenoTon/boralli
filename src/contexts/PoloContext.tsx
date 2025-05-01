import { createContext, useContext, useState, ReactNode } from 'react';
import { Estabelecimento } from '../mocks/estabelecimentos';
import { Produto } from '../types/Produto';
import { Promocao } from '../mocks/promocoes';

interface PoloContextType {
  poloSelecionado: string;
  setPoloSelecionado: (polo: string) => void;
  filtrarPorPolo: <T extends { estabelecimentoId: string }>(items: T[], estabelecimentos: Estabelecimento[]) => T[];
  filtrarEstabelecimentos: (estabelecimentos: Estabelecimento[]) => Estabelecimento[];
}

const PoloContext = createContext<PoloContextType | undefined>(undefined);

export function PoloProvider({ children }: { children: ReactNode }) {
  const [poloSelecionado, setPoloSelecionado] = useState('todos');

  // Função para filtrar estabelecimentos
  const filtrarEstabelecimentos = (estabelecimentos: Estabelecimento[]) => {
    if (poloSelecionado === 'todos') return estabelecimentos;
    return estabelecimentos.filter(est => est.polo === poloSelecionado);
  };

  // Função genérica para filtrar itens relacionados a estabelecimentos (produtos e promoções)
  const filtrarPorPolo = <T extends { estabelecimentoId: string }>(
    items: T[],
    estabelecimentos: Estabelecimento[]
  ): T[] => {
    if (poloSelecionado === 'todos') return items;
    
    const estabelecimentosDoPolo = estabelecimentos
      .filter(est => est.polo === poloSelecionado)
      .map(est => est.id);
    
    return items.filter(item => estabelecimentosDoPolo.includes(item.estabelecimentoId));
  };

  return (
    <PoloContext.Provider value={{
      poloSelecionado,
      setPoloSelecionado,
      filtrarPorPolo,
      filtrarEstabelecimentos
    }}>
      {children}
    </PoloContext.Provider>
  );
}

export function usePolo() {
  const context = useContext(PoloContext);
  if (context === undefined) {
    throw new Error('usePolo must be used within a PoloProvider');
  }
  return context;
} 