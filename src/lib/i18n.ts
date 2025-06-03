import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation files
import koTranslation from '../locales/ko.json'
import enTranslation from '../locales/en.json'

const resources = {
  ko: {
    translation: koTranslation
  },
  en: {
    translation: enTranslation
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // default language
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n 