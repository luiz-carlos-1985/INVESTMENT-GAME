import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Volume2, VolumeX, Bell, BellOff, RotateCcw } from 'lucide-react'

interface SettingsProps {
  onClose: () => void
}

export const Settings = ({ onClose }: SettingsProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('gameData')
      window.location.reload()
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
        className="glass-green rounded-3xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <SettingsIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Sound Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {soundEnabled ? 
                <Volume2 className="w-5 h-5 text-emerald-400" /> :
                <VolumeX className="w-5 h-5 text-gray-400" />
              }
              <span className="text-white">Sound Effects</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notificationsEnabled ? 
                <Bell className="w-5 h-5 text-emerald-400" /> :
                <BellOff className="w-5 h-5 text-gray-400" />
              }
              <span className="text-white">Notifications</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Reset Progress */}
          <div className="pt-4 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetProgress}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset All Progress</span>
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}