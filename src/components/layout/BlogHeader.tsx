'use client'

import { useTranslation } from 'react-i18next'

export default function BlogHeader() {
  const { t } = useTranslation()
  
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
              🦕 {t('common.title')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{t('common.description')}</p>
          </div>
        </div>
      </div>
    </header>
  );
} 