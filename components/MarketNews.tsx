import { motion } from 'framer-motion'
import { Newspaper, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MarketNewsProps {
  trend: 'bullish' | 'bearish' | 'neutral'
  news: string[]
}

export const MarketNews = ({ trend, news }: MarketNewsProps) => {
  const getTrendIcon = () => {
    switch(trend) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-emerald-400" />
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-400" />
      default: return <Minus className="w-5 h-5 text-yellow-400" />
    }
  }

  const getTrendColor = () => {
    switch(trend) {
      case 'bullish': return 'text-emerald-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Newspaper className="w-5 h-5 mr-2 text-blue-400" />
          Market News
        </h2>
        <div className={`flex items-center space-x-2 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="font-semibold capitalize">{trend}</span>
        </div>
      </div>

      <div className="space-y-3">
        {news.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 rounded-lg p-3 border-l-4 border-blue-400"
          >
            <p className="text-sm text-gray-300">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}