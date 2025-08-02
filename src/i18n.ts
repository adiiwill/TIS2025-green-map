import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import en from './locales/en/translation.json'
import hu from './locales/hu/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hu: { translation: hu }
  },
  lng: 'hu',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
