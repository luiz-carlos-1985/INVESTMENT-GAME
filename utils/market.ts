import { Stock, MarketData, ChartData } from './types'

export const updateStockPrices = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    const volatility = stock.volatility || 0.05
    const changePercent = (Math.random() - 0.5) * volatility * 2
    const newPrice = stock.price * (1 + changePercent)
    const change = newPrice - stock.price
    const changePercent2 = (change / stock.price) * 100
    
    return {
      ...stock,
      price: Math.max(0.01, parseFloat(newPrice.toFixed(2))),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent2.toFixed(2)),
      trend: change >= 0 ? 'up' : 'down',
      volume: Math.floor(Math.random() * 10000000) + 1000000
    }
  })
}

export const getMarketTrend = (stocks: Stock[]): 'bullish' | 'bearish' | 'neutral' => {
  const upStocks = stocks.filter(s => s.trend === 'up').length
  const totalStocks = stocks.length
  const upPercentage = upStocks / totalStocks
  const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length
  
  if (upPercentage >= 0.65 && avgChange > 1) return 'bullish'
  if (upPercentage <= 0.35 && avgChange < -1) return 'bearish'
  return 'neutral'
}

export const generateMarketNews = (trend: string): string[] => {
  const bullishNews = [
    "🚀 Tech giants report record Q4 earnings, driving market surge",
    "📈 S&P 500 hits all-time high as investor confidence soars",
    "💼 Employment data exceeds expectations, boosting economic outlook",
    "🏦 Federal Reserve signals dovish stance, markets rally",
    "🌟 AI revolution drives unprecedented growth in tech sector"
  ]
  
  const bearishNews = [
    "📉 Global markets tumble on inflation concerns",
    "⚠️ Geopolitical tensions weigh heavily on investor sentiment",
    "🏭 Manufacturing data disappoints, sparking recession fears",
    "💸 Major selloff in growth stocks as rates climb",
    "🔻 Energy crisis impacts global supply chains"
  ]
  
  const neutralNews = [
    "⚖️ Markets consolidate as investors await Fed decision",
    "📊 Mixed earnings season keeps indices range-bound",
    "🤔 Analysts divided on market direction amid uncertainty",
    "📰 Economic data provides conflicting signals",
    "🔄 Sector rotation continues as investors reassess positions"
  ]
  
  const news = trend === 'bullish' ? bullishNews : trend === 'bearish' ? bearishNews : neutralNews
  return news.sort(() => 0.5 - Math.random()).slice(0, 3)
}

export const calculateMarketData = (stocks: Stock[]): MarketData => {
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0)
  const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0)
  const avgVolatility = stocks.reduce((sum, stock) => sum + stock.volatility, 0) / stocks.length
  
  return {
    trend: getMarketTrend(stocks),
    volatilityIndex: parseFloat((avgVolatility * 100).toFixed(2)),
    marketCap: totalMarketCap,
    volume: totalVolume
  }
}