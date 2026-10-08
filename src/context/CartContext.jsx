import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kian-pakhsh-cart-v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isReady]);

  const addItem = (product, size) => {
    if (!product?.id) return;
    const volume = size?.volume || product.volume || "";
    const price = Number(size?.price ?? product.price) || 0;
    const key = `${product.id}__${volume}`;

    setItems((previous) => {
      const existing = previous.find((item) => item.key === key);
      if (existing) {
        return previous.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...previous,
        {
          key,
          product_id: product.id,
          name: product.name,
          image: product.image,
          volume,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const setQuantity = (key, quantity) => {
    setItems((previous) =>
      previous.flatMap((item) => {
        if (item.key !== key) return [item];
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  };

  const removeItem = (key) => setItems((previous) => previous.filter((item) => item.key !== key));

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      isReady,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      count,
      subtotal,
      total: subtotal,
    };
  }, [items, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}