import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import type { SecondaryMarket, MockUSDC, TrancheToken } from '../typechain-types';

/**
 * @title SecondaryMarket Test Suite
 * @notice Tests for the tranche token secondary marketplace
 *
 * Test Coverage:
 * - Deployment and initialization
 * - Order creation (buy and sell)
 * - Order cancellation
 * - Order filling (full and partial)
 * - Trading fee calculation (0.3%)
 * - Market statistics tracking
 * - Access control
 *
 * Example Trading Scenario:
 * - Investor A deposits $10k into senior tranche, receives 10k sSAFE tokens
 * - Investor A lists 5k sSAFE tokens for sale at $1.05 each (5% premium for instant liquidity)
 * - Investor B buys 5k sSAFE tokens for $5,250
 * - Trading fee: $15.75 (0.3% of $5,250)
 * - Investor A receives: $5,234.25
 */
describe('SecondaryMarket', function () {
  /**
   * Fixture: Deploy SecondaryMarket with tokens
   */
  async function deploySecondaryMarketFixture() {
    const [owner, treasury, seller, buyer, trader1, trader2] = await ethers.getSigners();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory('MockUSDC');
    const usdc = (await MockUSDC.deploy()) as MockUSDC;

    // Deploy Tranche Tokens
    const TrancheToken = await ethers.getContractFactory('TrancheToken');
    const seniorToken = (await TrancheToken.deploy(
      'Senior SAFE Token',
      'sSAFE',
      true
    )) as TrancheToken;
    const juniorToken = (await TrancheToken.deploy(
      'Junior YIELD Token',
      'jYIELD',
      false
    )) as TrancheToken;

    // Deploy SecondaryMarket
    const SecondaryMarket = await ethers.getContractFactory('SecondaryMarket');
    const market = (await SecondaryMarket.deploy(
      await usdc.getAddress(),
      treasury.address
    )) as SecondaryMarket;

    // Set tranche tokens in market
    await market.setTrancheTokens(
      await seniorToken.getAddress(),
      await juniorToken.getAddress()
    );

    // Mint tokens for testing
    await usdc.mint(buyer.address, ethers.parseUnits('1000000', 6));
    await usdc.mint(seller.address, ethers.parseUnits('1000000', 6));

    const MINTER_ROLE = await seniorToken.MINTER_ROLE();
    await seniorToken.grantRole(MINTER_ROLE, owner.address);
    await juniorToken.grantRole(MINTER_ROLE, owner.address);

    await seniorToken.mint(seller.address, ethers.parseUnits('100000', 6));
    await juniorToken.mint(seller.address, ethers.parseUnits('50000', 6));

    return {
      market,
      usdc,
      seniorToken,
      juniorToken,
      owner,
      treasury,
      seller,
      buyer,
      trader1,
      trader2,
    };
  }

  describe('Deployment', function () {
    it('Should deploy with correct USDC address', async function () {
      const { market, usdc } = await loadFixture(deploySecondaryMarketFixture);
      expect(await market.usdc()).to.equal(await usdc.getAddress());
    });

    it('Should deploy with correct treasury address', async function () {
      const { market, treasury } = await loadFixture(deploySecondaryMarketFixture);
      expect(await market.platformTreasury()).to.equal(treasury.address);
    });

    it('Should set tranche token addresses', async function () {
      const { market, seniorToken, juniorToken } = await loadFixture(
        deploySecondaryMarketFixture
      );
      expect(await market.seniorToken()).to.equal(await seniorToken.getAddress());
      expect(await market.juniorToken()).to.equal(await juniorToken.getAddress());
    });

    it('Should initialize with zero volume and fees', async function () {
      const { market } = await loadFixture(deploySecondaryMarketFixture);
      const [volume, fees, activeOrders] = await market.getMarketStats();
      expect(volume).to.equal(0);
      expect(fees).to.equal(0);
      expect(activeOrders).to.equal(0);
    });
  });

  describe('Order Creation', function () {
    // TODO: Implement in Week 3
    it.skip('Should create sell order for senior tokens', async function () {
      // Test sell order creation with escrow
    });

    it.skip('Should create buy order for senior tokens', async function () {
      // Test buy order creation with USDC escrow
    });

    it.skip('Should create sell order for junior tokens', async function () {
      // Test junior token sell order
    });

    it.skip('Should emit OrderCreated event', async function () {
      // Test event emission
    });

    it.skip('Should revert order with zero amount', async function () {
      // Test amount validation
    });

    it.skip('Should revert order with zero price', async function () {
      // Test price validation
    });

    it.skip('Should escrow tokens for sell orders', async function () {
      // Test token transfer to contract
    });

    it.skip('Should escrow USDC for buy orders', async function () {
      // Test USDC transfer to contract
    });
  });

  describe('Order Cancellation', function () {
    // TODO: Implement in Week 3
    it.skip('Should cancel active sell order', async function () {
      // Test sell order cancellation
    });

    it.skip('Should cancel active buy order', async function () {
      // Test buy order cancellation
    });

    it.skip('Should return escrowed tokens on cancellation', async function () {
      // Test token refund
    });

    it.skip('Should return escrowed USDC on cancellation', async function () {
      // Test USDC refund
    });

    it.skip('Should emit OrderCancelled event', async function () {
      // Test event emission
    });

    it.skip('Should revert cancelling inactive order', async function () {
      // Test inactive order validation
    });

    it.skip('Should only allow order creator to cancel', async function () {
      // Test authorization check
    });
  });

  describe('Order Filling', function () {
    // TODO: Implement in Week 3
    it.skip('Should fill sell order completely', async function () {
      // Test full sell order execution
    });

    it.skip('Should fill buy order completely', async function () {
      // Test full buy order execution
    });

    it.skip('Should fill sell order partially', async function () {
      // Test partial order execution
    });

    it.skip('Should calculate and collect trading fee (0.3%)', async function () {
      // Test fee calculation and collection
    });

    it.skip('Should transfer tokens from seller to buyer', async function () {
      // Test token transfer
    });

    it.skip('Should transfer USDC from buyer to seller (minus fee)', async function () {
      // Test USDC payment with fee deduction
    });

    it.skip('Should emit OrderFilled event', async function () {
      // Test event emission
    });

    it.skip('Should mark order inactive when fully filled', async function () {
      // Test order status update
    });

    it.skip('Should revert filling inactive order', async function () {
      // Test inactive order validation
    });

    it.skip('Should revert filling with zero amount', async function () {
      // Test amount validation
    });

    it.skip('Should revert filling more than order amount', async function () {
      // Test amount bounds check
    });
  });

  describe('Order Queries', function () {
    // TODO: Implement in Week 3
    it.skip('Should get order details by ID', async function () {
      // Test getOrder view function
    });

    it.skip('Should get all active senior orders', async function () {
      // Test getActiveOrders filtering
    });

    it.skip('Should get all active junior orders', async function () {
      // Test getActiveOrders filtering
    });

    it.skip('Should get all orders by user', async function () {
      // Test getUserOrders filtering
    });

    it.skip('Should return empty array when no orders', async function () {
      // Test empty result handling
    });
  });

  describe('Market Statistics', function () {
    // TODO: Implement in Week 3
    it.skip('Should track total trading volume', async function () {
      // Test volume accumulation
    });

    it.skip('Should track total fees collected', async function () {
      // Test fee accumulation
    });

    it.skip('Should track active order count', async function () {
      // Test active order counting
    });

    it.skip('Should return correct market stats', async function () {
      // Test getMarketStats view function
    });
  });

  describe('Fee Calculation', function () {
    it('Should calculate 0.3% trading fee correctly', async function () {
      const { market } = await loadFixture(deploySecondaryMarketFixture);

      // Example: $10,000 trade
      const tradeCost = ethers.parseUnits('10000', 6);
      const feeBPS = await market.TRADING_FEE_BPS(); // 30 basis points
      const bpsDivisor = await market.BPS_DIVISOR(); // 10000

      const expectedFee = (tradeCost * feeBPS) / bpsDivisor;
      expect(expectedFee).to.equal(ethers.parseUnits('30', 6)); // 0.3% of $10k = $30
    });
  });

  describe('Configuration', function () {
    it('Should set tranche tokens once', async function () {
      const { market, seniorToken, juniorToken } = await loadFixture(
        deploySecondaryMarketFixture
      );
      expect(await market.seniorToken()).to.equal(await seniorToken.getAddress());
      expect(await market.juniorToken()).to.equal(await juniorToken.getAddress());
    });

    // TODO: Implement in Week 3
    it.skip('Should revert setting tranche tokens twice', async function () {
      // Test cannot override tokens
    });

    it.skip('Should only allow admin to set tokens', async function () {
      // Test access control
    });
  });

  describe('Access Control', function () {
    // TODO: Implement in Week 3
    it.skip('Should grant operator role', async function () {
      // Test role granting
    });

    it.skip('Should only allow admin to set configuration', async function () {
      // Test admin-only functions
    });
  });

  describe('Edge Cases', function () {
    // TODO: Implement in Week 3
    it.skip('Should handle multiple partial fills of same order', async function () {
      // Test order amount decrements correctly
    });

    it.skip('Should handle very small orders (dust amounts)', async function () {
      // Test minimum viable order size
    });

    it.skip('Should handle very large orders', async function () {
      // Test $1M+ orders
    });

    it.skip('Should handle concurrent order fills', async function () {
      // Test race conditions
    });
  });
});
