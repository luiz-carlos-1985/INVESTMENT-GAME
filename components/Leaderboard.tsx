import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Crown } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  level: number
  isPremium: boolean
}

export const Leaderboard = () => {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'TraderPro', score: 25430, level: 12, isPremium: true },
    { rank: 2, name: 'InvestorX', score: 18920, level: 9, isPremium: true },
    { rank: 3, name: 'StockMaster', score: 15670, level: 8, isPremium: false },
    { rank: 4, name: 'BullRunner', score: 12340, level: 7, isPremium: true },
    { rank: 5, name: 'MarketKing', score: 9850, level: 6, isPremium: false },
  ]

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Award className="w-6 h-6 text-orange-400" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
        Leaderboard
      </h2>

      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-black/20 rounded-xl p-4 flex items-center justify-between ${
              entry.rank <= 3 ? 'border border-yellow-500/20' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              {getRankIcon(entry.rank)}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white">{entry.name}</h3>
                  {entry.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                </div>
                <p className="text-sm text-gray-400">Level {entry.level}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-emerald-400">${entry.score.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Total Value</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Your current rank: <span className="text-white font-semibold">#47</span>
        </p>
      </div>
    </motion.div>
  )
}