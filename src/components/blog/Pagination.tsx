interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
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
    <div className="flex justify-center items-center gap-1 flex-wrap">
      {/* 이전 버튼 */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-gray-600 disabled:text-gray-400 hover:text-orange-600 transition-colors duration-200 disabled:cursor-not-allowed rounded-lg hover:bg-orange-50"
      >
        ← 이전
      </button>
      
      {/* 페이지 번호들 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-500 select-none"
            >
              ...
            </span>
          );
        }
        
        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 text-sm rounded-lg transition-all duration-200 ${
              pageNum === currentPage
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      {/* 다음 버튼 */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-gray-600 disabled:text-gray-400 hover:text-orange-600 transition-colors duration-200 disabled:cursor-not-allowed rounded-lg hover:bg-orange-50"
      >
        다음 →
      </button>
      
      {/* 페이지 정보 */}
      <div className="ml-4 text-sm text-gray-500 hidden sm:block">
        {currentPage} / {totalPages} 페이지
      </div>
    </div>
  );
} 