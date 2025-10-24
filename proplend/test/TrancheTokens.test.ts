import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import type { TrancheToken } from '../typechain-types';

/**
 * @title TrancheToken Test Suite
 * @notice Tests for sSAFE (senior) and jYIELD (junior) tranche tokens
 *
 * Test Coverage:
 * - Token deployment and initialization
 * - Minting and burning mechanics
 * - ERC-20 standard compliance
 * - Access control (minter/burner roles)
 * - Decimal precision (6 decimals)
 */
describe('TrancheToken', function () {
  /**
   * Fixture: Deploy both senior and junior tranche tokens
   */
  async function deployTrancheTokensFixture() {
    const [owner, minter, burner, user1, user2] = await ethers.getSigners();

    // Deploy Senior Token (sSAFE)
    const TrancheToken = await ethers.getContractFactory('TrancheToken');
    const seniorToken = (await TrancheToken.deploy(
      'Senior SAFE Token',
      'sSAFE',
      true
    )) as TrancheToken;

    // Deploy Junior Token (jYIELD)
    const juniorToken = (await TrancheToken.deploy(
      'Junior YIELD Token',
      'jYIELD',
      false
    )) as TrancheToken;

    // Grant roles
    const MINTER_ROLE = await seniorToken.MINTER_ROLE();
    const BURNER_ROLE = await seniorToken.BURNER_ROLE();

    await seniorToken.grantRole(MINTER_ROLE, minter.address);
    await seniorToken.grantRole(BURNER_ROLE, burner.address);
    await juniorToken.grantRole(MINTER_ROLE, minter.address);
    await juniorToken.grantRole(BURNER_ROLE, burner.address);

    return { seniorToken, juniorToken, owner, minter, burner, user1, user2 };
  }

  describe('Deployment', function () {
    it('Should deploy senior token with correct metadata', async function () {
      const { seniorToken } = await loadFixture(deployTrancheTokensFixture);
      expect(await seniorToken.name()).to.equal('Senior SAFE Token');
      expect(await seniorToken.symbol()).to.equal('sSAFE');
      expect(await seniorToken.decimals()).to.equal(6);
      expect(await seniorToken.isSenior()).to.be.true;
    });

    it('Should deploy junior token with correct metadata', async function () {
      const { juniorToken } = await loadFixture(deployTrancheTokensFixture);
      expect(await juniorToken.name()).to.equal('Junior YIELD Token');
      expect(await juniorToken.symbol()).to.equal('jYIELD');
      expect(await juniorToken.decimals()).to.equal(6);
      expect(await juniorToken.isSenior()).to.be.false;
    });

    it('Should have 6 decimals to match USDC', async function () {
      const { seniorToken, juniorToken } = await loadFixture(deployTrancheTokensFixture);
      expect(await seniorToken.decimals()).to.equal(6);
      expect(await juniorToken.decimals()).to.equal(6);
    });
  });

  describe('Minting', function () {
    // TODO: Implement in Week 2
    it.skip('Should mint tokens with MINTER_ROLE', async function () {
      // Test minting by authorized minter
    });

    it.skip('Should revert minting without MINTER_ROLE', async function () {
      // Test unauthorized minting fails
    });

    it.skip('Should revert minting zero amount', async function () {
      // Test zero amount validation
    });

    it.skip('Should emit Transfer event on mint', async function () {
      // Test event emission
    });

    it.skip('Should update total supply on mint', async function () {
      // Test totalSupply tracking
    });
  });

  describe('Burning', function () {
    // TODO: Implement in Week 2
    it.skip('Should burn tokens with BURNER_ROLE', async function () {
      // Test burning by authorized burner
    });

    it.skip('Should revert burning without BURNER_ROLE', async function () {
      // Test unauthorized burning fails
    });

    it.skip('Should revert burning zero amount', async function () {
      // Test zero amount validation
    });

    it.skip('Should revert burning more than balance', async function () {
      // Test insufficient balance check
    });

    it.skip('Should emit Transfer event on burn', async function () {
      // Test event emission
    });

    it.skip('Should update total supply on burn', async function () {
      // Test totalSupply tracking
    });
  });

  describe('ERC-20 Compliance', function () {
    // TODO: Implement in Week 2
    it.skip('Should transfer tokens between accounts', async function () {
      // Test standard ERC-20 transfer
    });

    it.skip('Should approve allowance and transferFrom', async function () {
      // Test approve/transferFrom pattern
    });

    it.skip('Should return correct balanceOf', async function () {
      // Test balance queries
    });

    it.skip('Should return correct totalSupply', async function () {
      // Test total supply queries
    });
  });

  describe('View Functions', function () {
    it('Should return correct tranche type for senior', async function () {
      const { seniorToken } = await loadFixture(deployTrancheTokensFixture);
      expect(await seniorToken.getTrancheType()).to.equal('Senior');
    });

    it('Should return correct tranche type for junior', async function () {
      const { juniorToken } = await loadFixture(deployTrancheTokensFixture);
      expect(await juniorToken.getTrancheType()).to.equal('Junior');
    });
  });

  describe('Access Control', function () {
    // TODO: Implement in Week 2
    it.skip('Should grant and revoke MINTER_ROLE', async function () {
      // Test role management
    });

    it.skip('Should grant and revoke BURNER_ROLE', async function () {
      // Test role management
    });

    it.skip('Should only allow admin to grant roles', async function () {
      // Test admin-only role granting
    });
  });
});
