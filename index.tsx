import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Target, Trophy, Zap, Coins, Star, User, LogOut, Crown, Settings as SettingsIcon, HelpCircle, BarChart3 } from 'lucide-react'
import { AuthProvider, useAuth, LoginForm, PremiumModal } from './auth'
import { PremiumStocks, AdvancedAnalytics, TrialBanner } from './premium-features'
import { MarketNews } from './components/MarketNews'
import { TradingChart } from './components/TradingChart'
import { AchievementNotification } from './components/AchievementNotification'
import { Leaderboard } from './components/Leaderboard'
import { Settings } from './components/Settings'
import { TutorialModal } from './components/TutorialModal'
import { AdvancedPortfolio } from './components/AdvancedPortfolio'
import { TradingInterface } from './components/TradingInterface'
import { MarketOverview } from './components/MarketOverview'
import { UpgradeModal } from './components/UpgradeModal'
import { saveGameData, loadGameData, getDefaultGameData } from './utils/storage'
import { achievements, checkAchievements, Achievement } from './utils/achievements'
import { updateStockPrices, getMarketTrend, generateMarketNews, calculateMarketData } from './utils/market'
import { Stock, GameData, TradeHistory, ChartData, MarketData } from './utils/types'



function GameContent() {
  const [balance, setBalance] = useState(10000)
  const [portfolio, setPortfolio] = useState<{[key: string]: {shares: number, avgPrice: number}}>({})
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [userAchievements, setUserAchievements] = useState<string[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [totalTrades, setTotalTrades] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalLoss, setTotalLoss] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [tradingHistory, setTradingHistory] = useState<TradeHistory[]>([])
  const [chartData, setChartData] = useState<{[key: string]: ChartData[]}>({})
  const [marketData, setMarketData] = useState<MarketData>({ trend: 'neutral', volatilityIndex: 0, marketCap: 0, volume: 0 })
  const [marketNews, setMarketNews] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [marketChartData, setMarketChartData] = useState<any[]>([])

  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35, trend: 'up', sector: 'Technology', volatility: 0.03, volume: 89234567, marketCap: 2.8e12, pe: 28.5, dividend: 0.52 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -15.23, changePercent: -0.53, trend: 'down', sector: 'Technology', volatility: 0.04, volume: 45123890, marketCap: 1.7e12, pe: 25.2, dividend: 0.0 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: 8.92, changePercent: 3.72, trend: 'up', sector: 'Automotive', volatility: 0.08, volume: 156789012, marketCap: 789e9, pe: 65.8, dividend: 0.0 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: -2.15, changePercent: -0.56, trend: 'down', sector: 'Technology', volatility: 0.025, volume: 67345123, marketCap: 2.9e12, pe: 32.1, dividend: 2.72 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88, change: 12.45, changePercent: 0.37, trend: 'up', sector: 'E-commerce', volatility: 0.035, volume: 78456234, marketCap: 1.4e12, pe: 45.3, dividend: 0.0 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 45.67, changePercent: 5.51, trend: 'up', sector: 'Semiconductors', volatility: 0.06, volume: 234567890, marketCap: 2.1e12, pe: 71.2, dividend: 0.16 },
    { symbol: 'META', name: 'Meta Platforms', price: 487.33, change: 12.89, changePercent: 2.72, trend: 'up', sector: 'Social Media', volatility: 0.05, volume: 123456789, marketCap: 1.2e12, pe: 24.8, dividend: 0.0 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.87, change: -8.23, changePercent: -1.81, trend: 'down', sector: 'Streaming', volatility: 0.07, volume: 98765432, marketCap: 198e9, pe: 42.1, dividend: 0.0 }
  ])

  const buyStock = (stock: Stock, shares: number) => {
    const cost = stock.price * shares
    if (balance >= cost) {
      setBalance(prev => prev - cost)
      setPortfolio(prev => {
        const current = prev[stock.symbol] || { shares: 0, avgPrice: 0 }
        const totalShares = current.shares + shares
        const totalCost = (current.shares * current.avgPrice) + cost
        const newAvgPrice = totalCost / totalShares
        
        return {
          ...prev,
          [stock.symbol]: { shares: totalShares, avgPrice: newAvgPrice }
        }
      })
      
      const trade: TradeHistory = {
        id: Date.now().toString(),
        symbol: stock.symbol,
        type: 'buy',
        shares,
        price: stock.price,
        timestamp: new Date()
      }
      
      setTradingHistory(prev => [trade, ...prev].slice(0, 100))
      setXp(prev => prev + Math.floor(shares * 10))
      setStreak(prev => prev + 1)
      setTotalTrades(prev => prev + 1)
      
      if (Math.random() > 0.7) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
      }
      
      saveGameProgress()
    }
  }

  const sellStock = (stock: Stock, shares: number) => {
    const position = portfolio[stock.symbol]
    if (position && position.shares >= shares) {
      const revenue = stock.price * shares
      const costBasis = position.avgPrice * shares
      const profit = revenue - costBasis
      
      setBalance(prev => prev + revenue)
      setPortfolio(prev => {
        const newShares = position.shares - shares
        if (newShares === 0) {
          const { [stock.symbol]: removed, ...rest } = prev
          return rest
        }
        return {
          ...prev,
          [stock.symbol]: { ...position, shares: newShares }
        }
      })
      
      const trade: TradeHistory = {
        id: Date.now().toString(),
        symbol: stock.symbol,
        type: 'sell',
        shares,
        price: stock.price,
        timestamp: new Date(),
        profit
      }
      
      setTradingHistory(prev => [trade, ...prev].slice(0, 100))
      setXp(prev => prev + Math.floor(shares * 15))
      
      if (profit > 0) {
        setTotalProfit(prev => prev + profit)
      } else {
        setTotalLoss(prev => prev + Math.abs(profit))
      }
      
      setTotalTrades(prev => prev + 1)
      updateWinRate()
      saveGameProgress()
    }
  }

  // Load game data on mount
  useEffect(() => {
    const savedData = loadGameData()
    if (savedData) {
      setBalance(savedData.balance)
      setPortfolio(savedData.portfolio)
      setLevel(savedData.level)
      setXp(savedData.xp)
      setStreak(savedData.streak)
      setUserAchievements(savedData.achievements)
      setTotalTrades(savedData.totalTrades)
      setBestStreak(savedData.bestStreak)
      setTotalProfit(savedData.totalProfit)
      setTotalLoss(savedData.totalLoss || 0)
      setWinRate(savedData.winRate || 0)
      setTradingHistory(savedData.tradingHistory || [])
    } else {
      setShowTutorial(true)
    }
  }, [])

  // Update market prices every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        const updatedStocks = updateStockPrices(prevStocks)
        const newMarketData = calculateMarketData(updatedStocks)
        setMarketData(newMarketData)
        setMarketNews(generateMarketNews(newMarketData.trend))
        
        // Update chart data
        const now = new Date().toLocaleTimeString()
        setChartData(prev => {
          const newData = { ...prev }
          updatedStocks.forEach(stock => {
            if (!newData[stock.symbol]) newData[stock.symbol] = []
            newData[stock.symbol].push({ time: now, price: stock.price, volume: stock.volume })
            if (newData[stock.symbol].length > 20) {
              newData[stock.symbol] = newData[stock.symbol].slice(-20)
            }
          })
          return newData
        })
        
        // Update market index chart
        const marketIndex = updatedStocks.reduce((sum, stock) => sum + stock.price, 0) / updatedStocks.length
        setMarketChartData(prev => {
          const newChart = [...prev, { time: now, value: marketIndex }]
          return newChart.length > 20 ? newChart.slice(-20) : newChart
        })
        
        return updatedStocks
      })
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  // Level up logic
  useEffect(() => {
    if (xp >= level * 100) {
      setLevel(prev => prev + 1)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [xp, level])

  const totalPortfolioValue = Object.entries(portfolio).reduce((total, [symbol, position]) => {
    const stock = stocks.find(s => s.symbol === symbol)
    return total + (stock ? stock.price * position.shares : 0)
  }, 0)
  
  const updateWinRate = () => {
    const profitableTrades = tradingHistory.filter(t => t.type === 'sell' && (t.profit || 0) > 0).length
    const totalSellTrades = tradingHistory.filter(t => t.type === 'sell').length
    setWinRate(totalSellTrades > 0 ? (profitableTrades / totalSellTrades) * 100 : 0)
  }

  // Check achievements
  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak)
    }
    
    const gameData = {
      balance,
      portfolio,
      level,
      xp,
      streak,
      totalTrades,
      bestStreak,
      totalProfit,
      portfolioValue: totalPortfolioValue
    }
    
    const newAchievements = checkAchievements(gameData, userAchievements)
    if (newAchievements.length > 0) {
      const achievement = newAchievements[0]
      setCurrentAchievement(achievement)
      setUserAchievements(prev => [...prev, achievement.id])
      if (achievement.reward) {
        setBalance(prev => prev + achievement.reward)
      }
    }
  }, [balance, portfolio, level, xp, streak, totalTrades, totalProfit, userAchievements, bestStreak, totalPortfolioValue])

  const saveGameProgress = () => {
    const gameData: GameData = {
      balance,
      portfolio,
      level,
      xp,
      streak,
      achievements: userAchievements,
      totalTrades,
      bestStreak,
      totalProfit,
      totalLoss,
      winRate,
      lastLogin: new Date().toISOString(),
      tradingHistory
    }
    saveGameData(gameData)
  }

  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showPremium, setShowPremium] = useState(false)

  return (
    <div className="min-h-screen text-white p-2 md:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center min-w-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0"
              >
                <Coins className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mr-2 md:mr-3" />
              </motion.div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent truncate">
                  Micro Investment Game
                </h1>
                <p className="text-sm md:text-lg text-gray-300 truncate">Start small, dream big! 🚀</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTutorial(true)}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 p-2 rounded-lg transition-all duration-300"
                title="Tutorial"
              >
                <HelpCircle className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300"
                title="Settings"
              >
                <SettingsIcon className="w-5 h-5" />
              </motion.button>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    {user.isPremium && (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </motion.button>
              )}
              
              {user && !user.isPremium && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUpgrade(true)}
                  className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Crown className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Go Premium</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse relative z-10" />
                </motion.button>
              )}
            </div>
          </div>
          
          <TrialBanner />
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mb-6 md:mb-8 overflow-hidden"
        >
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-emerald-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-emerald-400 truncate">${balance.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs truncate">Cash Balance</p>
          </div>
          
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-cyan-400 truncate">${totalPortfolioValue.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs truncate">Portfolio Value</p>
          </div>
          
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-purple-400 truncate">${(balance + totalPortfolioValue).toLocaleString()}</h3>
            <p className="text-gray-400 text-xs truncate">Total Value</p>
          </div>
          
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <Trophy className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-yellow-400 truncate">Level {level}</h3>
            <p className="text-gray-400 text-xs truncate">{xp}/{level * 100} XP</p>
          </div>
          
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <Zap className="w-4 h-4 md:w-6 md:h-6 text-orange-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-orange-400 truncate">{streak}</h3>
            <p className="text-gray-400 text-xs truncate">Trade Streak</p>
          </div>
          
          <div className="glass-green rounded-xl md:rounded-2xl p-2 md:p-4 text-center min-w-0">
            <Target className="w-4 h-4 md:w-6 md:h-6 text-pink-400 mx-auto mb-1 md:mb-2" />
            <h3 className="text-sm md:text-xl font-bold text-pink-400 truncate">{winRate.toFixed(1)}%</h3>
            <p className="text-gray-400 text-xs truncate">Win Rate</p>
          </div>
        </motion.div>

        {/* XP Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="glass-green rounded-full h-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${(xp % (level * 100)) / (level * 100) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full overflow-hidden">
          {/* Main Trading Area */}
          <div className="xl:col-span-3 space-y-4 lg:space-y-6 xl:space-y-8 min-w-0">
            {/* Market Overview */}
            <MarketOverview marketData={marketData} stocks={stocks} chartData={marketChartData} />
            
            {/* Market News */}
            <MarketNews trend={marketData.trend} news={marketNews} />
            
            {/* Stock List */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-green rounded-3xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
                Live Market
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 overflow-hidden">
                {stocks.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-4 hover:bg-black/30 transition-all duration-300 cursor-pointer min-w-0"
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="flex items-center justify-between min-w-0">
                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          stock.trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}>
                          {stock.trend === 'up' ? 
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" /> :
                            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                          }
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm md:text-base truncate">{stock.symbol}</h3>
                          <p className="text-gray-400 text-xs truncate">{stock.sector}</p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm md:text-base">${stock.price.toFixed(2)}</p>
                        <p className={`text-xs ${stock.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Trading Interface */}
            {selectedStock && (
              <TradingInterface
                stock={selectedStock}
                balance={balance}
                onBuy={buyStock}
                onSell={sellStock}
                currentShares={portfolio[selectedStock.symbol]?.shares || 0}
              />
            )}
            
            {/* Premium Stocks */}
            <PremiumStocks />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6 min-w-0 overflow-hidden">
            {/* Advanced Portfolio */}
            <AdvancedPortfolio
              portfolio={portfolio}
              stocks={stocks}
              totalValue={totalPortfolioValue}
              totalProfit={totalProfit - totalLoss}
              winRate={winRate}
            />
            
            {/* Advanced Analytics */}
            <AdvancedAnalytics />
            
            {/* Leaderboard */}
            <Leaderboard />
          </div>
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="text-8xl mb-4"
                >
                  🎉
                </motion.div>
                <motion.h2
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-4xl font-bold text-yellow-400"
                >
                  Great Trade!
                </motion.h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Modals and Notifications */}
        <AnimatePresence>
          {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
          {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
          {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
          {showSettings && <Settings onClose={() => setShowSettings(false)} />}
          {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
          {selectedStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
              onClick={() => setSelectedStock(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-900 rounded-2xl md:rounded-3xl p-3 md:p-6 max-w-2xl w-full mx-2 md:mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Trade {selectedStock.symbol}</h2>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <TradingInterface
                  stock={selectedStock}
                  balance={balance}
                  onBuy={buyStock}
                  onSell={sellStock}
                  currentShares={portfolio[selectedStock.symbol]?.shares || 0}
                />
                {chartData[selectedStock.symbol] && (
                  <div className="mt-6">
                    <TradingChart 
                      symbol={selectedStock.symbol}
                      data={chartData[selectedStock.symbol]}
                      currentPrice={selectedStock.price}
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AchievementNotification 
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />
      </div>
    </div>
  )
}

export default function MicroInvestmentGame() {
  return (
    <AuthProvider>
      <GameContent />
    </AuthProvider>
  )
}