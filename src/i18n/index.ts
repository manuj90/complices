import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

const STORAGE_KEY = 'complices-lang'

export function getStoredLanguage(): string {
  return localStorage.getItem(STORAGE_KEY) ?? 'es'
}

export function setStoredLanguage(lng: string) {
  localStorage.setItem(STORAGE_KEY, lng)
}

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n