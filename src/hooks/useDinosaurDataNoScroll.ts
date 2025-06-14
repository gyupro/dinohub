import { useState, useEffect, useCallback, useRef } from 'react'
import { Dinosaur } from '@/data/dinosaurs'

interface UseDinosaurDataReturn {
  dinosaurs: Dinosaur[];
  isLoading: boolean;
  isPaginating: boolean;
  error: string | null;
  search: string;
  diet: string;
  locomotionType: string;
  temporalRange: string;
  page: number;
  totalPages: number;
  totalCount: number;
  setSearch: (s: string) => void;
  setDiet: (d: string) => void;
  setLocomotionType: (l: string) => void;
  setTemporalRange: (t: string) => void;
  setPage: (p: number) => void;
  prefetchPage: (p: number) => void;
}

// Cache for storing prefetched data
const pageCache = new Map<string, { data: Dinosaur[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useDinosaurDataNoScroll(postsPerPage: number = 12): UseDinosaurDataReturn {
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPaginating, setIsPaginating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [diet, setDiet] = useState('')
  const [locomotionType, setLocomotionType] = useState('')
  const [temporalRange, setTemporalRange] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  
  // Track previous filter values to detect actual changes
  const prevFiltersRef = useRef({ search, diet, locomotionType, temporalRange });
  const isInitialMount = useRef(true);
  
  // Abort controller for cancelling previous requests
  const abortControllerRef = useRef<AbortController | null>(null)
  
  // Generate cache key
  const getCacheKey = useCallback((pageNum: number) => {
    return `${search}-${diet}-${locomotionType}-${temporalRange}-${pageNum}-${postsPerPage}`;
  }, [search, diet, locomotionType, temporalRange, postsPerPage]);

  // Clear old cache entries
  const clearOldCache = useCallback(() => {
    const now = Date.now();
    pageCache.forEach((value, key) => {
      if (now - value.timestamp > CACHE_DURATION) {
        pageCache.delete(key);
      }
    });
  }, []);

  const fetchData = useCallback(async (pageNum: number, isPrefetch: boolean = false) => {
    const cacheKey = getCacheKey(pageNum);
    
    // Check cache first
    const cached = pageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      if (!isPrefetch) {
        setDinosaurs(cached.data);
        setIsPaginating(false);
      }
      return cached.data;
    }
    
    // Cancel previous request if it exists
    if (!isPrefetch && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    const abortController = new AbortController();
    if (!isPrefetch) {
      abortControllerRef.current = abortController;
    }
    
    if (!isPrefetch) {
      if (dinosaurs.length > 0) {
        setIsPaginating(true); // Use pagination loading state if we already have data
      } else {
        setIsLoading(true); // Use full loading state for initial load
      }
      setError(null);
    }
    
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (diet) params.append('diet', diet);
      if (locomotionType) params.append('locomotionType', locomotionType);
      if (temporalRange) params.append('period', temporalRange);
      params.append('page', String(pageNum));
      params.append('limit', String(postsPerPage));
      
      const response = await fetch(`/api/dinosaurs?${params.toString()}`, {
        signal: abortController.signal
      });
      
      if (!response.ok) throw new Error('API 요청 실패');
      const result = await response.json();
      
      if (!result.success || !result.data) throw new Error('API 응답 오류');
      
      const fetchedData = result.data.data || [];
      
      // Update cache
      pageCache.set(cacheKey, { data: fetchedData, timestamp: Date.now() });
      clearOldCache();
      
      if (!isPrefetch) {
        setDinosaurs(fetchedData);
        setTotalPages(result.data.pagination?.totalPages || 1);
        setTotalCount(result.data.pagination?.total || 0);
      }
      
      return fetchedData;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return [];
      }
      if (!isPrefetch) {
        setError(err.message || '데이터를 불러오지 못했습니다.');
        setDinosaurs([]);
      }
      return [];
    } finally {
      if (!isPrefetch) {
        setIsLoading(false);
        setIsPaginating(false);
      }
    }
  }, [search, diet, locomotionType, temporalRange, postsPerPage, getCacheKey, clearOldCache, dinosaurs.length]);

  // Prefetch adjacent pages
  const prefetchPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      fetchData(pageNum, true);
    }
  }, [fetchData, totalPages]);

  // Effect to fetch data when page changes
  useEffect(() => {
    fetchData(page);
    
    // Prefetch adjacent pages
    if (page > 1) prefetchPage(page - 1);
    if (page < totalPages) prefetchPage(page + 1);
    
    // Cleanup function to cancel request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, fetchData, prefetchPage, totalPages]);

  // Effect to handle filter changes - only reset page if filters actually changed
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const prevFilters = prevFiltersRef.current;
    const filtersChanged = 
      prevFilters.search !== search ||
      prevFilters.diet !== diet ||
      prevFilters.locomotionType !== locomotionType ||
      prevFilters.temporalRange !== temporalRange;
    
    if (filtersChanged) {
      console.log('Filters changed, resetting to page 1');
      setPage(1);
      // Clear cache when filters change
      pageCache.clear();
      // Update ref
      prevFiltersRef.current = { search, diet, locomotionType, temporalRange };
    }
  }, [search, diet, locomotionType, temporalRange]);

  // Custom setPage that DOES NOT change scroll position
  const setPageNoScroll = useCallback((newPage: number) => {
    if (newPage === page) return; // Don't update if same page
    
    // Store current scroll position
    const currentScrollY = window.scrollY;
    
    setPage(newPage);
    
    // Ensure scroll position stays the same after React re-render
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollY);
    });
  }, [page]);

  return {
    dinosaurs,
    isLoading,
    isPaginating,
    error,
    search,
    diet,
    locomotionType,
    temporalRange,
    page,
    totalPages,
    totalCount,
    setSearch,
    setDiet,
    setLocomotionType,
    setTemporalRange,
    setPage: setPageNoScroll,
    prefetchPage
  }
}