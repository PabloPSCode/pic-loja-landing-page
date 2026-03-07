import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (name, email) =>
        set({ isAuthenticated: true, user: { name, email } }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "@picloja:auth-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage), // usando localStorage para persistência
      partialize: (state) => {
        // Persistir apenas as informações de autenticação e usuário, ignorando funções
        const { isAuthenticated, user } = state;
        return { isAuthenticated, user };
      }
    }
  ),
);
