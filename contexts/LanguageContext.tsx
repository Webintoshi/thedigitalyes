'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Locale = 'tr' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'ca' | 'eu' | 'gl' | 'pl' | 'ru' | 'ar' | 'zh' | 'ja' | 'ko'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('tr')

  const t = (key: string): string => {
    try {
      const messages = require(`@/messages/${locale}.json`)
      const keys = key.split('.')
      let value: any = messages
      keys.forEach((k) => {
        value = value?.[k]
      })
      return value || key
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
