import { Dinosaur } from '@/data/dinosaurs'

interface PopularPostsProps {
  dinosaurs: Dinosaur[]
  onSelect: (dinosaur: Dinosaur) => void
}

export default function PopularPosts({ dinosaurs, onSelect }: PopularPostsProps) {
  const popularPosts = dinosaurs.slice(0, 5);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
        인기 공룡
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {popularPosts.map((dino, index) => (
          <div 
            key={dino.id}
            className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            onClick={() => onSelect(dino)}
          >
            {dino.image?.source ? (
              <img src={dino.image.source} alt={dino.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-2xl">🦕</div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate mb-0.5">{dino.name}</h4>
              <p className="text-xs text-gray-500 truncate">{dino.description?.slice(0, 30) || ''}</p>
            </div>
            <span className="text-xs text-orange-500 font-semibold">{200 + index * 37} views</span>
          </div>
        ))}
      </div>
    </div>
  );
} 