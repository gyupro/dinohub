import { Dinosaur } from '@/data/dinosaurs'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

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
    if (!type) return '🦕';
    const lowerType = type.toLowerCase();
    if (lowerType.includes('terrestrial')) return '🏃';
    if (lowerType.includes('aquatic') || lowerType.includes('semi-aquatic')) return '🏊';
    if (lowerType.includes('flying')) return '🦅';
    if (lowerType.includes('bipedal')) return '🚶';
    if (lowerType.includes('quadrupedal')) return '🦏';
    return '🦕';
  }

  const dietInfo = getDietInfo(dinosaur.diet);
  const periodInfo = getPeriodInfo(dinosaur.temporalRange);

  return (
    <article 
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-4"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-40 sm:h-56">
        {dinosaur.image?.source ? (
          <Image 
            src={dinosaur.image.source} 
            alt={dinosaur.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={224}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(dinosaur.name)}`;
            }}
            priority={true}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 animate-pulse">🦕</div>
              <div className="text-gray-600 font-medium text-sm">{dinosaur.name}</div>
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        
        {/* Period indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${periodInfo.color}`}></div>
          <span className="bg-white/90 backdrop-blur text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {periodInfo.name}
          </span>
        </div>
        
        {/* Diet badge */}
        <div className={`absolute top-3 right-3 border ${dietInfo.color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur`}>
          <span>{dietInfo.emoji}</span>
          <span className="hidden sm:inline">{dinosaur.diet || t('dinosaur.unknown')}</span>
        </div>
      </div>
      
      <div className="p-2 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-1">
              {dinosaur.name}
            </h2>
            {dinosaur.classification?.genus && dinosaur.classification.genus !== dinosaur.name && (
              <p className="text-orange-600 font-medium text-xs sm:text-sm">
                {dinosaur.classification.genus}
              </p>
            )}
          </div>
          <div className="text-2xl">
            {getTypeIcon(dinosaur.locomotionType)}
          </div>
        </div>
        
        {/* Existed period */}
        {dinosaur.existed && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🕰️</span>
              <span className="font-medium">{t('dinosaur.existedTime')}:</span>
              <span>{dinosaur.existed}</span>
            </div>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {dinosaur.description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {dinosaur.length && (
            <div className="bg-blue-50 rounded-lg p-1 sm:p-2 text-center">
              <div className="text-xs text-blue-600 font-medium">{t('dinosaur.length')}</div>
              <div className="text-sm text-blue-800 font-bold">{dinosaur.length}</div>
            </div>
          )}
          {dinosaur.weight && (
            <div className="bg-purple-50 rounded-lg p-1 sm:p-2 text-center">
              <div className="text-xs text-purple-600 font-medium">{t('dinosaur.weight')}</div>
              <div className="text-sm text-purple-800 font-bold">{dinosaur.weight}</div>
            </div>
          )}
          {dinosaur.height && (
            <div className="bg-green-50 rounded-lg p-1 sm:p-2 text-center">
              <div className="text-xs text-green-600 font-medium">{t('dinosaur.height')}</div>
              <div className="text-sm text-green-800 font-bold">{dinosaur.height}</div>
            </div>
          )}
          {dinosaur.location && (
            <div className="bg-orange-50 rounded-lg p-1 sm:p-2 text-center">
              <div className="text-xs text-orange-600 font-medium">{t('dinosaur.location')}</div>
              <div className="text-sm text-orange-800 font-bold text-xs">{dinosaur.location}</div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{t('dinosaur.locomotion')}:</span>
            <span className="font-medium">{dinosaur.locomotionType || t('dinosaur.unknown')}</span>
          </div>
          
          <div className="flex items-center gap-1 text-orange-600 text-sm font-medium group-hover:gap-2 transition-all duration-200">
            <span>{t('common.viewMore')}</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>
      </div>
    </article>
  )
} 