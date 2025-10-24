// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {SecondaryMarket} from "../contracts/core/SecondaryMarket.sol";
import {TrancheToken} from "../contracts/core/TrancheTokens.sol";
import {MockUSDC} from "../contracts/mocks/MockUSDC.sol";
import {ISecondaryMarket} from "../contracts/interfaces/ISecondaryMarket.sol";

/**
 * @title SecondaryMarket Solidity Test Suite
 * @notice Comprehensive tests for PropertyLend P2P marketplace
 * @dev Uses Hardhat 3's native Solidity testing with forge-std
 */
contract SecondaryMarketTest is Test {
    SecondaryMarket public market;
    MockUSDC public usdc;
    TrancheToken public seniorToken;
    TrancheToken public juniorToken;

    address public owner;
    address public treasury;
    address public seller;
    address public buyer;
    address public trader1;
    address public trader2;

    bytes32 public MINTER_ROLE;

    // Events
    event OrderCreated(
        uint256 indexed orderId,
        address indexed trader,
        ISecondaryMarket.OrderType orderType,
        bool isSenior,
        uint256 amount,
        uint256 price
    );
    event OrderCancelled(uint256 indexed orderId);
    event OrderFilled(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 price
    );

    function setUp() public {
        // Setup accounts
        owner = address(this);
        treasury = address(0x1);
        seller = address(0x2);
        buyer = address(0x3);
        trader1 = address(0x4);
        trader2 = address(0x5);

        // Label addresses for better trace output
        vm.label(owner, "Owner");
        vm.label(treasury, "Treasury");
        vm.label(seller, "Seller");
        vm.label(buyer, "Buyer");
        vm.label(trader1, "Trader1");
        vm.label(trader2, "Trader2");

        // Deploy MockUSDC
        usdc = new MockUSDC();

        // Deploy Tranche Tokens
        seniorToken = new TrancheToken("Senior SAFE Token", "sSAFE", true);
        juniorToken = new TrancheToken("Junior YIELD Token", "jYIELD", false);

        // Deploy SecondaryMarket
        market = new SecondaryMarket(address(usdc), treasury);

        // Set tranche tokens in market
        market.setTrancheTokens(address(seniorToken), address(juniorToken));

        // Mint USDC for testing
        usdc.mint(buyer, 1_000_000e6);
        usdc.mint(seller, 1_000_000e6);
        usdc.mint(trader1, 500_000e6);

        // Mint tranche tokens for testing
        MINTER_ROLE = seniorToken.MINTER_ROLE();
        seniorToken.grantRole(MINTER_ROLE, owner);
        juniorToken.grantRole(MINTER_ROLE, owner);

        seniorToken.mint(seller, 100_000e6);
        juniorToken.mint(seller, 50_000e6);
        seniorToken.mint(trader1, 50_000e6);
    }

    /*//////////////////////////////////////////////////////////////
                            DEPLOYMENT TESTS
    //////////////////////////////////////////////////////////////*/

    function testDeployWithCorrectUSDCAddress() public {
        assertEq(address(market.usdc()), address(usdc), "USDC address incorrect");
    }

    function testDeployWithCorrectTreasuryAddress() public {
        assertEq(market.platformTreasury(), treasury, "Treasury address incorrect");
    }

    function testSetTrancheTokenAddresses() public {
        assertEq(address(market.seniorToken()), address(seniorToken), "Senior token incorrect");
        assertEq(address(market.juniorToken()), address(juniorToken), "Junior token incorrect");
    }

    function testInitializeWithZeroStats() public {
        (uint256 volume, uint256 fees, uint256 activeOrders) = market.getMarketStats();
        assertEq(volume, 0, "Initial volume not zero");
        assertEq(fees, 0, "Initial fees not zero");
        assertEq(activeOrders, 0, "Initial active orders not zero");
    }

    /*//////////////////////////////////////////////////////////////
                        ORDER CREATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testCreateSellOrderForSeniorTokens() public {
        uint256 amount = 10_000e6;
        uint256 price = 1_050_000; // $1.05 per token (6 decimals)

        vm.expectEmit(true, true, false, false);
        emit OrderCreated(0, seller, ISecondaryMarket.OrderType.Sell, true, amount, price);

        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, amount, price);

        assertEq(orderId, 0, "First order ID should be 0");

        // Verify order details
        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertEq(order.trader, seller, "Order trader incorrect");
        assertEq(uint8(order.orderType), uint8(ISecondaryMarket.OrderType.Sell), "Order type incorrect");
        assertTrue(order.isSenior, "Order should be for senior tokens");
        assertEq(order.amount, amount, "Order amount incorrect");
        assertEq(order.price, price, "Order price incorrect");
        assertTrue(order.isActive, "Order should be active");
    }

    function testCreateBuyOrderForSeniorTokens() public {
        uint256 amount = 5_000e6;
        uint256 price = 950_000; // $0.95 per token (discount for instant purchase)

        vm.expectEmit(true, true, false, false);
        emit OrderCreated(0, buyer, ISecondaryMarket.OrderType.Buy, true, amount, price);

        vm.prank(buyer);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Buy, true, amount, price);

        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertEq(uint8(order.orderType), uint8(ISecondaryMarket.OrderType.Buy), "Order type should be Buy");
        assertTrue(order.isSenior, "Order should be for senior tokens");
    }

    function testCreateSellOrderForJuniorTokens() public {
        uint256 amount = 8_000e6;
        uint256 price = 1_100_000; // $1.10 per token

        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, false, amount, price);

        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertFalse(order.isSenior, "Order should be for junior tokens");
    }

    function testEmitOrderCreatedEvent() public {
        uint256 amount = 10_000e6;
        uint256 price = 1_000_000;

        vm.expectEmit(true, true, false, false);
        emit OrderCreated(0, seller, ISecondaryMarket.OrderType.Sell, true, amount, price);

        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, amount, price);
    }

    function testRevertOrderWithZeroAmount() public {
        uint256 price = 1_000_000;

        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, 0, price);
    }

    function testRevertOrderWithZeroPrice() public {
        uint256 amount = 10_000e6;

        vm.expectRevert(abi.encodeWithSignature("InvalidPrice()"));
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, amount, 0);
    }

    function testMultipleOrderCreation() public {
        // Create 3 orders
        vm.prank(seller);
        uint256 orderId1 = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 1_000e6, 1_000_000);

        vm.prank(buyer);
        uint256 orderId2 = market.createOrder(ISecondaryMarket.OrderType.Buy, true, 2_000e6, 950_000);

        vm.prank(trader1);
        uint256 orderId3 = market.createOrder(ISecondaryMarket.OrderType.Sell, false, 3_000e6, 1_100_000);

        assertEq(orderId1, 0, "First order ID incorrect");
        assertEq(orderId2, 1, "Second order ID incorrect");
        assertEq(orderId3, 2, "Third order ID incorrect");
    }

    /*//////////////////////////////////////////////////////////////
                        ORDER CANCELLATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testCancelActiveSellOrder() public {
        // Create order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        // Cancel order
        vm.expectEmit(true, false, false, false);
        emit OrderCancelled(orderId);

        vm.prank(seller);
        market.cancelOrder(orderId);

        // Verify order is inactive
        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertFalse(order.isActive, "Order should be inactive");
    }

    function testCancelActiveBuyOrder() public {
        // Create buy order
        vm.prank(buyer);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Buy, true, 5_000e6, 950_000);

        // Cancel order
        vm.prank(buyer);
        market.cancelOrder(orderId);

        // Verify order is inactive
        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertFalse(order.isActive, "Order should be inactive");
    }

    function testRevertCancellingInactiveOrder() public {
        // Create and cancel order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(seller);
        market.cancelOrder(orderId);

        // Try to cancel again
        vm.expectRevert(abi.encodeWithSignature("OrderNotActive()"));
        vm.prank(seller);
        market.cancelOrder(orderId);
    }

    function testOnlyOrderCreatorCanCancel() public {
        // Seller creates order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        // Buyer tries to cancel (should fail)
        vm.expectRevert(abi.encodeWithSignature("Unauthorized()"));
        vm.prank(buyer);
        market.cancelOrder(orderId);
    }

    /*//////////////////////////////////////////////////////////////
                        ORDER FILLING TESTS
    //////////////////////////////////////////////////////////////*/

    function testFillOrderUpdatesAmount() public {
        // Create order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        // Partially fill order
        vm.prank(buyer);
        market.fillOrder(orderId, 3_000e6);

        // Verify order amount updated
        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertEq(order.amount, 7_000e6, "Order amount not updated");
        assertTrue(order.isActive, "Order should still be active");
    }

    function testMarkOrderInactiveWhenFullyFilled() public {
        // Create order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        // Fully fill order
        vm.prank(buyer);
        market.fillOrder(orderId, 10_000e6);

        // Verify order is inactive
        ISecondaryMarket.Order memory order = market.getOrder(orderId);
        assertEq(order.amount, 0, "Order amount should be zero");
        assertFalse(order.isActive, "Order should be inactive");
    }

    function testRevertFillingInactiveOrder() public {
        // Create and fully fill order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(buyer);
        market.fillOrder(orderId, 10_000e6);

        // Try to fill again
        vm.expectRevert(abi.encodeWithSignature("OrderNotActive()"));
        vm.prank(buyer);
        market.fillOrder(orderId, 1_000e6);
    }

    function testRevertFillingWithZeroAmount() public {
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(buyer);
        market.fillOrder(orderId, 0);
    }

    function testRevertFillingMoreThanOrderAmount() public {
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.expectRevert(abi.encodeWithSignature("InvalidAmount()"));
        vm.prank(buyer);
        market.fillOrder(orderId, 15_000e6); // More than order amount
    }

    function testEmitOrderFilledEvent() public {
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        uint256 fillAmount = 5_000e6;

        vm.expectEmit(true, true, true, false);
        emit OrderFilled(orderId, buyer, seller, fillAmount, 1_000_000);

        vm.prank(buyer);
        market.fillOrder(orderId, fillAmount);
    }

    /*//////////////////////////////////////////////////////////////
                        MARKET STATISTICS TESTS
    //////////////////////////////////////////////////////////////*/

    function testTrackTotalTradingVolume() public {
        // Create and fill multiple orders
        vm.prank(seller);
        uint256 orderId1 = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(buyer);
        market.fillOrder(orderId1, 5_000e6); // $5,000 volume

        vm.prank(seller);
        uint256 orderId2 = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 20_000e6, 1_050_000);

        vm.prank(buyer);
        market.fillOrder(orderId2, 10_000e6); // $10,500 volume

        (uint256 volume, , ) = market.getMarketStats();
        assertEq(volume, 15_500e6, "Total volume incorrect"); // $5,000 + $10,500
    }

    function testTrackTotalFeesCollected() public {
        // Create and fill order
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(buyer);
        market.fillOrder(orderId, 10_000e6); // $10,000 trade

        // Fee = 0.3% of $10,000 = $30
        (, uint256 fees, ) = market.getMarketStats();
        assertEq(fees, 30e6, "Total fees incorrect");
    }

    function testTrackActiveOrderCount() public {
        (,, uint256 initialCount) = market.getMarketStats();
        assertEq(initialCount, 0, "Initial count should be zero");

        // Create 3 orders
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(buyer);
        market.createOrder(ISecondaryMarket.OrderType.Buy, true, 5_000e6, 950_000);

        vm.prank(trader1);
        market.createOrder(ISecondaryMarket.OrderType.Sell, false, 8_000e6, 1_100_000);

        (,, uint256 activeCount) = market.getMarketStats();
        assertEq(activeCount, 3, "Active order count incorrect");
    }

    /*//////////////////////////////////////////////////////////////
                        FEE CALCULATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testCalculateTradingFee() public {
        // 0.3% fee = 30 basis points
        uint256 feeBPS = market.TRADING_FEE_BPS();
        uint256 bpsDivisor = market.BPS_DIVISOR();

        assertEq(feeBPS, 30, "Trading fee BPS incorrect");
        assertEq(bpsDivisor, 10000, "BPS divisor incorrect");

        // Example: $10,000 trade
        uint256 tradeCost = 10_000e6;
        uint256 expectedFee = (tradeCost * feeBPS) / bpsDivisor;

        assertEq(expectedFee, 30e6, "Fee calculation incorrect"); // 0.3% of $10k = $30
    }

    /*//////////////////////////////////////////////////////////////
                        ORDER QUERY TESTS
    //////////////////////////////////////////////////////////////*/

    function testGetActiveOrdersForSenior() public {
        // Create senior and junior orders
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(buyer);
        market.createOrder(ISecondaryMarket.OrderType.Buy, true, 5_000e6, 950_000);

        vm.prank(trader1);
        market.createOrder(ISecondaryMarket.OrderType.Sell, false, 8_000e6, 1_100_000);

        // Get senior orders only
        ISecondaryMarket.Order[] memory seniorOrders = market.getActiveOrders(true);
        assertEq(seniorOrders.length, 2, "Should have 2 senior orders");
    }

    function testGetActiveOrdersForJunior() public {
        // Create orders
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(trader1);
        market.createOrder(ISecondaryMarket.OrderType.Sell, false, 8_000e6, 1_100_000);

        vm.prank(trader1);
        market.createOrder(ISecondaryMarket.OrderType.Sell, false, 5_000e6, 1_050_000);

        // Get junior orders only
        ISecondaryMarket.Order[] memory juniorOrders = market.getActiveOrders(false);
        assertEq(juniorOrders.length, 2, "Should have 2 junior orders");
    }

    function testGetUserOrders() public {
        // Seller creates 2 orders
        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        vm.prank(seller);
        market.createOrder(ISecondaryMarket.OrderType.Sell, false, 5_000e6, 1_100_000);

        // Buyer creates 1 order
        vm.prank(buyer);
        market.createOrder(ISecondaryMarket.OrderType.Buy, true, 3_000e6, 950_000);

        // Get seller's orders
        ISecondaryMarket.Order[] memory sellerOrders = market.getUserOrders(seller);
        assertEq(sellerOrders.length, 2, "Seller should have 2 orders");

        // Get buyer's orders
        ISecondaryMarket.Order[] memory buyerOrders = market.getUserOrders(buyer);
        assertEq(buyerOrders.length, 1, "Buyer should have 1 order");
    }

    function testReturnEmptyArrayWhenNoOrders() public {
        ISecondaryMarket.Order[] memory orders = market.getActiveOrders(true);
        assertEq(orders.length, 0, "Should return empty array");

        ISecondaryMarket.Order[] memory userOrders = market.getUserOrders(buyer);
        assertEq(userOrders.length, 0, "Should return empty array");
    }

    /*//////////////////////////////////////////////////////////////
                        CONFIGURATION TESTS
    //////////////////////////////////////////////////////////////*/

    function testSetTrancheTokensOnce() public {
        // Already set in setUp, verify they're set
        assertEq(address(market.seniorToken()), address(seniorToken), "Senior token not set");
        assertEq(address(market.juniorToken()), address(juniorToken), "Junior token not set");
    }

    function testRevertSettingTrancheTokensTwice() public {
        TrancheToken newSenior = new TrancheToken("New Senior", "nS", true);
        TrancheToken newJunior = new TrancheToken("New Junior", "nJ", false);

        vm.expectRevert("Already set");
        market.setTrancheTokens(address(newSenior), address(newJunior));
    }

    /*//////////////////////////////////////////////////////////////
                        EDGE CASE TESTS
    //////////////////////////////////////////////////////////////*/

    function testHandleMultiplePartialFills() public {
        // Create order for 10,000 tokens
        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, 10_000e6, 1_000_000);

        // Fill in 3 parts
        vm.prank(buyer);
        market.fillOrder(orderId, 3_000e6);

        ISecondaryMarket.Order memory order1 = market.getOrder(orderId);
        assertEq(order1.amount, 7_000e6, "After first fill");
        assertTrue(order1.isActive, "Should still be active");

        vm.prank(trader1);
        market.fillOrder(orderId, 4_000e6);

        ISecondaryMarket.Order memory order2 = market.getOrder(orderId);
        assertEq(order2.amount, 3_000e6, "After second fill");
        assertTrue(order2.isActive, "Should still be active");

        vm.prank(trader2);
        market.fillOrder(orderId, 3_000e6);

        ISecondaryMarket.Order memory order3 = market.getOrder(orderId);
        assertEq(order3.amount, 0, "After third fill");
        assertFalse(order3.isActive, "Should be inactive");
    }

    function testHandleVerySmallOrders() public {
        // Create order for $1 worth of tokens
        uint256 smallAmount = 1e6; // $1
        uint256 price = 1_000_000;

        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, smallAmount, price);

        vm.prank(buyer);
        market.fillOrder(orderId, smallAmount);

        // Verify fee calculation for small amounts
        (, uint256 fees, ) = market.getMarketStats();
        assertEq(fees, 3_000, "Fee should be $0.003"); // 0.3% of $1 = $0.003
    }

    function testHandleVeryLargeOrders() public {
        // Create order for $1M worth of tokens
        uint256 largeAmount = 1_000_000e6;
        uint256 price = 1_000_000;

        // Mint enough tokens for seller
        seniorToken.mint(seller, largeAmount);

        vm.prank(seller);
        uint256 orderId = market.createOrder(ISecondaryMarket.OrderType.Sell, true, largeAmount, price);

        vm.prank(buyer);
        market.fillOrder(orderId, largeAmount);

        // Verify volume and fee tracking
        (uint256 volume, uint256 fees, ) = market.getMarketStats();
        assertEq(volume, 1_000_000e6, "Volume should be $1M");
        assertEq(fees, 3_000e6, "Fee should be $3,000"); // 0.3% of $1M
    }
}
