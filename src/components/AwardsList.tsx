import React from 'react';
import { Player } from '../types/player';
import { Trophy } from 'lucide-react';

interface AwardsListProps {
  players: [Player | null, Player | null];
}

export function AwardsList({ players }: AwardsListProps) {
  const [player1, player2] = players;
  if (!player1 || !player2) return null;

  // Since the API doesn't provide awards data, we'll show basic player info
  const playerInfo = players.map(player => ({
    name: player?.name || '',
    details: [
      { year: player?.birthdate || '', title: `Born in ${player?.nationality}` },
      { year: 'Current', title: `Plays for ${player?.team}` },
    ]
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Player Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {playerInfo.map((info, index) => (
          <div key={index}>
            <h4 className="font-medium text-lg mb-3">{info.name}</h4>
            <div className="space-y-2">
              {info.details.map((detail, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{detail.year}</span>
                  <span className="text-gray-600">{detail.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}