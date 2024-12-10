import axios from 'axios';
import { Player, SearchResult } from '../types/player';
import { SportType, SportMetrics } from '../types/sports';

const API_KEY = '3';
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const searchPlayers = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];
  
  const response = await axios.get(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(query)}`);
  
  return response.data.player?.map((player: any) => ({
    id: player.idPlayer,
    name: player.strPlayer,
    sport: mapSportType(player.strSport?.toLowerCase()),
    team: player.strTeam || 'Unknown Team',
    imageUrl: player.strThumb,
    position: player.strPosition
  })) || [];
};

const mapSportType = (sport: string | undefined): SportType => {
  switch (sport) {
    case 'soccer':
      return 'football';
    case 'basketball':
      return 'basketball';
    case 'cricket':
      return 'cricket';
    case 'baseball':
      return 'baseball';
    default:
      return 'football';
  }
};

const mapSportStats = (playerData: any, sport: SportType): Partial<SportMetrics[typeof sport]> => {
  switch (sport) {
    case 'football':
      return {
        goals: parseInt(playerData.strGoals || '0'),
        assists: parseInt(playerData.strAssists || '0'),
        appearances: parseInt(playerData.strAppearances || '0'),
        yellowCards: parseInt(playerData.strYellowCards || '0'),
        redCards: parseInt(playerData.strRedCards || '0'),
        minutesPlayed: parseInt(playerData.strMinutesPlayed || '0'),
        passAccuracy: parseFloat(playerData.strPassAccuracy || '0'),
        tacklesPerGame: parseFloat(playerData.strTacklesPerGame || '0'),
        successfulDribbles: parseInt(playerData.strDribbles || '0'),
        cleanSheets: parseInt(playerData.strCleanSheets || '0')
      };
    case 'basketball':
      return {
        points: parseFloat(playerData.strPoints || '0'),
        assists: parseFloat(playerData.strAssists || '0'),
        rebounds: parseFloat(playerData.strRebounds || '0'),
        steals: parseFloat(playerData.strSteals || '0'),
        blocks: parseFloat(playerData.strBlocks || '0'),
        fieldGoalPercentage: parseFloat(playerData.strFieldGoalPercentage || '0'),
        threePointPercentage: parseFloat(playerData.strThreePointPercentage || '0'),
        freeThrowPercentage: parseFloat(playerData.strFreeThrowPercentage || '0'),
        gamesPlayed: parseInt(playerData.strGamesPlayed || '0'),
        minutesPerGame: parseFloat(playerData.strMinutesPerGame || '0')
      };
    case 'cricket':
      return {
        matches: parseInt(playerData.strMatches || '0'),
        runs: parseInt(playerData.strRuns || '0'),
        battingAverage: parseFloat(playerData.strBattingAverage || '0'),
        strikeRate: parseFloat(playerData.strStrikeRate || '0'),
        centuries: parseInt(playerData.strCenturies || '0'),
        halfCenturies: parseInt(playerData.strHalfCenturies || '0'),
        wickets: parseInt(playerData.strWickets || '0'),
        bowlingAverage: parseFloat(playerData.strBowlingAverage || '0'),
        economyRate: parseFloat(playerData.strEconomyRate || '0'),
        highestScore: parseInt(playerData.strHighestScore || '0')
      };
    case 'baseball':
      return {
        games: parseInt(playerData.strGames || '0'),
        battingAverage: parseFloat(playerData.strBattingAverage || '0'),
        homeRuns: parseInt(playerData.strHomeRuns || '0'),
        rbis: parseInt(playerData.strRBIs || '0'),
        stolenBases: parseInt(playerData.strStolenBases || '0'),
        ops: parseFloat(playerData.strOPS || '0'),
        era: parseFloat(playerData.strERA || '0'),
        strikeouts: parseInt(playerData.strStrikeouts || '0'),
        wins: parseInt(playerData.strWins || '0'),
        saves: parseInt(playerData.strSaves || '0')
      };
  }
};

export const getPlayerDetails = async (playerId: string): Promise<Player> => {
  const response = await axios.get(`${BASE_URL}/lookupplayer.php?id=${playerId}`);
  const playerData = response.data.players?.[0];
  
  if (!playerData) throw new Error('Player not found');
  
  const sport = mapSportType(playerData.strSport?.toLowerCase());
  
  return {
    id: playerData.idPlayer,
    name: playerData.strPlayer,
    sport,
    team: playerData.strTeam || 'Unknown Team',
    nationality: playerData.strNationality || 'Unknown',
    birthdate: playerData.dateBorn || 'Unknown',
    position: playerData.strPosition,
    imageUrl: playerData.strThumb,
    height: playerData.strHeight || 'Unknown',
    weight: playerData.strWeight || 'Unknown',
    stats: mapSportStats(playerData, sport),
    careerHighlights: parseCareerHighlights(playerData),
    seasonalStats: parseSeasonalStats(playerData, sport),
    awards: parseAwards(playerData)
  };
};

const parseCareerHighlights = (playerData: any): Player['careerHighlights'] => {
  const highlights: Player['careerHighlights'] = [];
  
  if (playerData.strDescriptionEN) {
    const description = playerData.strDescriptionEN;
    const yearRegex = /\b(19|20)\d{2}\b/g;
    const years = description.match(yearRegex);
    
    if (years) {
      years.forEach(year => {
        const sentence = description
          .split('.')
          .find(s => s.includes(year));
          
        if (sentence) {
          highlights.push({
            year,
            achievement: 'Career Milestone',
            description: sentence.trim()
          });
        }
      });
    }
  }
  
  return highlights;
};

const parseSeasonalStats = (playerData: any, sport: SportType): Player['seasonalStats'] => {
  // This would need to be implemented based on available API data
  // For now, returning an empty array as the free API doesn't provide seasonal data
  return [];
};

const parseAwards = (playerData: any): Player['awards'] => {
  const awards: Player['awards'] = [];
  
  // Extract awards from description if available
  if (playerData.strDescriptionEN) {
    const description = playerData.strDescriptionEN;
    const awardKeywords = ['won', 'awarded', 'received', 'named'];
    
    description.split('.').forEach(sentence => {
      const yearMatch = sentence.match(/\b(19|20)\d{2}\b/);
      const hasAwardKeyword = awardKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      );
      
      if (yearMatch && hasAwardKeyword) {
        awards.push({
          year: yearMatch[0],
          title: sentence.trim()
        });
      }
    });
  }
  
  return awards;
};