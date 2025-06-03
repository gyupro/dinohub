'use client'

import { useTranslation } from 'react-i18next'

export default function BlogHeader() {
  const { t } = useTranslation()
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              🦕 {t('common.title')}
            </h1>
            <p className="text-gray-600 text-sm mt-1">{t('common.description')}</p>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">{t('categories.all')}</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">{t('categories.time')}</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">{t('navigation.categories')}</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">{t('common.about')}</a>
          </nav>
        </div>
      </div>
    </header>
  );
} 