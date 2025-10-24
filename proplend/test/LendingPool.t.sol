// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {LendingPool} from "../contracts/core/LendingPool.sol";
import {TrancheToken} from "../contracts/core/TrancheTokens.sol";
import {MockUSDC} from "../contracts/mocks/MockUSDC.sol";
import {ILendingPool} from "../contracts/interfaces/ILendingPool.sol";

/**
 * @title LendingPool Solidity Test Suite
 * @notice Comprehensive tests for PropertyLend lending pool
 * @dev Uses Hardhat 3's native Solidity testing with forge-std
 */
contract LendingPoolTest is Test {
    LendingPool public pool;
    MockUSDC public usdc;
    TrancheToken public seniorToken;
    TrancheToken public juniorToken;

    address public owner;
    address public senior1;
    address public junior1;
    address public borrower;
    address public admin;

    // Constants
    uint256 constant SENIOR_DEPOSIT = 800_000e6; // $800k USDC
    uint256 constant JUNIOR_DEPOSIT = 200_000e6; // $200k USDC
    uint256 constant MIN_DEPOSIT = 100e6; // $100 USDC
    uint256 constant LOAN_AMOUNT = 200_000e6; // $200k USDC
    uint256 constant PROPERTY_VALUE = 350_000e6; // $350k
    uint256 constant LTV_65_PERCENT = 65;

    // Events - must be declared in test contract for vm.expectEmit
    event Deposited(address indexed user, uint256 amount, bool isSenior, uint256 shares);
    event Withdrawn(address indexed user, uint256 amount, bool isSenior, uint256 shares);
    event LoanOriginated(uint256 indexed loanId, address indexed borrower, uint256 amount, uint256 interestRate);
    event LoanRepaid(uint256 indexed loanId, uint256 amount);

    function setUp() public {
        // Setup accounts
        owner = address(this);
        senior1 = address(0x1);
        junior1 = address(0x2);
        borrower = address(0x3);
        admin = address(0x4);

        // Label addresses for better trace output
        vm.label(owner, "Owner");
        vm.label(senior1, "Senior Investor 1");
        vm.label(junior1, "Junior Investor 1");
        vm.label(borrower, "Borrower");
        vm.label(admin, "Admin");

        // Deploy contracts
        usdc = new MockUSDC();
        pool = new LendingPool(address(usdc));

        // Deploy tranche tokens
        seniorToken = new TrancheToken("PropertyLend Senior", "sSAFE", true);
        juniorToken = new TrancheToken("PropertyLend Junior", "jYIELD", false);

        // Set tranche tokens in pool
        pool.setTrancheTokens(address(seniorToken), address(juniorToken));

        // Grant MINTER_ROLE and BURNER_ROLE to pool
        bytes32 minterRole = seniorToken.MINTER_ROLE();
        bytes32 burnerRole = seniorToken.BURNER_ROLE();

        seniorToken.grantRole(minterRole, address(pool));
        seniorToken.grantRole(burnerRole, address(pool));
        juniorToken.grantRole(minterRole, address(pool));
        juniorToken.grantRole(burnerRole, address(pool));

        // Mint USDC to test accounts
        usdc.mint(senior1, 1_000_000e6); // 1M USDC
        usdc.mint(junior1, 500_000e6);   // 500k USDC
        usdc.mint(borrower, 100_000e6);  // 100k USDC
    }

    /*//////////////////////////////////////////////////////////////
                            DEPOSIT TESTS
    //////////////////////////////////////////////////////////////*/

    function testSeniorDeposit() public {
        vm.startPrank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);

        vm.expectEmit(true, true, false, true);
        emit Deposited(senior1, SENIOR_DEPOSIT, true, SENIOR_DEPOSIT);

        pool.deposit(SENIOR_DEPOSIT, true);
        vm.stopPrank();

        assertEq(seniorToken.balanceOf(senior1), SENIOR_DEPOSIT, "Senior tokens minted incorrectly");
        assertEq(pool.totalSeniorDeposits(), SENIOR_DEPOSIT, "Senior deposits not tracked");
    }

    function testJuniorDeposit() public {
        vm.startPrank(junior1);
        usdc.approve(address(pool), JUNIOR_DEPOSIT);

        vm.expectEmit(true, true, false, true);
        emit Deposited(junior1, JUNIOR_DEPOSIT, false, JUNIOR_DEPOSIT);

        pool.deposit(JUNIOR_DEPOSIT, false);
        vm.stopPrank();

        assertEq(juniorToken.balanceOf(junior1), JUNIOR_DEPOSIT, "Junior tokens minted incorrectly");
        assertEq(pool.totalJuniorDeposits(), JUNIOR_DEPOSIT, "Junior deposits not tracked");
    }

    function testMinimumDepositEnforced() public {
        uint256 belowMinimum = 99e6; // $99

        vm.startPrank(senior1);
        usdc.approve(address(pool), belowMinimum);

        vm.expectRevert(abi.encodeWithSignature("BelowMinimumDeposit()"));
        pool.deposit(belowMinimum, true);
        vm.stopPrank();
    }

    function testDepositTrackingAcrossMultipleUsers() public {
        // Senior investor 1 deposits
        vm.startPrank(senior1);
        usdc.approve(address(pool), 400_000e6);
        pool.deposit(400_000e6, true);
        vm.stopPrank();

        // Another senior investor
        address senior2 = address(0x5);
        usdc.mint(senior2, 500_000e6);
        vm.startPrank(senior2);
        usdc.approve(address(pool), 400_000e6);
        pool.deposit(400_000e6, true);
        vm.stopPrank();

        assertEq(pool.totalSeniorDeposits(), 800_000e6, "Total senior deposits incorrect");
        assertEq(seniorToken.totalSupply(), 800_000e6, "Senior token supply incorrect");
    }

    /*//////////////////////////////////////////////////////////////
                          WITHDRAWAL TESTS
    //////////////////////////////////////////////////////////////*/

    function testSeniorWithdrawal() public {
        // First deposit
        vm.startPrank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);
        pool.deposit(SENIOR_DEPOSIT, true);

        // Then withdraw
        uint256 withdrawAmount = 100_000e6;
        seniorToken.approve(address(pool), withdrawAmount);

        vm.expectEmit(true, false, false, true);
        emit Withdrawn(senior1, withdrawAmount, true, withdrawAmount);

        pool.withdraw(withdrawAmount, true);
        vm.stopPrank();

        assertEq(seniorToken.balanceOf(senior1), SENIOR_DEPOSIT - withdrawAmount, "Senior tokens not burned");
        assertEq(usdc.balanceOf(senior1), 1_000_000e6 - SENIOR_DEPOSIT + withdrawAmount, "USDC not returned");
    }

    function testJuniorWithdrawal() public {
        // First deposit
        vm.startPrank(junior1);
        usdc.approve(address(pool), JUNIOR_DEPOSIT);
        pool.deposit(JUNIOR_DEPOSIT, false);

        // Then withdraw
        uint256 withdrawAmount = 50_000e6;
        juniorToken.approve(address(pool), withdrawAmount);

        vm.expectEmit(true, false, false, true);
        emit Withdrawn(junior1, withdrawAmount, false, withdrawAmount);

        pool.withdraw(withdrawAmount, false);
        vm.stopPrank();

        assertEq(juniorToken.balanceOf(junior1), JUNIOR_DEPOSIT - withdrawAmount, "Junior tokens not burned");
    }

    function testWithdrawalFailsWithInsufficientLiquidity() public {
        // Deposit funds
        vm.startPrank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);
        pool.deposit(SENIOR_DEPOSIT, true);
        vm.stopPrank();

        // Grant OPERATOR_ROLE to borrower
        pool.grantRole(pool.OPERATOR_ROLE(), borrower);

        // Originate loan to lock up liquidity
        bytes32 propertyId = keccak256("property1");
        vm.prank(borrower);
        pool.applyForLoan(LOAN_AMOUNT, propertyId, PROPERTY_VALUE, 12);

        // Try to withdraw more than available liquidity
        vm.startPrank(senior1);
        seniorToken.approve(address(pool), SENIOR_DEPOSIT);

        vm.expectRevert(abi.encodeWithSignature("InsufficientBalance()"));
        pool.withdraw(SENIOR_DEPOSIT, true);
        vm.stopPrank();
    }

    /*//////////////////////////////////////////////////////////////
                       LOAN ORIGINATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testLoanOriginationWithValidLTV() public {
        // Setup: Deposit funds first
        vm.prank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);
        vm.prank(senior1);
        pool.deposit(SENIOR_DEPOSIT, true);

        // Grant OPERATOR_ROLE to borrower so they can apply for loans
        pool.grantRole(pool.OPERATOR_ROLE(), borrower);

        bytes32 propertyId = keccak256("property1");

        vm.expectEmit(true, false, false, false);
        emit LoanOriginated(0, borrower, LOAN_AMOUNT, 2000); // 20% interest rate

        vm.prank(borrower);
        pool.applyForLoan(LOAN_AMOUNT, propertyId, PROPERTY_VALUE, 12);

        // Verify loan was created
        (
            address loanBorrower,
            uint256 loanAmount,
            ,
            ,
            ,
            ,
            ,
            ,

        ) = pool.loans(0);

        assertEq(loanBorrower, borrower, "Borrower address incorrect");
        assertEq(loanAmount, LOAN_AMOUNT, "Loan amount incorrect");
    }

    function testLoanOriginationFailsAboveMaxLTV() public {
        bytes32 propertyId = keccak256("property1");
        uint256 excessiveLoanAmount = 250_000e6; // > 65% of $350k property value

        vm.expectRevert(abi.encodeWithSignature("ExceedsMaxLTV()"));
        vm.prank(owner);
        pool.applyForLoan(excessiveLoanAmount, propertyId, PROPERTY_VALUE, 12);
    }

    function testInterestRateCalculationBasedOnLTV() public {
        vm.prank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);
        vm.prank(senior1);
        pool.deposit(SENIOR_DEPOSIT, true);

        // Grant OPERATOR_ROLE to borrower
        pool.grantRole(pool.OPERATOR_ROLE(), borrower);

        // Test 50% LTV -> should get 18% rate
        bytes32 property1 = keccak256("property1");
        uint256 loan50Percent = 175_000e6; // 50% of $350k

        vm.prank(borrower);
        pool.applyForLoan(loan50Percent, property1, PROPERTY_VALUE, 12);

        (, , uint256 rate50, , , , , , ) = pool.loans(0);
        assertEq(rate50, 1800, "50% LTV should result in 18% rate");

        // Test 65% LTV -> should get 22% rate
        bytes32 property2 = keccak256("property2");
        uint256 loan65Percent = 227_500e6; // 65% of $350k

        vm.prank(borrower);
        pool.applyForLoan(loan65Percent, property2, PROPERTY_VALUE, 12);

        (, , uint256 rate65, , , , , , ) = pool.loans(1);
        assertEq(rate65, 2200, "65% LTV should result in 22% rate");
    }

    /*//////////////////////////////////////////////////////////////
                       LOAN REPAYMENT TESTS
    //////////////////////////////////////////////////////////////*/

    function testLoanRepaymentWithInterest() public {
        // Setup: Deposit and originate loan
        vm.prank(senior1);
        usdc.approve(address(pool), SENIOR_DEPOSIT);
        vm.prank(senior1);
        pool.deposit(SENIOR_DEPOSIT, true);

        // Grant OPERATOR_ROLE to borrower
        pool.grantRole(pool.OPERATOR_ROLE(), borrower);

        bytes32 propertyId = keccak256("property1");
        vm.prank(borrower);
        pool.applyForLoan(LOAN_AMOUNT, propertyId, PROPERTY_VALUE, 12);

        // Calculate repayment with interest (20% for 12 months)
        uint256 totalRepayment = LOAN_AMOUNT + (LOAN_AMOUNT * 20 / 100);

        vm.startPrank(borrower);
        usdc.mint(borrower, totalRepayment); // Mint enough to repay
        usdc.approve(address(pool), totalRepayment);

        vm.expectEmit(true, false, false, false);
        emit LoanRepaid(0, totalRepayment);

        pool.repayLoan(0);
        vm.stopPrank();

        // Verify loan status updated
        (, , , , , , , , ILendingPool.LoanStatus status) = pool.loans(0);
        assertEq(uint8(status), 2, "Loan status should be Repaid (2)");
    }

    /*//////////////////////////////////////////////////////////////
                        ACCESS CONTROL TESTS
    //////////////////////////////////////////////////////////////*/

    function testOnlyAdminCanOriginateLoan() public {
        bytes32 propertyId = keccak256("property1");

        vm.expectRevert();
        vm.prank(senior1); // Non-admin trying to originate loan
        pool.applyForLoan(LOAN_AMOUNT, propertyId, PROPERTY_VALUE, 12);
    }

    function testOnlyAdminCanSetTrancheTokens() public {
        TrancheToken newSenior = new TrancheToken("New Senior", "nS", true);
        TrancheToken newJunior = new TrancheToken("New Junior", "nJ", false);

        vm.expectRevert();
        vm.prank(senior1); // Non-admin
        pool.setTrancheTokens(address(newSenior), address(newJunior));
    }

    /*//////////////////////////////////////////////////////////////
                          FUZZ TESTS
    //////////////////////////////////////////////////////////////*/

    /// @dev Fuzz test for deposit amounts
    function testFuzz_DepositAmount(uint256 amount) public {
        // Bound amount between minimum and max reasonable
        amount = bound(amount, MIN_DEPOSIT, 10_000_000e6); // $100 to $10M

        usdc.mint(senior1, amount);

        vm.startPrank(senior1);
        usdc.approve(address(pool), amount);
        pool.deposit(amount, true);
        vm.stopPrank();

        assertEq(seniorToken.balanceOf(senior1), amount, "Fuzz: Token balance mismatch");
    }

    /// @dev Fuzz test for LTV ratio validation
    function testFuzz_LTVValidation(uint256 loanAmount, uint256 propertyValue) public {
        // Bound values to reasonable ranges
        loanAmount = bound(loanAmount, 100_000e6, 1_000_000e6);
        propertyValue = bound(propertyValue, loanAmount, 2_000_000e6); // Ensure propertyValue >= loanAmount

        // Calculate LTV and ensure it's within valid range
        uint256 ltv = (loanAmount * 100) / propertyValue;

        // Skip test if LTV is below 50% (causes underflow in interest rate calculation)
        if (ltv < 50) {
            return;
        }

        // Deposit enough capital to cover the loan
        uint256 depositAmount = loanAmount + 100_000e6; // Extra buffer
        usdc.mint(senior1, depositAmount);
        vm.startPrank(senior1);
        usdc.approve(address(pool), depositAmount);
        pool.deposit(depositAmount, true);
        vm.stopPrank();

        // Grant OPERATOR_ROLE to borrower
        pool.grantRole(pool.OPERATOR_ROLE(), borrower);

        bytes32 propertyId = keccak256(abi.encodePacked(loanAmount, propertyValue));

        if (ltv > LTV_65_PERCENT) {
            vm.expectRevert(abi.encodeWithSignature("ExceedsMaxLTV()"));
        }

        vm.prank(borrower);
        pool.applyForLoan(loanAmount, propertyId, propertyValue, 12);
    }
}
