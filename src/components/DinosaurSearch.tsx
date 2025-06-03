import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DinosaurSearchProps {
  onSearch: (query: string, filters?: { diet?: string; locomotionType?: string }) => Promise<void>
  onSearchStateChange: (searching: boolean) => void
  isLoading?: boolean
}

export default function DinosaurSearch({ onSearch, onSearchStateChange, isLoading }: DinosaurSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [diet, setDiet] = useState('')
  const [locomotionType, setLocomotionType] = useState('')
  const { t } = useTranslation()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() && !diet && !locomotionType) {
      onSearchStateChange(false)
      return
    }
    await onSearch(searchQuery, { diet, locomotionType })
  }

  const handleClear = () => {
    setSearchQuery('')
    setDiet('')
    setLocomotionType('')
    onSearchStateChange(false)
  }

  return (
    <form onSubmit={handleSearch} className="relative space-y-2">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <select
          value={diet}
          onChange={e => setDiet(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">{t('dinosaur.diet')}</option>
          <option value="herbivore">{t('dinosaur.herbivore')}</option>
          <option value="carnivore">{t('dinosaur.carnivore')}</option>
          <option value="omnivore">{t('dinosaur.omnivore')}</option>
          <option value="piscivore">{t('dinosaur.piscivore')}</option>
        </select>
        <select
          value={locomotionType}
          onChange={e => setLocomotionType(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">{t('dinosaur.locomotion')}</option>
          <option value="bipedal">{t('dinosaur.bipedal')}</option>
          <option value="quadrupedal">{t('dinosaur.quadrupedal')}</option>
          <option value="aquatic">{t('dinosaur.aquatic')}</option>
          <option value="flying">{t('dinosaur.flying')}</option>
          <option value="terrestrial">{t('dinosaur.terrestrial')}</option>
        </select>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-gray-400 text-lg">🔍</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-white text-orange-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
        >
          {t('common.search')}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ✕
        </button>
      </div>
      <div className="mt-2 text-xs text-white/80 text-center">
        🦕 {t('home.searchDescription')}
      </div>
    </form>
  )
} 