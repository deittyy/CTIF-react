import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === product.id &&
          p.selectedSize === product.selectedSize &&
          p.selectedColor === product.selectedColor,
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id &&
          p.selectedSize === product.selectedSize &&
          p.selectedColor === product.selectedColor
            ? { ...p, qty: p.qty + 1 }
            : p,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        totalItems,
        isOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
