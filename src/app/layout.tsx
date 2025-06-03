import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Suspense } from 'react'
import I18nProvider from '@/components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Dinosaur Discovery - 공룡 발견의 여정',
    template: '%s | Dinosaur Discovery'
  },
  description: '다양한 시대의 공룡들을 탐험하고 발견하세요. 과학적 분류 체계와 상세한 공룡 정보를 제공합니다.',
  keywords: ['공룡', '화석', '선사시대', '고생물학', '분류학', 'dinosaur', 'fossil', 'prehistoric'],
  authors: [{ name: 'Dinosaur Discovery Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dinosaur-discovery.vercel.app',
    title: 'Dinosaur Discovery - 공룡 발견의 여정',
    description: '다양한 시대의 공룡들을 탐험하고 발견하세요. 과학적 분류 체계와 상세한 공룡 정보를 제공합니다.',
    siteName: 'Dinosaur Discovery',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dinosaur Discovery - 공룡 발견의 여정'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinosaur Discovery - 공룡 발견의 여정',
    description: '다양한 시대의 공룡들을 탐험하고 발견하세요. 과학적 분류 체계와 상세한 공룡 정보를 제공합니다.',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://dinosaur-discovery.vercel.app'
  },
  category: 'education'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          
          {/* Main Content */}
          <main className="">
            {children}
          </main>
          
          {/* Floating Language Switcher */}
          <div className="fixed top-6 right-6 z-[9999]">
            <Suspense fallback={<div className='w-24 h-10 bg-white/30 rounded-full animate-pulse' />}>
              <LanguageSwitcher />
            </Suspense>
          </div>
          
          {/* Subtle floating particles effect */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-300/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </I18nProvider>
      </body>
    </html>
  )
} 