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
      {/* Enhanced Hero section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-6 sm:py-10 md:py-14 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full animate-floating"></div>
          <div className="absolute top-20 right-10 w-60 h-60 bg-white rounded-full animate-floating animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-white rounded-full animate-floating animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="animate-bounce text-3xl sm:text-4xl md:text-5xl">🦖</span>
            <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent break-words max-w-full px-2">{t('home.heroTitle')}</span>
            <span className="animate-bounce delay-75 text-3xl sm:text-4xl md:text-5xl">🦕</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl opacity-95 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-medium">
            {t('home.description')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10 px-2 sm:px-0">
            <div className="bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔬</div>
              <div className="font-bold text-base sm:text-lg mb-1">{t('home.scientificAccuracy')}</div>
              <div className="opacity-90 text-xs sm:text-sm leading-relaxed">{t('home.scientificAccuracyDesc')}</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📚</div>
              <div className="font-bold text-base sm:text-lg mb-1">{t('home.richData')}</div>
              <div className="opacity-90 text-xs sm:text-sm leading-relaxed">{t('home.richDataDesc')}</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌍</div>
              <div className="font-bold text-base sm:text-lg mb-1">{t('home.globalDiscovery')}</div>
              <div className="opacity-90 text-xs sm:text-sm leading-relaxed">{t('home.globalDiscoveryDesc')}</div>
            </div>
          </div>
          
          {/* Search & Filter Card */}
          <div className="max-w-3xl mx-auto mt-4 sm:mt-6 mb-6 sm:mb-10 px-2 sm:px-4">
            <DinosaurSearch
              onSearch={async (query, filters) => {
                setSearch(query);
                setDiet(filters?.diet || '');
                setLocomotionType(filters?.locomotionType || '');
                setPage(1);
              }}
              onSearchStateChange={(searching) => {
                if (!searching) {
                  setSearch('');
                  setDiet('');
                  setLocomotionType('');
                  setPage(1);
                }
              }}
              isLoading={isLoading}
            />
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

        {/* Enhanced Loading state */}
        {!error && isLoading && (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8 mb-6 sm:mb-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden p-4 sm:p-6 animate-pulse">
                <div className="h-48 sm:h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
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
            scientificName: selectedDinosaur.name,
            temporalRange: selectedDinosaur.temporalRange,
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
            origin: selectedDinosaur.source?.title || selectedDinosaur.image?.attribution || '',
            catchphrase: '',
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