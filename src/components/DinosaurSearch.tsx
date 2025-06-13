import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Mapping UI filter values to database values
const locomotionTypeMapping = {
  'swimming': 'swimming',
  'gliding': 'gliding',
  'quadruped': 'quadruped',
  'biped': 'biped'
} as const;

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

  // Debug function to check actual locomotion types in database
  useEffect(() => {
    const checkActualLocomotionTypes = async () => {
      try {
        const response = await fetch('/api/dinosaurs/statistics');
        const stats = await response.json();
        if (stats.locomotionDistribution) {
          console.log('🔍 Actual locomotion types in database:', Object.keys(stats.locomotionDistribution));
          console.log('📊 Full locomotion distribution:', stats.locomotionDistribution);
        }
      } catch (error) {
        console.error('Failed to fetch locomotion statistics:', error);
      }
    };
    
    // Run once on component mount
    checkActualLocomotionTypes();
  }, []);

  // Auto-apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      console.log('🔧 Filter values:', { searchQuery, diet, locomotionType });
      if (!searchQuery.trim() && !diet && !locomotionType) {
        console.log('🚫 No filters active, clearing search');
        onSearchStateChange(false);
        return;
      }
      
      // Map locomotion type to database value
      const mappedLocomotionType = locomotionType ? locomotionTypeMapping[locomotionType as keyof typeof locomotionTypeMapping] || locomotionType : '';
      console.log('🗺️ Locomotion mapping:', {
        original: locomotionType,
        mapped: mappedLocomotionType,
        available_options: Object.keys(locomotionTypeMapping)
      });
      
      console.log('🔍 Sending search request with filters:', {
        query: searchQuery,
        diet: diet,
        locomotionType: mappedLocomotionType
      });
      
      await onSearch(searchQuery, { diet, locomotionType: mappedLocomotionType });
    }
    
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300) // Small debounce to avoid too many requests
    
    return () => clearTimeout(timeoutId)
  }, [searchQuery, diet, locomotionType, onSearch, onSearchStateChange])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with filters:', { searchQuery, diet, locomotionType });
  }

  const handleClear = async () => {
    console.log('Clearing all filters');
    setSearchQuery('')
    setDiet('')
    setLocomotionType('')
    onSearchStateChange(false)
    // Clear filters immediately
    await onSearch('', { diet: '', locomotionType: '' })
  }

  return (
    <form onSubmit={handleSearch} className="relative space-y-3" role="search" aria-label="Dinosaur search and filters">
      {/* Filter Tags */}
      {(diet || locomotionType) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {diet && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700 border border-orange-200">
              🍽️ {t(`dinosaur.${diet}`)}
              <button 
                type="button" 
                onClick={() => setDiet('')} 
                className="ml-1 hover:text-orange-900 text-lg leading-none"
                aria-label={`Remove ${diet} diet filter`}
              >
                ×
              </button>
            </span>
          )}
          {locomotionType && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-200">
              🚶 {t(`dinosaur.${locomotionType}`)}
              <button 
                type="button" 
                onClick={() => setLocomotionType('')} 
                className="ml-1 hover:text-blue-900 text-lg leading-none"
                aria-label={`Remove ${locomotionType} locomotion filter`}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Main Filters - Mobile Optimized */}
      <div className="relative">
        {isLoading && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2 z-10">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{t('search.filtering')}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="relative">
            <label className="block text-xs font-medium text-white/90 mb-1 px-1">
              🍽️ {t('dinosaur.diet')}
            </label>
            <select
              value={diet}
              onChange={e => setDiet(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors shadow-sm"
              aria-label="Filter by diet"
            >
              <option value="">{t('dinosaur.diet')} — {t('categories.all')}</option>
              <option value="herbivore">🌿 {t('dinosaur.herbivore')}</option>
              <option value="carnivore">🥩 {t('dinosaur.carnivore')}</option>
              <option value="omnivore">🍽️ {t('dinosaur.omnivore')}</option>
              <option value="piscivore">🐟 {t('dinosaur.piscivore')}</option>
            </select>
          </div>
          
          <div className="relative">
            <label className="block text-xs font-medium text-white/90 mb-1 px-1">
              🚶 {t('dinosaur.locomotion')}
            </label>
            <select
              value={locomotionType}
              onChange={e => setLocomotionType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors shadow-sm"
              aria-label="Filter by locomotion type"
            >
              <option value="">{t('dinosaur.locomotion')} — {t('categories.all')}</option>
              <option value="swimming">🏊 {t('dinosaur.swimming')}</option>
              <option value="gliding">🦅 {t('dinosaur.gliding')}</option>
              <option value="quadruped">🦏 {t('dinosaur.quadruped')}</option>
              <option value="biped">🚶 {t('dinosaur.biped')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar - Mobile Optimized */}
      <div className="space-y-3">
        <div className="relative">
          <label className="block text-xs font-medium text-white/90 mb-2 px-1">
            🔍 {t('search.searchDinosaur')}
          </label>
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full px-5 py-4 text-gray-900 bg-white rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all duration-200 pl-12 shadow-sm text-base"
              disabled={isLoading}
              aria-label="Search dinosaurs by name"
              aria-describedby="search-description"
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg group-focus-within:text-orange-500 transition-colors">🔍</span>
            </div>
          </div>
        </div>
        
        {(searchQuery || diet || locomotionType) && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg"
            >
              <span>🗑️</span>
              <span>{t('common.clearAll')}</span>
            </button>
          </div>
        )}
      </div>
      <div id="search-description" className="mt-2 text-xs text-white/80 text-center">
        <span aria-hidden="true">🦕</span> {t('home.searchDescription')}
      </div>
    </form>
  )
}