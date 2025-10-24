// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {TrancheToken} from "../contracts/core/TrancheTokens.sol";

/**
 * @title TrancheToken Solidity Test Suite
 * @notice Comprehensive tests for PropertyLend tranche tokens (sSAFE and jYIELD)
 * @dev Uses Hardhat 3's native Solidity testing with forge-std
 */
contract TrancheTokenTest is Test {
    TrancheToken public seniorToken;
    TrancheToken public juniorToken;

    address public owner;
    address public minter;
    address public burner;
    address public user1;
    address public user2;

    bytes32 public MINTER_ROLE;
    bytes32 public BURNER_ROLE;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);

    function setUp() public {
        // Setup accounts
        owner = address(this);
        minter = address(0x1);
        burner = address(0x2);
        user1 = address(0x3);
        user2 = address(0x4);

        // Label addresses for better trace output
        vm.label(owner, "Owner");
        vm.label(minter, "Minter");
        vm.label(burner, "Burner");
        vm.label(user1, "User1");
        vm.label(user2, "User2");

        // Deploy tranche tokens
        seniorToken = new TrancheToken("Senior SAFE Token", "sSAFE", true);
        juniorToken = new TrancheToken("Junior YIELD Token", "jYIELD", false);

        // Get role constants
        MINTER_ROLE = seniorToken.MINTER_ROLE();
        BURNER_ROLE = seniorToken.BURNER_ROLE();

        // Grant roles to test accounts
        seniorToken.grantRole(MINTER_ROLE, minter);
        seniorToken.grantRole(BURNER_ROLE, burner);
        juniorToken.grantRole(MINTER_ROLE, minter);
        juniorToken.grantRole(BURNER_ROLE, burner);
    }

    /*//////////////////////////////////////////////////////////////
                            DEPLOYMENT TESTS
    //////////////////////////////////////////////////////////////*/

    function testSeniorDeploymentMetadata() public {
        assertEq(seniorToken.name(), "Senior SAFE Token", "Senior name incorrect");
        assertEq(seniorToken.symbol(), "sSAFE", "Senior symbol incorrect");
        assertEq(seniorToken.decimals(), 6, "Senior decimals incorrect");
        assertTrue(seniorToken.isSenior(), "Senior isSenior flag incorrect");
        assertEq(seniorToken.getTrancheType(), "Senior", "Senior tranche type incorrect");
    }

    function testJuniorDeploymentMetadata() public {
        assertEq(juniorToken.name(), "Junior YIELD Token", "Junior name incorrect");
        assertEq(juniorToken.symbol(), "jYIELD", "Junior symbol incorrect");
        assertEq(juniorToken.decimals(), 6, "Junior decimals incorrect");
        assertFalse(juniorToken.isSenior(), "Junior isSenior flag incorrect");
        assertEq(juniorToken.getTrancheType(), "Junior", "Junior tranche type incorrect");
    }

    function testDecimalsMatchUSDC() public {
        assertEq(seniorToken.decimals(), 6, "Senior decimals don't match USDC");
        assertEq(juniorToken.decimals(), 6, "Junior decimals don't match USDC");
    }

    /*//////////////////////////////////////////////////////////////
                            MINTING TESTS
    //////////////////////////////////////////////////////////////*/

    function testMintTokensWithMinterRole() public {
        uint256 amount = 10_000e6; // 10,000 tokens

        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0), user1, amount);

        vm.prank(minter);
        seniorToken.mint(user1, amount);

        assertEq(seniorToken.balanceOf(user1), amount, "Balance not updated");
        assertEq(seniorToken.totalSupply(), amount, "Total supply not updated");
    }

    function testRevertMintingWithoutMinterRole() public {
        uint256 amount = 10_000e6;

        vm.expectRevert();
        vm.prank(user1); // Non-minter trying to mint
        seniorToken.mint(user1, amount);
    }

    function testRevertMintingZeroAmount() public {
        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(minter);
        seniorToken.mint(user1, 0);
    }

    function testEmitTransferEventOnMint() public {
        uint256 amount = 5_000e6;

        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0), user1, amount);

        vm.prank(minter);
        seniorToken.mint(user1, amount);
    }

    function testUpdateTotalSupplyOnMint() public {
        uint256 initialSupply = seniorToken.totalSupply();
        uint256 mintAmount = 15_000e6;

        vm.prank(minter);
        seniorToken.mint(user1, mintAmount);

        assertEq(
            seniorToken.totalSupply(),
            initialSupply + mintAmount,
            "Total supply not updated correctly"
        );
    }

    /*//////////////////////////////////////////////////////////////
                            BURNING TESTS
    //////////////////////////////////////////////////////////////*/

    function testBurnTokensWithBurnerRole() public {
        // First mint some tokens
        uint256 mintAmount = 10_000e6;
        vm.prank(minter);
        seniorToken.mint(user1, mintAmount);

        // Then burn
        uint256 burnAmount = 3_000e6;

        vm.expectEmit(true, true, false, true);
        emit Transfer(user1, address(0), burnAmount);

        vm.prank(burner);
        seniorToken.burn(user1, burnAmount);

        assertEq(seniorToken.balanceOf(user1), mintAmount - burnAmount, "Balance not updated");
        assertEq(seniorToken.totalSupply(), mintAmount - burnAmount, "Total supply not updated");
    }

    function testRevertBurningWithoutBurnerRole() public {
        // First mint some tokens
        vm.prank(minter);
        seniorToken.mint(user1, 10_000e6);

        // Try to burn without BURNER_ROLE
        vm.expectRevert();
        vm.prank(user1); // Non-burner trying to burn
        seniorToken.burn(user1, 5_000e6);
    }

    function testRevertBurningZeroAmount() public {
        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(burner);
        seniorToken.burn(user1, 0);
    }

    function testRevertBurningMoreThanBalance() public {
        // Mint 5k tokens
        vm.prank(minter);
        seniorToken.mint(user1, 5_000e6);

        // Try to burn 10k tokens
        vm.expectRevert();
        vm.prank(burner);
        seniorToken.burn(user1, 10_000e6);
    }

    function testEmitTransferEventOnBurn() public {
        // First mint some tokens
        vm.prank(minter);
        seniorToken.mint(user1, 10_000e6);

        // Burn and check event
        uint256 burnAmount = 4_000e6;

        vm.expectEmit(true, true, false, true);
        emit Transfer(user1, address(0), burnAmount);

        vm.prank(burner);
        seniorToken.burn(user1, burnAmount);
    }

    function testUpdateTotalSupplyOnBurn() public {
        // Mint tokens
        uint256 mintAmount = 20_000e6;
        vm.prank(minter);
        seniorToken.mint(user1, mintAmount);

        uint256 supplyAfterMint = seniorToken.totalSupply();

        // Burn tokens
        uint256 burnAmount = 7_000e6;
        vm.prank(burner);
        seniorToken.burn(user1, burnAmount);

        assertEq(
            seniorToken.totalSupply(),
            supplyAfterMint - burnAmount,
            "Total supply not updated correctly after burn"
        );
    }

    /*//////////////////////////////////////////////////////////////
                        ERC-20 COMPLIANCE TESTS
    //////////////////////////////////////////////////////////////*/

    function testTransferTokensBetweenAccounts() public {
        // Mint tokens to user1
        uint256 amount = 10_000e6;
        vm.prank(minter);
        seniorToken.mint(user1, amount);

        // Transfer from user1 to user2
        uint256 transferAmount = 3_000e6;
        vm.prank(user1);
        seniorToken.transfer(user2, transferAmount);

        assertEq(seniorToken.balanceOf(user1), amount - transferAmount, "User1 balance incorrect");
        assertEq(seniorToken.balanceOf(user2), transferAmount, "User2 balance incorrect");
    }

    function testApproveAndTransferFrom() public {
        // Mint tokens to user1
        uint256 amount = 10_000e6;
        vm.prank(minter);
        seniorToken.mint(user1, amount);

        // User1 approves user2 to spend
        uint256 approvalAmount = 5_000e6;
        vm.prank(user1);
        seniorToken.approve(user2, approvalAmount);

        assertEq(seniorToken.allowance(user1, user2), approvalAmount, "Allowance not set");

        // User2 transfers from user1 to themselves
        uint256 transferAmount = 2_000e6;
        vm.prank(user2);
        seniorToken.transferFrom(user1, user2, transferAmount);

        assertEq(seniorToken.balanceOf(user1), amount - transferAmount, "User1 balance incorrect");
        assertEq(seniorToken.balanceOf(user2), transferAmount, "User2 balance incorrect");
        assertEq(
            seniorToken.allowance(user1, user2),
            approvalAmount - transferAmount,
            "Allowance not updated"
        );
    }

    function testReturnCorrectBalanceOf() public {
        uint256 amount1 = 5_000e6;
        uint256 amount2 = 8_000e6;

        vm.prank(minter);
        seniorToken.mint(user1, amount1);

        vm.prank(minter);
        seniorToken.mint(user2, amount2);

        assertEq(seniorToken.balanceOf(user1), amount1, "User1 balance incorrect");
        assertEq(seniorToken.balanceOf(user2), amount2, "User2 balance incorrect");
        assertEq(seniorToken.balanceOf(owner), 0, "Owner balance should be zero");
    }

    function testReturnCorrectTotalSupply() public {
        uint256 amount1 = 5_000e6;
        uint256 amount2 = 8_000e6;

        vm.prank(minter);
        seniorToken.mint(user1, amount1);

        assertEq(seniorToken.totalSupply(), amount1, "Total supply after first mint incorrect");

        vm.prank(minter);
        seniorToken.mint(user2, amount2);

        assertEq(
            seniorToken.totalSupply(),
            amount1 + amount2,
            "Total supply after second mint incorrect"
        );

        // Burn some tokens
        uint256 burnAmount = 3_000e6;
        vm.prank(burner);
        seniorToken.burn(user1, burnAmount);

        assertEq(
            seniorToken.totalSupply(),
            amount1 + amount2 - burnAmount,
            "Total supply after burn incorrect"
        );
    }

    /*//////////////////////////////////////////////////////////////
                        ACCESS CONTROL TESTS
    //////////////////////////////////////////////////////////////*/

    function testGrantAndRevokeMinterRole() public {
        address newMinter = address(0x99);

        // Grant MINTER_ROLE
        seniorToken.grantRole(MINTER_ROLE, newMinter);
        assertTrue(seniorToken.hasRole(MINTER_ROLE, newMinter), "MINTER_ROLE not granted");

        // New minter can mint
        vm.prank(newMinter);
        seniorToken.mint(user1, 1_000e6);
        assertEq(seniorToken.balanceOf(user1), 1_000e6, "New minter couldn't mint");

        // Revoke MINTER_ROLE
        seniorToken.revokeRole(MINTER_ROLE, newMinter);
        assertFalse(seniorToken.hasRole(MINTER_ROLE, newMinter), "MINTER_ROLE not revoked");

        // Revoked minter can't mint
        vm.expectRevert();
        vm.prank(newMinter);
        seniorToken.mint(user1, 1_000e6);
    }

    function testGrantAndRevokeBurnerRole() public {
        address newBurner = address(0x88);

        // First mint some tokens
        vm.prank(minter);
        seniorToken.mint(user1, 10_000e6);

        // Grant BURNER_ROLE
        seniorToken.grantRole(BURNER_ROLE, newBurner);
        assertTrue(seniorToken.hasRole(BURNER_ROLE, newBurner), "BURNER_ROLE not granted");

        // New burner can burn
        vm.prank(newBurner);
        seniorToken.burn(user1, 1_000e6);
        assertEq(seniorToken.balanceOf(user1), 9_000e6, "New burner couldn't burn");

        // Revoke BURNER_ROLE
        seniorToken.revokeRole(BURNER_ROLE, newBurner);
        assertFalse(seniorToken.hasRole(BURNER_ROLE, newBurner), "BURNER_ROLE not revoked");

        // Revoked burner can't burn
        vm.expectRevert();
        vm.prank(newBurner);
        seniorToken.burn(user1, 1_000e6);
    }
}
