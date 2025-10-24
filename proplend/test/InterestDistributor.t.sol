// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {InterestDistributor} from "../contracts/core/InterestDistributor.sol";
import {MockUSDC} from "../contracts/mocks/MockUSDC.sol";

/**
 * @title InterestDistributor Solidity Test Suite
 * @notice Comprehensive tests for PropertyLend waterfall payment distribution
 * @dev Uses Hardhat 3's native Solidity testing with forge-std
 */
contract InterestDistributorTest is Test {
    InterestDistributor public distributor;
    MockUSDC public usdc;

    address public owner;
    address public operator;
    address public treasury;
    address public lendingPool;

    bytes32 public OPERATOR_ROLE;

    // Events
    event InterestDistributed(
        uint256 totalAmount,
        uint256 seniorAmount,
        uint256 juniorAmount,
        uint256 platformAmount
    );
    event PlatformTreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);

    function setUp() public {
        // Setup accounts
        owner = address(this);
        operator = address(0x1);
        treasury = address(0x2);
        lendingPool = address(0x3);

        // Label addresses for better trace output
        vm.label(owner, "Owner");
        vm.label(operator, "Operator");
        vm.label(treasury, "Treasury");
        vm.label(lendingPool, "LendingPool");

        // Deploy MockUSDC
        usdc = new MockUSDC();

        // Deploy InterestDistributor
        distributor = new InterestDistributor(address(usdc), treasury);

        // Get role constant
        OPERATOR_ROLE = distributor.OPERATOR_ROLE();

        // Grant operator role
        distributor.grantRole(OPERATOR_ROLE, operator);

        // Set lending pool address
        distributor.setLendingPool(lendingPool);

        // Mint USDC to lending pool for distributions
        usdc.mint(lendingPool, 10_000_000e6); // $10M
    }

    /*//////////////////////////////////////////////////////////////
                            DEPLOYMENT TESTS
    //////////////////////////////////////////////////////////////*/

    function testDeployWithCorrectUSDCAddress() public {
        assertEq(address(distributor.usdc()), address(usdc), "USDC address incorrect");
    }

    function testDeployWithCorrectTreasuryAddress() public {
        assertEq(distributor.platformTreasury(), treasury, "Treasury address incorrect");
    }

    function testSetDeployerAsAdmin() public {
        bytes32 adminRole = distributor.DEFAULT_ADMIN_ROLE();
        assertTrue(distributor.hasRole(adminRole, owner), "Deployer not admin");
    }

    function testInitializeWithZeroDistributionStats() public {
        (uint256 senior, uint256 junior, uint256 platform) = distributor.getDistributionStats();
        assertEq(senior, 0, "Senior stats not zero");
        assertEq(junior, 0, "Junior stats not zero");
        assertEq(platform, 0, "Platform stats not zero");
    }

    /*//////////////////////////////////////////////////////////////
                        INTEREST DISTRIBUTION TESTS
    //////////////////////////////////////////////////////////////*/

    function testDistributeInterestViaWaterfall() public {
        // Scenario: $1M TVL (80% senior = $800k, 20% junior = $200k)
        // $200k loan at 20% = $40k interest
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 40_000e6;

        // Approve lending pool to spend USDC for platform payment
        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        // Expected distribution:
        // Senior: $64k (8% on $800k) → but only $40k available, so senior gets $40k
        // Platform: 2% of remaining ($40k - $40k = $0) = $0
        // Junior: Remaining = $0

        vm.expectEmit(false, false, false, true);
        emit InterestDistributed(totalInterest, totalInterest, 0, 0);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        assertEq(seniorAmount, totalInterest, "Senior amount incorrect");
        assertEq(juniorAmount, 0, "Junior amount incorrect");
        assertEq(platformAmount, 0, "Platform amount incorrect");
    }

    function testPrioritizeSeniorTranchePaymentsFirst() public {
        // Scenario: Senior target is $64k but only $50k available
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 50_000e6; // Less than senior target

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        // Senior should get all $50k
        assertEq(seniorAmount, totalInterest, "Senior didn't get priority");
        assertEq(juniorAmount, 0, "Junior should get nothing");
        assertEq(platformAmount, 0, "Platform should get nothing");
    }

    function testAllocateExcessYieldsToJuniorTranche() public {
        // Scenario: $1M TVL, $200k interest (excess available for junior)
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 200_000e6; // High interest

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        // Senior gets target: $800k * 8% = $64k
        uint256 expectedSenior = 64_000e6;
        assertEq(seniorAmount, expectedSenior, "Senior amount incorrect");

        // Remaining: $200k - $64k = $136k
        // Platform: 2% of $136k = $2,720
        uint256 expectedPlatform = 2_720e6;
        assertEq(platformAmount, expectedPlatform, "Platform amount incorrect");

        // Junior gets rest: $136k - $2,720 = $133,280
        uint256 expectedJunior = 133_280e6;
        assertEq(juniorAmount, expectedJunior, "Junior amount incorrect");
    }

    function testHandleInsufficientInterestForSeniorTarget() public {
        // Scenario: Senior needs $64k but only $30k available
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 30_000e6;

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        assertEq(seniorAmount, 30_000e6, "Senior should get all available");
        assertEq(juniorAmount, 0, "Junior should get nothing");
        assertEq(platformAmount, 0, "Platform should get nothing");
    }

    function testEmitInterestDistributedEvent() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 100_000e6;

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        // Calculate expected amounts
        uint256 expectedSenior = 64_000e6;
        uint256 expectedPlatform = 720e6; // 2% of remaining $36k
        uint256 expectedJunior = 35_280e6;

        vm.expectEmit(false, false, false, true);
        emit InterestDistributed(totalInterest, expectedSenior, expectedJunior, expectedPlatform);

        vm.prank(operator);
        distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);
    }

    function testRevertDistributionWithZeroInterest() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;

        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(operator);
        distributor.distributeInterest(0, seniorTVL, juniorTVL);
    }

    function testOnlyAllowOperatorToDistribute() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 50_000e6;

        address nonOperator = address(0x99);

        vm.expectRevert();
        vm.prank(nonOperator);
        distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);
    }

    /*//////////////////////////////////////////////////////////////
                        CALCULATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testCalculateMonthlySeniorInterest() public {
        // $800k senior TVL at 8% APY = $64k annual / 12 = $5,333.33 monthly
        uint256 seniorTVL = 800_000e6;
        uint256 monthlyInterest = distributor.calculateSeniorMonthlyInterest(seniorTVL);

        uint256 expected = 5_333_333_333; // $5,333.333333 (6 decimals)
        assertEq(monthlyInterest, expected, "Monthly interest calculation incorrect");
    }

    function testCalculatePlatformMargin() public {
        // $40k total interest at 2% platform margin = $800
        uint256 totalInterest = 40_000e6;
        uint256 platformMargin = distributor.calculatePlatformMargin(totalInterest);

        uint256 expected = 800e6;
        assertEq(platformMargin, expected, "Platform margin calculation incorrect");
    }

    function testHandleZeroTVLGracefully() public {
        uint256 monthlyInterest = distributor.calculateSeniorMonthlyInterest(0);
        assertEq(monthlyInterest, 0, "Zero TVL should return zero interest");
    }

    /*//////////////////////////////////////////////////////////////
                        STATISTICS TRACKING TESTS
    //////////////////////////////////////////////////////////////*/

    function testTrackTotalSeniorPayments() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;

        // First distribution
        uint256 interest1 = 50_000e6;
        vm.prank(lendingPool);
        usdc.approve(address(distributor), interest1);
        vm.prank(operator);
        distributor.distributeInterest(interest1, seniorTVL, juniorTVL);

        // Second distribution
        uint256 interest2 = 30_000e6;
        vm.prank(lendingPool);
        usdc.approve(address(distributor), interest2);
        vm.prank(operator);
        distributor.distributeInterest(interest2, seniorTVL, juniorTVL);

        (uint256 totalSenior, , ) = distributor.getDistributionStats();
        assertEq(totalSenior, interest1 + interest2, "Total senior payments not tracked correctly");
    }

    function testTrackTotalJuniorPayments() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 200_000e6; // High interest to generate junior payments

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);
        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, ) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        (, uint256 totalJunior, ) = distributor.getDistributionStats();
        assertEq(totalJunior, juniorAmount, "Junior payment not tracked");
    }

    function testTrackTotalPlatformPayments() public {
        uint256 seniorTVL = 800_000e6;
        uint256 juniorTVL = 200_000e6;
        uint256 totalInterest = 200_000e6;

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);
        vm.prank(operator);
        (, , uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        (, , uint256 totalPlatform) = distributor.getDistributionStats();
        assertEq(totalPlatform, platformAmount, "Platform payment not tracked");

        // Verify treasury received the payment
        assertEq(usdc.balanceOf(treasury), platformAmount, "Treasury didn't receive payment");
    }

    /*//////////////////////////////////////////////////////////////
                        CONFIGURATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testSetLendingPoolAddressOnce() public {
        // Deploy new distributor to test setting lending pool
        InterestDistributor newDistributor = new InterestDistributor(address(usdc), treasury);

        address testPool = address(0x999);
        newDistributor.setLendingPool(testPool);

        assertEq(newDistributor.lendingPool(), testPool, "Lending pool not set");
    }

    function testRevertSettingLendingPoolTwice() public {
        // Current distributor already has lending pool set in setUp
        address newPool = address(0x888);

        vm.expectRevert("Already set");
        distributor.setLendingPool(newPool);
    }

    function testUpdatePlatformTreasury() public {
        address newTreasury = address(0x777);

        vm.expectEmit(true, true, false, false);
        emit PlatformTreasuryUpdated(treasury, newTreasury);

        distributor.updatePlatformTreasury(newTreasury);

        assertEq(distributor.platformTreasury(), newTreasury, "Treasury not updated");
    }

    /*//////////////////////////////////////////////////////////////
                        EDGE CASE TESTS
    //////////////////////////////////////////////////////////////*/

    function testHandleVeryLargeInterestAmounts() public {
        // Test with $10M interest
        uint256 seniorTVL = 8_000_000e6; // $8M
        uint256 juniorTVL = 2_000_000e6; // $2M
        uint256 totalInterest = 10_000_000e6; // $10M

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        // Senior gets 8% of $8M = $640k
        assertEq(seniorAmount, 640_000e6, "Large senior amount incorrect");

        // Remaining: $10M - $640k = $9.36M
        // Platform: 2% of $9.36M = $187,200
        assertEq(platformAmount, 187_200e6, "Large platform amount incorrect");

        // Junior gets rest
        uint256 expectedJunior = 9_360_000e6 - platformAmount;
        assertEq(juniorAmount, expectedJunior, "Large junior amount incorrect");
    }

    function testHandleVerySmallInterestAmounts() public {
        // Test with $1 interest (rounding edge case)
        uint256 seniorTVL = 100_000e6;
        uint256 juniorTVL = 25_000e6;
        uint256 totalInterest = 1e6; // $1

        vm.prank(lendingPool);
        usdc.approve(address(distributor), totalInterest);

        vm.prank(operator);
        (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
            distributor.distributeInterest(totalInterest, seniorTVL, juniorTVL);

        // All $1 should go to senior
        assertEq(seniorAmount, 1e6, "Small amount not allocated correctly");
        assertEq(juniorAmount, 0, "Junior shouldn't get anything with $1");
        assertEq(platformAmount, 0, "Platform shouldn't get anything with $1");
    }
}
