import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, Crown, Lock, Zap, Target, DollarSign } from 'lucide-react'
import { useAuth } from './auth'

interface PremiumStock {
  symbol: string
  name: string
  price: number
  change: number
  trend: 'up' | 'down'
  sector: string
  premium: boolean
}

export const PremiumStocks = () => {
  const { user } = useAuth()
  
  const premiumStocks: PremiumStock[] = [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 45.67, trend: 'up', sector: 'Tech', premium: true },
    { symbol: 'META', name: 'Meta Platforms', price: 487.33, change: 12.89, trend: 'up', sector: 'Tech', premium: true },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.87, change: -8.23, trend: 'down', sector: 'Media', premium: true },
    { symbol: 'CRM', name: 'Salesforce Inc.', price: 267.45, change: 15.34, trend: 'up', sector: 'SaaS', premium: true },
  ]

  const isPremium = user?.isPremium && (!user.trialEndsAt || user.trialEndsAt > new Date())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Crown className="w-6 h-6 mr-3 text-yellow-400" />
          Premium Stocks
        </h2>
        {isPremium && (
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
            <span className="text-yellow-400 text-sm font-semibold">PREMIUM</span>
          </div>
        )}
      </div>

      {!isPremium && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Premium Feature</h3>
            <p className="text-gray-300">Upgrade to access exclusive stocks</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {premiumStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-black/20 rounded-xl p-4 ${!isPremium ? 'blur-sm' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stock.trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  {stock.trend === 'up' ? 
                    <TrendingUp className="w-6 h-6 text-emerald-400" /> :
                    <TrendingUp className="w-6 h-6 text-red-400 rotate-180" />
                  }
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-lg">{stock.symbol}</h3>
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-gray-400 text-sm">{stock.name}</p>
                  <p className="text-xs text-gray-500">{stock.sector}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                <p className={`text-sm ${stock.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.trend === 'up' ? '+' : ''}{stock.change.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const AdvancedAnalytics = () => {
  const { user } = useAuth()
  const isPremium = user?.isPremium && (!user.trialEndsAt || user.trialEndsAt > new Date())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-cyan-400" />
          Market Analytics
        </h2>
        {isPremium && (
          <div className="bg-cyan-500/20 px-3 py-1 rounded-full">
            <span className="text-cyan-400 text-sm font-semibold">PREMIUM</span>
          </div>
        )}
      </div>

      {!isPremium && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Premium Analytics</h3>
            <p className="text-gray-300">Get advanced market insights</p>
          </div>
        </div>
      )}

      <div className={`space-y-6 ${!isPremium ? 'blur-sm' : ''}`}>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-gray-300">Market Trend</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">Bullish</p>
            <p className="text-xs text-gray-400">+12.5% this week</p>
          </div>
          
          <div className="bg-black/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Success Rate</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">87%</p>
            <p className="text-xs text-gray-400">Your trades</p>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-4">
          <h3 className="font-bold mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-orange-400" />
            AI Recommendations
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">AAPL - Strong Buy</span>
              <span className="text-emerald-400 text-sm">95% confidence</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">TSLA - Hold</span>
              <span className="text-yellow-400 text-sm">78% confidence</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">GOOGL - Buy</span>
              <span className="text-emerald-400 text-sm">89% confidence</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-4">
          <h3 className="font-bold mb-3 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-400" />
            Portfolio Performance
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Today's P&L</span>
              <span className="text-emerald-400">+$127.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">This Week</span>
              <span className="text-emerald-400">+$892.33</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Best Performer</span>
              <span className="text-white">AAPL (+15.2%)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const TrialBanner = () => {
  const { user } = useAuth()
  
  if (!user?.trialEndsAt || user.trialEndsAt <= new Date()) return null

  const daysLeft = Math.ceil((user.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="font-semibold text-white">Premium Trial Active</p>
            <p className="text-sm text-gray-300">{daysLeft} days remaining</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
        >
          Upgrade Now
        </motion.button>
      </div>
    </motion.div>
  )
}