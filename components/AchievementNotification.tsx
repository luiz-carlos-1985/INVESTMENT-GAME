import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { Achievement } from '../utils/achievements'

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export const AchievementNotification = ({ achievement, onClose }: AchievementNotificationProps) => {
  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.8 }}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="bg-yellow-500/20 rounded-full p-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">{achievement.icon}</span>
              <h3 className="font-bold text-white">Achievement Unlocked!</h3>
            </div>
            <p className="font-semibold text-yellow-400">{achievement.title}</p>
            <p className="text-sm text-gray-300">{achievement.description}</p>
            {achievement.reward && (
              <p className="text-sm text-emerald-400 mt-1">
                Reward: +${achievement.reward}
              </p>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}