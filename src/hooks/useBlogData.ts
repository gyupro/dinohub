import { useState, useEffect } from 'react'
import { Character, getRandomCharacters } from '@/data/characters'

interface UseBlogDataReturn {
  allCharacters: Character[]
  featuredPosts: Character[]
  searchResults: Character[]
  isSearching: boolean
  currentPage: number
  totalPages: number
  setSearchResults: (results: Character[]) => void
  setIsSearching: (searching: boolean) => void
  setCurrentPage: (page: number) => void
  setFeaturedPosts: (posts: Character[]) => void
}

export function useBlogData(postsPerPage: number = 6): UseBlogDataReturn {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<Character[]>([])
  const [searchResults, setSearchResults] = useState<Character[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const characters = getRandomCharacters(20);
    setAllCharacters(characters);
    setFeaturedPosts(characters.slice(0, postsPerPage));
  }, [postsPerPage])

  const totalPages = Math.ceil(
    (isSearching ? searchResults.length : allCharacters.length) / postsPerPage
  );

  return {
    allCharacters,
    featuredPosts,
    searchResults,
    isSearching,
    currentPage,
    totalPages,
    setSearchResults,
    setIsSearching,
    setCurrentPage,
    setFeaturedPosts
  }
} 