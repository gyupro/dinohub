'use client'

import { useTranslation } from 'react-i18next'

export default function BlogFooter() {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              🦕 {t('common.title')}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              {t('common.description')}
            </p>
            <div className="flex gap-3">
              <button className="text-gray-400 hover:text-orange-600 transition-colors duration-200 text-lg">
                📧
              </button>
              <button className="text-gray-400 hover:text-orange-600 transition-colors duration-200 text-lg">
                🐦
              </button>
              <button className="text-gray-400 hover:text-orange-600 transition-colors duration-200 text-lg">
                📱
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('bestiary.title')}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('categories.all')}</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('categories.time')}</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('categories.food')}</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('dinosaur.classification')}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('common.about')}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">RESTasaurus API</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('modal.dataProvider')}</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('footer.contact')}</div>
              <div className="hover:text-orange-600 transition-colors duration-200 cursor-pointer">{t('footer.privacy')}</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-8 text-center text-gray-500 text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
} 