import { Dinosaur } from '@/data/dinosaurs'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useState } from 'react'
import { getLocomotionIcon } from '@/constants/locomotionTypes'

interface DinosaurPostImprovedProps {
  dinosaur: Dinosaur
  onClick: () => void
}

export default function DinosaurPostImproved({ dinosaur, onClick }: DinosaurPostImprovedProps) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  
  const getDietInfo = (diet?: string) => {
    if (!diet) return { emoji: '🦴', color: 'bg-gray-50 text-gray-700 border-gray-200' };
    const lowerDiet = diet.toLowerCase();
    if (lowerDiet.includes('carnivore')) return { emoji: '🥩', color: 'bg-red-50 text-red-700 border-red-200' };
    if (lowerDiet.includes('herbivore')) return { emoji: '🌿', color: 'bg-green-50 text-green-700 border-green-200' };
    if (lowerDiet.includes('omnivore')) return { emoji: '🍽️', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    if (lowerDiet.includes('piscivore')) return { emoji: '🐟', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    return { emoji: '🦴', color: 'bg-gray-50 text-gray-700 border-gray-200' };
  }

  const getPeriodInfo = (period?: string) => {
    const lowerPeriod = period?.toLowerCase() || '';
    if (lowerPeriod.includes('triassic')) return { color: 'bg-red-500', name: t('dinosaur.triassic') };
    if (lowerPeriod.includes('jurassic')) return { color: 'bg-green-500', name: t('dinosaur.jurassic') };
    if (lowerPeriod.includes('cretaceous')) return { color: 'bg-blue-500', name: t('dinosaur.cretaceous') };
    if (lowerPeriod.includes('early')) return { color: 'bg-orange-500', name: 'Early Period' };
    if (lowerPeriod.includes('late')) return { color: 'bg-purple-500', name: 'Late Period' };
    return { color: 'bg-gray-500', name: period || t('dinosaur.unknown') };
  }

  const getTypeIcon = (type?: string) => {
    return getLocomotionIcon(type);
  }

  const dietInfo = getDietInfo(dinosaur.diet);
  const periodInfo = getPeriodInfo(dinosaur.temporalRange);

  return (
    <article 
      className="relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Overlay - No layout shift */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20px)' }}>
          <h3 className="text-white font-bold text-lg mb-2">Quick Info</h3>
          <div className="text-white/90 text-sm space-y-1">
            {dinosaur.existed && <p>🕰️ {t('dinosaur.existedTime')}: {dinosaur.existed}</p>}
            {dinosaur.length && <p>📏 {t('dinosaur.length')}: {dinosaur.length}</p>}
            {dinosaur.weight && <p>⚖️ {t('dinosaur.weight')}: {dinosaur.weight}</p>}
          </div>
          <button className="mt-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold border border-white/30">
            {t('common.viewDetails')}
          </button>
        </div>
      </div>

      {/* Premium Badge */}
      {dinosaur.weight && parseInt(dinosaur.weight) > 10000 && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          <span aria-hidden="true">⭐</span> GIGANTIC
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        {dinosaur.image?.source ? (
          <Image 
            src={dinosaur.image.source} 
            alt={dinosaur.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            width={400}
            height={256}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(dinosaur.name)}`;
            }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y1OWUwYiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4="
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-amber-200/20 to-yellow-200/20"></div>
            <div className="text-center z-10">
              <div className="text-7xl mb-3">🦕</div>
              <div className="text-gray-700 font-bold text-lg bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">{dinosaur.name}</div>
            </div>
          </div>
        )}
        
        {/* Period indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${periodInfo.color} shadow-lg ring-2 ring-white`}></div>
          <span className="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {periodInfo.name}
          </span>
        </div>
        
        {/* Diet badge */}
        <div className={`absolute bottom-4 right-4 border-2 ${dietInfo.color} px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg`}>
          <span className="text-lg">{dietInfo.emoji}</span>
          <span className="hidden sm:inline">{dinosaur.diet || t('dinosaur.unknown')}</span>
        </div>
      </div>
      
      {/* Content Section - Fixed Height */}
      <div className="p-4 sm:p-6 space-y-4 relative z-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className={`text-lg sm:text-2xl font-extrabold text-gray-900 transition-colors duration-200 mb-1 leading-tight ${isHovered ? 'text-orange-600' : ''}`}>
              {dinosaur.name}
            </h2>
            {dinosaur.classification?.genus && dinosaur.classification.genus !== dinosaur.name && (
              <p className="text-orange-500 font-semibold text-sm sm:text-base italic">
                {dinosaur.classification.genus}
              </p>
            )}
          </div>
          <div className="text-3xl bg-gradient-to-br from-orange-100 to-amber-100 p-2 rounded-xl shadow-inner">
            {getTypeIcon(dinosaur.locomotionType)}
          </div>
        </div>
        
        {/* Description - Fixed Height with Ellipsis */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {dinosaur.description}
        </p>
        
        {/* Stats Grid - Always Visible */}
        <div className="grid grid-cols-2 gap-3">
          {dinosaur.length && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{t('dinosaur.length')}</div>
              <div className="text-base text-blue-900 font-extrabold mt-1">{dinosaur.length}</div>
            </div>
          )}
          {dinosaur.weight && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
              <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">{t('dinosaur.weight')}</div>
              <div className="text-base text-purple-900 font-extrabold mt-1">{dinosaur.weight}</div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{t('dinosaur.locomotion')}:</span>
            <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
              {dinosaur.locomotionType || t('dinosaur.unknown')}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}