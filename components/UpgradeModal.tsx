import { motion } from 'framer-motion'
import { Crown, Check, X, CreditCard, Shield, Zap, Star } from 'lucide-react'
import { useAuth } from '../auth'

interface UpgradeModalProps {
  onClose: () => void
}

export const UpgradeModal = ({ onClose }: UpgradeModalProps) => {
  const { upgradeToPremium } = useAuth()

  const handleUpgrade = (plan: 'monthly' | 'yearly') => {
    // Simulate payment processing
    setTimeout(() => {
      upgradeToPremium()
      onClose()
    }, 2000)
  }

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: "Advanced AI Analytics" },
    { icon: <Star className="w-5 h-5" />, text: "Exclusive Premium Stocks" },
    { icon: <Shield className="w-5 h-5" />, text: "Priority Customer Support" },
    { icon: <CreditCard className="w-5 h-5" />, text: "Advanced Portfolio Tools" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 w-full max-w-2xl border border-yellow-500/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8 relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Crown className="w-16 h-16 text-yellow-400" />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Upgrade to Premium
          </h2>
          <p className="text-gray-300 text-lg">Unlock the full potential of your trading journey</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 bg-black/20 rounded-xl p-4 border border-white/10"
            >
              <div className="text-emerald-400">{feature.icon}</div>
              <span className="text-white font-medium">{feature.text}</span>
              <Check className="w-5 h-5 text-emerald-400 ml-auto" />
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-white/10 relative overflow-hidden"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpgrade('monthly')}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300"
              >
                Choose Monthly
              </motion.button>
            </div>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border-2 border-yellow-500/50 relative overflow-hidden"
          >
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-bl-xl text-sm font-bold">
              BEST VALUE
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Yearly</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$99.99</span>
                <span className="text-gray-400">/year</span>
              </div>
              <p className="text-emerald-400 text-sm mb-4">Save $19.89 (17% off)</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpgrade('yearly')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
              >
                Choose Yearly
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Security & Guarantee */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Cancel anytime. No hidden fees. Powered by Stripe.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}