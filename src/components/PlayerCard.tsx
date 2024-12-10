import React from 'react';
import { Player } from '../types/player';
import { Trophy } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex items-center space-x-4 mb-6">
        {player.imageUrl ? (
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{player.name}</h2>
          <p className="text-gray-600">{player.team}</p>
          <p className="text-sm text-gray-500">
            {player.nationality} • {player.position}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(player.stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}