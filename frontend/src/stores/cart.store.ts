import type { Product } from "@/types/product";
import { calculateDiscount } from "@/utils/price";
import { create } from "zustand";

export type CartProduct = Pick<
  Product,
  "id" | "sku" | "name" | "price" | "discount" | "image"
>;

export interface CartItem extends CartProduct {
  quantity: number;
}

const GUEST_KEY = "cart_items_guest";
const getUserKey = (userId: string) => `cart_items_user_${userId}`;

function getAuthUserIdFromStorage(): string | null {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.state?.user?.id || null;
    }
  } catch {
    // ignore
  }
  return null;
}

function getCurrentStorageKey(): string {
  const userId = getAuthUserIdFromStorage();
  return userId ? getUserKey(userId) : GUEST_KEY;
}

function getStoredItems(key: string): CartItem[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function persistItems(items: CartItem[]) {
  const key = getCurrentStorageKey();
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // ignore
  }
}

const getInitialItems = (): CartItem[] => {
  const userId = getAuthUserIdFromStorage();
  if (userId) {
    return getStoredItems(getUserKey(userId));
  }
  const guest = getStoredItems(GUEST_KEY);
  if (guest.length > 0) return guest;
  try {
    const legacy = localStorage.getItem("cart-storage");
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (parsed.state?.items) return parsed.state.items;
    }
  } catch {
    // ignore
  }
  return [];
};

interface CartState {
  items: CartItem[];
  isSidebarOpen: boolean;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  syncUserLogin: (userId: string) => void;
  syncUserLogout: () => void;

  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isEmpty: () => boolean;

  getItemQuantity: (id: string) => number;
  getItemSubtotal: (id: string) => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: getInitialItems(),
  isSidebarOpen: false,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  syncUserLogin: (userId: string) => {
    const guestItems = getStoredItems(GUEST_KEY);
    const userItems = getStoredItems(getUserKey(userId));

    const merged = [...userItems];
    for (const guestItem of guestItems) {
      const index = merged.findIndex((i) => i.id === guestItem.id);
      if (index >= 0) {
        merged[index] = {
          ...merged[index],
          quantity: merged[index].quantity + guestItem.quantity,
        };
      } else {
        merged.push(guestItem);
      }
    }

    try {
      localStorage.removeItem(GUEST_KEY);
      localStorage.setItem(getUserKey(userId), JSON.stringify(merged));
    } catch {
      // ignore
    }

    set({ items: merged });
  },

  syncUserLogout: () => {
    const guestItems = getStoredItems(GUEST_KEY);
    set({ items: guestItems });
  },

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }

      persistItems(newItems);
      return { items: newItems };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      persistItems(newItems);
      return { items: newItems };
    });
  },

  increaseQuantity: (id) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      persistItems(newItems);
      return { items: newItems };
    });
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const newItems = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
      persistItems(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      persistItems(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    persistItems([]);
    set({ items: [] });
  },

  isEmpty: () => get().items.length === 0,

  getItemQuantity: (id) => {
    return get().items.find((item) => item.id === id)?.quantity ?? 0;
  },

  getItemSubtotal: (id) => {
    const item = get().items.find((item) => item.id === id);
    return item ? item.price * item.quantity : 0;
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
      (total, item) =>
        total + calculateDiscount(item.price, item.discount) * item.quantity,
      0,
    );
  },
}));
