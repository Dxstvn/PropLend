import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import type { InterestDistributor, MockUSDC } from '../typechain-types';

/**
 * @title InterestDistributor Test Suite
 * @notice Tests for the waterfall payment distribution system
 *
 * Test Coverage:
 * - Deployment and initialization
 * - Waterfall distribution logic (Senior → Platform → Junior)
 * - Interest calculations (monthly, annual)
 * - Platform margin calculations
 * - Distribution statistics tracking
 * - Access control
 *
 * Example Scenario:
 * - $1M total capital (80% senior = $800k, 20% junior = $200k)
 * - $200k loan at 20% interest = $40k annual interest
 * - Distribution: $64k to senior (8% on $800k), $8k platform (2%), $128k to junior (64% on $200k)
 */
describe('InterestDistributor', function () {
  /**
   * Fixture: Deploy InterestDistributor with MockUSDC
   */
  async function deployDistributorFixture() {
    const [owner, operator, treasury, seniorInvestor, juniorInvestor] =
      await ethers.getSigners();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory('MockUSDC');
    const usdc = (await MockUSDC.deploy()) as MockUSDC;

    // Deploy InterestDistributor
    const InterestDistributor = await ethers.getContractFactory('InterestDistributor');
    const distributor = (await InterestDistributor.deploy(
      await usdc.getAddress(),
      treasury.address
    )) as InterestDistributor;

    // Grant operator role
    const OPERATOR_ROLE = await distributor.OPERATOR_ROLE();
    await distributor.grantRole(OPERATOR_ROLE, operator.address);

    // Mint USDC for testing
    await usdc.mint(await distributor.getAddress(), ethers.parseUnits('1000000', 6));

    return { distributor, usdc, owner, operator, treasury, seniorInvestor, juniorInvestor };
  }

  describe('Deployment', function () {
    it('Should deploy with correct USDC address', async function () {
      const { distributor, usdc } = await loadFixture(deployDistributorFixture);
      expect(await distributor.usdc()).to.equal(await usdc.getAddress());
    });

    it('Should deploy with correct treasury address', async function () {
      const { distributor, treasury } = await loadFixture(deployDistributorFixture);
      expect(await distributor.platformTreasury()).to.equal(treasury.address);
    });

    it('Should set deployer as admin', async function () {
      const { distributor, owner } = await loadFixture(deployDistributorFixture);
      const adminRole = await distributor.DEFAULT_ADMIN_ROLE();
      expect(await distributor.hasRole(adminRole, owner.address)).to.be.true;
    });

    it('Should initialize with zero distribution stats', async function () {
      const { distributor } = await loadFixture(deployDistributorFixture);
      const [senior, junior, platform] = await distributor.getDistributionStats();
      expect(senior).to.equal(0);
      expect(junior).to.equal(0);
      expect(platform).to.equal(0);
    });
  });

  describe('Interest Distribution', function () {
    // TODO: Implement in Week 2
    it.skip('Should distribute interest via waterfall priority', async function () {
      // Test senior → platform → junior distribution
    });

    it.skip('Should prioritize senior tranche payments first', async function () {
      // Test senior gets paid before junior
    });

    it.skip('Should allocate excess yields to junior tranche', async function () {
      // Test junior receives remaining after senior + platform
    });

    it.skip('Should handle insufficient interest for senior target', async function () {
      // Test partial payment scenario
    });

    it.skip('Should emit InterestDistributed event', async function () {
      // Test event emission with amounts
    });

    it.skip('Should revert distribution with zero interest', async function () {
      // Test zero amount validation
    });

    it.skip('Should only allow operator to distribute', async function () {
      // Test access control
    });
  });

  describe('Interest Calculations', function () {
    it('Should calculate monthly senior interest correctly', async function () {
      const { distributor } = await loadFixture(deployDistributorFixture);

      // $800k senior TVL at 8% APY = $64k annual / 12 = $5,333.33 monthly
      const seniorTVL = ethers.parseUnits('800000', 6);
      const monthlyInterest = await distributor.calculateSeniorMonthlyInterest(seniorTVL);

      // Expected: 800000 * 8 / 100 / 12 = 5333.333333
      expect(monthlyInterest).to.equal(ethers.parseUnits('5333.333333', 6));
    });

    it('Should calculate platform margin correctly', async function () {
      const { distributor } = await loadFixture(deployDistributorFixture);

      // $40k total interest at 2% platform margin = $800
      const totalInterest = ethers.parseUnits('40000', 6);
      const platformMargin = await distributor.calculatePlatformMargin(totalInterest);

      expect(platformMargin).to.equal(ethers.parseUnits('800', 6));
    });

    it('Should handle zero TVL gracefully', async function () {
      const { distributor } = await loadFixture(deployDistributorFixture);
      const monthlyInterest = await distributor.calculateSeniorMonthlyInterest(0);
      expect(monthlyInterest).to.equal(0);
    });
  });

  describe('Distribution Statistics', function () {
    // TODO: Implement in Week 2
    it.skip('Should track total senior payments', async function () {
      // Test cumulative senior payment tracking
    });

    it.skip('Should track total junior payments', async function () {
      // Test cumulative junior payment tracking
    });

    it.skip('Should track total platform payments', async function () {
      // Test cumulative platform payment tracking
    });

    it.skip('Should return correct distribution stats', async function () {
      // Test getDistributionStats view function
    });
  });

  describe('Configuration', function () {
    // TODO: Implement in Week 2
    it.skip('Should set lending pool address once', async function () {
      // Test one-time lending pool configuration
    });

    it.skip('Should revert setting lending pool twice', async function () {
      // Test cannot override lending pool
    });

    it.skip('Should update platform treasury', async function () {
      // Test treasury address update
    });

    it.skip('Should emit PlatformTreasuryUpdated event', async function () {
      // Test event emission
    });

    it.skip('Should only allow admin to update treasury', async function () {
      // Test access control
    });
  });

  describe('Access Control', function () {
    it('Should grant operator role', async function () {
      const { distributor, operator } = await loadFixture(deployDistributorFixture);
      const operatorRole = await distributor.OPERATOR_ROLE();
      expect(await distributor.hasRole(operatorRole, operator.address)).to.be.true;
    });

    // TODO: Implement in Week 2
    it.skip('Should only allow operator to distribute interest', async function () {
      // Test operator-only distribution
    });

    it.skip('Should only allow admin to set lending pool', async function () {
      // Test admin-only configuration
    });
  });

  describe('Edge Cases', function () {
    // TODO: Implement in Week 2
    it.skip('Should handle very large interest amounts', async function () {
      // Test with $1M+ interest
    });

    it.skip('Should handle very small interest amounts', async function () {
      // Test with $0.01 interest (rounding)
    });

    it.skip('Should handle zero junior TVL gracefully', async function () {
      // Test when no junior investors
    });

    it.skip('Should handle zero senior TVL gracefully', async function () {
      // Test when no senior investors (should not occur in practice)
    });
  });
});
