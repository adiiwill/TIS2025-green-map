import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token })
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) }
  )
)
