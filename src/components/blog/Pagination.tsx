import { useTranslation } from 'react-i18next'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t } = useTranslation()
  
  if (totalPages <= 1) return null;

  // 페이지 번호 생성 로직 (스마트 페이지네이션)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // 7페이지 이하인 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 7페이지 초과인 경우 스마트 페이지네이션
      pages.push(1); // 첫 페이지는 항상 표시
      
      if (currentPage <= 4) {
        // 현재 페이지가 앞쪽인 경우: 1 2 3 4 5 ... 마지막
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // 현재 페이지가 뒤쪽인 경우: 1 ... (마지막-4) (마지막-3) (마지막-2) (마지막-1) 마지막
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 현재 페이지가 중간인 경우: 1 ... (현재-1) 현재 (현재+1) ... 마지막
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination Navigation" className="mt-8">
      <div className="flex justify-center items-center gap-2 flex-wrap p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Previous button */}
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group px-4 py-2.5 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:text-white transition-all duration-300 disabled:cursor-not-allowed rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:shadow-lg disabled:hover:bg-transparent disabled:hover:text-gray-400 flex items-center gap-2"
          aria-label="Go to previous page"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>{t('common.previous')}</span>
        </button>
      
      {/* 페이지 번호들 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-400 select-none text-lg font-bold"
              aria-hidden="true"
            >
              …
            </span>
          );
        }
        
        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`relative w-10 h-10 text-sm font-bold rounded-xl transition-all duration-300 ${
              pageNum === currentPage
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-110 animate-pulse'
                : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700 hover:scale-105'
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
            {pageNum === currentPage && (
              <span className="absolute inset-0 rounded-xl bg-white opacity-20 animate-ping"></span>
            )}
          </button>
        );
      })}
      
        {/* Next button */}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group px-4 py-2.5 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:text-white transition-all duration-300 disabled:cursor-not-allowed rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:shadow-lg disabled:hover:bg-transparent disabled:hover:text-gray-400 flex items-center gap-2"
          aria-label="Go to next page"
        >
          <span>{t('common.next')}</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      
        {/* Page info */}
        <div className="ml-4 px-4 py-2 bg-gray-100 rounded-xl hidden sm:block">
          <span className="text-sm font-medium text-gray-600">
            Page <span className="text-orange-600 font-bold">{currentPage}</span> / {totalPages}
          </span>
        </div>
      </div>
    </nav>
  );
} 