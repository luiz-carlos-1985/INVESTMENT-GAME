import { GameData } from './types'

export const saveGameData = (data: GameData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gameData', JSON.stringify(data))
  }
}

export const loadGameData = (): GameData | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('gameData')
    return saved ? JSON.parse(saved) : null
  }
  return null
}

export const getDefaultGameData = (): GameData => ({
  balance: 10000,
  portfolio: {},
  level: 1,
  xp: 0,
  streak: 0,
  achievements: [],
  totalTrades: 0,
  bestStreak: 0,
  totalProfit: 0,
  totalLoss: 0,
  winRate: 0,
  lastLogin: new Date().toISOString(),
  tradingHistory: []
})