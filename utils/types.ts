export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  trend: 'up' | 'down'
  sector: string
  volatility: number
  volume: number
  marketCap: number
  pe: number
  dividend: number
}

export interface GameData {
  balance: number
  portfolio: {[key: string]: {shares: number, avgPrice: number}}
  level: number
  xp: number
  streak: number
  achievements: string[]
  totalTrades: number
  bestStreak: number
  totalProfit: number
  totalLoss: number
  winRate: number
  lastLogin: string
  tradingHistory: TradeHistory[]
}

export interface TradeHistory {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  shares: number
  price: number
  timestamp: Date
  profit?: number
}

export interface ChartData {
  time: string
  price: number
  volume: number
}

export interface MarketData {
  trend: 'bullish' | 'bearish' | 'neutral'
  volatilityIndex: number
  marketCap: number
  volume: number
}