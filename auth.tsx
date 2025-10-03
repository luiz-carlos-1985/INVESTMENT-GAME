import { useState, createContext, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Crown, Zap } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
  trialEndsAt?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  startFreeTrial: () => void
  upgradeToPremium: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      if (userData.trialEndsAt) {
        userData.trialEndsAt = new Date(userData.trialEndsAt)
      }
      setUser(userData)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login
    const userData: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isPremium: false
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      isPremium: false
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const startFreeTrial = () => {
    if (user) {
      const trialUser = {
        ...user,
        isPremium: true,
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      }
      setUser(trialUser)
      localStorage.setItem('user', JSON.stringify(trialUser))
    }
  }

  const upgradeToPremium = () => {
    if (user) {
      const premiumUser = {
        ...user,
        isPremium: true,
        trialEndsAt: undefined
      }
      setUser(premiumUser)
      localStorage.setItem('user', JSON.stringify(premiumUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, startFreeTrial, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  )
}

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(email, password, name)
      }
      onClose()
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
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
          <User className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back!' : 'Join the Game!'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const PremiumModal = ({ onClose }: { onClose: () => void }) => {
  const { startFreeTrial, upgradeToPremium } = useAuth()

  const handleFreeTrial = () => {
    startFreeTrial()
    onClose()
  }

  const handleUpgrade = () => {
    upgradeToPremium()
    onClose()
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
        <div className="text-center mb-6">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Go Premium!</h2>
          <p className="text-gray-300">Unlock advanced features and boost your trading game</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Advanced market analytics</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Real-time portfolio insights</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Exclusive premium stocks</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-white">Priority customer support</span>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFreeTrial}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300"
          >
            Start 7-Day Free Trial
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            Upgrade to Premium - $9.99/month
          </motion.button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </motion.div>
    </motion.div>
  )
}