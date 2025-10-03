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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-400">${totalValue.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Total Value</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          {totalProfit >= 0 ? 
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" /> :
            <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
          }
          <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${totalProfit.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Total P&L</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <Percent className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-400">{winRate.toFixed(1)}%</p>
          <p className="text-xs text-gray-400">Win Rate</p>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 text-center">
          <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-400">{portfolioData.length}</p>
          <p className="text-xs text-gray-400">Positions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Portfolio Allocation */}
        <div className="bg-black/20 rounded-xl p-4">
          <h3 className="font-bold mb-4 text-center text-sm md:text-base">Portfolio Allocation</h3>
          <div className="h-40 md:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="weight"
                  label={({symbol, weight}) => window.innerWidth > 768 ? `${symbol} ${weight.toFixed(1)}%` : symbol}
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
        <div className="bg-black/20 rounded-xl p-4">
          <h3 className="font-bold mb-4 text-center text-sm md:text-base">Position Performance</h3>
          <div className="h-40 md:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="symbol" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Return']} />
                <Bar dataKey="return" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Holdings */}
      <div className="mt-6">
        <h3 className="font-bold mb-4">Detailed Holdings</h3>
        <div className="space-y-3">
          {portfolioData.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 rounded-xl p-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <h4 className="font-bold text-base md:text-lg">{item.symbol}</h4>
                  <p className="text-xs md:text-sm text-gray-400">{item.shares} shares @ ${item.avgPrice.toFixed(2)}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-base md:text-lg">${item.currentValue.toLocaleString()}</p>
                  <p className={`text-xs md:text-sm ${item?.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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