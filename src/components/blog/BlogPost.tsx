import { Character } from '@/data/characters'
import Image from 'next/image'

interface BlogPostProps {
  character: Character
  onClick: () => void
}

export default function BlogPost({ character, onClick }: BlogPostProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image 
          src={character.image} 
          alt={character.name} 
          className="w-full h-64 object-cover"
          width={800}
          height={256}
          priority={true}
        />
        
        {/* Category badge */}
        {character.category && character.category[0] && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            {character.category[0]}
          </div>
        )}
        
        {/* Character emoji */}
        <div className="absolute bottom-3 right-3 text-4xl filter drop-shadow-lg">
          {character.emoji}
        </div>
      </div>
      
      <div className="p-5" onClick={onClick}>
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <span>2025년 1월</span>
          <span>{Math.floor(Math.random() * 1000) + 100} views</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-200">
          {character.name}
        </h2>
        
        <p className="text-orange-500 font-medium mb-3">
          {character.nameKorean}
        </p>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {character.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {character.tags?.slice(0, 2).map((tag, i) => (
              <span 
                key={`tag-${i}`} 
                className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <span className="text-orange-500 text-sm font-semibold group-hover:text-orange-600 transition-colors">
            더 읽기
          </span>
        </div>
      </div>
    </article>
  )
} 