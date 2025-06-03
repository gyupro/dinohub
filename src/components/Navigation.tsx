'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, BookOpen, Microscope } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const { t } = useTranslation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl px-8 py-4 shadow-2xl">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="group flex items-center gap-3 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🦕</span>
              <span className="text-2xl animate-bounce delay-75">🦖</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-100">
                {t('common.title')}
              </span>
              <span className="text-xs text-orange-300">
                {t('navigation.database')}
              </span>
            </div>
          </Link>
          
          {/* 네비게이션 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-gray-100 hover:text-orange-400 transition-all duration-300 font-medium"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform" />
              <span>{t('navigation.dinosaurSearch')}</span>
            </Link>
            
            <Link 
              href="/#popular" 
              className="group flex items-center gap-2 text-gray-100 hover:text-green-400 transition-all duration-300 font-medium"
            >
              <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
              <span>{t('navigation.popularDinosaurs')}</span>
            </Link>
            
            <Link 
              href="/#categories" 
              className="group flex items-center gap-2 text-gray-100 hover:text-blue-400 transition-all duration-300 font-medium"
            >
              <Microscope size={18} className="group-hover:scale-110 transition-transform" />
              <span>{t('navigation.categories')}</span>
            </Link>

            {/* 특별 기능 버튼 */}
            <div className="h-6 w-px bg-gray-600"></div>
            
            <Link
              href="/generator"
              className="group flex items-center gap-2 px-3 py-2 bg-orange-600/80 hover:bg-orange-700/90 rounded-lg text-white font-semibold transition-all duration-200 shadow-md border border-orange-400/30"
            >
              <span className="text-lg">🔬</span>
              <span>{t('navigation.scientificInfo')}</span>
            </Link>
          </div>

          {/* 언어 변경 및 모바일 메뉴 */}
          <div className="flex items-center gap-4">
            {/* 모바일 메뉴 버튼 */}
            <button className="md:hidden flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-gray-100 hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-700 space-y-2 px-2">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-gray-100 hover:text-orange-400 transition-colors font-medium rounded-lg px-3 py-3 bg-white/5"
          >
            <Search size={20} />
            {t('navigation.dinosaurSearch')}
          </Link>
          <Link 
            href="/#popular" 
            className="flex items-center gap-3 text-gray-100 hover:text-green-400 transition-colors font-medium rounded-lg px-3 py-3 bg-white/5"
          >
            <BookOpen size={20} />
            {t('navigation.popularDinosaurs')}
          </Link>
          <Link 
            href="/#categories" 
            className="flex items-center gap-3 text-gray-100 hover:text-blue-400 transition-colors font-medium rounded-lg px-3 py-3 bg-white/5"
          >
            <Microscope size={20} />
            {t('navigation.categories')}
          </Link>
          <Link
            href="/generator"
            className="flex items-center gap-3 bg-orange-600/80 hover:bg-orange-700/90 rounded-lg px-3 py-3 text-white font-semibold transition-all duration-200 shadow-md border border-orange-400/30"
          >
            <span className="text-lg">🔬</span>
            {t('navigation.scientificInfo')}
          </Link>
        </div>
      </div>
    </nav>
  )
} 