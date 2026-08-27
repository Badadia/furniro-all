import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth";
import { useCartStore } from "./cart.store";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        useCartStore.getState().syncUserLogin(user.id);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        useCartStore.getState().syncUserLogout();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
