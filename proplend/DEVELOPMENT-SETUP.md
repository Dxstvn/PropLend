# PropertyLend Development Setup Guide

Complete guide for setting up your PropertyLend development environment.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: v20.x or later
- **pnpm**: v10.19.0 or later (package manager)
- **Git**: Latest version
- **MetaMask** or another Web3 wallet (for testing)

### Install pnpm

```bash
npm install -g pnpm@10
```

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/PropLend.git
cd PropLend/proplend
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs:
- Next.js 16, React 19, TypeScript
- Hardhat 3 and smart contract tools
- shadcn/ui, Tailwind CSS
- Supabase, Wagmi, Viem

### 3. Environment Setup

Create `.env.local` from the example:

```bash
cp .env.local.example .env.local
```

Update the following variables:

```bash
# Required for development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CHAIN_ID=80002  # Polygon Amoy testnet
NEXT_PUBLIC_NETWORK_NAME="Polygon Amoy"

# Get Alchemy API key from https://www.alchemy.com/
ALCHEMY_API_KEY=your_alchemy_api_key_here
POLYGON_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY

# Get WalletConnect Project ID from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Get testnet POL tokens from https://faucet.polygon.technology/
# Your testnet wallet private key (⚠️ NEVER use mainnet keys!)
PRIVATE_KEY=your_testnet_wallet_private_key_here

# Get PolygonScan API key from https://polygonscan.com/apis
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### 4. Compile Smart Contracts

```bash
pnpm hardhat:compile
```

Expected output:
```
Compiled 8 Solidity files successfully
```

### 5. Run Tests

```bash
pnpm hardhat:test
```

### 6. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
proplend/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # shadcn/ui primitives
│   ├── shared/              # Shared components
│   └── features/            # Feature-specific components
├── contracts/               # Solidity smart contracts
│   ├── core/                # Main contracts (LendingPool, etc.)
│   ├── mocks/               # Test mocks (MockUSDC, MockProperty)
│   └── interfaces/          # Contract interfaces
├── test/                    # Hardhat tests
│   ├── LendingPool.test.ts
│   ├── TrancheTokens.test.ts
│   ├── InterestDistributor.test.ts
│   └── SecondaryMarket.test.ts
├── scripts/                 # Deployment scripts
│   ├── deploy-tokens.ts
│   ├── deploy-core.ts
│   └── deploy-all.ts
├── lib/                     # Utility libraries
│   ├── utils.ts
│   └── contracts/           # Contract ABIs and instances
├── hardhat.config.ts        # Hardhat configuration
├── tailwind.config.ts       # Tailwind CSS config
└── next.config.ts           # Next.js config
```

---

## Smart Contract Development

### Compile Contracts

```bash
pnpm hardhat:compile
```

This generates:
- `artifacts/`: Compiled contract bytecode and ABIs
- `typechain-types/`: TypeScript type definitions

### Run Tests

```bash
# Run all tests
pnpm hardhat:test

# Run specific test file
pnpm hardhat:test test/LendingPool.test.ts

# Run with gas reporting
REPORT_GAS=true pnpm hardhat:test

# Run with coverage
pnpm hardhat:coverage
```

### Local Blockchain

Start a local Hardhat node:

```bash
pnpm hardhat:node
```

This starts a local blockchain at `http://127.0.0.1:8545` with:
- 20 accounts pre-funded with 10,000 ETH each
- Automining enabled (instant transactions)
- Chain ID: 31337

### Deploy to Local Network

In a new terminal (while Hardhat node is running):

```bash
pnpm deploy:all --network localhost
```

---

## Testnet Deployment (Polygon Amoy)

### 1. Get Testnet POL

