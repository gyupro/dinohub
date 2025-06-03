import { Dinosaur } from '@/data/dinosaurs'

interface CategoriesProps {
  dinosaurs: Dinosaur[]
  onSelectCategory?: (category: string) => void
}

export default function Categories({ dinosaurs, onSelectCategory }: CategoriesProps) {
  // Collect categories from diet, period, locomotionType
  const allCategories = [
    ...dinosaurs.map(d => d.diet),
    ...dinosaurs.map(d => d.period || ''),
    ...dinosaurs.map(d => d.locomotionType)
  ].filter(Boolean);
  const categoryCounts = allCategories.reduce((acc, cat) => {
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedCategories = Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
        분류 체계
      </h3>
      <div className="space-y-2">
        {sortedCategories.map(([category, count]) => (
          <button 
            key={category}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors duration-200 text-left"
            onClick={() => onSelectCategory?.(category)}
          >
            <span className="text-gray-700 text-xs sm:text-sm truncate">{category}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 