"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

// Tipuri
export type CartItem = {
  id: number;
  count: number;
};

export type CartState = {
  items: CartItem[];
  status: string;
};

export type CartActions = {
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  incrementItemCount: (id: number) => void;
  decrementItemCount: (id: number) => void;
};

export type CartContextType = CartState & CartActions;

// Starea inițială
export const defaultInitState: CartState = {
  items: [],
  status: "0",
};

// Crearea Contextului Cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartStoreProvider pentru a expune store-ul în aplicație
export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, setCartState] = useState<CartState>(defaultInitState);

  const addItem = (id: number) => {
    setCartState((state) => {
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[itemIndex].count += 1;
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { id, count: 1 }] };
    });
  };

  const removeItem = (id: number) => {
    setCartState((state) => ({
      ...state,
      items: state.items.filter((item) => item.id !== id),
    }));
  };

  const incrementItemCount = (id: number) => {
    setCartState((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      );
      return { ...state, items: updatedItems };
    });
  };

  const decrementItemCount = (id: number) => {
    setCartState((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item,
      );
      return { ...state, items: updatedItems };
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addItem,
        removeItem,
        incrementItemCount,
        decrementItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook pentru a accesa store-ul
export const useCartStore = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartStore must be used within a CartStoreProvider");
  }

  return context;
};
