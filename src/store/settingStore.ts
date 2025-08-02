import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SettingStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void

  language: 'English' | 'Hungarian'
  toggleLanguage: () => void
}

interface State {
  theme: 'light' | 'dark'
  language: 'English' | 'Hungarian'
}

const initialState: State = {
  theme: 'light',
  language: 'English'
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleTheme: () => {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' })
      },
      toggleLanguage: () => {
        set({ language: get().language === 'English' ? 'Hungarian' : 'English' })
      }
    }),
    { name: 'settings-store', storage: createJSONStorage(() => sessionStorage) }
  )
)
