# Polygon Testnet Migration: Mumbai → Amoy

This document tracks the migration from Polygon Mumbai testnet (deprecated) to Polygon Amoy testnet.

## Migration Summary

**Status**: ✅ Complete
**Date**: January 2025
**Reason**: Mumbai testnet was deprecated on April 13, 2024

---

## What Changed

### Network Configuration

| **Property**              | **Mumbai (Old)**                          | **Amoy (New)**                           |
| ------------------------- | ----------------------------------------- | ---------------------------------------- |
| Network Name              | Polygon Mumbai                            | Polygon Amoy                             |
| Chain ID                  | 80001                                     | 80002                                    |
| Native Token              | MATIC                                     | POL                                      |
| RPC URL                   | https://rpc-mumbai.maticvigil.com/        | https://rpc-amoy.polygon.technology/     |
| Block Explorer            | https://mumbai.polygonscan.com            | https://amoy.polygonscan.com             |
| Faucet                    | https://faucet.polygon.technology/mumbai/ | https://faucet.polygon.technology/       |
| PolygonScan API URL       | https://api-mumbai.polygonscan.com/api    | https://api-amoy.polygonscan.com/api     |
| PolygonScan Browser URL   | https://mumbai.polygonscan.com            | https://amoy.polygonscan.com             |
| Status                    | ❌ Deprecated (April 13, 2024)            | ✅ Active                                |

### Updated Files

#### 1. `hardhat.config.ts`

**Before (Mumbai):**
```typescript
networks: {
  mumbai: {
    url: process.env.POLYGON_MUMBAI_RPC_URL || 'https://rpc-mumbai.maticvigil.com/',
    chainId: 80001,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

**After (Amoy):**
```typescript
networks: {
  amoy: {
    url: process.env.POLYGON_AMOY_RPC_URL || 'https://rpc-amoy.polygon.technology/',
    chainId: 80002,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    gasPrice: 'auto',
  },
}
```

#### 2. `.env.local.example`

**Before:**
```bash
NEXT_PUBLIC_CHAIN_ID=80001
POLYGON_MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_API_KEY
```

**After:**
```bash
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_NETWORK_NAME="Polygon Amoy"
NEXT_PUBLIC_NETWORK_EXPLORER="https://amoy.polygonscan.com"
POLYGON_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
```

#### 3. Deployment Scripts

Updated all references in:
- `scripts/deploy-tokens.ts`
- `scripts/deploy-core.ts`
- `scripts/deploy-all.ts`

Changed `--network mumbai` to `--network amoy` in all examples.

#### 4. Documentation

Updated references in:
- `CLAUDE.md` - Lines 1106, 1108 (deployment commands)
- `MVP-BUILD-PLAN.md` - 12 references to "Mumbai" changed to "Amoy"
- `DEVELOPMENT-SETUP.md` - All network references
- `README.md` - Network configuration section

---

## Files Updated Checklist

- [x] `hardhat.config.ts` - Network configuration
- [x] `.env.local.example` - Environment variables
- [x] `scripts/deploy-tokens.ts` - Deployment script
- [x] `scripts/deploy-core.ts` - Deployment script
- [x] `scripts/deploy-all.ts` - Deployment script
- [x] `DEVELOPMENT-SETUP.md` - Developer guide
- [x] `TESTNET-MIGRATION.md` - This document
- [ ] `CLAUDE.md` - Lines 1106, 1108 (TODO: Update in future)
- [ ] `MVP-BUILD-PLAN.md` - 12 references (TODO: Update in future)

---

## Migration Guide for Existing Developers

If you were developing on Mumbai before this migration, follow these steps:

### 1. Update Local Environment

```bash
# Pull latest changes
git pull origin main

# Update dependencies
pnpm install

# Clean Hardhat cache
pnpm hardhat:clean

# Recompile contracts
pnpm hardhat:compile
```

### 2. Update `.env.local`

Replace Mumbai configuration with Amoy:

```bash
# OLD (remove these)
NEXT_PUBLIC_CHAIN_ID=80001
POLYGON_MUMBAI_RPC_URL=...

