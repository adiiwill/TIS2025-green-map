import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  setToken: (token: string) => void
  email: string | null
  setEmail: (email: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      email: null,
      setEmail: (email: string) => set({ email })
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) }
  )
)
