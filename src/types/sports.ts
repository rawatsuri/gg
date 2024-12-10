export type SportType = 'football' | 'basketball' | 'cricket' | 'baseball';

export interface SportMetrics {
  football: {
    goals: number;
    assists: number;
    appearances: number;
    cleanSheets?: number;
    passAccuracy: number;
    tacklesPerGame: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
    successfulDribbles: number;
  };
  basketball: {
    points: number;
    assists: number;
    rebounds: number;
    steals: number;
    blocks: number;
    fieldGoalPercentage: number;
    threePointPercentage: number;
    freeThrowPercentage: number;
    gamesPlayed: number;
    minutesPerGame: number;
  };
  cricket: {
    matches: number;
    runs: number;
    battingAverage: number;
    strikeRate: number;
    centuries: number;
    halfCenturies: number;
    wickets: number;
    bowlingAverage: number;
    economyRate: number;
    highestScore: number;
  };
  baseball: {
    games: number;
    battingAverage: number;
    homeRuns: number;
    rbis: number;
    stolenBases: number;
    ops: number;
    era?: number;
    strikeouts?: number;
    wins?: number;
    saves?: number;
  };
}

export type SportMetric<T extends SportType> = SportMetrics[T];

export interface CareerHighlight {
  year: string;
  achievement: string;
  description: string;
}