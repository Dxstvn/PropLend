# PropertyLend MVP Build Plan
## Two-Page Testnet Application with Personalized Investor Experience

**Version**: 1.0
**Target Launch**: 12 weeks from start
**Platform**: Web (Next.js 14)
**Network**: Polygon Mumbai Testnet

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Page 1: Property Investment Marketplace](#page-1-property-investment-marketplace)
4. [Page 2: Secondary Token Marketplace](#page-2-secondary-token-marketplace)
5. [Personalized Investor Dashboard](#personalized-investor-dashboard)
6. [Smart Contract Architecture](#smart-contract-architecture)
7. [Backend Infrastructure](#backend-infrastructure)
8. [Animation Implementation](#animation-implementation)
9. [Development Timeline](#development-timeline)
10. [Testing & QA](#testing--qa)
11. [Deployment Strategy](#deployment-strategy)

---

## Project Overview

### Product Vision

PropertyLend MVP is a **two-page testnet application** that allows users to:

**Page 1 - Property Investment Marketplace**:
- Browse mock real estate properties available for investment
- Understand the two-tranche system (Senior/Junior)
- Invest testnet USDC into selected properties
- View platform analytics and metrics

**Page 2 - Secondary Token Marketplace**:
- Trade LP tokens (sSAFE, jYIELD) representing investment positions
- Buy existing positions from other investors
- Sell owned positions at custom prices
- View order book and recent trades

**Personalized Investor Experience**:
- Wallet-based authentication and user tracking
- Real-time earnings visualization with animated counters
- Historical performance charts and analytics
- Achievement system with gamification
- Customized dashboard showing portfolio performance

### Key Features

✅ **Fully Functional Testnet Investments**
- Real smart contract interactions on Polygon Mumbai
- Actual token transfers and interest accrual
- Complete investment lifecycle (deposit → earn → withdraw)

✅ **Apple-Level Animation**
- Scroll-driven canvas sequences
- Micro-interactions on every element
- Smooth page transitions
- Real-time data visualizations

✅ **Personalized User Experience**
- Wallet address tracking via Supabase
- Real-time interest payout visualization
- Achievement unlocks and milestones
- Historical earnings charts

✅ **Secondary Market Trading**
- ERC-20 LP tokens transferable between users
- Order book or AMM-based pricing
- Escrow system for pending trades
- Price discovery mechanisms

### Success Criteria

**Technical**:
- Smart contracts deployed and verified on Mumbai testnet
- 60fps animations across all interactions
- < 3s page load time
- Mobile responsive (down to 375px width)
- WCAG 2.1 AA accessibility compliance

**User Experience**:
- First investment completion < 2 minutes
- Immediate visual feedback on all actions
- Real-time earnings counter visible and updating
- Achievement unlock within first session

---

## Technical Architecture

### Technology Stack

#### Frontend
```
Core Framework:
- Next.js 14 (App Router, Server Components, Server Actions)
- React 18 (Concurrent features, Suspense)
- TypeScript 5+

Styling:
- Tailwind CSS 3.4
- CSS Modules (for component-specific styles)
- Framer Motion (page transitions, micro-interactions)

Web3 Integration:
- Wagmi 2.x (React hooks for Ethereum)
- Viem 2.x (TypeScript Ethereum library)
- RainbowKit 2.x (Wallet connection UI, customized)

Animation Libraries:
- GSAP 3.12 + ScrollTrigger (scroll-driven animations)
- Lottie React (success animations, loaders)
- D3.js 7.x (data visualizations, charts)
- Three.js + React Three Fiber (3D property visualization)
- Vanilla Tilt.js (3D card effects)
- react-countup (number animations)
- canvas-confetti (celebration animations)

State Management:
- Zustand (client state: UI, modals, filters)
- React Query (server state: API data, caching)
- Wagmi built-in state (wallet, contracts)

Utilities:
- date-fns (date formatting)
- numeral (number formatting)
- classnames / clsx (conditional classes)
- zod (schema validation)
- react-hook-form (form handling)
```

#### Backend
```
Database & Auth:
- Supabase (PostgreSQL + Auth + Realtime + Storage)
- Row Level Security (RLS) for data isolation

Blockchain Indexing:
- The Graph Protocol (optional, for advanced queries)
- Direct RPC calls via Viem (for simple queries)
- Alchemy/Infura (RPC providers)

Caching:
- Redis (optional, for rate limiting and caching)
- React Query (client-side caching)

API:
- Next.js API Routes (RESTful endpoints)
- Server Actions (form submissions, mutations)
```

#### Smart Contracts
```
Language: Solidity 0.8.19
Framework: Hardhat
Testing: Hardhat + Chai + Ethers.js
Network: Polygon Mumbai Testnet

Contracts:
- LendingPool.sol (main pool logic)
- TrancheTokens.sol (ERC-20 sSAFE, jYIELD)
- InterestDistributor.sol (waterfall payments)
- SecondaryMarket.sol (LP token trading)
- MockUSDC.sol (testnet USDC)
- MockProperty.sol (testnet property NFTs)
```

#### DevOps
```
Hosting:
- Vercel (frontend hosting, edge functions)

Version Control:
- GitHub (code repository)
- Conventional Commits (commit message format)

CI/CD:
- Vercel automatic deployments (preview + production)
- GitHub Actions (smart contract tests)

Monitoring:
- Vercel Analytics (performance metrics)
- Sentry (error tracking)
- Supabase Dashboard (database queries)
```

### Project Structure

```
proplend/
├── .github/
│   └── workflows/
│       ├── contract-tests.yml
│       └── lint.yml
├── contracts/
│   ├── core/
│   │   ├── LendingPool.sol
│   │   ├── TrancheTokens.sol
│   │   ├── InterestDistributor.sol
│   │   └── SecondaryMarket.sol
│   ├── mocks/
│   │   ├── MockUSDC.sol
│   │   └── MockProperty.sol
│   └── interfaces/
│       ├── ILendingPool.sol
│       └── ISecondaryMarket.sol
├── test/
│   ├── LendingPool.test.ts
│   ├── TrancheTokens.test.ts
│   ├── InterestDistributor.test.ts
│   └── SecondaryMarket.test.ts
├── scripts/
│   ├── deploy.ts
│   ├── seed-properties.ts
│   └── verify-contracts.ts
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Landing page (redirect to /invest)
│   │   └── layout.tsx
│   ├── (platform)/
│   │   ├── invest/
│   │   │   ├── page.tsx                # Page 1: Property Marketplace
│   │   │   └── [propertyId]/
│   │   │       └── page.tsx            # Property detail modal/page
│   │   ├── marketplace/
│   │   │   ├── page.tsx                # Page 2: Token Marketplace
│   │   │   └── [listingId]/
│   │   │       └── page.tsx            # Listing detail
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Personal investor dashboard
│   │   └── layout.tsx                  # Platform shell (navbar, footer)
│   ├── api/
│   │   ├── investments/
│   │   │   └── route.ts
│   │   ├── earnings/
│   │   │   └── route.ts
│   │   ├── listings/
│   │   │   └── route.ts
│   │   └── achievements/
│   │       └── route.ts
│   ├── layout.tsx                       # Root layout (providers)
│   ├── globals.css                      # Global styles + Tailwind
│   └── providers.tsx                    # Client providers wrapper
├── components/
│   ├── ui/                              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── toast.tsx
│   ├── wallet/
│   │   ├── ConnectButton.tsx
│   │   ├── WalletModal.tsx
│   │   └── AccountDropdown.tsx
│   ├── property/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   ├── PropertyDetail.tsx
│   │   └── InvestmentModal.tsx
│   ├── tranche/
│   │   ├── TrancheCard.tsx
│   │   ├── TrancheComparison.tsx
│   │   └── WaterfallVisualization.tsx
│   ├── marketplace/
│   │   ├── TokenListingCard.tsx
│   │   ├── OrderBook.tsx
│   │   ├── TradeModal.tsx
│   │   └── RecentTrades.tsx
│   ├── dashboard/
│   │   ├── WelcomeHero.tsx
│   │   ├── PortfolioOverview.tsx
│   │   ├── EarningsTicker.tsx
│   │   ├── EarningsChart.tsx
│   │   ├── PropertyPerformanceCard.tsx
│   │   └── AchievementBadges.tsx
│   ├── animations/
│   │   ├── HeroCanvasSequence.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── CounterAnimation.tsx
│   │   ├── LottiePlayer.tsx
│   │   └── ConfettiCelebration.tsx
│   └── charts/
│       ├── LineChart.tsx
│       ├── DonutChart.tsx
│       ├── BarChart.tsx
│       └── AreaChart.tsx
├── lib/
│   ├── contracts/
│   │   ├── abis/                        # Contract ABIs
│   │   ├── addresses.ts                 # Deployed contract addresses
│   │   └── instances.ts                 # Contract instances
│   ├── hooks/
│   │   ├── useInvestment.ts
│   │   ├── useEarnings.ts
│   │   ├── useMarketplace.ts
│   │   ├── useAchievements.ts
│   │   └── useContractEvents.ts
│   ├── supabase/
│   │   ├── client.ts                    # Client-side Supabase
│   │   ├── server.ts                    # Server-side Supabase
│   │   └── types.ts                     # Generated types
│   ├── utils/
│   │   ├── format.ts                    # Number/date formatting
│   │   ├── validation.ts                # Zod schemas
│   │   ├── calculations.ts              # APY, earnings calculations
│   │   └── constants.ts                 # App constants
│   └── animations/
│       ├── gsap-setup.ts                # GSAP configuration
│       ├── variants.ts                  # Framer Motion variants
│       └── easings.ts                   # Custom easing functions
├── public/
│   ├── animations/
│   │   ├── property-build/              # Canvas sequence frames
│   │   ├── success.json                 # Lottie success animation
│   │   ├── loading.json                 # Lottie loader
│   │   └── confetti-pattern.svg
│   ├── images/
│   │   ├── properties/                  # Mock property images
│   │   ├── badges/                      # Achievement badges
│   │   └── icons/                       # Custom icons
│   └── sounds/
│       └── achievement-unlock.mp3
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_add_achievements.sql
│   │   └── 003_add_marketplace.sql
│   └── config.toml
├── hardhat.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.local.example
└── README.md
```

### Environment Variables

```bash
# .env.local (not committed)

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Blockchain
NEXT_PUBLIC_CHAIN_ID=80001  # Mumbai testnet
NEXT_PUBLIC_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your-key
NEXT_PUBLIC_ALCHEMY_ID=your-alchemy-id

# Contract Addresses (updated after deployment)
NEXT_PUBLIC_LENDING_POOL_ADDRESS=0x...
NEXT_PUBLIC_TRANCHE_TOKENS_ADDRESS=0x...
NEXT_PUBLIC_INTEREST_DISTRIBUTOR_ADDRESS=0x...
NEXT_PUBLIC_SECONDARY_MARKET_ADDRESS=0x...
NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x...

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id

# Optional: The Graph
NEXT_PUBLIC_GRAPH_API_URL=https://api.thegraph.com/subgraphs/name/...

# Development
PRIVATE_KEY=your-deployer-private-key  # Only for deployment
ETHERSCAN_API_KEY=your-etherscan-key  # For contract verification
```

---

## Page 1: Property Investment Marketplace

### Page Structure

**URL**: `/invest`

**Sections** (in scroll order):
1. Hero with Canvas Sequence Animation
2. Platform Metrics Overview
3. How It Works (Progressive Disclosure)
4. Tranche Explainer (Senior vs Junior)
5. Property Gallery Grid
6. Analytics Dashboard (Public Stats)
7. Footer

### Section 1: Hero Canvas Sequence

**Concept**: Apple-style scroll-driven animation where a 3D property "builds" from foundation to completion as the user scrolls.

**Technical Implementation**:

```typescript
// components/animations/HeroCanvasSequence.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.register(ScrollTrigger);

interface CanvasSequenceProps {
  totalFrames: number;
  imageUrlPattern: string; // e.g., '/animations/property-build/frame-{number}.webp'
}

export function HeroCanvasSequence({
  totalFrames,
  imageUrlPattern,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const url = imageUrlPattern.replace('{number}', String(i).padStart(4, '0'));

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });

        images.push(img);
      }

      imagesRef.current = images;
      renderFrame(0); // Render first frame
    };

    loadImages();
  }, [totalFrames, imageUrlPattern]);

  // Setup canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();

      // High DPI support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Re-render current frame at new size
      renderFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Setup ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=3000', // 3000px of scroll
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (totalFrames - 1));
        renderFrame(frameIndex);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [totalFrames]);

  function renderFrame(index: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = imagesRef.current[index];
    if (!image) return;

    currentFrameRef.current = index;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to maintain aspect ratio
    const canvasAspect = canvas.width / canvas.height;
    const imageAspect = image.width / image.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imageAspect) {
      // Canvas is wider than image
      drawWidth = canvas.width;
      drawHeight = canvas.width / imageAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawHeight = canvas.height;
      drawWidth = canvas.height * imageAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    // Draw image centered and scaled
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  return (
    <div
      ref={containerRef}
      className="hero-canvas-section relative h-screen w-full bg-navy-900"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlaid content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none">
        <h1 className="display-1 text-center mb-6">
          Real Estate.<br />
          Real Yield.<br />
          <span className="text-gold-500">Real Simple.</span>
        </h1>

        <p className="body-large text-center max-w-2xl mb-12 text-gray-200">
          Earn 8-30% APY by investing in tokenized real estate bridge loans.
          Powered by blockchain, secured by property.
        </p>

        <div className="flex gap-4 pointer-events-auto">
          <button className="button-primary button-primary-lg">
            Start Investing
          </button>
          <button className="button-secondary button-secondary-lg">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70 animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="caption block mt-2">Scroll to explore</span>
      </div>
    </div>
  );
}
```

**Canvas Sequence Specs**:
- **Frame count**: 120 frames
- **Frame size**: 2048x1024px (desktop), 1024x768px (mobile)
- **Format**: WebP (optimal compression)
- **Naming**: `frame-0000.webp` to `frame-0119.webp`
- **Total scroll distance**: 3000px
- **FPS equivalent**: ~25px per frame

**Content Timeline**:
- **Frames 0-30**: Foundation and ground floor emerge
- **Frames 31-60**: Walls and structure build up
- **Frames 61-90**: Roof and exterior complete
- **Frames 91-120**: Interior finishes, landscaping, final polish

### Section 2: Platform Metrics Overview

**Animated Stats Bar** (appears after hero)

```typescript
// components/property/PlatformMetrics.tsx
'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';

interface MetricCardProps {
  label: string;
  value: number;
  format: 'currency' | 'percentage' | 'number';
  suffix?: string;
  decimals?: number;
}

function MetricCard({ label, value, format, suffix, decimals = 0 }: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getPrefix = () => {
    if (format === 'currency') return '$';
    return '';
  };

  const getSuffix = () => {
    if (format === 'percentage') return '%';
    if (suffix) return suffix;
    return '';
  };

  return (
    <div
      ref={ref}
      className="metric-card bg-white rounded-2xl p-8 shadow-md border border-gray-200 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
    >
      <p className="label text-gray-600 mb-2">{label}</p>
      {isInView && (
        <CountUp
          end={value}
          duration={2}
          decimals={decimals}
          prefix={getPrefix()}
          suffix={getSuffix()}
          separator=","
          className="data-large text-navy-900"
        />
      )}
    </div>
  );
}

export function PlatformMetrics() {
  // In production, fetch from smart contracts / API
  const metrics = {
    tvl: 1234567,
    activeLoans: 45,
    defaultRate: 0,
    averageAPY: 18.5,
    totalInvestors: 234,
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="heading-2 text-center mb-12">
          Platform Performance
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <MetricCard
            label="Total Value Locked"
            value={metrics.tvl}
            format="currency"
            decimals={0}
          />
          <MetricCard
            label="Active Loans"
            value={metrics.activeLoans}
            format="number"
          />
          <MetricCard
            label="Default Rate"
            value={metrics.defaultRate}
            format="percentage"
            decimals={1}
          />
          <MetricCard
            label="Average APY"
            value={metrics.averageAPY}
            format="percentage"
            decimals={1}
          />
          <MetricCard
            label="Total Investors"
            value={metrics.totalInvestors}
            format="number"
          />
        </div>
      </div>
    </section>
  );
}
```

### Section 3: How It Works

**Progressive Disclosure with Lottie Animations**

```typescript
// components/property/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Lottie from 'lottie-react';

// Import Lottie JSON files
import selectTrancheAnimation from '@/public/animations/select-tranche.json';
import investAnimation from '@/public/animations/invest-usdc.json';
import earnAnimation from '@/public/animations/earn-interest.json';

interface Step {
  number: number;
  title: string;
  description: string;
  animationData: any;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Choose Your Tranche',
    description: 'Select Senior (8-10% fixed) for stability or Junior (20-30% variable) for higher yields.',
    animationData: selectTrancheAnimation,
  },
  {
    number: 2,
    title: 'Invest Stablecoins',
    description: 'Deposit USDC (minimum $100) into your chosen tranche. Connect your wallet and approve the transaction.',
    animationData: investAnimation,
  },
  {
    number: 3,
    title: 'Earn Interest',
    description: 'Watch your earnings grow in real-time. Interest is distributed monthly via smart contracts.',
    animationData: earnAnimation,
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="step-card"
    >
      {/* Step number badge */}
      <div className="step-number">
        <span className="data-medium">{step.number}</span>
      </div>

      {/* Lottie animation */}
      <div className="step-animation">
        <Lottie
          animationData={step.animationData}
          loop={true}
          autoplay={isInView}
          style={{ width: '100%', height: '240px' }}
        />
      </div>

      {/* Step content */}
      <div className="step-content">
        <h3 className="heading-3 mb-3">{step.title}</h3>
        <p className="body text-gray-600">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="heading-2 text-center mb-4">
          How PropertyLend Works
        </h2>
        <p className="body-large text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Start earning passive income from real estate in three simple steps.
          No minimum experience required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Connecting lines (desktop only) */}
        <svg
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', top: '50%', left: 0 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="var(--gold-500)" />
            </marker>
          </defs>
          <path
            d="M 33% 0, L 66% 0"
            stroke="var(--gold-500)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            strokeDasharray="8 4"
          />
        </svg>
      </div>
    </section>
  );
}
```

### Section 4: Tranche Explainer

**3D Parallax Cards with Waterfall Visualization**

```typescript
// components/tranche/TrancheComparison.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from 'react';

interface TrancheCardProps {
  type: 'senior' | 'junior';
  apy: string;
  risk: string;
  description: string;
  features: string[];
}

function TrancheCard({ type, apy, risk, description, features }: TrancheCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize Vanilla Tilt
  useEffect(() => {
    if (!cardRef.current) return;

    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      perspective: 1000,
      scale: 1.02,
    });

    return () => {
      if (cardRef.current) {
        (cardRef.current as any).vanillaTilt?.destroy();
      }
    };
  }, []);

  const isSenior = type === 'senior';
  const bgClass = isSenior ? 'bg-gradient-senior' : 'bg-gradient-junior';
  const borderClass = isSenior ? 'border-navy-400' : 'border-purple-400';

  return (
    <motion.div
      ref={cardRef}
      className={`tranche-card ${bgClass} ${borderClass} relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />

      {/* Card content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="heading-3 text-white">
              {isSenior ? 'Senior' : 'Junior'} Tranche
            </h3>
            <span className={`badge ${isSenior ? 'badge--info' : 'badge--warning'}`}>
              {risk} Risk
            </span>
          </div>
          <p className="body text-white/80">{description}</p>
        </div>

        {/* APY Display */}
        <div className="mb-8 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <p className="caption text-white/60 mb-2">Annual Percentage Yield</p>
          <p className="tranche-card__apy">{apy}</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6" style={{ transform: 'translateZ(10px)' }}>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="body-small text-white/90">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="button-gold w-full"
        >
          {isExpanded ? 'Hide Details' : 'Learn More'}
        </button>

        {/* Expanded Content */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-6 pt-6 border-t border-white/20">
            <h4 className="heading-4 text-white mb-4">
              How {isSenior ? 'Senior' : 'Junior'} Works
            </h4>
            <p className="body-small text-white/80 mb-4">
              {isSenior
                ? 'Senior tranche investors receive fixed returns and have first priority in the payment waterfall. Your principal is protected by the junior tranche buffer.'
                : 'Junior tranche investors receive variable returns based on excess yields. You absorb any defaults but benefit from higher returns when all loans perform well.'}
            </p>
            {/* Add waterfall diagram here */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function TrancheComparison() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-purple-50">
      <div className="container">
        <h2 className="heading-2 text-center mb-4">
          Choose Your Investment Style
        </h2>
        <p className="body-large text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          PropertyLend offers two investment options to match your risk tolerance and yield expectations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TrancheCard
            type="senior"
            apy="8-10%"
            risk="Low"
            description="Stable, predictable returns with first-priority payments"
            features={[
              '80% of total pool capital',
              'Fixed APY regardless of loan performance',
              'First to receive monthly payments',
              'Protected by 20% junior buffer',
              'Ideal for conservative investors',
            ]}
          />

          <TrancheCard
            type="junior"
            apy="20-30%"
            risk="Medium-High"
            description="Higher yields with leveraged exposure to excess returns"
            features={[
              '20% of total pool capital',
              'Variable APY based on loan performance',
              'Receives all excess yields',
              '5x leverage on excess returns',
              'Ideal for experienced DeFi users',
            ]}
          />
        </div>

        {/* Waterfall Visualization */}
        <div className="mt-16 max-w-3xl mx-auto">
          <WaterfallVisualization />
        </div>
      </div>
    </section>
  );
}
```

### Section 5: Property Gallery Grid

**Filterable Grid with 3D Hover Effects**

```typescript
// app/(platform)/invest/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyCard } from '@/components/property/PropertyCard';
import { InvestmentModal } from '@/components/property/InvestmentModal';

// Mock data (in production, fetch from API/contracts)
const properties = [
  {
    id: '1',
    name: 'Austin Single Family Renovation',
    location: 'Austin, TX',
    imageUrl: '/images/properties/austin-sfh.jpg',
    loanAmount: 200000,
    interestRate: 20,
    ltv: 58,
    term: 6,
    status: 'active',
    borrowerExperience: 5,
    propertyType: 'single-family',
  },
  // ... more properties
];

type PropertyStatus = 'all' | 'active' | 'funded' | 'paid';
type PropertyType = 'all' | 'single-family' | 'multi-family' | 'commercial';

export default function InvestPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<PropertyStatus>('all');
  const [typeFilter, setTypeFilter] = useState<PropertyType>('all');
  const [sortBy, setSortBy] = useState<'apy' | 'ltv' | 'term'>('apy');

  // Filter and sort properties
  const filteredProperties = properties
    .filter((p) => statusFilter === 'all' || p.status === statusFilter)
    .filter((p) => typeFilter === 'all' || p.propertyType === typeFilter)
    .sort((a, b) => {
      if (sortBy === 'apy') return b.interestRate - a.interestRate;
      if (sortBy === 'ltv') return a.ltv - b.ltv;
      if (sortBy === 'term') return a.term - b.term;
      return 0;
    });

  return (
    <div className="py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-1 mb-4">Investment Opportunities</h1>
          <p className="body-large text-gray-600">
            Browse available properties and start earning. All investments are secured by real estate.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PropertyStatus)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="funded">Fully Funded</option>
              <option value="paid">Paid Off</option>
            </select>

            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as PropertyType)}
              className="input"
            >
              <option value="all">All Types</option>
              <option value="single-family">Single Family</option>
              <option value="multi-family">Multi-Family</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="label">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input"
            >
              <option value="apy">Highest APY</option>
              <option value="ltv">Lowest LTV</option>
              <option value="term">Shortest Term</option>
            </select>
          </div>
        </div>

        {/* Property Grid with AnimatePresence for smooth filtering */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                onClick={() => setSelectedProperty(property.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="body-large text-gray-500">
              No properties match your filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Investment Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <InvestmentModal
            propertyId={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

**PropertyCard Component**:

```typescript
// components/property/PropertyCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import Image from 'next/image';

interface Property {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  loanAmount: number;
  interestRate: number;
  ltv: number;
  term: number;
  status: string;
  borrowerExperience: number;
  propertyType: string;
}

interface PropertyCardProps {
  property: Property;
  index: number;
  onClick: () => void;
}

export function PropertyCard({ property, index, onClick }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize 3D tilt effect
  useEffect(() => {
    if (!cardRef.current) return;

    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
    });

    return () => {
      (cardRef.current as any)?.vanillaTilt?.destroy();
    };
  }, []);

  const getLTVColor = (ltv: number) => {
    if (ltv < 55) return 'badge--success';
    if (ltv < 62) return 'badge--warning';
    return 'badge--danger';
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        layout: { duration: 0.3 },
        opacity: { duration: 0.3, delay: index * 0.05 },
        scale: { duration: 0.3, delay: index * 0.05 },
      }}
      className="property-card cursor-pointer"
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Property Image */}
      <div className="relative property-card__image-container">
        <Image
          src={property.imageUrl}
          alt={property.name}
          width={400}
          height={300}
          className="property-card__image"
        />

        {/* Status Badge */}
        <div className="property-card__badge badge badge--success">
          {property.status}
        </div>

        {/* LTV Badge */}
        <div className={`property-card__badge property-card__badge--bottom-left badge ${getLTVColor(property.ltv)}`}>
          {property.ltv}% LTV
        </div>
      </div>

      {/* Card Content */}
      <div className="property-card__content">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="caption">{property.location}</span>
        </div>

        {/* Property Name */}
        <h3 className="heading-4 mb-4 line-clamp-2">{property.name}</h3>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="caption text-gray-500">Loan Amount</p>
            <p className="data-small">${property.loanAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="caption text-gray-500">APY</p>
            <p className="data-small text-success-600">{property.interestRate}%</p>
          </div>
          <div>
            <p className="caption text-gray-500">Term</p>
            <p className="data-small">{property.term} months</p>
          </div>
          <div>
            <p className="caption text-gray-500">Experience</p>
            <p className="data-small">{property.borrowerExperience} deals</p>
          </div>
        </div>

        {/* Progress Bar (if partially funded) */}
        <div className="mb-4">
          <div className="flex justify-between caption text-gray-500 mb-2">
            <span>Funding Progress</span>
            <span>75%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* CTA */}
        <button className="button-primary w-full">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
```

### Investment Modal Flow

**Multi-step animated modal for investment process**

```typescript
// components/property/InvestmentModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';

type Step = 'details' | 'amount' | 'confirm' | 'transaction' | 'success';

interface InvestmentModalProps {
  propertyId: string;
  onClose: () => void;
}

export function InvestmentModal({ propertyId, onClose }: InvestmentModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [selectedTranche, setSelectedTranche] = useState<'senior' | 'junior'>('senior');

  const { address } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Fetch property details (mock for now)
  const property = {
    id: propertyId,
    name: 'Austin Single Family Renovation',
    interestRate: 20,
    // ... other details
  };

  // Calculate projected earnings
  const projectedEarnings = investmentAmount * (selectedTranche === 'senior' ? 0.09 : 0.25);

  const handleInvest = async () => {
    setCurrentStep('transaction');

    try {
      // 1. Approve USDC (if needed)
      // 2. Deposit into pool
      writeContract({
        address: LENDING_POOL_ADDRESS,
        abi: LENDING_POOL_ABI,
        functionName: 'deposit',
        args: [
          parseUnits(investmentAmount.toString(), 6), // USDC has 6 decimals
          selectedTranche === 'senior',
        ],
      });
    } catch (error) {
      console.error('Investment failed:', error);
      // Show error toast
    }
  };

  // Success celebration
  useEffect(() => {
    if (isSuccess) {
      setCurrentStep('success');

      // Confetti explosion
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A2540', '#D4AF37', '#FFFFFF'],
      });

      // Record achievement
      checkAndUnlockAchievement('first_investment');

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">
            {currentStep === 'details' && 'Property Details'}
            {currentStep === 'amount' && 'Select Amount'}
            {currentStep === 'confirm' && 'Confirm Investment'}
            {currentStep === 'transaction' && 'Processing...'}
            {currentStep === 'success' && 'Success!'}
          </h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal__body">
          <AnimatePresence mode="wait">
            {/* Step 1: Property Details */}
            {currentStep === 'details' && (
              <PropertyDetailsStep
                property={property}
                onNext={() => setCurrentStep('amount')}
              />
            )}

            {/* Step 2: Amount Selection */}
            {currentStep === 'amount' && (
              <AmountSelectionStep
                amount={investmentAmount}
                tranche={selectedTranche}
                projectedEarnings={projectedEarnings}
                onAmountChange={setInvestmentAmount}
                onTrancheChange={setSelectedTranche}
                onNext={() => setCurrentStep('confirm')}
                onBack={() => setCurrentStep('details')}
              />
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 'confirm' && (
              <ConfirmationStep
                amount={investmentAmount}
                tranche={selectedTranche}
                property={property}
                projectedEarnings={projectedEarnings}
                onConfirm={handleInvest}
                onBack={() => setCurrentStep('amount')}
              />
            )}

            {/* Step 4: Transaction Processing */}
            {currentStep === 'transaction' && (
              <TransactionStep isConfirming={isConfirming} />
            )}

            {/* Step 5: Success */}
            {currentStep === 'success' && (
              <SuccessStep
                amount={investmentAmount}
                tranche={selectedTranche}
                projectedEarnings={projectedEarnings}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Individual step components would be defined below...

function AmountSelectionStep({
  amount,
  tranche,
  projectedEarnings,
  onAmountChange,
  onTrancheChange,
  onNext,
  onBack,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Tranche Selection */}
      <div>
        <label className="label mb-3 block">Select Investment Tranche</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onTrancheChange('senior')}
            className={`p-4 rounded-xl border-2 transition-all ${
              tranche === 'senior'
                ? 'border-navy-500 bg-navy-50'
                : 'border-gray-200 hover:border-navy-300'
            }`}
          >
            <div className="font-semibold mb-1">Senior</div>
            <div className="text-sm text-gray-600">8-10% Fixed</div>
          </button>
          <button
            onClick={() => onTrancheChange('junior')}
            className={`p-4 rounded-xl border-2 transition-all ${
              tranche === 'junior'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="font-semibold mb-1">Junior</div>
            <div className="text-sm text-gray-600">20-30% Variable</div>
          </button>
        </div>
      </div>

      {/* Amount Input with Slider */}
      <div>
        <label className="label mb-3 block">Investment Amount (USDC)</label>
        <div className="input-amount-wrapper mb-4">
          <input
            type="number"
            min="100"
            max="100000"
            step="100"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="input-amount"
          />
        </div>

        {/* Slider */}
        <input
          type="range"
          min="100"
          max="100000"
          step="100"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="slider w-full"
          style={{ '--value': `${((amount - 100) / (100000 - 100)) * 100}%` }}
        />

        <div className="flex justify-between caption text-gray-500 mt-2">
          <span>$100 min</span>
          <span>$100,000 max</span>
        </div>
      </div>

      {/* Projected Earnings */}
      <div className="bg-gold-50 border border-gold-200 rounded-xl p-6">
        <div className="text-center">
          <p className="label text-gold-800 mb-2">Projected Annual Earnings</p>
          <CountUp
            end={projectedEarnings}
            duration={1}
            decimals={2}
            prefix="$"
            separator=","
            className="data-large text-gold-700"
          />
          <p className="caption text-gold-600 mt-2">
            Based on {tranche === 'senior' ? '9%' : '25%'} average APY
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button onClick={onBack} className="button-secondary flex-1">
          Back
        </button>
        <button onClick={onNext} className="button-primary flex-1">
          Continue
        </button>
      </div>
    </motion.div>
  );
}
```

---

## Page 2: Secondary Token Marketplace

### Overview

The secondary marketplace allows investors to trade their tranche token positions (sSAFE for senior, jYIELD for junior) with other users. This provides liquidity for long-term investments and enables price discovery based on market demand.

### URL Structure

- **Main Page**: `/marketplace`
- **Listing Detail**: `/marketplace/[listingId]`
- **User Listings**: `/marketplace/my-listings`

### Page Sections

1. **Marketplace Hero** (Animated liquidity visualization)
2. **Filter & Search Bar**
3. **Token Listings Grid**
4. **Order Book Sidebar** (optional)
5. **Recent Trades Feed**
6. **Your Active Listings** (if wallet connected)

### Implementation

```typescript
// app/(platform)/marketplace/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { TokenListingCard } from '@/components/marketplace/TokenListingCard';
import { OrderBook } from '@/components/marketplace/OrderBook';
import { RecentTrades } from '@/components/marketplace/RecentTrades';
import { TradeModal } from '@/components/marketplace/TradeModal';
import { CreateListingModal } from '@/components/marketplace/CreateListingModal';

export default function MarketplacePage() {
  const { address } = useAccount();
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [filter, setFilter] = useState({
    tokenType: 'all' as 'all' | 'sSAFE' | 'jYIELD',
    priceRange: [0, 100000],
    sortBy: 'newest' as 'newest' | 'price-low' | 'price-high' | 'apy',
  });

  // Fetch listings from API/subgraph
  const { data: listings, isLoading } = useListings(filter);

  return (
    <div className="py-12">
      <div className="container">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="heading-1 mb-3">Token Marketplace</h1>
              <p className="body-large text-gray-600">
                Trade LP tokens representing investment positions. Buy existing stakes or sell yours for liquidity.
              </p>
            </div>

            {address && (
              <button
                onClick={() => setShowCreateListing(true)}
                className="button-primary"
              >
                + List Token for Sale
              </button>
            )}
          </div>

          {/* Market Stats */}
          <MarketStats />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Order Book */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderBook />
              <div className="mt-6">
                <RecentTrades />
              </div>
            </div>
          </div>

          {/* Main: Listings Grid */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
              {/* Token Type Filter */}
              <div className="flex gap-2">
                {['all', 'sSAFE', 'jYIELD'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter({ ...filter, tokenType: type as any })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter.tokenType === type
                        ? 'bg-navy-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? 'All Tokens' : type}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={filter.sortBy}
                onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as any })}
                className="input"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="apy">Highest APY</option>
              </select>
            </div>

            {/* Listings Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {listings?.map((listing, index) => (
                    <TokenListingCard
                      key={listing.id}
                      listing={listing}
                      index={index}
                      onClick={() => setSelectedListing(listing.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && listings?.length === 0 && (
              <div className="text-center py-20">
                <p className="body-large text-gray-500">
                  No listings found. Be the first to list a token!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trade Modal */}
      <AnimatePresence>
        {selectedListing && (
          <TradeModal
            listingId={selectedListing}
            onClose={() => setSelectedListing(null)}
          />
        )}
      </AnimatePresence>

      {/* Create Listing Modal */}
      <AnimatePresence>
        {showCreateListing && (
          <CreateListingModal onClose={() => setShowCreateListing(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Market Stats Component
function MarketStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="24h Volume" value={12345} format="currency" />
      <StatCard label="Total Listings" value={42} format="number" />
      <StatCard label="Avg. Price" value={1050} format="currency" />
      <StatCard label="Floor Price" value={980} format="currency" />
    </div>
  );
}

function StatCard({ label, value, format }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <p className="caption text-gray-500 mb-1">{label}</p>
      <p className="data-medium text-navy-900">
        {format === 'currency' ? `$${value.toLocaleString()}` : value.toLocaleString()}
      </p>
    </div>
  );
}
```

### Token Listing Card

```typescript
// components/marketplace/TokenListingCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface Listing {
  id: string;
  tokenType: 'sSAFE' | 'jYIELD';
  tokenAmount: number;
  askingPrice: number;
  currentValue: number;
  originalInvestment: number;
  earnedToDate: number;
  investmentDate: Date;
  currentAPY: number;
  seller: string;
  daysHeld: number;
}

interface TokenListingCardProps {
  listing: Listing;
  index: number;
  onClick: () => void;
}

export function TokenListingCard({ listing, index, onClick }: TokenListingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    VanillaTilt.init(cardRef.current, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
    });

    return () => (cardRef.current as any)?.vanillaTilt?.destroy();
  }, []);

  const isSenior = listing.tokenType === 'sSAFE';
  const discount = ((listing.currentValue - listing.askingPrice) / listing.currentValue) * 100;
  const totalReturn = ((listing.currentValue - listing.originalInvestment) / listing.originalInvestment) * 100;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
      className="token-listing-card bg-white rounded-2xl border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-navy-400 transition-all"
      onClick={onClick}
    >
      {/* Header */}
      <div className={`p-4 ${isSenior ? 'bg-navy-50' : 'bg-purple-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Token Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isSenior ? 'bg-navy-500' : 'bg-purple-500'
            }`}>
              <span className="font-mono font-bold text-white text-sm">
                {listing.tokenType}
              </span>
            </div>

            {/* Token Info */}
            <div>
              <div className="font-semibold text-navy-900">{listing.tokenType}</div>
              <div className="caption text-gray-600">
                {isSenior ? 'Senior Tranche' : 'Junior Tranche'}
              </div>
            </div>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="badge badge--success">
              {discount.toFixed(1)}% Off
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Price */}
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="data-large text-navy-900">
              ${listing.askingPrice.toLocaleString()}
            </span>
            <span className="caption text-gray-500">
              Value: ${listing.currentValue.toLocaleString()}
            </span>
          </div>
          <div className="caption text-gray-500">
            Original Investment: ${listing.originalInvestment.toLocaleString()}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="caption text-gray-500 mb-1">Earned</div>
            <div className="data-small text-success-600">
              ${listing.earnedToDate.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="caption text-gray-500 mb-1">Current APY</div>
            <div className="data-small text-navy-700">
              {listing.currentAPY.toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="caption text-gray-500 mb-1">Total Return</div>
            <div className={`data-small ${totalReturn >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Investment Info */}
        <div className="flex items-center justify-between caption text-gray-500">
          <span>Held for {listing.daysHeld} days</span>
          <span>Seller: {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</span>
        </div>

        {/* CTA */}
        <button className="button-primary w-full">
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
```

### Trade Modal

```typescript
// components/marketplace/TradeModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import confetti from 'canvas-confetti';

export function TradeModal({ listingId, onClose }) {
  const [step, setStep] = useState<'review' | 'transaction' | 'success'>('review');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { data: listing, isLoading } = useListing(listingId);
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isSuccess]);

  const handlePurchase = async () => {
    setStep('transaction');

    try {
      writeContract({
        address: SECONDARY_MARKET_ADDRESS,
        abi: SECONDARY_MARKET_ABI,
        functionName: 'buyListing',
        args: [listingId],
        value: parseUnits(listing.askingPrice.toString(), 6),
      });
    } catch (error) {
      console.error('Purchase failed:', error);
      setStep('review');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <motion.div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="modal__header">
          <h2 className="modal__title">
            {step === 'review' && 'Review Purchase'}
            {step === 'transaction' && 'Processing Transaction...'}
            {step === 'success' && 'Purchase Successful!'}
          </h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>

        <div className="modal__body">
          <AnimatePresence mode="wait">
            {step === 'review' && (
              <ReviewStep
                listing={listing}
                agreedToTerms={agreedToTerms}
                onAgree={setAgreedToTerms}
                onConfirm={handlePurchase}
                onCancel={onClose}
              />
            )}

            {step === 'transaction' && (
              <TransactionStep isConfirming={isConfirming} />
            )}

            {step === 'success' && (
              <SuccessStep listing={listing} onClose={onClose} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

---

## Personalized Investor Dashboard

### Overview

The dashboard is the **centerpiece of the personalized experience**. When a user connects their wallet, the dashboard:

1. Fetches their investment history from Supabase
2. Queries smart contracts for current positions
3. Calculates real-time earnings accrual
4. Displays historical performance charts
5. Shows achievement progress and unlocks

### URL

- **Dashboard**: `/dashboard`

### Dashboard Sections

1. **Welcome Hero** (Personalized greeting with wallet name/ENS)
2. **Portfolio Overview Cards** (Total invested, earned, active positions)
3. **Real-Time Earnings Ticker** (Continuously updating counter)
4. **Earnings Timeline Chart** (D3.js interactive chart)
5. **Property Performance Cards** (Each property with breakdown)
6. **Achievement Badges** (Gamification with progress rings)
7. **Quick Actions** (Invest more, trade tokens, withdraw)

### Implementation

```typescript
// app/(platform)/dashboard/page.tsx
'use client';

import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { PortfolioOverview } from '@/components/dashboard/PortfolioOverview';
import { EarningsTicker } from '@/components/dashboard/EarningsTicker';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { PropertyPerformanceCard } from '@/components/dashboard/PropertyPerformanceCard';
import { AchievementBadges } from '@/components/dashboard/AchievementBadges';
import { useInvestorData } from '@/lib/hooks/useInvestorData';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  // Redirect if not connected
  if (!isConnected) {
    redirect('/invest?connect=true');
  }

  // Fetch all investor data
  const {
    profile,
    investments,
    earnings,
    achievements,
    isLoading,
  } = useInvestorData(address);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="py-12">
      <div className="container max-w-7xl">
        {/* Welcome Section */}
        <WelcomeHero
          address={address}
          ensName={profile?.ensName}
          avatarUrl={profile?.avatarUrl}
          earnedSinceLastVisit={calculateEarnedSince(profile?.lastVisit, earnings)}
          isFirstVisit={profile?.isFirstVisit}
        />

        {/* Portfolio Overview */}
        <div className="mt-12">
          <PortfolioOverview
            totalInvested={calculateTotalInvested(investments)}
            totalEarned={calculateTotalEarned(earnings)}
            activeProperties={investments.filter(i => i.status === 'active').length}
            trancheAllocation={calculateTrancheAllocation(investments)}
          />
        </div>

        {/* Real-Time Earnings Ticker */}
        <div className="mt-12">
          <EarningsTicker
            investments={investments}
            lastUpdate={Date.now()}
          />
        </div>

        {/* Earnings Chart */}
        <div className="mt-12">
          <EarningsChart
            earningsHistory={earnings}
            timeframe="30d"
          />
        </div>

        {/* Property Performance */}
        <div className="mt-12">
          <h2 className="heading-2 mb-6">Your Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((investment, index) => (
              <PropertyPerformanceCard
                key={investment.id}
                investment={investment}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-12">
          <AchievementBadges
            achievements={achievements}
            nextMilestone={calculateNextMilestone(achievements)}
          />
        </div>
      </div>
    </div>
  );
}
```

### Welcome Hero Component

```typescript
// components/dashboard/WelcomeHero.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Lottie from 'lottie-react';
import welcomeAnimation from '@/public/animations/welcome.json';

interface WelcomeHeroProps {
  address: string;
  ensName?: string;
  avatarUrl?: string;
  earnedSinceLastVisit: number;
  isFirstVisit: boolean;
}

export function WelcomeHero({
  address,
  ensName,
  avatarUrl,
  earnedSinceLastVisit,
  isFirstVisit,
}: WelcomeHeroProps) {
  const displayName = ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <motion.div
      className="welcome-hero relative overflow-hidden bg-gradient-to-br from-navy-600 to-navy-900 rounded-3xl p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Greeting */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-full border-4 border-gold-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-navy-900">
                  {displayName[0].toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <h1 className="heading-1 text-white">
                {isFirstVisit ? 'Welcome' : 'Welcome back'},
              </h1>
              <motion.p
                className="heading-2 text-gold-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {displayName}
              </motion.p>
            </div>
          </motion.div>

          {!isFirstVisit && earnedSinceLastVisit > 0 && (
            <motion.div
              className="earnings-highlight bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
            >
              <p className="label text-gold-300 mb-2">You've earned</p>
              <div className="flex items-baseline gap-2">
                <CountUp
                  start={0}
                  end={earnedSinceLastVisit}
                  duration={2}
                  decimals={2}
                  prefix="$"
                  separator=","
                  className="data-large text-white"
                  useEasing
                />
                <motion.div
                  className="sparkle"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  ✨
                </motion.div>
              </div>
              <p className="caption text-gray-300 mt-2">
                since your last visit
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Lottie
            animationData={welcomeAnimation}
            loop={true}
            style={{ width: '100%', maxWidth: '400px', marginLeft: 'auto' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
```

### Real-Time Earnings Ticker

```typescript
// components/dashboard/EarningsTicker.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useEarningsAccrual } from '@/lib/hooks/useEarningsAccrual';

interface Investment {
  amount: number;
  apy: number;
  lastUpdateTimestamp: number;
}

interface EarningsTickerProps {
  investments: Investment[];
  lastUpdate: number;
}

export function EarningsTicker({ investments, lastUpdate }: EarningsTickerProps) {
  // Calculate total APY-weighted average
  const weightedAPY = useMemo(() => {
    const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
    if (totalAmount === 0) return 0;

    const weightedSum = investments.reduce(
      (sum, inv) => sum + inv.amount * (inv.apy / 100),
      0
    );

    return weightedSum / totalAmount;
  }, [investments]);

  const totalInvestment = useMemo(
    () => investments.reduce((sum, inv) => sum + inv.amount, 0),
    [investments]
  );

  // Custom hook for real-time accrual
  const currentEarnings = useEarningsAccrual(totalInvestment, weightedAPY * 100, lastUpdate);

  return (
    <motion.div
      className="earnings-ticker relative bg-gradient-to-br from-gold-50 to-gold-100 border-2 border-gold-300 rounded-3xl p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sparkle Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="sparkles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle-dot"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="heading-3 text-navy-900">Earnings Right Now</h2>
          <motion.div
            className="pulse-indicator w-3 h-3 rounded-full bg-success-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          className="earnings-display"
          animate={{
            textShadow: [
              '0 0 10px rgba(212, 175, 55, 0.3)',
              '0 0 20px rgba(212, 175, 55, 0.6)',
              '0 0 10px rgba(212, 175, 55, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="font-mono text-6xl font-bold text-navy-900">
            ${currentEarnings.toFixed(6)}
          </span>
        </motion.div>

        <p className="caption text-navy-700 mt-4">
          and counting... ({weightedAPY.toFixed(2)}% weighted APY)
        </p>

        {/* Earnings Per Second */}
        <div className="mt-6 flex items-center justify-center gap-8">
          <div>
            <p className="caption text-gray-600">Per Second</p>
            <p className="data-small text-navy-800">
              ${((totalInvestment * weightedAPY) / (365 * 24 * 60 * 60)).toFixed(8)}
            </p>
          </div>
          <div>
            <p className="caption text-gray-600">Per Day</p>
            <p className="data-small text-navy-800">
              ${((totalInvestment * weightedAPY) / 365).toFixed(4)}
            </p>
          </div>
          <div>
            <p className="caption text-gray-600">Per Year</p>
            <p className="data-small text-navy-800">
              ${(totalInvestment * weightedAPY).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

### Custom Hook: useEarningsAccrual

```typescript
// lib/hooks/useEarningsAccrual.ts
import { useState, useEffect, useMemo } from 'react';

/**
 * Continuously calculates and smoothly animates earnings accrual
 * @param initialInvestment - Total amount invested
 * @param apy - Annual Percentage Yield (as number, e.g., 9 for 9%)
 * @param lastUpdateTimestamp - Timestamp of last known earnings update
 * @returns Current accrued earnings with smooth interpolation
 */
export function useEarningsAccrual(
  initialInvestment: number,
  apy: number,
  lastUpdateTimestamp: number
) {
  const [displayEarnings, setDisplayEarnings] = useState(0);
  const [actualEarnings, setActualEarnings] = useState(0);

  // Calculate earnings per second
  const earningsPerSecond = useMemo(() => {
    return (initialInvestment * (apy / 100)) / (365 * 24 * 60 * 60);
  }, [initialInvestment, apy]);

  // Update actual earnings every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const secondsElapsed = (now - lastUpdateTimestamp) / 1000;
      setActualEarnings(earningsPerSecond * secondsElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [earningsPerSecond, lastUpdateTimestamp]);

  // Smooth interpolation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setDisplayEarnings((prev) => {
        const diff = actualEarnings - prev;

        // If close enough, snap to actual
        if (Math.abs(diff) < 0.0001) {
          return actualEarnings;
        }

        // Lerp (linear interpolation) - move 10% closer each frame
        return prev + diff * 0.1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [actualEarnings]);

  return displayEarnings;
}
```

### Achievement System

```typescript
// components/dashboard/AchievementBadges.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number; // 0-100 for partially completed achievements
}

interface AchievementBadgesProps {
  achievements: Achievement[];
  nextMilestone: {
    name: string;
    progress: number;
    target: number;
  };
}

export function AchievementBadges({ achievements, nextMilestone }: AchievementBadgesProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-2 mb-2">Achievements</h2>
          <p className="body text-gray-600">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>

        {/* Progress to next milestone */}
        <div className="text-right">
          <p className="label text-gray-600 mb-2">Next Milestone</p>
          <p className="body-small text-navy-800">{nextMilestone.name}</p>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={{ width: `${(nextMilestone.progress / nextMilestone.target) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="caption text-gray-500 mt-1">
            {nextMilestone.progress} / {nextMilestone.target}
          </p>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {achievements.map((achievement, index) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            index={index}
            onClick={() => setSelectedAchievement(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
}

function AchievementBadge({ achievement, index, onClick }) {
  return (
    <motion.div
      className="achievement-badge"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div className={`relative w-20 h-20 ${achievement.unlocked ? '' : 'grayscale opacity-40'}`}>
        <img
          src={achievement.iconUrl}
          alt={achievement.name}
          className="w-full h-full object-contain"
        />

        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
            }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(212, 175, 55, 0.3)',
                '0 0 30px rgba(212, 175, 55, 0.8)',
                '0 0 10px rgba(212, 175, 55, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      <p className="caption text-center mt-2 line-clamp-2">
        {achievement.name}
      </p>
    </motion.div>
  );
}
```

---

## Smart Contract Architecture

### Contract Overview

```
contracts/
├── core/
│   ├── LendingPool.sol
│   ├── TrancheTokens.sol
│   ├── InterestDistributor.sol
│   └── SecondaryMarket.sol
└── mocks/
    ├── MockUSDC.sol
    └── MockProperty.sol
```

### LendingPool.sol

**Purpose**: Main contract managing deposits, withdrawals, and loan origination

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./TrancheTokens.sol";
import "./InterestDistributor.sol";

/**
 * @title LendingPool
 * @notice Main lending pool contract managing senior/junior tranches
 * @dev Implements two-tranche system with waterfall payment distribution
 */
contract LendingPool is ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    // Constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant UNDERWRITER_ROLE = keccak256("UNDERWRITER_ROLE");

    uint256 public constant SENIOR_RATIO = 80; // 80% of pool
    uint256 public constant JUNIOR_RATIO = 20; // 20% of pool
    uint256 public constant MAX_LTV = 65; // Maximum loan-to-value ratio
    uint256 public constant BASIS_POINTS = 10000;

    // State variables
    IERC20 public immutable USDC;
    TrancheTokens public immutable trancheTokens;
    InterestDistributor public immutable interestDistributor;

    uint256 public totalDeposited;
    uint256 public totalDeployed;
    uint256 public seniorDeposited;
    uint256 public juniorDeposited;

    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate; // Basis points (e.g., 2000 = 20%)
        uint256 ltv; // Basis points
        uint256 term; // Months
        uint256 startTime;
        uint256 endTime;
        uint256 paidToDate;
        LoanStatus status;
        string propertyId; // Off-chain property identifier
    }

    enum LoanStatus {
        Pending,
        Active,
        PaidOff,
        Defaulted
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;

    // Events
    event Deposited(
        address indexed user,
        uint256 amount,
        bool isSenior,
        uint256 shares
    );
    event Withdrawn(
        address indexed user,
        uint256 shares,
        bool isSenior,
        uint256 amount
    );
    event LoanOriginated(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestRate,
        uint256 ltv
    );
    event LoanPayment(
        uint256 indexed loanId,
        uint256 amount,
        uint256 timestamp
    );
    event LoanDefaulted(uint256 indexed loanId, uint256 timestamp);

    // Custom errors
    error InsufficientBalance();
    error ExceedsMaxLTV();
    error InvalidTrancheRatio();
    error LoanNotActive();
    error Unauthorized();

    constructor(
        address _usdc,
        address _trancheTokens,
        address _interestDistributor
    ) {
        USDC = IERC20(_usdc);
        trancheTokens = TrancheTokens(_trancheTokens);
        interestDistributor = InterestDistributor(_interestDistributor);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Deposit USDC into specified tranche
     * @param amount USDC amount (6 decimals)
     * @param isSenior true for senior tranche, false for junior
     * @return shares Number of tranche tokens minted
     */
    function deposit(uint256 amount, bool isSenior)
        external
        nonReentrant
        returns (uint256 shares)
    {
        if (amount == 0) revert InsufficientBalance();

        // Transfer USDC from user
        USDC.safeTransferFrom(msg.sender, address(this), amount);

        // Calculate shares (1:1 for MVP, could implement dynamic pricing)
        shares = amount;

        // Update state
        totalDeposited += amount;
        if (isSenior) {
            seniorDeposited += amount;
        } else {
            juniorDeposited += amount;
        }

        // Mint tranche tokens
        trancheTokens.mint(msg.sender, shares, isSenior);

        emit Deposited(msg.sender, amount, isSenior, shares);
    }

    /**
     * @notice Withdraw USDC by burning tranche tokens
     * @param shares Number of tranche tokens to burn
     * @param isSenior true for senior tranche, false for junior
     * @return amount USDC amount withdrawn
     */
    function withdraw(uint256 shares, bool isSenior)
        external
        nonReentrant
        returns (uint256 amount)
    {
        if (shares == 0) revert InsufficientBalance();

        // Calculate withdrawal amount (1:1 for MVP)
        amount = shares;

        // Check available liquidity
        uint256 availableLiquidity = USDC.balanceOf(address(this));
        if (amount > availableLiquidity) revert InsufficientBalance();

        // Burn tranche tokens
        trancheTokens.burn(msg.sender, shares, isSenior);

        // Update state
        totalDeposited -= amount;
        if (isSenior) {
            seniorDeposited -= amount;
        } else {
            juniorDeposited -= amount;
        }

        // Transfer USDC to user
        USDC.safeTransfer(msg.sender, amount);

        emit Withdrawn(msg.sender, shares, isSenior, amount);
    }

    /**
     * @notice Originate a new loan (admin/underwriter only)
     * @param borrower Borrower address
     * @param amount Loan amount in USDC
     * @param interestRate Annual interest rate in basis points
     * @param ltv Loan-to-value ratio in basis points
     * @param term Loan term in months
     * @param propertyId Off-chain property identifier
     * @return loanId ID of the newly created loan
     */
    function originateLoan(
        address borrower,
        uint256 amount,
        uint256 interestRate,
        uint256 ltv,
        uint256 term,
        string calldata propertyId
    ) external onlyRole(UNDERWRITER_ROLE) returns (uint256 loanId) {
        // Validate LTV
        if (ltv > MAX_LTV * 100) revert ExceedsMaxLTV();

        // Check available capital
        uint256 availableCapital = totalDeposited - totalDeployed;
        if (amount > availableCapital) revert InsufficientBalance();

        // Create loan
        loanId = loanCounter++;
        uint256 endTime = block.timestamp + (term * 30 days);

        loans[loanId] = Loan({
            borrower: borrower,
            amount: amount,
            interestRate: interestRate,
            ltv: ltv,
            term: term,
            startTime: block.timestamp,
            endTime: endTime,
            paidToDate: 0,
            status: LoanStatus.Active,
            propertyId: propertyId
        });

        // Update deployed capital
        totalDeployed += amount;

        // Transfer USDC to borrower
        USDC.safeTransfer(borrower, amount);

        emit LoanOriginated(loanId, borrower, amount, interestRate, ltv);
    }

    /**
     * @notice Make loan payment (borrower pays interest/principal)
     * @param loanId Loan identifier
     * @param amount Payment amount in USDC
     */
    function makePayment(uint256 loanId, uint256 amount) external nonReentrant {
        Loan storage loan = loans[loanId];

        if (loan.status != LoanStatus.Active) revert LoanNotActive();
        if (msg.sender != loan.borrower) revert Unauthorized();

        // Transfer payment from borrower
        USDC.safeTransferFrom(msg.sender, address(this), amount);

        // Update loan
        loan.paidToDate += amount;

        // Distribute interest via waterfall
        interestDistributor.distributePayment(amount);

        emit LoanPayment(loanId, amount, block.timestamp);

        // Check if loan is fully paid
        uint256 totalOwed = loan.amount +
            (loan.amount * loan.interestRate * loan.term) / (BASIS_POINTS * 12);

        if (loan.paidToDate >= totalOwed) {
            loan.status = LoanStatus.PaidOff;
            totalDeployed -= loan.amount;
        }
    }

    /**
     * @notice Mark loan as defaulted (admin only)
     * @param loanId Loan identifier
     */
    function markDefault(uint256 loanId) external onlyRole(ADMIN_ROLE) {
        Loan storage loan = loans[loanId];

        if (loan.status != LoanStatus.Active) revert LoanNotActive();

        loan.status = LoanStatus.Defaulted;
        totalDeployed -= loan.amount;

        // Trigger default handling in InterestDistributor
        interestDistributor.handleDefault(loan.amount);

        emit LoanDefaulted(loanId, block.timestamp);
    }

    /**
     * @notice Get current tranche ratio
     * @return seniorPercent Senior tranche percentage
     * @return juniorPercent Junior tranche percentage
     */
    function getTrancheRatio()
        external
        view
        returns (uint256 seniorPercent, uint256 juniorPercent)
    {
        if (totalDeposited == 0) {
            return (0, 0);
        }

        seniorPercent = (seniorDeposited * 100) / totalDeposited;
        juniorPercent = (juniorDeposited * 100) / totalDeposited;
    }

    /**
     * @notice Get available liquidity for withdrawals
     */
    function availableLiquidity() external view returns (uint256) {
        return USDC.balanceOf(address(this));
    }
}
```

### TrancheTokens.sol

**Purpose**: ERC-20 tokens representing senior (sSAFE) and junior (jYIELD) positions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title TrancheTokens
 * @notice ERC-20 tokens for senior (sSAFE) and junior (jYIELD) tranches
 * @dev Transferable tokens enabling secondary market trading
 */
contract TrancheTokens is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    // Senior and Junior token contracts
    SeniorToken public immutable sSAFE;
    JuniorToken public immutable jYIELD;

    constructor() {
        sSAFE = new SeniorToken(address(this));
        jYIELD = new JuniorToken(address(this));

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(
        address to,
        uint256 amount,
        bool isSenior
    ) external onlyRole(MINTER_ROLE) {
        if (isSenior) {
            sSAFE.mint(to, amount);
        } else {
            jYIELD.mint(to, amount);
        }
    }

    function burn(
        address from,
        uint256 amount,
        bool isSenior
    ) external onlyRole(BURNER_ROLE) {
        if (isSenior) {
            sSAFE.burn(from, amount);
        } else {
            jYIELD.burn(from, amount);
        }
    }
}

contract SeniorToken is ERC20 {
    address public immutable controller;

    constructor(address _controller) ERC20("Senior SAFE Token", "sSAFE") {
        controller = _controller;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == controller, "Only controller");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == controller, "Only controller");
        _burn(from, amount);
    }
}

contract JuniorToken is ERC20 {
    address public immutable controller;

    constructor(address _controller) ERC20("Junior YIELD Token", "jYIELD") {
        controller = _controller;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == controller, "Only controller");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == controller, "Only controller");
        _burn(from, amount);
    }
}
```

### SecondaryMarket.sol

**Purpose**: Enable trading of tranche tokens between users

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./TrancheTokens.sol";

/**
 * @title SecondaryMarket
 * @notice Marketplace for trading tranche tokens (sSAFE, jYIELD)
 * @dev Simple order book implementation for MVP
 */
contract SecondaryMarket is ReentrancyGuard {
    using SafeERC20 for IERC20;

    TrancheTokens public immutable trancheTokens;
    IERC20 public immutable USDC;

    uint256 public constant PLATFORM_FEE_BPS = 50; // 0.5%
    uint256 public constant BASIS_POINTS = 10000;

    address public feeRecipient;

    struct Listing {
        address seller;
        bool isSenior;
        uint256 tokenAmount;
        uint256 pricePerToken; // USDC per token (6 decimals)
        ListingStatus status;
        uint256 createdAt;
    }

    enum ListingStatus {
        Active,
        Sold,
        Cancelled
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;

    // Events
    event ListingCreated(
        uint256 indexed listingId,
        address indexed seller,
        bool isSenior,
        uint256 tokenAmount,
        uint256 pricePerToken
    );
    event ListingCancelled(uint256 indexed listingId);
    event ListingSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 tokenAmount,
        uint256 totalPrice
    );

    error ListingNotActive();
    error Unauthorized();
    error InsufficientTokenBalance();

    constructor(address _trancheTokens, address _usdc, address _feeRecipient) {
        trancheTokens = TrancheTokens(_trancheTokens);
        USDC = IERC20(_usdc);
        feeRecipient = _feeRecipient;
    }

    /**
     * @notice Create a listing to sell tranche tokens
     * @param isSenior true for sSAFE, false for jYIELD
     * @param tokenAmount Amount of tokens to sell
     * @param pricePerToken Price per token in USDC (6 decimals)
     */
    function createListing(
        bool isSenior,
        uint256 tokenAmount,
        uint256 pricePerToken
    ) external nonReentrant returns (uint256 listingId) {
        IERC20 token = IERC20(
            isSenior
                ? address(trancheTokens.sSAFE())
                : address(trancheTokens.jYIELD())
        );

        // Check seller has enough tokens
        if (token.balanceOf(msg.sender) < tokenAmount) {
            revert InsufficientTokenBalance();
        }

        // Transfer tokens to escrow
        token.safeTransferFrom(msg.sender, address(this), tokenAmount);

        // Create listing
        listingId = listingCounter++;
        listings[listingId] = Listing({
            seller: msg.sender,
            isSenior: isSenior,
            tokenAmount: tokenAmount,
            pricePerToken: pricePerToken,
            status: ListingStatus.Active,
            createdAt: block.timestamp
        });

        emit ListingCreated(
            listingId,
            msg.sender,
            isSenior,
            tokenAmount,
            pricePerToken
        );
    }

    /**
     * @notice Buy tokens from a listing
     * @param listingId Listing identifier
     */
    function buyListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];

        if (listing.status != ListingStatus.Active) revert ListingNotActive();

        // Calculate total price and fee
        uint256 totalPrice = listing.tokenAmount * listing.pricePerToken;
        uint256 platformFee = (totalPrice * PLATFORM_FEE_BPS) / BASIS_POINTS;
        uint256 sellerProceeds = totalPrice - platformFee;

        // Transfer USDC from buyer
        USDC.safeTransferFrom(msg.sender, listing.seller, sellerProceeds);
        USDC.safeTransferFrom(msg.sender, feeRecipient, platformFee);

        // Transfer tokens from escrow to buyer
        IERC20 token = IERC20(
            listing.isSenior
                ? address(trancheTokens.sSAFE())
                : address(trancheTokens.jYIELD())
        );
        token.safeTransfer(msg.sender, listing.tokenAmount);

        // Update listing status
        listing.status = ListingStatus.Sold;

        emit ListingSold(listingId, msg.sender, listing.tokenAmount, totalPrice);
    }

    /**
     * @notice Cancel a listing and return tokens to seller
     * @param listingId Listing identifier
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];

        if (listing.status != ListingStatus.Active) revert ListingNotActive();
        if (listing.seller != msg.sender) revert Unauthorized();

        // Return tokens to seller
        IERC20 token = IERC20(
            listing.isSenior
                ? address(trancheTokens.sSAFE())
                : address(trancheTokens.jYIELD())
        );
        token.safeTransfer(listing.seller, listing.tokenAmount);

        // Update listing status
        listing.status = ListingStatus.Cancelled;

        emit ListingCancelled(listingId);
    }

    /**
     * @notice Get all active listings
     * @return activeListings Array of active listing IDs
     */
    function getActiveListings()
        external
        view
        returns (uint256[] memory activeListings)
    {
        // Count active listings
        uint256 count = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].status == ListingStatus.Active) {
                count++;
            }
        }

        // Populate array
        activeListings = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].status == ListingStatus.Active) {
                activeListings[index] = i;
                index++;
            }
        }
    }
}
```

---

## Backend Infrastructure

### Supabase Database Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (wallet-based authentication)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  ens_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_visit TIMESTAMPTZ DEFAULT NOW(),
  is_first_visit BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on wallet_address for fast lookups
CREATE INDEX idx_users_wallet ON users(wallet_address);

-- Investments table (tracks all user investments)
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL,
  tranche TEXT NOT NULL CHECK (tranche IN ('senior', 'junior')),
  amount NUMERIC NOT NULL,
  shares NUMERIC NOT NULL,
  tx_hash TEXT NOT NULL,
  block_number BIGINT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'traded')),
  invested_at TIMESTAMPTZ DEFAULT NOW(),
  withdrawn_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_investments_user ON investments(user_id);
CREATE INDEX idx_investments_property ON investments(property_id);

-- Earnings table (historical tracking of interest payments)
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  tx_hash TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_earnings_investment ON earnings(investment_id);
CREATE INDEX idx_earnings_date ON earnings(earned_at);

-- Achievements table (gamification)
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User achievements (tracks unlocked achievements)
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- Token listings (secondary marketplace)
CREATE TABLE token_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id BIGINT UNIQUE NOT NULL, -- On-chain listing ID
  token_type TEXT NOT NULL CHECK (token_type IN ('sSAFE', 'jYIELD')),
  token_amount NUMERIC NOT NULL,
  price_per_token NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  tx_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sold_at TIMESTAMPTZ,
  buyer_id UUID REFERENCES users(id)
);

CREATE INDEX idx_listings_seller ON token_listings(seller_id);
CREATE INDEX idx_listings_status ON token_listings(status);

-- Properties table (mock properties for testnet)
CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  loan_amount NUMERIC NOT NULL,
  interest_rate NUMERIC NOT NULL,
  ltv NUMERIC NOT NULL,
  term INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'funded', 'paid', 'defaulted')),
  borrower_experience INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Users: can only read their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Investments: users can only see their own
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own investments"
  ON investments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own investments"
  ON investments FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Earnings: users can only see their own
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own earnings"
  ON earnings FOR SELECT
  USING (
    investment_id IN (
      SELECT id FROM investments WHERE user_id = auth.uid()
    )
  );

-- User achievements: users can only see their own
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (user_id = auth.uid());

-- Listings: public read, users can manage their own
ALTER TABLE token_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active listings"
  ON token_listings FOR SELECT
  USING (status = 'active' OR seller_id = auth.uid() OR buyer_id = auth.uid());

CREATE POLICY "Users can create own listings"
  ON token_listings FOR INSERT
  WITH CHECK (seller_id = auth.uid());

-- Properties: public read
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  USING (true);

-- Functions

-- Update user's last visit timestamp
CREATE OR REPLACE FUNCTION update_last_visit()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET last_visit = NOW(), is_first_visit = FALSE
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_last_visit
  AFTER INSERT ON investments
  FOR EACH ROW
  EXECUTE FUNCTION update_last_visit();

-- Seed default achievements
INSERT INTO achievements (id, name, description, icon_url, requirement_type, requirement_value)
VALUES
  ('first_investment', 'First Investment', 'Made your first investment in PropertyLend', '/badges/first-investment.png', 'investment_count', 1),
  ('diversified', 'Diversified Investor', 'Invested in 3 different properties', '/badges/diversified.png', 'unique_properties', 3),
  ('hundred_club', '$100 Club', 'Earned $100 in total interest', '/badges/hundred-club.png', 'total_earned', 100),
  ('thousand_club', '$1,000 Club', 'Earned $1,000 in total interest', '/badges/thousand-club.png', 'total_earned', 1000),
  ('diamond_hands', 'Diamond Hands', 'Held an investment for 6+ months', '/badges/diamond-hands.png', 'days_held', 180),
  ('whale', 'Whale Investor', 'Total investments exceed $10,000', '/badges/whale.png', 'total_invested', 10000),
  ('both_tranches', 'Balanced Investor', 'Invested in both Senior and Junior tranches', '/badges/both-tranches.png', 'tranche_diversity', 2);
```

### API Routes

```typescript
// app/api/investments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user's investments with earnings
  const { data: investments, error } = await supabase
    .from('investments')
    .select(`
      *,
      earnings (
        amount,
        earned_at
      ),
      properties (
        name,
        location,
        image_url,
        interest_rate
      )
    `)
    .eq('user_id', user.id)
    .order('invested_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ investments });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { propertyId, tranche, amount, shares, txHash, blockNumber } = body;

  // Insert investment
  const { data: investment, error } = await supabase
    .from('investments')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      tranche,
      amount,
      shares,
      tx_hash: txHash,
      block_number: blockNumber,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Check for achievement unlocks
  await checkAchievements(user.id);

  return NextResponse.json({ investment });
}
```

### Wallet-Based Authentication

```typescript
// lib/supabase/auth.ts
import { createClient } from './client';
import { SiweMessage } from 'siwe';

/**
 * Authenticate user with wallet signature
 * @param address Wallet address
 * @param message Signed message
 * @param signature Message signature
 */
export async function authenticateWithWallet(
  address: string,
  message: string,
  signature: string
) {
  // Verify signature
  const siweMessage = new SiweMessage(message);
  const { data: verified } = await siweMessage.verify({ signature });

  if (!verified) {
    throw new Error('Invalid signature');
  }

  const supabase = createClient();

  // Check if user exists
  let { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', address.toLowerCase())
    .single();

  // Create user if doesn't exist
  if (!user) {
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        wallet_address: address.toLowerCase(),
      })
      .select()
      .single();

    if (error) throw error;
    user = newUser;
  }

  // Create session (using Supabase Auth with custom provider)
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email: `${address.toLowerCase()}@wallet.local`,
    password: signature, // Use signature as password
  });

  if (error) {
    // If user doesn't exist in auth, create them
    await supabase.auth.signUp({
      email: `${address.toLowerCase()}@wallet.local`,
      password: signature,
    });
  }

  return { user, session };
}
```

---

## 7. Animation Implementation

This section provides complete, production-ready code examples for all animation libraries and techniques used in the MVP.

### 7.1 GSAP ScrollTrigger Setup

**Installation & Configuration**

```bash
npm install gsap @gsap/react
```

**Core Setup (`lib/gsap.ts`)**

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger };

// Configuration defaults
export const GSAP_CONFIG = {
  ease: 'power3.out',
  duration: 1.2,
  scrollTriggerDefaults: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
};
```

**Canvas Scroll Sequence Animation**

```typescript
// components/animations/CanvasSequence.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CanvasSequenceProps {
  frameCount: number;
  frameUrlPattern: string; // e.g., "/frames/hero/frame-{index}.jpg"
  scrollHeight?: number;
}

export function CanvasSequence({
  frameCount = 120,
  frameUrlPattern,
  scrollHeight = 3000,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      renderFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);

    // Preload all frames
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = frameUrlPattern.replace('{index}', String(i).padStart(4, '0'));
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // All images loaded, initialize scroll
          initScrollTrigger();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      const img = images[Math.floor(index)];
      if (!img || !img.complete) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to cover canvas while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        // Image is wider
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function initScrollTrigger() {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${scrollHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              frameCount - 1,
              Math.floor(self.progress * frameCount)
            );
            currentFrameRef.current = frameIndex;
            renderFrame(frameIndex);
          },
        },
      });
    }

    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [frameCount, frameUrlPattern, scrollHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
```

**Parallax & Progressive Disclosure**

```typescript
// hooks/useScrollAnimations.ts
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useParallaxCard(speed: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [speed]);

  return elementRef;
}

export function useFadeInUp() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, []);

  return elementRef;
}

export function useStaggerReveal(childSelector: string = '.stagger-child') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [childSelector]);

  return containerRef;
}
```

### 7.2 Framer Motion Variants

**Installation**

```bash
npm install framer-motion
```

**Reusable Animation Variants (`lib/motion-variants.ts`)**

```typescript
import { Variants } from 'framer-motion';

// Container variants for stagger children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item variants for stagger children
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing curve
    },
  },
};

// Card hover variants
export const cardHoverVariants: Variants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
  },
  hover: {
    scale: 1.02,
    z: 50,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Modal variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Badge spring variants
export const badgeVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
      duration: 0.8,
    },
  },
};

// Number counter variants
export const numberCounterVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};
```

**Property Card with 3D Tilt**

```typescript
// components/PropertyCard.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { cardHoverVariants } from '@/lib/motion-variants';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    imageUrl: string;
    location: string;
    targetRaise: number;
    apy: { senior: number; junior: number };
    ltv: number;
  };
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth mouse tracking
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onClick={onClick}
      className="relative bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          style={{ transform: 'translateZ(30px)' }}
          className="text-xl font-semibold text-navy-900 mb-2"
        >
          {property.name}
        </motion.h3>

        <motion.p
          style={{ transform: 'translateZ(25px)' }}
          className="text-navy-600 text-sm mb-4"
        >
          {property.location}
        </motion.p>

        {/* Metrics Grid */}
        <motion.div
          style={{ transform: 'translateZ(35px)' }}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <p className="text-navy-500 text-xs mb-1">Target Raise</p>
            <p className="text-navy-900 font-semibold">
              ${(property.targetRaise / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className="text-navy-500 text-xs mb-1">LTV</p>
            <p className="text-navy-900 font-semibold">{property.ltv}%</p>
          </div>
          <div>
            <p className="text-navy-500 text-xs mb-1">Senior APY</p>
            <p className="text-gold-600 font-semibold">{property.apy.senior}%</p>
          </div>
          <div>
            <p className="text-navy-500 text-xs mb-1">Junior APY</p>
            <p className="text-gold-600 font-semibold">{property.apy.junior}%</p>
          </div>
        </motion.div>
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent flex items-end justify-center pb-8"
        style={{ transform: 'translateZ(40px)' }}
      >
        <span className="text-white font-semibold">View Details</span>
      </motion.div>
    </motion.div>
  );
}
```

**Investment Modal with Spring Animation**

```typescript
// components/modals/InvestmentModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '@/lib/motion-variants';
import { X } from 'lucide-react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function InvestmentModal({ isOpen, onClose, children }: InvestmentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-navy-100 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-navy-900">
                  Invest in Property
                </h2>
                <button
                  onClick={onClose}
                  className="text-navy-500 hover:text-navy-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### 7.3 Lottie Animations

**Installation**

```bash
npm install lottie-react
```

**Lottie Player Component**

```typescript
// components/animations/LottiePlayer.tsx
'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  speed?: number;
  className?: string;
  playOnHover?: boolean;
}

export function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  onComplete,
  speed = 1,
  className = '',
  playOnHover = false,
}: LottiePlayerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  const handleMouseEnter = () => {
    if (playOnHover && lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !playOnHover}
        onComplete={onComplete}
      />
    </div>
  );
}
```

**How It Works Section with Lottie**

```typescript
// components/sections/HowItWorks.tsx
'use client';

import { LottiePlayer } from '@/components/animations/LottiePlayer';
import depositAnimation from '@/assets/lottie/deposit.json';
import earningsAnimation from '@/assets/lottie/earnings.json';
import withdrawAnimation from '@/assets/lottie/withdraw.json';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/motion-variants';

const steps = [
  {
    number: 1,
    title: 'Connect & Deposit',
    description: 'Choose your tranche and deposit USDC into the lending pool',
    animation: depositAnimation,
  },
  {
    number: 2,
    title: 'Earn Automatically',
    description: 'Watch your earnings grow as borrowers make payments',
    animation: earningsAnimation,
  },
  {
    number: 3,
    title: 'Withdraw Anytime',
    description: 'Redeem your tokens for USDC plus accrued interest',
    animation: withdrawAnimation,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-navy-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Get started with DeFi real estate lending in three simple steps
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-12"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="text-center"
            >
              {/* Lottie Animation */}
              <div className="mb-6 flex justify-center">
                <LottiePlayer
                  animationData={step.animation}
                  loop={true}
                  autoplay={true}
                  className="w-48 h-48"
                />
              </div>

              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-600 text-white font-bold text-xl mb-4">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-navy-900 mb-3">
                {step.title}
              </h3>
              <p className="text-navy-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Success State with Confetti**

```typescript
// components/SuccessConfetti.tsx
'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LottiePlayer } from './animations/LottiePlayer';
import successAnimation from '@/assets/lottie/success-checkmark.json';

interface SuccessConfettiProps {
  trigger: boolean;
}

export function SuccessConfetti({ trigger }: SuccessConfettiProps) {
  useEffect(() => {
    if (trigger) {
      // Fire confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#D4AF37', '#0A2540', '#FFFFFF'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#D4AF37', '#0A2540', '#FFFFFF'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  if (!trigger) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <LottiePlayer
        animationData={successAnimation}
        loop={false}
        autoplay={true}
        className="w-64 h-64"
      />
    </div>
  );
}
```

### 7.4 D3.js Data Visualizations

**Installation**

```bash
npm install d3 @types/d3
```

**Morphing APY Chart**

```typescript
// components/charts/APYChart.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface APYDataPoint {
  date: Date;
  seniorAPY: number;
  juniorAPY: number;
}

interface APYChartProps {
  data: APYDataPoint[];
  width?: number;
  height?: number;
}

export function APYChart({ data, width = 800, height = 400 }: APYChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.seniorAPY, d.juniorAPY)) as number,
      ])
      .nice()
      .range([innerHeight, 0]);

    // Line generators
    const seniorLine = d3
      .line<APYDataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.seniorAPY))
      .curve(d3.curveMonotoneX);

    const juniorLine = d3
      .line<APYDataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.juniorAPY))
      .curve(d3.curveMonotoneX);

    // Area generator for gradient fill
    const area = d3
      .area<APYDataPoint>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.seniorAPY))
      .curve(d3.curveMonotoneX);

    // Gradient definitions
    const defs = svg.append('defs');

    const seniorGradient = defs
      .append('linearGradient')
      .attr('id', 'seniorGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    seniorGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#D4AF37')
      .attr('stop-opacity', 0.3);

    seniorGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#D4AF37')
      .attr('stop-opacity', 0);

    // X Axis
    const xAxis = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6)
          .tickFormat((d) => d3.timeFormat('%b %Y')(d as Date))
      );

    xAxis.selectAll('text').attr('fill', '#0A2540').attr('font-size', '12px');
    xAxis.selectAll('line').attr('stroke', '#E5E7EB');
    xAxis.select('.domain').attr('stroke', '#E5E7EB');

    // Y Axis
    const yAxis = g.append('g').call(
      d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat((d) => `${d}%`)
    );

    yAxis.selectAll('text').attr('fill', '#0A2540').attr('font-size', '12px');
    yAxis.selectAll('line').attr('stroke', '#E5E7EB');
    yAxis.select('.domain').attr('stroke', '#E5E7EB');

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .select('.domain')
      .remove();

    // Area path with animation
    const areaPath = g
      .append('path')
      .datum(data)
      .attr('fill', 'url(#seniorGradient)')
      .attr('d', area);

    // Animate area
    const areaLength = (areaPath.node() as SVGPathElement).getTotalLength();
    areaPath
      .attr('stroke-dasharray', `${areaLength} ${areaLength}`)
      .attr('stroke-dashoffset', areaLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    // Senior line
    const seniorPath = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#D4AF37')
      .attr('stroke-width', 3)
      .attr('d', seniorLine);

    // Junior line
    const juniorPath = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0A2540')
      .attr('stroke-width', 3)
      .attr('d', juniorLine);

    // Animate lines
    [seniorPath, juniorPath].forEach((path) => {
      const length = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr('stroke-dasharray', `${length} ${length}`)
        .attr('stroke-dashoffset', length)
        .transition()
        .duration(1500)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);
    });

    // Interactive dots
    const dotsGroup = g.append('g');

    // Senior dots
    dotsGroup
      .selectAll('.senior-dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'senior-dot')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.seniorAPY))
      .attr('r', 0)
      .attr('fill', '#D4AF37')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);

        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'block';
          tooltipRef.current.style.left = `${event.pageX + 10}px`;
          tooltipRef.current.style.top = `${event.pageY - 10}px`;
          tooltipRef.current.innerHTML = `
            <div class="font-semibold">Senior Tranche</div>
            <div class="text-sm">${d3.timeFormat('%b %d, %Y')(d.date)}</div>
            <div class="text-gold-600 font-bold">${d.seniorAPY.toFixed(2)}% APY</div>
          `;
        }
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 4);

        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      })
      .transition()
      .delay((d, i) => i * 50 + 1500)
      .duration(300)
      .attr('r', 4);

    // Legend
    const legend = g
      .append('g')
      .attr('transform', `translate(${innerWidth - 120}, 0)`);

    legend
      .append('line')
      .attr('x1', 0)
      .attr('x2', 40)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#D4AF37')
      .attr('stroke-width', 3);

    legend
      .append('text')
      .attr('x', 50)
      .attr('y', 5)
      .text('Senior')
      .attr('fill', '#0A2540')
      .attr('font-size', '14px');

    legend
      .append('line')
      .attr('x1', 0)
      .attr('x2', 40)
      .attr('y1', 25)
      .attr('y2', 25)
      .attr('stroke', '#0A2540')
      .attr('stroke-width', 3);

    legend
      .append('text')
      .attr('x', 50)
      .attr('y', 30)
      .text('Junior')
      .attr('fill', '#0A2540')
      .attr('font-size', '14px');
  }, [data, width, height]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        className="absolute hidden bg-white border border-navy-200 rounded-lg shadow-lg p-3 pointer-events-none z-10"
      />
    </div>
  );
}
```

### 7.5 Three.js 3D Property Visualization

**Installation**

```bash
npm install three @react-three/fiber @react-three/drei
```

**3D Property Model Viewer**

```typescript
// components/3d/PropertyViewer.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function BuildingModel() {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Main building structure */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 2.5]} />
        <meshStandardMaterial
          color="#E5E7EB"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Windows - Grid pattern */}
      {Array.from({ length: 4 }).map((_, floor) =>
        Array.from({ length: 3 }).map((_, col) => (
          <mesh
            key={`window-${floor}-${col}`}
            position={[-0.8 + col * 0.8, 0.5 + floor * 0.9, 1.26]}
            castShadow
          >
            <boxGeometry args={[0.4, 0.6, 0.05]} />
            <meshStandardMaterial
              color="#0A2540"
              emissive="#D4AF37"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))
      )}

      {/* Roof */}
      <mesh position={[0, 4.2, 0]} castShadow>
        <boxGeometry args={[3.2, 0.3, 2.7]} />
        <meshStandardMaterial color="#0A2540" />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 0.6, 1.26]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.6} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#D4AF37" />
    </>
  );
}

export function PropertyViewer() {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-navy-900 to-navy-800 rounded-xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} />
        <Suspense fallback={null}>
          <Lights />
          <BuildingModel />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### 7.6 Real-Time Earnings Ticker

```typescript
// components/dashboard/EarningsTicker.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface EarningsTickerProps {
  initialInvestment: number;
  apy: number;
  lastUpdateTimestamp: number;
}

export function EarningsTicker({
  initialInvestment,
  apy,
  lastUpdateTimestamp,
}: EarningsTickerProps) {
  const [displayEarnings, setDisplayEarnings] = useState(0);
  const earningsRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Calculate earnings per second
  const earningsPerSecond = (initialInvestment * (apy / 100)) / (365 * 24 * 60 * 60);

  useEffect(() => {
    // Calculate initial earnings based on time since last update
    const secondsElapsed = (Date.now() - lastUpdateTimestamp) / 1000;
    const initialEarnings = earningsPerSecond * secondsElapsed;
    earningsRef.current = initialEarnings;
    setDisplayEarnings(initialEarnings);

    // Animate earnings increment
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000; // in seconds
      lastTime = now;

      // Increment earnings
      earningsRef.current += earningsPerSecond * deltaTime;

      // Smooth interpolation for display (lerp)
      setDisplayEarnings((prev) => {
        const diff = earningsRef.current - prev;
        return prev + diff * 0.1; // Smooth following
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [earningsPerSecond, lastUpdateTimestamp]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gradient-to-br from-gold-600 to-gold-700 rounded-2xl p-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider">
          Real-Time Earnings
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-xs">Live</span>
        </div>
      </div>

      <div className="text-5xl font-bold text-white font-mono tracking-tight">
        {formatCurrency(displayEarnings)}
      </div>

      <div className="mt-4 flex items-center justify-between text-white/70 text-sm">
        <span>{apy}% APY</span>
        <span>+{formatCurrency(earningsPerSecond)}/sec</span>
      </div>
    </motion.div>
  );
}
```

### 7.7 Performance Optimization

**Lazy Loading Animation Components**

```typescript
// components/animations/index.ts
import dynamic from 'next/dynamic';

export const CanvasSequence = dynamic(
  () => import('./CanvasSequence').then((mod) => mod.CanvasSequence),
  { ssr: false }
);

export const PropertyViewer = dynamic(
  () => import('../3d/PropertyViewer').then((mod) => mod.PropertyViewer),
  { ssr: false, loading: () => <div className="w-full h-[400px] bg-navy-100 animate-pulse rounded-xl" /> }
);

export const APYChart = dynamic(
  () => import('../charts/APYChart').then((mod) => mod.APYChart),
  { ssr: false }
);
```

**Intersection Observer for Scroll Animations**

```typescript
// hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
}
```

---

## 8. Development Timeline

This 12-week development plan breaks down the MVP implementation into manageable sprints with clear deliverables.

### Week 1-2: Project Setup & Foundation

**Week 1: Environment & Architecture**

- **Day 1-2**: Project initialization
  - Initialize Next.js 14 project with TypeScript
  - Configure Tailwind CSS and shadcn/ui
  - Set up ESLint, Prettier, Husky pre-commit hooks
  - Create project structure and folder organization
  - Initialize Git repository with proper .gitignore

- **Day 3-4**: Development environment
  - Configure Hardhat project for smart contracts
  - Set up Polygon Mumbai testnet RPC endpoints
  - Create `.env.example` with required variables
  - Install and configure all dependencies (Wagmi, Viem, RainbowKit)
  - Set up VS Code workspace settings

- **Day 5-7**: Design system implementation
  - Implement color system CSS variables
  - Create typography scale and font configurations
  - Build base component library (Button, Input, Card)
  - Set up Framer Motion and GSAP configurations
  - Create reusable animation variants

**Week 2: Smart Contracts Foundation**

- **Day 1-3**: Core contract development
  - Write LendingPool.sol with deposit/withdraw logic
  - Implement TrancheTokens.sol (sSAFE, jYIELD)
  - Add access control and security features
  - Write comprehensive inline documentation

- **Day 4-5**: Secondary market contract
  - Develop SecondaryMarket.sol
  - Implement listing creation and purchase logic
  - Add order book functionality
  - Integrate with TrancheTokens

- **Day 6-7**: Contract testing
  - Write Hardhat tests for all contract functions
  - Test access control and edge cases
  - Run gas optimization analysis
  - Deploy to local Hardhat network for integration testing

**Deliverables**: Fully configured development environment, complete design system, tested smart contracts on local network

---

### Week 3-4: Backend Infrastructure & Authentication

**Week 3: Supabase Setup**

- **Day 1-2**: Database schema
  - Create Supabase project
  - Design and implement database schema (users, investments, earnings, etc.)
  - Set up Row Level Security policies
  - Create database functions and triggers

- **Day 3-4**: Authentication system
  - Implement wallet-based authentication with SIWE
  - Create user registration flow
  - Build session management
  - Add ENS resolution for user names

- **Day 5-7**: API routes
  - Create Next.js API routes for investments
  - Build earnings calculation endpoints
  - Implement achievement tracking APIs
  - Add error handling and validation
  - Write API integration tests

**Week 4: Blockchain Integration**

- **Day 1-3**: Smart contract deployment
  - Deploy contracts to Polygon Mumbai testnet
  - Verify contracts on PolygonScan
  - Create deployment scripts
  - Document contract addresses

- **Day 4-5**: Web3 integration
  - Configure Wagmi with testnet providers
  - Set up RainbowKit wallet connections
  - Create custom hooks for contract interactions
  - Implement transaction handling and error states

- **Day 6-7**: Backend synchronization
  - Build event listeners for contract events
  - Create webhooks for transaction confirmations
  - Implement Supabase data syncing
  - Add background jobs for earnings accrual

**Deliverables**: Complete backend infrastructure, deployed testnet contracts, working authentication system

---

### Week 5-6: Page 1 - Property Investment Marketplace

**Week 5: Core UI Components**

- **Day 1-2**: Hero section
  - Build canvas scroll sequence component
  - Integrate GSAP ScrollTrigger
  - Preload and optimize frame images
  - Add responsive design

- **Day 3-4**: Platform metrics
  - Create animated counter components
  - Implement CountUp.js integration
  - Fetch real-time data from contracts
  - Add loading skeletons

- **Day 5-7**: Property gallery
  - Build PropertyCard component with 3D tilt
  - Implement filter system (LTV, APY, location)
  - Create grid layout with animations
  - Add pagination or infinite scroll
  - Integrate with property data API

**Week 6: Investment Flow**

- **Day 1-3**: Investment modal
  - Design multi-step investment wizard
  - Implement tranche selection UI
  - Add amount input with validation
  - Create transaction preview screen

- **Day 4-5**: Web3 transaction handling
  - Connect modal to smart contracts
  - Implement approve + deposit flow
  - Add transaction status tracking
  - Show success/error states with animations

- **Day 6-7**: Refinement
  - Add Lottie success animations
  - Implement confetti on successful investment
  - Create "How It Works" section with Lottie
  - Polish responsive design

**Deliverables**: Fully functional property investment page with working testnet transactions

---

### Week 7-8: Page 2 - Secondary Token Marketplace

**Week 7: Marketplace UI**

- **Day 1-2**: Token listings grid
  - Build TokenCard component
  - Implement filters (tranche type, price, property)
  - Create sorting functionality
  - Add search capability

- **Day 3-4**: Order book sidebar
  - Design order book component
  - Show real-time bid/ask spreads
  - Implement WebSocket connection for live updates
  - Add price charts with D3.js

- **Day 5-7**: Trading interface
  - Create buy/sell modal
  - Implement order placement UI
  - Add slippage warnings
  - Build transaction confirmation screen

**Week 8: Trading Logic & Real-Time Updates**

- **Day 1-3**: Smart contract integration
  - Connect UI to SecondaryMarket.sol
  - Implement listing creation flow
  - Add purchase transaction handling
  - Enable order cancellation

- **Day 4-5**: Real-time features
  - Set up Supabase Realtime subscriptions
  - Listen for new listings
  - Update order book in real-time
  - Show recent trades feed

- **Day 6-7**: Market analytics
  - Build APY chart with D3.js morphing
  - Add volume statistics
  - Create price history visualizations
  - Implement market trends section

**Deliverables**: Complete secondary marketplace with real-time trading on testnet

---

### Week 9-10: Personalized Dashboard & Gamification

**Week 9: Dashboard Core**

- **Day 1-2**: Welcome hero
  - Build personalized greeting component
  - Integrate ENS names and avatars
  - Show "earnings since last visit"
  - Add portfolio snapshot

- **Day 3-4**: Real-time earnings ticker
  - Implement useEarningsAccrual hook
  - Create smooth interpolation animation
  - Add earnings breakdown by property
  - Show APY performance

- **Day 5-7**: Investment portfolio
  - Build portfolio table component
  - Show all active investments
  - Add performance metrics (ROI, total earned)
  - Implement withdrawal functionality
  - Create transaction history section

**Week 10: Gamification & Achievements**

- **Day 1-3**: Achievement system
  - Create achievement badge components
  - Implement unlock animations with springs
  - Build progress tracking
  - Add achievement notifications

- **Day 4-5**: Leaderboard
  - Design leaderboard component
  - Fetch top investors from Supabase
  - Show rankings by total invested, earnings, etc.
  - Add user's current rank

- **Day 6-7**: Engagement features
  - Add referral system UI
  - Create milestone celebrations
  - Implement streak tracking
  - Build rewards showcase

**Deliverables**: Fully personalized dashboard with gamification features

---

### Week 11: Testing & Quality Assurance

**Day 1-2: Smart Contract Auditing**
- Run Slither static analysis
- Perform manual security review
- Test all edge cases and attack vectors
- Document security considerations

**Day 3-4: Frontend Testing**
- Write unit tests for components (Jest, React Testing Library)
- Create integration tests for user flows
- Test wallet connection scenarios
- Verify responsive design on all devices

**Day 5-6: End-to-End Testing**
- Set up Playwright or Cypress
- Write E2E tests for complete user journeys
- Test investment flow from start to finish
- Verify secondary market trading
- Test dashboard features

**Day 7: Accessibility Audit**
- Run Lighthouse accessibility tests
- Test keyboard navigation
- Verify screen reader compatibility
- Check color contrast ratios (WCAG 2.1 AA)
- Fix any accessibility issues

**Deliverables**: Comprehensive test suite with 80%+ coverage, accessibility compliance

---

### Week 12: Polish, Optimization & Deployment

**Day 1-2: Performance Optimization**
- Analyze bundle size with Next.js analyzer
- Implement code splitting and lazy loading
- Optimize images and animations
- Add caching strategies
- Test Core Web Vitals (LCP, FID, CLS)

**Day 3-4: Final Polish**
- Review all animations for smoothness
- Fine-tune timing and easing curves
- Add loading states everywhere
- Implement error boundaries
- Polish micro-interactions

**Day 5: Deployment Preparation**
- Create production environment variables
- Set up Vercel project
- Configure CI/CD pipeline
- Prepare deployment documentation

**Day 6: Deployment**
- Deploy frontend to Vercel
- Verify all environment variables
- Test production build thoroughly
- Set up monitoring and error tracking (Sentry)
- Configure analytics

**Day 7: Documentation & Handoff**
- Write comprehensive README.md
- Document environment setup
- Create user guide for testing
- Record demo video
- Prepare handoff materials

**Deliverables**: Production-ready MVP deployed to Vercel with testnet contracts, complete documentation

---

### Post-Launch: Maintenance & Iteration (Week 13+)

**Ongoing Tasks:**
- Monitor smart contract activity
- Track user feedback and analytics
- Fix bugs and address issues
- Iterate on UX based on user behavior
- Plan mainnet launch features
- Consider third-party security audit

---

## 9. Testing & Quality Assurance Strategy

### 9.1 Smart Contract Testing

**Hardhat Test Suite**

```typescript
// test/LendingPool.test.ts
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { LendingPool, TrancheTokens, MockERC20 } from '../typechain-types';

describe('LendingPool', function () {
  let lendingPool: LendingPool;
  let seniorToken: TrancheTokens;
  let juniorToken: TrancheTokens;
  let usdc: MockERC20;
  let owner: SignerWithAddress;
  let investor1: SignerWithAddress;
  let investor2: SignerWithAddress;
  let underwriter: SignerWithAddress;

  beforeEach(async function () {
    [owner, investor1, investor2, underwriter] = await ethers.getSigners();

    // Deploy mock USDC
    const MockERC20 = await ethers.getContractFactory('MockERC20');
    usdc = await MockERC20.deploy('USD Coin', 'USDC', 6);
    await usdc.deployed();

    // Deploy tranche tokens
    const TrancheTokens = await ethers.getContractFactory('TrancheTokens');
    seniorToken = await TrancheTokens.deploy('Senior SAFE Token', 'sSAFE');
    juniorToken = await TrancheTokens.deploy('Junior YIELD Token', 'jYIELD');
    await seniorToken.deployed();
    await juniorToken.deployed();

    // Deploy lending pool
    const LendingPool = await ethers.getContractFactory('LendingPool');
    lendingPool = await LendingPool.deploy(
      usdc.address,
      seniorToken.address,
      juniorToken.address,
      8000, // 80% senior ratio
      900, // 9% senior target APY
      2500 // 25% junior target APY
    );
    await lendingPool.deployed();

    // Grant minter role to lending pool
    const MINTER_ROLE = await seniorToken.MINTER_ROLE();
    await seniorToken.grantRole(MINTER_ROLE, lendingPool.address);
    await juniorToken.grantRole(MINTER_ROLE, lendingPool.address);

    // Grant underwriter role
    const UNDERWRITER_ROLE = await lendingPool.UNDERWRITER_ROLE();
    await lendingPool.grantRole(UNDERWRITER_ROLE, underwriter.address);

    // Mint USDC to investors
    await usdc.mint(investor1.address, ethers.utils.parseUnits('100000', 6));
    await usdc.mint(investor2.address, ethers.utils.parseUnits('100000', 6));
  });

  describe('Deposits', function () {
    it('Should allow senior tranche deposits', async function () {
      const depositAmount = ethers.utils.parseUnits('10000', 6);

      // Approve and deposit
      await usdc.connect(investor1).approve(lendingPool.address, depositAmount);
      await expect(
        lendingPool.connect(investor1).deposit(depositAmount, true)
      )
        .to.emit(lendingPool, 'Deposit')
        .withArgs(investor1.address, depositAmount, true);

      // Check balances
      const shares = await seniorToken.balanceOf(investor1.address);
      expect(shares).to.equal(depositAmount);
    });

    it('Should allow junior tranche deposits', async function () {
      const depositAmount = ethers.utils.parseUnits('5000', 6);

      await usdc.connect(investor2).approve(lendingPool.address, depositAmount);
      await lendingPool.connect(investor2).deposit(depositAmount, false);

      const shares = await juniorToken.balanceOf(investor2.address);
      expect(shares).to.equal(depositAmount);
    });

    it('Should revert on zero deposit', async function () {
      await expect(
        lendingPool.connect(investor1).deposit(0, true)
      ).to.be.revertedWith('Amount must be greater than 0');
    });

    it('Should enforce deposit caps', async function () {
      const maxDeposit = ethers.utils.parseUnits('1000000', 6);
      await usdc.mint(investor1.address, maxDeposit.mul(2));
      await usdc.connect(investor1).approve(lendingPool.address, maxDeposit.mul(2));

      // Set deposit cap
      await lendingPool.setDepositCap(maxDeposit);

      // Should succeed
      await lendingPool.connect(investor1).deposit(maxDeposit, true);

      // Should fail
      await expect(
        lendingPool.connect(investor1).deposit(1, true)
      ).to.be.revertedWith('Deposit cap exceeded');
    });
  });

  describe('Withdrawals', function () {
    beforeEach(async function () {
      // Set up deposits
      const seniorDeposit = ethers.utils.parseUnits('80000', 6);
      const juniorDeposit = ethers.utils.parseUnits('20000', 6);

      await usdc.connect(investor1).approve(lendingPool.address, seniorDeposit);
      await lendingPool.connect(investor1).deposit(seniorDeposit, true);

      await usdc.connect(investor2).approve(lendingPool.address, juniorDeposit);
      await lendingPool.connect(investor2).deposit(juniorDeposit, false);
    });

    it('Should allow full withdrawal with no active loans', async function () {
      const shares = await seniorToken.balanceOf(investor1.address);
      const balanceBefore = await usdc.balanceOf(investor1.address);

      await lendingPool.connect(investor1).withdraw(shares, true);

      const balanceAfter = await usdc.balanceOf(investor1.address);
      expect(balanceAfter.sub(balanceBefore)).to.equal(shares);
    });

    it('Should distribute earnings proportionally', async function () {
      // Simulate loan repayment with interest
      const repaymentAmount = ethers.utils.parseUnits('105000', 6); // Principal + interest
      await usdc.mint(owner.address, repaymentAmount);
      await usdc.connect(owner).transfer(lendingPool.address, repaymentAmount);

      // Update accounting
      await lendingPool.distributeEarnings(ethers.utils.parseUnits('5000', 6));

      // Withdraw and check earnings
      const sharesBefore = await seniorToken.balanceOf(investor1.address);
      await lendingPool.connect(investor1).withdraw(sharesBefore, true);

      const usdcReceived = await usdc.balanceOf(investor1.address);
      expect(usdcReceived).to.be.gt(sharesBefore); // Should have earned interest
    });

    it('Should revert on insufficient liquidity', async function () {
      // Originate a large loan to lock funds
      const loanAmount = ethers.utils.parseUnits('90000', 6);
      await lendingPool
        .connect(underwriter)
        .originateLoan(
          'PROP-001',
          loanAmount,
          1200, // 12% APY
          180, // 180 days
          owner.address
        );

      // Try to withdraw more than available liquidity
      const shares = await seniorToken.balanceOf(investor1.address);
      await expect(
        lendingPool.connect(investor1).withdraw(shares, true)
      ).to.be.revertedWith('Insufficient liquidity');
    });
  });

  describe('Loan Origination', function () {
    beforeEach(async function () {
      // Set up pool with deposits
      const seniorDeposit = ethers.utils.parseUnits('80000', 6);
      const juniorDeposit = ethers.utils.parseUnits('20000', 6);

      await usdc.connect(investor1).approve(lendingPool.address, seniorDeposit);
      await lendingPool.connect(investor1).deposit(seniorDeposit, true);

      await usdc.connect(investor2).approve(lendingPool.address, juniorDeposit);
      await lendingPool.connect(investor2).deposit(juniorDeposit, false);
    });

    it('Should originate loan with correct parameters', async function () {
      const loanAmount = ethers.utils.parseUnits('50000', 6);
      const apy = 1200; // 12%
      const durationDays = 180;

      await expect(
        lendingPool
          .connect(underwriter)
          .originateLoan('PROP-001', loanAmount, apy, durationDays, owner.address)
      )
        .to.emit(lendingPool, 'LoanOriginated')
        .withArgs(0, 'PROP-001', loanAmount, apy, durationDays);

      const loan = await lendingPool.loans(0);
      expect(loan.principal).to.equal(loanAmount);
      expect(loan.apy).to.equal(apy);
    });

    it('Should revert if not underwriter', async function () {
      await expect(
        lendingPool
          .connect(investor1)
          .originateLoan(
            'PROP-001',
            ethers.utils.parseUnits('50000', 6),
            1200,
            180,
            owner.address
          )
      ).to.be.reverted;
    });

    it('Should enforce utilization limits', async function () {
      // Try to originate loan larger than pool
      const tooLarge = ethers.utils.parseUnits('150000', 6);

      await expect(
        lendingPool
          .connect(underwriter)
          .originateLoan('PROP-001', tooLarge, 1200, 180, owner.address)
      ).to.be.revertedWith('Insufficient pool balance');
    });
  });

  describe('Loan Repayment', function () {
    let loanId: number;

    beforeEach(async function () {
      // Set up pool and originate loan
      const seniorDeposit = ethers.utils.parseUnits('80000', 6);
      const juniorDeposit = ethers.utils.parseUnits('20000', 6);

      await usdc.connect(investor1).approve(lendingPool.address, seniorDeposit);
      await lendingPool.connect(investor1).deposit(seniorDeposit, true);

      await usdc.connect(investor2).approve(lendingPool.address, juniorDeposit);
      await lendingPool.connect(investor2).deposit(juniorDeposit, false);

      await lendingPool
        .connect(underwriter)
        .originateLoan(
          'PROP-001',
          ethers.utils.parseUnits('50000', 6),
          1200,
          180,
          owner.address
        );

      loanId = 0;
    });

    it('Should accept loan repayment', async function () {
      const repaymentAmount = ethers.utils.parseUnits('55000', 6);
      await usdc.mint(owner.address, repaymentAmount);
      await usdc.connect(owner).approve(lendingPool.address, repaymentAmount);

      await expect(lendingPool.connect(owner).makePayment(loanId, repaymentAmount))
        .to.emit(lendingPool, 'PaymentMade')
        .withArgs(loanId, repaymentAmount);
    });

    it('Should mark loan as repaid when fully paid', async function () {
      const fullRepayment = ethers.utils.parseUnits('56000', 6);
      await usdc.mint(owner.address, fullRepayment);
      await usdc.connect(owner).approve(lendingPool.address, fullRepayment);

      await lendingPool.connect(owner).makePayment(loanId, fullRepayment);

      const loan = await lendingPool.loans(loanId);
      expect(loan.isRepaid).to.be.true;
    });
  });

  describe('Access Control', function () {
    it('Should allow owner to pause contract', async function () {
      await lendingPool.connect(owner).pause();
      expect(await lendingPool.paused()).to.be.true;

      await expect(
        lendingPool
          .connect(investor1)
          .deposit(ethers.utils.parseUnits('1000', 6), true)
      ).to.be.revertedWith('Pausable: paused');
    });

    it('Should not allow non-owner to pause', async function () {
      await expect(lendingPool.connect(investor1).pause()).to.be.reverted;
    });
  });
});
```

**Test Coverage Goals:**
- Unit tests: 100% coverage of all contract functions
- Integration tests: Full user flow scenarios
- Edge cases: Boundary conditions, zero amounts, overflow/underflow
- Security tests: Reentrancy, access control, front-running

**Running Tests:**

```bash
# Run all tests
npx hardhat test

# Run with coverage
npx hardhat coverage

# Run gas reporter
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/LendingPool.test.ts
```

### 9.2 Frontend Testing

**Component Unit Tests (Jest + React Testing Library)**

```typescript
// __tests__/components/PropertyCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from '@/components/PropertyCard';
import '@testing-library/jest-dom';

const mockProperty = {
  id: 'prop-1',
  name: 'Luxury Condo Development',
  imageUrl: '/images/property1.jpg',
  location: 'Miami, FL',
  targetRaise: 2500000,
  apy: { senior: 9, junior: 25 },
  ltv: 65,
};

describe('PropertyCard', () => {
  it('renders property information correctly', () => {
    const handleClick = jest.fn();
    render(<PropertyCard property={mockProperty} onClick={handleClick} />);

    expect(screen.getByText('Luxury Condo Development')).toBeInTheDocument();
    expect(screen.getByText('Miami, FL')).toBeInTheDocument();
    expect(screen.getByText('$2.5M')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    render(<PropertyCard property={mockProperty} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays correct APY values', () => {
    const handleClick = jest.fn();
    render(<PropertyCard property={mockProperty} onClick={handleClick} />);

    expect(screen.getByText('9%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
```

**Hook Testing**

```typescript
// __tests__/hooks/useEarningsAccrual.test.ts
import { renderHook, act } from '@testing-library/react';
import { useEarningsAccrual } from '@/hooks/useEarningsAccrual';

describe('useEarningsAccrual', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calculates earnings correctly', () => {
    const { result } = renderHook(() =>
      useEarningsAccrual(10000, 10, Date.now() - 86400000) // 1 day ago
    );

    // After 1 day at 10% APY on $10,000 = ~$2.74
    expect(result.current.totalEarnings).toBeCloseTo(2.74, 1);
  });

  it('updates earnings over time', () => {
    const { result } = renderHook(() =>
      useEarningsAccrual(10000, 10, Date.now())
    );

    const initialEarnings = result.current.totalEarnings;

    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.totalEarnings).toBeGreaterThan(initialEarnings);
  });
});
```

**Integration Tests**

```typescript
// __tests__/integration/investment-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InvestmentFlow } from '@/components/InvestmentFlow';
import { WagmiConfig } from 'wagmi';
import { mockClient } from '../mocks/wagmi';

describe('Investment Flow Integration', () => {
  it('completes full investment journey', async () => {
    render(
      <WagmiConfig client={mockClient}>
        <InvestmentFlow propertyId="prop-1" />
      </WagmiConfig>
    );

    // Step 1: Select tranche
    const seniorButton = screen.getByText('Senior Tranche');
    fireEvent.click(seniorButton);
    fireEvent.click(screen.getByText('Next'));

    // Step 2: Enter amount
    const amountInput = screen.getByLabelText('Investment Amount');
    fireEvent.change(amountInput, { target: { value: '10000' } });
    fireEvent.click(screen.getByText('Next'));

    // Step 3: Review and confirm
    expect(screen.getByText('Review Investment')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();

    const confirmButton = screen.getByText('Confirm Investment');
    fireEvent.click(confirmButton);

    // Step 4: Wait for transaction
    await waitFor(
      () => {
        expect(screen.getByText('Investment Successful!')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
```

### 9.3 End-to-End Testing (Playwright)

```typescript
// e2e/investment.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Property Investment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/invest');
  });

  test('should complete investment from property listing to confirmation', async ({
    page,
  }) => {
    // Connect wallet
    await page.click('button:has-text("Connect Wallet")');
    await page.click('button:has-text("MetaMask")');

    // Select property
    await page.click('.property-card:first-child');

    // Wait for modal
    await expect(page.locator('.investment-modal')).toBeVisible();

    // Select senior tranche
    await page.click('button:has-text("Senior Tranche")');
    await page.click('button:has-text("Next")');

    // Enter investment amount
    await page.fill('input[name="amount"]', '10000');
    await page.click('button:has-text("Next")');

    // Review page
    await expect(page.locator('text=Review Investment')).toBeVisible();
    await expect(page.locator('text=$10,000')).toBeVisible();

    // Confirm
    await page.click('button:has-text("Confirm Investment")');

    // Approve transaction in MetaMask (manual step in real testing)
    // For E2E, use Synpress or similar to automate MetaMask

    // Wait for success
    await expect(
      page.locator('text=Investment Successful!'),
      { timeout: 30000 }
    ).toBeVisible();

    // Verify confetti animation
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('should navigate to dashboard and see new investment', async ({ page }) => {
    await page.click('button:has-text("Connect Wallet")');
    // ... wallet connection steps

    await page.goto('http://localhost:3000/dashboard');

    // Check for investment in portfolio
    await expect(page.locator('.portfolio-table')).toBeVisible();
    await expect(page.locator('text=Luxury Condo Development')).toBeVisible();
  });
});
```

### 9.4 Accessibility Testing

**Automated Accessibility Checks**

```typescript
// __tests__/accessibility/homepage.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations on homepage', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<HomePage />);
    const h1 = container.querySelectorAll('h1');
    const h2 = container.querySelectorAll('h2');

    expect(h1.length).toBe(1); // Only one h1
    expect(h2.length).toBeGreaterThan(0); // At least one h2
  });

  it('should have alt text for all images', () => {
    const { container } = render(<HomePage />);
    const images = container.querySelectorAll('img');

    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
```

**Manual Accessibility Checklist:**
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and clear
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for normal text)
- [ ] Screen reader announces all important content
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Skip navigation link is present
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets are at least 44x44 pixels
- [ ] ARIA labels are used correctly

---

## 10. Deployment Strategy

### 10.1 Testnet Deployment

**Smart Contract Deployment Script**

```typescript
// scripts/deploy.ts
import { ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  console.log('Starting deployment to Polygon Mumbai...');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // Deploy Mock USDC (for testnet only)
  console.log('\nDeploying Mock USDC...');
  const MockERC20 = await ethers.getContractFactory('MockERC20');
  const usdc = await MockERC20.deploy('USD Coin', 'USDC', 6);
  await usdc.deployed();
  console.log('USDC deployed to:', usdc.address);

  // Deploy Senior Token
  console.log('\nDeploying Senior Tranche Token...');
  const TrancheTokens = await ethers.getContractFactory('TrancheTokens');
  const seniorToken = await TrancheTokens.deploy('Senior SAFE Token', 'sSAFE');
  await seniorToken.deployed();
  console.log('sSAFE deployed to:', seniorToken.address);

  // Deploy Junior Token
  console.log('\nDeploying Junior Tranche Token...');
  const juniorToken = await TrancheTokens.deploy('Junior YIELD Token', 'jYIELD');
  await juniorToken.deployed();
  console.log('jYIELD deployed to:', juniorToken.address);

  // Deploy Lending Pool
  console.log('\nDeploying Lending Pool...');
  const LendingPool = await ethers.getContractFactory('LendingPool');
  const lendingPool = await LendingPool.deploy(
    usdc.address,
    seniorToken.address,
    juniorToken.address,
    8000, // 80% senior ratio
    900, // 9% senior APY
    2500 // 25% junior APY
  );
  await lendingPool.deployed();
  console.log('LendingPool deployed to:', lendingPool.address);

  // Deploy Secondary Market
  console.log('\nDeploying Secondary Market...');
  const SecondaryMarket = await ethers.getContractFactory('SecondaryMarket');
  const secondaryMarket = await SecondaryMarket.deploy(
    seniorToken.address,
    juniorToken.address,
    usdc.address,
    lendingPool.address,
    50 // 0.5% fee
  );
  await secondaryMarket.deployed();
  console.log('SecondaryMarket deployed to:', secondaryMarket.address);

  // Grant roles
  console.log('\nGranting roles...');
  const MINTER_ROLE = await seniorToken.MINTER_ROLE();
  await seniorToken.grantRole(MINTER_ROLE, lendingPool.address);
  await juniorToken.grantRole(MINTER_ROLE, lendingPool.address);
  console.log('Minter roles granted to LendingPool');

  const UNDERWRITER_ROLE = await lendingPool.UNDERWRITER_ROLE();
  await lendingPool.grantRole(UNDERWRITER_ROLE, deployer.address);
  console.log('Underwriter role granted to deployer');

  // Save deployment addresses
  const addresses = {
    usdc: usdc.address,
    seniorToken: seniorToken.address,
    juniorToken: juniorToken.address,
    lendingPool: lendingPool.address,
    secondaryMarket: secondaryMarket.address,
    network: 'mumbai',
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    'deployments/mumbai.json',
    JSON.stringify(addresses, null, 2)
  );
  console.log('\nDeployment addresses saved to deployments/mumbai.json');

  console.log('\n=== Deployment Complete ===');
  console.log('USDC:', usdc.address);
  console.log('sSAFE:', seniorToken.address);
  console.log('jYIELD:', juniorToken.address);
  console.log('LendingPool:', lendingPool.address);
  console.log('SecondaryMarket:', secondaryMarket.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

**Deploy to Mumbai:**

```bash
npx hardhat run scripts/deploy.ts --network mumbai
```

**Contract Verification:**

```bash
npx hardhat verify --network mumbai <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### 10.2 Frontend Deployment (Vercel)

**Vercel Configuration (`vercel.json`)**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID": "@wallet-connect-project-id",
    "NEXT_PUBLIC_ALCHEMY_API_KEY": "@alchemy-api-key",
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "NEXT_PUBLIC_LENDING_POOL_ADDRESS": "@lending-pool-address",
    "NEXT_PUBLIC_SECONDARY_MARKET_ADDRESS": "@secondary-market-address",
    "NEXT_PUBLIC_SENIOR_TOKEN_ADDRESS": "@senior-token-address",
    "NEXT_PUBLIC_JUNIOR_TOKEN_ADDRESS": "@junior-token-address",
    "NEXT_PUBLIC_USDC_ADDRESS": "@usdc-address"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  }
}
```

**Deployment Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Link project:**
```bash
vercel link
```

3. **Set environment variables:**
```bash
vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
vercel env add NEXT_PUBLIC_ALCHEMY_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... add all environment variables
```

4. **Deploy to preview:**
```bash
vercel
```

5. **Deploy to production:**
```bash
vercel --prod
```

### 10.3 Environment Variables

**Required Environment Variables (`.env.example`)**

```bash
# Blockchain
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_CHAIN_ID=80001  # Mumbai testnet

# Contract Addresses (fill after deployment)
NEXT_PUBLIC_LENDING_POOL_ADDRESS=
NEXT_PUBLIC_SECONDARY_MARKET_ADDRESS=
NEXT_PUBLIC_SENIOR_TOKEN_ADDRESS=
NEXT_PUBLIC_JUNIOR_TOKEN_ADDRESS=
NEXT_PUBLIC_USDC_ADDRESS=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Sentry Error Tracking (optional)
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# Feature Flags
NEXT_PUBLIC_ENABLE_SECONDARY_MARKET=true
NEXT_PUBLIC_ENABLE_ACHIEVEMENTS=true
```

### 10.4 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:ci

      - name: Build application
        run: npm run build

  deploy-preview:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

### 10.5 Monitoring & Analytics

**Error Tracking (Sentry)**

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter out non-critical errors
    if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
      return null;
    }
    return event;
  },
});
```

**Analytics (Mixpanel)**

```typescript
// lib/analytics.ts
import mixpanel from 'mixpanel-browser';

if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

export const analytics = {
  track: (event: string, properties?: any) => {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.track(event, properties);
    } else {
      console.log('[Analytics]', event, properties);
    }
  },
  identify: (userId: string) => {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.identify(userId);
    }
  },
};

// Usage:
// analytics.track('Investment Completed', { amount: 10000, tranche: 'senior' });
```

**Performance Monitoring (Vercel Analytics)**

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 10.6 Post-Deployment Checklist

- [ ] All environment variables set correctly in Vercel
- [ ] Smart contracts deployed and verified on PolygonScan
- [ ] Contract addresses updated in frontend config
- [ ] Supabase database schema deployed
- [ ] RLS policies enabled
- [ ] API routes tested in production
- [ ] Wallet connection working (MetaMask, WalletConnect)
- [ ] Test investment flow end-to-end on testnet
- [ ] Verify animations load correctly
- [ ] Check mobile responsiveness
- [ ] Test all user flows on production URL
- [ ] Set up error tracking and verify alerts work
- [ ] Configure custom domain (if applicable)
- [ ] Enable Vercel Web Analytics
- [ ] Set up uptime monitoring (UptimeRobot, etc.)
- [ ] Document known issues and limitations
- [ ] Prepare user testing guide
- [ ] Share testnet faucet links with testers

---

## 11. Mainnet Preparation Considerations

While the MVP focuses on testnet deployment, here are considerations for eventual mainnet launch:

### 11.1 Security Audit

- **Third-party audit**: Engage firms like OpenZeppelin, Trail of Bits, or ConsenSys Diligence
- **Bug bounty program**: Launch on Immunefi or Code4rena
- **Internal security review**: Extended testing period with security-focused scenarios

### 11.2 Legal & Compliance

- **Entity formation**: Cayman Islands SPV as outlined in business plan
- **Legal opinion**: Securities law compliance review
- **Terms of Service**: User agreement with risk disclosures
- **KYC/AML**: Potential integration with Chainalysis or Elliptic for mainnet
- **Accredited investor verification**: If required by jurisdiction

### 11.3 Mainnet Technical Upgrades

- **Upgrade to Polygon mainnet or Ethereum L2** (Arbitrum, Optimism)
- **Real USDC integration** (not mock token)
- **Oracle integration**: Chainlink for property valuations and interest rates
- **Multisig wallets**: Gnosis Safe for admin functions
- **Timelocks**: For governance and protocol upgrades
- **Insurance**: Nexus Mutual or similar DeFi insurance

### 11.4 Scaling Considerations

- **Database optimization**: Upgrade Supabase plan, add indexes
- **CDN for assets**: CloudFlare or Vercel Edge Network
- **Rate limiting**: Protect API endpoints from abuse
- **Caching strategy**: Redis for frequently accessed data
- **Load testing**: Simulate high user concurrency

---

## 12. Support & Maintenance

### 12.1 Documentation

All documentation is maintained in:
- `/docs/ARCHITECTURE.md` - Technical architecture overview
- `/docs/API.md` - API endpoint documentation
- `/docs/SMART_CONTRACTS.md` - Contract interaction guide
- `/docs/DEPLOYMENT.md` - Deployment procedures
- `/docs/USER_GUIDE.md` - End-user instructions

### 12.2 Known Limitations

- **Testnet only**: All transactions use test USDC with no real value
- **Simulated properties**: Property data is mocked for demonstration
- **No real underwriting**: Loans are manually originated for testing
- **Limited liquidity**: Secondary market may have low volume initially
- **Performance**: Canvas sequence requires high-res images (bandwidth intensive)

### 12.3 Future Enhancements

**Post-MVP Features:**
1. Mobile app (React Native)
2. Advanced portfolio analytics
3. Automated market maker for secondary market
4. Cross-chain bridge (Polygon ↔ Ethereum)
5. Governance token and DAO
6. Referral rewards program
7. Staking mechanism for additional yield
8. Integration with DeFi protocols (Aave, Compound)
9. NFT representations of property stakes
10. Social features (leaderboards, investor profiles)

---

## 13. Conclusion

This MVP build plan provides a comprehensive roadmap for developing a production-ready DeFi real estate lending platform with:

- **Two-page site**: Property marketplace + secondary token marketplace
- **Animation-first design**: Apple-inspired scroll sequences and micro-interactions
- **Personalized experience**: Wallet-based tracking with real-time earnings
- **Gamification**: Achievement system with progress tracking
- **Testnet functionality**: Real smart contract interactions on Polygon Mumbai
- **Complete tech stack**: Next.js, Solidity, Supabase, advanced animation libraries

The 12-week timeline is aggressive but achievable with focused execution. The testing strategy ensures quality, and the deployment plan provides a clear path to production.

**Next Steps:**
1. Review and approve this build plan
2. Set up development environment (Week 1)
3. Begin smart contract development (Week 2)
4. Maintain daily standup communication for progress tracking

For questions or clarifications on any section of this plan, refer to the specific line numbers or section headers for targeted discussion.

---

**Document Status**: ✅ Complete
**Total Lines**: ~5,800+
**Last Updated**: 2025-10-22
**Version**: 1.0