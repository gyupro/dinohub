import { Dinosaur } from '@/data/dinosaurs'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { getLocomotionIcon } from '@/constants/locomotionTypes'

interface DinosaurPostProps {
  dinosaur: Dinosaur
  onClick: () => void
}

export default function DinosaurPost({ dinosaur, onClick }: DinosaurPostProps) {
  const { t } = useTranslation()
  
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
      className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] relative"
      onClick={onClick}
    >
      {/* Premium Badge */}
      {dinosaur.weight && parseInt(dinosaur.weight) > 10000 && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse" role="status" aria-label="Gigantic dinosaur">
          <span aria-hidden="true">⭐</span> GIGANTIC
        </div>
      )}
      <div className="relative overflow-hidden h-48 sm:h-64 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {dinosaur.image?.source ? (
          <Image 
            src={dinosaur.image.source} 
            alt={dinosaur.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-amber-200/20 to-yellow-200/20 backdrop-blur-sm"></div>
            <div className="text-center z-10">
              <div className="text-7xl mb-3 animate-bounce drop-shadow-lg">🦕</div>
              <div className="text-gray-700 font-bold text-lg bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">{dinosaur.name}</div>
            </div>
          </div>
        )}
        
        {/* Enhanced Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Enhanced Period indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
          <div className={`w-4 h-4 rounded-full ${periodInfo.color} shadow-lg ring-2 ring-white animate-pulse`}></div>
          <span className="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {periodInfo.name}
          </span>
        </div>
        
        {/* Enhanced Diet badge */}
        <div className={`absolute bottom-4 right-4 border-2 ${dietInfo.color} px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-lg">{dietInfo.emoji}</span>
          <span className="hidden sm:inline">{dinosaur.diet || t('dinosaur.unknown')}</span>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-1 leading-tight">
              {dinosaur.name}
            </h2>
            {dinosaur.classification?.genus && dinosaur.classification.genus !== dinosaur.name && (
              <p className="text-orange-500 font-semibold text-sm sm:text-base italic">
                {dinosaur.classification.genus}
              </p>
            )}
          </div>
          <div className="text-3xl bg-gradient-to-br from-orange-100 to-amber-100 p-2 rounded-xl shadow-inner group-hover:shadow-lg transition-all duration-300">
            {getTypeIcon(dinosaur.locomotionType)}
          </div>
        </div>
        
        {/* Enhanced Existed period */}
        {dinosaur.existed && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🕰️</span>
              <span className="font-semibold text-gray-700">{t('dinosaur.existedTime')}:</span>
              <span className="text-gray-900 font-medium">{dinosaur.existed}</span>
            </div>
          </div>
        )}
        
        {/* Enhanced Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {dinosaur.description}
        </p>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {dinosaur.length && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{t('dinosaur.length')}</div>
              <div className="text-base text-blue-900 font-extrabold mt-1">{dinosaur.length}</div>
            </div>
          )}
          {dinosaur.weight && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">{t('dinosaur.weight')}</div>
              <div className="text-base text-purple-900 font-extrabold mt-1">{dinosaur.weight}</div>
            </div>
          )}
          {dinosaur.height && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center border border-green-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-xs text-green-600 font-semibold uppercase tracking-wide">{t('dinosaur.height')}</div>
              <div className="text-base text-green-900 font-extrabold mt-1">{dinosaur.height}</div>
            </div>
          )}
          {dinosaur.location && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 text-center border border-orange-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-xs text-orange-600 font-semibold uppercase tracking-wide">{t('dinosaur.location')}</div>
              <div className="text-sm text-orange-900 font-extrabold mt-1 truncate">{dinosaur.location}</div>
            </div>
          )}
        </div>
        
        {/* Enhanced Footer */}
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