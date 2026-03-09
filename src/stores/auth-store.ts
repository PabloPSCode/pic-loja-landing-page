import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (name: string, email: string, avatarUrl?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (name, email, avatarUrl) =>
        set({
          isAuthenticated: true,
          user: {
            name,
            email,
            ...(avatarUrl ? { avatarUrl } : {}),
          },
        }),
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
