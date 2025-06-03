import { Character } from '@/data/characters'
import { useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface BlogPostModalProps {
  character: Character | null
  onClose: () => void
}

export default function BlogPostModal({ character, onClose }: BlogPostModalProps) {
  const { t } = useTranslation();

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!character) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-1 py-4" onClick={onClose}>
      <div className="w-full max-w-sm sm:max-w-lg bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative">
          <Image 
            src={character.image} 
            alt={character.name} 
            className="w-full h-40 sm:h-80 object-cover"
            width={800}
            height={320}
            priority={true}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-xl"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white text-orange-600 px-2 py-1 rounded text-xs sm:text-sm font-medium">
                {character.category?.[0]}
              </span>
              <span className="text-xs sm:text-sm opacity-90">2024년 12월</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">{character.name}</h1>
            <p className="text-base sm:text-lg opacity-90">{character.nameKorean}</p>
          </div>
          <div className="absolute bottom-4 right-4 text-3xl sm:text-5xl">
            {character.emoji}
          </div>
        </div>
        {/* Content */}
        <div className="max-h-[60vh] md:max-h-[50vh] overflow-y-auto">
          <div className="p-3 sm:p-8 space-y-4 sm:space-y-6 text-sm sm:text-base">
            {/* Meta info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                <span>{Math.floor(Math.random() * 50) + 10} comments</span>
                <span>{Math.floor(Math.random() * 200) + 50} likes</span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 px-2 py-2 sm:px-3 bg-orange-600 text-white rounded hover:bg-orange-700 text-xs sm:text-sm">공유하기</button>
                <button className="flex-1 px-2 py-2 sm:px-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-xs sm:text-sm">북마크</button>
              </div>
            </div>
            {/* Main content */}
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <div className="bg-gray-50 p-3 sm:p-5 rounded-lg mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{t('modal.basicInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{t('modal.scientificName')}:</span>
                    <span className="ml-2 text-gray-600">{character.scientificName}</span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">
                  <span className="font-medium text-gray-700">{t('modal.temporalRange')}:</span>
                  <span className="ml-2 text-gray-600">{character.temporalRange || '-'}</span>
                </div>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.introduction')}</h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6">
                {character.description}
              </p>
              {character.detailedDescription && (
                <>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.details')}</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-4 sm:mb-6">
                    {character.detailedDescription}
                  </div>
                </>
              )}
              {character.appearance && (
                <>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.appearance')}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {character.appearance}
                  </p>
                </>
              )}
              {character.personality && character.personality.length > 0 && (
                <>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.personality')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {character.personality.map((trait, i) => (
                      <div key={i} className="bg-orange-100 text-orange-700 px-2 py-1 sm:px-3 sm:py-2 rounded text-center font-medium text-xs sm:text-sm">
                        {trait}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {character.memeQuotes && character.memeQuotes.length > 0 && (
                <>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.memeQuotes')}</h3>
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {character.memeQuotes.map((quote, i) => (
                      <blockquote key={i} className="bg-orange-50 border-l-4 border-orange-600 p-3 sm:p-4 italic text-gray-700 text-xs sm:text-base">
                        &quot;{quote}&quot;
                      </blockquote>
                    ))}
                  </div>
                </>
              )}
              {character.trivia && character.trivia.length > 0 && (
                <>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{t('modal.trivia')}</h3>
                  <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                    {character.trivia.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed text-xs sm:text-base">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {/* Tags */}
            {character.tags && character.tags.length > 0 && (
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2 sm:mb-3">{t('modal.tags')}</h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {character.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 