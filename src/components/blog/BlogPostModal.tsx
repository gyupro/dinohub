import { Character } from '@/data/characters'

interface BlogPostModalProps {
  character: Character | null
  onClose: () => void
}

export default function BlogPostModal({ character, onClose }: BlogPostModalProps) {
  if (!character) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50" onClick={onClose}>
      <div className="min-h-screen py-8 px-4">
        <div 
          className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              ✕
            </button>
            
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white text-orange-600 px-2 py-1 rounded text-sm font-medium">
                  {character.category?.[0]}
                </span>
                <span className="text-sm opacity-90">2024년 12월</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
              <p className="text-lg opacity-90">{character.nameKorean}</p>
            </div>
            
            <div className="absolute bottom-6 right-6 text-5xl">
              {character.emoji}
            </div>
          </div>
          
          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="p-8 space-y-6">
              {/* Meta info */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                  <span>{Math.floor(Math.random() * 50) + 10} comments</span>
                  <span>{Math.floor(Math.random() * 200) + 50} likes</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors duration-200 text-sm">
                    공유하기
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200 text-sm">
                    북마크
                  </button>
                </div>
              </div>
              
              {/* Main content */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    기본 정보
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">출처:</span>
                      <span className="ml-2 text-gray-600">{character.origin}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">이탈리아명:</span>
                      <span className="ml-2 text-gray-600">{character.nameItalian}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-medium text-gray-700">대표 대사:</span>
                    <blockquote className="ml-2 italic text-gray-600 border-l-4 border-orange-600 pl-4 mt-2">
                      "{character.catchphrase}"
                    </blockquote>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">소개</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {character.description}
                </p>
                
                {character.detailedDescription && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">상세 내용</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                      {character.detailedDescription}
                    </div>
                  </>
                )}
                
                {character.appearance && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">외형 특징</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {character.appearance}
                    </p>
                  </>
                )}
                
                {character.personality && character.personality.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">성격</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {character.personality.map((trait, i) => (
                        <div key={i} className="bg-orange-100 text-orange-700 px-3 py-2 rounded text-center font-medium text-sm">
                          {trait}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {character.memeQuotes && character.memeQuotes.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">유명한 대사들</h3>
                    <div className="space-y-3 mb-6">
                      {character.memeQuotes.map((quote, i) => (
                        <blockquote key={i} className="bg-orange-50 border-l-4 border-orange-600 p-4 italic text-gray-700">
                          "{quote}"
                        </blockquote>
                      ))}
                    </div>
                  </>
                )}
                
                {character.trivia && character.trivia.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">재미있는 사실들</h3>
                    <ul className="space-y-2 mb-6">
                      {character.trivia.map((fact, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="text-gray-700 leading-relaxed">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              {/* Tags */}
              {character.tags && character.tags.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">태그</h4>
                  <div className="flex flex-wrap gap-2">
                    {character.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
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
    </div>
  );
} 