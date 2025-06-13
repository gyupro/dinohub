import { useState, useEffect, useCallback, useRef } from 'react'
import { Dinosaur } from '@/data/dinosaurs'

interface UseDinosaurDataReturn {
  dinosaurs: Dinosaur[];
  isLoading: boolean;
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
}

export function useDinosaurData(postsPerPage: number = 12): UseDinosaurDataReturn {
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [diet, setDiet] = useState('')
  const [locomotionType, setLocomotionType] = useState('')
  const [temporalRange, setTemporalRange] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  
  // Abort controller for cancelling previous requests
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Create new abort controller
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (diet) params.append('diet', diet)
      if (locomotionType) params.append('locomotionType', locomotionType)
      if (temporalRange) params.append('period', temporalRange)
      params.append('page', String(page))
      params.append('limit', String(postsPerPage))
      
      const response = await fetch(`/api/dinosaurs?${params.toString()}`, {
        signal: abortController.signal
      })
      
      if (!response.ok) throw new Error('API 요청 실패')
      const result = await response.json()
      
      if (!result.success || !result.data) throw new Error('API 응답 오류')
      
      setDinosaurs(result.data.data || [])
      setTotalPages(result.data.pagination?.totalPages || 1)
      setTotalCount(result.data.pagination?.total || 0)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request was cancelled, do nothing
        return
      }
      setError(err.message || '데이터를 불러오지 못했습니다.')
      setDinosaurs([])
    } finally {
      setIsLoading(false)
    }
  }, [search, diet, locomotionType, temporalRange, page, postsPerPage])
  
  useEffect(() => {
    fetchData()
    
    // Cleanup function to cancel request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return {
    dinosaurs,
    isLoading,
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
    setPage
  }
} 