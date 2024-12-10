import React from 'react';
import { Player } from '../types/player';
import { SportType, SportMetrics } from '../types/sports';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface StatComparisonProps {
  players: [Player | null, Player | null];
  sport: SportType;
}

const sportMetricLabels: Record<SportType, Record<string, string>> = {
  football: {
    goals: 'Goals',
    assists: 'Assists',
    appearances: 'Appearances',
    cleanSheets: 'Clean Sheets',
    passAccuracy: 'Pass Accuracy (%)',
    tacklesPerGame: 'Tackles per Game',
    minutesPlayed: 'Minutes Played',
    yellowCards: 'Yellow Cards',
    redCards: 'Red Cards',
    successfulDribbles: 'Successful Dribbles'
  },
  basketball: {
    points: 'Points',
    assists: 'Assists',
    rebounds: 'Rebounds',
    steals: 'Steals',
    blocks: 'Blocks',
    fieldGoalPercentage: 'Field Goal %',
    threePointPercentage: '3-Point %',
    freeThrowPercentage: 'Free Throw %',
    gamesPlayed: 'Games Played',
    minutesPerGame: 'Minutes per Game'
  },
  cricket: {
    matches: 'Matches',
    runs: 'Runs',
    battingAverage: 'Batting Average',
    strikeRate: 'Strike Rate',
    centuries: 'Centuries',
    halfCenturies: 'Half Centuries',
    wickets: 'Wickets',
    bowlingAverage: 'Bowling Average',
    economyRate: 'Economy Rate',
    highestScore: 'Highest Score'
  },
  baseball: {
    games: 'Games',
    battingAverage: 'Batting Average',
    homeRuns: 'Home Runs',
    rbis: 'RBIs',
    stolenBases: 'Stolen Bases',
    ops: 'OPS',
    era: 'ERA',
    strikeouts: 'Strikeouts',
    wins: 'Wins',
    saves: 'Saves'
  }
};

export function StatComparison({ players, sport }: StatComparisonProps) {
  const [player1, player2] = players;
  if (!player1 || !player2) return null;

  const stats = Object.entries(player1.stats)
    .filter(([key]) => key in sportMetricLabels[sport])
    .map(([key, value]) => ({
      name: sportMetricLabels[sport][key],
      [player1.name]: value,
      [player2.name]: player2.stats[key as keyof typeof player2.stats] || 0,
    }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Statistical Comparison</h3>
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-700">
          {sport.charAt(0).toUpperCase() + sport.slice(1)} Statistics
        </h4>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={player1.name} fill="#3b82f6" />
          <Bar dataKey={player2.name} fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}