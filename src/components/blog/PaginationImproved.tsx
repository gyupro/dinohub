import { useTranslation } from 'react-i18next'
import { useEffect, useState, useCallback } from 'react'

interface PaginationImprovedProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrefetch?: (page: number) => void
  isPaginating?: boolean
}

export default function PaginationImproved({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onPrefetch,
  isPaginating = false
}: PaginationImprovedProps) {
  const { t } = useTranslation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Smooth page transition
  const handlePageChange = useCallback((page: number) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Smooth scroll to top of content
    const contentElement = document.querySelector('main');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Slight delay for visual feedback
    setTimeout(() => {
      onPageChange(page);
      setIsTransitioning(false);
    }, 100);
  }, [currentPage, isTransitioning, onPageChange]);

  // Prefetch on hover
  const handleHover = useCallback((page: number) => {
    if (onPrefetch && page !== currentPage) {
      onPrefetch(page);
    }
  }, [onPrefetch, currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages, handlePageChange]);

  // Page numbers generation logic
  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const pageNumbers = getPageNumbers();
  
  // Early return after all hooks
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination Navigation" className="mt-8 relative">
      {/* Loading overlay */}
      {(isPaginating || isTransitioning) && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-orange-600 font-medium">Loading...</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-center items-center gap-2 flex-wrap p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Previous button */}
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          onMouseEnter={() => handleHover(currentPage - 1)}
          disabled={currentPage === 1 || isTransitioning}
          className="group px-4 py-2.5 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:text-white transition-all duration-300 disabled:cursor-not-allowed rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:shadow-lg disabled:hover:bg-transparent disabled:hover:text-gray-400 flex items-center gap-2"
          aria-label="Go to previous page"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span className="hidden sm:inline">{t('common.previous')}</span>
        </button>
        
        {/* Quick jump to first page */}
        {currentPage > 5 && (
          <button
            onClick={() => handlePageChange(1)}
            onMouseEnter={() => handleHover(1)}
            disabled={isTransitioning}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            title="Go to first page"
          >
            ⏮️
          </button>
        )}
      
        {/* Page numbers */}
        <div className="flex items-center gap-1">
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
                onClick={() => handlePageChange(pageNum)}
                onMouseEnter={() => handleHover(pageNum)}
                disabled={isTransitioning}
                className={`relative w-10 h-10 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pageNum === currentPage
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-110'
                    : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
                {pageNum === currentPage && !isTransitioning && (
                  <span className="absolute inset-0 rounded-xl bg-white opacity-20 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Quick jump to last page */}
        {currentPage < totalPages - 4 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            onMouseEnter={() => handleHover(totalPages)}
            disabled={isTransitioning}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            title="Go to last page"
          >
            ⏭️
          </button>
        )}
      
        {/* Next button */}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          onMouseEnter={() => handleHover(currentPage + 1)}
          disabled={currentPage === totalPages || isTransitioning}
          className="group px-4 py-2.5 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:text-white transition-all duration-300 disabled:cursor-not-allowed rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:shadow-lg disabled:hover:bg-transparent disabled:hover:text-gray-400 flex items-center gap-2"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">{t('common.next')}</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      
        {/* Page info with progress bar */}
        <div className="ml-4 hidden sm:block">
          <div className="px-4 py-2 bg-gray-100 rounded-xl">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Page <span className="text-orange-600 font-bold">{currentPage}</span> / {totalPages}
            </div>
            <div className="w-24 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Keyboard hint */}
        <div className="hidden lg:block ml-2 text-xs text-gray-500">
          <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">←</kbd>
          <kbd className="px-2 py-1 bg-gray-200 rounded text-xs ml-1">→</kbd>
        </div>
      </div>
    </nav>
  );
}