import { Character } from '@/data/characters'

interface TagCloudProps {
  characters: Character[]
}

export default function TagCloud({ characters }: TagCloudProps) {
  const allTags = characters.flatMap(char => char.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const sortedTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        인기 태그
      </h3>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <button 
            key={tag}
            className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 px-2 py-1 rounded text-xs transition-colors duration-200"
          >
            #{tag} ({count})
          </button>
        ))}
      </div>
    </div>
  );
} 