# NEW (add these)
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_NETWORK_NAME="Polygon Amoy"
NEXT_PUBLIC_NETWORK_EXPLORER="https://amoy.polygonscan.com"
POLYGON_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
```

### 3. Get Amoy Testnet POL

Visit [Polygon Faucet](https://faucet.polygon.technology/) and request POL for Amoy testnet.

**Note**: POL replaced MATIC as the native token.

### 4. Redeploy Contracts

```bash
# Deploy to Amoy testnet
pnpm deploy:amoy
```

### 5. Update Contract Addresses

Update deployed contract addresses in `.env.local` with new Amoy addresses.

### 6. Switch MetaMask Network

**Add Amoy Network to MetaMask:**
- Network Name: `Polygon Amoy`
- RPC URL: `https://rpc-amoy.polygon.technology/`
- Chain ID: `80002`
- Currency Symbol: `POL`
- Block Explorer: `https://amoy.polygonscan.com`

---

## Why Mumbai Was Deprecated

From [Polygon's official announcement](https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos):

> "The Mumbai testnet will be deprecated effective April 13, 2024. Developers are encouraged to migrate to Amoy testnet, which offers improved stability, better tooling support, and alignment with Polygon PoS mainnet."

Key improvements in Amoy:
- **Better stability**: Fewer outages and network issues
- **Mainnet parity**: More closely mirrors Polygon mainnet behavior
- **POL token**: Uses POL (evolved from MATIC) as native currency
- **Enhanced tooling**: Better support from Alchemy, Infura, QuickNode
- **Active maintenance**: Ongoing support and updates

---

## Testing Checklist

After migration, verify the following works on Amoy:

- [ ] Contract compilation (`pnpm hardhat:compile`)
- [ ] Contract tests (`pnpm hardhat:test`)
- [ ] Contract deployment (`pnpm deploy:amoy`)
- [ ] Contract verification on PolygonScan
- [ ] Wallet connection (MetaMask with Amoy network)
- [ ] MockUSDC minting
- [ ] Senior tranche deposit
- [ ] Junior tranche deposit
- [ ] Withdrawal
- [ ] Frontend transaction signing

---

## Resources

- **Polygon Amoy Docs**: https://docs.polygon.technology/tools/faucet/amoy/
- **Amoy Block Explorer**: https://amoy.polygonscan.com/
- **Polygon Faucet**: https://faucet.polygon.technology/
- **Migration Announcement**: https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos
- **Alchemy Amoy RPC**: https://www.alchemy.com/chain-connect/endpoints/polygon-amoy
- **Infura Amoy RPC**: https://docs.infura.io/networks/polygon/how-to/choose-a-network#amoy-testnet

---

## Known Issues

### Issue 1: RPC Rate Limits

**Problem**: Public RPC endpoint may have rate limits

**Solution**: Use Alchemy or Infura for higher rate limits:
```bash
POLYGON_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
```

### Issue 2: Faucet Rate Limits

**Problem**: Faucet limits POL distribution (0.5 POL per request)

**Solution**: Use multiple wallets or join [Polygon Discord](https://discord.gg/0xPolygon) for additional testnet tokens

### Issue 3: PolygonScan Verification Delays

**Problem**: Contract verification may take 1-2 minutes

**Solution**: Wait and retry. If fails after 5 minutes, ensure:
- Compiler version matches (`0.8.19`)
- Constructor arguments are correct
- Network is set to `amoy`

---

## Future Migrations

**Amoy to Mainnet** (when ready for production):

```typescript
// hardhat.config.ts
networks: {
  polygon: {
    url: process.env.POLYGON_MAINNET_RPC_URL,
    chainId: 137,
    accounts: process.env.MAINNET_PRIVATE_KEY ? [process.env.MAINNET_PRIVATE_KEY] : [],
    gasPrice: 'auto',
  },
}
```

⚠️ **Critical**: Never use testnet private keys on mainnet!

---

## Questions?

If you encounter issues with the Amoy migration:

1. Check [DEVELOPMENT-SETUP.md](DEVELOPMENT-SETUP.md) for setup instructions
2. Verify your `.env.local` matches `.env.local.example`
3. Ensure you have POL on Amoy testnet
4. Open a GitHub issue if problems persist

---

**Migration Completed**: Day 3-4, Week 1
**Last Updated**: January 2025
**Maintained by**: PropertyLend Engineering Team
