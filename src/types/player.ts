import { SportType, SportMetric, CareerHighlight } from './sports';

export interface Player {
  id: string;
  name: string;
  sport: SportType;
  team: string;
  nationality: string;
  birthdate: string;
  position?: string;
  imageUrl?: string;
  height?: string;
  weight?: string;
  stats: Partial<SportMetric<SportType>>;
  careerHighlights: CareerHighlight[];
  seasonalStats: {
    season: string;
    stats: Partial<SportMetric<SportType>>;
  }[];
  awards: {
    year: string;
    title: string;
  }[];
}

export interface SearchResult {
  id: string;
  name: string;
  sport: SportType;
  team: string;
  imageUrl?: string;
  position?: string;
}