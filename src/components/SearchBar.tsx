import React, { useCallback } from 'react';
import { SearchResult } from '../types/player';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { usePlayerSearch } from '../hooks/usePlayerSearch';

interface SearchBarProps {
  onPlayerSelect: (player: SearchResult) => void;
}

export function SearchBar({ onPlayerSelect }: SearchBarProps) {
  const {
    query,
    results,
    isLoading,
    error,
    handleSearch,
    clearSearch
  } = usePlayerSearch();

  const handlePlayerSelect = useCallback((player: SearchResult) => {
    onPlayerSelect(player);
    clearSearch();
  }, [onPlayerSelect, clearSearch]);

  return (
    <div className="relative w-full max-w-md">
      <SearchInput 
        value={query} 
        onChange={(e) => handleSearch(e.target.value)}
        error={error}
      />

      {isLoading && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg">
          <div className="p-4 text-center text-gray-500">Loading...</div>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <SearchResults results={results} onSelect={handlePlayerSelect} />
      )}
    </div>
  );
}