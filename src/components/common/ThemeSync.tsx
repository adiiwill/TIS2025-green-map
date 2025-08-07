import { useEffect } from 'react'

import { useSettingStore } from '../../store/settingStore.ts'

const ThemeSync = () => {
  const { theme } = useSettingStore()

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return null
}

export default ThemeSync
