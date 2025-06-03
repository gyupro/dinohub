'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DinosaurSearch from '@/components/DinosaurSearch'
import DinosaurPost from '@/components/blog/DinosaurPost'
import BlogPostModal from '@/components/blog/BlogPostModal'
import Pagination from '@/components/blog/Pagination'
import BlogHeader from '@/components/layout/BlogHeader'
import BlogFooter from '@/components/layout/BlogFooter'
import { useDinosaurData } from '@/hooks/useDinosaurData'
import { Dinosaur } from '@/data/dinosaurs'
import type { Dinosaur as DinosaurType } from '@/data/dinosaurs'

export default function DinosaurBlogHomePage() {
  const [selectedDinosaur, setSelectedDinosaur] = useState<Dinosaur | null>(null)
  const { t } = useTranslation()
  
  const {
    dinosaurs,
    isLoading,
    error,
    search,
    diet,
    locomotionType,
    temporalRange,
    page,
    totalPages,
    totalCount,
    setSearch,
    setDiet,
    setLocomotionType,
    setTemporalRange,
    setPage
  } = useDinosaurData(12)

  // For search input local state
  const [searchInput, setSearchInput] = useState(search);
  const [localTemporalRange, setLocalTemporalRange] = useState(temporalRange || '');

  // When search form is submitted, update the hook's search state
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  // When filter changes, update the hook's filter state
  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDiet(e.target.value);
    setPage(1);
  };
  const handleLocomotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocomotionType(e.target.value);
    setPage(1);
  };
  const handleTemporalRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemporalRange(e.target.value);
    setLocalTemporalRange(e.target.value);
    setPage(1);
  };

  const listToDisplay = dinosaurs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-4 sm:py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 flex items-center justify-center gap-1 sm:gap-3">
            <span className="animate-bounce">🦖</span>
            <span>{t('home.heroTitle')}</span>
            <span className="animate-bounce delay-75">🦕</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg opacity-90 mb-2 sm:mb-3 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>
          
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent text-xs sm:text-sm px-1">
            <div className="min-w-[160px] bg-white/10 backdrop-blur rounded-lg p-3 flex-shrink-0">
              <div className="text-xl mb-1">🔬</div>
              <div className="font-medium">{t('home.scientificAccuracy')}</div>
              <div className="opacity-80 text-xs">{t('home.scientificAccuracyDesc')}</div>
            </div>
            <div className="min-w-[160px] bg-white/10 backdrop-blur rounded-lg p-3 flex-shrink-0">
              <div className="text-xl mb-1">📚</div>
              <div className="font-medium">{t('home.richData')}</div>
              <div className="opacity-80 text-xs">{t('home.richDataDesc')}</div>
            </div>
            <div className="min-w-[160px] bg-white/10 backdrop-blur rounded-lg p-3 flex-shrink-0">
              <div className="text-xl mb-1">🌍</div>
              <div className="font-medium">{t('home.globalDiscovery')}</div>
              <div className="opacity-80 text-xs">{t('home.globalDiscoveryDesc')}</div>
            </div>
          </div>
          
          {/* Search & Filter Card */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-4 mt-4 mb-6 max-w-md mx-auto flex flex-col gap-2">
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2 w-full">
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full px-3 py-2 text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm shadow-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 text-base"
              >
                {t('common.search')}
              </button>
              <div className="flex flex-col gap-2 mt-1">
                <select
                  value={diet}
                  onChange={handleDietChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  <option value="">{t('dinosaur.diet')}</option>
                  <option value="herbivore">{t('dinosaur.herbivore')}</option>
                  <option value="carnivore">{t('dinosaur.carnivore')}</option>
                  <option value="omnivore">{t('dinosaur.omnivore')}</option>
                  <option value="piscivore">{t('dinosaur.piscivore')}</option>
                </select>
                <select
                  value={locomotionType}
                  onChange={handleLocomotionChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  <option value="">{t('dinosaur.locomotion')}</option>
                  <option value="swimming">{t('dinosaur.swimming') || 'swimming'}</option>
                  <option value="quadruped">{t('dinosaur.quadruped') || 'quadruped'}</option>
                  <option value="gliding">{t('dinosaur.gliding') || 'gliding'}</option>
                  <option value="biped">{t('dinosaur.biped') || 'biped'}</option>
                </select>
                <select
                  value={localTemporalRange}
                  onChange={handleTemporalRangeChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                >
                  <option value="">{t('dinosaur.temporalRange')}</option>
                  <option value="Triassic">{t('filter.temporalRange.Triassic')}</option>
                  <option value="Jurassic">{t('filter.temporalRange.Jurassic')}</option>
                  <option value="Cretaceous">{t('filter.temporalRange.Cretaceous')}</option>
                </select>
              </div>
            </form>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSearchInput('');
                setDiet('');
                setLocomotionType('');
                setTemporalRange('');
                setLocalTemporalRange('');
                setPage(1);
              }}
              className="self-end mt-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-xs font-medium shadow"
              style={{ minWidth: 80 }}
            >
              {t('common.clearAll')}
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Page title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            {search ? `${t('search.results')} (${totalCount}${t('search.totalResults')})` : t('bestiary.title')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {search ? t('bestiary.searchKeyword') : t('home.description')}
          </p>
          {!search && totalCount > 0 && (
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-orange-600 font-medium">
              📊 {t('bestiary.databaseSummary', { count: totalCount, perPage: 12 })}
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-10 sm:py-14 md:py-16">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">❌</div>
            <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-1 sm:mb-2">
              {t('bestiary.errorOccurred')}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm"
            >
              {t('common.retry')}
            </button>
          </div>
        )}

        {/* Loading state */}
        {!error && isLoading && (
          <div className="text-center py-10 sm:py-14 md:py-16">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2 sm:mb-4"></div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
              {t('bestiary.loadingData')}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              {t('common.loading')}
            </p>
          </div>
        )}

        {/* Posts grid */}
        {!error && !isLoading && listToDisplay.length === 0 ? (
          <div className="text-center py-10 sm:py-14 md:py-16">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
              {search ? t('search.noResults') : t('bestiary.noDataFound')}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              {search ? t('search.noResultsDescription') : t('bestiary.tryAgain')}
            </p>
          </div>
        ) : !error && !isLoading && (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8 mb-6 sm:mb-10">
              {listToDisplay.map((dinosaur, index) => (
                <DinosaurPost
                  key={`${dinosaur.id || index}-${dinosaur.name}-${index}`}
                  dinosaur={dinosaur}
                  onClick={() => setSelectedDinosaur(dinosaur)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>

      <BlogFooter />

      {/* Dinosaur detail modal */}
      {selectedDinosaur && (
        <BlogPostModal
          character={{
            id: selectedDinosaur.id.toString(),
            name: selectedDinosaur.name,
            nameKorean: selectedDinosaur.classification?.genus || selectedDinosaur.name,
            nameItalian: selectedDinosaur.classification?.species || selectedDinosaur.name,
            description: selectedDinosaur.description,
            detailedDescription: [
              selectedDinosaur.existed && `🕰️ ${t('modal.existed')}: ${selectedDinosaur.existed}`,
              selectedDinosaur.length && `📏 ${t('modal.length')}: ${selectedDinosaur.length}`,
              selectedDinosaur.weight && `⚖️ ${t('modal.weight')}: ${selectedDinosaur.weight}`,
              selectedDinosaur.height && `📐 ${t('modal.height')}: ${selectedDinosaur.height}`,
              `🚶 ${t('modal.locomotionType')}: ${selectedDinosaur.locomotionType}`,
              selectedDinosaur.location && `🌍 ${t('modal.location')}: ${selectedDinosaur.location}`,
              selectedDinosaur.period && `🗓️ ${t('modal.period')}: ${selectedDinosaur.period}`,
              selectedDinosaur.source?.author && `👨‍🔬 ${t('modal.dataProvider')}: ${selectedDinosaur.source.author}`
            ].filter(Boolean).join('\n'),
            image: selectedDinosaur.image?.source || `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(selectedDinosaur.name)}`,
            emoji: selectedDinosaur.diet.toLowerCase().includes('carnivore') ? '🥩' :
              selectedDinosaur.diet.toLowerCase().includes('herbivore') ? '🌿' :
              selectedDinosaur.diet.toLowerCase().includes('piscivore') ? '🐟' : '🦴',
            origin: selectedDinosaur.source?.title || selectedDinosaur.image?.attribution || t('navigation.database'),
            catchphrase: `${selectedDinosaur.temporalRange} ${t('dinosaur.period')}${t('dinosaur.diet')}`,
            category: [selectedDinosaur.diet, selectedDinosaur.locomotionType].filter(Boolean),
            tags: [
              selectedDinosaur.diet,
              selectedDinosaur.locomotionType,
              selectedDinosaur.temporalRange,
              selectedDinosaur.location,
              selectedDinosaur.period
            ].filter((tag): tag is string => Boolean(tag)),
            personality: selectedDinosaur.classification ? [
              selectedDinosaur.classification.order !== 'Unknown' ? `${t('modal.order')}: ${selectedDinosaur.classification.order}` : null,
              selectedDinosaur.classification.family !== 'Unknown' ? `${t('modal.family')}: ${selectedDinosaur.classification.family}` : null
            ].filter((x): x is string => Boolean(x)) : [],
            abilities: []
          }}
          onClose={() => setSelectedDinosaur(null)}
        />
      )}
    </div>
  )
}