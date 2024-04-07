import { CartItem, Product, Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type Product = Tables<"products">;

type cartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<cartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    // console.log(product);
    const existingItemIndex = items.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItemIndex !== -1) {
      const updatedItem = [...items];
      updatedItem[existingItemIndex].quantity += 1;
      setItems(updatedItem);
    } else {
      const newCartItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        size,
        quantity: 1
      };

      setItems([newCartItem, ...items]);
      console.log(newCartItem);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
    console.log(updatedItems, "***");
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