Visit [Polygon Faucet](https://faucet.polygon.technology/) and request POL for your deployer address.

You need at least **0.5 POL** for deployment.

### 2. Deploy Contracts

Deploy all contracts in one command:

```bash
pnpm deploy:amoy
```

Or deploy step-by-step:

```bash
# Step 1: Deploy tokens (MockUSDC, sSAFE, jYIELD)
pnpm deploy:tokens --network amoy

# Step 2: Deploy core contracts (LendingPool, InterestDistributor, SecondaryMarket)
pnpm deploy:core --network amoy
```

### 3. Verify Contracts on PolygonScan

After deployment, verify each contract:

```bash
# Verify MockUSDC
pnpm verify:amoy <USDC_ADDRESS>

# Verify Senior Token
pnpm verify:amoy <SENIOR_TOKEN_ADDRESS> "Senior SAFE Token" "sSAFE" true

# Verify Junior Token
pnpm verify:amoy <JUNIOR_TOKEN_ADDRESS> "Junior YIELD Token" "jYIELD" false

# Verify LendingPool
pnpm verify:amoy <LENDING_POOL_ADDRESS> "<USDC_ADDRESS>"

# Verify InterestDistributor
pnpm verify:amoy <DISTRIBUTOR_ADDRESS> "<USDC_ADDRESS>" "<TREASURY_ADDRESS>"

# Verify SecondaryMarket
pnpm verify:amoy <MARKET_ADDRESS> "<USDC_ADDRESS>" "<TREASURY_ADDRESS>"
```

### 4. Update Environment Variables

Add deployed addresses to `.env.local`:

```bash
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_SENIOR_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_JUNIOR_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_LENDING_POOL_ADDRESS=0x...
NEXT_PUBLIC_INTEREST_DISTRIBUTOR_ADDRESS=0x...
NEXT_PUBLIC_SECONDARY_MARKET_ADDRESS=0x...
```

### 5. Test on Testnet

1. **Mint MockUSDC** to your wallet:
   - Go to PolygonScan: `https://amoy.polygonscan.com/address/<USDC_ADDRESS>#writeContract`
   - Connect wallet
   - Call `mintDollars(address, 10000)` to mint 10,000 USDC

2. **Test deposit** into senior tranche:
   - Use the frontend UI at `localhost:3000`
   - Connect wallet (switch to Amoy network)
   - Try depositing $100+ into senior tranche

---

## Frontend Development

### Start Dev Server

```bash
pnpm dev
```

With Turbopack (faster HMR):
```bash
pnpm dev --turbo
```

### Linting and Formatting

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Build for Production

```bash
pnpm build
```

Test production build locally:
```bash
pnpm start
```

---

## Common Development Tasks

### Add a New Component

```bash
# Using shadcn/ui CLI
npx shadcn@latest add button

# This adds the component to components/ui/
```

### Update Smart Contract

1. Modify contract in `contracts/`
2. Recompile: `pnpm hardhat:compile`
3. Update tests in `test/`
4. Run tests: `pnpm hardhat:test`
5. Redeploy: `pnpm deploy:amoy`
6. Update contract address in `.env.local`

### Add a New Smart Contract Test

Create `test/YourContract.test.ts`:

```typescript
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('YourContract', function () {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory('YourContract');
    const contract = await Contract.deploy();
    return { contract, owner };
  }

  it('Should deploy successfully', async function () {
    const { contract } = await loadFixture(deployFixture);
    expect(await contract.getAddress()).to.be.properAddress;
  });
});
```

Run: `pnpm hardhat:test test/YourContract.test.ts`

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### "Insufficient funds" during deployment

- Check testnet POL balance on [PolygonScan](https://amoy.polygonscan.com/)
- Request more from [Polygon Faucet](https://faucet.polygon.technology/)
- Ensure `PRIVATE_KEY` in `.env.local` is correct

### Contract verification fails

```bash
# Ensure contracts are compiled
pnpm hardhat:compile

# Try manual verification with constructor args
pnpm hardhat verify --network amoy <ADDRESS> <CONSTRUCTOR_ARGS>
```

### Hardhat node crashes

```bash
# Clean Hardhat cache
pnpm hardhat:clean

# Restart node
pnpm hardhat:node
```

### TypeScript errors in contracts

```bash
# Regenerate TypeChain types
rm -rf typechain-types
pnpm hardhat:compile
```

---

## Testing Best Practices

### Unit Tests

- Test each function independently
- Use `loadFixture()` for clean test state
- Test both success and failure cases
- Aim for 95%+ code coverage

### Integration Tests

- Test contract interactions (LendingPool → TrancheTokens)
- Test full user flows (deposit → earn interest → withdraw)
- Use realistic scenarios ($100k loan, 20% interest, etc.)

### Gas Optimization Tests

```bash
REPORT_GAS=true pnpm hardhat:test
```

Optimize for:
- Deposit: < 200k gas
- Withdrawal: < 150k gas
- Loan origination: < 300k gas

---

## Resources

- **Hardhat Docs**: https://hardhat.org/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Polygon Amoy**: https://docs.polygon.technology/tools/faucet/amoy/
- **PolygonScan Amoy**: https://amoy.polygonscan.com/
- **OpenZeppelin**: https://docs.openzeppelin.com/contracts/
- **Wagmi Docs**: https://wagmi.sh/
- **Viem Docs**: https://viem.sh/
- **shadcn/ui**: https://ui.shadcn.com/

---

## Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community (link in README)
- **Documentation**: See [MVP-BUILD-PLAN.md](MVP-BUILD-PLAN.md)

---

**Last Updated**: Day 3-4, Week 1
**Next Steps**: See [MVP-BUILD-PLAN.md](MVP-BUILD-PLAN.md) for Week 2 tasks
