import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PlayerCard } from './components/PlayerCard';
import { PlayerComparison } from './components/PlayerComparison';
import { Player, SearchResult } from './types/player';
import { getPlayerDetails } from './services/api';
import { Scale } from 'lucide-react';

function App() {
  const [players, setPlayers] = useState<[Player | null, Player | null]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlayerSelect = async (searchResult: SearchResult, index: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const playerDetails = await getPlayerDetails(searchResult.id);
      setPlayers(current => {
        const newPlayers = [...current] as [Player | null, Player | null];
        newPlayers[index] = playerDetails;
        return newPlayers;
      });
    } catch (err) {
      setError('Failed to load player details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">QuickCompare</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-md">
            <SearchBar
              onPlayerSelect={(player) => {
                const emptySlot = players.findIndex(p => p === null);
                handlePlayerSelect(player, emptySlot >= 0 ? emptySlot : 0);
              }}
            />
          </div>

          {error && (
            <div className="w-full max-w-md bg-red-50 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {players.map((player, index) => (
              <div key={index} className="flex flex-col items-center">
                {player ? (
                  <div className="relative w-full">
                    <button
                      onClick={() => {
                        setPlayers(current => {
                          const newPlayers = [...current] as [Player | null, Player | null];
                          newPlayers[index] = null;
                          return newPlayers;
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                    <PlayerCard player={player} />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Select a player to compare</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {players[0] && players[1] && (
            <PlayerComparison players={players} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;