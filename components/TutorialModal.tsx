import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react'

interface TutorialStep {
  title: string
  content: string
  icon: string
}

interface TutorialModalProps {
  onClose: () => void
}

export const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps: TutorialStep[] = [
    {
      title: "Welcome to Micro Investment Game!",
      content: "Learn to invest with small amounts and build your portfolio. Start with $1000 and grow your wealth!",
      icon: "🎯"
    },
    {
      title: "Buy and Sell Stocks",
      content: "Click 'Buy 1' or 'Buy 5' to purchase shares. Watch the market prices change in real-time and sell when profitable.",
      icon: "📈"
    },
    {
      title: "Level Up System",
      content: "Earn XP with every trade. Level up to unlock new features and show your trading expertise!",
      icon: "⭐"
    },
    {
      title: "Build Your Streak",
      content: "Make consecutive trades to build your streak. Higher streaks unlock achievements and bonuses!",
      icon: "🔥"
    },
    {
      title: "Premium Features",
      content: "Upgrade to Premium for exclusive stocks, advanced analytics, and AI-powered recommendations!",
      icon: "👑"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-green rounded-3xl p-8 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tutorial</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <h3 className="text-xl font-bold text-white mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {steps[currentStep].content}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? 'bg-emerald-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 bg-gray-500/20 hover:bg-gray-500/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Playing' : 'Next'}</span>
            {currentStep === steps.length - 1 ? 
              <Play className="w-5 h-5" /> : 
              <ChevronRight className="w-5 h-5" />
            }
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}