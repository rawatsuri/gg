import React from 'react';
import { SearchResult } from '../types/player';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (player: SearchResult) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  return (
    <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
      {results.map((player) => (
        <button
          key={player.id}
          onClick={() => onSelect(player)}
          className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-3"
        >
          {player.imageUrl && (
            <img
              src={player.imageUrl}
              alt={player.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-medium">{player.name}</div>
            <div className="text-sm text-gray-500">
              {player.sport} • {player.team}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}