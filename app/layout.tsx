import type { Metadata } from 'next'
import { Inter, Playfair_Display, Montserrat, Cormorant_Garamond, Tangerine, Lora } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const tangerine = Tangerine({
  subsets: ['latin'],
  variable: '--font-tangerine',
  weight: ['400', '700'],
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: 'The Digital Yes - Dijital Düğün Davetiyeleri',
  description: 'RSVP, misafir listesi, etkileşimli haritalar ve müzik içeren güzel dijital düğün davetiyeleri oluşturun. Tek seferlik ödeme, abonelik yok.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${cormorant.variable} ${tangerine.variable} ${lora.variable} font-sans`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
