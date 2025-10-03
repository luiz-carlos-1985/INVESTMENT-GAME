import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Globe } from 'lucide-react'
import { MarketData, Stock } from '../utils/types'

interface MarketOverviewProps {
  marketData: MarketData
  stocks: Stock[]
  chartData: any[]
}

export const MarketOverview = ({ marketData, stocks, chartData }: MarketOverviewProps) => {
  const topGainers = stocks
    .filter(s => s.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3)

  const topLosers = stocks
    .filter(s => s.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3)

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'bullish': return 'text-emerald-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'bullish': return <TrendingUp className="w-5 h-5" />
      case 'bearish': return <TrendingDown className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Globe className="w-6 h-6 mr-3 text-blue-400" />
          Market Overview
        </h2>
        <div className={`flex items-center space-x-2 ${getTrendColor(marketData.trend)}`}>
          {getTrendIcon(marketData.trend)}
          <span className="font-semibold capitalize">{marketData.trend} Market</span>
        </div>
      </div>

      {/* Market Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-purple-400">{marketData.volatilityIndex}%</p>
          <p className="text-xs text-gray-400">Volatility Index</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-emerald-400">${(marketData.marketCap / 1e12).toFixed(1)}T</p>
          <p className="text-xs text-gray-400">Market Cap</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <Activity className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-cyan-400">{(marketData.volume / 1e6).toFixed(0)}M</p>
          <p className="text-xs text-gray-400">Volume</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <Globe className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-yellow-400">{stocks.length}</p>
          <p className="text-xs text-gray-400">Active Stocks</p>
        </div>
      </div>

      {/* Market Chart */}
      {chartData.length > 0 && (
        <div className="bg-black/20 rounded-xl p-3 md:p-4 mb-4 md:mb-6 overflow-hidden">
          <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base truncate">Market Index</h3>
          <div className="h-24 md:h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#marketGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Gainers */}
        <div className="bg-black/20 rounded-xl p-3 md:p-4 overflow-hidden">
          <h3 className="font-bold mb-3 md:mb-4 flex items-center text-sm md:text-base">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-400 flex-shrink-0" />
            <span className="truncate">Top Gainers</span>
          </h3>
          <div className="space-y-3">
            {topGainers.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-sm md:text-base">{stock.symbol}</p>
                  <p className="text-xs text-gray-400">${stock.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold text-sm md:text-base">+{stock.changePercent.toFixed(2)}%</p>
                  <p className="text-xs text-emerald-400">+${stock.change.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-black/20 rounded-xl p-3 md:p-4 overflow-hidden">
          <h3 className="font-bold mb-3 md:mb-4 flex items-center text-sm md:text-base">
            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-400 flex-shrink-0" />
            <span className="truncate">Top Losers</span>
          </h3>
          <div className="space-y-3">
            {topLosers.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-sm md:text-base">{stock.symbol}</p>
                  <p className="text-xs text-gray-400">${stock.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-semibold text-sm md:text-base">{stock.changePercent.toFixed(2)}%</p>
                  <p className="text-xs text-red-400">${stock.change.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}