import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

interface ChartData {
  time: string
  price: number
}

interface TradingChartProps {
  symbol: string
  data: ChartData[]
  currentPrice: number
}

export const TradingChart = ({ symbol, data, currentPrice }: TradingChartProps) => {
  const isPositive = data.length > 1 && currentPrice > data[0].price

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-green rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
          {symbol} Chart
        </h3>
        <div className={`text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          ${currentPrice.toFixed(2)}
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}