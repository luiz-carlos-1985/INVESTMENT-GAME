import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Volume2, BarChart3, Calculator } from 'lucide-react'
import { Stock } from '../utils/types'

interface TradingInterfaceProps {
  stock: Stock
  balance: number
  onBuy: (stock: Stock, shares: number) => void
  onSell: (stock: Stock, shares: number) => void
  currentShares: number
}

export const TradingInterface = ({ stock, balance, onBuy, onSell, currentShares }: TradingInterfaceProps) => {
  const [shares, setShares] = useState(1)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [limitPrice, setLimitPrice] = useState(stock.price)

  const maxBuyShares = Math.floor(balance / stock.price)
  const totalCost = shares * stock.price
  const canBuy = totalCost <= balance && shares > 0
  const canSell = shares <= currentShares && shares > 0

  const handleBuy = () => {
    if (canBuy) {
      onBuy(stock, shares)
      setShares(1)
    }
  }

  const handleSell = () => {
    if (canSell) {
      onSell(stock, shares)
      setShares(1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/30 rounded-xl p-4 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            stock.trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20'
          }`}>
            {stock.trend === 'up' ? 
              <TrendingUp className="w-6 h-6 text-emerald-400" /> :
              <TrendingDown className="w-6 h-6 text-red-400" />
            }
          </div>
          <div>
            <h3 className="font-bold text-xl">{stock.symbol}</h3>
            <p className="text-gray-400 text-sm">{stock.name}</p>
            <p className="text-xs text-gray-500">{stock.sector}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <p className={`text-sm ${stock.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {stock.trend === 'up' ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Stock Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 text-xs md:text-sm">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-blue-400" />
          <span className="text-gray-400">Volume:</span>
          <span className="text-white">{stock.volume.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400">P/E:</span>
          <span className="text-white">{stock.pe.toFixed(1)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-gray-400">Dividend:</span>
          <span className="text-white">{stock.dividend.toFixed(2)}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-400">Owned:</span>
          <span className="text-white">{currentShares}</span>
        </div>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => setOrderType('market')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              orderType === 'market' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              orderType === 'limit' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Limit
          </button>
        </div>
        
        {orderType === 'limit' && (
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(parseFloat(e.target.value))}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
            placeholder="Limit Price"
            step="0.01"
          />
        )}
      </div>

      {/* Shares Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Shares</label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
            min="1"
            max={Math.max(maxBuyShares, currentShares)}
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setShares(Math.floor(maxBuyShares / 4))}
              className="flex-1 sm:flex-none px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm"
            >
              25%
            </button>
            <button
              onClick={() => setShares(Math.floor(maxBuyShares / 2))}
              className="flex-1 sm:flex-none px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm"
            >
              50%
            </button>
            <button
              onClick={() => setShares(maxBuyShares)}
              className="flex-1 sm:flex-none px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm"
            >
              Max
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-black/20 rounded-lg p-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Cost:</span>
          <span className="text-white font-semibold">${totalCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Available:</span>
          <span className="text-white">${balance.toLocaleString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuy}
          disabled={!canBuy}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Buy {shares} {shares === 1 ? 'Share' : 'Shares'}
        </motion.button>
        
        {currentShares > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSell}
            disabled={!canSell}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Sell {shares} {shares === 1 ? 'Share' : 'Shares'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}