import { Character } from '@/data/characters'

interface BlogPostProps {
  character: Character
  onClick: () => void
}

export default function BlogPost({ character, onClick }: BlogPostProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden group cursor-pointer hover:border-orange-300 transition-colors duration-200">
      <div className="relative overflow-hidden">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-64 object-cover"
        />
        
        {/* Category badge */}
        {character.category && character.category[0] && (
          <div className="absolute top-3 left-3 bg-white text-orange-600 px-2 py-1 rounded-md text-xs font-medium">
            {character.category[0]}
          </div>
        )}
        
        {/* Character emoji */}
        <div className="absolute bottom-3 right-3 text-3xl">
          {character.emoji}
        </div>
      </div>
      
      <div className="p-5" onClick={onClick}>
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <span>2024년 12월</span>
          <span>{Math.floor(Math.random() * 1000) + 100} views</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
          {character.name}
        </h2>
        
        <p className="text-orange-600 font-medium mb-3">
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
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <span className="text-orange-600 text-sm font-medium">
            더 읽기 →
          </span>
        </div>
      </div>
    </article>
  )
} 