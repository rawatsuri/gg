import React from 'react';
import { Player } from '../types/player';

interface CareerTimelineProps {
  players: [Player | null, Player | null];
}

export function CareerTimeline({ players }: CareerTimelineProps) {
  const [player1, player2] = players;
  if (!player1 || !player2) return null;

  // Since the API doesn't provide career highlights, we'll show birthdate as a milestone
  const milestones = [
    { year: player1.birthdate, player: player1.name, achievement: 'Born', description: `Born in ${player1.nationality}` },
    { year: player2.birthdate, player: player2.name, achievement: 'Born', description: `Born in ${player2.nationality}` },
  ].sort((a, b) => a.year.localeCompare(b.year));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Career Timeline</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative pl-8 pb-4 border-l-2 border-gray-200">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500" />
            <div className="text-sm text-gray-500">{milestone.year}</div>
            <div className="font-medium">{milestone.player}</div>
            <div>{milestone.achievement}</div>
            <div className="text-sm text-gray-600">{milestone.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}