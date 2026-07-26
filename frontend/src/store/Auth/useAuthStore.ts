import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "../../types/Auth"

interface AuthStoreTypes {
  user: User | null
  token: string | null
  isLoggedIn: boolean

  login: (user: User, token: string) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStoreTypes>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      setToken: (token) =>
        set((state) => ({
          ...state,
          token,
        })),

      logout: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
)
