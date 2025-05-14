import { createContext, useContext, useState } from 'react';
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    const exists = cart.find((item) => item.id === medicine.id);
    if (!exists) setCart([...cart, { ...medicine, quantity: 1 }]);
  };

  const updateQty = (id, qty) => {
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};