'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((item) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) }
            : entry
        );
      }
      return [...current, { ...item, quantity: item.quantity ?? 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = useMemo(
    () => items.reduce((total, entry) => total + entry.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, cartCount, addToCart, removeFromCart, clearCart }),
    [items, cartCount, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartProvider;
