'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, X, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { searchCharacters, getCharactersByCategory, Character } from '@/data/characters'

interface CharacterSearchProps {
  onResults: (characters: Character[]) => void
  onSearchStateChange: (isSearching: boolean) => void
}

const categories = [
  { id: 'all', icon: '📚', label: { ko: '전체', en: 'All', it: 'Tutti' } },
  { id: '시간', icon: '⏰', label: { ko: '시간', en: 'Time', it: 'Tempo' } },
  { id: '음악', icon: '🎵', label: { ko: '음악', en: 'Music', it: 'Musica' } },
  { id: '음식', icon: '🍕', label: { ko: '음식', en: 'Food', it: 'Cibo' } },
  { id: '게임', icon: '🎮', label: { ko: '게임', en: 'Game', it: 'Gioco' } },
  { id: '영화', icon: '🎬', label: { ko: '영화', en: 'Movie', it: 'Film' } },
  { id: '클래식', icon: '🏛️', label: { ko: '클래식', en: 'Classic', it: 'Classico' } },
  { id: '전통', icon: '🏺', label: { ko: '전통', en: 'Tradition', it: 'Tradizione' } },
  { id: '코미디', icon: '😂', label: { ko: '코미디', en: 'Comedy', it: 'Commedia' } },
  { id: '아트', icon: '🎨', label: { ko: '아트', en: 'Art', it: 'Arte' } }
]

export default function CharacterSearch({ onResults, onSearchStateChange }: CharacterSearchProps) {
  const { i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const currentLang = i18n.language as 'ko' | 'en' | 'it'

  // 검색 결과 계산
  const searchResults = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all') {
      return []
    }
    
    let results = query.trim() ? searchCharacters(query) : getCharactersByCategory('all')
    
    if (selectedCategory !== 'all') {
      results = results.filter(char => char.category.includes(selectedCategory))
    }
    
    return results
  }, [query, selectedCategory])

  // 검색 상태 변경시 부모에 알림
  useEffect(() => {
    onSearchStateChange(query.trim().length > 0 || selectedCategory !== 'all')
  }, [query, selectedCategory, onSearchStateChange])

  // 결과를 부모에 전달
  useEffect(() => {
    onResults(searchResults)
  }, [searchResults, onResults])

  // 검색 초기화
  const clearSearch = () => {
    setQuery('')
    setSelectedCategory('all')
  }

  return (
    <div className="space-y-6">
      {/* 검색 입력 */}
      <div className="glass-effect-strong rounded-2xl p-4 shadow-glass">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="text-dino-accent" size={18} />
          <h3 className="text-lg font-bold text-white">문서 검색</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dino-accent" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="문서 제목, 캐릭터 이름, 출처, 특징으로 검색..."
            className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-dino-light/70 border-none outline-none"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dino-light hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="glass-effect rounded-2xl p-4 shadow-glass">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="text-dino-accent" size={18} />
          <h3 className="text-lg font-bold text-white">카테고리별 문서</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-2 rounded-lg transition-all duration-200 text-center text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-dino-accent text-white'
                  : 'bg-white/10 text-dino-light hover:bg-white/20 hover:text-white'
              }`}
            >
              <div className="text-lg mb-1">{category.icon}</div>
              <div className="text-xs">{category.label[currentLang]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 검색 상태 */}
      {(query || selectedCategory !== 'all') && (
        <div className="flex items-center justify-between text-sm text-dino-light bg-white/5 rounded-lg p-3">
          <span>
            {query && `"${query}" 검색 중`}
            {query && selectedCategory !== 'all' && ' · '}
            {selectedCategory !== 'all' && `${categories.find(c => c.id === selectedCategory)?.label[currentLang]} 카테고리`}
          </span>
          <button
            onClick={clearSearch}
            className="text-dino-accent hover:text-white transition-colors font-medium"
          >
            검색 초기화
          </button>
        </div>
      )}
    </div>
  )
} 