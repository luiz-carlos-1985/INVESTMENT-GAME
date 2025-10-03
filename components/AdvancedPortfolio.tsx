import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, Activity } from 'lucide-react'
import { Stock } from '../utils/types'

interface AdvancedPortfolioProps {
  portfolio: {[key: string]: {shares: number, avgPrice: number}}
  stocks: Stock[]
  totalValue: number
  totalProfit: number
  winRate: number
}

export const AdvancedPortfolio = ({ portfolio, stocks, totalValue, totalProfit, winRate }: AdvancedPortfolioProps) => {
  const portfolioData = Object.entries(portfolio).map(([symbol, data]) => {
    const stock = stocks.find(s => s.symbol === symbol)
    if (!stock || !data || data.shares === 0) return null
    
    const currentValue = stock.price * data.shares
    const costBasis = (data.avgPrice || 0) * data.shares
    const profit = currentValue - costBasis
    const profitPercent = costBasis > 0 ? ((profit / costBasis) * 100) : 0
    
    return {
      symbol,
      shares: data.shares,
      currentPrice: stock.price,
      avgPrice: data.avgPrice || 0,
      currentValue,
      profit,
      profitPercent,
      weight: totalValue > 0 ? (currentValue / totalValue) * 100 : 0
    }
  }).filter(Boolean)

  const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']

  const performanceData = portfolioData.map(item => ({
    symbol: item.symbol,
    return: item.profitPercent
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-green rounded-3xl p-6"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Target className="w-6 h-6 mr-3 text-cyan-400" />
        Portfolio Analytics
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6 overflow-hidden">
        <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center min-w-0 overflow-hidden">
          <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-emerald-400 mx-auto mb-1 md:mb-2" />
          <p className="text-sm md:text-2xl font-bold text-emerald-400 truncate">${totalValue.toLocaleString()}</p>
          <p className="text-xs text-gray-400 truncate">Total Value</p>
        </div>
        
        <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center min-w-0 overflow-hidden">
          {totalProfit >= 0 ? 
            <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-emerald-400 mx-auto mb-1 md:mb-2" /> :
            <TrendingDown className="w-4 h-4 md:w-6 md:h-6 text-red-400 mx-auto mb-1 md:mb-2" />
          }
          <p className={`text-sm md:text-2xl font-bold truncate ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${totalProfit.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 truncate">Total P&L</p>
        </div>
        
        <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center min-w-0 overflow-hidden">
          <Percent className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 mx-auto mb-1 md:mb-2" />
          <p className="text-sm md:text-2xl font-bold text-yellow-400 truncate">{winRate.toFixed(1)}%</p>
          <p className="text-xs text-gray-400 truncate">Win Rate</p>
        </div>
        
        <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center min-w-0 overflow-hidden">
          <Activity className="w-4 h-4 md:w-6 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
          <p className="text-sm md:text-2xl font-bold text-purple-400 truncate">{portfolioData.length}</p>
          <p className="text-xs text-gray-400 truncate">Positions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Portfolio Allocation */}
        <div className="bg-black/20 rounded-xl p-3 md:p-4 overflow-hidden">
          <h3 className="font-bold mb-3 md:mb-4 text-center text-sm md:text-base truncate">Portfolio Allocation</h3>
          <div className="h-32 md:h-40 lg:h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  dataKey="weight"
                  label={({symbol}) => symbol}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Weight']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-black/20 rounded-xl p-3 md:p-4 overflow-hidden">
          <h3 className="font-bold mb-3 md:mb-4 text-center text-sm md:text-base truncate">Position Performance</h3>
          <div className="h-32 md:h-40 lg:h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="symbol" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Return']} />
                <Bar dataKey="return" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Holdings */}
      <div className="mt-4 md:mt-6 overflow-hidden">
        <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base truncate">Detailed Holdings</h3>
        <div className="space-y-2 md:space-y-3 overflow-hidden">
          {portfolioData.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 rounded-lg md:rounded-xl p-3 md:p-4 min-w-0 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 min-w-0">
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm md:text-base lg:text-lg truncate">{item.symbol}</h4>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{item.shares} shares @ ${item.avgPrice.toFixed(2)}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="font-bold text-sm md:text-base lg:text-lg truncate">${item.currentValue.toLocaleString()}</p>
                  <p className={`text-xs md:text-sm truncate ${item?.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item?.profit >= 0 ? '+' : ''}${(item?.profit || 0).toFixed(2)} ({(item?.profitPercent || 0).toFixed(2)}%)
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}