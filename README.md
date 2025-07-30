# 📈 FinanceAI

A beginner-friendly investment platform focused on European markets, designed to help non-financial users understand and start investing without the complexity of financial jargon.

## 🌟 Features

### 🎯 Beginner-Focused Dashboard

- **Plain Language**: All financial concepts explained in simple terms
- **European Market Focus**: Specialized for German and European investors
- **Visual Learning**: Interactive cards and clear visual indicators
- **Risk Assessment**: Color-coded risk levels for easy understanding

### 🤖 AI-Powered Investment Helper

- **Smart Chat Integration**: Connect with LibreChat for personalized advice
- **Pre-filled Queries**: Click any investment to get instant AI analysis
- **Context-Aware**: AI understands your specific investment questions
- **24/7 Availability**: Get help whenever you need it

### 📊 Live Market Data

- **Real-time Prices**: Live European stock and ETF prices via Finnhub API
- **Smart Recommendations**: Curated beginner-friendly investment options
- **Currency Conversion**: All prices displayed in EUR for consistency
- **Performance Tracking**: Visual indicators for price changes

### 📚 Educational Platform

- **Learning Paths**: Structured courses from basics to advanced concepts
- **Interactive Modules**: Hands-on learning with real examples
- **Progress Tracking**: Track your financial education journey
- **Multi-language Support**: German and English content

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Market Data**: Finnhub API
- **AI Integration**: LibreChat
- **Styling**: Tailwind CSS with custom design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Finnhub API key (free at [finnhub.io](https://finnhub.io))
- LibreChat instance (for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/financeai.git
   cd financeai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key
   LIBRECHAT_URL=http://localhost:3080
   ```

4. **Install shadcn/ui components**

   ```bash
   npx shadcn@latest init
   npx shadcn@latest add card badge button skeleton
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
financeai/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── learningpaths/
│   │   │   └── page.tsx            # Learning modules
│   │   └── api/
│   │       └── stock/              # Market data API
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   └── custom/
│   │       ├── MarketInsights.tsx  # Live market data
│   │       └── AIChatPreview.tsx   # AI chat integration
│   └── lib/
│       └── utils.ts                # Utility functions
├── public/                         # Static assets
└── README.md
```

## 🎯 Key Components

### Dashboard (`/src/app/page.tsx`)

The main landing page featuring:

- Welcome section with clear value proposition
- Quick action cards for common beginner tasks
- Beginner-friendly investment picks
- Market insights and AI chat preview
- Educational tips and FAQ section

### Market Insights (`/src/components/custom/MarketInsights.tsx`)

Real-time market data component:

- Fetches live prices from Finnhub API
- Displays European stocks and ETFs
- Shows price changes with visual indicators
- Click to get AI analysis of investments

### AI Chat Preview (`/src/components/custom/AIChatPreview.tsx`)

AI integration component:

- Preview of chat functionality
- Suggested beginner questions
- Direct integration with LibreChat
- Pre-filled queries for specific investments

### Learning Paths (`/src/app/learningpaths/page.tsx`)

Educational module system:

- Structured learning progression
- Beginner to intermediate levels
- Interactive course cards
- Progress tracking capabilities

## 🔧 Configuration

### Finnhub API Setup

1. Register at [finnhub.io](https://finnhub.io/register)
2. Get your free API key
3. Add to `.env.local` as `NEXT_PUBLIC_FINNHUB_API_KEY`

### LibreChat Integration

1. Set up LibreChat instance (Docker recommended)
2. Configure URL in environment variables
3. Ensure CORS is properly configured

## 🌍 Target Audience

### Primary Users

- **Beginner Investors**: People new to investing
- **European Market Focus**: Primarily German market participants
- **Non-Financial Background**: Users without finance education
- **Small Budget Investors**: Starting with €25-500

### Use Cases

- First-time investment decisions
- Understanding basic financial concepts
- Comparing European ETFs and stocks
- Getting personalized investment advice
- Learning about risk management

## 🔮 Future Enhancements

### Planned Features

- [ ] Portfolio tracking and management
- [ ] Investment calculator tools
- [ ] Goal-setting and planning features
- [ ] More comprehensive educational content
- [ ] Multi-language support (German, French)
- [ ] Mobile app development
- [ ] Advanced risk assessment tools

### Technical Improvements

- [ ] Server-side rendering optimization
- [ ] Caching for market data
- [ ] Progressive Web App (PWA)
- [ ] Advanced analytics
- [ ] User authentication system
- [ ] Personalized recommendations

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Maintain beginner-friendly language
- Test all market data integrations
- Ensure responsive design

### When you clone FinanceAI repo with LibreChat submodule, run after clone:

```bash
git submodule update --init --recursive
```

## This will download LibreChat content into the librechat folder.

**Made with ❤️ for European investors who want to start their investment journey without the complexity.**
