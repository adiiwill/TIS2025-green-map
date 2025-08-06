import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

import i18n from '../i18n'

interface SettingStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void

  language: 'English' | 'Hungarian'
  toggleLanguage: () => void

  settingReset: () => void
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
        const newLanguage = get().language === 'English' ? 'Hungarian' : 'English'
        const i18nLanguageCode = newLanguage === 'English' ? 'en' : 'hu'

        i18n.changeLanguage(i18nLanguageCode)

        set({ language: newLanguage })
      },
      settingReset: () => {
        set(initialState)
        console.log('Settings reset')
      }
    }),
    { name: 'settings-store', storage: createJSONStorage(() => sessionStorage) }
  )
)
