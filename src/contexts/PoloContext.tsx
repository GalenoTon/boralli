import { createContext, useContext, useState } from 'react';
import { Estabelecimento } from '../mocks/estabelecimentos';

interface PoloContextType {
  poloSelecionado: string;
  setPoloSelecionado: (polo: string) => void;
  filtrarPorPolo: <T extends { estabelecimentoId: string }>(items: T[], estabelecimentos: Estabelecimento[]) => T[];
  filtrarEstabelecimentos: (estabelecimentos: Estabelecimento[]) => Estabelecimento[];
}

export const PoloContext = createContext<PoloContextType>({} as PoloContextType);

export const PoloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [poloSelecionado, setPoloSelecionado] = useState('');

  const filtrarPorPolo = <T extends { estabelecimentoId: string }>(
    items: T[],
    estabelecimentos: Estabelecimento[]
  ): T[] => {
    if (!poloSelecionado) return items;
    const estabelecimentosDosPolo = estabelecimentos.filter(e => e.polo === poloSelecionado);
    return items.filter(item => 
      estabelecimentosDosPolo.some(e => e.id === item.estabelecimentoId)
    );
  };

  const filtrarEstabelecimentos = (estabelecimentos: Estabelecimento[]): Estabelecimento[] => {
    if (!poloSelecionado) return estabelecimentos;
    return estabelecimentos.filter(e => e.polo === poloSelecionado);
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
};

export const usePolo = () => useContext(PoloContext); 