# Investment Game 🚀

A gamified investment simulation platform where users can learn trading with virtual money, level up their skills, and compete on leaderboards.

## Features ✨

### Core Gameplay
- **Virtual Trading**: Start with $1000 and trade real-time stock prices
- **Level System**: Earn XP and level up through successful trades
- **Achievement System**: Unlock 5+ achievements with rewards
- **Trading Streaks**: Build consecutive trade streaks for bonuses

### Market Features
- **Live Market Data**: Real-time price updates every 10 seconds
- **Market Trends**: Dynamic bullish/bearish/neutral market conditions
- **Trading Charts**: Interactive price history charts for each stock
- **Market News**: Auto-generated news based on market trends

### Premium Features
- **Exclusive Stocks**: Access to premium stock selections
- **Advanced Analytics**: AI-powered market insights and recommendations
- **Portfolio Analytics**: Detailed performance metrics
- **Free Trial**: 7-day premium trial for new users

### User Experience
- **Authentication System**: User registration and login
- **Data Persistence**: Automatic progress saving
- **Interactive Tutorial**: 5-step onboarding for new users
- **Leaderboard**: Global ranking system
- **Settings Panel**: Customizable game preferences

## Tech Stack 🛠️

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: LocalStorage

## Project Structure 📁

```
micro-investment-game/
├── components/           # Reusable UI components
│   ├── AchievementNotification.tsx
│   ├── Leaderboard.tsx
│   ├── MarketNews.tsx
│   ├── Settings.tsx
│   ├── TradingChart.tsx
│   └── TutorialModal.tsx
├── pages/               # Next.js pages
│   ├── _app.tsx
│   └── index.tsx
├── utils/               # Utility functions
│   ├── achievements.ts
│   ├── market.ts
│   └── storage.ts
├── auth.tsx             # Authentication system
├── premium-features.tsx # Premium functionality
├── index.tsx           # Main game component
└── globals.css         # Global styles
```

## Installation & Setup 🚀

1. **Clone the repository**
```bash
git clone <repository-url>
cd micro-investment-game
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3001`

## Game Mechanics 🎮

### Trading System
- Buy stocks with virtual money
- Real-time price fluctuations
- Profit/loss calculations
- Portfolio management

### Progression System
- **XP Gain**: 10 XP per share bought, 15 XP per share sold
- **Level Up**: Requires level × 100 XP
- **Achievements**: Unlock rewards for milestones
- **Streaks**: Consecutive trades increase multipliers

### Achievement List
| Achievement | Condition | Reward |
|-------------|-----------|---------|
| First Steps | Make first trade | $50 |
| Hot Streak | 5 consecutive trades | $100 |
| Rising Star | Reach level 5 | $200 |
| Profit Master | Earn $1000 total profit | $500 |
| Big Player | $10,000 portfolio value | $1000 |

## API Reference 📚

### Storage Utils
```typescript
// Save game progress
saveGameData(gameData: GameData): void

// Load saved progress
loadGameData(): GameData | null

// Get default game state
getDefaultGameData(): GameData
```

### Market Utils
```typescript
// Update stock prices
updateStockPrices(stocks: Stock[]): Stock[]

// Get market trend
getMarketTrend(stocks: Stock[]): 'bullish' | 'bearish' | 'neutral'

// Generate market news
generateMarketNews(trend: string): string[]
```

### Achievement System
```typescript
// Check for new achievements
checkAchievements(gameData: any, currentAchievements: string[]): Achievement[]
```

## Component Props 🔧

### TradingChart
```typescript
interface TradingChartProps {
  symbol: string
  data: ChartData[]
  currentPrice: number
}
```

### MarketNews
```typescript
interface MarketNewsProps {
  trend: 'bullish' | 'bearish' | 'neutral'
  news: string[]
}
```

## Configuration ⚙️

### Tailwind Config
- Custom animations (bounce-slow, pulse-fast, wiggle)
- Glass morphism effects
- Gradient backgrounds

### Market Settings
- Price update interval: 10 seconds
- Chart history: 20 data points
- Stock volatility: 2.5% - 8%

## Development 👨‍💻

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### Adding New Features
1. Create component in `/components`
2. Add utility functions in `/utils`
3. Update main game logic in `index.tsx`
4. Add TypeScript interfaces as needed

## Browser Support 🌐

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance 📊

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s
- Bundle Size: <500KB

## Contributing 🤝

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
   
## Screenshots:

<img width="1221" height="1027" alt="image" src="https://github.com/user-attachments/assets/57245517-b329-44a3-b73b-3d8ed668f719" />

<img width="1213" height="1036" alt="image" src="https://github.com/user-attachments/assets/85ad0a47-c835-4de2-a86d-e2f09253dba4" />

<img width="1191" height="991" alt="image" src="https://github.com/user-attachments/assets/24c6eea9-d903-47df-96e1-53d541a3eaaf" />

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, email support@microinvestmentgame.com or join our Discord community.

---

**Made with ❤️ by the Micro Investment Game Team**
