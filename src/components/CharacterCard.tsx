'use client'

import { useState } from 'react'
import { ExternalLink, Eye, Quote, Info, Globe, Tag } from 'lucide-react'
import { Character } from '@/data/characters'

interface CharacterCardProps {
  character: Character
  onSelect?: (character: Character) => void
  isSelected?: boolean
  showDetailed?: boolean
}

export default function CharacterCard({ 
  character, 
  onSelect, 
  isSelected = false, 
  showDetailed = false 
}: CharacterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(character)
    } else {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <div 
      className={`group relative perspective-1000 cursor-pointer ${
        isSelected ? 'scale-105 z-10' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className={`relative preserve-3d transition-all duration-700 ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        
        {/* 카드 앞면 - 위키 스타일 */}
        <div className={`
          glass-effect-strong rounded-2xl p-5 shadow-glass hover:shadow-primary
          transition-all duration-300 group-hover:scale-105 backface-hidden
          border border-white/20 ${isSelected ? 'border-dino-accent shadow-primary' : ''}
        `}>
          
          {/* 캐릭터 정보 */}
          <div className="text-center mb-4">
            <div className="text-5xl mb-3">
              {character.emoji}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-futura">
                {character.name}
              </h3>
              <p className="text-dino-accent text-sm font-medium">
                {character.nameKorean}
              </p>
              <p className="text-dino-light text-xs italic">
                {character.nameItalian}
              </p>
            </div>
          </div>

          {/* 카테고리 태그 */}
          <div className="flex flex-wrap gap-1 mb-4 justify-center">
            {character.category.slice(0, 3).map((cat, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-dino-accent/20 text-dino-accent rounded-md text-xs font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* 출처 정보 */}
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Info size={14} className="text-dino-accent" />
              <span className="text-white text-sm font-medium">출처</span>
            </div>
            <p className="text-dino-light text-xs">
              {character.origin}
            </p>
          </div>

          {/* 대표 대사 */}
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Quote size={14} className="text-dino-accent" />
              <span className="text-white text-sm font-medium">대표 대사</span>
            </div>
            <p className="text-dino-light text-xs italic line-clamp-2">
              "{character.catchphrase}"
            </p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(true)
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-dino-accent text-white rounded-lg hover:bg-dino-primary transition-all duration-200 text-sm font-medium"
            >
              <Eye size={14} />
              상세보기
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                // 외부 링크나 공유 기능
                console.log('문서 링크:', character.name)
              }}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-white/10 text-dino-light hover:bg-white/20 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* 카드 뒷면 - 상세 정보 */}
        <div className={`
          absolute inset-0 glass-effect-strong rounded-2xl p-5 shadow-glass
          rotate-y-180 backface-hidden border border-dino-accent overflow-y-auto
        `}>
          
          {/* 뒤로가기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsFlipped(false)
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            ×
          </button>

          {/* 상세 정보 */}
          <div className="space-y-4 pt-2">
            {/* 제목 */}
            <div className="text-center pb-3 border-b border-white/10">
              <div className="text-3xl mb-2">{character.emoji}</div>
              <h3 className="text-lg font-bold text-white">{character.name}</h3>
              <p className="text-dino-accent text-sm">{character.nameKorean}</p>
            </div>

            {/* 설명 */}
            <div>
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Info size={16} className="text-dino-accent" />
                설명
              </h4>
              <p className="text-dino-light text-sm leading-relaxed">
                {character.description}
              </p>
            </div>

            {/* 특징 */}
            <div>
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Tag size={16} className="text-dino-accent" />
                특징
              </h4>
              <div className="flex flex-wrap gap-1">
                {(character.personality || []).map((trait, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-dino-light">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* 능력 */}
            <div>
              <h4 className="text-white font-medium mb-2">능력</h4>
              <div className="space-y-1">
                {character.abilities.slice(0, 3).map((ability, index) => (
                  <div key={index} className="text-dino-light text-sm">
                    • {ability}
                  </div>
                ))}
              </div>
            </div>

            {/* 밈 대사들 */}
            <div>
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Quote size={16} className="text-dino-accent" />
                주요 대사
              </h4>
              <div className="space-y-2">
                {(character.memeQuotes || []).slice(0, 3).map((quote, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded text-xs text-dino-light italic">
                    "{quote}"
                  </div>
                ))}
              </div>
            </div>

            {/* 다국어 정보 */}
            <div className="pt-3 border-t border-white/10">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Globe size={16} className="text-dino-accent" />
                다국어
              </h4>
              <div className="space-y-1 text-xs">
                <div><span className="text-dino-light">한국어:</span> <span className="text-white">{character.nameKorean}</span></div>
                <div><span className="text-dino-light">English:</span> <span className="text-white">{character.name}</span></div>
                <div><span className="text-dino-light">Italiano:</span> <span className="text-white">{character.nameItalian}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 