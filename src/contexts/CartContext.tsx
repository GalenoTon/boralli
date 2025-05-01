import React, { createContext, useState, useContext, useEffect } from 'react';
import { Produto } from '../types/Produto';

type CartItem = {
  produto: Produto;
  quantidade: number;
};

interface CartContextData {
  items: CartItem[];
  addItem: (produto: Produto, quantidade: number) => void;
  removeItem: (produtoId: string) => void;
  updateQuantity: (produtoId: string, quantidade: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('@Boralli:cart');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('@Boralli:cart', JSON.stringify(newItems));
  };

  const addItem = (produto: Produto, quantidade: number) => {
    const existingItemIndex = items.findIndex(item => item.produto.id === produto.id);

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantidade += quantidade;
      saveItems(updatedItems);
    } else {
      saveItems([...items, { produto, quantidade }]);
    }
  };

  const removeItem = (produtoId: string) => {
    const updatedItems = items.filter(item => item.produto.id !== produtoId);
    saveItems(updatedItems);
  };

  const updateQuantity = (produtoId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeItem(produtoId);
      return;
    }

    const updatedItems = items.map(item => 
      item.produto.id === produtoId ? { ...item, quantidade } : item
    );
    saveItems(updatedItems);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantidade, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        getTotalItems, 
        getTotalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
} 