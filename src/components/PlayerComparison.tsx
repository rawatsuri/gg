import React from 'react';
import { Player } from '../types/player';
import { SportMetrics } from '../types/sports';
import { StatComparison } from './StatComparison';
import { CareerTimeline } from './CareerTimeline';
import { AwardsList } from './AwardsList';
import { SeasonalStats } from './SeasonalStats';

interface PlayerComparisonProps {
  players: [Player | null, Player | null];
}

export function PlayerComparison({ players }: PlayerComparisonProps) {
  if (!players[0] || !players[1]) return null;
  if (players[0].sport !== players[1].sport) {
    return (
      <div className="w-full bg-yellow-50 p-4 rounded-lg text-yellow-800">
        Players from different sports cannot be directly compared.
      </div>
    );
  }

  const sport = players[0].sport;
  
  return (
    <div className="w-full space-y-8">
      <StatComparison 
        players={players} 
        sport={sport}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SeasonalStats 
          players={players}
          sport={sport}
        />
        
        <CareerTimeline 
          players={players}
        />
      </div>

      <AwardsList 
        players={players}
      />
    </div>
  );
}