import { useState, useCallback } from 'react';
import { SearchResult } from '../types/player';
import { searchPlayers } from '../services/api';
import { useDebounce } from './useDebounce';

export function usePlayerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await searchPlayers(searchQuery);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to search players');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useDebounce(performSearch, 300);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    results,
    isLoading,
    error,
    handleSearch,
    clearSearch
  };
}