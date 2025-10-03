export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (data: any) => boolean
  reward?: number
}

export const achievements: Achievement[] = [
  {
    id: 'first_trade',
    title: 'First Steps',
    description: 'Make your first trade',
    icon: '🎯',
    condition: (data) => data.totalTrades >= 1,
    reward: 50
  },
  {
    id: 'streak_5',
    title: 'Hot Streak',
    description: 'Make 5 trades in a row',
    icon: '🔥',
    condition: (data) => data.streak >= 5,
    reward: 100
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    condition: (data) => data.level >= 5,
    reward: 200
  },
  {
    id: 'profit_1000',
    title: 'Profit Master',
    description: 'Earn $1000 in total profit',
    icon: '💰',
    condition: (data) => data.totalProfit >= 1000,
    reward: 500
  },
  {
    id: 'portfolio_10k',
    title: 'Big Player',
    description: 'Reach $10,000 portfolio value',
    icon: '🏆',
    condition: (data) => data.balance + data.portfolioValue >= 10000,
    reward: 1000
  }
]

export const checkAchievements = (gameData: any, currentAchievements: string[]) => {
  const newAchievements: Achievement[] = []
  
  achievements.forEach(achievement => {
    if (!currentAchievements.includes(achievement.id) && achievement.condition(gameData)) {
      newAchievements.push(achievement)
    }
  })
  
  return newAchievements
}