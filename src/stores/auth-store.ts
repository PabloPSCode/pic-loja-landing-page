import type { UserPlan } from "@/dtos/user.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  activePlan: UserPlan;
  availableCredits: number;
  consumedCredits: number;
  avatarUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  setCredits: (
    availableCredits: number,
    consumedCredits: number,
  ) => void;
  syncUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),
      setCredits: (availableCredits, consumedCredits) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                availableCredits,
                consumedCredits,
              }
            : null,
        })),
      syncUser: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "@picloja:auth-storage",
      version: 4,
      storage: createJSONStorage(() => localStorage), // usando localStorage para persistência
      partialize: (state) => {
        // Persistir apenas as informações de autenticação e usuário, ignorando funções
        const { isAuthenticated, user } = state;
        return { isAuthenticated, user };
      },
    },
  ),
);
