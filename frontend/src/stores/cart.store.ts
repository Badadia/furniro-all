import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO: possivelmente eu altere essa tipagem melhor depois
export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  getItemQuantity: (id: string) => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

function getUnitPrice(item: Pick<Product, "price" | "discount">): number {
  const discountValue = item.price * (item.discount / 100);
  return item.price - discountValue;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemQuantity: (id) => {
        return get().items.find((item) => item.id === id)?.quantity ?? 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + getUnitPrice(item) * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
