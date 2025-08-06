import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

import { useSettingStore } from './settingStore'

interface AuthStore {
  token: string | null
  setToken: (token: string) => void
  email: string | null
  setEmail: (email: string) => void
  authReset: () => void
}

interface State {
  token: string | null
  email: string | null
}

const initialState: State = {
  token: null,
  email: null
}

const settingStore = useSettingStore

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      token: null,
      setToken: (token: string) => set({ token }),
      email: null,
      setEmail: (email: string) => set({ email }),
      authReset: () => {
        set(initialState)
        settingStore.getState().settingReset()
      }
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) }
  )
)
