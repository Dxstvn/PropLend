import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import type { LendingPool, MockUSDC, TrancheToken } from '../types/ethers-contracts';

/**
 * @title LendingPool Test Suite
 * @notice Comprehensive tests for the PropertyLend lending pool
 *
 * Test Coverage:
 * - Deployment and initialization
 * - Senior and junior tranche deposits
 * - Withdrawal mechanics
 * - Loan origination and LTV validation
 * - Loan repayment and interest distribution
 * - Liquidation process
 * - Access control and permissions
 */
describe('LendingPool', function () {
  /**
   * Fixture: Deploy contracts with initial setup
   */
  async function deployLendingPoolFixture() {
    const [owner, senior1, junior1, borrower, admin] = await ethers.getSigners();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory('MockUSDC');
    const usdc = await MockUSDC.deploy();

    // Deploy LendingPool
    const LendingPool = await ethers.getContractFactory('LendingPool');
    const pool = await LendingPool.deploy(await usdc.getAddress());

    // Deploy TrancheTokens
    const TrancheToken = await ethers.getContractFactory('TrancheToken');
    const seniorToken = await TrancheToken.deploy(
      'PropertyLend Senior',
      'sSAFE',
      true
    );
    const juniorToken = await TrancheToken.deploy(
      'PropertyLend Junior',
      'jYIELD',
      false
    );

    // Set tranche tokens in pool
    await pool.setTrancheTokens(
      await seniorToken.getAddress(),
      await juniorToken.getAddress()
    );

    // Grant MINTER_ROLE and BURNER_ROLE to pool
    const minterRole = await seniorToken.MINTER_ROLE();
    const burnerRole = await seniorToken.BURNER_ROLE();
    await seniorToken.grantRole(minterRole, await pool.getAddress());
    await seniorToken.grantRole(burnerRole, await pool.getAddress());
    await juniorToken.grantRole(minterRole, await pool.getAddress());
    await juniorToken.grantRole(burnerRole, await pool.getAddress());

    // Mint USDC to test accounts
    await usdc.mint(senior1.address, ethers.parseUnits('1000000', 6)); // 1M USDC
    await usdc.mint(junior1.address, ethers.parseUnits('500000', 6)); // 500k USDC
    await usdc.mint(borrower.address, ethers.parseUnits('100000', 6)); // 100k USDC

    return { pool, usdc, seniorToken, juniorToken, owner, senior1, junior1, borrower, admin };
  }

  describe('Deployment', function () {
    it('Should deploy with correct USDC address', async function () {
      const { pool, usdc } = await loadFixture(deployLendingPoolFixture);
      expect(await pool.usdc()).to.equal(await usdc.getAddress());
    });

    it('Should set deployer as admin', async function () {
      const { pool, owner } = await loadFixture(deployLendingPoolFixture);
      const adminRole = await pool.ADMIN_ROLE();
      expect(await pool.hasRole(adminRole, owner.address)).to.be.true;
    });

    it('Should initialize with zero TVL', async function () {
      const { pool } = await loadFixture(deployLendingPoolFixture);
      expect(await pool.getTotalValue()).to.equal(0);
    });
  });

  describe('Deposits', function () {
    it('Should accept senior tranche deposits', async function () {
      const { pool, usdc, seniorToken, senior1 } = await loadFixture(deployLendingPoolFixture);

      const depositAmount = ethers.parseUnits('10000', 6); // $10,000

      // Approve pool to spend USDC
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);

      // Deposit into senior tranche
      await expect(pool.connect(senior1).deposit(depositAmount, true))
        .to.emit(pool, 'Deposited')
        .withArgs(senior1.address, depositAmount, true, depositAmount);

      // Verify senior TVL increased
      expect(await pool.getSeniorTVL()).to.equal(depositAmount);

      // Verify user received tranche tokens
      expect(await seniorToken.balanceOf(senior1.address)).to.equal(depositAmount);

      // Verify user's shares tracked
      expect(await pool.getUserBalance(senior1.address, true)).to.equal(depositAmount);
    });

    it('Should accept junior tranche deposits', async function () {
      const { pool, usdc, juniorToken, junior1 } = await loadFixture(deployLendingPoolFixture);

      const depositAmount = ethers.parseUnits('5000', 6); // $5,000

      // Approve pool to spend USDC
      await usdc.connect(junior1).approve(await pool.getAddress(), depositAmount);

      // Deposit into junior tranche
      await expect(pool.connect(junior1).deposit(depositAmount, false))
        .to.emit(pool, 'Deposited')
        .withArgs(junior1.address, depositAmount, false, depositAmount);

      // Verify junior TVL increased
      expect(await pool.getJuniorTVL()).to.equal(depositAmount);

      // Verify user received tranche tokens
      expect(await juniorToken.balanceOf(junior1.address)).to.equal(depositAmount);

      // Verify user's shares tracked
      expect(await pool.getUserBalance(junior1.address, false)).to.equal(depositAmount);
    });

    it('Should enforce minimum deposit of $100', async function () {
      const { pool, usdc, senior1 } = await loadFixture(deployLendingPoolFixture);

      const belowMinimum = ethers.parseUnits('99', 6); // $99

      // Approve pool to spend USDC
      await usdc.connect(senior1).approve(await pool.getAddress(), belowMinimum);

      // Should revert with BelowMinimumDeposit error
      await expect(pool.connect(senior1).deposit(belowMinimum, true)).to.be.revertedWithCustomError(
        pool,
        'BelowMinimumDeposit'
      );
    });

    it('Should maintain 80/20 tranche ratio target', async function () {
      const { pool, usdc, senior1, junior1 } = await loadFixture(deployLendingPoolFixture);

      // Senior deposits $800k
      const seniorAmount = ethers.parseUnits('800000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), seniorAmount);
      await pool.connect(senior1).deposit(seniorAmount, true);

      // Junior deposits $200k
      const juniorAmount = ethers.parseUnits('200000', 6);
      await usdc.connect(junior1).approve(await pool.getAddress(), juniorAmount);
      await pool.connect(junior1).deposit(juniorAmount, false);

      // Verify tranche ratio is 80/20
      const [seniorRatio, juniorRatio] = await pool.getTrancheRatio();
      expect(seniorRatio).to.equal(80);
      expect(juniorRatio).to.equal(20);

      // Verify total TVL
      expect(await pool.getTotalValue()).to.equal(seniorAmount + juniorAmount);
    });

    it('Should mint tranche tokens proportional to deposit', async function () {
      const { pool, usdc, seniorToken, junior1, juniorToken, senior1 } = await loadFixture(
        deployLendingPoolFixture
      );

      // Senior deposits $50,000
      const seniorAmount = ethers.parseUnits('50000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), seniorAmount);
      await pool.connect(senior1).deposit(seniorAmount, true);

      // Verify 1:1 token minting (MVP implementation)
      expect(await seniorToken.balanceOf(senior1.address)).to.equal(seniorAmount);

      // Junior deposits $25,000
      const juniorAmount = ethers.parseUnits('25000', 6);
      await usdc.connect(junior1).approve(await pool.getAddress(), juniorAmount);
      await pool.connect(junior1).deposit(juniorAmount, false);

      // Verify 1:1 token minting (MVP implementation)
      expect(await juniorToken.balanceOf(junior1.address)).to.equal(juniorAmount);
    });
  });

  describe('Withdrawals', function () {
    it('Should allow withdrawal from senior tranche', async function () {
      const { pool, usdc, seniorToken, senior1 } = await loadFixture(deployLendingPoolFixture);

      // First, make a deposit
      const depositAmount = ethers.parseUnits('10000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      const initialBalance = await usdc.balanceOf(senior1.address);

      // Withdraw half
      const withdrawAmount = ethers.parseUnits('5000', 6);
      await expect(pool.connect(senior1).withdraw(withdrawAmount, true))
        .to.emit(pool, 'Withdrawn')
        .withArgs(senior1.address, withdrawAmount, true, withdrawAmount);

      // Verify USDC returned to user
      expect(await usdc.balanceOf(senior1.address)).to.equal(initialBalance + withdrawAmount);

      // Verify senior TVL decreased
      expect(await pool.getSeniorTVL()).to.equal(depositAmount - withdrawAmount);

      // Verify user's shares decreased
      expect(await pool.getUserBalance(senior1.address, true)).to.equal(
        depositAmount - withdrawAmount
      );
    });

    it('Should allow withdrawal from junior tranche', async function () {
      const { pool, usdc, juniorToken, junior1 } = await loadFixture(deployLendingPoolFixture);

      // First, make a deposit
      const depositAmount = ethers.parseUnits('5000', 6);
      await usdc.connect(junior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(junior1).deposit(depositAmount, false);

      const initialBalance = await usdc.balanceOf(junior1.address);

      // Withdraw all
      await expect(pool.connect(junior1).withdraw(depositAmount, false))
        .to.emit(pool, 'Withdrawn')
        .withArgs(junior1.address, depositAmount, false, depositAmount);

      // Verify USDC returned to user
      expect(await usdc.balanceOf(junior1.address)).to.equal(initialBalance + depositAmount);

      // Verify junior TVL is zero
      expect(await pool.getJuniorTVL()).to.equal(0);

      // Verify user's shares are zero
      expect(await pool.getUserBalance(junior1.address, false)).to.equal(0);
    });

    it('Should burn tranche tokens on withdrawal', async function () {
      const { pool, usdc, seniorToken, senior1 } = await loadFixture(deployLendingPoolFixture);

      // First, make a deposit
      const depositAmount = ethers.parseUnits('10000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Verify tokens were minted
      expect(await seniorToken.balanceOf(senior1.address)).to.equal(depositAmount);

      // Withdraw half
      const withdrawAmount = ethers.parseUnits('5000', 6);
      await pool.connect(senior1).withdraw(withdrawAmount, true);

      // Verify tokens were burned
      expect(await seniorToken.balanceOf(senior1.address)).to.equal(
        depositAmount - withdrawAmount
      );
    });

    it('Should enforce liquidity limits', async function () {
      const { pool, usdc, senior1, borrower, owner } = await loadFixture(deployLendingPoolFixture);

      // Deposit into senior tranche
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner for loan origination
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Originate a loan that deploys most capital
      const loanAmount = ethers.parseUnits('90000', 6);
      const propertyValue = ethers.parseUnits('150000', 6);
      const propertyId = ethers.id('property-123');
      await pool.connect(owner).applyForLoan(loanAmount, propertyId, propertyValue, 12);

      // Try to withdraw more than available liquidity
      const withdrawAmount = ethers.parseUnits('20000', 6);
      await expect(pool.connect(senior1).withdraw(withdrawAmount, true)).to.be.revertedWithCustomError(
        pool,
        'InsufficientBalance'
      );
    });
  });

  describe('Loan Origination', function () {
    it('Should originate loan within LTV limits', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Apply for loan
      const loanAmount = ethers.parseUnits('50000', 6);
      const propertyValue = ethers.parseUnits('100000', 6); // 50% LTV
      const propertyId = ethers.id('property-123');
      const term = 12;

      const borrowerInitialBalance = await usdc.balanceOf(owner.address);

      await expect(pool.connect(owner).applyForLoan(loanAmount, propertyId, propertyValue, term))
        .to.emit(pool, 'LoanOriginated')
        .withArgs(0, owner.address, loanAmount, 1800); // 18% rate for 50% LTV

      // Verify loan created
      const loan = await pool.getLoan(0);
      expect(loan.borrower).to.equal(owner.address);
      expect(loan.amount).to.equal(loanAmount);
      expect(loan.ltv).to.equal(50);
      expect(loan.propertyId).to.equal(propertyId);

      // Verify USDC transferred to borrower
      expect(await usdc.balanceOf(owner.address)).to.equal(borrowerInitialBalance + loanAmount);

      // Verify totalDeployed increased
      expect(await pool.totalDeployed()).to.equal(loanAmount);
    });

    it('Should reject loan exceeding max LTV', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Apply for loan with LTV > 65%
      const loanAmount = ethers.parseUnits('70000', 6);
      const propertyValue = ethers.parseUnits('100000', 6); // 70% LTV
      const propertyId = ethers.id('property-456');

      await expect(
        pool.connect(owner).applyForLoan(loanAmount, propertyId, propertyValue, 12)
      ).to.be.revertedWithCustomError(pool, 'ExceedsMaxLTV');
    });

    it('Should calculate interest rate based on LTV', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('200000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Test 50% LTV -> 18% rate
      const loan1Amount = ethers.parseUnits('50000', 6);
      const property1Value = ethers.parseUnits('100000', 6);
      await pool
        .connect(owner)
        .applyForLoan(loan1Amount, ethers.id('prop1'), property1Value, 12);
      const loan1 = await pool.getLoan(0);
      expect(loan1.interestRate).to.equal(1800); // 18%

      // Test 60% LTV -> ~20.67% rate
      const loan2Amount = ethers.parseUnits('60000', 6);
      const property2Value = ethers.parseUnits('100000', 6);
      await pool
        .connect(owner)
        .applyForLoan(loan2Amount, ethers.id('prop2'), property2Value, 12);
      const loan2 = await pool.getLoan(1);
      expect(loan2.interestRate).to.be.closeTo(2067n, 10n); // ~20.67%

      // Test 65% LTV -> 24% rate
      const loan3Amount = ethers.parseUnits('65000', 6);
      const property3Value = ethers.parseUnits('100000', 6);
      await pool
        .connect(owner)
        .applyForLoan(loan3Amount, ethers.id('prop3'), property3Value, 6);
      const loan3 = await pool.getLoan(2);
      expect(loan3.interestRate).to.equal(2400); // 24% (capped at max)
    });

    it('Should transfer USDC to borrower on approval', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      const borrowerInitialBalance = await usdc.balanceOf(owner.address);
      const loanAmount = ethers.parseUnits('30000', 6);
      const propertyValue = ethers.parseUnits('60000', 6);

      await pool
        .connect(owner)
        .applyForLoan(loanAmount, ethers.id('property-789'), propertyValue, 6);

      // Verify borrower received USDC
      expect(await usdc.balanceOf(owner.address)).to.equal(borrowerInitialBalance + loanAmount);

      // Verify pool balance decreased
      expect(await usdc.balanceOf(await pool.getAddress())).to.equal(depositAmount - loanAmount);
    });

    it('Should enforce term limits (6-12 months)', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      const loanAmount = ethers.parseUnits('30000', 6);
      const propertyValue = ethers.parseUnits('60000', 6);

      // Term too short
      await expect(
        pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop1'), propertyValue, 3)
      ).to.be.revertedWith('Term must be 6-12 months');

      // Term too long
      await expect(
        pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop2'), propertyValue, 24)
      ).to.be.revertedWith('Term must be 6-12 months');
    });
  });

  describe('Loan Repayment', function () {
    it('Should accept loan repayment with interest', async function () {
      const { pool, usdc, owner, borrower, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Originate loan
      const loanAmount = ethers.parseUnits('50000', 6);
      const propertyValue = ethers.parseUnits('100000', 6);
      await pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop'), propertyValue, 12);

      // Get loan details
      const loan = await pool.getLoan(0);
      const termMonths = 12n;
      const totalInterest = (loanAmount * loan.interestRate * termMonths) / (10000n * 12n);
      const totalRepayment = loanAmount + totalInterest;

      // Mint USDC to owner for repayment
      await usdc.mint(owner.address, totalInterest);

      // Approve and repay
      await usdc.connect(owner).approve(await pool.getAddress(), totalRepayment);
      await expect(pool.connect(owner).repayLoan(0))
        .to.emit(pool, 'LoanRepaid')
        .withArgs(0, totalRepayment);

      // Verify loan status
      const updatedLoan = await pool.getLoan(0);
      expect(updatedLoan.status).to.equal(2); // LoanStatus.Repaid

      // Verify totalDeployed decreased
      expect(await pool.totalDeployed()).to.equal(0);
    });

    it('Should distribute interest via waterfall', async function () {
      const { pool, usdc, owner, senior1, junior1 } = await loadFixture(deployLendingPoolFixture);

      // Deploy InterestDistributor
      const InterestDistributor = await ethers.getContractFactory('InterestDistributor');
      const distributor = await InterestDistributor.deploy(
        await usdc.getAddress(),
        owner.address // Platform treasury
      );

      // Set distributor in pool
      await pool.setInterestDistributor(await distributor.getAddress());

      // Deposit capital: $80k senior, $20k junior
      const seniorAmount = ethers.parseUnits('80000', 6);
      const juniorAmount = ethers.parseUnits('20000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), seniorAmount);
      await pool.connect(senior1).deposit(seniorAmount, true);
      await usdc.connect(junior1).approve(await pool.getAddress(), juniorAmount);
      await pool.connect(junior1).deposit(juniorAmount, false);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Originate loan
      const loanAmount = ethers.parseUnits('50000', 6);
      const propertyValue = ethers.parseUnits('100000', 6);
      await pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop'), propertyValue, 12);

      // Calculate repayment
      const loan = await pool.getLoan(0);
      const termMonths = 12n;
      const totalInterest = (loanAmount * loan.interestRate * termMonths) / (10000n * 12n);
      const totalRepayment = loanAmount + totalInterest;

      // Mint USDC to owner for repayment
      await usdc.mint(owner.address, totalInterest);

      // Record platform treasury balance before
      const treasuryBalanceBefore = await usdc.balanceOf(owner.address);

      // Repay loan
      await usdc.connect(owner).approve(await pool.getAddress(), totalRepayment);
      await pool.connect(owner).repayLoan(0);

      // Verify platform fee was transferred
      const treasuryBalanceAfter = await usdc.balanceOf(owner.address);
      const platformFee = treasuryBalanceAfter - treasuryBalanceBefore + totalRepayment;
      expect(platformFee).to.be.greaterThan(0);
    });

    it('Should mark loan as repaid', async function () {
      const { pool, usdc, owner, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Originate loan
      const loanAmount = ethers.parseUnits('30000', 6);
      const propertyValue = ethers.parseUnits('60000', 6);
      await pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop'), propertyValue, 6);

      // Verify loan is Active
      let loan = await pool.getLoan(0);
      expect(loan.status).to.equal(1); // LoanStatus.Active

      // Repay loan
      const termMonths = 6n;
      const totalInterest = (loanAmount * loan.interestRate * termMonths) / (10000n * 12n);
      const totalRepayment = loanAmount + totalInterest;
      await usdc.mint(owner.address, totalInterest);
      await usdc.connect(owner).approve(await pool.getAddress(), totalRepayment);
      await pool.connect(owner).repayLoan(0);

      // Verify loan is Repaid
      loan = await pool.getLoan(0);
      expect(loan.status).to.equal(2); // LoanStatus.Repaid
    });

    it('Should only allow borrower to repay their own loan', async function () {
      const { pool, usdc, owner, senior1, borrower } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Grant OPERATOR_ROLE to owner
      const operatorRole = await pool.OPERATOR_ROLE();
      await pool.grantRole(operatorRole, owner.address);

      // Originate loan (owner is borrower)
      const loanAmount = ethers.parseUnits('30000', 6);
      const propertyValue = ethers.parseUnits('60000', 6);
      await pool.connect(owner).applyForLoan(loanAmount, ethers.id('prop'), propertyValue, 6);

      // Try to repay as different user
      const loan = await pool.getLoan(0);
      const termMonths = 6n;
      const totalInterest = (loanAmount * loan.interestRate * termMonths) / (10000n * 12n);
      const totalRepayment = loanAmount + totalInterest;
      await usdc.mint(borrower.address, totalRepayment);
      await usdc.connect(borrower).approve(await pool.getAddress(), totalRepayment);

      await expect(pool.connect(borrower).repayLoan(0)).to.be.revertedWithCustomError(
        pool,
        'Unauthorized'
      );
    });
  });

  describe('Liquidation', function () {
    // TODO: Implement in Week 2
    it.skip('Should liquidate defaulted loans', async function () {
      // Test liquidation process
    });

    it.skip('Should only allow operator to liquidate', async function () {
      // Test access control for liquidation
    });

    it.skip('Should emit LoanDefaulted event', async function () {
      // Test event emission
    });
  });

  describe('View Functions', function () {
    it('Should return correct TVL', async function () {
      const { pool } = await loadFixture(deployLendingPoolFixture);
      const tvl = await pool.getTotalValue();
      expect(tvl).to.equal(0); // Initially zero
    });

    it('Should return correct tranche ratio', async function () {
      const { pool } = await loadFixture(deployLendingPoolFixture);
      const [senior, junior] = await pool.getTrancheRatio();
      expect(senior).to.equal(80);
      expect(junior).to.equal(20);
    });
  });

  describe('Access Control', function () {
    it('Should only allow admin to set tranche tokens', async function () {
      const { pool, senior1 } = await loadFixture(deployLendingPoolFixture);

      const TrancheToken = await ethers.getContractFactory('TrancheToken');
      const newSeniorToken = await TrancheToken.deploy('New Senior', 'nSAFE', true);
      const newJuniorToken = await TrancheToken.deploy('New Junior', 'nYIELD', false);

      // Create new pool without tokens set
      const LendingPool = await ethers.getContractFactory('LendingPool');
      const MockUSDC = await ethers.getContractFactory('MockUSDC');
      const usdc = await MockUSDC.deploy();
      const newPool = await LendingPool.deploy(await usdc.getAddress());

      // Try to set as non-admin
      const adminRole = await newPool.ADMIN_ROLE();
      await expect(
        newPool
          .connect(senior1)
          .setTrancheTokens(await newSeniorToken.getAddress(), await newJuniorToken.getAddress())
      ).to.be.reverted; // AccessControl: account is missing role

      // Should succeed as admin (owner)
      await newPool.setTrancheTokens(
        await newSeniorToken.getAddress(),
        await newJuniorToken.getAddress()
      );
      expect(await newPool.seniorToken()).to.equal(await newSeniorToken.getAddress());
    });

    it('Should only allow operator to originate loans', async function () {
      const { pool, usdc, senior1, borrower } = await loadFixture(deployLendingPoolFixture);

      // Deposit capital first
      const depositAmount = ethers.parseUnits('100000', 6);
      await usdc.connect(senior1).approve(await pool.getAddress(), depositAmount);
      await pool.connect(senior1).deposit(depositAmount, true);

      // Try to originate loan as non-operator
      const loanAmount = ethers.parseUnits('30000', 6);
      const propertyValue = ethers.parseUnits('60000', 6);

      await expect(
        pool
          .connect(borrower)
          .applyForLoan(loanAmount, ethers.id('prop'), propertyValue, 6)
      ).to.be.reverted; // AccessControl: account is missing role
    });

    it('Should only allow operator to liquidate loans', async function () {
      const { pool, senior1 } = await loadFixture(deployLendingPoolFixture);

      // Try to liquidate as non-operator
      await expect(pool.connect(senior1).liquidateLoan(0)).to.be.reverted; // AccessControl: account is missing role
    });

    it('Should only allow admin to set InterestDistributor', async function () {
      const { pool, usdc, senior1, owner } = await loadFixture(deployLendingPoolFixture);

      // Create new pool without distributor set
      const LendingPool = await ethers.getContractFactory('LendingPool');
      const MockUSDC = await ethers.getContractFactory('MockUSDC');
      const mockUsdc = await MockUSDC.deploy();
      const newPool = await LendingPool.deploy(await mockUsdc.getAddress());

      const InterestDistributor = await ethers.getContractFactory('InterestDistributor');
      const distributor = await InterestDistributor.deploy(
        await mockUsdc.getAddress(),
        owner.address
      );

      // Try as non-admin
      await expect(
        newPool.connect(senior1).setInterestDistributor(await distributor.getAddress())
      ).to.be.reverted;

      // Should succeed as admin
      await newPool.setInterestDistributor(await distributor.getAddress());
      expect(await newPool.interestDistributor()).to.equal(await distributor.getAddress());
    });

    it('Should prevent setting tranche tokens twice', async function () {
      const { pool } = await loadFixture(deployLendingPoolFixture);

      const TrancheToken = await ethers.getContractFactory('TrancheToken');
      const newSeniorToken = await TrancheToken.deploy('New Senior', 'nSAFE', true);
      const newJuniorToken = await TrancheToken.deploy('New Junior', 'nYIELD', false);

      // Try to set again (already set in fixture)
      await expect(
        pool.setTrancheTokens(await newSeniorToken.getAddress(), await newJuniorToken.getAddress())
      ).to.be.revertedWith('Already set');
    });
  });
});
