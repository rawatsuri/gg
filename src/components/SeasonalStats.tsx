import React from 'react';
import { Player } from '../types/player';
import { SportType } from '../types/sports';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SeasonalStatsProps {
  players: [Player | null, Player | null];
  sport: SportType;
}

export function SeasonalStats({ players, sport }: SeasonalStatsProps) {
  const [player1, player2] = players;
  if (!player1 || !player2) return null;

  // Get the primary stat based on sport
  const getPrimaryStat = (sport: SportType) => {
    switch (sport) {
      case 'football': return 'goals';
      case 'basketball': return 'points';
      case 'cricket': return 'runs';
      case 'baseball': return 'battingAverage';
      default: return 'appearances';
    }
  };

  const primaryStat = getPrimaryStat(sport);
  
  // If no seasonal stats are available, show current season stats
  const currentSeasonData = {
    season: 'Current',
    [player1.name]: player1.stats[primaryStat as keyof typeof player1.stats] || 0,
    [player2.name]: player2.stats[primaryStat as keyof typeof player2.stats] || 0,
  };

  const data = [currentSeasonData];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={player1.name} 
            stroke="#3b82f6" 
            strokeWidth={2} 
          />
          <Line 
            type="monotone" 
            dataKey={player2.name} 
            stroke="#ef4444" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}