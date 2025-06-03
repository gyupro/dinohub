import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Suspense } from 'react'
import I18nProvider from '@/components/I18nProvider'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'dinohub - 공룡의 모든 것, dinohub',
    template: '%s | dinohub'
  },
  description: '공룡에 대한 모든 것을 탐험하고 발견하세요. 최신 정보와 다양한 공룡 데이터를 제공합니다.',
  keywords: ['공룡', 'dinohub', '화석', '선사시대', '고생물학', '분류학', 'dinosaur', 'fossil', 'prehistoric'],
  authors: [{ name: 'dinohub Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dinohub.vercel.app',
    title: 'dinohub - 공룡의 모든 것, dinohub',
    description: '공룡에 대한 모든 것을 탐험하고 발견하세요. 최신 정보와 다양한 공룡 데이터를 제공합니다.',
    siteName: 'dinohub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'dinohub - 공룡의 모든 것, dinohub'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dinohub - 공룡의 모든 것, dinohub',
    description: '공룡에 대한 모든 것을 탐험하고 발견하세요. 최신 정보와 다양한 공룡 데이터를 제공합니다.',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://dinohub.vercel.app'
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
        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'dinohub',
          url: 'https://dinohub.vercel.app',
          logo: '/og-image.jpg',
          sameAs: [
            'https://dinohub.vercel.app'
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'dinohub',
          url: 'https://dinohub.vercel.app',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://dinohub.vercel.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
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
        <Analytics />
      </body>
    </html>
  )
} 